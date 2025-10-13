  // Tabela de traduções
  const translations1 = {
    pt: {
      home: "Home",
      proposals: "Propostas",
      about: "Sobre",
      contact: "Contacte-nos",
      dropdownLabel: "Brasil | PT",
      dropdownFlag: "br",
      url: "http://maramajo.ddns.net:32000/zOS"
    },
    en: {
      home: "Home",
      proposals: "Proposals",
      about: "About",
      contact: "Contact us",
      dropdownLabel: "US | EN",
      dropdownFlag: "us",
      url: "http://maramajo.ddns.net:32000/zOE"
    },
    de: {
      home: "Startseite",
      proposals: "Vorschläge",
      about: "Über uns",
      contact: "Kontakt",
      dropdownLabel: "Germany | DE",
      dropdownFlag: "de",
      url: "http://maramajo.ddns.net:32000/zOA"
    }
  };

  // Helper para setar texto com segurança
  function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  // Helper para atualizar o botão do dropdown
  function updateDropdownButton(flagCode, label) {
    const btn = document.getElementById('langDropdown');
    if (!btn) return;
    btn.innerHTML = `<img src="https://flagcdn.com/w20/${flagCode}.png" class="flag-icon" alt="${flagCode.toUpperCase()}"> ${label}`;
  }

  // Função para trocar idioma
  function changeLang(lang) {
    localStorage.setItem('lang', lang); // Salva escolha do idioma
    const t = translations1[lang] || translations1['pt'];

    // Atualiza o atributo lang do HTML
    document.documentElement.setAttribute('lang', lang);

    // Atualiza textos do menu
    setText('home-link', '\u{1F3E0} ' + t.home);
    setText('propostas-link', '\u{1F4BC} ' + t.proposals);
    setText('about-link', '\u{1F4C4} ' + t.about);
    setText('contact-link', '\u{1F4EC} ' + t.contact);

    // Atualiza o botão do dropdown
    updateDropdownButton(t.dropdownFlag, t.dropdownLabel);

    // Verifica se a página atual é zOS, zOE ou zOA e redireciona
    const currentUrl = window.location.href;
    const targetUrls = [
      'http://maramajo.ddns.net:32000/zOS',
      'http://maramajo.ddns.net:32000/zOE',
      'http://maramajo.ddns.net:32000/zOA'
    ];

    if (targetUrls.includes(currentUrl) && currentUrl !== t.url) {
      window.location.href = t.url;
    }
  }

  // Inicializa o idioma
  document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('lang');
    const initialLang = savedLang || document.documentElement.lang.split('-')[0] || 'pt';
    changeLang(initialLang);
	setActiveLink(); // Inicializa os links ativos
  });
  // Função para gerenciar o estado ativo dos links
      function setActiveLink() {
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
          link.addEventListener('click', function () {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
          });
        });

        // Define o link ativo com base na URL atual
        const currentPath = window.location.pathname;
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === currentPath || (currentPath === '/' && href === '/')) {
            link.classList.add('active');
          }
        });
      }
