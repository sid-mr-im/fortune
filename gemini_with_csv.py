import os
import google.generativeai as genai
import csv 

genai.configure(api_key='AIzaSyBr7VZthc6yIUn1qLEBg1HNMAWTVgrV8tc')
#os.getenv("GOOGLE_API_KEY"))



## function to load Gemini Pro model and get repsonses
model=genai.GenerativeModel("gemini-pro") 
chat = model.start_chat(history=[])
def get_gemini_response(question):
    
    response=chat.send_message(question,stream=True)
    return response

