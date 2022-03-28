# libraries
from flask import Flask, request, jsonify
from chat import Chatbot

app = Flask(__name__)

c1 = Chatbot()

@app.route("/send", methods=['GET', "POST"])

def flask_chatbot_response():
    msg = request.get_json()
    print(msg)
    return jsonify({ 'val': c1.chat_response(msg['val']) })

if __name__ == "__main__":
    app.run()