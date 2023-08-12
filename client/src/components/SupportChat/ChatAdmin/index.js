import React from "react";

import { ChatEngine } from "react-chat-engine";

const ChatAdmin = () => {
  return (
    <ChatEngine
      projectID={""}
      userName="Admin"
      userSecret="admin"
      height="calc(80vh)"
    />
  );
};

export default ChatAdmin;
