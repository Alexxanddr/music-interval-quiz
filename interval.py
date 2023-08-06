from flask import Flask, jsonify, send_file, send_from_directory
from flask_cors import CORS
from musthe import *
import sys
import random

training_scale = ['C-major','A-natural_minor']


def getHarmonizedScale(note, quality):
    scale = []
    scale_input = Scale(Note(note),quality)

    if quality == "major":
        for i in range(len(scale_input)):
            if (i == 1 or i == 2 or i == 5): 
                scale.append(str(scale_input[i])+'m')
            elif (i == 6):
                scale.append(str(scale_input[i])+'dim')
            else:
                scale.append(str(scale_input[i]))
    elif quality == 'natural_minor':
        for i in range(len(scale_input)):
            if (i == 0 or i == 3 or i == 4): 
                scale.append(str(scale_input[i])+'m')
            elif (i == 1):
                scale.append(str(scale_input[i])+'dim')
            else:
                scale.append(str(scale_input[i]))
    else:
        print('')
    return scale


app = Flask(__name__)
CORS(app)

@app.route('/get_question', methods=['GET'])
def get_question():
    tone = random.choice(training_scale)
    count = [1,2,3,4,5,6,7,9,11,13]
    random_count = random.choice(count)
    question = {random_count: tone}
    return jsonify(question)

@app.route('/get_chords/<input>', methods=['GET'])
def get_chords(input):
    note = input.split('-')[0]
    quality = input.split('-')[1]
    scale = getHarmonizedScale(note,quality)
    return jsonify(scale)

@app.route('/check_answer/<note_number>/<tonality>/<user_response>', methods=['GET'])
def check_answer(note_number, tonality, user_response):
    
    note = tonality.split('-')[0]
    quality = tonality.split('-')[1]
    scale = getHarmonizedScale(note,quality)
    note_numbet_int=int(note_number)
    get_from_scale = 0;
    if (note_numbet_int == 9):
        get_from_scale = scale[1]
    elif (note_numbet_int == 11):
        get_from_scale = scale[3]
    elif (note_numbet_int == 13):
        get_from_scale = scale[5]
    else:
        get_from_scale = scale[note_numbet_int-1];

    if user_response == get_from_scale:
        response = {"Response": True}
    else:
        response = {"Response": False}
    return jsonify(response)

@app.route('/')
def serve_html():
    return send_file('templates/index.html')

@app.route('/static/<path:path>')
def serve_static(path):
    return send_from_directory('static', path)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
