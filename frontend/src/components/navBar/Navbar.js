import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import './Navbar.css';

function Navbar() {
    const [click, setClick] = useState(false);

    const onMenuClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    return (
        <React.Fragment>
            <AppBar position='sticky' color="transparent">
                    <Toolbar className='nav-bar-container'
                    >
                        <div className='logo-container'>
                            <Typography variant='h6'>Website Name</Typography>
                            <Link to='/home' className='logo-link'>
                                < Button className='logo'>
                                    <i className="fas fa-globe"></i>
                                </Button>
                            </Link>
                            </div>
                        <Link to='/'>
                            <IconButton className='hamburger-icon' edge="start" aria-label="menu" onClick={onMenuClick}>
                                {click ? <CloseIcon /> : <MenuIcon />}
                            </IconButton>
                        </Link>
                        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                            <li className='nav-item' >
                                <Link to='/home'
                                    className='nav-links'
                                    onClick={closeMobileMenu}>
                                    Home
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link to='/addBlog'
                                    className='nav-links'
                                    onClick={closeMobileMenu}>
                                    Add Blog
                                </Link>
                            </li>
                        </ul>
                    </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}

export default Navbar
