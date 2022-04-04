import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeSelectecChatroomId, selectActiveChatroomId, selectChatrooms } from '../../redux/ChatroomSlice';
import { Chatroom, ChatroomType } from '../../types/Interface';
import ChatListItem from './chat-list-item/ChatListItem';
import styles from './ChatList.module.css';

export default function ChatList() {
    const chatrooms = useSelector(selectChatrooms);
    const selectedChatroomId = useSelector(selectActiveChatroomId);
    const dispatch = useDispatch();

    const selectChatroom = (id: string) => {
      dispatch(changeSelectecChatroomId(id));
    }
    /* 
        lastMessage: string;
    lastMessageTime: string;
    isSelected: boolean;
    onClick: () => void;
    */

    const chatItems = chatrooms.map((chatroom: Chatroom) => {
      const chatName = chatroom.type === ChatroomType.group ? chatroom.groupName : chatroom.participants[0].displayName
      return <ChatListItem isSelected={selectedChatroomId === chatroom.id} lastMessage={chatroom.messages[chatroom.messages.length - 1]} chatName={chatName || ''} onClick={() => selectChatroom(chatroom.id)} />;
    })
  return (
    <div className={styles.container}>{chatItems}</div>
  )
}
