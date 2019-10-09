import React from 'react'
import logo from './logo.png'
import './index.css'

const Header = () => {
    return (
        <div className='HeaderContainer'>
            <img className='Logo' src={logo}></img>
            <div className='Nav'>
                <button className='Button active' >QUOTES</button>
                <button className='Button'>MARKETS</button>
                <button className='Button'>WATCHLISTS</button>
            </div>
        </div>
    )
}

export default Header