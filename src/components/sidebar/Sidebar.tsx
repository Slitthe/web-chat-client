import React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { selectStartChatOpen, setStartChatOpen } from '../../redux/AppSlice';
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
        {!startChatOpen ? <Button onClick={openStartConversation} variant="outline-light">Start new chat +</Button> : null }
        {startChatOpen ? <CreateChat /> : <ChatList />}
    </div>
  )
}
