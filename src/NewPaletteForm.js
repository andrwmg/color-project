import React, {useEffect } from 'react'
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Button } from '@mui/material';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Link, useNavigate } from 'react-router-dom';
import './NewPaletteForm.css'
import DraggableColorList from './DraggableColorList';
import { arrayMove } from 'react-sortable-hoc';
import PaletteMetaForm from './PaletteMetaForm';
import PaletteFormNav from './PaletteFormNav';



const drawerWidth = 400;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    height: 'calc(100vh - 64px)',
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function NewPaletteForm(props) {
  const navigate = useNavigate()
  const { palettes } = props
  const theme = useTheme();
  const maxColors = 20;
  const [open, setOpen] = React.useState(false);
  const [currentColor, setCurrentColor] = React.useState('green')
  const [newColorName, setNewColorName] = React.useState('')
  const [colors, setColors] = React.useState(palettes[0].colors)
  const paletteIsFull = colors.length >= maxColors

  useEffect(() => {
    ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
      return colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    });
    ValidatorForm.addValidationRule('isColorUnique', (value) => {
      console.log(currentColor)
      return colors.every(
        ({ color }) => color !== currentColor
      )
    });
    ValidatorForm.addValidationRule('isPaletteUnique', (value) => {
      console.log(currentColor)
      return palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    });
  }, [colors, currentColor])

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const updateCurrentColor = (newColor) => {
    setCurrentColor(newColor.hex)
  }

  const addCurrentColor = () => {
    if (colors.length < 20) {
      setColors([...colors, { color: currentColor, name: newColorName }])
      setNewColorName('')
      setCurrentColor('#FFFFFF')
    }
  }

  const deleteColor = (colorName) => {
    setColors(colors.filter(col => col.name !== colorName))
  }

  const handleChange = (evt) => {
    setNewColorName(evt.target.value)
  }

  const handlePaletteChange = (evt) => {
    console.log(evt.target.value)
  }

  const handleSubmit = (newPalette) => {
    newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, '-')
    newPalette.colors = colors
    props.savePalette(newPalette)
    navigate('/')
  }

  const onSortEnd = ({oldIndex, newIndex}) => {
    setColors(arrayMove(colors, oldIndex, newIndex)
    )};

  const clearColors = () => {
    setColors([])
  }

  const randomColor = () => {
    const allColors = palettes.map(p => p.colors).flat()
    const remainingColors = allColors.filter(c => !colors.includes(c) )
    let randomNumber = Math.floor(Math.random() * remainingColors.length)
    let randomColor = remainingColors[randomNumber]
    setColors([...colors, randomColor])
    }

  return (
    <Box sx={{ display: 'flex' }}>
      <PaletteFormNav open={open} palettes={palettes} handleDrawerOpen={handleDrawerOpen} handleSubmit={handleSubmit} AppBar={AppBar}/>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Typography variant='h4'>Design Your Palette</Typography>
        <div>
          <Button variant='contained' color='secondary' onClick={clearColors}>Clear Palette</Button>
          <Button variant='contained' color='primary' onClick={randomColor} disabled={colors.length >= maxColors}>Random Color</Button>
        </div>
        <ChromePicker color={currentColor} onChangeComplete={updateCurrentColor} />
        <ValidatorForm onSubmit={addCurrentColor} id='Nav'>
          <TextValidator
            value={newColorName}
            validators={['required', 'isColorNameUnique', 'isColorUnique']}
            errorMessages={['This field is required', 'Color name is already taken', 'Color is already taken']}
            onChange={handleChange}
          />
          <Button variant="contained" color='primary' style={{ backgroundColor: paletteIsFull ? 'gray'  : currentColor }} type='submit' disabled={paletteIsFull}>{paletteIsFull ? 'Palette Full' : 'Add Color'}</Button>
        </ValidatorForm>


      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <DraggableColorList onSortEnd={onSortEnd} axis='xy' colors={colors} deleteColor={deleteColor}></DraggableColorList>
      </Main>
    </Box>
  );
}