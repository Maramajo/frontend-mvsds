console.log("Início do script de tradução.");

var translations = {
  pt: { home: "Home", proposals: "Propostas", about: "Sobre", contact: "Contacte-nos", langLabel: "Brasil | PT", flag: "https://flagcdn.com/w20/br.png" },
  en: { home: "Home", proposals: "Proposals", about: "About", contact: "Contact us", langLabel: "US | EN", flag: "https://flagcdn.com/w20/us.png" },
  de: { home: "Start", proposals: "Angebote", about: "Über uns", contact: "Kontakt", langLabel: "Germany | DE", flag: "https://flagcdn.com/w20/de.png" }
};

(function(){
  var KEY = "lang";
  console.log("Definindo window.changeLang...");
  window.changeLang = function(lang, isInitialLoad = false) {
    try {
      console.log("changeLang chamado com idioma: " + lang + ", isInitialLoad: " + isInitialLoad);
      var d = translations[lang] || translations.pt;

      // Atualiza os elementos com data-key (nav)
      var nodes = document.querySelectorAll("[data-key]");
      console.log("Elementos com data-key encontrados: " + nodes.length);
      for (var i = 0; i < nodes.length; i++) {
        var el = nodes[i];
        var k = el.getAttribute("data-key");
        if (d[k] != null) {
          el.textContent = d[k];
          console.log("Traduzido elemento " + k + " para: " + d[k]);
        }
      }

      // Atualiza o rótulo e a bandeira do dropdown
      var lbl = document.getElementById("lang-label");
      var flg = document.getElementById("lang-flag");
      if (lbl) {
        lbl.textContent = d.langLabel;
        console.log("Label do idioma atualizado para: " + d.langLabel);
      }
      if (flg) {
        flg.src = d.flag;
        console.log("Bandeira atualizada para: " + d.flag);
      }

      // Salva o idioma no localStorage
      if (typeof window.localStorage !== "undefined") {
        try {
          window.localStorage.setItem(KEY, lang);
          console.log("Idioma salvo no localStorage: " + lang);
        } catch(e) {
          console.error("Erro ao salvar idioma no localStorage: " + e.message);
        }
      } else {
        console.warn("localStorage não disponível.");
      }

      // Lógica de redirecionamento via POST para a página SALDO, apenas se não for inicialização
      if (!isInitialLoad) {
        var currentUrl = window.location.href;
        var pageName = currentUrl.split('/').pop(); // Pega o último segmento da URL
        var currentLang = pageName === 'SALDODE' ? 'de' : 'pt'; // Infere o idioma atual da página
        var targetPageName = lang === 'de' ? 'SALDODE' : 'SALDO'; // Página alvo com base no idioma

        // Verifica se o idioma selecionado é diferente do idioma atual da página
        if (lang !== currentLang) {
          var newUrl = currentUrl.replace(pageName, targetPageName);
          sendPostRequest(newUrl, targetPageName);
        } else {
          console.log("Nenhuma requisição POST necessária: idioma selecionado já corresponde à página atual.");
        }
      }
    } catch (e) {
      console.error("Erro ao aplicar tradução: " + e.message);
    }
  };

  // Função para enviar a requisição POST
  function sendPostRequest(newUrl, targetPageName) {
    console.log("Preparando requisição POST para: " + newUrl);

    // Obtém o valor do parâmetro 'name' do elemento Cliente
    var clientElement = document.querySelector('div strong');
    var name = clientElement ? clientElement.nextSibling.textContent.trim() : '';
    if (!name) {
      console.error("Parâmetro 'name' não encontrado no elemento Cliente.");
      return;
    }
    console.log("Parâmetro name: " + name);

    // Envia a requisição POST
    fetch(newUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'name=' + encodeURIComponent(name)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro na requisição POST: ' + response.status);
      }
      return response.text(); // Obtém o HTML retornado
    })
    .then(html => {
      // Substitui o conteúdo da página atual com o HTML retornado
      document.open();
      document.write(html);
      document.close();
      // Atualiza a URL no navegador sem recarregar
      history.pushState({}, '', newUrl);
      console.log("Conteúdo da página atualizado via POST e URL alterada para: " + newUrl);
    })
    .catch(error => {
      console.error("Erro ao realizar requisição POST: " + error.message);
    });
  }

  console.log("window.changeLang definido.");

  document.addEventListener("DOMContentLoaded", function() {
    try {
      console.log("Evento DOMContentLoaded disparado.");
      var saved = "pt";
      if (typeof window.localStorage !== "undefined") {
        try {
          saved = window.localStorage.getItem(KEY) || "pt";
          console.log("Idioma recuperado do localStorage: " + saved);
        } catch(e) {
          console.error("Erro ao recuperar idioma no localStorage: " + e.message);
        }
      } else {
        console.warn("localStorage não disponível para inicialização.");
      }
      // Chama changeLang com isInitialLoad=true para evitar POST na inicialização
      window.changeLang(saved, true);
    } catch (e) {
      console.error("Erro ao inicializar tradução: " + e.message);
    }
  });
})();
