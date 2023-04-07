from flask import Blueprint, render_template, request, jsonify

views = Blueprint(__name__, "views")


@views.route("/")
def home():
    letters = ['A', 'B', 'C', 'D', 'E']
    return render_template('index.html', letters=letters, name="Scrabble!")

@views.route('/board')
def board():
    letters = ['A', 'B', 'C', 'D', 'E']
    return render_template('board.html', letters=letters)

@views.route("/data")
def get_data():
    data = request.json
    return jsonify(data)
