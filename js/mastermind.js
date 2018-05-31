{
	/* Closure */
	var masterMind = (function(){

		let colores = ["amarilla","azul","rojo","naranja","verde","negra","blanco","marron"];
		let arrayJuego;
		let linea;

		/* Inicializar */
		let init = function(){

			arrayJuego = new Array();
			
			for(let i = 0; i<4; i++){
				arrayJuego.push(colores[Math.round(Math.random()*(colores.length-1))]);
			}	
			console.log(arrayJuego);
		}

		let mostrar = function(){
			return linea;
		}

		/* Comprobar */
		let comprobar = function(intento){
			linea = intento;
			array = arrayJuego.slice();
			let valida = new Array();

			for(let i = 0; i<4; i++){
				if(linea[i] == arrayJuego[i]){
					valida.unshift(colores[5]);
					array[i] = undefined;
				}
			}

			for(let j = 0; j<4; j++){
				if(array.indexOf(linea[j]) != -1){
					valida.push(colores[6]);
					array[array.indexOf(linea[j])] = undefined;
				}
			}

			return valida;
		}

		return {
			init: init,
			mostrar: mostrar,
			comprobar: comprobar
		}
	}());
}