import Head from 'next/head';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';
import ChatScreen from '../../components/Chat/ChatScreen';
import Sidebar from '../../components/Sidebar/Sidebar';
import { auth, db } from '../../config/firebase';
import { getRecipientEmail } from '../../utils/getRecipientEmail';

const ChatPage = ({ messages, chat }) => {
    const [user] = useAuthState(auth);
    return (
        <React.Fragment>
            <Head>
                <title>Chat with {getRecipientEmail(chat.users, user)}</title>
            </Head>

            <ChatStyle>
                <Sidebar />

                <ChatContainerStyle>
                    <ChatScreen chat={chat} messages={messages}/>
                </ChatContainerStyle>
            </ChatStyle>
        </React.Fragment>
    );
};

const ChatStyle = styled.div`
display:flex; 
`;

const ChatContainerStyle = styled.div`
flex:1; 
overflow:scroll;
height: 100vh;
border-left:1px solid whitesmoke; 

::-webkit-scrollbar{
    display:none;
}

-ms-overflow-style: none; /* IE */
scrollbar-width: none; /* firefox */
`;

export async function getServerSideProps(context) {
    const ref = db.collection("chats").doc(context.query.id);

    // prep the messages on the server
    const messagesRef = await ref.collection("messages").orderBy("timestamp", "asc").get();
    const messages = messagesRef
        .docs
        .map(
            doc => ({
                id: doc.id,
                ...doc.data()
            })
        )
        .map(
            messages => ({
                ...messages,
                timestamp: messages.timestamp.toDate().getTime()
            })
        );

    // prep the chats. 
    const chatRes = await ref.get();
    const chat = {
        id: chatRes.id,
        ...chatRes.data()
    };
    console.log("chat", chat);
    return {
        props: {
            messages: JSON.stringify(messages),
            chat: chat
        }
    };
}

export default ChatPage;
