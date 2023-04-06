import React from "react";
import { useParams } from "react-router-dom";
import generatePalette from "./colorHelpers";
import seedColors from './seedColors'
import SingleColorPalette from "./SingleColorPalette";



function SingleColorWrapper (props) {
    const {palettes} = props
    const findPalette = val => {
        const palette = palettes.find(p => (
            p.id.toLowerCase() === val.toLowerCase()))
            return palette
    }
    const {id, colorId} = useParams()
    let palette = findPalette(id)
    return <SingleColorPalette palette={generatePalette(palette)} colorId= {colorId} />
}

export default SingleColorWrapper