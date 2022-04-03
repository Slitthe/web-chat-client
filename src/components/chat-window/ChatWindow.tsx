import React from 'react'
import Conversations from '../conversations/Conversations';
import InfoBar from '../info-bar/InfoBar';
import WriteMessageArea from '../write-message-area/WriteMessageArea';
import styles from './ChatWindow.module.css';

export default function ChatWindow() {
  return (
    <div className={styles.container}>
      <InfoBar />
      <Conversations />
      <WriteMessageArea />
    </div>
  )
}
