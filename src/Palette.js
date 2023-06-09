import React, { Component } from 'react'
import ColorBox from './ColorBox'
import 'rc-slider/assets/index.css'
import "./Palette.css"
import Navbar from './Navbar';


class Palette extends Component {
    constructor(props) {
        super(props);
        this.state = {
            level: 500,
            format:'hex'
        }
        this.changeLevel = this.changeLevel.bind(this)
        this.changeFormat = this.changeFormat.bind(this)

    }
    changeLevel(level) {
        this.setState({ level })
    }
    changeFormat(val) {
        this.setState({format: val})
    }
    render() {
        const {colors, paletteName, emoji, id} = this.props.palette
        const {level, format} = this.state
        const colorBoxes = colors[level].map(color => (
            <ColorBox showLink={true} key={color.id} background={color[format]} name={color.name} colorId={color.id} paletteId={id} />
        ))
        return (
            <div className='Palette'>
                <Navbar showLevel={true} level={level} changeLevel={this.changeLevel} handleChange={this.changeFormat} />
                <div className='Palette-colors'>
                    {colorBoxes}
                </div>
                <footer className='Palette-footer'>{paletteName}<span className='emoji'>{emoji}</span></footer>
            </div>
        )
    }
}

export default Palette