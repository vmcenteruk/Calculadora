/*
Ainda é preciso limitar a quantidade de caracteres em parte inteira dos números introduzidos. 
Depois de 16 caracteres pode dar erro. 
Os caracteres seguintes apresentam-se como 0.
*/

/* 
A calculadora tem a seguinte lógica: as botões + - / * desempenham 
a função "=" em alguns casos: 
quando chamados imediatamente depois de um deles sem indtroduzir algum número. 
Exemplos:
6-+ => 6+ (ou seja: 6-0=6 => 6+)
6*+ => 0+ (ou seja: 6*0=0 => 0+)
6/+ => not a number (ou seja: 6/0=not a number)
*/

let soundClick = new Audio("click.mp3");

/** --- memória do calculador */
let currentNumber;
let previousNumber;
let operation;
let error = false;

/** --- acesso à estrutura visual do calculador */
const btnNumber = document.querySelectorAll("button.colorGroupB");
const btnFunction = document.querySelectorAll("button.colorGroupA");
const btnOperation = document.querySelectorAll("button.colorGroupC");
const display = document.querySelector("div.display");

/** --- OnClick Actions para botões de números (0-9 incluindo ",") */
btnNumber.forEach((button) => {
  button.addEventListener("click", () => {
    pressNumber(button.textContent);
  });
});

/** ---  OnClick Ações para botões de números (0-9 incluindo ",") */
function pressNumber(element) {
  soundClick.play();
  // cenário: botão ","
  if (element === ",") {
    if (!currentNumber.includes(",")) {
      if (!Number(currentNumber)) {
        currentNumber = "0" + element;
      } else {
        currentNumber += element;
      }
    }
  }
  // cenário: todos os botões menos ","
  else {
    currentNumber =
      !Number(currentNumber) && currentNumber.length == 1
        ? element
        : currentNumber + element;
  }
  displayUpdate();
}

/** --- OnClick Ações para botões funcionais (C, etc) */
btnFunction.forEach((element) => {
  element.addEventListener("click", () => {
    soundClick.play();
    switch (element.textContent) {
      case "С":
        displayClear();
        break;
    }
  });
});

/** --- OnClick Actions para botões de operações aritméticas */
btnOperation.forEach((element) => {
  element.addEventListener("click", () => {
    pressOperator(element.textContent);
  });
});

/** --- OnClick Ações para botões de operações aritméticas */
function pressOperator(element) {
  soundClick.play();
  currentNumber = Boolean(currentNumber) ? currentNumber : "0";

  // сenário => indroduzido apenas um número
  if (!operation) {
    if (element !== "=") {
      operation = element;
      previousNumber = currentNumber;
      currentNumber = "";
    }
  }
  // сenário => indroduzidos ambos os números
  else {
    let resultOperation;
    const x = parseFloat(previousNumber.replace(",", "."));
    const y = parseFloat(currentNumber.replace(",", "."));
    console.log(x, y);
    switch (operation) {
      case "÷":
        if (!y) {
          resultOperation = "Not a number";
          error = true;
        } else {
          resultOperation = x / y;
        }
        break;
      case "×":
        resultOperation = x * y;
        break;
      case "+":
        resultOperation = x + y;
        break;
      case "-":
        resultOperation = x - y;
        break;
    }

    if (!error) {
      resultOperation = resultOperation.toFixed(14) * 1;
      resultOperation = resultOperation.toString().replace(".", ",");
    }

    if (element !== "=") {
      previousNumber = resultOperation;
      currentNumber = "";
      operation = element;
    } else {
      previousNumber = "";
      currentNumber = resultOperation;
      operation = "";
    }
  }

  displayUpdate();
}

/** ---  Listener do teclado */
/* em caso de funcionalidade de um calculador mais complexa com mais 
botões (e possibilidade de alterar a quantidade de botões) seria 
melhor criar um array (uma lista de botões do teclado para reagir e com ações corespondentes 
  (ou seja, funções para chamar)).  */

document.addEventListener("keydown", function (e) {
  switch (e.key) {
    case "Escape":
      soundClick.play();
      displayClear();
      break;
    case "1":
      pressNumber("1");
      break;
    case "2":
      pressNumber("2");
      break;
    case "3":
      pressNumber("3");
      break;
    case "4":
      pressNumber("4");
      break;
    case "5":
      pressNumber("5");
      break;
    case "6":
      pressNumber("6");
      break;
    case "7":
      pressNumber("7");
      break;
    case "8":
      pressNumber("8");
      break;
    case "9":
      pressNumber("9");
      break;
    case "0":
      pressNumber("0");
      break;
    case ",":
      pressNumber(",");
      break;
    case "+":
      pressOperator("+");
      break;
    case "-":
      pressOperator("-");
      break;
    case "/":
      pressOperator("÷");
      break;
    case "*":
      pressOperator("×");
      break;
    case "=":
      pressOperator("=");
      break;
    case "Enter":
      pressOperator("=");
      break;
  }
});

/** ---  atualiza ecra do calculador */
function displayUpdate() {
  // display cenário: erro => reinicia a memoria curta
  if (error) {
    display.textContent = currentNumber + previousNumber;
    currentNumber = "";
    previousNumber = "";
    operation = "";
    error = false;
    return null;
  }

  /** --- display cenário: percurso normal */
  display.textContent =
    showInLocalString(previousNumber) +
    operation +
    (Boolean(currentNumber) == 0 && !Boolean(operation)
      ? Number(currentNumber)
      : showInLocalString(currentNumber));

  display.scrollLeft = display.scrollWidth;
}

/** --- mostra os números no formato local (Settings of Windows) */
function showInLocalString(number) {
  stringNumber = number.replace(",", ".");
  if (Number(stringNumber)) {
    const intNumber = parseFloat(stringNumber.split(".")[0]).toLocaleString();
    let decimalNumber = stringNumber.split(".")[1];
    return intNumber + (decimalNumber == undefined ? "" : "," + decimalNumber);
  } else {
    return number;
  }
}

/** --- limpa ecra do calculador */
function displayClear() {
  currentNumber = "";
  previousNumber = "";
  operation = "";
  displayUpdate();
}

displayClear();
