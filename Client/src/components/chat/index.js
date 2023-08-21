import React from "react";
import {
  useMultiChatLogic,
  MultiChatSocket,
  MultiChatWindow,
} from "react-chat-engine-advanced";
import Header from "../customHeader";
import StandardMessageForm from "../customMessageForms/StandardMessageForm";
import Ai from "../customMessageForms/Ai";
import AiCode from "../customMessageForms/AiCode";
import AiAssist from "../customMessageForms/AiAssist";
import AiCentricSupport from "../customMessageForms/AiCentricSupport";

const Chat = ({ user, secret }) => {
  const chatProps = useMultiChatLogic(
    //import.meta.env.VITE_PROJECT_ID,
    "197bb0ea-3db7-4ac6-acd2-8f01ea670681",
    user,
    secret
  );
  if (chatProps?.messages) {
    var test = chatProps.messages.filter((s) =>
      s.sender?.username?.startsWith("AI_bot")
    );

    test.length !== 0 &&
      chatProps.messages
        .filter((s) => s.sender?.username?.startsWith("AI_bot"))

        ?.map((t) => {
          if (!/\r|\n/.exec(t.text))
            t.text = t.text.replace(/\d+\.\s/g, "\n$&");
        });
  }
  return (
    <div style={{ flexBasis: "100%" }}>
      <MultiChatSocket {...chatProps} />
      <MultiChatWindow
        {...chatProps}
        style={{ height: "100vh" }}
        renderChatHeader={(chat) => <Header chat={chat} />}
        renderMessageForm={(props) => {
          if (chatProps.chat?.title.startsWith("AiChat_")) {
            return <Ai props={props} activeChat={chatProps.chat} />;
          }
          if (chatProps.chat?.title.startsWith("AiCode_")) {
            return <AiCode props={props} activeChat={chatProps.chat} />;
          }
          if (chatProps.chat?.title.startsWith("AiAssist_")) {
            return <AiAssist props={props} activeChat={chatProps.chat} />;
          }
          if (chatProps.chat?.title.startsWith("AiCentricSupport_")) {
            return (
              <AiCentricSupport props={props} activeChat={chatProps.chat} />
            );
          }

          return (
            <StandardMessageForm props={props} activeChat={chatProps.chat} />
          );
        }}
      />
    </div>
  );
};

export default Chat;
