from flask_restful import Resource
from flask import request, jsonify
from werkzeug.utils import secure_filename
from models import db, User
import os

# Function to check allowed file extensions
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']


class UserRegistration(Resource):

    def post(self):
        name = request.form['name']
        email = request.form['email']
        
        img_file = request.files.get('image')
        resume_file = request.files.get('resume')
        
        img_url = None
        resume_url = None

        if img_file and allowed_file(img_file.filename):
            img_filename = secure_filename(img_file.filename)
            img_url = os.path.join('uploads/', img_filename)
            img_file.save(img_url)

        if resume_file and allowed_file(resume_file.filename):
            resume_filename = secure_filename(resume_file.filename)
            resume_url = os.path.join('uploads/', resume_filename)
            resume_file.save(resume_url)

        new_user = User(name=name, email=email, img_url=img_url, resume_url=resume_url)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({'message': 'User registered successfully', 'user': {'name': name, 'email': email}})
