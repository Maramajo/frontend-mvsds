// Armazena o HTML original para restauração
const originalHTML = document.documentElement.outerHTML;

// --- INÍCIO: base path helpers (fixa Home em /original) ---
const BASE_PATH = '/original';

function addBasePath(path) {
  // transforma '/propostas'  -> '/original/propostas'
  // transforma '/' ou ''     -> '/original'
  // preserva '/original'    -> '/original'
  if (!path || path === '/') return BASE_PATH;
  if (path.startsWith(BASE_PATH)) return path;
  return path.startsWith('/') ? BASE_PATH + path : BASE_PATH + '/' + path;
}

function stripBasePath(path) {
  // transforma '/original/propostas' -> '/propostas'
  // transforma '/original'           -> '/original'
  // deixa '/propostas'               -> '/propostas'
  if (!path) return '/';
  if (path === BASE_PATH) return BASE_PATH;
  if (path.startsWith(BASE_PATH + '/')) return path.slice(BASE_PATH.length);
  return path;
}
// --- FIM: base path helpers ---

// Flag para evitar dupla inicialização
let isBootstrapInitialized = false;

const translations = {
  pt: {
    solutions: "Soluções",
    solutionsTitle: {
      default: "Soluções",
      "/original/zOS": "Demo do CWS",
      "/original/SALDO": "Extrato de Saldos",
      "/original/EXTRATO": "Extrato Bancário"
    },
    home: "🏠 Home",
    propostas: "💼 Propostas",
    about: "📄 Sobre",
    contactNav: "📬 Contacte-nos",
    quemSomosHome: "Quem somos",
    quemSomosSobre: "Por que nos escolher",
    quemSomosTextHome: "A Maramajo é uma empresa de consultoria em Tecnologia da Informação criada em 2001, e que vem tendo uma contínua expansão devido ao reconhecimento de mercado aos seus princípios de profissionalismo, ética e busca incessante pela qualidade. Nossa empresa conta com profissionais altamente qualificados, de experiência comprovada e com sucesso no mercado de tecnologia da informação.",
    italico: "Observação: por favor, considere que esta demonstração processa em um laptop antigo, com Ubuntu 1.8 e Hercules como programa de canal. Portanto, a latência é bem maior do que se fosse em um Mainframe de 	verdade.",
    quemSomosTextSobre: 'A <span class="marca">Maramajo</span> cresceu ao longo 21 anos graças ao trabalho em equipe e à liderança de sua experiente equipe de gestão. <br><br> A continuidade da gestão contribuiu para relacionamentos duradouros e mutuamente benéficos com clientes e parceiros. <br><br>A experiência acumulada da equipe de Gestão da <span class="marca">Maramajo</span> nas áreas de desenvolvimento de produtos e execução de projetos a posiciona de forma única para entender as necessidades dos clientes e fornecer soluções superiores a preços competitivos.',
    solucoes: "Soluções inovadoras e econômicas",
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
    zosLink: "/original/zOS",
    saldoLink: "/original/SALDO",
    extratoLink: "/original/EXTRATO",
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
      "<strong>Equipes Mainframe</strong> pressionadas a adicionar Java “só porque”",
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
      "/original/zOE": "CWS Demo",
      "/original/SALDOEN": "Balance Statement",
      "/original/EXTRATOEN": "Bank statement"
    },
    home: "🏠 Home",
    propostas: "💼 Proposals",
    about: "📄 About",
    contactNav: "📬 Contact us",
    quemSomosHome: "About us",
    quemSomosSobre: "Why choose us",
    quemSomosTextHome: "Maramajo is an Information Technology consulting company founded in 2001, and has been continuously expanding thanks to market recognition of its principles of professionalism, ethics, and relentless pursuit of quality. Our company has highly qualified professionals with proven experience and market success.",
    italico: "Note: Please consider that this demo runs on an old laptop, with Ubuntu 1.8 and Hercules as the pipeline program. Therefore, the latency is much higher than if it were on a real Mainframe.",
    quemSomosTextSobre: 'A <span class="marca">Maramajo</span> has grown over 21 years thanks to the teamwork and leadership of its experienced management team. <br><br> This continuity of management has contributed to long-lasting and mutually beneficial relationships with customers and partners. <br><br>The accumulated experience of <span class="marca">Maramajo</span> management team in the areas of product development and project execution uniquely positions it to understand customer needs and provide superior solutions at competitive prices.',
    solucoes: "Innovative and economical solutions",
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
    propostasTxt: "Proposals",
    zosTxt: 'Visit our z/OS. Watch it "talk" directly to your browser by clicking the image below:',
    zosLink: "/original/zOE",
    saldoLink: "/original/SALDOEN",
    extratoLink: "/original/EXTRATOEN",
    mainTitle: "CWS",
    subTitle: "Middleware Simplification in Critical Systems",
    intro: "Eliminating unnecessary middleware layers for simpler, faster, and more secure enterprise architectures.",
    overviewTitle: "🔍 Overview",
    overviewText1: "In many enterprise environments — especially in banking, government, and large-scale retail — middleware frameworks like Java/Spring/Spring Boot are often introduced where they provide minimal value.",
    overviewQuote: "📊 “Less is more” when performance, reliability, and security already exist at the core.",
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
      "<strong>Mainframe teams</strong> under pressure to add Java \"just because\"",
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
      "/original/zOA": "CWS-Demo",
      "/original/SALDODE": "Bilanz",
      "/original/EXTRATODE": "Kontoauszug"
    },
    home: "🏠 Startseite",
    propostas: "💼 Vorschläge",
    about: "📄 Über uns",
    contactNav: "📬 Kontakt",
    quemSomosHome: "Wer wir sind",
    quemSomosSobre: "Warum uns wählen",
    quemSomosTextHome: "Maramajo ist ein IT-Beratungsunternehmen, das 2001 gegründet wurde und sich aufgrund der Marktanerkennung seiner Prinzipien von Professionalität, Ethik und dem unermüdlichen Streben nach Qualität kontinuierlich erweitert. Unser Unternehmen verfügt über hochqualifizierte Fachkräfte mit nachgewiesener Erfahrung und Markterfolg.",
    italico: "Hinweis: Bitte beachten Sie, dass diese Demo auf einem alten Laptop mit Ubuntu 1.8 und Hercules als Pipeline-Programm läuft. Daher ist die Latenz viel höher als auf einem echten Mainframe.",
    quemSomosTextSobre: 'A <span class="marca">Maramajo</span> ist in 21 Jahren dank der Teamarbeit und Führung seines erfahrenen Managementteams gewachsen. <br><br> Diese Kontinuität im Management hat zu langjährigen und für beide Seiten vorteilhaften Beziehungen mit Kunden und Partnern beigetragen. <br><br>Die gesammelte Erfahrung des <span class="marca">Maramajo</span>-Managementteams in den Bereichen Produktentwicklung und Projektabwicklung versetzt es in die einzigartige Lage, die Kundenbedürfnisse zu verstehen und erstklassige Lösungen zu wettbewerbsfähigen Preisen anzubieten.',
    solucoes: "Innovative und wirtschaftliche Lösungen",
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
    zosTxt: 'Besuchen Sie unser z/OS. Klicken Sie auf das Bild unten und sehen Sie, wie es direkt mit Ihrem Browser „kommuniziert“:',
    zosLink: "/original/zOA",
    saldoLink: "/original/SALDODE",
    extratoLink: "/original/EXTRATODE",
    mainTitle: "CWS",
    subTitle: "Middleware-Vereinfachung in kritischen Systemen",
    intro: "Beseitigung unnötiger Middleware-Schichten für einfachere, schnellere und sicherere Unternehmensarchitekturen.",
    overviewTitle: "🔍 Überblick",
    overviewText1: "In vielen Unternehmensumgebungen – insbesondere im Bankwesen, in der Regierung und im Einzelhandel – werden Middleware-Frameworks wie Java/Spring/Spring Boot oft eingeführt, obwohl sie nur geringen Mehrwert bieten.",
    overviewQuote: "📊 „Weniger ist mehr“, wenn Leistung, Zuverlässigkeit und Sicherheit bereits im Kern vorhanden sind.",
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
      "<strong>Mainframe-Teams</strong> unter Druck, Java „einfach so“ hinzuzufügen",
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
          <h3 id="files-title" class="section-header">${t.filesTitle}</h3>
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
 		  <div class="flex flex-wrap gap-2">
		    ${t.tagsList.map(tag =>
    `<span style="background:#ebf5ff; color:#1e3a8a; font-size:.875rem; padding:.25rem .5rem; border-radius:.375rem;">${tag}</span>`
  ).join(' ')}
		  </div>

		  </section>
      </div>
    `;
}

function renderSobre(lang) {
  const t = translations[lang] || translations['pt'];
  return `
      <div id="principal-home" lass="mx-auto px-4 py-8 max-w-4xl">
	  <div class="row">
        <div class="col-esq col-md-6">
          <h2 class="mb-0 ms-2 text-2xl md:text-3xl font-extrabold text-blue-600 titul1">${t.quemSomosSobre}</h2>
          <br>
          <p class="mt-2">${t.quemSomosTextSobre}</p>
        </div>
        <div class="col-esq col-md-6">
          <div class="d-flex align-items-center">
 <!--           <i class="cacho-uvas" style="font-size:48px;color:purple;"></i> -->
            <h2 id="solutions-title" class="mb-0 ms-2 text-2xl md:text-3xl font-extrabold  titul1">${t.solucoes}</h2>
          </div>
          <br>
          <ul class="mt-2">${t.solucoesListSobre.map(item => `<li>${item}</li>`).join('')}</ul>
        </div>
      </div>
	  </div>
	  
    `;
}

function renderContato(lang) {
  const t = translations[lang] || translations['pt'];
  return `
  <div class="container">
    <section>
      <h3 style="
        font-weight: 700 !important;
        font-size: 1.25rem !important;
        color: #1f2937 !important;
        margin-top: 2rem !important;
        margin-bottom: 1rem !important;
      ">
        ${t.contactTitle}
      </h3>

      <p class="text-base md:text-lg leading-relaxed">
        E-mail 
        <span style="
          font-size: 1.2rem;
          font-weight: bold;
          color: #0066ff;
        ">
          ${t.contactText}
        </span>
      </p>

      <p class="text-base md:text-lg leading-relaxed">
        Linkedin 
        <span style="
          font-size: 1.2rem;
          font-weight: bold;
          color: #0066ff;
        ">
          ${t.contactText1}
        </span>
      </p>

      <div style="
        text-align: center;
        font-size: 24px;
        color: #075e54;
        font-weight: bold;
      ">
        <table>
          <tr>
            <td>
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
                alt="WhatsApp Logo" 
                style="
                  width: 40px;
                  vertical-align: middle;
                  margin-right: 10px;
                "
              >
            </td>
            <td>
              <a href="https://wa.me/5511976533798" class="text-base hover:underline">
                +55 (11) 97653-3798
              </a>
            </td>
          </tr>
        </table>
      </div>
    </section>
  </div>
    `;
}

const routes = {
  '/original': renderHome,
  '/propostas': renderPropostas,
  '/sobre': renderSobre,
  '/contato': renderContato,
  '/original/zOS': () => '',
  '/original/zOE': () => '',
  '/original/zOA': () => '',
  '/original/SALDO': () => '',
  '/original/SALDOEN': () => '',
  '/original/SALDODE': () => '',
  '/original/EXTRATO': () => '',
  '/original/EXTRATOEN': () => '',
  '/original/EXTRATODE': () => ''
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
  console.log("endpoint1:" + endpoint);
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
    const fullEndpoint = addBasePath(endpoint); // Garante /original/xxx
    console.log('Buscando conteúdo para:', fullEndpoint);
    const response = await fetch(`http://maramajo.ddns.net:32000${fullEndpoint}`, {
      method: method,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept': 'text/html'
      },
      body: body ? new URLSearchParams(body).toString() : null
    });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const text = await response.text();
    if (['/original/zOS', '/original/zOE', '/original/zOA', '/original/SALDO', '/original/SALDOEN', '/original/SALDODE', '/original/EXTRATO', '/original/EXTRATOEN', '/original/EXTRATODE'].includes(fullEndpoint)) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'text/html');
      const targetDiv = doc.querySelector('div.vazia');
      console.log('TargetDiv encontrado:', targetDiv ? targetDiv.outerHTML : 'NÃO ENCONTROU');
      contentDiv.innerHTML = targetDiv ? targetDiv.outerHTML : text;
      // Atualizar solutions-title existente
      let solutionsTitle = document.querySelector('#solutions-title');
      if (solutionsTitle) {
        solutionsTitle.textContent = t.solutionsTitle[fullEndpoint] || t.solutionsTitle.default;
        solutionsTitle.className = 'mb-0 ms-2 text-2xl md:text-3xl font-extrabold titulo';
      } else {
        console.warn('Elemento #solutions-title não encontrado no conteúdo retornado para:', fullEndpoint);
        const dFlexDiv = document.querySelector('.d-flex.align-items-center');
        if (dFlexDiv) {
          solutionsTitle = document.createElement('h2');
          solutionsTitle.id = 'solutions-title';
          solutionsTitle.className = 'mb-0 ms-2 text-2xl md:text-3xl font-extrabold titulo';
          solutionsTitle.textContent = t.solutionsTitle[fullEndpoint] || t.solutionsTitle.default;
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

function updateDoctemplate(lang) {
  const t = translations[lang] || translations['pt'];
  const langDropdown = document.getElementById('langDropdown');
  if (langDropdown) {
    const flag = lang === 'en' ? 'us' : lang === 'de' ? 'de' : 'br';
    const label = lang === 'en' ? 'US | EN' : lang === 'de' ? 'Germany | DE' : 'Brasil | PT';
    langDropdown.innerHTML = `<img src="https://flagcdn.com/w20/${flag}.png" class="flag-icon" alt="${flag.toUpperCase()}"> ${label}`;
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
  const routeFunction = routes[path] || routes['/original'];
  try {
    contentDiv.innerHTML = routeFunction(lang);

    const filesTitleEl = document.getElementById('files-title');
    if (filesTitleEl) {
      // Depois de contentDiv.innerHTML = routeFunction(lang);
      document.querySelectorAll('.section-header').forEach(el => {
        // Remove classes do Tailwind que alteram tamanho e peso
        el.classList.remove('text-base', 'text-lg', 'md:text-lg', 'md:text-xl', 'text-xl', 'md:text-2xl', 'font-semibold', 'font-extrabold');

        // Força estilos desejados
        el.style.fontSize = '1.25rem';
        el.style.fontWeight = '700';
        el.style.color = '#1f2937';
      });
      //		initializeBootstrap();
    }
    //	const filesTitleEl = document.getElementById('files-title');
    //	  if (filesTitleEl) {
    //	    filesTitleEl.innerHTML = translations[lang]?.filesTitle || translations['pt'].filesTitle;
    //		console.log("FILESTITLE EL "+filesTitleEl);
    //	  }
    console.log(document);
  } catch (err) {
    console.error('Erro ao renderizar rota:', err);
    contentDiv.innerHTML = `<div class="error">Erro ao renderizar conteúdo.</div>`;
  }
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
    solutionsTitle.className = 'mb-0 ms-2 text-2xl md:text-3xl font-extrabold  titulo';
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
  const langDropdown = document.getElementById('langDropdown');
  if (langDropdown) {
    const flag = lang === 'en' ? 'us' : lang === 'de' ? 'de' : 'br';
    const label = lang === 'en' ? 'US | EN' : lang === 'de' ? 'Germany | DE' : 'Brasil | PT';
    langDropdown.innerHTML = `<img src="https://flagcdn.com/w20/${flag}.png" class="flag-icon" alt="${flag.toUpperCase()}"> ${label}`;
  }
}

function changeLang(lang) {
  console.log('changeLang chamado com idioma:', lang);
  localStorage.setItem('lang', lang);
  const t = translations[lang] || translations['pt'];
  const rawPath = window.location.pathname || '/';
  const routeKey = stripBasePath(rawPath);
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
  if (endpointMap[routeKey]) {
    const endpoint = endpointMap[routeKey];
    console.log('Mudando para endpoint1:', endpoint);
    history.pushState(null, null, endpoint);
    fetchContent(endpoint);
  } else {
    renderContent(routeKey, lang);
  }
}

function setActiveLink() {
  const navLinks = document.querySelectorAll('.nav-link');
  if (!navLinks.length) return;
  const currentPath = stripBasePath(window.location.pathname || '/');
  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href') || '/';
    if (href === currentPath || addBasePath(href) === window.location.pathname) {
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
  document.querySelectorAll('a[href="/original/zOS"], a[href="/original/zOE"], a[href="/original/zOA"], a[href="/original/SALDO"], a[href="/original/SALDOEN"], a[href="/original/SALDODE"], a[href="/original/EXTRATO"], a[href="/original/EXTRATOEN"], a[href="/original/EXTRATODE"]').forEach(link => {
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
  const publicUrl = addBasePath(targetPath);
  history.pushState(null, null, publicUrl);
  const routeKey = stripBasePath(publicUrl);
  renderContent(routeKey, localStorage.getItem('lang') || 'pt');
}

function endpointLinkHandler(event) {
  event.preventDefault();
  const link = event.target.closest('a');
  const endpoint = link.getAttribute('data-route') || link.getAttribute('href');
  if (!endpoint || endpoint === '#' || endpoint === '/#') {
    console.error('Endpoint inválido no clique:', endpoint);
    return;
  }
  const fullEndpoint = addBasePath(endpoint); // Garante /original/xxx
  console.log('Endpoint clicado1:', fullEndpoint);
  history.pushState(null, null, fullEndpoint);
  fetchContent(fullEndpoint);
}

function dropdownItemHandler(event) {
  event.preventDefault();
  const lang = event.target.closest('a').getAttribute('data-lang');
  console.log('Dropdown item clicado:', lang);
  changeLang(lang);
  // Forçar fechamento do dropdown após seleção de idioma
  const dropdownToggle = document.getElementById('langDropdown');
  if (dropdownToggle) {
    const instance = bootstrap.Dropdown.getInstance(dropdownToggle);
    if (instance) {
      instance.hide();
    }
  }
}

function formHandler(event) {
  const form = event.target;
  const endpoint = form.action ? form.action.replace('http://maramajo.ddns.net:32000', '') : '';
  if (['/original/SALDO', '/original/SALDOEN', '/original/SALDODE', '/original/EXTRATO', '/original/EXTRATOEN', '/original/EXTRATODE'].includes(endpoint)) {
    event.preventDefault();
    const formData = new FormData(form);
    const body = Object.fromEntries(formData);
    const fullEndpoint = addBasePath(endpoint); // Garante /original/xxx
    console.log('Formulário enviado para:', fullEndpoint, body);
    history.pushState(null, null, fullEndpoint);
    fetchContent(fullEndpoint, 'POST', body);
  }
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
  const fullEndpoint = addBasePath(endpoint); // Garante /original/xxx
  console.log('Envia chamado para:', fullEndpoint, body);
  history.pushState(null, null, fullEndpoint);
  fetchContent(fullEndpoint, 'POST', body);
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
  const rawPath = window.location.pathname || '/';
  let pathForRender;
  if (rawPath === '/') {
    history.replaceState(null, null, BASE_PATH);
    pathForRender = BASE_PATH;
  } else {
    pathForRender = rawPath;
  }
  initializeBootstrap().then(() => {
    console.log('Bootstrap inicializado, renderizando conteúdo para:', rawPath);
    if (['/original/zOS', '/original/zOE', '/original/zOA', '/original/SALDO', '/original/SALDOEN', '/original/SALDODE', '/original/EXTRATO', '/original/EXTRATOEN', '/original/EXTRATODE'].includes(pathForRender)) {
      console.log("pathForRender1:" + pathForRender),
        fetchContent(pathForRender);
    } else {
      renderContent(stripBasePath(pathForRender), savedLang);
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
  const rawPath = window.location.pathname || '/';
  let pathForRender;
  if (rawPath === '/') {
    history.replaceState(null, null, BASE_PATH);
    pathForRender = BASE_PATH;
  } else {
    pathForRender = rawPath;
  }
  initializeBootstrap().then(() => {
    console.log('Bootstrap inicializado, renderizando conteúdo para:', rawPath);
    if (['/original/zOS', '/original/zOE', '/original/zOA', '/original/SALDO', '/original/SALDOEN', '/original/SALDODE', '/original/EXTRATO', '/original/EXTRATOEN', '/original/EXTRATODE'].includes(pathForRender)) {
      fetchContent(pathForRender);
    } else {
      renderContent(stripBasePath(pathForRender), localStorage.getItem('lang') || 'pt');
    }
    reattachEventListeners();
  }).catch(error => {
    console.error('Erro ao inicializar Bootstrap no popstate:', error);
  });
});