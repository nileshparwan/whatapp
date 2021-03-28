import React from 'react';
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';

const SidebarSearch = () => {
    return (
        <SearchStyle>
            <SearchIcon />
            <SearchInputStyle placeholder="Search" />
        </SearchStyle>
    );
};

const SearchStyle = styled.div`
display:flex; 
align-items: center;
padding: 20px; 
border-radius: 2px; 
`;

const SearchInputStyle = styled.input`
outline-width: 0; 
border: none; 
flex: 1; 
`;


export default SidebarSearch;
