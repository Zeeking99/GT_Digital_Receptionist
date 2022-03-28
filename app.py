# libraries
from flask import Flask, request, jsonify
from chat import Chatbot

app = Flask(__name__)

c1 = Chatbot()

@app.route("/send", methods=['GET', "POST"])
def flask_chatbot_response():
    message = request.get_data()
    message = message.decode()

    response =  c1.chat_response(message)
    response = jsonify({ 'val': response }) 
    
    #print(response)
    return response 

if __name__ == "__main__":
    app.run()