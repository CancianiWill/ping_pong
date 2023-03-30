const canvasEl = document.querySelector('canvas');
const canvasCtx = canvasEl.getContext('2d');
const gapX = 10

const campo = {
    w: window.innerWidth,
    h: window.innerHeight,
    draw:function(){
        // desenhando o campo.
        canvasCtx.fillStyle ='#286047'; 
        canvasCtx.fillRect(0,0, this.w, this.h);
    }
};

const linhaCentral = {
    w: 15,
    h: campo.h,
    draw: function(){
        // desenhando a linha central.
        canvasCtx.fillStyle ='#707070' 
        canvasCtx.fillRect(campo.w / 2 - this.w / 2, 0, this.w, this.h);
    }
};

const mouse = {
    x: 0,
    y: 0
};

const raqueteEsquerda ={
    x: gapX,
    y: 0,
    w: linhaCentral.w,
    h: 200,
    _move: function(){
        this.y = mouse.y - this.h / 2
    },
    draw: function(){
        // desenhando a raquete esquerda.
        canvasCtx.fillStyle = '#090C61'; 
        canvasCtx.fillRect(this.x, this.y, this.w, this.h);
        this._move()
    }
};

const raqueteDireita = {
    x: campo.w - linhaCentral.w - gapX,
    y: 100,
    w: linhaCentral.w,
    h: 200,
    _move: function(){
        this.y = bola.y - this.h / 2
    },
    draw: function(){
        // desenhando a raquete direita.
        canvasCtx.fillStyle = '#610900'; 
        canvasCtx.fillRect(this.x, this.y, this.w, this.h);
        this._move();
    }
};

const placar = {
    human: 1,
    computer: 2,
    draw: function(){
        // desenhando placar 
        canvasCtx.font = 'bold 72px Arial' 
        canvasCtx.textAlign = 'center'
        canvasCtx.textBaseline = 'top'

        // placar esquerdo
        canvasCtx.fillStyle = '#090C61' 
        canvasCtx.fillText(this.human , campo.w / 4, 50); 

        // placar direito
        canvasCtx.fillStyle = '#610900' 
        canvasCtx.fillText(this.computer , campo.w / 4 + campo.w / 2, 50); 
    }
};

const bola = {
    x: 300,
    y: 200,
    r: 20,
    speed: 10,
    _move: function() { 
        // criando animação da bola 
        this.x += 1 * this.speed
        this.y += 1 * this.speed
    },
    draw: function(){
        // desenhando a bola
        canvasCtx.fillStyle = '#ffffff'; 
        canvasCtx.beginPath();
        canvasCtx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
        canvasCtx.fill();
        this._move()
    }
};



function setup(){
    //configurando tamanho de tela.
    canvasEl.width = canvasCtx.width = campo.w;
    canvasEl.height = canvasCtx.height = campo.h;
};

function draw(){
    //chamando as funções de desenhar dos objetos criados
    campo.draw();
    linhaCentral.draw();

    raqueteEsquerda.draw();
    raqueteDireita.draw();

    placar.draw();

    bola.draw();

};

window.animeteFrame = (function(){
    //criando intervalo de atualização da tela e suavização.
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback){
            return window.setTimeout(callback, 1000 / 60);
        })
})()

function main() {
    setup();
    animeteFrame(main);
    draw();
};

main();

canvasEl.addEventListener('mousemove', function(e){
    mouse.x = e.pageX
    mouse.y = e.pageY
});