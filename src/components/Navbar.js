"use client"

import * as React from 'react';
import {
    AppBar,
    Box,
    Button,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Toolbar,
    Typography
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function Navbar() {
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen((prevState) => !prevState)
    }

    const navLinks = [
        {title: `Create`, path: `/create`},
        {title: `My Items`, path: `/items`}
    ]

    const pathname = usePathname()

    return (
        <Box sx={{display: 'flex', flexGrow: 1}}>
            <AppBar position="static" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
                <Toolbar sx={{gap: 1}}>
                    <Box sx={{display: 'flex', height: '100%', alignItems: 'center', gap: 1}}>
                        <Link href="/" style={{color: 'inherit', textDecoration: 'none'}}>
                            <Typography variant="h6">
                                Racing
                            </Typography>
                        </Link>
                        <Divider orientation="vertical" variant="middle" flexItem/>
                    </Box>
                    <Box sx={{display: {xs: 'none', sm: 'flex'}, gap: 1}}>
                        {navLinks.map(({title, path}) => (
                            <Link href={path} key={title}>
                                <Button variant={pathname === path ? 'contained' : 'text'} sx={{color: '#fff'}}>
                                    {title}
                                </Button>
                            </Link>
                        ))}
                    </Box>
                    <Box sx={{flexGrow: 1}}/>
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
            <Drawer
                anchor="right"
                variant="temporary"
                open={drawerOpen}
                PaperProps={{sx: {width: '100%'}}}
            >
                <Toolbar/>
                <Box sx={{overflow: 'auto'}} onClick={handleDrawerToggle}>
                    <List>
                        {navLinks.map(({title, path}) => (
                            <Link href={path} key={title} style={{textDecoration: 'none', color: 'black'}}>
                                <ListItem>
                                    <ListItemButton selected={pathname === path}>
                                        <ListItemText primary={title}/>
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </Box>
    )
}