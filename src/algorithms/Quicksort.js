import React from "react";


//Driver code for Quicksort


function Quicksort(originalData) {
    let data = [...originalData];
    function QuickSort(array, left, right){
        let index;
        if (array.length > 1) {
            index = partition(array, left, right); //partition the array to find the index
            if (left < (index - 1)) { //more elements on the left side of the pivot
                QuickSort(array, left, index - 1);
            }
            if (index < right) { //if the right side is larger than the left
                QuickSort(array, index, right);
            }
        }
        return array;
    }

    //uses a temp function which swaps two indexes in the array then pushes the swap to the
    function swap(data, leftItem, rightItem){
        let temp = data[leftItem];
        data[leftItem] = data[rightItem];
        data[rightItem] = temp;
        let change = [leftItem, rightItem];
        steps.push([
            [...data],
            [...change]
        ]);
        return data
    }

    //splitting the array into subarrays

    function partition(data, left, right) {
        let pivot = data[Math.floor((right + left) / 2)] //Find the pivot of the array (centre element)

        while (left <= right) { //while the left value
            while (data[left] < pivot) {
                left++;
            }
            while (data[right] > pivot) {
                right--;
            }
            if (left <= right) {
                data = swap(data, left, right); //Swap elements
                left++;
                right--;
            }
        }
        return left;
    }

    let steps = [];
    let change = [];
    steps.push([
        [...data],
        [...change]
    ]);
    QuickSort(data, 0, (data.length)-1);

    steps.push([
        [...data],
        [...change]
    ]);
    return steps;
}export default Quicksort;


//https://www.geeksforgeeks.org/quick-sort/




