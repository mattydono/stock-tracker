import React from 'react'
import logo from './logo.png'
import styled from '@emotion/styled'

const HeaderContainer = styled.div`
    flex: 1 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media(max-width: 800px) {
        flex-direction: column;
    }
`

const Nav = styled.div`
    display: flex;
    justify-content: space-evenly;
    flex: 0 0 300px;
    min-width: 15%;
    @media(max-width: 800px) {
        justify-content: space-between;
        width: 300px;
        max-height: 100px;
    }
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

const Button = styled.button`
    color: gray;
    color: ${(props: any) => props.color};
    height: 20%;
    flex: 0 0 20%;
    min-height: 50px;
    outline: none;
    border-radius: 10%;
    cursor: pointer;
    border: none;
    background-color: rgba(0,0,0,0);
    background: ${(props: any) => props.value};
    align-items: center;
    &:hover {
        background-color: #0042a0;
        color: white;
    }
`

const Header = () => {
    return (
        <HeaderContainer>
            <Logo src={logo} />
            <Nav>
                <Button color='white' value='#0042a0'>QUOTES</Button>
                <Button>MARKETS</Button>
                <Button>WATCHLISTS</Button>
            </Nav>
        </HeaderContainer>
    )
}

export default Header