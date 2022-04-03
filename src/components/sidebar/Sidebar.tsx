import React from 'react';
import ChatList from '../chat-list/ChatList';
import CreateChat from '../create-chat/CreateChat';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  return (
    <div className={styles.container}>
        <CreateChat />
        <ChatList />
    </div>
  )
}
