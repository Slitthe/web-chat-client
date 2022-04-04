import React from 'react'
import { useSelector } from 'react-redux';
import { selectActiveChatroom, selectActiveChatroomId, selectChatroomTitleById } from '../../redux/ChatroomSlice';
import { ChatroomType } from '../../types/Interface';
import styles from './InfoBar.module.css';

export default function InfoBar() {
  const activeChatroomId = useSelector(selectActiveChatroomId);
  const chatName = useSelector(selectChatroomTitleById(activeChatroomId));

  const activeChatroom = useSelector(selectActiveChatroom);
  return (
    <div className={styles.container}>
      {chatName}{activeChatroom?.type === ChatroomType.group ? " (group) " : null}
    </div>
  )
}
