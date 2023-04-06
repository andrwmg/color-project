import {styled } from '@mui/system'
import { Delete } from '@mui/icons-material'


export const Del = styled(Delete)(() => ({
    position: 'absolute',
    right: '0px',
    top: '0px',
    padding: '10px',
    marginLeft: '125px',
    display: 'inline-block',
    color: 'white',
    backgroundColor: '#eb3d30',
    zIndex: 10,
    width: '20px',
    height: '20px',
    opacity: 0,
    transition: 'all .25s ease-in-out',
    borderRadius: '10%'
}))

export const Root = styled('div')(() => ({
    backgroundColor: 'white',
    border: '1px solid black',
    borderRadius: '5px',
    padding: '0.5rem',
    position: 'relative',
    cursor: 'pointer',
    "&:hover #deletebutton": {
        opacity: 1
    }
}))