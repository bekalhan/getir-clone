import { Stack ,Box, List, ListItem, ListItemButton, Typography} from '@mui/material'
import React from 'react';
import Navigate from './navigate';
import CottageIcon from '@mui/icons-material/Cottage';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';




function MyAdress() {
  return (
    <Stack direction="row">
        <Navigate />
        <Box flex={5}  sx={{background:"white",marginLeft:"2rem",marginRight:"22rem",marginTop:"2rem"}}>
            <Typography>Adreslerim</Typography>
                <List>
                    <ListItem>
                        <ListItemButton>
                            <ListItemButton>
                                    <CottageIcon color="secondary" />
                                    <Typography sx={{marginLeft:"3em",fontWeight:"100"}}>Kavakpınar Mahallesi Cemil meriç Caddesi Tekel Sokak no:6</Typography>
                                    <DeleteIcon color="secondary" sx={{marginLeft:"2em",fontSize:"32px"}} />
                            </ListItemButton>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton>
                            <ListItemButton>
                                    <CottageIcon color="secondary" />
                                    <Typography sx={{marginLeft:"3em",fontWeight:"100"}}>Kavakpınar Mahallesi Cemil meriç Caddesi Tekel Sokak no:6</Typography>
                                    <DeleteIcon color="secondary" sx={{marginLeft:"2em",fontSize:"32px"}} />
                            </ListItemButton>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton>
                            <ListItemButton>
                                    <CottageIcon color="secondary" />
                                    <Typography sx={{marginLeft:"3em",fontWeight:"100"}}>Kavakpınar Mahallesi Cemil meriç Caddesi Tekel Sokak no:6</Typography>
                                    <DeleteIcon color="secondary" sx={{marginLeft:"2em",fontSize:"32px"}} />
                            </ListItemButton>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton>
                            <ListItemButton>
                                    <CottageIcon color="secondary" />
                                    <Typography sx={{marginLeft:"3em",fontWeight:"100"}}>Kavakpınar Mahallesi Cemil meriç Caddesi Tekel Sokak no:6</Typography>
                                    <DeleteIcon color="secondary" sx={{marginLeft:"2em",fontSize:"32px"}} />
                            </ListItemButton>
                        </ListItemButton>
                    </ListItem>
                </List>
                <Box sx={{marginTop:"2rem",fontWeight:"100"}}>
                    <Typography>Adres Ekle</Typography>
                    <List>
                    <ListItem>
                        <ListItemButton>
                            <ListItemButton>
                                    <CottageIcon sx={{color:"red"}} />
                                    <Typography sx={{marginLeft:"3em",fontWeight:"100"}}>Ev Adresi Ekle</Typography>
                                    <AddIcon color="secondary" sx={{marginLeft:"2em",fontSize:"32px",marginLeft:"auto"}} />
                            </ListItemButton>
                        </ListItemButton>
                    </ListItem>
                    </List>
                </Box>
        </Box>
    </Stack>
  )
}

export default MyAdress