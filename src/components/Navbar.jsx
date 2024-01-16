"use client"

import * as React from 'react';
import {AppBar, Box, Button, Divider, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import NavDrawer from "@/components/NavDrawer";

export default function Navbar() {
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen((prevState) => !prevState)
    }

    return (
        <Box sx={{display: 'flex', flexGrow: 1}}>
            <AppBar position="static" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
                <Toolbar sx={{gap: 1}}>
                    <Box sx={{display: {xs: 'none', sm: 'flex'}, height: '100%', alignItems: 'center', gap: 1}}>
                        <Typography variant="h6">
                            LOGO
                        </Typography>
                        <Divider orientation="vertical" variant="middle" flexItem />
                    </Box>
                    <Box sx={{display: {xs: 'none', sm: 'block'}}}>
                        <Button sx={{color: '#fff'}}>
                            Item 1
                        </Button>
                        <Button sx={{color: '#fff'}}>
                            Item 2
                        </Button>
                    </Box>
                    <Box sx={{display: {xs: 'flex', sm: 'none'}, height: '100%', alignItems: 'center', gap: 1, flexGrow: 1}}>
                        <Typography variant="h6">
                            LOGO
                        </Typography>
                        <Divider orientation="vertical" variant="middle" flexItem />
                    </Box>
                    <IconButton
                        size="large"
                        color="inherit"
                        onClick={handleDrawerToggle}
                        sx={{display: {sm: 'none'}}}
                    >
                        <MenuIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <NavDrawer open={drawerOpen} setOpen={setDrawerOpen}/>
        </Box>
    )
}