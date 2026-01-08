
/* =========================================================
   UTILITÁRIOS – FORM + CAMPOS (CICS + DOM moderno)
   ========================================================= */

function getForm() {
  return (
    document.KMM111A ||
    document.KM0101A ||
    document.forms["KMM111A"] ||
    document.forms["KM0101A"] ||
    null
  );
}

function getField(nameOrId) {
  const form = getForm();
  if (!form) return null;

  // tenta pelo NAME (padrão CICS)
  if (form.elements && form.elements[nameOrId]) {
    return form.elements[nameOrId];
  }

  // fallback por ID
  return document.getElementById(nameOrId);
}

/* =========================================================
   IDIOMA (localStorage.lang)
   ========================================================= */

function getLang() {
  const lang = (localStorage.getItem("lang") || "pt").toLowerCase();
  return ["pt", "en", "de"].includes(lang) ? lang : "pt";
}

const mensagens = {
  pt: {
    somenteDigitos: "O n&uacute;mero do cart&atilde;o deve conter apenas d&iacute;gitos.",
    tamanhoInvalido: "O n&uacute;mero do cart&atilde;o deve ter 16 d&iacute;gitos.",
    luhnInvalido: "N&uacute;mero do cart&atilde;o inv&aacute;lido (d&iacute;gito verificador incorreto)."
  },
  en: {
    somenteDigitos: "The card number must contain digits only.",
    tamanhoInvalido: "The card number must be exactly 16 digits long.",
    luhnInvalido: "Invalid card number (incorrect check digit)."
  },
  de: {
    somenteDigitos: "Die Kartennummer darf nur aus Ziffern bestehen.",
    tamanhoInvalido: "Die Kartennummer muss genau 16 Stellen haben.",
    luhnInvalido: "Ung&uuml;ltige Kartennummer (falsche Pr&uuml;fziffer)."
  }
};

function msg(key) {
  return mensagens[getLang()][key];
}

/* =========================================================
   DFH CURSOR – COMPATÍVEL COM CICS
   ========================================================= */

function dfhsetcursor(n) {
  const form = getForm();
  const campo = getField(n);
  if (!form || !campo) return;

  campo.focus();
  if (form.DFH_CURSOR) {
    form.DFH_CURSOR.value = n;
  }
}

function dfhinqcursor(n) {
  const form = getForm();
  if (form && form.DFH_CURSOR) {
    form.DFH_CURSOR.value = n;
  }
}

/* =========================================================
   VALIDAÇÃO DE CARTÃO – M01NACT
   ========================================================= */

// Guarda a mensagem original do CICS
let M01MSG_original = null;

// Algoritmo de Luhn
function validaCartaoLuhn(numero) {
  let soma = 0;
  let alterna = false;

  for (let i = numero.length - 1; i >= 0; i--) {
    let n = parseInt(numero[i], 10);
    if (alterna) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    soma += n;
    alterna = !alterna;
  }
  return (soma % 10) === 0;
}

// Detecta bandeira (simplificado)
function detectarBandeira(numero) {
  if (/^4/.test(numero)) return "Visa";
  if (/^5[1-5]/.test(numero)) return "Mastercard";
  return "Desconhecida";
}

function validarM01NACT() {
  const campo = getField("M01NACT");
  const msgCampo = getField("M01MSG");
  if (!campo || !msgCampo) return true;

  if (M01MSG_original === null) {
    M01MSG_original = msgCampo.innerHTML;
  }

  let valor = campo.value.trim().replace(/\s+/g, "");

  campo.classList.remove("campo-ok", "campo-erro");
  msgCampo.style.color = "";

  if (valor === "") {
    msgCampo.innerHTML = M01MSG_original;
    return true;
  }

  if (!/^\d+$/.test(valor)) {
    msgCampo.innerHTML = msg("somenteDigitos");
    msgCampo.style.color = "red";
    campo.classList.add("campo-erro");
    setTimeout(() => dfhsetcursor("M01NACT"), 0);
    return false;
  }

  if (valor.length !== 16) {
    msgCampo.innerHTML = msg("tamanhoInvalido");
    msgCampo.style.color = "red";
    campo.classList.add("campo-erro");
    setTimeout(() => dfhsetcursor("M01NACT"), 0);
    return false;
  }

  if (!validaCartaoLuhn(valor)) {
    msgCampo.innerHTML = msg("luhnInvalido");
    msgCampo.style.color = "red";
    campo.classList.add("campo-erro");
    setTimeout(() => dfhsetcursor("M01NACT"), 0);
    return false;
  }

  let bandeira = detectarBandeira(valor);

  campo.classList.add("campo-ok");
  msgCampo.innerHTML = M01MSG_original + " (" + bandeira + ")";
  msgCampo.style.color = "";

  return true;
}

/* =========================================================
   SUBMIT APENAS COM M01NACT
   ========================================================= */

function enviarSomenteM01NACT(botao) {

  if (!validarM01NACT()) {
    return;
  }

  const form = botao.form;
  if (!form) return;

  Array.from(form.elements).forEach(el => {
    if (el.name !== "M01NACT") {
      el.dataset.oldname = el.name;
      el.name = "";
    }
  });

  form.action = botao.getAttribute("formaction");

  // submit controlado
  formHandler({ preventDefault: () => {}, target: form });

  setTimeout(() => {
    Array.from(form.elements).forEach(el => {
      if (el.dataset.oldname) {
        el.name = el.dataset.oldname;
        delete el.dataset.oldname;
      }
    });
  });
}

