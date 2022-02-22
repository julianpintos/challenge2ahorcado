var listaPalabras = ["GATO", "PERRO", "ZORRO", "GUITARRA", "PROGRAMADOR", "ALURA", "CODIGO", "PROGRAMACION"];
var nuevaPalabra = false;
var palabraElegida = "";
var letrasPalabraElegida = [];
var letrasAcertadas = [];
var letrasEquivocadas = new Set();
var juegoTerminado = false;
var mensajeFinal = "";
var mensaje = "";



var pulgarArribaEmoji = String.fromCodePoint(128077); 


//selectores
var botonIniciarJuego = document.querySelector("#iniciar-juego");


var html = document.querySelector("html");
var cartelError = document.querySelector("#cartel-error");
var botonAgregarPalabra = document.querySelector("#nueva-palabra");

//desarrollo
botonAgregarPalabra.addEventListener("click",function(event){
    var inputPalabra = document.querySelector("#input-nueva-palabra").value;
    var palabraMayuscula = inputPalabra.toUpperCase();
    listaPalabras.push(palabraMayuscula);
    nuevaPalabra = true;
    document.querySelector("#input-nueva-palabra").value = "";    
});

botonIniciarJuego.addEventListener("click",function(event){
  
    crearTableroJuego(); //canvas.js
    
    if (nuevaPalabra){
	let pos = listaPalabras.length;
	console.log('numero' + pos);
	palabraElegida = listaPalabras[pos - 1];
    }else{
	palabraElegida = escogerPalabraSecreta(listaPalabras);
    }

    mostrarGuiones(palabraElegida.length);
    letrasPalabraElegida = palabraElegida.split("");

    dibujarHorca();

    html.addEventListener('keypress', (event) => {
        event.preventDefault();
        if(juegoTerminado){
	    document.querySelector(".titulo").scrollIntoView();
	    setTimeout(function(){
		location.reload();
	    }, 1000);
    	}else{
	    limpiarMensaje();
            var letraCapturada = event.key;
            var testLetra = false;
            testLetra = validarLetra(letraCapturada);
            if (testLetra){
		compararLetras(letraCapturada, letrasPalabraElegida);
            }
    	}
    });
    
});




// retorna numero aleatorio
function indiceAleatorio(listaPalabras) {
    return Math.round(Math.random() * (listaPalabras.length -1));
}

//selecciona palabra de la lista con indice aleatorio 
function escogerPalabraSecreta(listaPalabras){
    var pos = indiceAleatorio(listaPalabras);
    var seleccionAleatoria = listaPalabras[pos];
    return seleccionAleatoria;
}
    
//validar letra - devuelve boolean
function validarLetra(letra){
    caracter = letra.charCodeAt();
    var resultado;
    if ((caracter >= 65 && caracter <= 90) && (letra !="Enter")) {
	resultado = true;
    }else{
	mensaje =  " Ingrese una letra sólo en mayúscula.<br>Sin números ni caracteres especiales.";
	mostrarMensaje(mensaje);
	resultado = false;
    }
    return resultado;
}

function verificarUsoPrevio(letra){
    var letraVerificada = true;
    mensaje = "<br> ¡ Letra repetida !.<br> Escribe otra.";
    if (letrasAcertadas.length > 0 && letrasAcertadas.includes(letra)){
	mostrarMensaje(mensaje);
    }else if (letrasEquivocadas.size > 0 && letrasEquivocadas.has(letra)){
	mostrarMensaje(mensaje);
    }else{
	letraVerificada = false;
    }
    return letraVerificada;
}

// verificar si pertenece a la palabra elegida y si lo es, escribirla en su lugar sobre los guiones
function compararLetras(letraParaComparar, letrasPalabraElegida){
    var usoPrevio = verificarUsoPrevio(letraParaComparar);
    if (!usoPrevio){
        
	if (letrasPalabraElegida.includes(letraParaComparar)){
            letrasPalabraElegida.forEach(function(letra){
                
		if (letraParaComparar == letra){
		    letrasAcertadas.push(letra);
		    dibujarLetraAcertada(letra, letrasPalabraElegida);
		    
		    if (letrasPalabraElegida.length == letrasAcertadas.length){
			mensaje = 'Palabra adivinada' + '<br>Presione cualquier tecla para jugar nuevamente';
			mostrarMensaje(mensaje);
			juegoTerminado = true;
		    }
                }
            });
        }else{
            if(letraParaComparar){
                letrasEquivocadas.add(letraParaComparar);
		dibujarLetraEquivocada(letraParaComparar, letrasEquivocadas);
		dibujarParteCuerpo(letrasEquivocadas);
                mensaje = "La letra escrita no forma parte de la palabra";
		mostrarMensaje(mensaje);
		if (letrasEquivocadas.size == 6){
		    mensaje = 'No encontró la palabra. ' + '<br>Intenta de nuevo.<br>Presiona cualquier tecla para jugar';
		    mostrarMensaje(mensaje);
		    juegoTerminado = true;
		}
            }
        }
    }
}


function mostrarMensaje(mensaje){
    cartelError.innerHTML = mensaje;
}

function limpiarMensaje(){
    cartelError.innerHTML = ""; 
}


