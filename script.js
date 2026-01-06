const translations = {
    fr: {
        "nav-dash": "Marchés", "calc-title": "Convertisseur Universel", "init-text": "Initialisation...",
        "aff-title": "Exécution Sécurisée", "modal-title": "Taux prêt !",
        "buy-crypto": "Vérifier sur Binance", "buy-metal": "Investir via Revolut", "buy-fiat": "Ouvrir un compte Wise"
    },
    en: {
        "nav-dash": "Markets", "calc-title": "Universal Converter", "init-text": "Initializing...",
        "aff-title": "Secure Execution", "modal-title": "Rate Ready!",
        "buy-crypto": "Check on Binance", "buy-metal": "Invest via Revolut", "buy-fiat": "Open Wise Account"
    }
};

// Images encodées en Base64 (Version Noire pour bouton blanc, Version Blanche pour bouton bleu)
const iconsBase64 = {
    binance: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTE2LjYyNCAxMy45MmwtMi42MTcgMi42MjEtMi42MTEtMi42MjFoNS4yMjh6bS01LjIyOC0zLjg0bDIuNjExLTIuNjIxIDIuNjE3IDIuNjIxaC01LjIyOHpNOS4wMyAxMmwyLjYyMi0yLjYyMyAyLjYyMyAyLjYyMy0yLjYyMyAyLjYyM0w5LjAzIDEyeiIsIGZpbGw9ImJsYWNrIi8+PC9zdmc+",
    wise: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTE1LjQyIDUuMzRsLjcgMi4yMmgtNS4yMkw4LjI3IDEybDMuNDMgNS40aDIuMkwxMC43NCAxMmwyLjYzLTQuNDRoNC40MmwuNyAyLjIyaDIuMkwxOS4yNiA1LjM0aC0zLjg0eiIsIGZpbGw9ImJsYWNrIi8+PC9zdmc+",
    revolut: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTE5LjA4IDIuMzNINC45MmEyLjU5IDIuNTkgMCAwMD0yLjU5IDIuNTl2MTQuMTZhMi41OSAyLjU5IDAgMDAyLjU5IDIuNTloMTQuMTZhMi41OSAyLjU5IDAgMDAyLjU5LTIuNTlWNC45MmEyLjU5IDIuNTkgMCAwMC0yLjU5LTIuNTl6IiwgZmlsbD0iYmxhY2siLz48L3N2Zz4="
};

let currentLang = localStorage.getItem('preferredLang') || 'fr';
const cryptos = [{id:"bitcoin", symbol:"BTC"}, {id:"ethereum", symbol:"ETH"}];

function updateAffiliateInfo(toCurrency) {
    const mainBtnText = document.getElementById('mainAffText');
    const mainBtnLogo = document.getElementById('mainAffLogo');
    const modalBtnLogo = document.getElementById('modalAffLogo');
    const modalBtnText = document.getElementById('modalAffText');

    let text, img;
    if (cryptos.find(c => c.symbol === toCurrency)) {
        text = translations[currentLang]["buy-crypto"];
        img = iconsBase64.binance;
    } else if (toCurrency === "XAU") {
        text = translations[currentLang]["buy-metal"];
        img = iconsBase64.revolut;
    } else {
        text = translations[currentLang]["buy-fiat"];
        img = iconsBase64.wise;
    }

    if(mainBtnText) mainBtnText.innerText = text;
    if(modalBtnText) modalBtnText.innerText = text;
    
    // On force l'affichage
    [mainBtnLogo, modalBtnLogo].forEach(el => {
        if(el) {
            el.src = img;
            el.style.display = "block";
            el.style.width = "20px";
            el.style.height = "20px";
        }
    });
}

function showModal() { document.getElementById('shareModal').style.display = 'flex'; }
function closeModal() { document.getElementById('shareModal').style.display = 'none'; }

async function convert() {
    const amount = document.getElementById('amount').value;
    const from = document.getElementById('fromCurrency').value;
    const to = document.getElementById('toCurrency').value;
    updateAffiliateInfo(to);
    try {
        const res = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`);
        const data = await res.json();
        const rate = (data.rates[to] || 1) / (data.rates[from] || 1);
        document.getElementById('resultValue').innerText = (amount * rate).toLocaleString() + " " + to;
        document.getElementById('baseText').innerText = `1 ${from} = ${rate.toFixed(4)} ${to}`;
        setTimeout(showModal, 2000);
    } catch(e) { console.error(e); }
}

function setLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[lang][key]) el.innerText = translations[lang][key];
    });
    updateAffiliateInfo(document.getElementById('toCurrency').value);
}

function updateChart() {
    const from = document.getElementById('fromCurrency').value;
    const to = document.getElementById('toCurrency').value;
    new TradingView.widget({
        "autosize": true, "symbol": `${from}${to}`, "interval": "D", "theme": "dark",
        "container_id": "tradingview_chart", "style": "3", "backgroundColor": "#05070a"
    });
}

async function init() {
    const fS = document.getElementById('fromCurrency'), tS = document.getElementById('toCurrency');
    const res = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`);
    const data = await res.json();
    Object.keys(data.rates).sort().forEach(s => { fS.add(new Option(s, s)); tS.add(new Option(s, s)); });
    fS.value = "EUR"; tS.value = "USD";
    setLanguage(currentLang); convert(); updateChart();
}

document.getElementById('amount').addEventListener('change', convert);
[document.getElementById('fromCurrency'), document.getElementById('toCurrency')].forEach(s => s.addEventListener('change', () => { convert(); updateChart(); }));
init();
