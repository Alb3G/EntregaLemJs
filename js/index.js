// Seleccionamos los input que vayan a hacernos falta.
const studentName = document.querySelector('#nameInput');
const exercicesGrade = document.querySelector('#notaEj');
const theoricalExamGrade = document.querySelector('#examenTeorico');
const practiceExamGrade = document.querySelector('#examenPrac');
const projectGrade = document.querySelector('#notaProyecto');
// Obtenemos todos los inputs de tipo número
const numInputs = document.querySelectorAll('input[type="number"]');

// Funciones de validacion de inputs.
const validName = (name) => {
    let regex = /^[a-zA-Z ]+$/;
    return regex.test(name);
}

const validNum = (value) => {
	return isNaN(value) || value < 0 || value > 10
}

const checkInputsNotEmpty = () => {
    let numInputsValid = true;

    numInputs.forEach(input => {
        if (isNaN(parseFloat(input.value)) || validNum(parseFloat(input.value))) {
            numInputsValid = false;
        }
    });

    const nameInputValid = studentName.value.trim() !== "" && validName(studentName.value.trim());

    return numInputsValid && nameInputValid;
}

// Comprobamos si los valores que le van a llegar a los inputs son correctos en todo momento
const validarNameInput = (e) => {
    const input = e.target;
    const value = input.value.trim();

    if (!validName(value)) {
        input.classList.add('errInput');
    } else {
        input.classList.remove('errInput');
    }
}

const validarNumInputs = (e) => {
    const input = e.target;
    const value = parseFloat(input.value);

    if (validNum(value)) {
        input.classList.add('errInput');
    } else {
        input.classList.remove('errInput');
    }
}

// Cuando se cargue el dom se añadiran los listeners a los inputs para que comprueben con las funciones de arriba
// los valores de los inputs.
document.addEventListener('DOMContentLoaded', () => {
	studentName.addEventListener('input', validarNameInput);
	studentName.addEventListener('change', validarNameInput);
});

document.addEventListener('DOMContentLoaded', () => {
    // Agregar listeners de eventos para validar mientras se interactúa con el input.
    numInputs.forEach(input => {
        input.addEventListener('input', validarNumInputs);
        input.addEventListener('change', validarNumInputs);
    });
});

const calcNotaFinal = (exercicesGrade, theoricalExamGrade, practiceExamGrade, projectGrade) => {
	return (parseFloat(exercicesGrade) * 0.2) + (parseFloat(theoricalExamGrade) * 0.2) + (parseFloat(practiceExamGrade) * 0.3) + (parseFloat(projectGrade) * 0.3)
}

const showBox = () => {
	// Nos traemos todos los values de los inputs.
	const studentName = document.querySelector('#nameInput').value;
	const exercicesGrade = document.querySelector('#notaEj').value;
	const theoricalExamGrade = document.querySelector('#examenTeorico').value;
	const practiceExamGrade = document.querySelector('#examenPrac').value;
	const projectGrade = document.querySelector('#notaProyecto').value;

	let notaFinal = calcNotaFinal(exercicesGrade, theoricalExamGrade, practiceExamGrade, projectGrade);

	// Comenzamos a crear nuestro elemento div donde mostraremos el resultado.
	const cajaNota = document.createElement("div");
	cajaNota.classList.add("cajaNota");
	cajaNota.setAttribute("id", "cajaNotaId");

	cajaNota.textContent = notaFinal > 5 
	? "Has aprobado " + studentName + " - Nota Final: " + notaFinal 
	: "Has suspendido " + studentName + " - Nota Final: " + notaFinal;

	if(notaFinal > 5) {
		cajaNota.classList.add('aprobado');
	} else {
		cajaNota.classList.add('suspenso');
	}

	// Seleccionamos el footer para poder usar insertBefore y colocarlo entre el footer y el formulario.
	const footer = document.querySelector('footer');
	const body = document.querySelector('body');

	if(checkInputsNotEmpty()) {
		body.insertBefore(cajaNota, footer);
		// Le quitamos el atributo onClick para que el usuario no pueda crear mas de 1 caja.
		document.getElementsByTagName('button')[0].removeAttribute('onclick');
	}
}

const deleteBox = () => {
	let boxToDelete = document.getElementById("cajaNotaId");
	// Si la caja no se ha creado porque algun campo no es valido permitimos que se resetee el imput igualmente.
	if(!boxToDelete) {
		let inputNombre = document.querySelector('#nameInput');
		inputNombre.value = "";

		let inputsNotas = document.querySelectorAll("input[type='number']").forEach(element => {
			element.value = null;
		});
	}
	boxToDelete.remove();
	// Devolvemos el onClick cada vez que se borre para poder mostrar de nuevo.
	document.getElementsByTagName('button')[0].setAttribute('onclick', 'showBox()');
	let inputNombre = document.querySelector('#nameInput');
	inputNombre.value = "";
	//Seleccionamos todos los elementos input tipo number y para cada uno lo reseteamos no a 0 sino a null.
	let inputsNotas = document.querySelectorAll("input[type='number']").forEach(element => {
		element.value = null;
	});
}



