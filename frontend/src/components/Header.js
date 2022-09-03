import React, { useEffect, useState } from 'react'
// import { LinkContainer } from 'react-router-bootstrap'
// import { Navbar, Nav, Container, Button } from 'react-bootstrap'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import axios from 'axios'

import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { useLocation, useNavigate } from 'react-router-dom';


const Header = () => {


    const [user, setUser] = useState(null)
    const [supplier, setSupplier] = useState(null)

    let location = useLocation()
    const navigate = useNavigate()

    const signoutHandler= ()=>{
        localStorage.clear()
        navigate('/')
    }

    const getUser = () => {
        console.log(localStorage.getItem('user'))
        setUser(JSON.parse(localStorage.getItem('user')))
    }

    useEffect(() => {

        console.log(`You changed the page to: ${location.pathname}`)
        getUser()
    }, [location])


    return (
        <header>
            <AppBar
                position="static"
                color="default"
                elevation={0}
                style={{ backgroundColor: 'silver' }}
            //   sx={{ borderBottom: (theme) => 1px solid ${theme.palette.divider} }}
            >
                <Toolbar sx={{ flexWrap: 'wrap' }}>
                    <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                        <Link href="/" style={{ textDecoration: 'none' }}>
                            <img src="https://scontent.xx.fbcdn.net/v/t1.15752-9/298519177_443495551156835_3411414719100926470_n.png?_nc_cat=102&ccb=1-7&_nc_sid=aee45a&_nc_eui2=AeFrwtey2Y8A_60IEun-7EFj9YMKoj4KFlL1gwqiPgoWUp4YIFZUmA3NErDaGBrKv4kJxT1kbivUT9sSGxAtoHck&_nc_ohc=bjTy0oc99JEAX99IDvR&_nc_oc=AQmNSwpH79yhtfFmjMX6XfozxtAyJV-tRoe38hF0YVo_Y9DiRPbXMmctsD1x1Tk7f5MWTO2uHn1ZnMAGvwJfQMrh&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AVJHFm0ETgCbFXVYAbFQNcLFTgEubq4qFhAi-2i0IPxQYg&oe=6339B532" width="50" height="50" alt="EidBazar"/>
                        </Link>
                    </Typography>
                    <nav>

                        <Link
                            variant="button"
                            color="text.primary"
                            href="/cart"
                            sx={{ my: 1, mx: 1.5 }}
                            style={{ textDecoration: 'none' }}
                        >
                            <ShoppingCartIcon></ShoppingCartIcon>
                           cart
                        </Link>

                       

                        <Link
                            variant="button"
                            color="text.primary"
                            href="/order"
                            sx={{ my: 1, mx: 1.5 }}
                            style={{ textDecoration: 'none' }}
                        >
                            <AccountCircleIcon></AccountCircleIcon>
                            Profile
                        </Link>


                    </nav>
                    <>
                    {!user &&
                            <Button href="/signin" variant="text" sx={{ my: 1, mx: 1.5 }}>
                                                            <LoginIcon></LoginIcon>

                            Login
                        </Button>
                        }
                        {user &&
                            <Button onClick={signoutHandler} variant="text" sx={{ my: 1, mx: 1.5 }}>
                                                        <LogoutIcon></LogoutIcon>
                            Log out
                        </Button>
                        }
                    </>
                </Toolbar>
            </AppBar>
        </header>
    )
}

export default Header