function calcNotaFinal(notaEjercicios, notaExamenTeorico, notaExamenPractico, notaProyecto) {
	return (parseFloat(notaEjercicios) * 0.2) + (parseFloat(notaExamenTeorico) * 0.2) + (parseFloat(notaExamenPractico) * 0.3) + (parseFloat(notaProyecto) * 0.3)
}

function showBox() {
	// Nos traemos todos los values de los inputs.
	const nombreAlumno = document.querySelector('#nameInput').value;
	const notaEjercicios = document.querySelector('#notaEj').value;
	const notaExamenTeorico = document.querySelector('#examenTeorico').value;
	const notaExamenPractico = document.querySelector('#examenPrac').value;
	const notaProyecto = document.querySelector('#notaProyecto').value;

	let notaFinal = calcNotaFinal(notaEjercicios, notaExamenTeorico, notaExamenPractico, notaProyecto);

	// Comenzamos a crear nuestro elemento div donde mostraremos el resultado.
	const cajaNota = document.createElement("div");
	cajaNota.classList.add("cajaNota");
	cajaNota.setAttribute("id", "cajaNotaId");

	cajaNota.textContent = notaFinal > 5 
	? "Has aprobado " + nombreAlumno + " - Nota Final: " + notaFinal 
	: "Has suspendido " + nombreAlumno + " - Nota Final: " + notaFinal;

	if(notaFinal > 5) {
		cajaNota.classList.add('aprobado');
	} else {
		cajaNota.classList.add('suspenso');
	}

	// Seleccionamos el footer para poder usar insertBefore y colocarlo entre el footer y el formulario.
	const footer = document.querySelector('footer');
	const body = document.querySelector('body');

	body.insertBefore(cajaNota, footer);
	// Le quitamos el atributo onClick para que el usuario no pueda crear mas de 1 caja.
	document.getElementsByTagName('button')[0].removeAttribute('onclick');
}

function deleteBox() {
	document.getElementById("cajaNotaId").remove();
	// Devolvemos el onClick cada vez que se borre para poder mostrar de nuevo.
	document.getElementsByTagName('button')[0].setAttribute('onclick', 'showBox()');
	let inputNombre = document.querySelector('#nameInput');
	inputNombre.value = "";
	//Seleccionamos todos los elementos input tipo number y para cada uno lo reseteamos no a 0 sino a null.
	let inputsNotas = document.querySelectorAll("input[type='number']").forEach(element => {
		element.value = null;
	});
}



