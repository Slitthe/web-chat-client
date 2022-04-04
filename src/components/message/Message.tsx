import moment from 'moment';
import React from 'react'
import { User } from '../../types/Interface';
import styles from "./Message.module.css";

export interface MessageProps {
    ownerUser: User;
    user: User;
    sentTime: string;
    message: string;
    isGroup: boolean;
}

const Message = (props: MessageProps) => {
    const {ownerUser, sentTime, message, user, isGroup} = props;
    const isOwner = ownerUser.userName === user.userName;
  
    return <div className={isOwner ? styles.owner : styles.external}>
      <div className={styles.messageContainer}>{message}</div>
      <div className={styles.messageInfo}>
        {!isOwner && isGroup ? <span className={styles.userName}>{user.displayName} </span> : null}
        <span>{moment(sentTime).format("MMM d, hh:mm")}</span>
      </div>
    </div>
  }

  export default Message;