import React, { useState } from "react";
import styles from "./CreateChat.module.css";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { addChatroom, selectUsers } from "../../redux/ChatroomSlice";
import { Chatroom, ChatroomType } from "../../types/Interface";

export default function CreateChat() {
  const users = useSelector(selectUsers);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<any>([]);
  const [isGroupCreateMode, setIsGroupCreateMode] = useState(false);
  const [groupName, setGroupName] = useState("");
  const dispatch = useDispatch();

  /* 
    id: string;
  type: ChatroomType;
  groupName?: string;
  participants: User[];
  messages: Message[];
  */
  const createChatroom = () => {
    const chatroom: Chatroom = {
        type: ChatroomType.individual,
        participants: [{userName: "j.snow", displayName: "John Snow"}],
        id: `${Math.random()}`,
        messages: [],

    }
    dispatch(addChatroom(chatroom));
  };

  const toggleGroupCreateMode = () => {
    setIsGroupCreateMode(!isGroupCreateMode);
  };

  const changeGroupName = (event: any) => {
    const value = event.target.value;

    setGroupName(value);
  };

  const singleUserSelect = (
    <Select
      isSearchable
      isClearable
      placeholder="Chat participant..."
      name="user-search-single"
      hideSelectedOptions
      // defaultValue={colourOptions[0]}]
      onChange={(event) => setSelectedUser(event ? event.value : null)}
      options={users.map((user) => ({ label: user.displayName, value: user.userName }))}
    />
  );

  const multiUserSelect = (
    <Select
    hideSelectedOptions
      isSearchable
      isClearable
      placeholder="Chat participants..."
      name="user-search-multiple"
      isMulti
      // defaultValue={colourOptions[0]}]
      onChange={(event) => {
          return setSelectedUsers(event);
      }}
      options={users.map((user) => ({ label: user.displayName, value: user.userName }))}
    />
  );

  return (
    <div>
         {isGroupCreateMode ? multiUserSelect : singleUserSelect}
      {isGroupCreateMode ? <input type="text" value={groupName} onChange={changeGroupName} placeholder="Group name" /> : null}
       
      <input type="checkbox" checked={isGroupCreateMode} onChange={toggleGroupCreateMode} />
      <button disabled={isGroupCreateMode ? selectedUsers.length < 1 : selectedUser === null} onClick={createChatroom}>
        Create
      </button>
    </div>
  );
}
