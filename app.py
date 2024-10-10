from flask import Flask, render_template, request, redirect, url_for, jsonify
import google.generativeai as genai
from flask_cors import CORS, cross_origin

app = Flask(__name__, static_folder='static')
app.secret_key = 'your_secret_key'  # Set a secret key for sessions
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app, resources={r"/askgemini": {"origins": "http://localhost:3000" "*"}})

try:
    genai.configure(api_key='GEMINI_KEY')
    model = genai.GenerativeModel(model_name="models/gemini-1.5-flash")
    sample_file = genai.upload_file(path="data/msme_a_data.csv", display_name="MSME data")
    # sample_file = genai.upload_file(path="data/msme_data.csv", display_name="MSME data")
except:
    pass
    
@app.route('/')
def index():
    # return render_template('temp.html')
    # return render_template('land-v0.html') #left and right section fully functional, google's gemini api integrated
    return render_template('land-v1.html') #left and right section fully functional, google's gemini api integrated

@app.route('/login', methods=['GET', 'POST'])
@cross_origin(origin='*',headers=['Content-Type','application/json'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
    #     if username == USER_DATA['username'] and password == USER_DATA['password']:
    #         # Store user session
    #         session['logged_in'] = True
    #         session['username'] = username
    #         return redirect(url_for('dashboard'))
    #     else:
    #         return "Invalid credentials!"
    # return render_template('login.html')

@app.route('/home')
def home():
    # return render_template('home-v0d.html') #basic
    # return render_template('home-v1d.html') #some features
    # return render_template('home-v2d.html') #chat features upgrade, fixed scrolls
    # return render_template('home-v3d.html') #phi-3 api integrated, fixed tabs & tab content
    # return render_template('home-v4d.html') #middle header added, cards added, database integrated, read/write operations added
    # return render_template('home-v5d.html') #right section fully functional, google's gemini api integrated
    # return render_template('home-v6d.html') #left section fully functional
    return render_template('home-v7d.html') #cards revamp, phase2 finetunings

@app.route('/askgemini', methods=['POST'])
# @cross_origin(origin='localhost:3000',headers=['Content-Type','application/json'])
@cross_origin(origin='*',headers=['Content-Type','application/json'])
def askgemini():
    data = request.get_json()
    query = data.get('message', '')
    print("Query:", query)
    # response = model.generate_content(
    #     [query]
    # )
    response = model.generate_content(
        [query, sample_file]
    )
    print(response.text)
    return {"responseText": response.text}

if __name__ == '__main__':
    app.run(debug=True, port=3000)
