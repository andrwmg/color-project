import React, {useEffect} from 'react'
import { styled, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Link, useNavigate } from 'react-router-dom';
import './NewPaletteForm.css'
import PaletteMetaForm from './PaletteMetaForm';

const Tool = styled(Toolbar)(() => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginLeft: '24px',
    marginRight: '24px',
    minHeight: '64px'
  }
));

export default function PaletteFormNav ({open, palettes, handleDrawerOpen, handleSubmit, AppBar}) {
    useEffect(() => {
        ValidatorForm.addValidationRule('isPaletteUnique', (value) => {
        return palettes.every(
          ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
        )
      });
})
const navigate = useNavigate()
const goBack = () => {
  navigate('/')
}

    return(
    <div>
    <CssBaseline />
      <AppBar position="fixed" open={open} color='default'>
      <Tool>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: 'none' }) }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Create a Palette
        </Typography>
        <Button onClick={goBack} >Go back</Button>
        <PaletteMetaForm submitMe = {handleSubmit}/>
      </Tool>
    </AppBar>
    </div>
    )
}