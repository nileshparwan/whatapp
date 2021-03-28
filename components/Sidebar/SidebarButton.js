import React from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';

const SidebarButton = ({cbFunction}) => { 
    return (
        <ButtonStyle onClick={cbFunction}>
            start a new chat
        </ButtonStyle>
    );
};

const ButtonStyle = styled(Button)`
width: 100%; 

&&{
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
}
`;

export default SidebarButton;
