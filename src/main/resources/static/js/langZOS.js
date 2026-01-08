function trocaLingua(basePath, lang) {
	//	if (basePath.includes("json") || basePath.includes("xml")) {
	//window.SPA();    // <-- chama seu outro JS
	//spaGet(basePath);
	//sessionStorage.setItem('resumeSubmit', '1');
	//sessionStorage.setItem('resumePath', basePath);

	if (window.location.pathname !== basePath) {
		window.location.assign(basePath);
	}
	return;         // <-- cancela fluxo SPA daqui
}
//}
function envia(basePath) {

	const lang = window.localStorage.getItem("lang") || "pt";
	let path = basePath;

	const form = document.getElementById('cwsForm');
	// if (form) form.dataset.submitted = 'true';
	const nameInput = document.getElementById('name');
	const nameError = document.getElementById('nameError');

	// Valida o campo name
	const name = nameInput.value.trim();
	if (!name) {
		nameError.textContent = "Por favor, preencha o campo Nome.";
		nameError.style.display = 'block';
		return;
	}

	// limpa erro se existir
	nameError.style.display = 'none';
	nameError.textContent = '';

	// === SWITCHS DE IDIOMA ===
	if (basePath === "/SALDO") {
		switch (lang) {
			case "en": path = "/SALDOEN"; break;
			case "de": path = "/SALDODE"; break;
			default: path = "/SALDO";
		}
	}

	if (basePath === "/EXTRATO") {
		switch (lang) {
			case "en": path = "/EXTRATOEN"; break;
			case "de": path = "/EXTRATODE"; break;
			default: path = "/EXTRATO";
		}
	}

	if (basePath === "/json") {
		switch (lang) {
			case "en": path = "/jsonEN"; break;
			case "de": path = "/jsonDE"; break;
			default: path = "/json";
		}
	}

	if (basePath === "/xml") {
		switch (lang) {
			case "en": path = "/xmlEN"; break;
			case "de": path = "/xmlDE"; break;
			default: path = "/xml";
		}
	}

	if (basePath === "/cartao") {
		switch (lang) {
			case "en": path = "/cartaoEN"; break;
			case "de": path = "/cartaoDE"; break;
			default: path = "/cartao";
		}
	}

	// ================================
	// 🔥 AQUI ENTRA SUA NOVA REGRA:
	// Se for xml/json, chama outra função “envio(path)”
	// ================================

	// ================================
	// 🔥 SPA padrão do seu sistema
	// ================================
	form.action = path;

	window.formHandler({
		preventDefault: () => { },
		target: form
	});
}
