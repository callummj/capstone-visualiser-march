import React from 'react';
import {useState, useEffect, useRef} from 'react';
import './App.css';


//COMPONENTS
import Controlbar from "./components/controlbars/Controlbar";
import AlgorithmSelector from "./components/controlbars/AlgorithmSelector";
import BottomControlbar from "./components/controlbars/BottomControlbar";
import SortDisplay from "./components/sort display/SortDisplay";


//ALGORITHMS
import Bubblesort from "./algorithms/Bubblesort";
import SelectionSort from "./algorithms/Selectionsort";
import HeapSort from "./algorithms/Heapsort";
import Insertionsort from "./algorithms/Insertionsort";
import MergeSortDriver from "./algorithms/Mergesort";
import Quicksort from "./algorithms/Quicksort";
import Radixsort from "./algorithms/Radixsort";



export default function App() {
  //  F U N C T I O N    V A R S

  //STATE VARS
  //-------------------------------------------------------------------------------
  let [sort, setSort] = useState(false); //Controls whether the data is being sorted (Animation playing in the app scope)
  let [data, setData] = useState("Not yet initialised"); //Stores the data in which is being sorted
  let [algorithms, setAlgorithms] = useState([]); //Stores the objects of the algorithms being displayed
  let [reset, setReset] = useState(false); //A Reset variable, which is used as a flag to pass down to components to tell them to reset their indexes to 0, such as after new data has been generated
  let [finished, setFinished] = useState([]); //Stores the algorithms in order to which they finish to display to the user.
  let [speed, setSpeed] = useState(75); //Speed Controller, defaults to 75 which is the 'medium' speed. Please See bottombar.js how this is managed.
  //-------------------------------------------------------------------------------

  //REF VARS
  //-------------------------------------------------------------------------------
  let graphID = useRef(0); // Used to store the last graph ID given to generate unique Keys among graphs.
  //-------------------------------------------------------------------------------




  //-------------------------------------------------------------------------------
  //Generate a random list of numbers and sets the Data state to its value
  const generateData = () => {
    setSort(false);
    let dataTemp = [];
    for (let i = 0; i < 100; i++) {
      dataTemp.push(Math.floor(Math.random() * 100) + 1);
    }
    setData(dataTemp)

    algorithms.forEach(algorithm => {
      algorithm.steps = getSteps(algorithm.title, data) //Gets the new steps for the each algorithm with the new data (if there are some already being displayed)
    })

    setReset(true); //Creates a flag which goes down the components to tell SortDisplay to reset the index, and the individual graph components to reset their complete variables.
    console.log("reset: " +reset)
  }
  //-------------------------------------------------------------------------------


  //-------------------------------------------------------------------------------

  //           A L G O R I T H M S

  /*
  *  Gets the steps of the algorithms using the data being passed.
  *  Note: a 'step' is what we are calling an instance of each sort, for example, with bubble sort:
  *  step 1: [2, 1, 3]
  *  step 2: [1, 2, 3]
  *  Indexes 0 and 1 have swapped between the two steps.
  *  The 'index' variable points to which 'step' out of the 'steps' to display
  */
  const getSteps = (algorithmTitle, data) => {
    switch (algorithmTitle) {
      case "Bubble Sort":
        return Bubblesort(data);
      case "Heap Sort":
        return HeapSort(data);
      case "Insertion Sort":
        return Insertionsort(data);
      case "Quick Sort":
        return Quicksort(data);
      case "Radix Sort":
        return Radixsort(data);
      case "Merge Sort":
        return MergeSortDriver(data);
      case "Selection Sort":
        return SelectionSort(data);
    }
  }

//Takes an algorithm name from the 'Algorithm Selector Component
  const addAlgorithm = (algorithm) => {

    //User should not be able to add algorithms whilst a sort is going on -> This is because of that the index is handled centrally, it would skip steps etc; I tried to make this doable in version 2, but due to the State lifecycle and the design of my app, this is not possible.
    if (sort != true){
      //Creates key using the graphID ref, and increments its value by 1.
      let key = algorithm + graphID.current;
      graphID.current = graphID.current + 1;

      //Prepares the object to append to the algorithm
      let algorithmToAdd = {
        title: algorithm,
        steps: getSteps(algorithm, [...data]),
        graphID: key
      }

      //Create a copy of
      let temp = [...algorithms];
      temp.push(algorithmToAdd)

      //Finally, append new algorithm to the list
      setAlgorithms(temp);

    }

  }

  //Remove algorithm/Graph Foo from the list of algorithms
  const removeGraph = (graphIDToRemove) => {
    setAlgorithms(
        algorithms.filter(graph =>
            graph.graphID !== graphIDToRemove,
        )
    )
  }


  //-------------------------------------------------------------------------------


  //           S O R T    C O N T R O L

  //Sets the sort state of the app scope to: True
  const startSort = () => {
    if (algorithms.length>0){
      setSort(true);
    }

  }

  //Sets the sort state of the app to: False
  const stopSort = () => {
    console.log("stop sort")
    setSort(false);
  }

  //Deletes the algorithms being displayed from the list.
  const clear = () => {
    setSort(false);
    setAlgorithms([]);
    setReset(true);
  }

  //Once the algorithms have been successfully reset, this flips back the reset variable for the app scope
  const resetCompleted = () =>{
    setSort(false);
    setReset(false);
  }

  //--------------------------------------------------------------------------------


  //

  const updateSpeed = (newSpeed) => {
   setSpeed(newSpeed);
  }


  const changeDecoration = () => {
    console.log("Change decoration")
  }

  const togglePlayPause = () => {
    setSort(!sort);
  }


  //Work around constructor
  if (data === "Not yet initialised") {
    data = generateData();
    setReset(false); //Because generateData will set reset to True, to tell children to update, so we reset this to false here.
  }


  console.log("algorithms: " + algorithms)
  return (
      <div className="App">
        <Controlbar generateDataCallback={generateData} startSortCallback={startSort} clearCallback={clear}/>
        <AlgorithmSelector onAddAlgorithm={addAlgorithm}/>

        <h1>{"sort: " + sort}</h1>
        <h2>{"reset: " + reset}</h2>
        <SortDisplay
            sortState={sort}
            startSort={startSort}
            stopSort={stopSort}
            algorithms={algorithms}
            removeGraphCallback={removeGraph}
            reset = {reset}
            resetCompletedCallback = {resetCompleted}
            speed = {speed}
        />

        <BottomControlbar
            updateSpeedCallback={updateSpeed}
            toggleDecoration={changeDecoration}
            playPauseCallback={togglePlayPause}/>
      </div>
  );
}
