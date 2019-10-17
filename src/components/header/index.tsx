import React from 'react'
import logo from './logo.png'
import styled from '@emotion/styled'

const HeaderContainer = styled.div`
    flex: 1 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media(max-width: 500px) {
        justify-content: center;
    };
`

const Nav = styled.div`
    display: flex;
    justify-content: space-evenly;
    flex: 0 0 400px;
    min-width: 15%;
    @media(max-width: 588px) {
        display: none;
    }
`

const Logo = styled.img`
    width: 155px;
    color: white;
    @media(max-width: 375px) {
        display: none;
    }
`

const Button = styled.button`
    ${(props: any) => props.style}
    color: gray;
    color: ${(props: any) => props.color};
    height: 31px;
    min-width: 98px;
    font-size: 18px;
    outline: none;
    border-radius: 3px;
    cursor: pointer;
    border: none;
    background-color: rgba(0,0,0,0);
    align-items: center;
    &:hover {
        color: white;
        background-color: rgba(0, 104, 255, 0.5);
    };
`

const Header = () => {
    return (
        <HeaderContainer>
            <Logo src={logo} />
            <Nav>
                <Button style={{color: 'white', backgroundColor: 'rgba(0, 104, 255, 0.5)'}} >QUOTES</Button>
                <Button>MARKETS</Button>
                <Button>WATCHLISTS</Button>
            </Nav>
        </HeaderContainer>
    )
}

export default Header