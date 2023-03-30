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
    human: 0,
    computer: 0,
    _pontuarHuman: function(){
        this.human++
    },
    _pontuarComputer: function(){
        this.computer++
    },
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
    x: 0,
    y: 0,
    r: 20,
    speed: 10,
    direcaoX: 1,
    direcaoY: 1,
    _calcPosicao: function(){
        // criando colisão em cima e embaixo com base na posição da bola
        if(this.x > campo.w - this.r - raqueteDireita.w - gapX){
            //verifica colisão com raquete direita
            if(this.y + this.r > raqueteDireita.y && this.y - this.r + raqueteDireita.h){
                this. _reverteX()
            } else {
                // pontua no placar 
                placar._pontuarHuman()
                this._pointUp()
            }
        };
        if(this.x < this.r + raqueteEsquerda.w + gapX){
            // verifica colisão com raquete esquerda 
            if(this.y + this.r > raqueteEsquerda.y && this.y < raqueteEsquerda.y + raqueteEsquerda.h){
                this._reverteX()
            } else {
                // pontua no placar
                placar._pontuarComputer()
                this._pointUp()
            }
        }
        //verifica se a bola esta colidindo
        if((this.y - this.r < 0 && this.direcaoY < 0) || (this.y > campo.h - this.r && this.direcaoY > 0)){
            this._reverteY()
        };  
    },
    _reverteX: function(){
        //reverte direção da bola
        this.direcaoX *= -1 
    },
    _reverteY: function(){
        // reverte a direção da bola
        this.direcaoY *= -1
    },
    _pointUp: function(){
        this.x = campo.w / 2
        this.h = campo.h / 2
    },
    _move: function() { 
        // criando animação da bola 
        this.x += this.direcaoX * this.speed
        this.y += this.direcaoY * this.speed
    },
    draw: function(){
        // desenhando a bola
        canvasCtx.fillStyle = '#ffffff'; 
        canvasCtx.beginPath();
        canvasCtx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
        canvasCtx.fill();
        this._calcPosicao()
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