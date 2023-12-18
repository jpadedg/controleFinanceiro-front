'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import GridViewIcon from '@mui/icons-material/GridView';
import WalletIcon from '@mui/icons-material/Wallet';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/navigation';
import * as S from './style.jsx'


const drawerWidth = 280;

export const Menu = ({ children }) => {
    const router = useRouter();
    const doLogout = () => {
        if(typeof window !== 'undefined'){
            localStorage.removeItem('token')
            router.push('/login')
        }
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar
                position="fixed"
                sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
            >
            </AppBar>
            <Drawer
                sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
                '& .MuiPaper-root': {
                    backgroundColor: '#000',
                    color: '#fff'
                }
                }}
                variant="permanent"
                anchor="left"
            >
                <S.Typography variant='h1' color="primary" style={{ margin: '48px auto 20px auto' }} > YOURfinance </S.Typography>
                <List>
                    <ListItem disablePadding>
                        <S.Link href='/dashboard'>
                            <ListItemButton>
                                <ListItemIcon style={{ color: '#fff' }}>
                                    <GridViewIcon />
                                </ListItemIcon>
                                <ListItemText primary="Meu Painel" />
                            </ListItemButton>
                        </S.Link>
                    </ListItem>
                    <ListItem disablePadding>
                        <S.Link href='/categoria'>
                            <ListItemButton>
                                <ListItemIcon style={{ color: '#fff' }}>
                                    <WalletIcon />
                                </ListItemIcon>
                                <ListItemText primary="Categoria" />
                            </ListItemButton>
                        </S.Link>
                    </ListItem>
                    <ListItem disablePadding>
                        <S.Link href='/extrato'>
                            <ListItemButton>
                                <ListItemIcon style={{ color: '#fff' }}>
                                    <SwapHorizIcon />
                                </ListItemIcon>
                                <ListItemText primary="Extrato" />
                            </ListItemButton>
                        </S.Link>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={ doLogout }>
                            <ListItemIcon style={{ color: '#fff' }}>
                                <LogoutIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Sair" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
                {children}
            </Box>
        </Box>
    )
}

export default Menu;