import React from 'react';
import styled from 'styled-components';
import SidebarButton from './SidebarButton';
import SidebarHeader from './SidebarHeader';
import SidebarSearch from './SidebarSearch';
import Chat from '../Chat/Chat';
import * as EmailValidator from 'email-validator';
import { auth, db } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';

const Sidebar = () => {

    const [user] = useAuthState(auth);
    const userChatRef = db.collection("chats").where("users", "array-contains", user.email);
    const [chatSnapshot] = useCollection(userChatRef);

    const CreateChat = () => {
        const input = prompt("Please enter an email address for the user");

        if (!input) return null;

        if (
            EmailValidator.validate(input) &&
            !chatAlreadyExists(input) &&
            input !== user.email
        ) {
            // we need to add chat into the db 'chats' collection if it doesn't exist and is valid. 
            db
                .collection("chats")
                .add({
                    users: [user.email, input]
                });
        }
    };

    const chatAlreadyExists = (recipientEmail) => {
        return !!chatSnapshot?.docs.find(
            chat => chat.data().users.find(
                user => (user === recipientEmail)?.length > 0
            )
        );
    };

    return (
        <StyleContainer>
            <SidebarHeader />
            <SidebarSearch />
            <SidebarButton cbFunction={CreateChat} />

            {/* list of chat */}
            {chatSnapshot?.docs.map(chat => (
                <Chat key={chat.id} id={chat.id} users={chat.data().users} />
            ))}
        </StyleContainer>
    );
};

export default Sidebar;

const StyleContainer = styled.div`
flex: 0.45; 
border-right: 1px solid whitesmoke;
height: 100vh; 
min-width: 300px; 
max-width: 350px; 
overflow-y:scroll;

::-webkit-scrollbar {
    display: none; 
}

-ms-overflow-style: none; 
scrollbar-width: none; 
`;
