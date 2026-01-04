const fs = require('fs');

// 1. Ler o arquivo original
const data = fs.readFileSync('lista.txt', 'utf8');

// 2. Processar as linhas
const lines = data.split(/\r?\n/);
const stockData = [];

// Começamos em i = 1 para pular a linha de cabeçalho
for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // O arquivo usa tabulações como separador
    const cols = line.split(/\t+/);

    if (cols.length >= 4) {
        stockData.push({
            LABORATORIO: cols[0].trim(),
            EAN_1: cols[1].trim(),
            PRODUTO: cols[2].trim(),
            APRESENTACAO: cols[3].trim(), // .trim() remove o \r e espaços extras
            qtd: 0
        });
    }
}

// 3. EXPORTAR PARA .JS
const jsContent = `const stockData = ${JSON.stringify(stockData, null, 2)};\n\nexport default stockData;`;
fs.writeFileSync('stockData.js', jsContent);

// 4. EXPORTAR PARA .TXT (Formato JSON puro)
//fs.writeFileSync('stockData.txt', JSON.stringify(stockData, null, 2));

console.log('Arquivos gerados com sucesso: stockData.js e stockData.txt!');