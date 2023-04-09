from flask import Blueprint, render_template, request, jsonify
import random

views = Blueprint(__name__, "views")

vowels = ['a', 'e', 'i', 'o', 'u']

 # Define the letters with their corresponding values
letter_values = {
    'a': 1, 'b': 3, 'c': 3, 'd': 2, 'e': 1, 'f': 4, 'g': 2, 'h': 4,
    'i': 1, 'j': 8, 'k': 5, 'l': 1, 'm': 3, 'n': 1, 'o': 1, 'p': 3,
    'q': 10, 'r': 1, 's': 1, 't': 1, 'u': 1, 'v': 4, 'w': 4, 'x': 8,
    'y': 4, 'z': 10
}

# Define the weights of the high-value letters
    # The weights determine how often the letter will appear
letter_weights = {
    'j': 0.1, 'q': 0.1, 'x': 0.2, 'z': 0.2
}

def generate_letters():
    letters = []
    vowel_count = 0
   
    for i in range(7):
        if i < 4 or vowel_count < 2:
            # Generate a random letter
            letter = chr(random.randint(ord('a'), ord('z')))
            
            # Check if it's a vowel
            if letter in vowels:
                vowel_count += 1
        else:
            # Generate a random consonant
            # Use letter_weights to determine the probability of selecting a high-value letter
            if random.random() < sum(letter_weights.values()):
                letter = random.choices(list(letter_weights.keys()), weights=list(letter_weights.values()))[0]
            else:
                letter = chr(random.randint(ord('b'), ord('y')))
            
        letters.append(letter)
    
    # Shuffle the letters to make the distribution more random
    random.shuffle(letters)
    
    return letters


def validate_word(word):
    # Load dictionary file
    # Credit: https://github.com/dwyl/english-words for dictionary
    with open('assets/words_alpha.txt', 'r') as f:
        dictionary = set([word.strip() for word in f.readlines()])

    # Check if string is in dictionary, then reformat and return it
    if word.lower() in dictionary:
        return True
    else:
        return '"%s" is not a valid word.' % word.lower().capitalize()
        
@views.route("/")
def home():
    letters = generate_letters()
    return render_template('index.html', letters=letters, name="Scrabble!")



@views.route("/submit-word", methods=["POST"])
def my_endpoint():
    # handle the request data
    word = request.form.get("word")
    
    # validate the word given to the server
    result = validate_word(word)
    
    # return a JSON response
    return jsonify(message=result)