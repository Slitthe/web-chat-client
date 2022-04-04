import moment from "moment";
import React from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeDraftMessage, selectActiveChatroom, selectActiveChatroomId, selectOwner, addMessage, clearDraftMessage } from "../../redux/AppSlice";
import { Message } from "../../types/Interface";

export default function WriteMessageArea() {
  const dispatch = useDispatch();
  const activeChatroomId = useSelector(selectActiveChatroomId);
  const owner = useSelector(selectOwner);
  const activeChatroom = useSelector(selectActiveChatroom);

  const sendMessage = () => {
    const text = activeChatroom ? activeChatroom.draftMessage : "";
    if(text.trim()) {
      const newMessage: Message = {
        text: text,
        sentTime: moment().toISOString(),
        sender: owner,
      };
  
      dispatch(addMessage({ chatroomId: activeChatroomId || "", message: newMessage }));
      dispatch(clearDraftMessage(activeChatroomId || ""));
    }

    
  };

  const inputKeyUpHandler = (event: any) => {
    event.preventDefault();
    if (event.keyCode === 13) {
      sendMessage();
    }
  }

  const changeMessage = (event: any) => {
    const value = event.target.value;

    dispatch(changeDraftMessage({ chatroomId: activeChatroomId || "", message: value }));
  };

  return (
    <div>
      <InputGroup>
        <FormControl placeholder="Type a message" aria-describedby="basic-addon2" value={activeChatroom ? activeChatroom.draftMessage : ""} onChange={changeMessage} onKeyUp={inputKeyUpHandler}/>
        {activeChatroom && activeChatroom.draftMessage !== "" ? (
          <Button variant="light" onClick={sendMessage} >
            Send
          </Button>
        ) : null}
      </InputGroup>
    </div>
  );
}
