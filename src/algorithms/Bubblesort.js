//Returns the steps of bubble sort
export default function Bubblesort(originalData) {
    let data = [...originalData];
    let steps = [];
    steps.push([[...data], []]);
    let change = [];
    let swapped;
    do {
        change = [];
        swapped = false;
        for (let i = 0; i < data.length; i++) {
            change = [data[i], data[i+1]]


            if (data[i] > data[i + 1]) {
                change = [i, i+1]
                let temp = data[i];
                data[i] = data[i + 1];
                data[i + 1] = temp;
                swapped = true;
            }
            steps.push([
                [...data],
                [...change]
            ]);
        }
    } while (swapped);

    change = [];
    steps.push([
        [...data],
        [...change]
    ]);
    return steps;
}

