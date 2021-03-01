import {useState, useRef, useEffect} from 'react';
import Graph from "../graph/Graph";



export default function SortDisplay(props){

    //  F U N C T I O N    V A R S

    //REACT VARS (STATE/REF)
    //-------------------------------------------------------------------------------
    let [index, setIndex] = useState(0); //Keeps track of the index of the step we want to point to, to display in the Graph component, to simulate animation
    let complete = useRef(false);//When all algorithms' index have reached their steps.length --> set to complete which will stop index being incremented
    let [graphCompletedList, setGraphCompletedList] = useState([]); //Stores a list of the order in which algorithms finished.
    //let [sort, setSort] = useState(props.sortState); //A local tracker on sort state
    let [reset, setReset] = useState(props.reset);
    let resetTracker = useRef(0); //Keeps track of the graphs which have successfully reset. See relevant function under Callback functions
    //-------------------------------------------------------------------------------

    //OTHER VARS
    //-------------------------------------------------------------------------------
    let [algorithms, setAlgorithms] = useState(props.algorithms); //Stores a list of objects of the algorithms to be displayed (Own variable for readability)
    //-------------------------------------------------------------------------------


    // J S     F U N C T I O N S
    //-------------------------------------------------------------------------------


    //Uses the callback function, removeGraphCallback to access the remove Graph function in App.js
    const removeGraph = (graphIDToRemove) =>{
        props.removeGraphCallback(graphIDToRemove);
    }

    //-------------------------------------------------------------------------------





    /*

     A N I M A T I O N    H A N D L E R

    uses RequestAnimationFrame to increment the index value (In older versions used both setTimeOut and setInterval, however was replaces due to:)

    (RequestAnimationFrame) pros vs cons

    + More efficient: especially for mobile devices, as it only runs whilst the window is active
    + More reliable in function: methods mentioned above can be less reliable across browsers, due to differences how browsers such as chromium based ones handle them to non chromium based browsers

    - Less readable
    - Time control cannot be manually handles without a setTimeout (which I am avoiding due to reasons above)

    See docs:
    https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame

     */


    //Source: https://css-tricks.com/using-requestanimationframe-with-react-hooks/
    const requestRef = useRef();
    const previousTimeRef = useRef();
    useEffect(() => {
        const animate = time => {
            if (previousTimeRef.current != undefined) {
                if (!complete.current){
                    console.log("increment: " + complete.current)
                    const deltaTime = time - previousTimeRef.current;
                    setIndex(prevIndex => (prevIndex + 1));
                }

            }
            previousTimeRef.current = time;
            requestRef.current = requestAnimationFrame(animate);
        }

        if (props.sortState == true && !complete.current){
            requestRef.current = requestAnimationFrame(animate);
        }else if (props.sortState == false){
            //setSort(false); //If the app's sort controller is false, but the sortDisplay's sort controller is true, bring it into line.
            props.stopSort();

        }

        console.log("cancel animation")
        return () => cancelAnimationFrame(requestRef.current);

    }, [props.sortState]); // <---Will only invoke when the sort state has changed


    //-------------------------------------------------------------------------------



    //If an algorithm is added/deleted, this will set the sortdisplay's algorithm state accordingly.
    useEffect((()=>{
        setAlgorithms(props.algorithms)
    }), [props.algorithms])



    //If the reset variable in parent is true, reset the index being displayed, reset the completed variable and flip the reset variable which will be passed down to children, causing a rerender.
    useEffect((()=>{
        if (props.reset == true){

            complete.current = false;
            setGraphCompletedList([]);
            setIndex(0);
            setReset(true);
            props.stopSort();
            //setSort(false);

            //This will reuse the resetCompleted callback, but in this instance, it is being used for when the user clicks 'clear'.
            console.log("alg length: " + props.algorithms.length);
            if (props.algorithms.length == 0){
                props.resetCompletedCallback();
            }
        }
    }), [props.reset])



    //-------------------------------------------------------------------------------
    //  C A L L B A C K   F U N C T I O N S

    //Callback function accessed by the Graph component which is told that the graph has completed, and appends the graph to the list of completed graphs
    const localGraphCompleted = (graphIDWhichHasCompleted) =>{
        console.log("local graph completed")
        let temp = [...graphCompletedList];
        temp.push(graphIDWhichHasCompleted);
        setGraphCompletedList(temp);
        //If all graphs have completed then stop the sort in the app scope.
        if (temp.length >= algorithms.length){ //Temp is used here because state is asyncronous, and so it is not guaranteed to have updated in time for this comparison
            complete.current = true;
            //setSort(false);
            props.stopSort();
        }
    }


    // If the value of resetTracker is equal to, or larger than (safety precaution), than the amount of algorithms being displayed, then call the resetCompleted callback in the App.js,
    // Which will tell the app.js that all the resets are completed.
    const graphResetCompleted = () =>{
        let temp = resetTracker.current; //Create a local copy, to ensure accuracy and synchronisation
        temp = temp + 1;

        if (temp >= algorithms.length){
            props.resetCompletedCallback();
            setIndex(0); //Although Index is reset in the useEffect, as a state variable is async, it could be a good idea just to ensure that it is reset here as well.
            resetTracker.current = 0; //Reset the resetTracker.
        }else{
            resetTracker.current = temp;
        }
        setReset(false);


    }


    //-------------------------------------------------------------------------------



    // Creates the JSX of graph components
    let graphs = algorithms.map(algorithm=>(
        <>
            <Graph
                index = {index}
                reset = {reset}
                key = {algorithm.graphID}
                graphID = {algorithm.graphID} //Has to be declared seperately as keys are not accessable
                steps = {algorithm.steps}
                title = {algorithm.title}
                graphCompletedCallback = {localGraphCompleted}
                graphResetCompletedCallback = {graphResetCompleted}
                removeGraph = {removeGraph}
            />
        </>
    ))



    return(
        <div id={'sorting-area'}>
            <h1>
            {"graph sort: " + props.sortState}
            </h1>
            <h2>
                {"graph complete: " + complete.current}
            </h2>
            <h2>
                {"index: " + index}
            </h2>

            {graphs}
        </div>
    )
}
