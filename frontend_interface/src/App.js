import React from "react";
import Chat, { Bubble, useMessages } from "@chatui/core";
import "@chatui/core/dist/index.css";
import "./index.css";
import SplitPane from "react-split-pane";
import API from "./APIcall"
//import ChatSDK from "@chatui/core";
//import './chatui-theme.css';
//
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

      //if(val === "Hello")
      //{
      //  response = "Hello, How can I help you?"
      //}
      //else if(val === "I am a visitor")
      //{
      //  response = "What's your purpose of visit?"
      //}
      //else if(val === "I am here for admission")
      //{
      //  response = "You can go to the admission desk in the auditorium lobby"
      //}
      //else if(val === "Thank you")
      //{
      //  response = "My Pleasure"
      //}
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
          title: '语音输入'
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
    <SplitPane split="vertical" size={950}>
      <div>Digital Human
        <img src="http://localhost:5500/frontend_interface/src/digi_receptionist.png" alt='lol' height={600} width={500}/>
      </div>
    <SplitPane split='vertical' size={400}>
    <Chat
      locale="en-US"
      placeholder="Type here..."
      navbar={{ title: "Digital Receptionist Sam" }}
      messages={messages}
      renderMessageContent={renderMessageContent}
      onSend={handleSend}  
    />
    </SplitPane>
    </SplitPane>
    
  );
}



//import React from "react";
//import Chat, { Bubble, useMessages } from "@chatui/core";
//import "@chatui/core/dist/index.css";
//import "./index.css";
//import SplitPane from "react-split-pane";
//import API from "./APIcall";
//
//const initialMessages = [
//  {
//    type: 'text',
//    content: { text: 'Welcome to Digital Receptionist Sam' },
//    user: { avatar: 'http://127.0.0.1:5500/frontend_interface/src/logo.svg' }
//  },
//];
//
//export default function App() {
//
//  const { messages, appendMsg, setTyping } = useMessages(initialMessages);
//
//  function handleSend(type, val) {
//    if (type === "text" && val.trim()) {
//      appendMsg({
//        type: "text",
//        content: { text: val },
//        position: "right",
//        user :{ avatar: 'http://127.0.0.1:5500/frontend_interface/src/user.svg' }
//      });
//
//      setTyping(true);
//
//      const response = API(val)
//      console.log(response)
//      //response is still as promise result which needs to be taken as json and text
//
//      setTimeout(() => {
//       appendMsg({
//         type: "text",
//          content: { text: "Almost there! Don't Give up" },
//          user: { avatar: 'http://127.0.0.1:5500/frontend_interface/src/logo.svg' },
//        });
//       }, 1000);
//      }
//
//    }
//
//  function renderMessageContent(msg) {
//    const { content } = msg;
//    return <Bubble content={content.text} />;
//  }
//
//  return (
//    <SplitPane split="vertical" size={950}>
//      <div>Digital Human</div>
//    <SplitPane split='vertical' size={500}>
//    <Chat
//      locale="en-US"
//      placeholder = "Type here"
//      navbar={{ title: "Digital Receptionist Sam" }}
//      messages={messages}
//      renderMessageContent={renderMessageContent}
//      onSend={handleSend}
//    />
//    </SplitPane>
//    </SplitPane>
//
//  );
//}