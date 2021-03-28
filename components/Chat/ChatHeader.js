import { Avatar, IconButton } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachIcon from '@material-ui/icons/AttachFile';
import { useCollection } from 'react-firebase-hooks/firestore';
import TimeAgo from 'timeago-react';
import { db } from '../../config/firebase';

const ChatHeader = ({ recipientEmail }) => {
    const [recipientSnapshot] = useCollection(
        db
            .collection("users")
            .where("email", "==", recipientEmail)
    );

    const recipient = recipientSnapshot?.docs?.[0]?.data();

    return (
        <HeaderStyle>
            {
                recipient ? (
                    <Avatar src={recipient?.photoUrl} />
                ) : (
                    <Avatar>
                        {recipientEmail[0]}
                    </Avatar>
                )
            }

            <HeaderInformationStyle>
                <h3>{recipientEmail}</h3>
                {
                    recipientSnapshot ? (
                        <p>
                            Last active: {" "}
                            {
                                recipient?.lastSeen?.toDate() ? (
                                    <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
                                ) : "Unavailable"
                            }
                        </p>
                    ) : (
                        <p>Loadinging last active...</p>
                    )
                }
            </HeaderInformationStyle>

            <HeaderIconStyle>
                <IconButton>
                    <AttachIcon />
                </IconButton>

                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            </HeaderIconStyle>
        </HeaderStyle>
    );
};

const HeaderStyle = styled.div`
position:sticky;
background-color:white;
z-index:100; 
top:0; 
display:flex;
padding:11px; 
height: 80px;
align-items:center;
border-bottom:1px solid whitesmoke;
`;

const HeaderInformationStyle = styled.div`
margin-left: 15px; 
flex:1; 

> h3 {
    margin-bottom:3px; 
}

> p {
    font-size:14px; 
    color:gray; 
}
`;

const HeaderIconStyle = styled.div`

`;

export default ChatHeader;
