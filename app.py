# libraries
from flask import Flask, render_template, request, jsonify
from chat import chatbot


app = Flask(__name__)
#run_with_ngrok(app) -Use this option if you have ngrok and you want to expose your chatbot to the real world

@app.route("/send", methods=["POST"])
def chatbot_response():
    msg = request.json["msg"]
    print("We are here")
    return jsonify({ 'val': chatbot(msg) })

if __name__ == "__main__":
    app.run()