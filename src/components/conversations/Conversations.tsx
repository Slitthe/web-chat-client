import React from 'react'
import {useSelector} from 'react-redux';
import {selectActiveChatroom, selectOwner} from '../../redux/AppSlice';
import {ChatroomType} from '../../types/Interface';
import styles from './Conversations.module.css';
import Message from '../message/Message';


export default function Conversations() {
    const activeChatroom = useSelector(selectActiveChatroom);
    const owner = useSelector(selectOwner);

    return (
        <div className={styles.container}>
            {activeChatroom === null ?
                <div>Select or start a conversation first</div> : activeChatroom?.messages.map(message => <Message
                    key={`${message.sender.userName}${message.sentTime}`}
                    isGroup={activeChatroom.type === ChatroomType.group} sentTime={message.sentTime}
                    message={message.text} user={message.sender} ownerUser={owner}/>)}
        </div>
    )
}
