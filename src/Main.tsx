import React from 'react';
import ChatWindow from './components/chat-window/ChatWindow';
import Sidebar from './components/sidebar/Sidebar';
import styles from './Main.module.css';

function Main() {
  return (
      <div className={styles.container}>
        <Sidebar />
        <ChatWindow />
      </div>
  );
}

export default Main;