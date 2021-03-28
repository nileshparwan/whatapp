import React, { useRef, useState } from 'react';
import firebase from 'firebase';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import styled from 'styled-components';
import { auth, db } from '../../config/firebase';
import Message from '../Message/Message';
import ChatHeader from './ChatHeader';
import { getRecipientEmail } from '../../utils/getRecipientEmail';

const ChatScreen = ({ chat, messages }) => {
    const [inputState, setInputState] = useState(null);
    const endOfMesgRef = useRef(null);
    const [user] = useAuthState(auth);
    const router = useRouter();

    const recipientEmail = getRecipientEmail(chat.users, user);

    const [messagesSnanpshot] = useCollection(
        db
            .collection("chats")
            .doc(router.query.id)
            .collection("messages")
            .orderBy("timestamp", "asc")
    );

    const ShowMessage = () => {
        if (messagesSnanpshot) {
            return messagesSnanpshot.docs.map(message => (
                <Message
                    key={message.id}
                    user={message.data().user}
                    message={{
                        ...message.data(),
                        timestamp: message.data().timestamp?.toDate().getTime(),
                    }}
                />
            ));
        } else {
            return messages && JSON.parse(messages).map(message => (
                <Message
                    key={message.id}
                    user={message.user}
                    message={message}
                />
            ));
        }
    };

    const ScrollTobottom = () => {
        endOfMesgRef.current.scrollIntoView({
            behaviour: "smooth",
            block: "start"
        });
    };

    const sendMessage = (e) => {
        e.preventDefault();
        console.log("sendMessage");

        // update last seen
        db
            .collection("users")
            .doc(user.uid)
            .set(
                {
                    lastSeen: firebase.firestore.FieldValue.serverTimestamp()
                },
                { merge: true }
            );

        db
            .collection("chats")
            .doc(router.query.id)
            .collection("messages")
            .add(
                {
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    message: inputState,
                    user: user.email,
                    photoURL: user.photoURL
                }
            );

        setInputState("");
        ScrollTobottom();
    };

    return (
        <ChatScreenStyles>
            <ChatHeader recipientEmail={recipientEmail} />

            <MessageContainerStyle>
                {ShowMessage()}
                <EndOfMessageStyle ref={endOfMesgRef} />
            </MessageContainerStyle>

            <InputContainerStyle>
                <InsertEmoticonIcon />
                <InputStyle value={inputState} onChange={e => setInputState(e.target.value)} />
                <button
                    hidden
                    disabled={!inputState}
                    type="submit"
                    onClick={sendMessage}
                >
                    Send Message
                </button>
                <MicIcon />
            </InputContainerStyle>
        </ChatScreenStyles>
    );
};

const ChatScreenStyles = styled.div``;
const MessageContainerStyle = styled.div`
padding: 30px; 
background-color: #e5ded8; 
min-height:100vh; 
`;
const EndOfMessageStyle = styled.div`
margin-bottom: 50px;
`;
const InputContainerStyle = styled.form`
display:flex;
align-items: center;
padding:10px;
position:sticky; 
bottom:0; 
background-color:white;
z-index:100;
`;
const InputStyle = styled.input`
flex:1; 
outline:0; 
border:none; 
border-radius:10px; 
background-color:whitesmoke; 
padding: 20px; 
margin-left: 15px; 
margin-right: 15px; 
`;

export default ChatScreen;
