# libraries
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from chat import Chatbot

app = Flask(__name__)
cors  = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

c1 = Chatbot()

@app.route("/send", methods=['GET', "POST"])
@cross_origin()
def flask_chatbot_response():
    message = request.get_data()
    message = message.decode()

    print(message)
    response =  c1.chat_response(message)
    response = jsonify({ 'val': response }) 
    
    return response 

if __name__ == "__main__":
    app.run()