import random
import json

import pyttsx3

import torch

import speech_recognition as sr

from model import NeuralNet
from nltk_utils import bag_of_words, tokenize

class Chatbot:
    bot_name = "Sam"

    def __init__(self):
        #r = sr.Recognizer()   # initialising a recognizer object

        #sr.Microphone.list_microphone_names()  
        #mic = sr.Microphone()


        # Initializing voice engine
        #engine = pyttsx3.init()
        #engine.setProperty('rate', 150)

        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

        with open('intents1.json', 'r') as json_data:
            self.intents = json.load(json_data)

        FILE = "data1.pth"
        self.data = torch.load(FILE)

        self.input_size = self.data["input_size"]
        self.hidden_size = self.data["hidden_size"]
        self.output_size = self.data["output_size"]
        self.all_words = self.data['all_words']
        self.tags = self.data['tags']
        self.model_state = self.data["model_state"]

        self.model = NeuralNet(self.input_size, self.hidden_size, self.output_size).to(self.device)
        self.model.load_state_dict(self.model_state)
        self.model.eval()


        #print("Let's chat! (type 'quit' to exit)")
#        while True:
#            # sentence = "do you use credit cards?"
#
#            #try:               # mic listening to user voice and process it
#            #    with mic as source:
#            #        input("Speak")
#            #        r.adjust_for_ambient_noise(source)
#            #        audio = r.listen(source)
#            #except:
#            #    pass
#            
#            #sentence = r.recognize_google(audio)
#
#            sentence = user_input
#            #sentence = input("You: ")
#            if sentence == "quit":
#                break
#
#            sentence = tokenize(sentence)
#            X = bag_of_words(sentence, all_words)
#            X = X.reshape(1, X.shape[0])
#            X = torch.from_numpy(X).to(device)
#
#            output = model(X)
#            _, predicted = torch.max(output, dim=1)
#
#            tag = tags[predicted.item()]
#
#            probs = torch.softmax(output, dim=1)
#            prob = probs[0][predicted.item()]
#            
#            if prob.item() > 0.75:
#
#        #        if tag == "appointment":
#        #           Have to implement google calender API
#        #        else:
#                for intent in intents['intents']:
#                    if tag == intent["tag"]:
#                        text = random.choice(intent['responses'])
#                        #engine.say(text)
#                        
#                        return(text)
#                        #print(f"{bot_name}: {text}")
#                        #engine.runAndWait()
#            
#            else:
#                return("I do not understand...")
#                #print(f"{bot_name}: I do not understand...")
#                #engine.say("I do not understand")
#                #engine.runAndWait()
            

    def chat_response(self, user_input):
        
        sentence = user_input
        #sentence = input("You: ")
        #if sentence == "quit":
        #    break

#        if tag == "appointment":
#           Have to implement google calender API
#        else:
        for intent in intents['intents']:
            if tag == intent["tag"]:
                text = random.choice(intent['responses'])
                engine.say(text)        # code for text to speech
                print(f"{bot_name}: {text}")
                engine.runAndWait()
    
    else:
        print(f"{bot_name}: I do not understand...")
        engine.say("I do not understand")
        engine.runAndWait()
