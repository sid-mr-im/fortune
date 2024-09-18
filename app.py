from flask import Flask, render_template, request, redirect, url_for, jsonify

app = Flask(__name__, static_folder='static')

@app.route('/')
def index():
    # return render_template('temp.html')
    # return render_template('index-v0d.html') #basic
    # return render_template('index-v1d.html') #some features
    # return render_template('index-v2d.html') #chat features upgrade, fixed scrolls
    # return render_template('index-v3d.html') #phi-3 api integrated, fixed tabs & tab content
    return render_template('index-v4d.html') #middle header added, cards added, database integrated
    # return render_template('index-v5l.html') #calendar, calculator, notes fully added

@app.route('/login')
def login():
    pass

@app.route('/home')
def home():
    pass

if __name__ == '__main__':
    app.run(debug=True, port=3000)