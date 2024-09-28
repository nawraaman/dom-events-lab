const display = document.querySelector('.display')
const buttons = document.querySelectorAll('.button')

let currentInput = ''
let firstOperand = ''
let operator = ''
let isResultDisplayed = false

buttons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const value = event.target.innerText

    if (event.target.classList.contains('number')) {
      if (isResultDisplayed) {
        currentInput = ''
        isResultDisplayed = false
      }

      if (currentInput === '0') currentInput = ''

      currentInput += value
      display.innerText = currentInput
    }

    if (event.target.classList.contains('operator')) {
      if (firstOperand && operator) {
        currentInput = calculate(firstOperand, currentInput, operator)
        display.innerText = currentInput
      }

      firstOperand = currentInput
      operator = value
      currentInput = ''
    }

    if (event.target.classList.contains('equals')) {
      if (firstOperand && operator && currentInput) {
        currentInput = calculate(firstOperand, currentInput, operator)
        display.innerText = currentInput
        firstOperand = ''
        operator = ''
        isResultDisplayed = true
      }
    }

    if (event.target.classList.contains('clear')) {
      currentInput = ''
      firstOperand = ''
      operator = ''
      display.innerText = '0'
    }
  })
})

function calculate(firstOperand, secondOperand, operator) {
  let result
  const firstNum = parseFloat(firstOperand)
  const secondNum = parseFloat(secondOperand)

  if (operator === '+') {
    result = firstNum + secondNum
  } else if (operator === '-') {
    result = firstNum - secondNum
  } else if (operator === '*') {
    result = firstNum * secondNum
  } else if (operator === '/') {
    if (secondNum === 0) {
      result = 'Error'
    } else {
      result = firstNum / secondNum
    }
  } else {
    result = secondNum
  }

  return result.toString()
}
