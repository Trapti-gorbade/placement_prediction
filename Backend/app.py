from flask import Flask
from flask_restful import Api
from models import db
from resources import UserRegistration

app = Flask(__name__)
api = Api(app)

# Setup database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Setup upload folder
app.config['UPLOAD_FOLDER'] = 'uploads/'
app.config['ALLOWED_EXTENSIONS'] = {'png', 'jpg', 'jpeg', 'gif', 'pdf'}

db.init_app(app)

# Add resource to API
api.add_resource(UserRegistration, '/register')

if __name__ == '__main__':
    app.run(debug=True)
