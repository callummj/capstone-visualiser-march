import React from 'react';

import './UI Bars.css'

export default function AlgorithmSelector(props){

    let handleClick = (e) => {
        props.onAddAlgorithm(e.target.value);
    }

    return (
        <div className={"Toolbar"}>
            <button value="Bubble Sort" onClick={handleClick}>Bubble Sort</button>
            <button value="Merge Sort" onClick={handleClick}>Merge Sort</button>
            <button value="Quick Sort" onClick={handleClick}>Quick Sort</button>
            <button value="Insertion Sort" onClick={handleClick}>Insertion Sort</button>
            <button value="Selection Sort" onClick={handleClick}>Selection Sort</button>
            <button value="Heap Sort" onClick={handleClick}>Heap Sort</button>
            <button value="Radix Sort" onClick={handleClick}>Radix Sort</button>
        </div>

    );


}
