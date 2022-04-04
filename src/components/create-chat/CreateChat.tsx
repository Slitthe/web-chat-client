import React, { useState } from "react";
import styles from "./CreateChat.module.css";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { addChatroom, changeSelectecChatroomId, selectChatrooms, selectUsers, setStartChatOpen } from "../../redux/ChatroomSlice";
import { Chatroom, ChatroomType, User } from "../../types/Interface";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { generateGroupChatroom, generateIndividualChatroom } from "../../utils/chatroomGenerators";


const isValidGroup = (participants: User[], groupName: string): boolean => {
  return participants.length > 1 && groupName.trim() !== '';
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


  const returnHandler = () => {
    dispatch(setStartChatOpen(false));
  }



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
      onChange={(event) => {
          return setSelectedUsers(event);
      }}
      options={users.map((user) => ({ label: user.displayName, value: user.userName }))}
    />
  );

  return (
    <div>
      <div className={styles.actionButtonsContainer}>
      <Button variant="secondary" onClick={returnHandler} >
            {'< Back'}
          </Button>
        <Button disabled={isGroupCreateMode ? !isValidGroup(selectedUsers, groupName) : selectedUser === null} variant="light" onClick={createChatroom} >
            Create
          </Button>
        
      </div>
      {isGroupCreateMode ? multiUserSelect : singleUserSelect}

{isGroupCreateMode ? <InputGroup>
        <FormControl placeholder="Group name" aria-describedby="basic-addon2" value={groupName} onChange={changeGroupName}/>
      </InputGroup> : null}
      

      <Form.Check 
      type="switch"
      id="custom-switch"
      label={<Form.Text className={styles.groupCreateLabel}>
      Group
    </Form.Text>}
      checked={isGroupCreateMode}
      onChange={toggleGroupCreateMode}
    />
       
    </div>
  );
}
