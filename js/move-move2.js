/**
 * Funciona com as teclas das setinhas
 */

// Capitura o clique do teclado
document.body.onkeydown = function(e) {move(e.keyCode);}

// Obtém referência para o objeto que deve ser movido
const objeto = document.querySelector("#objeto");

// Define os valores iniciais do top e do left
objeto.style.top = 0;
objeto.style.left = 0;

// Função que realiza o movimento
function move(controle){
    // Obtém os valores atuais de top e left
    let top = parseInt(objeto.style.top);
    let left = parseInt(objeto.style.left);

    // De acordo com o controle pressionado...
    switch(controle){
        case 38: // Tecla para cima
        case "^": // Para cima, diminui o valor de top
            top -= 20;
            break;
        case 37: // Tecla para esquerda
        case "&lt;": // Para esquerda, diminui o valor de left
            left -= 20;
            break;
        case 39: // Tecla para direita
        case "&gt;": // Para direita, aumenta o valor de left
            left += 20;
            break;
        case 40: // Tecla para baixo
        case "v": // Para baixo, aumenta o valor de top
            top += 20;
            break;
        default:
            console.log(controle);
    }

    //Atualiza os valores de top e left do objeto
    objeto.style.top = top + "px";
    objeto.style.left = left + "px";
}