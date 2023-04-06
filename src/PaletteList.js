import React, { Component } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import Palette from "./Palette";
import seedColors from "./seedColors";
import generatePalette from "./colorHelpers";
import MiniPalette from "./MiniPalette";
import './PaletteList.css'
import { v4 as uuid } from 'uuid'
import bg from './subtle-prism.svg'
import { CSSTransition, TransitionGroup } from "react-transition-group";
import DeleteConfirmation from "./DeleteConfirmation";

const Root = styled('div')(() => ({
    backgroundColor: 'blue',
    height: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundImage: `url(${bg})`,
    overflow: 'scroll'
}))

export default function PaletteList(props) {
    const { palettes, deletePalette } = props
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
    const [id, setId] = React.useState('')

    const handleOpen = (id) => {
        setDeleteDialogOpen(true)
        setId(id)
    }

    const handleClose = () => {
        setDeleteDialogOpen(false);
        setId('')
    };

    return (
        <Root className="PaletteList">
            <div className="PaletteList-container">
                <nav className="PaletteList-nav">
                    <h1>React Colors</h1>
                    <Link to='/palette/new'>Create Palette</Link>
                </nav>
                <DeleteConfirmation deletePalette={deletePalette} open={deleteDialogOpen} handleClose={handleClose} id={id} />
                <TransitionGroup className="PaletteList-palettes">
                    {palettes.map(palette => (
                        <CSSTransition key={palette.id} timeout={500} classNames='fade'>
                            <MiniPalette key={uuid()} {...palette} openConfirm={handleOpen} />
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </div>
        </Root>
    )
}