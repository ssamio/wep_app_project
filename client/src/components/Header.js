import React, { Suspense, useState, useEffect, useMemo } from 'react';
import { AppBar, Toolbar, Button, Box, IconButton, Menu, MenuItem} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import { checkAuth, checkAdmin, logout } from '../auth';
import { useNavigate } from 'react-router';

const CustomToolbar = styled(Toolbar)(({ theme }) => ({
        backgroundColor: '#282b30', 
        color: '#c1c1c1',
    }));

const ResponsiveAppBar = styled(AppBar)({
    '@media (max-width: 600px)': {
        '& .menu-button': {
        display: 'block',
        },
        '& .menu-items': {
        display: 'none',
        },
    },
    '@media (min-width: 601px)': {
        '& .menu-button': {
        display: 'none',
        },
        '& .menu-items': {
        display: 'flex',
        },
    },
});


const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [loginState, setLoginState] = useState(false);
    const [adminState, setAdminState] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setLoginState(checkAuth());
        setAdminState(checkAdmin());
    }, [checkAuth(), checkAdmin()])


    const { t, i18n } = useTranslation();

    const changeLanguage = (lang) =>{
        i18n.changeLanguage(lang);
    }

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogOut = () => {
        const status = checkAuth();
        if(status){
            logout();
            return navigate("/");
            
        }
        else{
            return null;
        }
    }

    const menuItems = useMemo(() => {
        const items = [];
        items.push(<MenuItem key={0} component={Link} to="/" onClick={handleMenuClose}>{t('Home')}</MenuItem>);
        if(loginState){
            items.push(<MenuItem key={1} onClick={() => {handleMenuClose(); handleLogOut()}}>{t('Logout')}</MenuItem>);
        }
        if(adminState){
            items.push(<MenuItem key={2} component={Link} to="/admin" onClick={handleMenuClose()}>{t('Admin')}</MenuItem>);
        }
        if(!loginState){
            items.push(<MenuItem key={3} component={Link} to="/register" onClick={handleMenuClose}>{t('Register')}</MenuItem>)
            items.push(<MenuItem key={4} component={Link} to="/login" onClick={handleMenuClose}>{t('Login')}</MenuItem>)
        }
        return items;
    }, [loginState, adminState]);


    return (
        <ResponsiveAppBar position="static">
            <CustomToolbar >
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    className="menu-button"
                    onClick={handleMenuOpen}
                >
                    <MenuIcon />
                </IconButton>
               
                    <div className="menu-items">
                        <Button component={Link} to="/" color="inherit">
                            {t('Home')}
                        </Button>
                        {
                            loginState ? 
                                <>
                                <Button onClick={handleLogOut} color="inherit">
                                    {t('Logout')}
                                </Button>
                                </>
                                :
                                <>
                                <Button component={Link} to="/register" color="inherit">
                                    {t('Register')}
                                </Button>
                                <Button component={Link} to="/login" color="inherit">
                                    {t('Login')}
                                </Button>
                                </>
                        }
                        {
                            loginState && adminState ?
                            <>
                                <Button component={Link} to="/admin">
                                    {t('Admin')}
                                </Button>
                            </>
                            :
                            <>
                            </>
                        }
                    </div>
                <Box sx={{ flexGrow: 1 }} />
                <Button id="en" onClick={()=> changeLanguage("en")} color="inherit">EN</Button> 
                <Button id="fi" onClick={()=> changeLanguage("fi")} color="inherit">FI</Button>
            </CustomToolbar>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
            {menuItems}  
            </Menu>
        </ResponsiveAppBar>

    )
}
export default function App(){
    return (
        <Suspense fallback="loading">
            <Header />
        </Suspense>
    )
}