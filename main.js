(function() {
  // =========================
  // Bases de datos internas
  // =========================

  // Operadores para búsquedas
  const operators = [
    "inurl:",
    "intitle:",
    "intext:",
    "filetype:",
    "allinurl:",
    "allintitle:"
  ];

  // Lista básica de palabras clave
  const keywords = [
    "admin",
    "login",
    "password",
    "php",
    "asp",
    "sql",
    "dashboard",
    "backup"
  ];

  // Lista ampliada de keywords para mayor variedad
  const advancedKeywords = [
    "config",
    "error",
    "index",
    "report",
    "api",
    "test",
    "server",
    "data"
  ];

  // Patrones de combinación (usa tokens: "OP" para operador, "KEY" para keyword y "SITE" para dominio)
  const patterns = [
    "OPKEY",                     // Ej: inurl:admin
    "OP KEY",                    // Ej: intitle: login
    "OP KEY site:gov",           // Ej: intext: password site:gov
    "OP KEY site:edu",           // Ej: filetype: php site:edu
    "OP KEY -\"index of\"",      // Excluye directorios tipo index of
    "OP KEY filetype:pdf",       // Ejemplo para PDFs
    "OP KEY site:SITE",          // El token SITE se reemplaza por un dominio aleatorio
    "OP KEY \"password\"",       // Incluye palabra fija "password"
    "OP KEY ext:log",            // Busca extensiones .log
    "OP KEY inurl:admin"         // Combinación fija para buscar paneles de admin
  ];

  // Dominios para reemplazar el token "SITE" (puedes agregar o quitar)
  const domainSuffixes = [".gov", ".edu", ".org", ".net", ".com"];

  // =========================
  // Funciones utilitarias
  // =========================

  // Función que devuelve un elemento aleatorio de un array
  function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  // =========================
  // Lógica principal de generación
  // =========================

  /**
   * Genera un dork en función de una palabra clave personalizada (o aleatoria si está vacía)
   * Se permite que el usuario ingrese varias palabras separadas por coma.
   */
  function generateDork(customKeyword) {
    let chosenKeyword = "";
    if (customKeyword.trim() !== "") {
      // Separa la entrada por comas y elige una de ellas aleatoriamente
      let customKeywords = customKeyword
        .split(",")
        .map(k => k.trim())
        .filter(k => k !== "");
      chosenKeyword = getRandomElement(customKeywords);
    } else {
      // Combina ambas listas para mayor diversidad
      const combinedKeywords = keywords.concat(advancedKeywords);
      chosenKeyword = getRandomElement(combinedKeywords);
    }

    // Selecciona un operador y un patrón al azar
    const chosenOperator = getRandomElement(operators);
    let chosenPattern = getRandomElement(patterns);

    // Reemplaza los tokens "OP" y "KEY" en el patrón
    let dork = chosenPattern
      .replace(/OP/g, chosenOperator)
      .replace(/KEY/g, chosenKeyword);

    // Si el patrón tiene el token "SITE", lo reemplaza por un dominio aleatorio
    if (dork.includes("SITE")) {
      const chosenDomain = getRandomElement(domainSuffixes);
      dork = dork.replace(/SITE/g, chosenDomain);
    }
    return dork;
  }

  /**
   * Genera múltiples dorks y devuelve un array con ellos.
   * @param {string} customKeyword - Entrada del usuario (opcional).
   * @param {number} count - Número de dorks a generar (por defecto 5).
   */
  function generateMultipleDorks(customKeyword, count = 5) {
    let dorks = [];
    for (let i = 0; i < count; i++) {
      dorks.push(generateDork(customKeyword));
    }
    return dorks;
  }

  // =========================
  // Manejo de la Interfaz (UI)
  // =========================

  document.addEventListener("DOMContentLoaded", () => {
    const generateBtn = document.getElementById("generateBtn");
    const customKeywordInput = document.getElementById("customKeyword");
    const resultDiv = document.getElementById("result");
    // Elemento opcional para almacenar el historial
    const historyDiv = document.getElementById("history");
    // Botón opcional para copiar resultados
    const copyBtn = document.getElementById("copyBtn");

    // Array para almacenar el historial de dorks generados
    let generatedDorksHistory = [];

    // Evento para el botón de generar
    generateBtn.addEventListener("click", () => {
      const customKeyword = customKeywordInput.value;
      // Generamos 5 dorks (puedes ajustar la cantidad)
      const dorks = generateMultipleDorks(customKeyword, 5);
      // Actualiza el historial (los más recientes al principio)
      generatedDorksHistory = dorks.concat(generatedDorksHistory);

      // Limpia y muestra los resultados en el contenedor "result"
      resultDiv.innerHTML = "";
      dorks.forEach(dork => {
        const p = document.createElement("p");
        p.textContent = dork;
        resultDiv.appendChild(p);
      });

      // Si existe un contenedor de historial, actualízalo también
      if (historyDiv) {
        historyDiv.innerHTML = "";
        generatedDorksHistory.forEach(d => {
          const p = document.createElement("p");
          p.textContent = d;
          historyDiv.appendChild(p);
        });
      }
    });

    // Funcionalidad para copiar al portapapeles los dorks generados
    if (copyBtn) {
      copyBtn.addEventListener("click", () => {
        let textToCopy = "";
        // Copia el contenido de los párrafos dentro de "result"
        const paragraphs = resultDiv.getElementsByTagName("p");
        for (let p of paragraphs) {
          textToCopy += p.textContent + "\n";
        }
        // Uso de la Clipboard API para copiar el texto
        navigator.clipboard.writeText(textToCopy).then(() => {
          alert("¡Dorks copiados al portapapeles!");
        }).catch(err => {
          alert("Error al copiar: " + err);
        });
      });
    }
  });
})();
