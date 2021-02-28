import React from "react";


//TEMP

function Radixsort(orignalData){
    let data = [...orignalData];

    let RADIX;

    // default radix is then because we usually count to base 10
    if (RADIX === undefined || RADIX < 1) {
        RADIX = 10
    }



    let steps = [];
    let focus = [];

    var maxLength = false
    var placement = 1

    while (!maxLength) {
        maxLength = true
        var buckets = []

        for (var i = 0; i < RADIX; i++) {
            buckets.push([])
        }

        for (var j = 0; j < data.length; j++) {
            var tmp = data[j] / placement
            buckets[Math.floor(tmp % RADIX)].push(data[j])

            if (maxLength && tmp > 0) {
                maxLength = false
            }
        }

        var a = 0
        for (var b = 0; b < RADIX; b++) {
            var buck = buckets[b]
            for (var k = 0; k < buck.length; k++) {
                data[a] = buck[k]
                a++
                steps.push([...data])
            }
        }

        placement *= RADIX
        console.log("running")
    }
    console.log("radix complete")
    return steps

} export default Radixsort;
