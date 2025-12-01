  function envia(basePath) {
    const lang = window.localStorage.getItem("lang") || "pt";
    let path = basePath;
	 console.log(path + "  ***estou aqui");
	  const form = document.getElementById('cwsForm');
	  const nameInput = document.getElementById('name');
	  const nameError = document.getElementById('nameError');

	  // Valida o campo name
	  const name = nameInput.value.trim();
	  console.log(name + " <==name")
	  if (!name) {
	    nameError.textContent = "Bitte füllen Sie das Feld Name aus.";
	    nameError.style.display = 'block';
	      console.error("Campo 'name' está vazio ou contém apenas espaços.");
	   return;
	}

	// Limpa a mensagem de erro, se houver
	nameError.style.display = 'none';
	nameError.textContent = '';

    if (basePath === "/SALDO") {
      switch (lang) {
        case "en":
          path = "/SALDOEN";
          break;
        case "de":
          path = "/SALDODE";
          break;
        default:
          path = "/SALDO"; // pt
      }
    }
	if (basePath === "/EXTRATO") {
	      switch (lang) {
	        case "en":
	          path = "/EXTRATOEN";
	          break;
	        case "de":
	          path = "/EXTRATODE";
	          break;
	        default:
	          path = "/EXTRATO"; // pt
	      }
	    }

     form.action = path;
    form.submit();
  }

