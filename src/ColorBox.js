import React, { Component } from 'react'
import './ColorBox.css'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';

class ColorBox extends Component {
    constructor(props){
        super(props);
        this.state = {
            copied: false
        }
        this.changeCopyState = this.changeCopyState.bind(this)
    }
    changeCopyState() {
        this.setState({copied: true}, () => {
            setTimeout(() => this.setState({copied: false}), 1500)
        })
    };
    render() {
        const { name, background, colorId, paletteId, showLink } = this.props
        const {copied} = this.state
        const isDarkColor = chroma(background).luminance()<= .08;
        const isLightColor = chroma(background).luminance()>=.5
        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
            <div style={{ background:background }} className='ColorBox'>
                <div className={`copy-overlay ${copied && 'show'}`} style={{background: background}} />
                <div className={`copy-msg ${copied && 'show'} ${isLightColor && 'darkText'}`}>
                    <h1>Copied!</h1>
                    <p>{background}</p>
                </div>
                <div className='copy-container'>
                    <div className='box-content'>
                        <span className={isDarkColor && 'lightText'}>{name}</span>
                    </div>
                    <button className={`copy-button ${isLightColor && 'darkText'}`}>Copy</button>
                </div>
                {showLink &&
                <Link to={`/palette/${paletteId}/${colorId}`} onClick={evt => {evt.stopPropagation()}}>
                <span className={`see-more ${isLightColor && 'darkText'}`}>MORE</span>
                </Link>
    }
            </div>
            </CopyToClipboard>
        )
    }
}

export default ColorBox