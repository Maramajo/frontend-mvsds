console.log("Início do script de tradução.");

var translations = {
  pt: { home: "Home", proposals: "Propostas", about: "Sobre", contact: "Contacte-nos", langLabel: "Brasil | PT", flag: "https://flagcdn.com/w20/br.png" },
  en: { home: "Home", proposals: "Proposals", about: "About", contact: "Contact us", langLabel: "US | EN", flag: "https://flagcdn.com/w20/us.png" },
  de: { home: "Start", proposals: "Angebote", about: "Über uns", contact: "Kontakt", langLabel: "Germany | DE", flag: "https://flagcdn.com/w20/de.png" }
};

(function(){
  var KEY = "lang";
  console.log("Definindo window.changeLang...");
  window.changeLang = function(lang) {
    try {
      console.log("changeLang chamado com idioma: " + lang);
      var d = translations[lang] || translations.pt;

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
    } catch (e) {
      console.error("Erro ao aplicar tradução: " + e.message);
    }
  };

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
      window.changeLang(saved);
    } catch (e) {
      console.error("Erro ao inicializar tradução: " + e.message);
    }
  });
})();