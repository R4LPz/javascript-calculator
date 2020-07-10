var numbers = document.getElementsByClassName("number")
var operators = document.getElementsByClassName("operator")


function getOutput() {
    return document.getElementById("output-value").innerText
}

function printOutput(num){
    if(num == "" ){
        document.getElementById("output-value").innerText=num
    }else if(getOutput().length <= 18){
        document.getElementById("output-value").innerText+=num
    }
}

function getHistory() {
    return document.getElementById("history-value").innerText
}

function printHistory(num){
    document.getElementById("history-value").innerText=num
}





for (const number of numbers) {
    number.addEventListener("click", ()=>{
        printOutput(number.id)
    })
}

for (const operator of operators) {
    operator.addEventListener("click", ()=>{
        switch (operator.id) {
            case 'clear':
                printHistory("")
                printOutput("")
            break;
    
            case 'backspace':
                var tempBackspace = getOutput().substring(0,getOutput().length-1)
                printOutput("")
                printOutput(tempBackspace)
            break;
            
            case '%':
                var result = getOutput()/100
                printOutput("")
                printOutput(result)
                break;

            case 'equal':
                var history = getHistory()
                var output = getOutput()
                if (history != '' && output != '') {   
                    printHistory("")
                    printOutput("")
                    printOutput(eval(`${history} ${output}`))  
                }
                
                
            break;

            default:

                if (getOutput() != '' ) {
                    printHistory(`${getOutput()} ${operator.id}`)
                    printOutput("")  
                }    
            break;
        }
    })
}
