import {useState, useRef, useEffect} from 'react';
import Graph from "../graph/Graph";


export default function SortDisplay(props){

    //  F U N C T I O N    V A R S

    //REACT VARS (STATE/REF)
    //-------------------------------------------------------------------------------
    let [index, setIndex] = useState(0); //Keeps track of the index of the step we want to point to, to display in the Graph component, to simulate animation
    let [complete, setComplete] = useState(false); //When all algorithms' index have reached their steps.length --> set to complete which will stop index being incremented
    let [graphCompletedList, setGraphCompletedList] = useState([]); //Stores a list of the order in which algorithms finished.
    let [sort, setSort] = useState(props.sortState); //A local tracker on sort state
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
                const deltaTime = time - previousTimeRef.current;
                setIndex(prevIndex => (prevIndex + 1));
            }
            previousTimeRef.current = time;
            requestRef.current = requestAnimationFrame(animate);
        }

        if (props.sortState == true && !complete){
            requestRef.current = requestAnimationFrame(animate);
        }return () => cancelAnimationFrame(requestRef.current);

    }, [props.sortState]); // <---Will only invoke when the sort state has changed


    //-------------------------------------------------------------------------------



    //If an algorithm is added/deleted, this will set the sortdisplay's algorithm state accordingly.
    useEffect((()=>{
        setAlgorithms(props.algorithms)
    }), [props.algorithms])


    //Callback function accessed by the Graph component which is told that the graph has completed, and appends the graph to the list of completed graphs
    const localGraphCompleted = (graphIDWhichHasCompleted) =>{
        let temp = [...graphCompletedList];
        temp.push(graphIDWhichHasCompleted);
        setGraphCompletedList(temp);
        //If all graphs have completed then stop the sort in the app scope.
        if (temp.length == algorithms.length){ //Temp is used here because state is asyncronous, and so it is not guaranteed to have updated in time for this comparison
            setComplete(true);
            props.stopSort();
        }
    }


    // Creates the JSX of graph components


    let graphs = algorithms.map(algorithm=>(
        <>
            <Graph
                index = {index}
                key = {algorithm.graphID}
                graphID = {algorithm.graphID} //Has to be declared seperately as keys are not accessable
                steps = {algorithm.steps}
                title = {algorithm.title}
                graphCompletedCallback = {localGraphCompleted}
            />
        </>
    ))



    return(
        <div>
            <h1>
            {"graph sort: " + sort}
            </h1>
            <h2>
                {"graph complete: " + complete}
            </h2>

            {graphs}
        </div>
    )
}
