import firebase_admin
from firebase_admin import credentials, firestore
from dotenv import load_dotenv
import os


load_dotenv()
cred_path=os.getenv("FIREBASE_CREDENTIALS_PATH")

class FirestoreDB:
    def __init__(self):
        if not firebase_admin._apps:
            cred = credentials.Certificate(cred_path)
            firebase_admin.initialize_app(cred)
        
        self.db = firestore.client()

    def isAlreadyAUser(self, email):
        user_ref = self.db.collection("users").document(email)
        return user_ref.get().exists

    def insert(self, user_id, data):
        self.db.collection("users").document(user_id).set(data)
        print(f"User {user_id} added successfully!")


    def getUserByEmail(self, email):
        user_ref = self.db.collection("users").document(email)
        user = user_ref.get()
        return user.to_dict() if user.exists else None

