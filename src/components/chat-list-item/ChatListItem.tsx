import moment from 'moment';
import React from 'react';
import {Message} from '../../types/Interface';
import styles from './ChatListItem.module.css';

export interface ChatListItemProps {
    chatName: string;
    lastMessage?: Message;
    isSelected: boolean;
    onClick: () => void;
}

export default function ChatListItem(props: ChatListItemProps) {
    const {chatName, lastMessage, isSelected, onClick} = props;
    return (
        <div onClick={onClick}
             className={`${styles.chatListItemContainer}${isSelected ? ` ${styles.selectedChat}` : ''}`}>
            <div className={styles.nameTime}>
                <div>{chatName}</div>
                {lastMessage ? <div>{moment(lastMessage.sentTime).format("HH:MM")}</div> : null}
            </div>

            {lastMessage ? <div className={styles.lastMessage}>{lastMessage.text}</div> : null}

        </div>
    )
}
