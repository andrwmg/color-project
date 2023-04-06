import React, { Component } from 'react'
import ColorBox from './ColorBox'
import './SingleColorPalette.css'
import Navbar from './Navbar'
import { Link } from 'react-router-dom';

class SingleColorPalette extends Component {
    constructor(props) {
        super(props);
        this.state = {
            format:'hex'
        }
        this.changeFormat = this.changeFormat.bind(this)

    }
    changeFormat(val) {
        this.setState({format: val})
    }

    render() {
        let { palette, colorId } = this.props
        let {format} = this.state
        let gatherShades = (palette, colorToSearchFor) => {
            let shades = []
            let allColors = palette.colors
            for (let key in allColors) {
                shades = shades.concat(allColors[key].filter(c => (
                    c.id.toLowerCase() === colorToSearchFor.toLowerCase()
                )))
            }
            return shades.slice(1)
        }
        let shades = gatherShades(palette, colorId)
        let allShades = shades.map(c => 
            (
            <ColorBox showLink={false} key={c.name} name={c.name} background={c[format]} colorId={c.name} paletteId={palette.id} />

        )
        )
        return (
            <div className='SingleColorPalette Palette'>
                <Navbar showLevel={false} handleChange={this.changeFormat} />
                <div className='Palette-colors'>
                {allShades}
                <div className='goBack ColorBox'>
                    <Link to={`/palette/${palette.id}`} className='backButton'>Go Back</Link>
                </div>
                </div>
                <footer className='Palette-footer'>{palette.paletteName}<span className='emoji'>{palette.emoji}</span></footer>
            </div>
        )
    }
}

export default SingleColorPalette