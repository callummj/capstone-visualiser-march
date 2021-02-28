
import React from "react";



function Insertionsort(originalData){

    let data = [...originalData];


    let steps = stepsGenerator(data);

    return steps;

}export default Insertionsort;


//Goes through the array, generating the instance of the array at each step and returns an array containing these instances in chronological order.
//i = first iterator
//j = second iterator where to insert
function stepsGenerator(data){
    let steps = [];
    steps.push([[...data], []]);
    for (let i = 1; i < data.length; i++) {
        let change = [];
        let current = data[i]; //split between sorted/unsorted list
        let j = (i-1);
        let temp = data;
        while ((j > -1) && (current < data[j])) {
            temp[j + 1] = temp[j]; //insert element
            j--;
        }
        temp[j + 1] = current;

        data = temp;
        change = [j+1];
        steps.push([
            [...data],
            [...change]
        ]);
    }
    let change = [];
    steps.push([
        [...data],
        [...change]
    ]);
    return steps;
}

//https://www.geeksforgeeks.org/binary-insertion-sort/
