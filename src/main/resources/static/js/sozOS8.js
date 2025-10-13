// Armazena o HTML original para restauração
checkAndRedirect();
const originalHTML = document.documentElement.outerHTML;

// Flag para evitar dupla inicialização
let isBootstrapInitialized = false;

const translations = {
  pt: {
    solutions: "Soluções",
    solutionsTitle: {
      default: "Soluções",
      "/zOS": "Demo do CWS",
      "/SALDO": "Extrato de Saldos",
      "/EXTRATO": "Extrato Bancário"
    },
    home: "Home",
    propostas: "💼 Propostas",
    about: "📄 Sobre",
    contactNav: "📬 Contacte-nos",
    quemSomosHome: "Quem somos",
    quemSomosSobre: "Por que nos escolher",
    quemSomosTextHome: "A Maramajo é uma empresa de consultoria em Tecnologia da Informação criada em 2001, e que vem tendo uma contínua expansão devido ao reconhecimento de mercado aos seus princípios de profissionalismo, ética e busca incessante pela qualidade. Nossa empresa conta com profissionais altamente qualificados, de experiência comprovada e com sucesso no mercado de tecnologia da informação.",
	italico: "Observação: por favor, considere que esta demonstração processa em um laptop antigo, com Ubuntu 1.8 e Hercules como programa de canal. Portanto, a latência é bem maior do que se fosse em um Mainframe de 	verdade.",
	quemSomosTextSobre: 'A <span class="marca">Maramajo</span> cresceu ao longo 21 anos graças ao trabalho em equipe e à liderança de sua experiente equipe de gestão. <br><br> A continuidade da gestão contribuiu para relacionamentos duradouros e mutuamente benéficos com clientes e parceiros. <br><br>A experiência acumulada da equipe de Gestão da <span class="marca">Maramajo</span> nas áreas de desenvolvimento de produtos e execução de projetos a posiciona de forma única para entender as necessidades dos clientes e fornecer soluções superiores a preços competitivos.',
    solucoes: "Soluções",
     solucoesListHome: [
      "✅ Desenvolvimento e manutenção de sistemas nas plataformas Mainframe, Windows e Unix/Linux.",
      "✅ Integração entre sistemas nas plataformas acima",
      "✅ Alocação de mão-de-obra especializada",
      "✅ Consultoria em sistemas",
      "✅ Treinamento em Informática"
    ],
    solucoesListSobre: [
      "✅ Desenvolvimeno e manutenção de sistemas nas plataformas Mainframe, Windows e Unix/Linux.",
      "✅ Integração entre sistemas nas plataformas acima",
      "✅ Alocação de mão-de-obra especializada",
      "✅ Consultoria em sistemas",
      "✅- Treinamento em Informática",
      "✅ Presença internacional",
      "✅ Empresa madura e estável"
    ],

    propostasTxt: "Propostas",
    zosTxt: 'Visite nosso z/OS. Veja-o "conversar" diretamente com seu browser clicando na imagem abaixo:',
    zosLink: "/zOS",
    saldoLink: "/SALDO",
    extratoLink: "/EXTRATO",
    mainTitle: "CWS",
    subTitle: "Simplificação de Middleware em Sistemas Críticos",
    intro: "Eliminando camadas desnecessárias de middleware para arquiteturas empresariais mais simples, rápidas e seguras.",
    overviewTitle: "🔍 Visão Geral",
    overviewText1: "Em muitos ambientes corporativos — especialmente em bancos, governos e grandes redes de varejo — frameworks de middleware como Java/Spring/Spring Boot são frequentemente introduzidos onde trazem pouco valor.",
    overviewQuote: "📊 “Menos é mais” quando desempenho, confiabilidade e segurança já existem no núcleo.",
    problemTitle: "🚫 O Problema: Sobrecarga do Middleware",
    problemText1: "Adicionar middleware entre o frontend e o mainframe introduz:",
    problemList: ["Maior latência", "Mais custos de manutenção e operação", "Mais pontos potenciais de falha", "Riscos de segurança devido ao fluxo de dados duplicado"],
    solutionTitle: "✅ A Solução: Deixe o Mainframe Falar",
    solutionText1: "Mainframes modernos podem:",
    solutionList: ["Servir APIs REST diretamente", "Usar JSON nativamente", "Integrar com Kubernetes e containers"],
    solutionText2: "Isso significa que muitas vezes não há necessidade de camadas extras como Java ou Spring Boot.",
    whyTitle: "🔐 Por que isso é importante",
    whyQuote: "IBM Z reporta apenas 0,1% de indisponibilidade devido a falhas de segurança, contra 2% de sistemas x86.",
    whyText1: "Mantendo a lógica e os dados no mainframe:",
    whyList: ["Reduzimos riscos", "Eliminamos duplicação de dados", "Simplificamos a manutenção"],
    whoTitle: "🧩 Quem Deve Se Importar",
    whoList: [
      "<strong>CTOs/CIOs</strong> procurando caminhos seguros de modernização",
      "<strong>Arquitetos de TI</strong> buscando simplificação",
      "<strong>Equipes Mainframe</strong> pressionadas a adicionar camadas intermediárias de plataforma baixa \"porque todo mundo usa assim\".",
      "<strong>Líderes de Segurança</strong> gerenciando sistemas transacionais sensíveis"
    ],
    filesTitle: '📂 Arquivos Incluídos',
    filesText: `Visite <a href="https://github.com/Maramajo/CWS" 
	             target="_blank" 
	             class="text-blue-600 hover:underline">
	             https://github.com/Maramajo/CWS
	           </a> para baixá-los.`,

    filesList: [
      "<code>Apresentacao CWS.pptx</code> – Apresentação com proposta de arquitetura",
      "<code>CWS Presentation.pptx</code> – Apresentação com proposta de arquitetura",
      "<code>README.md</code> – Propostas e outras explicações.",
      "Opcionalmente: arquivos-fonte, exemplos de código ou exemplos JSON/API (você pode expandir esta seção)"
    ],
    relatedTitle: "📄 Conteúdo Relacionado",
    relatedText: 'Este repositório suporta as ideias discutidas neste artigo:<br><span class="markdown-emoji">📚</span> <a href="#" class="text-blue-600 hover:underline">Artigo no Medium em breve...</a>',
    contactTitle: "📬 Contato",
    contactText: '<a href="mailto:maramajo.inf@gmail.com?subject=Contato" class="text-blue-600 hover:underline">Maramajo</a>',
    contactText1: '<a href="https://www.linkedin.com/in/jose-teixeira-672ba3b/" class="text-blue-600 hover:underline">Maramajo</a>',
    contactTextPropostas: 'Sinta-se à vontade para abrir issues ou conectar via <a href="https://www.linkedin.com/in/jose-teixeira-672ba3b/" class="text-blue-600 hover:underline">LinkedIn</a> para compartilhar feedback ou discutir implementações.',
    tagsTitle: "🏷️ Tags",
    tagsList: ["#mainframe", "#softwarearchitecture", "#legacyModernization", "#efficiency", "#simplify", "#COBOL", "#zOS", "#SpringBoot", "#middleware"],
    rodapeTxt: "2001 Maramajo. Todos os direitos reservados.",
    loading: "Carregando...",
    error: "Erro ao carregar conteúdo. Tente novamente.",
    nameError: "Por favor, preencha o campo Nome."
  },
  en: {
    solutions: "Solutions",
    solutionsTitle: {
      default: "Solutions",
      "/zOE": "CWS Demo",
      "/SALDOEN": "Balance Statement",
      "/EXTRATOEN": "Bank Statement"
    },
    home: "Home",
    propostas: "💼 Proposals",
    about: "📄 About",
    contactNav: "📬 Contact us",
    quemSomosHome: "About us",
    quemSomosSobre: "Why choose us",
    quemSomosTextHome: "Maramajo is an Information Technology consulting company founded in 2001, and has been continuously expanding thanks to market recognition of its principles of professionalism, ethics, and relentless pursuit of quality. Our company has highly qualified professionals with proven experience and market success.",
    italico: "Note: Please consider that this demo runs on an old laptop, with Ubuntu 1.8 and Hercules as the pipeline program. Therefore, the latency is much higher than if it were on a real Mainframe.",
    quemSomosTextSobre: 'A <span class="marca">Maramajo</span> has grown over 21 years thanks to the teamwork and leadership of its experienced management team. <br><br> This continuity of management has contributed to long-lasting and mutually beneficial relationships with customers and partners. <br><br>The accumulated experience of <span class="marca">Maramajo</span> management team in the areas of product development and project execution uniquely positions it to understand customer needs and provide superior solutions at competitive prices.',
    solucoes: "Solutions",
    solucoesListHome: [
      "✅ Development and maintenance of systems on Mainframe, Windows, and Unix/Linux platforms.",
      "✅ Integration between systems on the above platforms",
      "✅ Provision of specialized manpower",
      "✅ Systems consulting",
      "✅ IT training"
    ],
    solucoesListSobre: [
      "✅ Development and maintenance of systems on Mainframe, Windows, and Unix/Linux platforms.",
      "✅ Integration between systems on the above platforms",
      "✅ Provision of specialized manpower",
      "✅ Systems consulting",
      "✅ IT training",
      "✅ International Presence",
      "✅ Mature, Stable Company"
    ],
    propostasTxt: "Propostas",
    zosTxt: 'Visit our z/OS. Watch it "talk" directly to your browser by clicking the image below:',
    zosLink: "/zOE",
    saldoLink: "/SALDOEN",
    extratoLink: "/EXTRATOEN",
    mainTitle: "CWS",
    subTitle: "Middleware Simplification in Critical Systems",
    intro: "Eliminating unnecessary middleware layers for simpler, faster, and more secure enterprise architectures.",
    overviewTitle: "🔍 Overview",
    overviewText1: "In many enterprise environments — especially in banking, government, and large-scale retail — middleware frameworks like Java/Spring/Spring Boot are often introduced where they provide minimal value.",
    overviewQuote: "📊 \"Less is more\" when performance, reliability, and security already exist at the core.",
    problemTitle: "🚫 The Problem: Middleware Overhead",
    problemText1: "Adding middleware between the frontend and mainframe introduces:",
    problemList: ["Increased latency", "Higher maintenance and operational cost", "More potential failure points", "Security risks due to duplicated data flow"],
    solutionTitle: "✅ The Solution: Let the Mainframe Speak",
    solutionText1: "Modern mainframes can:",
    solutionList: ["Serve REST APIs directly", "Use JSON natively", "Integrate with Kubernetes and containers"],
    solutionText2: "This means there's often no need for extra layers like Java or Spring Boot.",
    whyTitle: "🔐 Why It Matters",
    whyQuote: "IBM Z mainframes report only 0.1% downtime due to security breaches, versus 2% for x86 systems.",
    whyText1: "By keeping the logic and data on the mainframe:",
    whyList: ["We reduce risk", "Eliminate data duplication", "Simplify maintenance"],
    whoTitle: "🧩 Who Should Care",
    whoList: [
      "<strong>CTOs/CIOs</strong> looking for safe modernization paths",
      "<strong>Enterprise architects</strong> seeking simplification",
      "<strong>Mainframe teams</strong> pressured to add low platform mid-layers \"because everyone wears them\"",
      "<strong>Security leads</strong> managing sensitive transactional systems"
    ],
    filesTitle: '📂 Included Files',
    filesText: `Visit 
	  <a href="https://github.com/Maramajo/CWS" 
	     target="_blank" 
	     class="text-blue-600 hover:underline">
	     https://github.com/Maramajo/CWS
	  </a> 
	  to download them.`,

    filesList: [
      "<code>Apresentacao CWS.pptx</code> – Presentation with architecture proposal",
      "<code>CWS Presentation.pptx</code> – Presentation with architecture proposal",
      "<code>README.md</code> – Proposals and other explanations.",
      "Optionally: Source files, code samples, or JSON/API examples (you can expand this section)"
    ],
    relatedTitle: "📄 Related Content",
    relatedText: 'This repository supports the ideas discussed in this article:<br><span class="markdown-emoji">📚</span> <a href="#" class="text-blue-600 hover:underline">Medium article coming soon...</a>',
    contactTitle: "📬 Contact",
    contactText: '<a href="mailto:maramajo.inf@gmail.com?subject=Contato" class="text-blue-600 hover:underline">Maramajo</a>',
    contactText1: '<a href="https://www.linkedin.com/in/jose-teixeira-672ba3b/" class="text-blue-600 hover:underline">Maramajo</a>',
    contactTextPropostas: 'Feel free to open issues or connect via <a href="https://www.linkedin.com/in/jose-teixeira-672ba3b/" class="text-blue-600 hover:underline">LinkedIn</a> to share feedback or discuss implementations.',
    tagsTitle: "🏷️ Tags",
    tagsList: ["#mainframe", "#softwarearchitecture", "#legacyModernization", "#efficiency", "#simplify", "#COBOL", "#zOS", "#SpringBoot", "#middleware"],
    rodapeTxt: "2001 Maramajo. All rights reserved.",
    loading: "Loading...",
    error: "Error loading content. Try again.",
    nameError: "Please fill in the Name field."
  },
  de: {
    solutions: "Lösungen",
    solutionsTitle: {
      default: "Lösungen",
      "/zOA": "CWS-Demo",
      "/SALDODE": "Bilanz",
      "/EXTRATODE": "Kontoauszug"
    },
    home: "Startseite",
    propostas: "💼 Vorschläge",
    about: "📄 Über uns",
    contactNav: "📬 Kontakt",
    quemSomosHome: "Wer wir sind",
    quemSomosSobre: "Warum uns wählen",
    quemSomosTextHome: "Maramajo ist ein IT-Beratungsunternehmen, das 2001 gegründet wurde und sich aufgrund der Marktanerkennung seiner Prinzipien von Professionalität, Ethik und dem unermüdlichen Streben nach Qualität kontinuierlich erweitert. Unser Unternehmen verfügt über hochqualifizierte Fachkräfte mit nachgewiesener Erfahrung und Markterfolg.",
    italico: "Hinweis: Bitte beachten Sie, dass diese Demo auf einem alten Laptop mit Ubuntu 1.8 und Hercules als Pipeline-Programm läuft. Daher ist die Latenz viel höher als auf einem echten Mainframe.",
    quemSomosTextSobre: 'A <span class="marca">Maramajo</span> ist in 21 Jahren dank der Teamarbeit und Führung seines erfahrenen Managementteams gewachsen. <br><br> Diese Kontinuität im Management hat zu langjährigen und für beide Seiten vorteilhaften Beziehungen mit Kunden und Partnern beigetragen. <br><br>Die gesammelte Erfahrung des <span class="marca">Maramajo</span>-Managementteams in den Bereichen Produktentwicklung und Projektabwicklung versetzt es in die einzigartige Lage, die Kundenbedürfnisse zu verstehen und erstklassige Lösungen zu wettbewerbsfähigen Preisen anzubieten.',
    solucoes: "Lösungen",
    solucoesListHome: [
      "✅ und Wartung von Systemen auf Mainframe-, Windows- und Unix/Linux-Plattformen.",
      "✅ Integration zwischen Systemen auf den oben genannten Plattformen",
      "✅ Bereitstellung von spezialisiertem Personal",
      "✅ Systemberatung",
      "✅ IT-Schulungen"
    ],
    solucoesListSobre: [
      "✅ und Wartung von Systemen auf Mainframe-, Windows- und Unix/Linux-Plattformen.",
      "✅ Integration zwischen Systemen auf den oben genannten Plattformen",
      "✅ Bereitstellung von spezialisiertem Personal",
      "✅ Systemberatung",
      "✅ IT-Schulungen",
      "✅ Internationale Präsenz",
      "✅ Etabliertes, stabiles Unternehmen"
    ],
    propostasTxt: "Vorschläge",
    zosTxt: 'Besuchen Sie unser z/OS. Klicken Sie auf das Bild unten und sehen Sie, wie es direkt mit Ihrem Browser „kommuniziert“:', zosLink: "/zOA",
    saldoLink: "/SALDODE",
    extratoLink: "/EXTRATODE",
    mainTitle: "CWS",
    subTitle: "Middleware-Vereinfachung in kritischen Systemen",
    intro: "Beseitigung unnötiger Middleware-Schichten für einfachere, schnellere und sicherere Unternehmensarchitekturen.",
    overviewTitle: "🔍 Überblick",
    overviewText1: "In vielen Unternehmensumgebungen – insbesondere im Bankwesen, in der Regierung und im Einzelhandel – werden Middleware-Frameworks wie Java/Spring/Spring Boot oft eingeführt, obwohl sie nur geringen Mehrwert bieten.",
    overviewQuote: "📊 „Weniger ist mehr\", wenn Leistung, Zuverlässigkeit und Sicherheit bereits im Kern vorhanden sind.",
    problemTitle: "🚫 Das Problem: Middleware-Overhead",
    problemText1: "Das Hinzufügen von Middleware zwischen Frontend und Mainframe führt zu:",
    problemList: ["Erhöhte Latenz", "Höheren Wartungs- und Betriebskosten", "Mehr potenziellen Fehlerquellen", "Sicherheitsrisiken durch duplizierte Datenflüsse"],
    solutionTitle: "✅ Die Lösung: Den Mainframe sprechen lassen",
    solutionText1: "Moderne Mainframes können:",
    solutionList: ["REST-APIs direkt bereitstellen", "JSON nativ verwenden", "Mit Kubernetes und Containern integrieren"],
    solutionText2: "Das bedeutet, dass zusätzliche Schichten wie Java oder Spring Boot oft nicht nötig sind.",
    whyTitle: "🔐 Warum es wichtig ist",
    whyQuote: "IBM Z-Mainframes melden nur 0,1 % Ausfallzeit aufgrund von Sicherheitsverletzungen, gegenüber 2 % bei x86-Systemen.",
    whyText1: "Indem wir Logik und Daten auf dem Mainframe belassen:",
    whyList: ["Wir reduzieren Risiken", "Beseitigen Daten-Duplizierung", "Vereinfachen die Wartung"],
    whoTitle: "🧩 Wer sich dafür interessieren sollte",
    whoList: [
      "<strong>CTOs/CIOs</strong> auf der Suche nach sicheren Modernisierungspfaden",
      "<strong>Enterprise-Architekten</strong> die Vereinfachung anstreben",
      "<strong>Mainframe-Teams</strong> unter Druck gesetzt, niedrige Plateau-Mittelschichten hinzuzufügen, \„weil jeder sie trägt\“",
      "<strong>Sicherheitsverantwortliche</strong> die sensible transaktionale Systeme verwalten"
    ],
    filesTitle: '📂 Enthaltene Dateien',
    filesText: `Besuchen Sie 
	  <a href="https://github.com/Maramajo/CWS" 
	     target="_blank" 
	     class="text-blue-600 hover:underline">
	     https://github.com/Maramajo/CWS
	  </a>, 
	  um sie herunterzuladen.`,

    filesList: [
      "<code>Apresentacao CWS.pptx</code> – Präsentation mit Architekturvorschlag",
      "<code>CWS Presentation.pptx</code> – Präsentation mit Architekturvorschlag",
      "<code>README.md</code> – Vorschläge und weitere Erläuterungen.",
      "Optional: Quellcodes, Codebeispiele oder JSON/API-Beispiele (Sie können diesen Abschnitt erweitern)"
    ],
    relatedTitle: "📄 Verwandte Inhalte",
    relatedText: 'Dieses Repository unterstützt die in diesem Artikel diskutierten Ideen:<br><span class="markdown-emoji">📚</span> <a href="#" class="text-blue-600 hover:underline">Medium-Artikel kommt bald...</a>',
    contactTitle: "📬 Kontakt",
    contactText: '<a href="mailto:maramajo.inf@gmail.com?subject=Contato" class="text-blue-600 hover:underline">Maramajo</a>',
    contactText1: '<a href="https://www.linkedin.com/in/jose-teixeira-672ba3b/" class="text-blue-600 hover:underline">Maramajo</a>',
    contactTextPropostas: 'Sie können gerne Issues öffnen oder sich über <a href="https://www.linkedin.com/in/jose-teixeira-672ba3b/" class="text-blue-600 hover:underline">LinkedIn</a> verbinden, um Feedback zu teilen oder Implementierungen zu diskutieren.',
    tagsTitle: "🏷️ Tags",
    tagsList: ["#mainframe", "#softwarearchitecture", "#legacyModernization", "#efficiency", "#simplify", "#COBOL", "#zOS", "#SpringBoot", "#middleware"],
    rodapeTxt: "2001 Maramajo. Alle Rechte vorbehalten.",
    loading: "Laden...",
    error: "Fehler beim Laden des Inhalts. Versuchen Sie es erneut.",
    nameError: "Bitte füllen Sie das Namensfeld aus."
  }
};
// Função para detectar dispositivo móvel
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Função para detectar se o navegador é Edge ou Chrome
function isEdgeOrChrome() {
  const userAgent = navigator.userAgent.toLowerCase();
  let a = userAgent.includes('chrome');
  let b = !userAgent.includes('firefox');
  console.log(a, b);
  let checar =  userAgent.includes('edg/') || userAgent.includes('chrome') && !userAgent.includes('firefox');
  return checar;
}

// Função para verificar e redirecionar
function checkAndRedirect() {
  const currentHost = window.location.hostname;
  const currentPath = window.location.pathname;

  // Verifica se está em maramajo.ddns.net:32000 e se é dispositivo móvel ou navegador não Edge/Chrome
  if (currentHost === 'maramajo.ddns.net' && (isMobileDevice() || !isEdgeOrChrome())) {
    // Redireciona para maramajo.ddns.net:32000/original
    console.log(isMobileDevice);
    console.log(isEdgeOrChrome);
    window.location.href = 'http://maramajo.ddns.net:32000/original';
  } 
}

// Executa a verificação assim que o script é carregado

function renderHome(lang) {
  const t = translations[lang] || translations['pt'];
  return `
<div id="principal-home" 
     class="flex flex-wrap justify-between gap-2 md:gap-6 px-4 md:px-8 max-w-6xl mx-auto">

  <!-- Coluna Esquerda -->
  <div class="col-esq flex-1 min-w-[260px] md:max-w-[48%]">
    <h2 class="mb-0 text-2xl md:text-3xl font-extrabold titul1 ms-2">
      ${t.quemSomosHome}
    </h2>
	<h1><strong>IBM® Business Partner</strong></h1>

    <div class="mt-4 space-y-4">
      <p>${t.quemSomosTextHome}</p>

      <p class="flex items-center gap-2">${t.zosTxt}</p>

	  <div class="d-flex justify-content-center align-items-center mt-4">
	    <div class="text-center me-4">
	      <a href="${t.zosLink}" 
	         data-route="${t.zosLink}" 
	         class="text-blue-600 hover:underline mainframe-link d-inline-block">
	        <img src="/images/mainframe.jpg" 
	             alt="Mainframe IBM z/OS" 
	             class="w-60 h-auto rounded shadow-md transition-transform duration-300 hover:scale-105 mx-auto d-block">
	      </a>
	    </div>

	    <div class="ms-3 text-start align-self-end">
	      <p class="text-gray-700 fw-bold fst-italic mb-0">
        ${t.italico}
	      </p>
	    </div>
	  </div>
    </div>
  </div>

  <!-- Coluna Direita -->
  <div class="col-esq flex-1 min-w-[260px] md:max-w-[48%]">
    <div class="flex items-center">
      <h2 id="solutions-title" 
          class="mb-0 text-2xl md:text-3xl font-extrabold titul1 ms-2">
        ${t.solutionsTitle.default}
      </h2>
    </div>

    <ul class="mt-4 space-y-2 list-inside">
      ${t.solucoesListHome.map(item => `<li>${item}</li>`).join('')}
    </ul>
  </div>
</div>
    `;
}

function renderPropostas(lang) {
  const t = translations[lang] || translations['pt'];
  return `
      <div class="container">
        <header class="text-center mb-12">
          <h1 class="text-4xl md:text-5xl font-extrabold text-blue-600">${t.mainTitle}</h1>
          <h2 class="text-2xl md:text-3xl font-semibold text-gray-700 mt-2">${t.subTitle}</h2>
          <p class="text-lg md:text-xl text-gray-600 mt-4">${t.intro}</p>
        </header>
        <section>
          <h3 class="section-header">${t.overviewTitle}</h3>
          <p class="text-base md:text-lg leading-relaxed">${t.overviewText1}</p>
          <p class="quote">${t.overviewQuote}</p>
        </section>
        <section>
          <h3 class="section-header">${t.problemTitle}</h3>
          <p class="text-base md:text-lg leading-relaxed">${t.problemText1}</p>
          <ul class="list-disc pl-6 space-y-2 text-base md:text-lg">${t.problemList.map(i => `<li>${i}</li>`).join('')}</ul>
        </section>
        <section>
          <h3 class="section-header">${t.solutionTitle}</h3>
          <p class="text-base md:text-lg leading-relaxed">${t.solutionText1}</p>
          <ul class="list-disc pl-6 space-y-2 text-base md:text-lg">${t.solutionList.map(i => `<li>${i}</li>`).join('')}</ul>
          <p class="text-base md:text-lg leading-relaxed mt-4">${t.solutionText2}</p>
        </section>
        <section>
          <h3 class="section-header">${t.whyTitle}</h3>
          <p class="quote">${t.whyQuote}</p>
          <p class="text-base md:text-lg leading-relaxed">${t.whyText1}</p>
          <ul class="list-disc pl-6 space-y-2 text-base md:text-lg">${t.whyList.map(i => `<li>${i}</li>`).join('')}</ul>
        </section>
        <section>
          <h3 class="section-header">${t.whoTitle}</h3>
          <ul class="list-disc pl-6 space-y-2 text-base md:text-lg">${t.whoList.map(i => `<li>${i}</li>`).join('')}</ul>
        </section>
        <section>
          <h3 class="section-header">${t.filesTitle}</h3>
		  <p class="text-base md:text-lg leading-relaxed">${t.filesText}</p>

          <ul class="list-disc pl-6 space-y-2 text-base md:text-lg">${t.filesList.map(i => `<li>${i}</li>`).join('')}</ul>
        </section>
        <section>
          <h3 class="section-header">${t.relatedTitle}</h3>
          <p class="text-base md:text-lg leading-relaxed">${t.relatedText}</p>
        </section>
        <section>
          <h3 class="section-header">${t.contactTitle}</h3>
          <p class="text-base md:text-lg leading-relaxed">${t.contactTextPropostas}</p>
        </section>
        <section>
          <h3 class="section-header">${t.tagsTitle}</h3>
          <div class="flex flex-wrap gap-2">${t.tagsList.map(tag => `<span class="tag-pill">${tag}</span>`).join(' ')}</div>
        </section>
      </div>
    `;
}

function renderSobre(lang) {
  const t = translations[lang] || translations['pt'];
  return `
      <div id="principal-home" class="container">
        <div class="col-esq">
          <h2 class="mb-0 ms-2 text-2xl md:text-3xl font-extrabold text-blue-600 titul1">${t.quemSomosSobre}</h2>
          <br>
          <p class="mt-2">${t.quemSomosTextSobre}</p>
        </div>
        <div class="col-esq">
          <div class="d-flex align-items-center">
            <h2 id="solutions-title" class="mb-0 ms-2 text-2xl md:text-3xl font-extrabold  titul1">${t.solutionsTitle.default}</h2>
          </div>
          <br>
          <ul class="mt-2">${t.solucoesListSobre.map(item => `<li>${item}</li>`).join('')}</ul>
        </div>
      </div>
    `;
}

function renderContato(lang) {
  const t = translations[lang] || translations['pt'];
  return `
      <div class="container">
        <section>
          <h3 class="section-header">${t.contactTitle}</h3>
          <p class="text-base md:text-lg leading-relaxed">
            E-mail <span class="contato">${t.contactText}</span>
          </p>
          <p class="text-base md:text-lg leading-relaxed">
            Linkedin <span class="contato">${t.contactText1}</span>
          </p>
          <div class="whatsapp-contact">
            <table>
              <tr>
                <td><img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp Logo" class="whatsapp-logo"></td>
                <td><a href="https://wa.me/5511976533798" class="text-base hover:underline"> +55 (11) 97653-3798</a></td>
              </tr>
            </table>
          </div>
        </section>
      </div>
    `;
}

const routes = {
  '/': renderHome,
  '/propostas': renderPropostas,
  '/sobre': renderSobre,
  '/contato': renderContato,
  '/zOS': () => '',
  '/zOE': () => '',
  '/zOA': () => '',
  '/SALDO': () => '',
  '/SALDOEN': () => '',
  '/SALDODE': () => '',
  '/EXTRATO': () => '',
  '/EXTRATOEN': () => '',
  '/EXTRATODE': () => ''
};

function initializeBootstrap() {
  if (isBootstrapInitialized) {
    console.log('Bootstrap já inicializado, ignorando...');
    return Promise.resolve();
  }
  return new Promise((resolve, reject) => {
    if (window.bootstrap) {
      document.querySelectorAll('.dropdown').forEach(dropdown => {
        const instance = bootstrap.Dropdown.getInstance(dropdown.querySelector('[data-bs-toggle="dropdown"]'));
        if (instance) instance.dispose();
      });
    }
    const existingScript = document.querySelector('script[src*="bootstrap.bundle.min.js"]');
    if (existingScript) existingScript.remove();
    const bootstrapScript = document.createElement('script');
    bootstrapScript.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js';
    bootstrapScript.async = true;
    bootstrapScript.onload = () => {
      document.querySelectorAll('[data-bs-toggle="dropdown"]').forEach(button => {
        if (!bootstrap.Dropdown.getInstance(button)) {
          new bootstrap.Dropdown(button);
          console.log('Dropdown inicializado para:', button);
        }
      });
      console.log('Bootstrap inicializado com sucesso');
      isBootstrapInitialized = true;
      resolve();
    };
    bootstrapScript.onerror = () => {
      console.error('Erro ao carregar Bootstrap');
      const fallbackScript = document.createElement('script');
      fallbackScript.src = '/js/bootstrap.bundle.min.js';
      fallbackScript.onload = () => {
        document.querySelectorAll('[data-bs-toggle="dropdown"]').forEach(button => {
          if (!bootstrap.Dropdown.getInstance(button)) {
            new bootstrap.Dropdown(button);
            console.log('Dropdown inicializado (fallback) para:', button);
          }
        });
        console.log('Bootstrap fallback inicializado');
        isBootstrapInitialized = true;
        resolve();
      };
      fallbackScript.onerror = () => {
        console.error('Erro ao carregar Bootstrap fallback');
        reject(new Error('Falha ao carregar Bootstrap'));
      };
      document.body.appendChild(fallbackScript);
    };
    document.body.appendChild(bootstrapScript);
  });
}

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
    console.log('Removendo navs duplicados:', navs.length - 1);
    for (let i = 1; i < navs.length; i++) {
      navs[i].remove();
    }
  }
  const footers = document.querySelectorAll('footer');
  if (footers.length > 1) {
    console.log('Removendo footers duplicados:', footers.length - 1);
    for (let i = 1; i < footers.length; i++) {
      footers[i].remove();
    }
  }
  contentDiv.innerHTML = `<div class="loading">${t.loading}</div>`;
  try {
    console.log('Buscando conteúdo para:', endpoint);

    /*
  Versão ajustada: força decodificação em ISO-8859-1 antes de passar ao DOMParser.
*/

    // --- PARTE 1 corrigida ---
    const response = await fetch(`http://maramajo.ddns.net:32000${endpoint}`, {
      method: method,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=ISO-8859-1',
        'Accept': 'text/html'
      },
      body: body ? new URLSearchParams(body).toString() : null
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    // força leitura dos bytes crus e decodifica manualmente
    const buffer = await response.arrayBuffer();
    const decoder = new TextDecoder('iso-8859-1');
    const text = decoder.decode(buffer);

    if ([
      '/zOS', '/zOE', '/zOA',
      '/SALDO', '/SALDOEN', '/SALDODE',
      '/EXTRATO', '/EXTRATOEN', '/EXTRATODE'
    ].includes(endpoint)) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'text/html');
      const targetDiv = doc.querySelector('div.vazia');
      console.log('TargetDiv encontrado:', targetDiv ? targetDiv.outerHTML : 'NÃO ENCONTROU');
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

async function fetchExternalContent(externalUrl, originalEndpoint, method = 'GET', body = null) {
  const lang = localStorage.getItem('lang') || 'pt';
  const t = translations[lang] || translations['pt'];
  let contentDiv = document.getElementById('content');
  if (!contentDiv) {
    contentDiv = document.createElement('div');
    contentDiv.id = 'content';
    document.body.appendChild(contentDiv);
  }
  contentDiv.innerHTML = `<div class="loading">${t.loading}</div>`;
  try {
    console.log(`[fetchExternalContent] Iniciando requisição para: ${externalUrl} com método ${method}`);

    let requestBody = null;
    if (method === 'POST') {
      const formData = [];
      for (const [key, value] of Object.entries(body)) {
        console.log(`[fetchExternalContent] Adicionando ao formData: ${key}=${value}`);
        // encodeURIComponent gera UTF-8, então precisamos "forçar" ISO-8859-1
        const encodedKey = encodeURIComponent(key);
        const encodedValue = escape(value); // escape mantém ISO-8859-1 seguro
        formData.push(`${encodedKey}=${encodedValue}`);
      }
      requestBody = formData.join("&");
      console.log("REQUESTBODY ");
      console.log(requestBody);
    }


    // --- PARTE 2 corrigida ---
    const response2 = await fetch(externalUrl, {
      method: method,
      headers: {
        'Accept': 'text/html',
        'Content-Type': 'application/x-www-form-urlencoded; charset=ISO-8859-1'

      },
      body: requestBody
    });

    if (!response2.ok) throw new Error(`[fetchExternalContent] HTTP error! Status: ${response2.status}`);

    // força leitura como ISO-8859-1
    const buffer2 = await response2.arrayBuffer();
    const decoder2 = new TextDecoder('iso-8859-1');
    const text2 = decoder2.decode(buffer2);

    console.log(`[fetchExternalContent] Resposta recebida: ${text2.substring(0, 200)}...`);

    const parser2 = new DOMParser();
    const doc2 = parser2.parseFromString(text2, 'text/html');
    const targetDiv2 = doc2.querySelector('div.vazia');
    contentDiv.innerHTML = targetDiv2 ? targetDiv2.outerHTML : text2;


    let solutionsTitle = document.querySelector('#solutions-title');
    if (solutionsTitle) {
      solutionsTitle.textContent = t.solutionsTitle[originalEndpoint] || t.solutionsTitle.default;
      solutionsTitle.className = 'mb-0 ms-2 text-2xl md:text-3xl font-extrabold text-blue-600 titulo';
    } else {
      console.warn('[fetchExternalContent] Elemento #solutions-title não encontrado, criando novo...');
      const dFlexDiv = document.querySelector('.d-flex.align-items-center');
      if (dFlexDiv) {
        solutionsTitle = document.createElement('h2');
        solutionsTitle.id = 'solutions-title';
        solutionsTitle.className = 'mb-0 ms-2 text-2xl md:text-3xl font-extrabold text-blue-600 titulo';
        solutionsTitle.textContent = t.solutionsTitle[originalEndpoint] || t.solutionsTitle.default;
        dFlexDiv.appendChild(solutionsTitle);
      }
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
    var endPoint = '';
    //   checkAndRedirect();
    console.error('[fetchExternalContent] Erro ao carregar conteúdo externo:', error, originalEndpoint, externalUrl);
    console.log("originalEndpoint " + originalEndpoint);
    console.log("externalUrl " + externalUrl);
    let newUrl = "";
    if (externalUrl.includes('AATM004P')) {
      newUrl = externalUrl.replace("http://192.168.0.13:3000/CICS/CWBA/AATM004P", "/zOS");
      fetchContent(newUrl, 'GET');
    } else
      if (externalUrl.includes('AATM004I')) {
        newUrl = externalUrl.replace("http://192.168.0.13:3000/CICS/CWBA/AATM004I", "/zOE");
        fetchContent(newUrl, 'GET');
      } else
        if (externalUrl.includes('AATM004A')) {
          newUrl = externalUrl.replace("http://192.168.0.13:3000/CICS/CWBA/AATM004A", "/zOA");
          fetchContent(newUrl, 'GET');
        } else
          if (externalUrl.includes('AATMEXTR')) {
            newUrl = externalUrl.replace("http://192.168.0.13:3000/CICS/CWBA/AATMEXTR", "/EXTRATO");
            fetchContent(newUrl, 'POST', body);

          } else
            if (externalUrl.includes('AATMEXEN')) {
              newUrl = externalUrl.replace("http://192.168.0.13:3000/CICS/CWBA/AATMEXEN", "/EXTRATOEN");
              fetchContent(newUrl, 'POST', body);
            } else
              if (externalUrl.includes('AATMEXGE')) {
                newUrl = externalUrl.replace("http://192.168.0.13:3000/CICS/CWBA/AATMEXGE", "/EXTRATODE");
                fetchContent(newUrl, 'POST', body);
              } else
                if (externalUrl.includes('AATMSALD')) {
                  newUrl = externalUrl.replace("http://192.168.0.13:3000/CICS/CWBA/AATMSALD", "/SALDO");
                  fetchContent(newUrl, 'POST', body);
                } else
                  if (externalUrl.includes('AATMSAEN')) {
                    newUrl = externalUrl.replace("http://192.168.0.13:3000/CICS/CWBA/AATMSAEN", "/SALDOEN");
                    fetchContent(newUrl, 'POST', body);
                  } else
                    if (externalUrl.includes('AATMSADE')) {
                      newUrl = externalUrl.replace("http://192.168.0.13:3000/CICS/CWBA/AATMSADE", "/SALDODE");
                      fetchContent(newUrl, 'POST', body);
                    }



    //    fetchExternalContent(newUrl, originalEndpoint, 'GET', body = null);
    //  contentDiv.innerHTML = `<div class="error">${t.error}</div>`;
  }
}

function endpointToCicsProgram(endpoint) {
  const cicsMap = {
    '/zOS': 'AATM004P',
    '/zOE': 'AATM004I',
    '/zOA': 'AATM004A',
    '/SALDO': 'AATMSALD',
    '/SALDOEN': 'AATMSAEN',
    '/SALDODE': 'AATMSADE',
    '/EXTRATO': 'AATMEXTR',
    '/EXTRATOEN': 'AATMEXEN',
    '/EXTRATODE': 'AATMEXGE'
  };
  return cicsMap[endpoint] || '';
}

function updateDoctemplate(lang) {
  const t = translations[lang] || translations['pt'];

  // CORREÇÃO: Atualizar o dropdown conforme solicitado
  const langDropdown = document.getElementById('langDropdown');
  if (langDropdown) {
    const flag = lang === 'en' ? 'us' : lang === 'de' ? 'de' : 'br';
    const label = lang === 'en' ? 'US | EN' : lang === 'de' ? 'Germany | DE' : 'Brasil | PT';

    // Atualizar apenas o conteúdo do botão, mantendo a estrutura do dropdown
    langDropdown.innerHTML = `
      <img src="https://flagcdn.com/w20/${flag}.png" class="flag-icon" alt="${flag.toUpperCase()}"> ${label}
    `;
  }

  const homeLink = document.getElementById('home-link');
  if (homeLink) homeLink.innerHTML = t.home;
  const propostasLink = document.getElementById('propostas-link');
  if (propostasLink) propostasLink.innerHTML = t.propostas;
  const aboutLink = document.getElementById('about-link');
  if (aboutLink) aboutLink.innerHTML = t.about;
  const contactLink = document.getElementById('contact-link');
  if (contactLink) contactLink.innerHTML = t.contactNav;

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
  reattachEventListeners();
}

function renderContent(path, lang) {
  let contentDiv = document.getElementById('content');
  if (!contentDiv) {
    contentDiv = document.createElement('div');
    contentDiv.id = 'content';
    document.body.appendChild(contentDiv);
  }
  const navs = document.querySelectorAll('nav');
  if (navs.length > 1) {
    console.log('Removendo navs duplicados:', navs.length - 1);
    for (let i = 1; i < navs.length; i++) {
      navs[i].remove();
    }
  }
  const footers = document.querySelectorAll('footer');
  if (footers.length > 1) {
    console.log('Removendo footers duplicados:', footers.length - 1);
    for (let i = 1; i < footers.length; i++) {
      footers[i].remove();
    }
  }
  const routeFunction = routes[path] || routes['/'];
  contentDiv.innerHTML = routeFunction(lang);
  let footer = document.querySelector('footer');
  if (!footer) {
    footer = document.createElement('footer');
    footer.className = 'text-center';
    footer.innerHTML = `<div class="container"><p>© <span id="rodape">${translations[lang].rodapeTxt}</span></p></div>`;
    document.body.appendChild(footer);
  } else {
    footer.classList.add('text-center');
    const rodape = document.querySelector('#rodape');
    if (rodape) {
      rodape.textContent = translations[lang].rodapeTxt;
      if (!rodape.parentElement.parentElement.classList.contains('container')) {
        const container = document.createElement('div');
        container.className = 'container';
        const p = rodape.parentElement;
        footer.innerHTML = '';
        footer.appendChild(container);
        container.appendChild(p);
      }
    } else {
      footer.innerHTML = `<div class="container"><p>© <span id="rodape">${translations[lang].rodapeTxt}</span></p></div>`;
    }
  }
  updateTranslations(lang);
  setActiveLink();
  initializeBootstrap().then(() => {
    reattachEventListeners();
  }).catch(error => {
    console.error('Erro ao inicializar Bootstrap em renderContent:', error);
  });
}

function updateTranslations(lang) {
  const t = translations[lang] || translations['pt'];
  const solutionsTitle = document.getElementById('solutions-title');
  if (solutionsTitle) {
    const currentPath = window.location.pathname || '/';
    solutionsTitle.textContent = t.solutionsTitle[currentPath] || t.solutionsTitle.default;
    solutionsTitle.className = 'mb-0 ms-2 text-2xl md:text-3xl font-extrabold text-blue-600 titulo';
  }
  const homeLink = document.getElementById('home-link');
  if (homeLink) homeLink.innerHTML = t.home;
  const propostasLink = document.getElementById('propostas-link');
  if (propostasLink) propostasLink.innerHTML = t.propostas;
  const aboutLink = document.getElementById('about-link');
  if (aboutLink) aboutLink.innerHTML = t.about;
  const contactLink = document.getElementById('contact-link');
  if (contactLink) contactLink.innerHTML = t.contactNav;

  // CORREÇÃO: Atualizar o botão do dropdown
  const langDropdown = document.getElementById('langDropdown');
  if (langDropdown) {
    const flag = lang === 'en' ? 'us' : lang === 'de' ? 'de' : 'br';
    const label = lang === 'en' ? 'US | EN' : lang === 'de' ? 'Germany | DE' : 'Brasil | PT';
    langDropdown.innerHTML = `
      <img src="https://flagcdn.com/w20/${flag}.png" class="flag-icon" alt="${flag.toUpperCase()}"> ${label}
    `;
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
}

function changeLang(lang) {
  console.log('changeLang chamado com idioma:', lang);
  localStorage.setItem('lang', lang);
  const path = window.location.pathname || '/';
  const t = translations[lang] || translations['pt'];
  const endpointMap = {
    '/zOS': t.zosLink,
    '/zOE': t.zosLink,
    '/zOA': t.zosLink,
    '/SALDO': t.saldoLink,
    '/SALDOEN': t.saldoLink,
    '/SALDODE': t.saldoLink,
    '/EXTRATO': t.extratoLink,
    '/EXTRATOEN': t.extratoLink,
    '/EXTRATODE': t.extratoLink
  };
  if (endpointMap[path]) {
    const endpoint = endpointMap[path];
    console.log('Mudando para endpoint:', endpoint);
    history.pushState(null, null, endpoint);
    const redirectMap = {
      '/zOS': 'http://192.168.0.13:3000/CICS/CWBA/AATM004P',
      '/zOE': 'http://192.168.0.13:3000/CICS/CWBA/AATM004I',
      '/zOA': 'http://192.168.0.13:3000/CICS/CWBA/AATM004A',
      '/SALDO': 'http://192.168.0.13:3000/CICS/CWBA/AATMSALD',
      '/SALDOEN': 'http://192.168.0.13:3000/CICS/CWBA/AATMSAEN',
      '/SALDODE': 'http://192.168.0.13:3000/CICS/CWBA/AATMSADE',
      '/EXTRATO': 'http://192.168.0.13:3000/CICS/CWBA/AATMEXTR',
      '/EXTRATOEN': 'http://192.168.0.13:3000/CICS/CWBA/AATMEXEN',
      '/EXTRATODE': 'http://192.168.0.13:3000/CICS/CWBA/AATMEXGE'
    };
    if (redirectMap[endpoint]) {
      fetchExternalContent(redirectMap[endpoint], endpoint, 'GET');
    } else {
      fetchContent(endpoint);
    }
  } else {
    renderContent(path, lang);
  }
}

function setActiveLink() {
  const navLinks = document.querySelectorAll('.nav-link');
  if (!navLinks.length) return;
  const currentPath = window.location.pathname || '/';
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });
}

function reattachEventListeners() {
  console.log('Reanexando eventos...');
  document.querySelectorAll('a.nav-link').forEach(link => {
    link.removeEventListener('click', navLinkHandler);
    link.addEventListener('click', navLinkHandler);
  });
  document.querySelectorAll('a[href="/SALDO"], a[href="/SALDOEN"], a[href="/SALDODE"], a[href="/EXTRATO"], a[href="/EXTRATOEN"], a[href="/EXTRATODE"], a[href="/zOS"], a[href="/zOE"], a[href="/zOA"]').forEach(link => {
    link.removeEventListener('click', endpointLinkHandler);
    link.addEventListener('click', endpointLinkHandler);
    console.log('Evento anexado para link:', link.getAttribute('href'));
  });
  document.querySelectorAll('form').forEach(form => {
    form.removeEventListener('submit', formHandler);
    form.addEventListener('submit', formHandler);
  });
  document.querySelectorAll('.dropdown-item[data-lang]').forEach(item => {
    item.removeEventListener('click', dropdownItemHandler);
    item.addEventListener('click', dropdownItemHandler);
    console.log('Evento anexado para dropdown-item:', item.getAttribute('data-lang'));
  });
  const routeLinks = document.querySelectorAll('a[data-route]');
  const uniqueRoutes = new Set();
  routeLinks.forEach(link => {
    const route = link.getAttribute('data-route');
    if (!uniqueRoutes.has(route)) {
      uniqueRoutes.add(route);
      link.removeEventListener('click', endpointLinkHandler);
      link.addEventListener('click', endpointLinkHandler);
      console.log('Evento anexado para data-route:', route);
    }
  });
}

function navLinkHandler(event) {
  event.preventDefault();
  const targetPath = event.target.closest('a.nav-link').getAttribute('href');
  console.log('Navegando para:', targetPath);
  history.pushState(null, null, targetPath);
  renderContent(targetPath, localStorage.getItem('lang') || 'pt');
}

function endpointLinkHandler(event) {
  event.preventDefault();
  const link = event.target.closest('a');
  const endpoint = link.getAttribute('data-route') || link.getAttribute('href');
  if (!endpoint || endpoint === '#' || endpoint === '/#') {
    console.error('Endpoint inválido no clique:', endpoint);
    return;
  }
  console.log('Endpoint clicado:', endpoint);
  const redirectMap = {
    '/zOS': 'http://192.168.0.13:3000/CICS/CWBA/AATM004P',
    '/zOE': 'http://192.168.0.13:3000/CICS/CWBA/AATM004I',
    '/zOA': 'http://192.168.0.13:3000/CICS/CWBA/AATM004A',
    '/SALDO': 'http://192.168.0.13:3000/CICS/CWBA/AATMSALD',
    '/SALDOEN': 'http://192.168.0.13:3000/CICS/CWBA/AATMSAEN',
    '/SALDODE': 'http://192.168.0.13:3000/CICS/CWBA/AATMSADE',
    '/EXTRATO': 'http://192.168.0.13:3000/CICS/CWBA/AATMEXTR',
    '/EXTRATOEN': 'http://192.168.0.13:3000/CICS/CWBA/AATMEXEN',
    '/EXTRATODE': 'http://192.168.0.13:3000/CICS/CWBA/AATMEXGE'
  };
  if (redirectMap[endpoint]) {
    console.log('Carregando conteúdo de:', redirectMap[endpoint]);
    history.pushState(null, null, endpoint);
    fetchExternalContent(redirectMap[endpoint], endpoint, 'GET');
  } else {
    history.pushState(null, null, endpoint);
    fetchContent(endpoint);
  }
}

function formHandler(event) {
  event.preventDefault();
  const form = event.target;
  const endpoint = form.action ? form.action.replace('http://maramajo.ddns.net:32000', '') : '';
  const redirectMap = {
    '/SALDO': 'http://192.168.0.13:3000/CICS/CWBA/AATMSALD',
    '/SALDOEN': 'http://192.168.0.13:3000/CICS/CWBA/AATMSAEN',
    '/SALDODE': 'http://192.168.0.13:3000/CICS/CWBA/AATMSADE',
    '/EXTRATO': 'http://192.168.0.13:3000/CICS/CWBA/AATMEXTR',
    '/EXTRATOEN': 'http://192.168.0.13:3000/CICS/CWBA/AATMEXEN',
    '/EXTRATODE': 'http://192.168.0.13:3000/CICS/CWBA/AATMEXGE'
  };
  if (redirectMap[endpoint]) {
    const formData = new FormData(form);
    const body = Object.fromEntries(formData);
    console.log('Formulário enviado para:', endpoint, body);
    history.pushState(null, null, endpoint);
    fetchExternalContent(redirectMap[endpoint], endpoint, 'POST', body);
  } else {
    console.log('Formulário enviado para endpoint interno:', endpoint);
    const formData = new FormData(form);
    const body = Object.fromEntries(formData);
    history.pushState(null, null, endpoint);
    fetchContent(endpoint, 'POST', body);
  }
}

function dropdownItemHandler(event) {
  event.preventDefault();
  const lang = event.target.closest('a').getAttribute('data-lang');
  console.log('Dropdown item clicado:', lang);
  changeLang(lang);
}

window.envia = function (endpoint) {
  const form = document.getElementById('cwsForm');
  if (!form) {
    console.error('Formulário com id="cwsForm" não encontrado.');
    return;
  }
  const nameInput = document.getElementById('name');
  const nameError = document.getElementById('nameError');
  if (!nameInput || !nameError) {
    console.error('Elemento com id="name" ou id="nameError" não encontrado.');
    return;
  }
  const lang = localStorage.getItem('lang') || 'pt';
  const t = translations[lang] || translations['pt'];
  const name = nameInput.value.trim();
  console.log(name + ' <== name');
  if (!name) {
    nameError.textContent = t.nameError;
    nameError.style.display = 'block';
    console.error("Campo 'name' está vazio ou contém apenas espaços.");
    return;
  }
  nameError.style.display = 'none';
  nameError.textContent = '';
  const formData = new FormData(form);
  const body = Object.fromEntries(formData);
  console.log('Envia chamado para:', endpoint, body);
  history.pushState(null, null, endpoint);
  const redirectMap = {
    '/SALDO': 'http://192.168.0.13:3000/CICS/CWBA/AATMSALD',
    '/SALDOEN': 'http://192.168.0.13:3000/CICS/CWBA/AATMSAEN',
    '/SALDODE': 'http://192.168.0.13:3000/CICS/CWBA/AATMSADE',
    '/EXTRATO': 'http://192.168.0.13:3000/CICS/CWBA/AATMEXTR',
    '/EXTRATOEN': 'http://192.168.0.13:3000/CICS/CWBA/AATMEXEN',
    '/EXTRATODE': 'http://192.168.0.13:3000/CICS/CWBA/AATMEXGE'
  };
  if (redirectMap[endpoint]) {
    fetchExternalContent(redirectMap[endpoint], endpoint, 'POST', body);
  } else {
    fetchContent(endpoint, 'POST', body);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM carregado, inicializando...');
  const navs = document.querySelectorAll('nav');
  if (navs.length > 1) {
    console.log('Removendo navs duplicados:', navs.length - 1);
    for (let i = 1; i < navs.length; i++) {
      navs[i].remove();
    }
  }
  const footers = document.querySelectorAll('footer');
  if (footers.length > 1) {
    console.log('Removendo footers duplicados:', footers.length - 1);
    for (let i = 1; i < footers.length; i++) {
      footers[i].remove();
    }
  }
  let footer = document.querySelector('footer');
  if (!footer) {
    footer = document.createElement('footer');
    footer.className = 'text-center';
    footer.innerHTML = `<div class="container"><p>© <span id="rodape">${translations[localStorage.getItem('lang') || 'pt'].rodapeTxt}</span></p></div>`;
    document.body.appendChild(footer);
  } else {
    footer.classList.add('text-center');
    const rodape = document.querySelector('#rodape');
    if (rodape) {
      rodape.textContent = translations[localStorage.getItem('lang') || 'pt'].rodapeTxt;
      if (!rodape.parentElement.parentElement.classList.contains('container')) {
        const container = document.createElement('div');
        container.className = 'container';
        const p = rodape.parentElement;
        footer.innerHTML = '';
        footer.appendChild(container);
        container.appendChild(p);
      }
    } else {
      footer.innerHTML = `<div class="container"><p>© <span id="rodape">${translations[localStorage.getItem('lang') || 'pt'].rodapeTxt}</span></p></div>`;
    }
  }
  const savedLang = localStorage.getItem('lang') || 'pt';
  const path = window.location.pathname || '/';
  initializeBootstrap().then(() => {
    console.log('Bootstrap inicializado, renderizando conteúdo para:', path);
    const redirectMap = {
      '/zOS': 'http://192.168.0.13:3000/CICS/CWBA/AATM004P',
      '/zOE': 'http://192.168.0.13:3000/CICS/CWBA/AATM004I',
      '/zOA': 'http://192.168.0.13:3000/CICS/CWBA/AATM004A',
      '/SALDO': 'http://192.168.0.13:3000/CICS/CWBA/AATMSALD',
      '/SALDOEN': 'http://192.168.0.13:3000/CICS/CWBA/AATMSAEN',
      '/SALDODE': 'http://192.168.0.13:3000/CICS/CWBA/AATMSADE',
      '/EXTRATO': 'http://192.168.0.13:3000/CICS/CWBA/AATMEXTR',
      '/EXTRATOEN': 'http://192.168.0.13:3000/CICS/CWBA/AATMEXEN',
      '/EXTRATODE': 'http://192.168.0.13:3000/CICS/CWBA/AATMEXGE'
    };
    if (redirectMap[path]) {
      fetchExternalContent(redirectMap[path], path, 'GET');
    } else {
      renderContent(path, savedLang);
    }
    reattachEventListeners();
  }).catch(error => {
    console.error('Erro ao inicializar Bootstrap no DOMContentLoaded:', error);
  });
}, { once: true });

window.addEventListener('popstate', () => {
  console.log('Evento popstate disparado, pathname:', window.location.pathname);
  const navs = document.querySelectorAll('nav');
  if (navs.length > 1) {
    console.log('Removendo navs duplicados:', navs.length - 1);
    for (let i = 1; i < navs.length; i++) {
      navs[i].remove();
    }
  }
  const footers = document.querySelectorAll('footer');
  if (footers.length > 1) {
    console.log('Removendo footers duplicados:', footers.length - 1);
    for (let i = 1; i < footers.length; i++) {
      footers[i].remove();
    }
  }
  let footer = document.querySelector('footer');
  if (!footer) {
    footer = document.createElement('footer');
    footer.className = 'text-center';
    footer.innerHTML = `<div class="container"><p>© <span id="rodape">${translations[localStorage.getItem('lang') || 'pt'].rodapeTxt}</span></p></div>`;
    document.body.appendChild(footer);
  } else {
    footer.classList.add('text-center');
    const rodape = document.querySelector('#rodape');
    if (rodape) {
      rodape.textContent = translations[localStorage.getItem('lang') || 'pt'].rodapeTxt;
      if (!rodape.parentElement.parentElement.classList.contains('container')) {
        const container = document.createElement('div');
        container.className = 'container';
        const p = rodape.parentElement;
        footer.innerHTML = '';
        footer.appendChild(container);
        container.appendChild(p);
      }
    } else {
      footer.innerHTML = `<div class="container"><p>© <span id="rodape">${translations[localStorage.getItem('lang') || 'pt'].rodapeTxt}</span></p></div>`;
    }
  }
  const path = window.location.pathname || '/';
  initializeBootstrap().then(() => {
    console.log('Bootstrap inicializado, renderizando conteúdo para:', path);
    const redirectMap = {
      '/zOS': 'http://192.168.0.13:3000/CICS/CWBA/AATM004P',
      '/zOE': 'http://192.168.0.13:3000/CICS/CWBA/AATM004I',
      '/zOA': 'http://192.168.0.13:3000/CICS/CWBA/AATM004A',
      '/SALDO': 'http://192.168.0.13:3000/CICS/CWBA/AATMSALD',
      '/SALDOEN': 'http://192.168.0.13:3000/CICS/CWBA/AATMSAEN',
      '/SALDODE': 'http://192.168.0.13:3000/CICS/CWBA/AATMSADE',
      '/EXTRATO': 'http://192.168.0.13:3000/CICS/CWBA/AATMEXTR',
      '/EXTRATOEN': 'http://192.168.0.13:3000/CICS/CWBA/AATMEXEN',
      '/EXTRATODE': 'http://192.168.0.13:3000/CICS/CWBA/AATMEXGE'
    };
    if (redirectMap[path]) {
      fetchExternalContent(redirectMap[path], path, 'GET');
    } else {
      renderContent(path, localStorage.getItem('lang') || 'pt');
    }
    reattachEventListeners();
  }).catch(error => {
    console.error('Erro ao inicializar Bootstrap no popstate:', error);
  });
});