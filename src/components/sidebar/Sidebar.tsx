import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectStartChatOpen, setStartChatOpen } from '../../redux/ChatroomSlice';
import ChatList from '../chat-list/ChatList';
import CreateChat from '../create-chat/CreateChat';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  const startChatOpen = useSelector(selectStartChatOpen);
  const dispatch = useDispatch();

  const openStartConversation = () => {
    dispatch(setStartChatOpen(true));
  }
  return (
    <div className={styles.container}>
        {!startChatOpen ? <button onClick={openStartConversation}>Start conversation</button> : null }
        {startChatOpen ? <CreateChat /> : <ChatList />}
    </div>
  )
}
