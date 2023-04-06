import { border, color, display, styled } from '@mui/system'
import React, { Component } from 'react'
import Palette from './Palette'
import PaletteWrapper from './PaletteWrapper'
import seedColors from './seedColors'
import { Button } from '@mui/material';
import Delete from '@mui/icons-material/Delete'
import './MiniPalette.css'
import { useNavigate } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import { CSSTransition } from 'react-transition-group'
import {Del,Root} from './styles/MiniPaletteStyles'

// const Del = styled(Delete)(() => ({
//     position: 'absolute',
//     right: '0px',
//     top: '0px',
//     padding: '10px',
//     marginLeft: '125px',
//     display: 'inline-block',
//     color: 'white',
//     backgroundColor: '#eb3d30',
//     zIndex: 10,
//     width: '20px',
//     height: '20px',
//     opacity: 0,
//     transition: 'all .25s ease-in-out',
//     borderRadius: '10%'
// }))

// const Root = styled('div')(() => ({
//     backgroundColor: 'white',
//     border: '1px solid black',
//     borderRadius: '5px',
//     padding: '0.5rem',
//     position: 'relative',
//     cursor: 'pointer',
//     "&:hover #deletebutton": {
//         opacity: 1
//     }
// }))

const MiniPalette = React.memo((props) => {
    let { colors, emoji, paletteName, id,openConfirm } = props;

    const history = useNavigate();
    const handleClick = (e) => {
        e.preventDefault();
        history(`/palette/${id}`)
    }

    const handleOpen = (e) => {
        e.stopPropagation()
        openConfirm(id)
    }

    const miniColorBoxes = colors.map(c => (
        <div className='miniColor' key={uuid()} style={{ backgroundColor: c.color }} />
    ))
    return (
        <div>
            <Root onClick={handleClick}>
                <div>
                    <Del id='deletebutton' onClick={handleOpen}></Del>
                </div>
                <div className='colors'>
                    {miniColorBoxes}
                </div>
                <h5 className='title'>{paletteName}<span className='emoji'>{emoji}</span></h5>
            </Root>
        </div>
    )
})

export default MiniPalette