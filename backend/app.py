from flask import Flask, request, jsonify
from flask_cors import CORS
import re  # For regex validation

app = Flask(__name__)
CORS(app)

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
    data = request.json  # Get JSON data from React

    # Validate data
    errors = validate_signup(data)
    if errors:
        return jsonify({"success": False, "errors": errors}), 400

    # If no errors, process registration
    return jsonify({"success": True, "message": "Signup successful!", "received_data": data})

if __name__ == '__main__':
    app.run(debug=True)
