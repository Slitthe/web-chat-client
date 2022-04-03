import React from 'react'
import { useSelector } from 'react-redux';
import { selectActiveChatroomId, selectChatroomTitleById } from '../../redux/ChatroomSlice';
import styles from './InfoBar.module.css';

export default function InfoBar() {
  const activeChatroomId = useSelector(selectActiveChatroomId);
  const chatName = useSelector(selectChatroomTitleById(activeChatroomId))
  return (
    <div className={styles.container}>
      {chatName}
    </div>
  )
}
