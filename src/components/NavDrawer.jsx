import {Box, Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar} from "@mui/material";


export default function NavDrawer({open, setOpen}) {
    const handleMenuItemClicked = () => {
        setOpen(false)
        console.log("here")
    }
    return (
        <Drawer
            anchor="right"
            variant="temporary"
            open={open}
            PaperProps={{sx: {width: '100%'}}}
        >
            <Toolbar/>
            <Box sx={{overflow: 'auto'}} onClick={handleMenuItemClicked} >
                <List>
                    <ListItem>
                        <ListItemButton>
                            <ListItemText primary="Item 1"/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton>
                            <ListItemText primary="Item 2"/>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    )
}