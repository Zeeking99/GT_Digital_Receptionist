import random
import json

import pyttsx3

import torch

import speech_recognition as sr

r = sr.Recognizer()

sr.Microphone.list_microphone_names()
mic = sr.Microphone()


print()

from model import NeuralNet
from nltk_utils import bag_of_words, tokenize

# Initializing voice engine
engine = pyttsx3.init()
engine.setProperty('rate', 150)

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

with open('intents1.json', 'r') as json_data:
    intents = json.load(json_data)

FILE = "data1.pth"
data = torch.load(FILE)

input_size = data["input_size"]
hidden_size = data["hidden_size"]
output_size = data["output_size"]
all_words = data['all_words']
tags = data['tags']
model_state = data["model_state"]

model = NeuralNet(input_size, hidden_size, output_size).to(device)
model.load_state_dict(model_state)
model.eval()

bot_name = "Sam"
print("Let's chat! (type 'quit' to exit)")
while True:
    # sentence = "do you use credit cards?"

    try:
        with mic as source:
            input("Speak")
            r.adjust_for_ambient_noise(source)
            audio = r.listen(source)
    except:
        pass
    
    sentence = r.recognize_google(audio)

#    sentence = input("You: ")
    if sentence == "quit":
        break

    sentence = tokenize(sentence)
    X = bag_of_words(sentence, all_words)
    X = X.reshape(1, X.shape[0])
    X = torch.from_numpy(X).to(device)

    output = model(X)
    _, predicted = torch.max(output, dim=1)

    tag = tags[predicted.item()]

    probs = torch.softmax(output, dim=1)
    prob = probs[0][predicted.item()]
    
    if prob.item() > 0.75:

#        if tag == "appointment":
#           Have to implement google calender API
#        else:
        for intent in intents['intents']:
            if tag == intent["tag"]:
                text = random.choice(intent['responses'])
                engine.say(text)
                print(f"{bot_name}: {text}")
                engine.runAndWait()
    
    else:
        print(f"{bot_name}: I do not understand...")
        engine.say("I do not understand")
        engine.runAndWait()