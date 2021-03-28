import React from 'react';
import moment from 'moment';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';
import { auth } from '../../config/firebase';

const Message = ({ user, message }) => {
    const [userLoggedIn] = useAuthState(auth);

    const TypeOfMessage = user === userLoggedIn.email ? SenderStyle : ReceiverStyle;

    return (
        <MessageContainerStyle>
            <TypeOfMessage>
                {message?.message}
                <TimestampStyle>
                    {message.timestamp ? moment(message.timestamp).format('LT') : "..."}
                </TimestampStyle>
            </TypeOfMessage>
        </MessageContainerStyle>
    );
};

const MessageContainerStyle = styled.div``;

const MessageElementStyle = styled.p`
width: fit-content;
padding: 15px; 
border-radius: 8px; 
margin: 10px; 
min-width: 60px; 
padding-bottom: 26px; 
position: relative;
text-align: right; 
`;

const SenderStyle = styled(MessageElementStyle)`
margin-left:auto; 
background-color: #dcf8c6; 
`;

const ReceiverStyle = styled(MessageElementStyle)`
background-color: whitesmoke; 
text-align: left;
`;

const TimestampStyle = styled.span`
color: gray; 
padding: 10px; 
font-size: 9px; 
position: absolute;
bottom: 0; 
text-align: right;
right: 0; 
`;

export default Message;
