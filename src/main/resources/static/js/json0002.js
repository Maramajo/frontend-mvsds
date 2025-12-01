function envio(basePath) {
  envia(basePath);
}
async function envia(basePath) {
  const lang = window.localStorage.getItem("lang") || "pt";
  let path = basePath;
  console.log(path + "  ***estou aqui");
  console.log('caminho original - ' + window.location.pathname);
  console.log('lingua - ' + lang);
  const form = document.getElementById('cwsForm');
  const nameInput = document.getElementById('name');
  const nameError = document.getElementById('nameError');
  let tiraDuplicidade = window.location.pathname;
  console.log('tiraduplicidade json0001- ' + tiraDuplicidade)
  let replaced = tiraDuplicidade.replace('/original/original/', '/original/');
  console.log('tiraduplicidade json0001- ' + replaced)
  const rawPath = replaced;


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

 // var url = nameInput ? "http://192.168.0.13:3000/CICS/CWBA" + nameInput.value.trim() : "http://192.168.0.13:3000/CICS/CWBA/json0001";
   var url = nameInput ? "http://maramajo.ddns.net:32000" + nameInput.value.trim() : "http://192.168.0.13:3000/CICS/CWBA/json0001";
 
  // const rawPath = window.location.pathname;
  if (['/original/jsonDE'].includes(rawPath)) {
    url = '/original/jsonDE';
  } else
    if (['/original/jsonEN'].includes(rawPath)) {
      url = '/original/jsonEN';
    } else
      if (['/original/json'].includes(rawPath)) {
        url = '/original/jsonPT';
      }
  if (['/original/xmlDE'].includes(rawPath)) {
    url = '/original/xmaDE';
  } else
    if (['/original/xmlEN'].includes(rawPath)) {
      url = '/original/xmeEN';
    } else
      if (['/original/xml'].includes(rawPath)) {
        url = '/original/xmlPT';
      }
  await fetchJsonCics(url, path);
  //   form.action = path;
  //  form.submit();

}

async function fetchJsonCics(url, path) {
  const lang = window.localStorage.getItem("lang") || "pt";
  const status = document.getElementById('status');
  let tiraDuplicidade = window.location.pathname;
  console.log('tiraduplicidade json0001- ' + tiraDuplicidade)
  let replaced = tiraDuplicidade.replace('/original/original/', '/original/');
  console.log('tiraduplicidade json0001- ' + replaced)
  const rawPath = replaced;

  //   const rawBox = document.getElementById('rawBox');
  //   const convertedBox = document.getElementById('convertedBox');
  const jsonBox = document.getElementById('jsonBox');
  const debcrTableBody = document.getElementById('debcrTableBody');
  const usuarioLine = document.getElementById('usuarioLine');
  const saldoLine = document.getElementById('saldoLine');

  try {
    if (lang === 'pt') {
      status.textContent = 'Buscando...';
    }
    if (lang === 'de') {
      status.textContent = 'Suche...';
    }
    if (lang === 'en') {
      status.textContent = 'Searching...';
    }
    var text = '';
    const nome = "José Maria";
    //const response = await fetch(url)

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=ISO-8859-1"
      },
      body: new URLSearchParams({ name: nome })
    });

    if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);

    // Lê resposta como latin1
    if ([
      '/original/json',
      '/original/jsonEN',
      '/original/jsonDE',
      '/original/xml',
      '/original/xmlEN',
      '/original/xmlDE'
    ].includes(rawPath)) {
      text = await response.text();
      console.log('original text - ' + text);
    } else {
      text = await response.text();
      console.log('original text - ' + text);
   //   const buffer = await response.arrayBuffer();
   //   text = new TextDecoder('latin1').decode(buffer);
   //   console.log('não original text - ' + text);
    }
    //  const buffer = await response.arrayBuffer();
    //  const text = new TextDecoder('latin1').decode(buffer);
    //    rawBox.textContent = text;

    // Substitui "bichinhos"
    const replaced = text.replace(/\u00DD/g, '[')   // Ý
      .replace(/\u00A8/g, ']')   // ¨
      .replace(/\uFFFD/g, '')    // � (se existir)
      .replace(/\r\n/g, '\n');   // normaliza newlines
    //   convertedBox.textContent = replaced;
    var json = '';
    if (path === '/xml') {
      preencheXml(replaced);
    } else {
      json = JSON.parse(replaced);
      jsonBox.textContent = JSON.stringify(json, null, 4);
      if (lang === 'pt') {

        usuarioLine.textContent = `Usuário: ${json.usuario}`;
        saldoLine.textContent = `Saldo: ${json.saldo}`;

        debcrTableBody.innerHTML = '';
        json.debcr.forEach((item, i) => {
          const row = document.createElement('tr');
          row.innerHTML = `
          <td>${i + 1}</td>
          <td>${item.debito}</td>
          <td>${item.credito}</td>
        `;
          debcrTableBody.appendChild(row);
        });
        document.getElementById('resultado').style.display = 'block';
        status.textContent = 'OK — JSON convertido e exibido.';
      }
      if (lang === 'en') {

        usuarioLine.textContent = `User: ${json.user}`;
        saldoLine.textContent = `Balance: ${json.balance}`;

        debcrTableBody.innerHTML = '';
        json.debcr.forEach((item, i) => {
          const row = document.createElement('tr');
          row.innerHTML = `
          <td>${i + 1}</td>
          <td>${item.debit}</td>
          <td>${item.credit}</td>
        `;
          debcrTableBody.appendChild(row);
        });
        document.getElementById('resultado').style.display = 'block';
        status.textContent = 'OK — JSON converted and displayed.';
      }
      if (lang === 'de') {

        usuarioLine.textContent = `Benutzer: ${json.benutzer}`;
        saldoLine.textContent = `Kontostand: ${json.kontostand}`;

        debcrTableBody.innerHTML = '';
        json.debcr.forEach((item, i) => {
          const row = document.createElement('tr');
          row.innerHTML = `
          <td>${i + 1}</td>
          <td>${item.lastschrift}</td>
          <td>${item.kredit}</td>
        `;
          debcrTableBody.appendChild(row);
        });
        document.getElementById('resultado').style.display = 'block';
        status.textContent = 'OK – JSON wurde konvertiert und angezeigt.';
      }
    }
  } catch (err) {
    console.error('Erro ao processar JSON:', err);
    status.textContent = 'Erro: ' + err.message;
  }
  function preencheXml(replaced) {
    const lang = window.localStorage.getItem("lang") || "pt";
    const status = document.getElementById('status');
    let tiraDuplicidade = window.location.pathname;
    console.log('tiraduplicidade json0001- ' + tiraDuplicidade)
    //  replaced = tiraDuplicidade.replace('/original/original/', '/original/');
    console.log('tiraduplicidade json0001- ' + replaced)
    //  const rawPath = replaced;
    //   const rawBox = document.getElementById('rawBox');
    //   const convertedBox = document.getElementById('convertedBox');
    const jsonBox = document.getElementById('jsonBox');
    jsonBox.textContent = replaced;
    const debcrTableBody = document.getElementById('debcrTableBody');
    const usuarioLine = document.getElementById('usuarioLine');
    const saldoLine = document.getElementById('saldoLine');
    const parser = new DOMParser();

    // 2️⃣ Converter o XML em um documento DOM
    const xmlDoc = parser.parseFromString(replaced, "text/xml");
    if (lang === 'en') {

      usuarioLine.textContent = `User: ${xmlDoc.getElementsByTagName("user")[0].textContent}`;
      saldoLine.textContent = `Balance: ${xmlDoc.getElementsByTagName("balance")[0].textContent}`;

      debcrTableBody.innerHTML = '';
      const debcrs = xmlDoc.getElementsByTagName("debcr");
      for (let i = 0; i < debcrs.length; i++) {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${i + 1}</td>
          <td>${debcrs[i].getElementsByTagName("debit")[0].textContent}</td>
          <td>${debcrs[i].getElementsByTagName("credit")[0].textContent}</td>
        `;
        debcrTableBody.appendChild(row);
      };
      document.getElementById('resultado').style.display = 'block';
      status.textContent = 'OK — XML converted and displayed.';
    }
    if (lang === 'pt') {

      usuarioLine.textContent = `Usuário: ${xmlDoc.getElementsByTagName("usuario")[0].textContent}`;
      saldoLine.textContent = `Saldo: ${xmlDoc.getElementsByTagName("saldo")[0].textContent}`;

      debcrTableBody.innerHTML = '';
      const debcrs = xmlDoc.getElementsByTagName("debcr");
      for (let i = 0; i < debcrs.length; i++) {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${i + 1}</td>
          <td>${debcrs[i].getElementsByTagName("debito")[0].textContent}</td>
          <td>${debcrs[i].getElementsByTagName("credito")[0].textContent}</td>
        `;
        debcrTableBody.appendChild(row);
      };
      document.getElementById('resultado').style.display = 'block';
      status.textContent = 'OK — XML convertido e exibido.';
    }
    if (lang === 'de') {

      usuarioLine.textContent = `Benutzer: ${xmlDoc.getElementsByTagName("benutzer")[0].textContent}`;
      saldoLine.textContent = `Gleichgewicht: ${xmlDoc.getElementsByTagName("gleichgewicht")[0].textContent}`;

      debcrTableBody.innerHTML = '';
      const debcrs = xmlDoc.getElementsByTagName("debcr");
      for (let i = 0; i < debcrs.length; i++) {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${i + 1}</td>
          <td>${debcrs[i].getElementsByTagName("lastschrift")[0].textContent}</td>
          <td>${debcrs[i].getElementsByTagName("kredit")[0].textContent}</td>
        `;
        debcrTableBody.appendChild(row);
      };
      document.getElementById('resultado').style.display = 'block';
      status.textContent = 'OK – XML wurde konvertiert und angezeigt.';
    }
  }
}

