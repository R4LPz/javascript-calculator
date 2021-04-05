//Variavel numbers recebe os elementos da DOM com classe number
var numbers = document.getElementsByClassName("number")

//Variavel operator recebe os elementos da DOM com classe operator
var operators = document.getElementsByClassName("operator")

//Função que retorna o valor atual do display
function getOutput() {
    return document.getElementById("output-value").innerText
}

//Função que escreve o valor digitado ou calculado no display, sendo que o valor máximo de digitos é 18
function printOutput(num){
    if(num == "" ){
        document.getElementById("output-value").innerText=num
    }else if(getOutput().length < 17){
        document.getElementById("output-value").innerText+=num
    }
}

//Função que retorna o valor atual do histórico do display
function getHistory() {
    return document.getElementById("history-value").innerText
}

//Função que escreve um valor no histórico do display
function printHistory(num){
    document.getElementById("history-value").innerText=num
}

// Função para limpar o display e o histórico
function clearAll(){
    printHistory("")
    printOutput("")    
}

/* 
 * Cria um eventListener para cada botão numérico do teclado
 * Desta forma quando um número for clicado será disparado um evento
 * Com o evento disparado o valor é escrito na tela comprintOutput
 */
for (const number of numbers) {
    number.addEventListener("click", ()=>{
        printOutput(number.id)
    })
}

/* 
 * Cria um eventListener para cada botão com operando do teclado
 * Desta forma quando um número for clicado será disparado um evento
 * Com o evento disparado realizará um tarefa
 */
for (const operator of operators) {
    operator.addEventListener("click", ()=>{
        switch (operator.id) {

            /* 
             * Caso a entrada seja CLEAR
             * Chama as funções para escrever na tela com uma String vazia
             * O resultado é limpar o display e o histórico
             */
            case 'clear':
                clearAll()
            break;
    
            /*
            * Caso a entrada seja BACKSPACE
            * Cria uma variavel tempBackspace que recebe a String do display sem o ultimo caracter da esquerda para direita
            * Em seguida limpa a tela e escreve o valor de tempBackspace           
            */
            case 'backspace':
                if(getOutput() != 'Infinity' && getOutput() != 'Not exists'){
                    var tempBackspace = getOutput().substring(0,getOutput().length-1)
                    printOutput("")
                    printOutput(tempBackspace)
                }
            break;

            /*
            * Caso seja !
            * Verifica se a entrada é maior que 20
            * Se sim o número seria demasiadamente grande, portanto é representado com infinito na display
            * Caso contrário, calcula o fatorial e retorna seu valor no display
            */
            case '!':
                if(getOutput() > 20){
                    printOutput("")
                    printOutput("Infinity")
                }
                else if(getOutput() < 0){
                    printOutput("")
                    printOutput("Not exists")
                }
                else{
                    let fatResult = 1
                    for (let i = 1; i <= getOutput() ; i++) {
                        fatResult *= i
                    }
                    printOutput("")
                    printOutput(fatResult)
                }   
            break;

            /**
             * Caso particular para -
             * Se o historico vazio o usuario quer digitar um numero negativo
             * Se o historico diferente de vazio, quer realizar uma operação sucessiva
             * Caso nenhuma satisfeita e o display não tenha um sinal apenas um sinal negativo, quer realizar a primeira subtração
             */
            case "-":
                if(getOutput() == ''){
                    printOutput("-")
                }else if(getHistory() != ''){
                    var result  = eval(`${getHistory()} ${getOutput()}`)
                    clearAll()
                    printHistory(`${result} ${operator.id}`)  
                }else if(getOutput() != '-'){
                    printHistory(`${getOutput()} ${operator.id}`)
                    printOutput("")  
                }
            break;

            /*
             * Caso a entrada seja = 
             * Se existe um histórico e um valor no display 
             * Então limpa a tela e o display e printa no display o valor da operação
             * Caso contrário não realiza a operação
             */
            case 'equal':
                var result  = eval(`${getHistory()} ${getOutput()}`)
                if (getHistory() != '' && getOutput() != '') {   
                    clearAll()
                    printOutput(result)  
                }
            break;

            /**
             * Caso a entrada seja %
             * Então limpa a tela e escreve o valor dividido por 100 no display
             */
            case '%':
                var result  = getOutput()/100
                    printOutput("")
                    printOutput(result)  
                
            break;

            /**
             * Caso a entrada seja .
             * Verifica se existe o caracter . na string
             * Caso não exista insere o valor
             * Caso contrário não faz nada
             */
            case '.':
                if(getOutput().indexOf('.') == -1){  
                    printOutput(".")  
                } 
            break;
                        
            /**
             * Caso seja qualquer outro operador
             * Se o display não estiver vazio
             * Então verifica se o historico não é vazio
             * Se Sim então calcula o resultado da operação e escreve no historico e a operção pressionada
             * Se não escreve no histórico o valor do display e a operação pressionada
             */
            default:
                if (getOutput() != '' ) {
                    if(getHistory() != ''){
                        var result  = eval(`${getHistory()} ${getOutput()}`)
                        clearAll()
                        printHistory(`${result} ${operator.id}`)  
                    }else {
                        printHistory(`${getOutput()} ${operator.id}`)
                        printOutput("")  
                    }
                }
            break;
        }
    })
}
