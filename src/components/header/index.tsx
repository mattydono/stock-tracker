import React from 'react'
import styled from '@emotion/styled'
import logo from './logo.png'

const HeaderContainer = styled.div`
    grid-area: Header;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Nav = styled.div`
    display: flex;
    justify-content: space-evenly;
    flex: 0 0 600px;
    min-width: 15%;
    @media(max-width: 800px) {flex: 1 0 0}
`

const Logo = styled.img`
    width: 10%;
    height: 65%;
    min-width: 180px;
    max-width: 250px;
    min-height: 90px;
    max-height: 120px;
    color: white;
`

type ButtonProps = {
    active?: boolean
}

const Button = styled('button')<ButtonProps>`
    color: gray;
    height: 20%;
    flex: 0 0 20%;
    min-height: 50px;
    outline: none;
    border-radius: 10%;
    cursor: pointer;
    border: none;
    background: none;
    background-color: ${props => props.active ? '#0042a0' : 'none'};
    color: ${props => props.active ? 'white' : 'gray'};
    &:hover {
        background-color: #0042a0;
        color: white;
    }
`

const Header = () => {
    return (
        <HeaderContainer>
            <Logo src={logo}></Logo>
            <Nav>
                <Button active>QUOTES</Button>
                <Button>MARKETS</Button>
                <Button>WATCHLISTS</Button>
            </Nav>
        </HeaderContainer>
    )
}

export default Header