
const DEFAULT_COLOR = '#333333'
const DEFAULT_MODE = 'color'

let currentColor = DEFAULT_COLOR
let currentMode = DEFAULT_MODE

function setCurrentColor(color) {
    currentColor = color
}

function setCurrentMode(mode){
    currentMode = mode
    buttonActivation(mode)
}


const colorPicker = document.getElementById('colorPicker')
const colorButton = document.getElementById('color')
const rainbowButton = document.getElementById('rainbow')
const eraserButton = document.getElementById('eraser')
const clearButton = document.getElementById('clear')
const grid = document.getElementById('grid')

colorPicker.oninput = (e) => setCurrentColor(e.target.value)
colorButton.onclick = () => setCurrentMode('color')
rainbowButton.onclick = () => setCurrentMode('rainbow')
eraserButton.onclick = () => setCurrentMode('eraser')
clearButton.onclick = () => reloadGrid()

function gridSetup() {
    for(let i=1; i<= 16; i++){
        const gridRow = document.createElement('div')
        gridRow.classList.add('row')
        for(let j=1; j<=16; j++){
            
            const element = document.createElement("div")
            element.textContent = " "
            element.classList.add('grid-element')
            element.addEventListener("mouseover", changeColor)
            element.addEventListener("mousedown", changeColor)
            gridRow.appendChild(element)
        }
        grid.appendChild(gridRow)
    }
}

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

function reloadGrid() {
    clearGrid()
    gridSetup()
}

function clearGrid() {
    grid.innerHTML = ''
}


function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return

    if (currentMode === 'rainbow') {
        const randomR = Math.floor(Math.random() * 256)
        const randomG = Math.floor(Math.random() * 256)
        const randomB = Math.floor(Math.random() * 256)
        e.target.style.backgroundColor = `rgb( ${randomR}, ${randomG}, ${randomB})`
    } else if (currentMode === 'color') {
        e.target.style.backgroundColor = currentColor
    } else if (currentMode === 'eraser') {
        e.target.style.backgroundColor = '#fefefe'
    }
}


function buttonActivation(mode){
    if(currentMode === 'rainbow'){
        rainbowButton.classList.remove('active')
    } else if (currentMode === 'color'){
        colorButton.classList.remove('active')
    } else if (currentMode === 'eraser') {
        eraserButton.classList.remove ('active')
    }

    if(mode === 'rainbow'){
        rainbowButton.classList.add('active')
    } else if (currentMode === 'color'){
        colorButton.classList.add('active')
    } else if (currentMode === 'eraser') {
        eraserButton.classList.add ('active')
    }
}

window.onload = () => {
    gridSetup()
    buttonActivation(DEFAULT_MODE)
}
