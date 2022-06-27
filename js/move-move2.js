/**
 * Funciona com as teclas das setinhas
 */

// Capitura o clique do teclado
document.body.onkeydown = function (e) { move(e.keyCode); }

const PAINEL = document.querySelector("#painel");
const PONTOS = document.querySelector("#pontos");
let passatempo = null;
let direcao = 39;
let cobra = [];
let obstaculo = null;
let tamanho = 0;

function start() {
    if (passatempo == null) {
        tamanho = 0;
        obstaculo = randomPosition(newElement());
        cobra[tamanho] = newElement();
        passatempo = setInterval(loop, 200);
    }
}

function loop() {
    move(direcao);
    checkColision();
    PONTOS.innerHTML = tamanho;
}

function stop() {
    if (passatempo != null) {
        clearInterval(passatempo);
        passatempo = null;
    }
}

function checkColision(){
    let left = cobra[0].style.left;
    let top = cobra[0].style.top;
    if(left == obstaculo.style.left && top == obstaculo.style.top){
        tamanho++;
        cobra[tamanho] = updatePosition(
            newElement(),
            parseInt(obstaculo.style.left),
            parseInt(obstaculo.style.top));
        randomPosition(obstaculo);
        return;
    }
    for(let i = tamanho; i > 0; i--){
        if(left == cobra[i].style.left && top == cobra[i].style.top){
            stop();
            alert("Game Over!");
            return;
        }
    }
    left = parseInt(left);
    top = parseInt(top);
    if(left < 0 || top < 0 || left >= 400 || top >= 400){
        stop();
        alert("Game Over!");
        return;
    }
}

function newElement() {
    let item = document.createElement("div");
    item.setAttribute("class", "item");
    item.style.left = "0px";
    item.style.top = "0px";
    PAINEL.appendChild(item);
    return item;
}

function updatePosition(item, left, top) {
    item.style.left = left + "px";
    item.style.top = top + "px";
    return item;
}

function randomPosition(item) {
    return updatePosition(
        item,
        (Math.floor(Math.random() * 20) * 20),
        (Math.floor(Math.random() * 20) * 20));
}

// Função que realiza o movimento
function move(controle) {
    // Obtém os valores atuais de top e left
    let top = parseInt(cobra[0].style.top);
    let left = parseInt(cobra[0].style.left);

    if((direcao == 38 && controle == 40) ||
    (direcao == 40 && controle == 38) ||
    (direcao == 37 && controle == 39) ||
    (direcao == 39 && controle == 37))
        return;
    direcao = controle;

    // De acordo com o controle pressionado...
    switch (controle) {
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

    for(let i = tamanho; i > 0; i--){
        updatePosition(cobra[i],
            parseInt(cobra[i-1].style.left),
            parseInt(cobra[i-1].style.top));
    }
    //Atualiza os valores de top e left do objeto
    updatePosition(cobra[0], left, top);
}