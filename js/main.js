(function() {
  // ======================================================
  // Datos: Categorías y patrones (usando "example" como token)
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
        'intext:"example" intitle:"convention"'
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
        'intext:"example" site:1and1.com'
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
        'intext:"SQL injection"'
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
        'intext:"sensitive data"'
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
        'intext:"command injection"'
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
        'filetype:log'
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
        'intext:"PrestaShop"'
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
        'intext:"Node.js"'
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
        'intext:"Wi-Fi"'
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
        'intext:"cloud computing"'
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
        'intext:"government report"'
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
        'intext:"academic conference"'
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
        'intext:"example" site:financialtimes.com'
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
        'intext:"patent litigation" example'
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
        'site:discord.com intext:"example"'
      ]
    },
    {
      name: "Información corporativa",
      patterns: [
        'site:example.com intitle:"about us"',
        'site:example.com intitle:"contact us"',
        'site:example.com intext:"mission statement"',
        'site:example.com intext:"vision statement"',
        'site:example.com intext:"company history"'
      ]
    },
    {
      name: "Perfiles de empleados",
      patterns: [
        'site:linkedin.com inurl:pub "employee at example"',
        'site:twitter.com inurl:status "works at example"',
        'site:facebook.com inurl:profile "works at example"',
        'site:xing.com inurl:profile "employee at example"',
        'site:glassdoor.com intext:"example"'
      ]
    },
    {
      name: "Productos y servicios",
      patterns: [
        'site:example.com intitle:"products"',
        'site:example.com intitle:"services"',
        'site:example.com intext:"product catalog"',
        'site:example.com intext:"service catalog"',
        'site:example.com intext:"pricing"'
      ]
    },
    {
      name: "Análisis de competencia",
      patterns: [
        'intitle:"competitor analysis" example',
        'intext:"market share" example',
        'intext:"SWOT analysis" example',
        'intext:"benchmarking" example',
        'intext:"competitive landscape" example'
      ]
    },
    {
      name: "Información financiera",
      patterns: [
        'site:example.com intext:"annual report"',
        'site:example.com intext:"financial statements"',
        'site:example.com intext:"quarterly earnings"',
        'site:example.com intext:"investor relations"',
        'site:example.com intext:"SEC filings"'
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
  // Función para generar un dork
  // customKeyword: reemplaza el token "example" en el patrón.
  // categoryName: si se especifica, se usará la categoría indicada; de lo contrario, se elige una aleatoria.
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
      pattern = pattern.replace(/example/gi, customKeyword.trim());
    }
    return {
      dork: pattern,
      category: selectedCategory.name
    };
  }

  // ======================================================
  // Función para generar múltiples dorks
  // ======================================================
  function generateMultipleDorks(customKeyword = "", categoryName = "", count = 5) {
    const results = [];
    for (let i = 0; i < count; i++) {
      results.push(generateDork(customKeyword, categoryName));
    }
    return results;
  }

  // ======================================================
  // Manejo de la interfaz (UI) y eventos
  // ======================================================
  document.addEventListener("DOMContentLoaded", () => {
    const generateBtn = document.getElementById("generateBtn");
    const customKeywordInput = document.getElementById("customKeyword");
    const resultDiv = document.getElementById("result");
    const historyDiv = document.getElementById("history");
    const copyBtn = document.getElementById("copyBtn");
    const categorySelect = document.getElementById("categorySelect");

    // Si existe el select de categoría, lo poblamos
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
      const generatedDorks = generateMultipleDorks(customKeyword, selectedCategory, 5);

      resultDiv.innerHTML = "";
      generatedDorks.forEach(item => {
        const p = document.createElement("p");
        p.textContent = `[${item.category}] ${item.dork}`;
        resultDiv.appendChild(p);
      });

      // Actualiza el historial (nuevos dorks se agregan al inicio)
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

    // Evento para copiar los dorks generados al portapapeles
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

    // Dispara la generación cada vez que se cambia la categoría (opcional)
    if (categorySelect) {
      categorySelect.addEventListener("change", () => {
        generateBtn.click();
      });
    }
  });
})();
