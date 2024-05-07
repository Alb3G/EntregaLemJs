function showBox() {
	const cajaNota = document.createElement("div");
	cajaNota.classList.add("cajaNota");
	cajaNota.textContent = "Hola soy un div";
	const footer = document.querySelector('footer');
	const body = document.querySelector('body');

	body.insertBefore(cajaNota, footer);
}

function deleteBox() {}

