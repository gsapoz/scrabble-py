from flask import Blueprint, render_template, request, jsonify

views = Blueprint(__name__, "views")


@views.route("/")
def home():
    return render_template("index.html", name="Scrabble")

@views.route('/letter')
def board():
    thisletter = 'X'
    return render_template('letter.html', thisletter=thisletter)

@views.route("/data")
def get_data():
    data = request.json
    return jsonify(data)
