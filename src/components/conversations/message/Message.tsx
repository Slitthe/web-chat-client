import { Moment } from 'moment';
import React from 'react'
import { User } from '../../../types/Interface';
import styles from "./Message.module.css";

const colors = {
    owner: 'blue',
    default: 'green'
}

export interface MessageProps {
    ownerUser: User;
    user: User;
    sentTime: Moment;
    message: string;
    isGroup: boolean;
}

const Message = (props: MessageProps) => {
    const {ownerUser, sentTime, message, user, isGroup} = props;
    const isOwner = ownerUser.userName === user.userName;
  
    return <div className={`${styles.container} ${isOwner ? styles.owner : styles.external}`}>
      <div>{message}{ownerUser.userName === user.userName ? "!!!!!!" : '' }</div>
      <div>
        <span>{user.displayName}</span>
        <span>{sentTime.format("MMM d YYYY")}</span>
        <span>{isGroup ? "GROUP" : ''}</span>
      </div>
    </div>
  }

  export default Message;