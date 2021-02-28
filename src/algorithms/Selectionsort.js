function SelectionSort(originalData){
    let data = [...originalData];
    let steps = [];
    let focus = [];
    steps.push([[...data], []]);
    let length = data.length;
    for(let i = 0; i < length; i++) {

        let smallestInt = i;
        for(let j = i+1; j < length; j++){
            if(data[j] < data[smallestInt]) { //if the index on the right array is smaller the current record then overwrite this
                smallestInt=j;
            }
        }

        if (smallestInt != i) {
            let temp = data[i];
            data[i] = data[smallestInt];
            data[smallestInt] = temp;
            focus = [i, smallestInt]
        }steps.push([
            [...data],
            [...focus]]);
    }
    steps.push([
        [...data],
        [...focus]]);
    return steps;
}export default SelectionSort;
