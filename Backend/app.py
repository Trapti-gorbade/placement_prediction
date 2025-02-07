from flask import Flask
from flask_restful import Api
from models import db
from resources import AddUserToJobResource, JobResource, UserRegistration
import os
from dotenv import load_dotenv


app = Flask(__name__)
api = Api(app)


load_dotenv()

host = os.getenv("MYSQL.HOST")
port = os.getenv("MYSQL.PORT")
user = os.getenv("MYSQL.USER")
password = os.getenv("MYSQL.PASSWORD")
database = os.getenv("MYSQL.DATABASE")


app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+pymysql://{user}:{password}@{host}:{port}/{database}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


app.config['UPLOAD_FOLDER'] = 'uploads/'


db.init_app(app)


api.add_resource(UserRegistration, '/register')
api.add_resource(JobResource, '/job')
api.add_resource(AddUserToJobResource, '/addUserToJob')

if __name__ == '__main__':
    app.run(debug=True)
