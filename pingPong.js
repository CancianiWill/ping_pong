const canvasEl = document.querySelector('canvas');
const canvasCtx = canvasEl.getContext('2d');
const lineWidth = 15;

function setup(){
//configurando tamanho de tela.
    canvasEl.width = canvasCtx.width = window.innerWidth;
    canvasEl.height = canvasCtx.height = window.innerHeight;
};

function draw(){
// desenhas os elementos (incialmente estaticos).
    canvasCtx.fillStyle ='#286047'; // desenhando o campo.
    canvasCtx.fillRect(0,0, window.innerWidth, window.innerHeight);

    canvasCtx.fillStyle ='#707070' // desenhando a linha central.
    canvasCtx.fillRect(window.innerWidth / 2 - lineWidth / 2, 0, lineWidth, window.innerHeight);

    canvasCtx.fillStyle = '#090C61'; // desenhando a raquete esquerda.
    canvasCtx.fillRect(10, 400, lineWidth, 200);

    canvasCtx.fillStyle = '#610900'; // desenhando a raquete direita.
    canvasCtx.fillRect(window.innerWidth - lineWidth - 10, 300, lineWidth, 200);

    canvasCtx.fillStyle = '#ffffff'; // desenhando a bola
    canvasCtx.beginPath();
    canvasCtx.arc(200, 300, 20, 0, 2 * Math.PI, false);
    canvasCtx.fill()

    canvasCtx.font = 'bold 72px Arial' // desenhando placar 
    canvasCtx.textAlign = 'center'
    canvasCtx.textBaseline = 'top'

    canvasCtx.fillStyle = '#090C61' // placar esquerdo
    canvasCtx.fillText('3' , window.innerWidth / 4, 50); 

    canvasCtx.fillStyle = '#610900' 
    canvasCtx.fillText('1' , window.innerWidth / 1.3, 50); // placar esquerdo
};

setup()
draw()