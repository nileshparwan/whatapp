import React from 'react';
import styled from 'styled-components';
import { Avatar, IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { auth } from '../../config/firebase';

const SidebarHeader = () => {
    return (
        <HeaderStyle>
            <UserAvatarStyle onClick={() => auth.signOut()}/>

            <IconStyle>
                <IconButton>
                    <ChatIcon />
                </IconButton>

                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            </IconStyle>

        </HeaderStyle>
    );
};

const HeaderStyle = styled.div`
display:flex;
position:sticky; 
top:0;
background-color:white;
z-index:1; 
justify-content: space-between;
align-items: center;
padding:15px; 
height: 80px;
border-bottom: 1px solid whitesmoke; 
`;

const UserAvatarStyle = styled(Avatar)`
cursor: pointer;
:hover{
    opacity: 0.8; 
}
`;

const IconStyle = styled.div``;


export default SidebarHeader;
