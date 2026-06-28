# app.py

from flask import Flask, render_template, request
import cv2
import numpy as np
import pyttsx3

app = Flask(__name__)

# Text to Speech
engine = pyttsx3.init()

def predict_sign():
    # Dummy prediction (replace with model prediction)
    return "HELLO"

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    result = predict_sign()

    # Speak the result
    engine.say(result)
    engine.runAndWait()

    return render_template('index.html', prediction=result)

if __name__ == '__main__':
    app.run(debug=True)
