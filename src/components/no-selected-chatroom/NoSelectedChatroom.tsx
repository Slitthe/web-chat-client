import React from 'react'
import styles from './NoSelectedChatroom.module.css';

export default function NoSelectedChatroom() {
    return (
        <div className={styles.container}>
            <span className={styles.infoText}>No active chats</span>
        </div>
    )
}
