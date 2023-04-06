import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart'


export default function PaletteMetaForm(props) {
    const {submitMe} = props

    const [stage, setStage] = React.useState('hideForm');
    const [newPaletteName, setNewPaletteName] = React.useState('')
    const handleClickOpen = () => {
      setStage('form');
    };
  
    const handleClose = () => {
      setStage('hideForm');
    };

    const handleChange = (evt) => {
        setNewPaletteName(evt.target.value)
    }

    const handleSubmit = (evt) => {
        let newPalette = {
            paletteName: newPaletteName,
            emoji: evt.native
        }
        submitMe(newPalette)
    }

    const handleEmojiOpen = () => {
        setStage('emoji');
    }

    return (
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Save Palette
        </Button>
        <Dialog open={stage==='emoji'} onClose={handleClose}>
        <Picker title='Pick palette emoji!' onSelect={handleSubmit} />
        </Dialog>
        <Dialog open={stage==='form'} onClose={handleClose}>
          <DialogTitle>Palette Title</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter a title for your new palette!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Palette Title"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleEmojiOpen}>Submit</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
