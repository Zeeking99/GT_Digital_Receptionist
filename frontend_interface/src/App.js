import React, { useCallback, useState } from "react";
import Chat, { Bubble,  Icon,  IconButton,  useMessages } from "@chatui/core";
import "@chatui/core/dist/index.css";
import "./index.css";
import Chatcontainer from "./Chatcontainer";

//const initialMessages = [
//  {
//    type: 'text',
//    content: { text: 'Hello, This is Digital Receptionist Sam' },
//    user: { avatar: 'http://127.0.0.1:5500/frontend_interface/src/logo.svg'}
//  },
//];
//
//export default function App() {
//  const { messages, appendMsg, setTyping } = useMessages(initialMessages);
//
//  const [micOn, setMic] = useState(false)
//
//  const {
//      transcript,
//      listening,
//      resetTranscript,
//      finalTranscript,
//      browserSupportsSpeechRecognition
//    } = useSpeechRecognition();
//
//  if (!browserSupportsSpeechRecognition) {
//    return <span>Browser doesn't support speech recognition.</span>;
//  }
//
//  function handleSend(type, val) 
//  {
//    if (type === "text" && val.trim()) {
//      appendMsg({
//        type: "text",
//        content: { text: val },
//        position: "right",
//        user :{ avatar: 'http://127.0.0.1:5500/frontend_interface/src/user.svg' }
//      });
////
//      let response = API(val) // making the API call to receive a response from the bot.
//
////
//      //response.then(function(res) { return res[]})    
//      setTyping(true);
////
//      setTimeout(async () => {
//        const data = await response 
//        appendMsg({
//          type: "text",
//          content: { text: data },
//          user: { avatar: 'http://127.0.0.1:5500/frontend_interface/src/logo.svg' },
//        });
//      }, 1000);
//    }
//  }
////
//  function renderMessageContent(msg) {
//    const { content } = msg;
//    return <Bubble content={content.text} />;
//  }
//
//  function onToolbarClick(item)
//  {
//    if (item.type == 'speech' && micOn == false)
//    {
//      setMic(true)
//      SpeechRecognition.startListening({continuous: true})
//    }
//    else
//    {
//      setMic(false)
//      SpeechRecognition.stopListening()
//
//
//      handleSend({type: 'text', val:"Hello"})
//    }
//  }
//  
///*
//  new ChatSDK({
//    config: {
//      toolbar: [
//        {
//          type: 'speech',
//          icon: 'mic',
//          title: 'Hold to Speak'
//        }
//      ]
//    },
//    handlers: {
//      onToolbarClick: function (item, ctx) {
//        if (item.type === 'speech') {
//          // ???????????? App ????????? bridge ??????
//          nativeInvoke('speech', (text) => {
//            if (text) {
//              // ?????? setText ?????????????????????
//              bot.appRef.current.setText(text);
//            }
//          });
//        }
//      }
//    }
//  }); 
//  */
//
//
//
//  return (
//    <SplitPane split='vertical'  defaultSize={450} minSize={450} maxSize={650}> 
//      <Chat
//        locale="en-US"
//        placeholder="Type here..."
//        inputType="text"
//        inputOptions={"voice"}
//        navbar={{ title: "Digital Receptionist Sam" }}
//        messages={messages}
//        renderMessageContent={renderMessageContent}
//        onToolbarClick={onToolbarClick}
//        onSend={handleSend}   
//        toolbar={[
//          {
//            type: "speech",
//            title: "Speak",
//            img: "http://localhost:5500/frontend_interface/src/voice.png",
//          }
//        ]}
//      />
//
//
//      {/* <div> Digital Human
//          {/* <img src="http://localhost:5500/frontend_interface/src/digi_receptionist.png" alt='lol' height={700} width={800} class='center'/>  }
//      </div> */}
//
//    <MyImageCaptureComponent/> 
//
//    </SplitPane>  
//    
//  );
//}
//

export default function App()
{
  return ( <Chatcontainer/> );
}
