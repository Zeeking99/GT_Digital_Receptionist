import React from "react";
import Chat, { Bubble,  Icon,  IconButton,  useMessages } from "@chatui/core";
import "@chatui/core/dist/index.css";
import "./index.css";
import SplitPane from "react-split-pane";
import Dictaphone from "./Dictaphone";
import API from "./APIcall"
import ChatSDK from "@chatui/core";
//import './chatui-theme.css';

const initialMessages = [
  {
    type: 'text',
    content: { text: 'Hello, This is Digital Receptionist Sam' },
    user: { avatar: 'http://127.0.0.1:5500/frontend_interface/src/logo.svg'}
  },
];
//
export default function App() {
  const { messages, appendMsg, setTyping } = useMessages(initialMessages);
//
  function handleSend(type, val) 
  {
    if (type === "text" && val.trim()) {
      appendMsg({
        type: "text",
        content: { text: val },
        position: "right",
        user :{ avatar: 'http://127.0.0.1:5500/frontend_interface/src/user.svg' }
      });
//
      let response = API(val)

//
      //response.then(function(res) { return res[]})    
      setTyping(true);
//
      setTimeout(async () => {
        const data = await response 
        appendMsg({
          type: "text",
          content: { text: data },
          user: { avatar: 'http://127.0.0.1:5500/frontend_interface/src/logo.svg' },
        });
      }, 1000);
    }
  }
//
  function renderMessageContent(msg) {
    const { content } = msg;
    return <Bubble content={content.text} />;
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
        navbar={{ title: "Digital Receptionist Sam" }}
        messages={messages}
        renderMessageContent={renderMessageContent}
        onSend={handleSend}   
        recorder={{ canRecord: true }}
        onToolbarClick={console.log("Toolbar Clicked")}
        toolbar={[
          {
            type: "speech",
            title: "Speak",
            img: "http://localhost:5500/frontend_interface/src/voice.png",
            
          }
        ]}
      /> 
      {/* <Dictaphone/> For some reason works properly only on a few systems */ }
      <div> Digital Human
          <img src="http://localhost:5500/frontend_interface/src/digi_receptionist.png" alt='lol' height={700} width={800} class='center'/>
      </div>
    </SplitPane>
    
  );
}
