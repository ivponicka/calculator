class Calculator {
    constructor(previousTextElement, currentTextElement) {
      this.previousTextElement = previousTextElement
      this.currentTextElement = currentTextElement
      this.clear()
    }
  
    clear() {
      this.current = ''
      this.previous = ''
      this.operation = undefined
    }
  
    delete() {
      this.current = this.current.toString().slice(0, -1)
    }
  
    appendNumber(number) {
      if (number === '.' && this.current.includes('.')) return
      this.current = this.current.toString() + number.toString()
    }
  
    chooseOperation(operation) {
      if (this.current === '') return
      if (this.previous !== '') {
        this.calculate()
      }
      this.operation = operation
      this.previous = this.current
      this.current = ''
    }
  
    calculate() {
      let calculation
      const prev = parseFloat(this.previous)
      const current = parseFloat(this.current)
      if (isNaN(prev) || isNaN(current)) return
      switch (this.operation) {
        case '+':
          calculation = prev + current
          break
        case '-':
          calculation = prev - current
          break
        case '*':
          calculation = prev * current
          break
        case '÷':
          calculation = prev / current
          break
        default:
          return
      }
      this.current = calculation
      this.operation = undefined
      this.previous = ''
    }
  
    getResultNumber(number) {
      const stringNumber = number.toString()
      const integerDigits = parseFloat(stringNumber.split('.')[0])
      const decimalDigits = stringNumber.split('.')[1]
      let integerResult
      if (isNaN(integerDigits)) {
        integerResult = ''
      } else {
        integerResult = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
      }
      if (decimalDigits != null) {
        return `${integerResult}.${decimalDigits}`
      } else {
        return integerResult
      }
    }
  
    updateResult() {
      this.currentTextElement.innerText =
        this.getResultNumber(this.current)
      if (this.operation != null) {
        this.previousTextElement.innerText =
          `${this.getResultNumber(this.previous)} ${this.operation}`
      } else {
        this.previousTextElement.innerText = ''
      }
    }
  }
  
  
  const numberButtons = document.querySelectorAll('[number]')
  const operationButtons = document.querySelectorAll('[operation]')
  const equalsButton = document.querySelector('[equals]')
  const deleteButton = document.querySelector('[delete]')
  const allClearButton = document.querySelector('[all-clear]')
  const previousTextElement = document.querySelector('[previous]')
  const currentTextElement = document.querySelector('[current]')
  
  const calculator = new Calculator(previousTextElement, currentTextElement)
  
  numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateResult()
    })
  })
  
  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateResult()
    })
  })
  
  equalsButton.addEventListener('click', button => {
    calculator.calculate()
    calculator.updateResult()
  })
  
  allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateResult()
  })
  
  deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateResult()
  })