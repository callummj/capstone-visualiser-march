
//TEMP CODE FOR MERGESORT

//initalise steps here so they are in scope
let steps;

function MergeSortDriver(originalData) {
    let data = [...originalData];
    steps = [];
    mergeSort(data, 0, data.length);
    let change = [];
    steps.push([
        [...data],
        [...change]
    ]);
    console.log("got mnerge steps")
    return steps;
}


//first break down to subarrays
function mergeSort(array, low, high) {
    if (high - low > 1) {
        //let middle = array[Math.flsoor((high + low) / 2)] //Find the pivot of the array (centre element)
        let middle = low + ((high - low) >> 1); //calculate the middle of each subarray
        mergeSort(array, low, middle);
        mergeSort(array, middle, high);
        merge(array, low, middle, high);
    }
}



//merge function for subarrays
function merge(data, low, middle, high) {
    let tempArray = [];
    let length = middle - low;
    let i;
    let tempMiddle;
    let tempLow;
    // save left subarray
    for (i = 0; i < length; i++) {
        tempArray[i] = data[low + i];
        let change = [i]
        steps.push([
            [...data]
        ]);
    }


    //begin merge of the atomic arrays
    i = 0;
    tempMiddle = middle;
    tempLow = low;


    while ((i < length) && (tempMiddle < high)) {

        if (tempArray[i] <= data[tempMiddle]) {
            data[tempLow++] = tempArray[i++];
        } else {
            data[tempLow++] = data[tempMiddle++];
        }
        let change = [tempLow];
        steps.push([
            [...data],
        ]);
    }
    while (i < length) {
        data[tempLow++] = tempArray[i++];
        let change = [data[tempLow]];
        steps.push([
            [...data],
        ]);
    }
}





export default MergeSortDriver
