# libraries
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from chat import Chatbot
from flask_socketio import SocketIO, emit
from fr import Frobject


app = Flask(__name__)
cors  = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
socketio = SocketIO(app, cors_allowed_origins="*")

c1 = Chatbot()
f1 = Frobject()

@socketio.on('my event')
def connection_message(data):
    print(data)

# Websocket event to get a response from the chatbot
@socketio.on('user-message')
def chatbot_response(message):
    print(message)
    response =  c1.chat_response(message)
    response = jsonify({ 'val': response }) 

    print(response)

    return response

# Function for receiving messages from the user and sending the response
@app.route("/send", methods=['GET', "POST"])
@cross_origin()
def flask_chatbot_response():
    message = request.get_data()
    message = message.decode()

    response =  c1.chat_response(message)
    response = jsonify({ 'val': response }) 
    
    return response

# Function for receiving image and sending back the name
@app.route("/sendimage", methods=['GET', 'POST'])
def face_recognition():
    if request.method == 'POST':
        image = request.get_data()
        image = image.decode()
        image = image[23:] # removing the headers

        name = f1.frfunction(image)
        print(name)
        
    return name

#if __name__ == "__main__":
#    app.run()

if __name__ == '__main__':
    socketio.run(app, debug=True)