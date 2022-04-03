import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeSelectecChatroomId, selectActiveChatroomId, selectChatrooms } from '../../redux/ChatroomSlice';
import { Chatroom, ChatroomType } from '../../types/Interface';
import styles from './ChatList.module.css';

export default function ChatList() {
    const chatrooms = useSelector(selectChatrooms);
    const selectedChatroomId = useSelector(selectActiveChatroomId);
    const dispatch = useDispatch();

    const selectChatroom = (id: string) => {
      dispatch(changeSelectecChatroomId(id));
    }

    const chatItems = chatrooms.map((chatroom: Chatroom) => {
      const chatName = chatroom.type === ChatroomType.group ? chatroom.groupName : chatroom.participants[0].displayName
      return (<div style={{backgroundColor: selectedChatroomId === chatroom.id ? 'blue' : 'initial'}} onClick={() => selectChatroom(chatroom.id)}>{chatName}</div>);
    })
  return (
    <div className={styles.container}>{chatItems}</div>
  )
}
