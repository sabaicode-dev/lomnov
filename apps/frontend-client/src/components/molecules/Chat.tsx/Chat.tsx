'use client'
import Conversation from "../Conversation/Conversation";
import Chatform from "../Chatform/Chatform";
import { useState } from "react";

const Chat =  ({params}:any) => {
const [sidebar,setSidebar] = useState<boolean>(false)
const toggleSidebar = () => {
  setSidebar(!sidebar)
}
  return (
    <div className="relative h-[93.5vh]">

      <Conversation params={params} sidebar={sidebar} toggleSidebar={toggleSidebar}/>
      {/* Form text message */}
      <Chatform />
    </div>
  );
};
export default Chat;
