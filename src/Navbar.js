import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slider from "rc-slider";
import React, { Component } from "react";
import './Navbar.css'
import { Link } from "react-router-dom";

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            format: 'hex',
            open: false
        }
        this.handleFormatChange = this.handleFormatChange.bind(this)
        this.closeSnackbar = this.closeSnackbar.bind(this)
    }
    handleFormatChange(e) {
        this.setState({ format: e.target.value, open: true });
        this.props.handleChange(e.target.value)
    }
    closeSnackbar() {
        this.setState({ open: false })
    }
    render() {
        const { level, changeLevel, showLevel } = this.props
        const { format, open } = this.state

        return (
            < header className="Navbar" >
                <div className="logo">
                    <Link to='/'>reactcolorpicker</Link>
                </div>
                {showLevel &&
                <div className="slider-container">
                    <span className='slider-text'>Level: {level}</span>
                    <div className='slider'>
                        <Slider
                            defaultValue={level}
                            onAfterChange={changeLevel}
                            className='slider'
                            min={100}
                            step={100}
                            max={900}
                            trackStyle={{ background: 'transparent' }}
                            handleStyle={{ background: 'green', outline: 'none', border: '2px solid green', boxShadow: 'none', width: '13px', height: '13px', marginLeft: -7, marginTop: -3 }}
                            railStyle={{ height: 8 }}
                        />
                    </div>
                </div>
    }
                <div className="select-container">
                    <FormControl style={{height:'5vh'}} variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <Select id='format-select' value={format} label='Format' onChange={this.handleFormatChange}>
                            <MenuItem value='hex'>HEX - #ffffff</MenuItem>
                            <MenuItem value='rgb'>RGB - rgb(255,255,255)</MenuItem>
                            <MenuItem value='rgba'>RGBA - rgba(255,255,255,1.0)</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="snackbar-container">
                    <Snackbar
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                        open={open}
                        onClose={this.closeSnackbar}
                        autoHideDuration={3000}
                        message={<span id="message-id">Format changed to {format.toUpperCase()}!</span>}
                        ContentProps={{ "aria-describedby": 'message-id' }}
                        action={[<IconButton onClick={this.closeSnackbar} key='close' aria-label="close" color='inherit'>
                            <CloseIcon />
                        </IconButton>]}

                    />
                </div>

            </header >
        )
    }
}

export default Navbar