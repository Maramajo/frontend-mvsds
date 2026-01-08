async function fetchContent(endpoint, method = 'GET', body = null) {
  if (!endpoint || endpoint === '#' || endpoint === '/#') {
    console.error('Endpoint inválido:', endpoint);
    return;
  }
  const lang = localStorage.getItem('lang') || 'pt';
  const t = translations[lang] || translations['pt'];
  let contentDiv = document.getElementById('content');
  if (!contentDiv) {
    contentDiv = document.createElement('div');
    contentDiv.id = 'content';
    document.body.appendChild(contentDiv);
  }
  const navs = document.querySelectorAll('nav');
  if (navs.length > 1) {
    for (let i = 1; i < navs.length; i++) {
      navs[i].remove();
    }
  }
  const footers = document.querySelectorAll('footer');
  if (footers.length > 1) {
    for (let i = 1; i < footers.length; i++) {
      footers[i].remove();
    }
  }
  contentDiv.innerHTML = `<div class="loading">${t.loading}</div>`;
  try {
    const response = await fetch(`http://maramajo.ddns.net:32000${endpoint}`, {
      method: method,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=ISO-8859-1',
        'Accept': 'text/html'
      },
      body: body ? new URLSearchParams(body).toString() : null
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const buffer = await response.arrayBuffer();
    const decoder = new TextDecoder('iso-8859-1');
    const text = decoder.decode(buffer);

    if ([
      '/zOS', '/zOE', '/zOA',
      '/SALDO', '/SALDOEN', '/SALDODE',
      '/EXTRATO', '/EXTRATOEN', '/EXTRATODE',
      '/json', '/jsonEN', '/jsonDE',
      '/xml', '/xmlEN', '/xmlDE'
    ].includes(endpoint)) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'text/html');
      const targetDiv = doc.querySelector('div.vazia');
      contentDiv.innerHTML = targetDiv ? targetDiv.outerHTML : text;

      let solutionsTitle = document.querySelector('#solutions-title');
      if (solutionsTitle) {
        solutionsTitle.textContent = t.solutionsTitle[endpoint] || t.solutionsTitle.default;
        solutionsTitle.className = 'mb-0 ms-2 text-2xl md:text-3xl font-extrabold text-blue-600 titulo';
      } else {
        console.warn('Elemento #solutions-title não encontrado no conteúdo retornado para:', endpoint);
        const dFlexDiv = document.querySelector('.d-flex.align-items-center');
        if (dFlexDiv) {
          solutionsTitle = document.createElement('h2');
          solutionsTitle.id = 'solutions-title';
          solutionsTitle.className = 'mb-0 ms-2 text-2xl md:text-3xl font-extrabold text-blue-600 titulo';
          solutionsTitle.textContent = t.solutionsTitle[endpoint] || t.solutionsTitle.default;
          dFlexDiv.appendChild(solutionsTitle);
        }
      }
    } else {
      contentDiv.innerHTML = text;
    }

    let footer = document.querySelector('footer');
    if (!footer) {
      footer = document.createElement('footer');
      footer.className = 'text-center';
      footer.innerHTML = `<div class="container"><p>© <span id="rodape">${t.rodapeTxt}</span></p></div>`;
      document.body.appendChild(footer);
    } else {
      footer.classList.add('text-center');
      const rodape = document.querySelector('#rodape');
      if (rodape) {
        rodape.textContent = t.rodapeTxt;
        if (!rodape.parentElement.parentElement.classList.contains('container')) {
          const container = document.createElement('div');
          container.className = 'container';
          const p = rodape.parentElement;
          footer.innerHTML = '';
          footer.appendChild(container);
          container.appendChild(p);
        }
      } else {
        footer.innerHTML = `<div class="container"><p>© <span id="rodape">${t.rodapeTxt}</span></p></div>`;
      }
    }

    await initializeBootstrap();
    updateDoctemplate(lang);
    reattachEventListeners();
  } catch (error) {
    console.error('Erro na requisição:', error);
    contentDiv.innerHTML = `<div class="error">${t.error}</div>`;
  }
}

