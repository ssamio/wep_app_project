//Just a footer made with material
import { styled } from '@mui/material/styles';
import { Suspense } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

//Custom components for footer
const Container = styled('div')({
    width: '100%',
    position: 'fixed',
    bottom: 0
});

const CustomToolbar = styled(Toolbar)(({ theme }) => ({
    backgroundColor: '#282b30', 
    color: '#909090',
}));
//A sticky footer with simple text. Not much else
const Footer = () => {
    const { t, i18n } = useTranslation();
    return (
        <Container className="footer--pin">
        <AppBar position="static" color="primary">
            <CustomToolbar>
            <Typography variant="body1" color="inherit">
                {t('Sami')}
            </Typography>
            </CustomToolbar>
        </AppBar>
        </Container>
    );
};

export default function App(){
    return (
        <Suspense fallback="loading">
            <Footer />
        </Suspense>
    )
}
