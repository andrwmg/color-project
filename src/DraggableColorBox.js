import React from 'react'
import chroma from 'chroma-js';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import {SortableElement} from 'react-sortable-hoc';

const Root = styled('div')({
    width: '20%',
    height: '25%',
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-7px',
    '&:hover svg': {
        color: 'white',
        transform: 'scale(1.5)'
    }
})

const Box = styled('div')({
    position: 'absolute',
    width: '100%',
    left: 0,
    bottom: 0,
    padding:'10px',
    color: 'black',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontSize: '12px',
    display: 'flex',
    justifyContent: 'space-between'
})

const Delete = styled(DeleteIcon)({
    transition: 'all 0.3s ease-in-out'
})

const DraggableColorBox = SortableElement(({ name, color, deleteColor }) => {
    const isDarkColor = chroma(color).luminance() <= .08;
    // const isLightColor = chroma(color).luminance() >= .5;

    let handleClick = () => {
        deleteColor(name)
    }
    return (
        <Root style={{ background: color }} className='DraggableColorBox'>
            <div className='copy-container'>
                <Box className='box-content'>
                    <span className={isDarkColor ? 'lightText' : undefined}>{name}</span>
                    <Delete value={color} className='deleteIcon' onClick={handleClick}/>
                </Box>
            </div>
        </Root>
    )
})

export default DraggableColorBox