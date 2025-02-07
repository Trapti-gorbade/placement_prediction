from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


user_job_association = db.Table(
    'user_job',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('job_id', db.Integer, db.ForeignKey('job.id'), primary_key=True)
)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    college_name = db.Column(db.String(200), nullable=False)
    resume_text = db.Column(db.Text, nullable=False)

    jobs = db.relationship('Job', secondary=user_job_association, back_populates='users')

    def __repr__(self):
        return f"<User {self.name}>"
    

class Job(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    company_name = db.Column(db.String(100), nullable=False)
    package_offered = db.Column(db.Float, nullable=False)
    job_role = db.Column(db.String(100), nullable=False)
    job_description = db.Column(db.Text, nullable=False)
    deadline = db.Column(db.DateTime, nullable=False)

    users = db.relationship('User', secondary=user_job_association, back_populates='jobs')

    def __repr__(self):
        return f"<Job {self.job_role} at {self.company_name}>"
