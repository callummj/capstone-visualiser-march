import React from "react";

//INITIAL: https://www.w3resource.com/javascript-exercises/searching-and-sorting-algorithm/searching-and-sorting-algorithm-exercise-3.php

let arrayLength = 0;
let steps;

function heapRoot (input, i) {
    const left = 2 * i + 1
    const right = 2 * i + 2
    let max = i

    if (left < arrayLength && input[left] > input[max]) {
        max = left
    }

    if (right < arrayLength && input[right] > input[max]) {
        max = right
    }

    if (max !== i) {
        swap(input, i, max)
        heapRoot(input, max)
    }
}

function swap (input, indexA, indexB) {
    [input[indexA], input[indexB]] = [input[indexB], input[indexA]]
    let focus = [indexA, indexB];
    steps.push([
        [...input],
        [...focus]
    ]);

}

export default function HeapSort (originalInput) {
    let input = [...originalInput];
    steps = [];
    arrayLength = input.length
    steps.push([
        [...input],
        [[]]
    ]);

    for (let i = Math.floor(arrayLength / 2); i >= 0; i -= 1) {
        heapRoot(input, i)
    }

    for (let i = input.length - 1; i > 0; i--) {
        swap(input, 0, i)
        arrayLength--

        heapRoot(input, 0)
    }

    let focus = [];
    steps.push([
        [...input],
        [...focus]
    ]);

    return steps;
}


/*
function heapSort(data){
    let steps = [];

    function swap(data, A, B){
        let temp1 = data[A]
        let temp2 = data[B]
    }

    function heapRoot(data, index){}
    return steps;
}
*/

