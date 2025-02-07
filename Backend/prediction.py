import json
import re
from google.generativeai import caching
import google.generativeai as genai
from dotenv import load_dotenv
from models import User, Job
import os

load_dotenv()

GEMINI_API_KEY=os.getenv('GEMINI_API_KEY')
genai.configure(api_key=GEMINI_API_KEY)


class Shortlist():

    def __init__(self, job_id, max_students):

        self.job = Job.query.get(job_id)
        self.max_students = max_students
        self.model = genai.GenerativeModel(model_name="gemini-1.5-flash-002")
        self.combined_resume_data = self.get_combined_resume_data()
        self.query = self.get_query_string()
    

    def get_combined_resume_data(self):

        users = self.job.users

        user_details = "\n\n".join(
            f"{user.id}\n{user.name}\n{user.resume_text}"
            for user in users
        )

        return user_details
    

    def get_query_string(self):

        return f"Here I have a job description {self.job.job_description}. I have passed the \
        resume details of the student in cache. Give me the list of the top {self.max_students} students out of them \
        who are more suitable for this job role and why and in last line give me only the student ids integer\
        separated by comma. dont give any heading to this line and don't write anything after this line"


    def get_response(self):

        response = self.model.generate_content([self.combined_resume_data, self.query])
        print(json.dumps(response))

        return response.text
    


    def get_shortlisted_stuent_ids(self):
        
        response = self.get_response()
        
        # Extract the last line
        last_line = response.strip().split("\n")[-1]

        # Extract numbers using regex
        numbers = list(map(int, re.findall(r'\d+', last_line)))

        print(numbers)

        return numbers


