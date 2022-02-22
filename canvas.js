var canvas = document.getElementById('canvas-ahorcado');
var pincel = canvas.getContext('2d');
var letrasAcertadasPosX = [];
var cursiva = new FontFace('cursiva', 'url(fonts/leadcoat.ttf');

cursiva.load().then(function(font){
  document.fonts.add(font);
});	

function crearTableroJuego(){
    canvas.scrollIntoView();
    pincel.fillStyle = "#030e12";
    pincel.fillRect(0, 0, 1200, 800); // x, y, width, height
}

function mostrarGuiones(cantidad){
    x = 400;
    for(i = 0; i < cantidad; i++){
	pincel.fillStyle = "white";
        pincel.fillRect(x, 590, 25, 5);
	pincel.stroke();
	letrasAcertadasPosX.push(x);
	x = x + 50;
    }
}

function dibujarLetra(letra, x, y){
    pincel.textAlign = 'center';
    pincel.font = '50px cursiva';
    pincel.fillText(letra, x, y);
}

function dibujarLetraAcertada(letra, letrasPalabraElegida){
    for (var i = 0; i < letrasPalabraElegida.length; i++){
	if (letra == letrasPalabraElegida[i]){
	    y = 580;
	    x = letrasAcertadasPosX[i] + 12;
	    dibujarLetra(letra, x, y);
	}
    }
}

function dibujarLetraEquivocada(letra, letrasEquivocadas){
    var y = 100;
    var x = 450 + (letrasEquivocadas.size * 50);
    dibujarLetra(letra, x, y); 
}

function dibujarHorca(){
    pincel.beginPath();
    pincel.lineWidth = 10;
    pincel.strokeStyle = 'white';
    pincel.lineCap = "round";
    pincel.moveTo(50, 600);
    pincel.lineTo(150,575);
    pincel.lineTo(250, 600);
    pincel.moveTo(50, 600);
    pincel.lineTo(250, 600);
    pincel.moveTo(150,575);
    pincel.lineTo(150,200);
    pincel.lineTo(300,200);
    pincel.lineTo(300,225);
    pincel.stroke();
}

function dibujarParteCuerpo(letrasEquivocadas){
    if (letrasEquivocadas.size == 1){ //cabeza
        pincel.beginPath();
        pincel.lineWidth = 7;
        pincel.strokeStyle = 'white';
        pincel.lineCap = "round";
        pincel.arc(300, 260, 30, 0, 2*3.14);
	pincel.stroke();
    }else if (letrasEquivocadas.size == 2){ //tronco
        pincel.beginPath();
        pincel.lineWidth = 7;
        pincel.strokeStyle = 'white';
        pincel.lineCap = "round";
        pincel.moveTo(300, 290);
        pincel.lineTo(300, 450);
	pincel.stroke();
    }else if (letrasEquivocadas.size == 3){ //piernaIzq
        pincel.beginPath();
        pincel.lineWidth = 7;
        pincel.strokeStyle = 'white';
        pincel.lineCap = "round";
        pincel.moveTo(300, 450);
        pincel.lineTo(275, 550);
	pincel.lineTo(260, 535);
	pincel.stroke();
    }else if (letrasEquivocadas.size == 4){ //piernaDer
        pincel.beginPath();
        pincel.lineWidth = 7;
        pincel.strokeStyle = 'white';
        pincel.lineCap = "round";
        pincel.moveTo(300, 450);
        pincel.lineTo(325, 550);
	pincel.lineTo(340, 535);
	pincel.stroke();
    }else if (letrasEquivocadas.size == 5){ //brazoIzq
        pincel.beginPath();
        pincel.lineWidth = 7;
        pincel.strokeStyle = 'white';
        pincel.lineCap = "round";
        pincel.moveTo(300, 370);
        pincel.lineTo(215, 300);
	pincel.stroke();
    }else if (letrasEquivocadas.size == 6){ //brazoDer
        pincel.beginPath();
        pincel.lineWidth = 7;
        pincel.strokeStyle = 'white';
        pincel.lineCap = "round";
        pincel.moveTo(300, 370);
        pincel.lineTo(385, 300);
	pincel.stroke();
	pincel.textAlign = 'center';
        pincel.font = '20px sans-serif';
        pincel.fillText("X", 290, 260);
	pincel.textAlign = 'center';
        pincel.font = '20px sans-serif';
        pincel.fillText("X", 310, 260);
        pincel.lineWidth = 3;
	pincel.moveTo(290, 280);
        pincel.lineTo(310, 275);
	pincel.stroke();
    }
}
/*
function dibujarAdvertencia(mensaje, y){
    dibujarCuadroAdvertencia();
    dibujarTexto(mensaje, y);
    setTimeout(function(){
	dibujarLimpiezaCuadro();
    },3000);
}

function dibujarCuadroAdvertencia(){
//    pincel.globalAlpha = 0.3;
    pincel.fillStyle = "red";
    pincel.fillRect(450, 200, 400, 200); 
    pincel.fillStyle = "white";
    pincel.fillRect(460, 210, 380, 180); 
}


function dibujarTexto(mensaje, y){
    pincel.textAlign = 'left';
    pincel.fillStyle = "black";
    pincel.font = '20px sans-serif';
    pincel.weight = 'bold';
    pincel.fillText(mensaje, 500, y);
    
}

function dibujarLimpiezaCuadro(){
  //  pincel.globalAlpha = 1;
    pincel.fillStyle = "#ffa74f";
    pincel.fillRect(450, 200, 400, 200); // x, y, width, height

}*/


