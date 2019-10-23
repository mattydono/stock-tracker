import React from 'react'
import logo from './logo.png'
import styled from '@emotion/styled'

const HeaderContainer = styled.div`
    flex: 1 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: -12px;
`

const Nav = styled.div`
    display: flex;
    justify-content: space-evenly;
    flex: 0 0 400px;
    margin-right: -30px;
    min-width: 15%;
    @media(max-width: 1099px) {
        margin-right: -25px;
    };
    @media(max-width: 750px) {
        flex: 1 0 0;
        margin-left: 77px;
        margin-right: -8px;
    };
    @media(max-width: 588px) {
        display: none;
    }
`

const Logo = styled.img`
    width: 155px;
    height: 75px;
    color: white;
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