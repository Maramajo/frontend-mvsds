 
 function dfhsetcursor(n) {
  for (var i = 0; i < document.KMM111A.elements.length; i++) {
    if (document.KMM111A.elements[i].name == n)
    {
      document.KMM111A.elements[i].focus();
      document.KMM111A.DFH_CURSOR.value = n;
      break
    }
  }
}
function dfhinqcursor(n) { document.KMM111A.DFH_CURSOR.value = n }




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

// Detecta bandeira (simplificado por BIN inicial)
function detectarBandeira(numero) {
    if (/^4/.test(numero)) return "Visa";
    if (/^5[1-5]/.test(numero)) return "Mastercard";
    return "Desconhecida";
}

function validarM01NACT() {
    const campo = document.getElementById("M01NACT");
    const msg = document.getElementById("M01MSG");

    if (M01MSG_original === null) {
        M01MSG_original = msg.innerHTML;  // mensagem do CICS
    }

    let valor = campo.value.trim().replace(/\s+/g, "");

    // limpa classes visuais
    campo.classList.remove("campo-ok", "campo-erro");
    msg.style.color = "";

    // Campo vazio → restaura mensagem do CICS
    if (valor === "") {
        msg.innerHTML = M01MSG_original;
        return true;
    }

    // apenas dígitos
    if (!/^\d+$/.test(valor)) {
        msg.innerHTML = "O n&uacute;mero do cart&atilde;o deve conter apenas d&iacute;gitos.";
        msg.style.color = "red";
        campo.classList.add("campo-erro");
        setTimeout(() => campo.focus(), 0);
        return false;
    }

    // tamanho
    if (valor.length !== 16) {
        msg.innerHTML = "O n&uacute;mero do cart&atilde;o deve ter 16 d&iacute;gitos.";
        msg.style.color = "red";
        campo.classList.add("campo-erro");
        setTimeout(() => campo.focus(), 0);
        return false;
    }

    // valida Luhn
    if (!validaCartaoLuhn(valor)) {
        msg.innerHTML = "N&uacute;mero do cart&atilde;o inv&aacute;lido (d&iacute;gito verificador incorreto).";
        msg.style.color = "red";
        campo.classList.add("campo-erro");
        setTimeout(() => campo.focus(), 0);
        return false;
    }

    // Bandeira detectada
    let bandeira = detectarBandeira(valor);

    // cartão OK → restaura mensagem do CICS + deixa borda verde
    campo.classList.add("campo-ok");
    msg.innerHTML = M01MSG_original + " (" + bandeira + ")";
    msg.style.color = "";

    return true;
}

function enviarSomenteM01NACT(botao) {

  // 1. Se o cartão for inválido → nada acontece
  if (!validarM01NACT()) {
    return;   // NÃO SUBMETE
  }

  const form = botao.form;

  // 2. Remover names de todos os campos exceto M01NACT
  Array.from(form.elements).forEach(el => {
    if (el.name !== "M01NACT") {
      el.dataset.oldname = el.name;
      el.name = "";
    }
  });

  // 3. Ajustar a action específica do botão
  form.action = botao.getAttribute("formaction");

  // 4. SUBMETER DE VERDADE (manual)
  //form.submit();
  formHandler({ preventDefault: () => {}, target: form });

  // 5. Restaurar names depois que o submit terminar
  setTimeout(() => {
    Array.from(form.elements).forEach(el => {
      if (el.dataset.oldname) {
        el.name = el.dataset.oldname;
        delete el.dataset.oldname;
      }
    });
  });
}

