import React from "react";
import Chat, { Bubble, useMessages } from "@chatui/core";
import "@chatui/core/dist/index.css";
import "./index.css";
import SplitPane from "react-split-pane";
//import ChatSDK from "@chatui/core";
//import './chatui-theme.css';

const initialMessages = [
  {
    type: 'text',
    content: { text: 'Hello, This is Digital Receptionist Sam' },
    user: { avatar: 'http://127.0.0.1:5500/frontend_interface/src/logo.svg'}
  },
];

export default function App() {
  const { messages, appendMsg, setTyping } = useMessages(initialMessages);

  function handleSend(type, val) 
  {
    if (type === "text" && val.trim()) {
      appendMsg({
        type: "text",
        content: { text: val },
        position: "right",
        user :{ avatar: 'http://127.0.0.1:5500/frontend_interface/src/user.svg' }
      });

      fetch(`http://localhost:5000/send`, 
            {
              'method':'POST',
              headers:
              {
                'Content-Type':'application/json'
              },
              body:JSON.stringify(val)
            })
            .then(response => response.json)
            .catch(error => console.log(error))

      setTyping(true);

      setTimeout(() => {
        appendMsg({
          type: "text",
          content: { text: "YaYa" },
          user: { avatar: 'http://127.0.0.1:5500/frontend_interface/src/logo.svg' },
        });
      }, 1000);
    }
  }

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
      <div>Digital Human</div>
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
