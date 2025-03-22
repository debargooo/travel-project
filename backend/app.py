from flask import Flask, request, jsonify,session
from flask_cors import CORS
import re  # For regex validation
from fireee import FirestoreDB


app = Flask(__name__)
CORS(app)

firee=FirestoreDB()
print(firee)

def validate_signup(data):
    """ Validate user signup data """
    errors = []

    # Extract fields
    name = data.get("name", "").strip()
    email = data.get("email", "").strip()
    phone_number = data.get("phoneNumber", "").strip()
    password = data.get("password", "").strip()
    confirm_password = data.get("confirmPassword", "").strip()

    # Check required fields
    if not name:
        errors.append("Name is required.")
    if not email:
        errors.append("Email is required.")
    if not phone_number:
        errors.append("Phone number is required.")
    if not password:
        errors.append("Password is required.")
    if not confirm_password:
        errors.append("Confirm password is required.")

    # Validate email format
    email_regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
    if email and not re.match(email_regex, email):
        errors.append("Invalid email format.")

    # Validate phone number (10-digit numeric)
    phone_regex = r'^\d{10}$'
    if phone_number and not re.match(phone_regex, phone_number):
        errors.append("Phone number must be 10 digits.")

    # Validate password length
    if password and len(password) < 8:
        errors.append("Password must be at least 6 characters long.")

    # Validate password match
    if password and confirm_password and password != confirm_password:
        errors.append("Passwords do not match.")

    return errors

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.json  
    print(data)
    errors = validate_signup(data)
    if errors:
        return jsonify({"success": False, "errors": errors}), 400
    
    userId= data["email"]
    
    if firee.isAlreadyAUser(userId):
        return jsonify({"success": False, "message": "User already exists. Please log in."}),409
    
    user_data={
        "name": data["name"],
        "email":data["email"],
        "password":data["password"],
        "phone":data["phoneNumber"] 
    }
    try:
        
        firee.insert(userId,user_data)
        
        
        return jsonify({"success": True, "message": "Signup successful!", "user_id": userId}), 201
    except Exception as e:
        return jsonify({"success": False, "message": "Error saving user data.", "error": str(e)}), 500


@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    print("Received data:", data)

    email = data.get("email", "").strip()
    password = data.get("password", "").strip()
    username = data.get("name", "").strip()


    if not email or not password:
        return jsonify({"success": False, "message": "Email and password are required."}), 400

    user_data = firee.getUserByEmail(email)  
    print("Fetched user data:", user_data)

    # 🔴 Fix: Check if user_data is None before accessing it
    if user_data is None:
        return jsonify({"success": False, "message": "User not found."}), 404

    if user_data.get("password") == password:
        return jsonify({"success": True, "message": "Login successful!", "user_id": email, "name": username}), 200
    else:
        return jsonify({"success": False, "message": "Invalid email or password."}), 401



@app.route('/api/google-login', methods=['POST'])
def google_login():
    try:
        data = request.json
        email = data.get("email")
        name = data.get("name")

        if not email:
            return jsonify({"success": False, "message": "No email provided"}), 400

        # Check if user exists
        user_data = firee.getUserByEmail(email)

        if not user_data:
            # Create a new user if not exists
            user_data = {
                "name": name,
                "email": email,
                "auth_provider": "google"
            }
            firee.insert(email, user_data)

        # Store user session (flask session is stored in cookies)
        session['user'] = user_data

        return jsonify({"success": True, "message": "Google login successful!", "user": user_data}), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 400


if __name__ == '__main__':
    app.run(debug=True)
