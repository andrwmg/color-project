import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import 'emoji-mart/css/emoji-mart.css';
import { List, ListItem, ListItemAvatar, ListItemText, Avatar } from "@mui/material";
import { Check, Close } from "@mui/icons-material";
import { blue, red } from "@mui/material/colors";

export default function DeleteConfirmation(props) {
    const { deletePalette, id, paletteName, open, handleClose } = props

    // const [stage, setStage] = React.useState('hideForm');

    // const handleClickOpen = () => {
    //     setStage('form');
    // };

    // const handleClose = () => {
    //     setStage('hideForm');
    // };

    const handleSubmit = () => {
        deletePalette(id)
        handleClose()
    }

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby='delete-dialog-title'>
                <DialogTitle id='delete-dialog-title'>Delete this palette?</DialogTitle>
                    <List>
                        <ListItem button onClick={handleSubmit}>
                            <ListItemAvatar>
                                <Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
                                    <Check></Check>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText>
                                Delete
                            </ListItemText>
                        </ListItem>
                        <ListItem button onClick={handleClose}>
                            <ListItemAvatar>
                                <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                                    <Close></Close>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText>
                                Cancel
                            </ListItemText>
                        </ListItem>
                    </List>
                {/* <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Delete</Button>
                </DialogActions> */}
            </Dialog>
        </div>
    );
}
