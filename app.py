# libraries
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from chat import Chatbot
import base64
from fr import Frobject

app = Flask(__name__)
cors  = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

c1 = Chatbot()
f1 = Frobject()

@app.route("/send", methods=['GET', "POST"])
@cross_origin()
def flask_chatbot_response():
    message = request.get_data()
    message = message.decode()

    print(message)
    response =  c1.chat_response(message)
    response = jsonify({ 'val': response }) 
    
    return response

# Function for receiving image
@app.route("/sendimage", methods=['GET', 'POST'])
def face_recognition():
    if request.method == 'POST':
        image = request.get_data()
        image = image.decode()
        image = image[23:] # removing the headers

        name = f1.frfunction(image)
        print(name)
        
    return name

if __name__ == "__main__":
    app.run()