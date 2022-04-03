import React from 'react'
import { useSelector } from 'react-redux';
import { selectActiveChatroom, selectOwner } from '../../redux/ChatroomSlice';
import styles from './Conversations.module.css';

const Message = (props: any) => {
  const {ownerUser, sentTime, message, user} = props;

  return <div>
    <div>{message}{ownerUser.userName === user.userName ? "!!!!!!" : '' }</div>
    <div>
      <span>{user.displayName}</span>
      <span>{sentTime.format("MMM d YYYY")}</span>
    </div>
  </div>
}

export default function Conversations() {
  const activeChatroom = useSelector(selectActiveChatroom);
  const owner = useSelector(selectOwner);

  return (
    <div className={styles.container}>
      {activeChatroom === null ? <div>Select or start a conversation first</div> : activeChatroom?.messages.map(message => <Message sentTime={message.sentTime} message={message.text} user={message.sender} ownerUser={owner}/>)}
    </div>
  )
}
