// It is best to make Calculator a class, with its constructor method + other methods, accessible in its entirety.

class Calculator{
  constructor(preScreen, currScreen){
    this.prevScreen = prevScreen;
    this.currScreen = currScreen;
    this.clear()
  }
  clear(){
    this.prevDispaly = ""
    this.currDisplay = ""
    this.operation = undefined
  }
  delete(){
    this.currDisplay = this.currDisplay.toString().slice(0, -1)
  }

  addNumberToScreen(number){
    if(number === '.' && this.currDisplay.includes('.'))
    return
    this.currDisplay = this.currDisplay.toString() + number.toString()
}

  selectedOperation(operation){
    if(this.currDisplay === '') 
    return
    if(this.prevDisplay !== ''){
      this.calculate()
    }
    this.operation = operation
    this.prevDisplay = this.currDisplay
    this.currDisplay = ''
}

  calculate(){
    let calculation
    const prev = parseFloat(this.prevDisplay)
    const curr = parseFloat(this.currDisplay)
    if(isNaN(prev) || isNaN(curr)) 
    return
    switch (this.operation){
      case '+':
        calculation = prev + curr
        break
      case '-':
        calculation = prev - curr
        break
      case '*':
        calculation = prev * curr
        break
      case '÷':
        calculation = prev / curr
        break
      default:
        return
    }

    this.currDisplay = calculation
    this.operation = undefined
    this.prevDisplay = ''
}

  numberDisplay(number){
    const stringNumber = number.toString()
     /* refer to NB
        ============
      We turn it toString just to
       1. make sure of the type 
       2. To be able to use split() on 'number' */
    const integerDigits = parseFloat(stringNumber.split('.')[0]) // [0] gives us the value before the decimal(,)
    const decimalDigits = stringNumber.split('.')[1]  // [0] gives us the value after the decimal(,)

    /* MDN: The parseFloat() function parses an argument (converting it to a string first if needed) and returns a floating point number. */

    // turning 'number' in to an actual Number to use parseFloat()
    /* const floatNumber = parseFloat(number) Obsolete code */
    // if NAN return empty string bcs we don't know what it is
    /* if(isNaN(floatNumber)) return '' Obsolete code */

   /*  return floatNumber.toLocaleString('no') Obsolete code */

    /* NB: Here we have problems with decimals. Does not show if current number starts with decimal or decimal with zeros before a (Integer) number */

    let integerDisplay
    if(isNaN(integerDigits)){
      integerDisplay = ''      
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {maxFractionDigits: 0})  /* maxFractionDigits usually used for int'l formats (Money or ...) to limit fractions Here we set it on zero to not to get any fractions after the decimal (), */
    }
    if(decimalDigits != null){
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateScreen(){
    this.currScreen.innerText = this.numberDisplay(this.currDisplay)
    if(this.operation != null){
    this.prevScreen.innerText = `${this.numberDisplay(this.prevDisplay)} ${this.operation}`
    } 
    else {
      this.prevScreen.innerText = ''
    }
  }
}

const prevScreen = document.querySelector('.previous-view');
const currScreen = document.querySelector('.current-view');
const numberBtn = document.querySelectorAll('[data-number]');
const operationBtn = document.querySelectorAll('[data-operation]');
const clearBtn = document.querySelector('[data-delete]');
const deleteBtn = document.querySelector('[data-all-clear]');
const equalBtn = document.querySelector('[data-equals]');

const calculator = new Calculator(prevScreen, currScreen)

numberBtn.forEach(button => {
  button.addEventListener('click', () => {
    calculator.addNumberToScreen(button.innerText)
    calculator.updateScreen()
  })
})

operationBtn.forEach(button => {
  button.addEventListener('click', () => {
    calculator.selectedOperation(button.innerText)
    calculator.updateScreen()
  })
})

equalBtn.addEventListener('click', button => {
  calculator.calculate()
  calculator.updateScreen()
})

deleteBtn.addEventListener('click', button => {
  calculator.clear()
  calculator.updateScreen()
})

clearBtn.addEventListener('click', button => {
  calculator.delete()
  calculator.updateScreen()
})