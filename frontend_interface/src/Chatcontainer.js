import React, { useState } from "react";
import Chat, { Bubble,  /*Icon,  IconButton,  TreeNode,*/  useMessages } from "@chatui/core";
import "@chatui/core/dist/index.css";
import "./index.css";
import SplitPane from "react-split-pane";
import API from "./APIcall"
import MyImageCaptureComponent from "./imagecapture";
import io from 'socket.io-client';
import ChatSDK from "@chatui/core";
//import './chatui-theme.css';
import SpeechRecognition, {
  useSpeechRecognition
} from "react-speech-recognition";

const initialMessages = [
  {
    type: 'text',
    content: { text: 'Hello, This is Digital Receptionist Sam' },
    user: { avatar: 'http://127.0.0.1:5500/frontend_interface/src/logo.svg'}
  },
];

const socket = io('ws://localhost:5000/');

function Chatcontainer() {
  const { messages, appendMsg, setTyping } = useMessages(initialMessages);
  const [listener, setListener] = useState(false)
  
  // Initiating a socketio connection

  socket.on("connect", () => { console.log(socket.connected) } )
  socket.on("disconnect", () => { console.log(socket.connected)} )

  const {
      listening,
      transcript,
      finalTranscript,
      resetTranscript,
      browserSupportsSpeechRecognition
    } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }


  function handleSend(type, val, listener_type = 1) 
  {
    if (type === "text" && val.trim()) {
      appendMsg({
        type: "text",
        content: { text: val },
        position: "right",
        user :{ avatar: 'http://127.0.0.1:5500/frontend_interface/src/user.svg' }
      });
//
      //let response = API(val) // making the API call to receive a response from the bot.
      if (listener_type == 1)
      {
        socket.emit('user-message', val)
      }
      else if(listener_type == 2)
      {
        //socket.emit()
        return val
      }
        
      setTyping(true);

      // Using state to turn on listeners only once
      if (listener == false)
      {
        setListener(true)
        set_listener()
      }

      /*//response.then(function(res) { return res[]})    
      setTyping(true);
//
      setTimeout(async () => {
        const data = await response 
        appendMsg({
          type: "text",
          content: { text: data },
          user: { avatar: 'http://127.0.0.1:5500/frontend_interface/src/logo.svg' },
        });
      }, 1000); */
    }
  }

  function set_listener()
  {
    console.log("Starting the listener")
    socket.on('bot-reply', (message) => { 

    setTimeout( () => {
      appendMsg({
        type: "text",
        content: { text: message },
        user: { avatar: 'http://127.0.0.1:5500/frontend_interface/src/logo.svg'},
      });
    }, 1000);
    })

    // When calendar listener is activated
    socket.on('cal-reply', (message) => {
      
    setTimeout( () => {
      appendMsg({
        type: "text",
        content: { text: message },
        user: { avatar: 'http://127.0.0.1:5500/frontend_interface/src/logo.svg'},
      });
    }, 1000);

    collecteventdata
    })
  }

  function collecteventdata()
  {

  }

//
  function renderMessageContent(msg) {
    const { content } = msg;
    return <Bubble content={content.text} />;
  }

  function onToolbarClick(item)
  {
    if (item.type == 'speech' && !listening)
    {
      resetTranscript()
      SpeechRecognition.startListening({continuous: true})
    }
    else
    {
      SpeechRecognition.stopListening()
      handleSend( 'text', transcript )
    }
  }
  
/*
  new ChatSDK({
    config: {
      toolbar: [
        {
          type: 'speech',
          icon: 'mic',
          title: 'Hold to Speak'
        }
      ]
    },
    handlers: {
      onToolbarClick: function (item, ctx) {
        if (item.type === 'speech') {
          // 这里改成 App 提供的 bridge 方法
          nativeInvoke('speech', (text) => {
            if (text) {
              // 通过 setText 更新输入框内容
              bot.appRef.current.setText(text);
            }
          });
        }
      }
    }
  }); 
  */



  return (
    <SplitPane split='vertical'  defaultSize={450} minSize={450} maxSize={650}> 
      <Chat
        locale="en-US"
        placeholder="Type here..."
        inputType="text"
        inputOptions={"voice"}
        navbar={{ title: "Digital Receptionist Sam" }}
        messages={messages}
        renderMessageContent={renderMessageContent}
        onToolbarClick={onToolbarClick}
        onSend={handleSend}   
        toolbar={[
          {
            type: "speech",
            title: "Speak",
            img: "http://localhost:5500/frontend_interface/src/voice.png",
          }
        ]}
      />
      <div className="backimage">
        <div ><MyImageCaptureComponent /></div>
      </div>
      {/* <div> Digital Human
          {/* <img src="http://localhost:5500/frontend_interface/src/digi_receptionist.png" alt='lol' height={700} width={800} class='center'/>  }
      </div> */}
      {/*<div >
        <img src="http://localhost:5500/BG-Bot.png" alt='Connection Error' height={900} width={1050}/>
      </div>*/}
    </SplitPane>  
    
  );
}

export default Chatcontainer;
export {socket}