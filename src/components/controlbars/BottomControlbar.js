import React from 'react';
import './UI Bars.css'

import {useState} from 'react';

//Control bar for animation speed/type etc.
export default function BottomControlbar(props){

    /*
    <input type="range" min="1" max="100" className="slider" id={'speedController'} onInput={sliderController}/>
    */

    const [playPauseIcon, setPlayPauseIcon] = useState('pause');

    const flipPlayPause = () =>{
        if (playPauseIcon == "pause"){
            setPlayPauseIcon("play_arrow")
        }else if (playPauseIcon == "play_arrow"){
            setPlayPauseIcon("pause")
        }
        props.playPauseCallback();
    }



    const updateSpeed = (e) =>{
        props.updateSpeedCallback(e.target.value);
    }

    const toggleDecoration = () =>{
        props.toggleDecoration();
    }
    return(

        <div id = {'bottombar'}>

            <div id={'speed-controller'}>
                <h3 id={'speedLabel'}>Speed:</h3>
                <button onClick={updateSpeed} value={50}>Slow</button>
                <button onClick={updateSpeed} value={250}>Medium</button>
                <button onClick={updateSpeed} value={500}>Fast</button>
                <button onClick={toggleDecoration}>Change decoration</button>
            </div>
            <div id={'play-controller'}>
                <button onClick = {flipPlayPause}><i className="material-icons">{playPauseIcon}</i></button>

            </div>


        </div>
    )


}

