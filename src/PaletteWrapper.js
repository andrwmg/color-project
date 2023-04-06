import React from "react";
import { useParams } from "react-router-dom";
import generatePalette from "./colorHelpers";
import Palette from "./Palette";
import seedColors from './seedColors'


function PaletteWrapper (props) {
    const {palettes} = props
    const findPalette = val => {
        const palette = palettes.find(p => (
            p.id.toLowerCase() === val.toLowerCase()))
            return palette
    }
    console.log(props)
    const {id} = useParams()
    let palette = findPalette(id)
    return <Palette palette={generatePalette(palette)} />
}

export default PaletteWrapper