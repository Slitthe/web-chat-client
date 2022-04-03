import React, { useState } from "react";
import styles from "./CreateChat.module.css";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { addChatroom, changeSelectecChatroomId, selectChatrooms, selectStartChatOpen, selectUsers, setStartChatOpen } from "../../redux/ChatroomSlice";
import { Chatroom, ChatroomType, User } from "../../types/Interface";

const generateIndividualChatroom = (users: User[], selectedUsername: string): Chatroom => {

    const userToAdd = users.find(user => user.userName === selectedUsername);
    return {
        type: ChatroomType.individual,
        participants: userToAdd ? [userToAdd] : [],
        id: `${Math.random()}`,
        messages: [],
        draftMessage: '',
    }

}

const generateGroupChatroom = (selectedUsers: {label: string, value: string}[], groupName: string): Chatroom => {
    const mappedUsers: User[] = selectedUsers.map(selectUser => ({userName: selectUser.value, displayName: selectUser.label}));

    return {
        type: ChatroomType.group,
        groupName: groupName,
        participants: mappedUsers,
        id: `${Math.random()}`,
        messages: [],
        draftMessage: '',
    }

}

const getIndividualChatroomIdByParticipantUsername = (chatrooms: Chatroom[], participantUsername: string) => {
  return chatrooms.find(chatroom => {
    return chatroom.type === ChatroomType.individual && chatroom.participants.find(participant => participant.userName === participantUsername);
  })
}

export default function CreateChat() {
  const users = useSelector(selectUsers);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<any>([]);
  const [isGroupCreateMode, setIsGroupCreateMode] = useState(false);
  const [groupName, setGroupName] = useState("");
  const dispatch = useDispatch();
  const chatrooms = useSelector(selectChatrooms);





  const createChatroom = () => {
    let activeChatroomId = '';

   
      if(isGroupCreateMode && groupName && selectedUsers.length > 0) {
        const groupChatroom = generateGroupChatroom(selectedUsers, groupName);
        activeChatroomId = groupChatroom.id;
        dispatch(addChatroom(groupChatroom));
      }

      if(!isGroupCreateMode && selectedUser) {
        const existingChatroom = getIndividualChatroomIdByParticipantUsername(chatrooms, selectedUser);
        if(existingChatroom) {
          activeChatroomId = existingChatroom.id
        } else {
          const individualChatroom = generateIndividualChatroom(users, selectedUser);
          activeChatroomId = individualChatroom.id
          dispatch(addChatroom(individualChatroom));
        }
        
      }

      dispatch(changeSelectecChatroomId(activeChatroomId))
      dispatch(setStartChatOpen(false));
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
