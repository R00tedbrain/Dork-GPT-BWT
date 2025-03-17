(function() {
  // ======================================================
  // Datos: Categorías y MUCHOS patrones (usando "example" como token)
  // ======================================================
  const categories = [
    {
      name: "Eventos y conferencias",
      patterns: [
        'intext:"example" site:eventbrite.com',
        'intext:"example" site:meetup.com',
        'intext:"example" intitle:"conference"',
        'intext:"example" intitle:"webinar"',
        'intext:"example" intitle:"exhibition"',
        'intext:"example" intitle:"seminar"',
        'intext:"example" intitle:"workshop"',
        'intext:"example" intitle:"summit"',
        'intext:"example" intitle:"trade show"',
        'intext:"example" intitle:"convention"',
        // combos más avanzados:
        'intext:"example" (intitle:"ponencia" OR intitle:"ponencias")',
        'intitle:"agenda" "example" intext:"evento" -site:gov',
        'intext:"evento" inurl:"calendar" "example"',
        'intext:"programa del evento" "example" filetype:pdf',
        'intext:"próximas conferencias" + "example" + "fecha"',
        'intitle:"próximos eventos" "example" -site:facebook.com',
        'inurl:"/events" (intitle:"example" OR intext:"example") -github',
        'intext:"inscripción" "example" inurl:"/register"',
        '(intitle:"memorias" OR intext:"memorias del evento") "example" filetype:doc'
      ]
    },
    {
      name: "Información de dominio y hosting",
      patterns: [
        'site:whois.com intext:"example"',
        'site:domaintools.com intext:"example"',
        'intext:"example" site:hostgator.com',
        'intext:"example" site:bluehost.com',
        'intext:"example" site:godaddy.com',
        'intext:"example" site:namecheap.com',
        'intext:"example" site:siteground.com',
        'intext:"example" site:dreamhost.com',
        'intext:"example" site:ipage.com',
        'intext:"example" site:1and1.com',
        // combos más avanzados:
        'inurl:whois "example" -site:whois.com filetype:html',
        '(intext:"registrant" OR intext:"tech-c") "example" filetype:pdf',
        'intitle:"Domain History" "example" inurl:domainhistory',
        'intext:"domain is for sale" "example" -site:sedo.com',
        '("DNS lookup" OR "IP lookup") "example"',
        'intext:"example" "domain parked" -site:sedo.com',
        'inintitle:"DNS records" "example" filetype:txt',
        'inurl:"/reverse-whois/" "example" -site:domaintools.com'
      ]
    },
    {
      name: "Seguridad",
      patterns: [
        'intitle:"index of" +passwd',
        'inurl:admin +intext:"login"',
        'inurl:"phpinfo.php"',
        'intitle:"WebcamXP 5"',
        'inurl:"robots.txt"',
        'inurl:"htaccess"',
        'intext:"vulnerable"',
        'intext:"exploit"',
        'inurl:"cgi-bin"',
        'intext:"SQL injection"',
        // combos más avanzados:
        'intitle:"admin panel" intext:"example" -github',
        'intitle:"login" "example" ("Username"|"Contraseña")',
        'intitle:"dashboard" inurl:admin "example"',
        'inurl:"shell.asp" OR inurl:"shell.php" "example"',
        '(intext:"index of /" OR intitle:"index of /") "config" "example"',
        '(intitle:"security camera" OR intitle:"CCTV") "example" inurl:axis-cgi',
        'inurl:"server-status" "Apache Status" "example"',
        'intext:"NAS login" "example" intitle:"Synology"'
      ]
    },
    {
      name: "Información sensible",
      patterns: [
        'intext:"confidential"',
        'inurl:"backup"',
        'intext:"credit card"',
        'intext:"password"',
        'inurl:"database.sql"',
        'intext:"personal information"',
        'intext:"social security number"',
        'intext:"bank account"',
        'intext:"medical records"',
        'intext:"sensitive data"',
        // combos más avanzados:
        'intitle:"index of" "credentials" + "example"',
        'filetype:xlsx "example" "internal use only"',
        'intext:"exported database" "example" filetype:sql',
        'intext:"ID card" | "DNI" "example" -site:gov',
        'intext:"private_key" OR intext:"BEGIN RSA PRIVATE KEY" "example"',
        'intext:"leaked data" "example" filetype:txt -site:pastebin.com',
        'intext:"example" "passport number" -site:gov',
        'inurl:"/backup.zip" intext:"example"'
      ]
    },
    {
      name: "Vulnerabilidades",
      patterns: [
        'inurl:"vulnerabilities"',
        'intext:"exploit"',
        'intitle:"SQL Injection"',
        'inurl:"cgi-bin"',
        'filetype:php',
        'intext:"cross-site scripting"',
        'intext:"remote code execution"',
        'intext:"buffer overflow"',
        'intext:"directory traversal"',
        'intext:"command injection"',
        // combos más avanzados:
        '(intext:"bug bounty" OR intext:"recompensa") "example"',
        '(intitle:"proof of concept" OR intitle:"POC") "example"',
        'intext:"responsible disclosure" "example"',
        'inurl:"/wp-content/plugins" intext:"vulnerable" "example"',
        'intext:"exploit-db" "example" filetype:txt',
        'intitle:"vulnerability" "example" inurl:"github.com"',
        'intext:"public exploit" "example" -cve.mitre.org',
        'filetype:md "example" (intext:"vulnerability" OR intext:"exploit")'
      ]
    },
    {
      name: "Archivos específicos",
      patterns: [
        'filetype:doc',
        'filetype:xls',
        'filetype:ppt',
        'filetype:txt',
        'filetype:zip',
        'filetype:pdf',
        'filetype:csv',
        'filetype:xml',
        'filetype:json',
        'filetype:log',
        // combos más avanzados:
        'filetype:docx "example" intitle:"report"',
        'filetype:xlsx "example" intext:"datos" -site:docs.google.com',
        'filetype:pptx "example" intitle:"presentación"',
        'filetype:mp4 "example" -site:youtube.com',
        'filetype:sql "example" -gist.github.com',
        'filetype:json "example" (intitle:"api" OR intext:"api key")',
        'filetype:log "example" inurl:"/logs/"',
        'filetype:js "example" intext:"apiKey"'
      ]
    },
    {
      name: "Software específico",
      patterns: [
        'intitle:"Joomla"',
        'intext:"WordPress"',
        'inurl:"wp-admin"',
        'intitle:"Drupal"',
        'intext:"Magento"',
        'intext:"Shopify"',
        'intext:"Wix"',
        'intext:"Squarespace"',
        'intext:"Ghost"',
        'intext:"PrestaShop"',
        // combos más avanzados:
        'inurl:"wp-content/plugins" "example" intitle:"index of"',
        'intext:"powered by Joomla" "example" -site:joomla.org',
        'intext:"powered by Drupal" "example" filetype:pdf',
        'inurl:"/app/etc/local.xml" "example" intext:"Magento"',
        'intext:"maintenance mode" "example" inurl:"/shop"',
        'inurl:"/wp-admin" intitle:"login" "example"',
        'intitle:"woocommerce" "example" "product"',
        'intext:"shopify" "example" filetype:pdf'
      ]
    },
    {
      name: "Información de servidores",
      patterns: [
        'intitle:"Server Status"',
        'intext:"Apache"',
        'intext:"nginx"',
        'inurl:"server-info"',
        'intext:"IIS"',
        'intext:"Tomcat"',
        'intext:"Lighttpd"',
        'intext:"Jetty"',
        'intext:"GlassFish"',
        'intext:"Node.js"',
        // combos más avanzados:
        'intitle:"Apache Status" "example" -site:apache.org',
        'intext:"server at" "example" filetype:log',
        'intitle:"Index of /" "logs" "example" -github',
        'inurl:"/server-status" intext:"Total accesses" "example"',
        'intitle:"Status" "HAProxy Statistics" "example"',
        'intitle:"nginx status" "example" intext:"Active connections"',
        'intext:"PHP Version" "example" inurl:"/info.php"',
        'intext:"Directory listing for /" "example" inurl:"cgi-bin"'
      ]
    },
    {
      name: "Redes y comunicaciones",
      patterns: [
        'intext:"IP address"',
        'intext:"subnet mask"',
        'intext:"DNS server"',
        'intext:"router"',
        'intext:"firewall"',
        'intext:"VPN"',
        'intext:"proxy server"',
        'intext:"network topology"',
        'intext:"network security"',
        'intext:"Wi-Fi"',
        // combos más avanzados:
        'intext:"SSID" "example" filetype:pdf',
        '(intitle:"VPN configuration" OR intext:"VPN config") "example"',
        'inurl:"/vpn/" "example" -site:cisco.com',
        'intitle:"Proxy List" "example" filetype:txt',
        'intext:"allowed subnets" "example" "ACL"',
        'intext:"example" (intitle:"open ports" OR intext:"open ports")',
        'filetype:pcap "example" -github -gitlab',
        '(intext:"Topología de red" OR intext:"Network Diagram") "example" filetype:png'
      ]
    },
    {
      name: "Tecnología y desarrollo",
      patterns: [
        'intext:"API"',
        'intext:"SDK"',
        'intext:"source code"',
        'intext:"software development"',
        'intext:"programming language"',
        'intext:"algorithm"',
        'intext:"machine learning"',
        'intext:"artificial intelligence"',
        'intext:"big data"',
        'intext:"cloud computing"',
        // combos más avanzados:
        'intitle:"API Reference" "example" -site:developer.mozilla.org',
        'intext:"example" "github" inurl:"/blob/" filetype:py',
        '(intitle:"documentation" OR intext:"documentation") "example" "sdk"',
        'inurl:"/tutorials/" intext:"example" "programming"',
        'intext:"microservices architecture" "example" filetype:ppt',
        'intext:"example" (intitle:"code snippet" OR intext:"code snippet")',
        'intitle:"release notes" "example" -site:microsoft.com',
        '(intext:"machine learning model" OR intext:"dataset") "example" filetype:csv'
      ]
    },
    {
      name: "Gobierno y regulaciones",
      patterns: [
        'intext:"government contract"',
        'intext:"public procurement"',
        'intext:"regulatory compliance"',
        'intext:"legislation"',
        'intext:"policy"',
        'intext:"government agency"',
        'intext:"public records"',
        'intext:"freedom of information"',
        'intext:"regulatory body"',
        'intext:"government report"',
        // combos más avanzados:
        'site:boe.es intext:"example" filetype:pdf',
        'site:legifrance.gouv.fr "example" -site:vie-publique.fr',
        'intitle:"public records" "example" inurl:.gov',
        'intext:"resolución" "example" filetype:doc',
        'intext:"sanción" "example" inurl:"resoluciones"',
        '(intext:"policy update" OR intext:"nueva política") "example"',
        'site:.gov "example" intitle:"bill" filetype:pdf',
        'intext:"LICITACIÓN" "example" filetype:pdf'
      ]
    },
    {
      name: "Educación y investigación",
      patterns: [
        'intext:"research paper"',
        'intext:"thesis"',
        'intext:"dissertation"',
        'intext:"academic journal"',
        'intext:"scholarly article"',
        'intext:"university"',
        'intext:"college"',
        'intext:"educational institution"',
        'intext:"research grant"',
        'intext:"academic conference"',
        // combos más avanzados:
        'intitle:"tesis" "example" filetype:pdf -site:scribd.com',
        'intext:"abstract" "introduction" "example" filetype:docx',
        'inurl:"/publications" intext:"example" intitle:"journal"',
        'site:academia.edu "example" -inurl:login',
        '(intext:"bibliografía" OR intext:"referencias") "example" filetype:pdf',
        'intitle:"paper accepted" "example" -site:ieee.org',
        'filetype:ppt (intitle:"congreso" OR intext:"congreso") "example"',
        'intext:"unpublished results" "example" filetype:pdf'
      ]
    },
    {
      name: "Noticias y prensa",
      patterns: [
        'site:example.com intitle:"press release"',
        'site:example.com intitle:"news"',
        'intext:"example" site:bloomberg.com',
        'intext:"example" site:reuters.com',
        'intext:"example" site:wsj.com',
        'intext:"example" site:cnbc.com',
        'intext:"example" site:forbes.com',
        'intext:"example" site:fortune.com',
        'intext:"example" site:marketwatch.com',
        'intext:"example" site:financialtimes.com',
        // combos más avanzados:
        '(intitle:"Breaking News" OR intitle:"Última hora") "example"',
        'intext:"example" "nota de prensa" filetype:pdf',
        'site:elpais.com "example" -inurl:video',
        'site:nytimes.com intext:"example" "article" -subscribe',
        'intitle:"exclusiva" "example" -site:facebook.com',
        'intext:"fue publicado" "example" (intitle:"noticia" OR intext:"noticia")',
        'filetype:pdf "example" intext:"official statement"',
        'intitle:"portada" "example" site:elmundo.es'
      ]
    },
    {
      name: "Patentes y propiedad intelectual",
      patterns: [
        'intext:"patent" example',
        'intext:"trademark" example',
        'intext:"copyright" example',
        'site:uspto.gov intext:"example"',
        'site:wipo.int intext:"example"',
        'intext:"intellectual property" example',
        'intext:"patent application" example',
        'intext:"trademark registration" example',
        'intext:"copyright infringement" example',
        'intext:"patent litigation" example',
        // combos más avanzados:
        'intitle:"patent" inurl:"pdf" "example" -site:wipo.int',
        'filetype:pdf "example" intext:"licensing agreement"',
        'inurl:"/patents/" intext:"example" -github',
        'intext:"cease and desist" "example" filetype:doc',
        'intext:"technology transfer" "example" intitle:"portfolio"',
        'intext:"IP ownership" "example" filetype:xlsx',
        'site:patents.google.com "example"',
        '(intitle:"invalidation" OR intext:"invalidar") "patente" "example"'
      ]
    },
    {
      name: "Redes sociales y presencia en línea",
      patterns: [
        'site:youtube.com inurl:watch "example"',
        'site:instagram.com inurl:p "example"',
        'site:pinterest.com inurl:pin "example"',
        'site:tiktok.com inurl:video "example"',
        'site:quora.com intext:"example"',
        'site:reddit.com intext:"example"',
        'site:tumblr.com intext:"example"',
        'site:snapchat.com intext:"example"',
        'site:telegram.org intext:"example"',
        'site:discord.com intext:"example"',
        // combos más avanzados:
        'intitle:"twitter.com" "example" -site:twitter.com',
        'intitle:"facebook.com" "example" -site:facebook.com',
        '("profile" OR "bio") "example" site:instagram.com',
        'site:linkedin.com inurl:"/posts/" "example"',
        'intext:"joined on" "example" site:reddit.com',
        'site:mastodon.social "example" intitle:"@example"',
        '(intext:"example" OR intitle:"example") site:vk.com',
        'intext:"example" "public group" inurl:"facebook.com/groups/"'
      ]
    },
    {
      name: "Información corporativa",
      patterns: [
        'site:example.com intitle:"about us"',
        'site:example.com intitle:"contact us"',
        'site:example.com intext:"mission statement"',
        'site:example.com intext:"vision statement"',
        'site:example.com intext:"company history"',
        // combos más avanzados:
        'site:example.com "quiénes somos" -blog',
        'site:example.com ("board of directors" OR "directiva")',
        'intext:"nuestra historia" "example" filetype:pdf',
        'site:example.com intext:"valores corporativos"',
        'site:example.com "annual meeting" "example"',
        'intext:"organizational chart" "example" filetype:xlsx',
        'site:example.com "memoria corporativa" filetype:pdf',
        '(intext:"sede principal" OR intext:"headquarters") "example"'
      ]
    },
    {
      name: "Perfiles de empleados",
      patterns: [
        'site:linkedin.com inurl:pub "employee at example"',
        'site:twitter.com inurl:status "works at example"',
        'site:facebook.com inurl:profile "works at example"',
        'site:xing.com inurl:profile "employee at example"',
        'site:glassdoor.com intext:"example"',
        // combos más avanzados:
        'intext:"people also viewed" "example" site:linkedin.com',
        '"hired by example" OR "joined example" -job -jobs -careers',
        'intitle:"team" intext:"example" filetype:ppt',
        'site:indeed.com "example" intext:"employee reviews"',
        'intext:"our staff" "example" inurl:"/team/"',
        'inurl:"/employees" intitle:"example" -blog',
        'site:example.com "current openings" "example" -blog',
        'intext:"Colleague at example" "example" -site:linkedin.com'
      ]
    },
    {
      name: "Productos y servicios",
      patterns: [
        'site:example.com intitle:"products"',
        'site:example.com intitle:"services"',
        'site:example.com intext:"product catalog"',
        'site:example.com intext:"service catalog"',
        'site:example.com intext:"pricing"',
        // combos más avanzados:
        'site:example.com "nuestros productos" -blog',
        'site:example.com inurl:"/pricing" "example"',
        'intitle:"tarifas" "example" filetype:pdf',
        'intext:"características principales" "example" -review',
        'intext:"comparativa" "example" inurl:"/productos/"',
        'intext:"este servicio incluye" "example" site:example.com',
        'site:example.com intext:"lista de precios" filetype:xlsx',
        '(intitle:"oferta" OR intext:"oferta") "example" site:example.com'
      ]
    },
    {
      name: "Análisis de competencia",
      patterns: [
        'intitle:"competitor analysis" example',
        'intext:"market share" example',
        'intext:"SWOT analysis" example',
        'intext:"benchmarking" example',
        'intext:"competitive landscape" example',
        // combos más avanzados:
        'intext:"competidores" "example" filetype:ppt',
        '(intitle:"market research" OR intext:"market research") "example"',
        'intext:"pricing strategy" "example" filetype:pdf',
        'intitle:"comparativa de precios" "example" -blog',
        '(intext:"análisis de la competencia" OR "competitive advantage") "example"',
        'intext:"análisis DAFO" "example" filetype:doc',
        'site:example.com intext:"benchmark" -blog',
        'intitle:"Comparación de mercado" "example" filetype:xlsx'
      ]
    },
    {
      name: "Información financiera",
      patterns: [
        'site:example.com intext:"annual report"',
        'site:example.com intext:"financial statements"',
        'site:example.com intext:"quarterly earnings"',
        'site:example.com intext:"investor relations"',
        'site:example.com intext:"SEC filings"',
        // combos más avanzados:
        'site:example.com "balance sheet" filetype:xls',
        'site:example.com intitle:"informe anual" "example"',
        'intext:"estado de resultados" "example" filetype:pdf',
        'site:example.com intext:"memoria económica" -blog',
        'site:example.com "earnings call" "example"',
        'site:example.com "cash flow" "example" filetype:csv',
        'intext:"Financial Performance" "example" -blog',
        'intitle:"quarterly statement" "example" filetype:pdf'
      ]
    },
    // Nueva categoría: "Organizaciones sin ánimo de lucro" (ejemplo)
    {
      name: "Organizaciones sin ánimo de lucro",
      patterns: [
        'site:.org intext:"donar" "example"',
        'intitle:"fundación" "example" -site:fundacionexample.org',
        'intext:"haz tu aportación" "example" filetype:pdf',
        '(intext:"donar para" OR intext:"haz una donación") "example"',
        'site:give.org intext:"example"',
        'intext:"organización sin fines de lucro" "example" intitle:"contribuir"',
        '(intitle:"ONG" OR intext:"ONG") "example" -site:wikipedia.org',
        'inurl:"/donate" "example" -site:paypal.com',
        'intext:"transparencia" "example" filetype:doc',
        '(intext:"donaciones" OR intext:"colabora") "example" site:.org'
      ]
    },
    // Otra categoría nueva: "Blogs y artículos relacionados"
    {
      name: "Blogs y artículos relacionados",
      patterns: [
        'inurl:blog "example" -site:blogger.com -site:wordpress.com',
        'intitle:"blog" intext:"example" -site:medium.com',
        '(intext:"publicado por" OR intext:"posted by") "example" intitle:"blog"',
        'site:medium.com "example" -inurl:"/tag/"',
        '(intitle:"Top 10" OR intitle:"mejores 10") "blogs" "example"',
        'inurl:"/category/" "example" intitle:"blog"',
        'intext:"guest post" "example" -site:guestposttracker.com',
        'intext:"artículo patrocinado" "example" "blog"'
      ]
    }
  ];

  // ======================================================
  // Funciones utilitarias
  // ======================================================
  function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // ======================================================
  // Generar un dork
  // (reemplaza 'example' por customKeyword)
  // ======================================================
  function generateDork(customKeyword = "", categoryName = "") {
    let selectedCategory;
    if (categoryName) {
      selectedCategory = categories.find(cat => cat.name === categoryName);
    }
    if (!selectedCategory) {
      selectedCategory = getRandomElement(categories);
    }
    let pattern = getRandomElement(selectedCategory.patterns);
    if (customKeyword.trim() !== "") {
      const regex = new RegExp("example", "gi");
      pattern = pattern.replace(regex, customKeyword.trim());
    }
    return {
      dork: pattern,
      category: selectedCategory.name
    };
  }

  // ======================================================
  // Generar múltiples dorks
  // ======================================================
  function generateMultipleDorks(customKeyword = "", categoryName = "", count = 5) {
    const results = [];
    for (let i = 0; i < count; i++) {
      results.push(generateDork(customKeyword, categoryName));
    }
    return results;
  }

  // ======================================================
  // Manejo de la interfaz y eventos
  // ======================================================
  document.addEventListener("DOMContentLoaded", () => {
    const generateBtn = document.getElementById("generateBtn");
    const customKeywordInput = document.getElementById("customKeyword");
    const resultDiv = document.getElementById("result");
    const historyDiv = document.getElementById("history");
    const copyBtn = document.getElementById("copyBtn");
    const categorySelect = document.getElementById("categorySelect");

    // Poblar el select de categoría
    if (categorySelect) {
      categorySelect.innerHTML = "";
      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.text = "Todas las categorías";
      categorySelect.appendChild(defaultOption);

      categories.forEach(cat => {
        const option = document.createElement("option");
        option.value = cat.name;
        option.text = cat.name;
        categorySelect.appendChild(option);
      });
    }

    let dorkHistory = [];

    // Evento para generar dorks
    generateBtn.addEventListener("click", () => {
      const customKeyword = customKeywordInput.value;
      const selectedCategory = categorySelect ? categorySelect.value : "";

      // =========================
      // CAMBIO DE 5 A 10 AQUÍ:
      // =========================
      const generatedDorks = generateMultipleDorks(customKeyword, selectedCategory, 10);

      resultDiv.innerHTML = "";
      generatedDorks.forEach(item => {
        const p = document.createElement("p");
        p.textContent = `[${item.category}] ${item.dork}`;
        resultDiv.appendChild(p);
      });

      // Actualiza historial
      dorkHistory = generatedDorks.concat(dorkHistory);
      if (historyDiv) {
        historyDiv.innerHTML = "";
        dorkHistory.forEach(item => {
          const p = document.createElement("p");
          p.textContent = `[${item.category}] ${item.dork}`;
          historyDiv.appendChild(p);
        });
      }
    });

    // Evento para copiar dorks
    if (copyBtn) {
      copyBtn.addEventListener("click", () => {
        let textToCopy = "";
        const paragraphs = resultDiv.getElementsByTagName("p");
        for (let p of paragraphs) {
          textToCopy += p.textContent + "\n";
        }
        navigator.clipboard.writeText(textToCopy)
          .then(() => alert("¡Dorks copiados al portapapeles!"))
          .catch(err => alert("Error al copiar: " + err));
      });
    }

    // Cada vez que cambie la categoría, generamos directamente
    if (categorySelect) {
      categorySelect.addEventListener("change", () => {
        generateBtn.click();
      });
    }
  });
})();
