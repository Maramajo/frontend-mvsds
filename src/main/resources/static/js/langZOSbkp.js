  function submitTo(basePath) {
    const lang = window.localStorage.getItem("lang") || "pt";
    let path = basePath;

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

    const form = document.getElementById("cwsForm");
    form.action = path;
    form.submit();
  }

