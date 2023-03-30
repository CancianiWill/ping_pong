const canvasEl = document.querySelector('canvas');
const canvasCtx = canvasEl.getContext('2d');
const gapX = 10

const campo = {
    w: window.innerWidth,
    h: window.innerHeight,
    draw:function(){
        canvasCtx.fillStyle ='#286047'; // desenhando o campo.
        canvasCtx.fillRect(0,0, this.w, this.h);
    }
};

const linhaCentral = {
    w: 15,
    h: campo.h,
    draw: function(){
        canvasCtx.fillStyle ='#707070' // desenhando a linha central.
        canvasCtx.fillRect(campo.w / 2 - this.w / 2, 0, this.w, this.h);
    }
};

const raqueteEsquerda ={
    x: gapX,
    y: 400,
    w: linhaCentral.w,
    h: 200,
    draw: function(){
        canvasCtx.fillStyle = '#090C61'; // desenhando a raquete esquerda.
        canvasCtx.fillRect(this.x, this.y, this.w, this.h);
    }
};

const raqueteDireita = {
    x: campo.w - linhaCentral.w - gapX,
    y: 100,
    w: linhaCentral.w,
    h: 200,
    draw: function(){
        canvasCtx.fillStyle = '#610900'; // desenhando a raquete direita.
        canvasCtx.fillRect(this.x, this.y, this.w, this.h);
    }
};

const placar = {
    human: 1,
    computer: 2,
    draw: function(){
        canvasCtx.font = 'bold 72px Arial' // desenhando placar 
        canvasCtx.textAlign = 'center'
        canvasCtx.textBaseline = 'top'

        canvasCtx.fillStyle = '#090C61' // placar esquerdo
        canvasCtx.fillText(this.human , campo.w / 4, 50); 

        canvasCtx.fillStyle = '#610900' 
        canvasCtx.fillText(this.computer , campo.w / 4 + campo.w / 2, 50); // placar esquerdo
    }
};

const bola = {
    x: 300,
    y: 200,
    r: 20,
    draw: function(){
        canvasCtx.fillStyle = '#ffffff'; // desenhando a bola
        canvasCtx.beginPath();
        canvasCtx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
        canvasCtx.fill();
    }
};



function setup(){
//configurando tamanho de tela.
    canvasEl.width = canvasCtx.width = campo.w;
    canvasEl.height = canvasCtx.height = campo.h;
};

function draw(){ //chamando as funções de desenhar dos objetos criados
    campo.draw();
    linhaCentral.draw();
    raqueteEsquerda.draw();
    raqueteDireita.draw();
    placar.draw();
    bola.draw();

};

setup()
draw()