/* SORTING */

var canvas = document.getElementById('algo1')
var ctx = canvas.getContext('2d')

var canvas2 = document.getElementById('quick-sort')
var ctx2 = canvas2.getContext('2d')

var startBtn = document.getElementById('start')
var stepBtn = document.getElementById('step')
var stopBtn = document.getElementById('stop')
var genTxt1 = document.getElementById('gen1')
var genTxt2 = document.getElementById('gen2')

const height = 100
const width = 500
const num_elements = 500

var array = []
var array2 = []
var i = 0
var on = false
var speed = 0.001
var gen = 0
var gen2 = 0
var doFunc
var doFunc2
var loc = -1
var right
var left

startBtn.addEventListener('click', () => {
    if(on == false) {
        doFunc = setInterval(newTurn, speed)
        on = true
    }
})

stepBtn.addEventListener('click', () => {
    newTurn()
    //newQuick()
})

stopBtn.addEventListener('click', () => {
    clearInterval(doFunc)
    on = false
})

window.onload = function() {
    draw()
}

function newQuick() {
    ctx2.fillStyle = "blue"
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    for(let i=0; i<num_elements; i++)
    {
        ctx2.fillRect(i*(width / num_elements), height-array2[i], (width / num_elements), array2[i])
    }
    quickSort2()
    console.log(array2)
}
function quickSort2() {
    var stack = []
    stack.push(0)
    stack.push(num_elements)
    while(stack.length != 0) {
        var end = stack.pop()
        var start = stack.pop()
        console.log()
        if(end - start < 2) {
            continue
        }
        var p = start + ((end - start) / 2)
        p = partition2(array2, p, start, end)

        stack.push(p+1)
        stack.push(end)
        stack.push(start)
        stack.push(p)
    }
}
function partition2(array, p, start, end) {
    var l = start
    var h = end -2
    var pivot = array[p]
    swap(array, p, end-1)

    while (l < h) {
        if (array[l] < pivot) {
            l++
        } else if(array[h] >= pivot) {
            h--
        } else {
            swap(array, l , h)
        }
    }
    var index = h
    if(array[h] < pivot) {
        index++
    }
    swap(array, end-1, index)
    return index
}

function newTurn() {
    ctx.fillStyle = "blue"
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i=0; i<num_elements; i++)
    {
        ctx.fillRect(i*(width / num_elements), height-array[i], (width / num_elements), array[i])
    }
    if(isSorted(array) == false) {
        gen++
        genTxt1.innerHTML = ('Generations: '+gen)
        sort()
    } else {
        clearInterval(doFunc)
        on = false
        console.log("end: "+array)
    }
}

function draw() {
    let new_digit
    for(let i=0; i<num_elements; i++)
    {
        new_digit = getRandomInt(height)+1
        array[i] = new_digit
        array2[i] = new_digit
    }
    console.log("start: "+array)
    console.log("start2: "+array2)
    ctx.fillStyle = "blue"
    ctx2.fillStyle = "blue"
    for(let i=0; i<num_elements; i++)
    {
        ctx.fillRect(i*(width / num_elements), height-array[i], (width / num_elements), array[i])
        ctx2.fillRect(i*(width / num_elements), height-array2[i], (width / num_elements), array2[i])
    }
}

function sort() {
    if(i == num_elements) {
        i = 0
    }
    ctx.fillStyle = "yellow"
    ctx.fillRect(i*(width / num_elements), height-array[i], (width / num_elements), array[i])
    if(i != 0)
    {
        if(array[i-1] > array[i]) {
            //console.log("move: "+array[i])
            array.unshift(array[i])
            array.splice(i+1, 1)
        }
    }
    i = i+1
    //console.log(array)
}

function partition(arr, beg, end) {
    let left, right, tmp, loc, flag
    loc = beg 
    left = beg
    right = end
    flag = 0
    while(flag != 1) {
        while(arr[loc] <= arr[right] && loc != right) {     //move loc until find num that is smaller
            right--
        }
        if(loc == right) {      //check if went thru whole array
            flag = 1
        } else if(arr[loc] > arr[right]) {      // unless they have the same value switch left and right
            tmp = arr[loc]
            arr[loc] = arr[right]
            arr[right] = tmp
            loc = right
        }
        if(flag != 1) {
            while(arr[loc] >= arr[left] && loc != left) {       // check if loc is at the beginning
                left++
            }
            if(loc == left) {           // check if left has moved into loc
                flag = 1
            } else if(arr[loc] < arr[left]) {       // switch elements unless equal
                tmp = arr[loc]
                arr[loc] = arr[left]
                arr[left] = tmp
                loc = left
            }
        }
    }
    return loc
}

function quickSort(arr, beg, end) {
    let loc
    if(beg<end) {
        loc = partition(arr, beg, end)
        quickSort(arr, beg, loc-1)
        quickSort(arr, loc+1, end)
    }
}

function isSorted(arr) {
    for(let i=0; i<num_elements-1; i++)
    {
        if(arr[i] > arr[i+1])
        {
            return false
        }
    }
    return true
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function swap(arr, i, j) {
    let tmp = arr[i]
    arr[i] = arr[j]
    arr[j] = tmp
}


