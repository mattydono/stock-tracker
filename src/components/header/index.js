import React, { useState } from 'react'
import styled from '@emotion/styled'
import logo from './logo.png'
import './style.css'

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

const Header = () => {

    const [activeTab, setActiveTab] = useState(null)

    return (
        <HeaderContainer>
            <Logo src={logo}></Logo>
            <Nav>
                <button className={activeTab === 1 ? 'active' : 'inactive'} onClick={() => setActiveTab(1)}>QUOTES</button>
                <button className={activeTab === 2 ? 'active' : 'inactive'} onClick={() => setActiveTab(2)}>MARKETS</button>
                <button className={activeTab === 3 ? 'active' : 'inactive'} onClick={() => setActiveTab(3)}>WATCHLISTS</button>
            </Nav>
        </HeaderContainer>
    )
}

export default Header