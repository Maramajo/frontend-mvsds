  function envia(basePath) {
	console.log('window.location.pathname; ' + window.location.pathname);
    const lang = window.localStorage.getItem("lang") || "pt";
	let tiraDuplicidade = basePath;
	   console.log('tiraduplicidade originalLangZOS - '+tiraDuplicidade)
	   let replaced = tiraDuplicidade.replace('/original','');
	   console.log('tiraduplicidade originalLangZOS - '+replaced)
	 
    let path = replaced;
	 console.log(path + "  ***estou aqui");
	 console.log('basepath - ' + path);
	  const form = document.getElementById('cwsForm');
	  const nameInput = document.getElementById('name');
	  const nameError = document.getElementById('nameError');

	  // Valida o campo name
	  const name = nameInput.value.trim();
	  console.log(name + " <==name")
	  if (!name) {
	    nameError.textContent = "Por favor, preencha o campo Nome.";
	    nameError.style.display = 'block';
	      console.error("Campo 'name' está vazio ou contém apenas espaços.");
	   return;
	}

	// Limpa a mensagem de erro, se houver
	nameError.style.display = 'none';
	nameError.textContent = '';

    if (basePath.includes("/SALDO")) {
      switch (lang) {
        case "en":
          path = "/original/SALDOEN";
		  window.history.pushState({}, '', '/original/SALDOEN');
          break;
        case "de":
          path = "/original/SALDODE";
		  window.history.pushState({}, '', '/original/SALDODE');
	  
          break;
        default:
          path = "/original/SALDO"; // pt
		  window.history.pushState({}, '', '/original/SALDO');

      }
    }
	if (basePath === "/EXTRATO") {
	      switch (lang) {
	        case "en":
	          path = "/original/EXTRATOEN";
			  window.history.pushState({}, '', '/original/EXTRATOEN');

	          break;
	        case "de":
	          path = "/original/EXTRATODE";
			  window.history.pushState({}, '', '/original/EXTRATODE');

	          break;
	        default:
	          path = "/original/EXTRATO"; // pt
			  window.history.pushState({}, '', '/original/EXTRATO');

	      }
	    }
		if (basePath.includes("/json")) {
		      switch (lang) {
		        case "en":
		          path = "/original/jsonEN";
				  window.history.pushState({}, '', '/original/jsonEN');

		          break;
		        case "de":
		          path = "/original/jsonDE";
				  window.history.pushState({}, '', '/original/jsonDE');

		          break;
		        default:
		          path = "/original/json"; // pt
				  window.history.pushState({}, '', '/original/json');

		      }
		    }
			if (basePath.includes("/xml")) {
				      switch (lang) {
				        case "en":
				          path = "/original/xmlEN";
						  window.history.pushState({}, '', '/original/xmlEN');

				          break;
				        case "de":
				          path = "/original/xmlDE";
						  window.history.pushState({}, '', '/original/xmlDE');

				          break;
				        default:
				          path = "/original/xml"; // pt
						  window.history.pushState({}, '', '/original/xml');

				      }
				    }

     form.action = path;
    form.submit();
  }

