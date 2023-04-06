import React from "react";
import DraggableColorBox from "./DraggableColorBox";
import { styled } from '@mui/material/styles';
import {SortableContainer} from 'react-sortable-hoc';

const Root = styled('div')({
    height: '100%',
    })

const DraggableColorList = SortableContainer(({ colors, deleteColor }) => {
    return (
        <Root>
            {colors.map((color,i) => (
                <DraggableColorBox index={i} key={color.name} color={color.color} name={color.name} deleteColor={deleteColor} />
            ))}
        </Root>
    )
})

export default DraggableColorList