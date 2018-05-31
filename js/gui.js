let gui = (function(){
	let $check, $bolas, $tablero, $botones;
    let contador = 0;
   	let arrayBolas = [undefined,undefined,undefined,undefined];

	let annadirBola = function(){
        let $id = $(this).prop('id');
        let indice = arrayBolas.indexOf(undefined);

        //Si hay undefined en el array, se coloca en el primero que encuentre
        if(indice != -1){
            $($bolas[indice]).addClass($id).effect("pulsate", {times: 3});
            arrayBolas[indice] = $id;
        }

        // Deshabilitamos el boton check si hay undefined en el array
        if(arrayBolas.indexOf(undefined) == -1)
            $check.css("display", "block").fadeIn("fast");
        
       	$(this).effect("bounce");
	}

	let eliminarBola = function(i){
		$(this).removeClass(arrayBolas[i]).addClass("bolasGrandes").effect("fade");
		arrayBolas[i] = undefined;
		$check.css("display", "none");
	};

	let nuevoIntento = function(){
        $bolas = $("#tablero"+contador).children().css("pointerEvents",'none');
        let contadorId = 0;
        let $divLinea = $("<div id='tablero"+(++contador)+"'></div>");
        let $newBolas = $(document.createDocumentFragment());
		$check.css("display", "none");
		arrayBolas = [undefined,undefined,undefined,undefined];

        // Bolas grandes
        for(let i = 0; i<4; i++){
            $bolaNueva = $("<div class='bolasGrandes' id='"+(contador+""+contadorId++)+"'></div>");
            $newBolas.append($bolaNueva.on("click",eliminarBola.bind($bolaNueva, i)));
        }

        // Bolas de resultado
        for(let i = 0; i<4; i++)
            $newBolas.append($("<div class='resultado' id='"+(contador+""+contadorId++)+"'></div>"));
        
        $tablero.append($divLinea.append($newBolas).show("fade", {duration:1000}));

        $bolas = $("#tablero"+contador).children();
	}	

	let menuGanador = function(){
		$botones.off("click", annadirBola);
		$check.off("click", comprobar);

        $( "#dialog-confirm" ).dialog({resizable: false, height: "auto", width: 400, modal: true,
          show: { effect: "puff", duration: 1000},
          hide: { effect: "drop", duration: 1000 },
          buttons: {
            Si: function() {
              $(this).dialog( "close" );
              iniciar();
            },
            No: function() {
              $(this).dialog( "close" );
              $tablero.html("<h1>¡Adios!</h1>");
              $botones.hide();
              $check.hide();
            }
          }
        });
	}

	let comprobar = function(){
		$resultados = $("#tablero"+contador+" >.resultado");
		let array = masterMind.comprobar(arrayBolas);
		
        // Pintamos los divs de resultado
		$resultados.each(function(i){
		    $(this).addClass(array[i]);
		});

		if(array.length == 4 && array[3] == "negra")
			menuGanador();
		else
			nuevoIntento();
	}

	let iniciar = function(){
		masterMind.init();
        	$check = $("#check");
        	$tablero = $("#tablero");
        	$botones = $("[name='boton']");
		$tablero.html("");
		nuevoIntento();
		$botones.on("click", annadirBola);
		$check.on("click", comprobar);
	}

	return { iniciar: iniciar }  
}());

$(gui.iniciar);	
