import {useState, useEffect} from 'react';
import './Graph.css'
import Bar from "../bar/Bar";
export default function Graph(props) {

    /*
    Graph is the interface between The sort display component and the bars. It is fed the step in which it
    needs to display to draw using the bar component. It also keeps track on if it is complete or not, which
    it then passes up to the SortDisplay.
     */

    //-------------------------------------------------------------------------------

    // R E A C T   V A R S
    let [index, setIndex] = useState(props.index);
    let [complete, setComplete] = useState(false); //Is this graph complete


    //   J S   V A R S
    const steps = props.steps //Redeclare this for readability


    //If the props' index value changes. This local index should also change. This is what creates the animation for this local graph
    useEffect((()=>{
        setIndex(props.index)
    }), [props.index])




    let data = props.steps[index];
    let focus;

    /*If this graph is completed, but other graphs are still running, it will try to increment this index, which will
    * cause an error. For example: index may be 92, but there are only 82 steps in this graph, if this is the case, this
    * graph must be complete so we can set it to the last instance in its steps list.
    * */
    if (data == undefined){
        data = steps[steps.length-1]
        setComplete(true);
        props.graphCompletedCallback(props.graphID); //Tell sortDisplay that this algorithm is completed.
    }



    /*
    Some steps involve what I am calling a 'focus', this are the indexes of the two or more bars which should be highlighted
    for the user so it is clear that these are the bars in which are being compared or moved etc.
     */

    if (data.length == 2){
        focus = data[1];
        data = [...data[0]]
    }


    //Creates the JSX for the bars which need to be displayed
    let barKey = 0;
    const bars = data.map((value, index) =>
        <>
            <Bar key = {barKey++}index={index} value = {value} decoration = {"bars"} complete = {complete} focus = {focus}/>
        </>

    );

    let height = data[0].max + " px";



    return(
        <div className={"bars-wrapper"} style={{height: {height}}}>
            <h1>{props.title}</h1>
            <div className={"bars"} style={{height: `${(Math.max(data))}`}}>
                {bars}
            </div>
        </div>
    )
}
