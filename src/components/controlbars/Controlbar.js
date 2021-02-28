import React from 'react';
import './UI Bars.css';


export default function Controlbar(props) {

    const handleClick = e => props.generateData(true);

    return (
        <div>
            <nav className="Toolbar">
                <button value="generateData" onClick={props.generateDataCallback}>Generate New Data</button>
                <button onClick={props.clearCallback}>Clear</button>
                <button id={"start"} value="startSort" onClick={props.startSortCallback}>Sort</button>
            </nav>


        </div>
    );
}
