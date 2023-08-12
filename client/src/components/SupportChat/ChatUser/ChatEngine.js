import React, { useEffect, useState } from "react";

import { ChatEngineWrapper, Socket, ChatFeed } from "react-chat-engine";

const ChatEngine = (props) => {
  const [showChat, setShowChat] = useState(false);
  console.log("prop :", props);
  useEffect(() => {
    if (props.visible) {
      setTimeout(() => {
        setShowChat(true);
      }, 500);
    }
  });

  return (
    <div
      className="transition-5"
      style={{
        ...styles.chatEngineWindow,
        ...{
          height: props.visible ? "100%" : "0px",
          zIndex: props.visible ? "100" : "0",
        },
      }}
    >
      {showChat && (
        <ChatEngineWrapper>
          <Socket
            projectID={""}
            userName={props?.user?.username}
            userSecret={props?.user?.username}
          />
          <ChatFeed activeChat={props.chat.id} />
        </ChatEngineWrapper>
      )}
    </div>
  );
};

export default ChatEngine;

const styles = {
  chatEngineWindow: {
    width: "100%",
    backgroundColor: "#fff",
  },
};
