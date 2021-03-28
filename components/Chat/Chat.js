import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Avatar, IconButton } from '@material-ui/core';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';

import { auth, db } from '../../config/firebase';
import { getRecipientEmail } from '../../utils/getRecipientEmail';

const Chat = ({ id, users }) => {
    const [user] = useAuthState(auth);
    const router = useRouter();

    const [recipientSnapshot] = useCollection(
        db.collection("users").where("email", "==", getRecipientEmail(users, user))
    );

    const recipient = recipientSnapshot?.docs?.[0]?.data();
    const recipientEmail = getRecipientEmail(users, user);

    const enterChat = () => {
        router.push(`/chat/${id}`);
    };

    return (
        <ChatStyle onClick={enterChat}>
            {
                recipient ? (
                    <UserAvatarStyle src={recipient?.photoUrl} />
                ) : (
                    <UserAvatarStyle>
                        {recipientEmail[0]}
                    </UserAvatarStyle>
                )
            }
            <p>{recipientEmail}</p>
        </ChatStyle>
    );
};

const ChatStyle = styled.div`
display:flex; 
align-items: center;
cursor: pointer;
padding:15px; 
word-break: break-word;

:hover{
    background-color: #e9eaeb; 
}
`;

const UserAvatarStyle = styled(Avatar)`
margin: 5px; 
margin-right: 15px;
`;

export default Chat;
