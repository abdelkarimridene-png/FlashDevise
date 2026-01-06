const translations = {
    fr: {
        "nav-dash": "Marchés", "nav-about": "À Propos", "nav-news": "Analyses",
        "calc-title": "Convertisseur Universel", "init-text": "Initialisation...",
        "aff-title": "Exécution Sécurisée", "modal-title": "Taux prêt !",
        "buy-crypto": "Vérifier sur Binance", "buy-metal": "Investir via Revolut", "buy-fiat": "Ouvrir un compte Wise"
    },
    en: {
        "nav-dash": "Markets", "nav-about": "About", "nav-news": "Analysis",
        "calc-title": "Universal Converter", "init-text": "Initializing...",
        "aff-title": "Secure Execution", "modal-title": "Rate Ready!",
        "buy-crypto": "Check on Binance", "buy-metal": "Invest via Revolut", "buy-fiat": "Open Wise Account"
    }
};

// Codes SVG directs pour garantir l'affichage sans téléchargement externe
const svgIcons = {
    binance: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16.624 13.9202l-2.617 2.6214-2.611-2.6214h5.228zm-5.228-3.8404l2.611-2.6213 2.617 2.6213h-5.228zM9.03 12l2.622-2.6234L14.275 12l-2.623 2.6234L9.03 12zM6.448 15.5414l2.62-2.6214 2.617 2.6214-2.617 2.6193-2.62-2.6193zm0-7.0828l2.62 2.6213-2.62 2.6214-2.618-2.6214 2.618-2.6213zM12 0L0 12l12 12 12-12L12 0z"/></svg>`,
    wise: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M15.42 5.34l.7 2.22h-5.22L8.27 12l3.43 5.4h2.2L10.74 12l2.63-4.44h4.42l.7 2.22h2.2L19.26 5.34h-3.84zM1.31 5.34h2.2l3.23 5.33 3.23-5.33h2.2l-4.33 7.11L12 19.59H9.8l-3.06-5.04L3.68 19.59H1.48l4.33-7.14-4.5-7.11z"/></svg>`,
    revolut: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.08 2.33H4.92A2.59 2.59 0 002.33 4.92v14.16a2.59 2.59 0 002.59 2.59h14.16a2.59 2.59 0 002.59-2.59V4.92a2.59 2.59 0 00-2.59-2.59zM15.5 17.5h-2.2V12.8h-2.6v4.7H8.5V6.5h2.2v4.1h2.6V6.5h2.2v11z"/></svg>`
};

let currentLang = localStorage.getItem('preferredLang') || 'fr';
const cryptos = [{id:"bitcoin", symbol:"BTC"}, {id:"ethereum", symbol:"ETH"}];
const metals = [{id:"gold", symbol:"XAU"}];

function updateAffiliateInfo(toCurrency) {
    const mainBtnText = document.getElementById('mainAffText');
    const mainBtnIcon = document.getElementById('mainAffIcon');
    const mainBtnLink = document.getElementById('mainAffiliateLink');
    const modalBtnText = document.getElementById('modalAffText');
    const modalBtnIcon = document.getElementById('modalAffIcon');
    const modalBtnLink = document.getElementById('modalAffiliateLink');

    let text, svg, link;

    if (cryptos.find(c => c.symbol === toCurrency)) {
        text = translations[currentLang]["buy-crypto"];
        svg = svgIcons.binance;
        link = "https://www.binance.com";
    } else if (metals.find(m => m.symbol === toCurrency)) {
        text = translations[currentLang]["buy-metal"];
        svg = svgIcons.revolut;
        link = "https://www.revolut.com";
    } else {
        text = translations[currentLang]["buy-fiat"];
        svg = svgIcons.wise;
        link = "https://wise.com";
    }

    [mainBtnText, modalBtnText].forEach(el => el.innerText = text);
    [mainBtnLink, modalBtnLink].forEach(el => el.href = link);
    [mainBtnIcon, modalBtnIcon].forEach(el => el.innerHTML = svg);
}

function showModal() { document.getElementById('shareModal').style.display = 'flex'; }
function closeModal() { document.getElementById('shareModal').style.display = 'none'; }

async function convert() {
    const amount = document.getElementById('amount').value;
    const from = document.getElementById('fromCurrency').value;
    const to = document.getElementById('toCurrency').value;
    if (!amount) return;
    updateAffiliateInfo(to);
    try {
        const res = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`);
        const data = await res.json();
        const getP = async (s) => {
            const c = cryptos.find(i => i.symbol === s);
            if(c){
                const r = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${c.id}&vs_currencies=usd`);
                const d = await r.json(); return d[c.id].usd;
            }
            return 1 / data.rates[s];
        };
        const rate = (await getP(from)) / (await getP(to));
        document.getElementById('resultValue').innerText = (amount * rate).toLocaleString(undefined, {maximumFractionDigits: 2}) + " " + to;
        document.getElementById('baseText').innerText = `1 ${from} = ${rate.toFixed(4)} ${to}`;
        setTimeout(showModal, 1500);
    } catch(e) { console.error(e); }
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('preferredLang', lang);
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[lang][key]) el.innerText = translations[lang][key];
    });
    updateAffiliateInfo(document.getElementById('toCurrency').value);
}

function updateChart() {
    const from = document.getElementById('fromCurrency').value;
    const to = document.getElementById('toCurrency').value;
    let symbol = `FX_IDC:${from}${to}`;
    if (from === "BTC" || to === "BTC") symbol = "BINANCE:BTCUSDT";
    new TradingView.widget({
        "autosize": true, "symbol": symbol, "interval": "D", "theme": "dark", "style": "3",
        "container_id": "tradingview_chart", "locale": currentLang, "hide_top_toolbar": true, "backgroundColor": "#05070a"
    });
}

async function init() {
    const fS = document.getElementById('fromCurrency'), tS = document.getElementById('toCurrency');
    const res = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`);
    const data = await res.json();
    const all = [...Object.keys(data.rates), "BTC", "ETH", "XAU"].sort();
    all.forEach(s => { fS.add(new Option(s, s)); tS.add(new Option(s, s)); });
    fS.value = "EUR"; tS.value = "USD";
    setLanguage(currentLang);
    convert(); updateChart();
}

document.getElementById('amount').addEventListener('change', convert);
[document.getElementById('fromCurrency'), document.getElementById('toCurrency')].forEach(s => s.addEventListener('change', () => { convert(); updateChart(); }));

init();
