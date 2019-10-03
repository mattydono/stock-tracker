import React from 'react'
import styled from '@emotion/styled'
import logo from './logo.png'

const HeaderContainer = styled.div`
    height: 10vh;
    width: 100%;
    display: flex;
    justify-content: space-between;
`

const Logo = styled.img`
    width: 12%;
    height: 100%;
    color: white;
`

const Nav = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 1%;
    margin-right: 10%;
`

type ButtonProps = {
    active?: boolean
}

const Button = styled('button')<ButtonProps>`
    color: gray;
    height: 50%;
    width: 50%;
    outline: none;
    border-radius: 10%;
    cursor: pointer;
    margin-right: 10%;
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