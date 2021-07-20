class Calculator{
  constructor(preScreen, currScreen){
    this.prevScreen = preScreen;
    this.currScreen = currScreen;
    this.clear()
  }
  clear(){
    this.prevDispaly = ""
    this.currDisplay = ""
    this.operation = undefined
  }
  addNumberToScreen(number){
    this.currDisplay = this.currDisplay.toString() + number.toString()
  }
  updateScreen(){
    this.currScreen.innerText = this.currDisplay
  }
  selectedOperation(operation){

  }
  calculate(){

  }
  delete(){

  }
}

const prevScreen = document.querySelector('.previous-view');
const currScreen = document.querySelector('.current-view');
const numberBtn = document.querySelectorAll('[data-number]');
const operationBtn = document.querySelectorAll('[data-operation]');
const deleteBtn = document.querySelector('[data-delete]');
const clearBtn = document.querySelector('[data-all-clear]');
const equalBtn = document.querySelector('[data-equals]');

const calculator = new Calculator(prevScreen, currScreen)

numberBtn.forEach(button => {
  button.addEventListener('click', () => {
    calculator.addNumberToScreen(button.innerText)
    calculator.updateScreen()
  })
})
