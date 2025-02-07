from flask_restful import Resource
from flask import request, jsonify
from werkzeug.utils import secure_filename
from models import db, User, Job
from prediction import Shortlist
import os
import datetime


class UserRegistration(Resource):

    @staticmethod
    def allowed_file(filename):
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'pdf'}
    
    @staticmethod
    def upload_file(resume_file):
        resume_filename = secure_filename(resume_file.filename)
        resume_url = os.path.join('uploads/', resume_filename)
        resume_file.save(resume_url)
        return resume_url


    def get(self):
        """
            In get send data in this format GET /user?email=abc@d.com
        """
        data = request.args

        if not data or 'email' not in data or 'password' not in data:
            return jsonify({'error': 'Email and password are required'}), 400
        

        email = data['email']
        password = data['password']

        user = User.query.filter_by(email=email, password=password).first()

        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        return jsonify({
            'message': 'Login Successful',
            'user': {
                'id': user.id, 
                'name': user.name, 
                'email': user.email, 
                'college_name': user.college_name
            }}), 200



    def post(self):
        """
        Use content-type: multipart/form-data while sending the data
        """

        data = request.form
        if not data:
            return jsonify({'error': 'Invalid request format'}), 400

        required_fields = ['name', 'email', 'college_name']
        if not all(field in data for field in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400
        

        name = data['name']
        email = data['email']
        college_name = data['college_name']
        
        resume_file = request.files.get('resume')

        if resume_file and UserRegistration.allowed_file(resume_file.filename):
            resume_url = UserRegistration.upload_file(resume_file)
        else:
            return jsonify({'message': 'File type not matched or missing file'}), 400
        
        resume_text = ""

        with open(resume_url, 'r', encoding='utf8') as f:
            resume_text = f.read()

        new_user = User(name=name, email=email, college_name=college_name, resume_text=resume_text)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({'message': 'User registered successfully', 'user': {'name': name, 'email': email}}), 200



    def put(self):
        """
        Use content-type: multipart/form-data while sending the data
        """

        data = request.form
        if not data or 'id' not in data:
            return jsonify({'error': 'User ID is required'}), 400

        user = User.query.get(data['id'])
        if not user:
            return jsonify({'error': 'User not found'}), 404
        

        user_id = data.get('id')  
        user = User.query.get(user_id)

        if not user:
            return jsonify({'error': 'User not found'}), 404

        user.name = data.get('name', user.name)
        user.email = data.get('email', user.email)
        user.college_name = data.get('college_name', user.college_name)

        resume_file = request.files.get('resume')

        if resume_file and UserRegistration.allowed_file(resume_file.filename):
            resume_url = UserRegistration.upload_file(resume_file)
        else:
            return jsonify({'message': 'File type not matched or missing file'}), 400
        
            
        with open(resume_url, 'r', encoding='utf8') as f:
            user.resume_text = f.read()  

        db.session.commit()

        return jsonify({'message': 'User updated successfully', 'user': {'name': user.name, 'email': user.email}})
    


class JobResource(Resource):

    def get(self):
        
        jobs = Job.query.all() 
        
        if not jobs:
            return {"message": "No jobs found"}, 404

        jobs_list = [
            {
                "id": job.id,
                "company_name": job.company_name,
                "package_offered": job.package_offered,
                "job_role": job.job_role,
                "job_description": job.job_description
            }
            for job in jobs
        ]

        return jsonify({"jobs": jobs_list}), 200



    def post(self):

        data = request.get_json()
        company_name = data.get('company_name')
        package_offered = data.get('package_offered')
        job_role = data.get('job_role')
        job_description = data.get('job_description')
        deadline_str = data.get('deadline')  # date format "%Y-%m-%d %H:%M:%S"

        if not all([company_name, package_offered, job_role, job_description, deadline_str]):
            return jsonify({'error': 'All fields are required'}), 400

        try:
            deadline = datetime.strptime(deadline_str, r"%Y-%m-%d %H:%M:%S")
        except ValueError:
            return jsonify({'error': 'Invalid date format. Use YYYY-MM-DD'}), 400

        new_job = Job(
            company_name=company_name,
            package_offered=float(package_offered),
            job_role=job_role,
            job_description=job_description,
            deadline=deadline
        )

        db.session.add(new_job)
        db.session.commit()

        return jsonify({'message': 'Job added successfully', 'job_id': new_job.id})


    def put(self, job_id):

        job = Job.query.get(job_id)
        if not job:
            return jsonify({'error': 'Job not found'}), 404

        data = request.get_json()
        job.company_name = data.get('company_name', job.company_name)
        job.package_offered = float(data.get('package_offered', job.package_offered))
        job.job_role = data.get('job_role', job.job_role)
        job.job_description = data.get('job_description', job.job_description)

        deadline_str = data.get('deadline')
        if deadline_str:
            try:
                job.deadline = datetime.strptime(deadline_str, "%Y-%m-%d")
            except ValueError:
                return jsonify({'error': 'Invalid date format. Use YYYY-MM-DD'}), 400

        db.session.commit()

        return jsonify({'message': 'Job updated successfully', 'job_id': job.id})



class AddUserToJobResource(Resource):

    def post(self):

        args = request.get_json()

        
        user_id = args.get('user_id')
        job_id = args.get('job_id')

        if not all([user_id, job_id]):
            return jsonify({'error': 'All fields are required'}), 400
        
        user = User.query.get(user_id)
        job = Job.query.get(job_id)

        if not user:
            return jsonify({"message": f"User with ID {user_id} not found"}), 404
        if not job:
            return jsonify({"message": f"Job with ID {job_id} not found"}), 404
        
        if job.deadline < datetime.now():
            return jsonify({"message": f"Deadline passed away. It was {job.deadline}"}), 400

        if user not in job.users:
            job.users.append(user)
            db.session.commit()

        return jsonify({
            "message": f"User {user.name} has been added to the job {job.job_role} at {job.company_name}."
        }), 201
    
    

def ShortlistStudents(Resource):

    def get(self):

        data = request.args
        job_id = data.get('job_id')
        max_students = data.get('max_students')

        if not all([job_id, max_students]):
            return jsonify({'error': 'All fields are required'}), 400
        
        shortlisted_ids = Shortlist(job_id=job_id, max_students=max_students).get_shortlisted_stuent_ids()

        students = User.query.filter(User.id.in_(shortlisted_ids)).all()
        
        student_list = [
            {"id": student.id, "name": student.name} for student in students
        ]

        return jsonify({"shortlisted_students": student_list}), 200

        
