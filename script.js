const translations = {
    fr: {
        "nav-dash": "Marchés", "nav-about": "À Propos", "nav-news": "Analyses",
        "calc-title": "Convertisseur Universel", "init-text": "Initialisation...",
        "aff-title": "Meilleur taux d'exécution", "modal-title": "Taux prêt !",
        "modal-desc": "Partagez ce résultat ou profitez de l'offre partenaire pour économiser sur vos frais.",
        "buy-crypto": "Vérifier sur Binance", "buy-metal": "Investir via Revolut", "buy-fiat": "Ouvrir un compte Wise",
        "about-title": "Transparence FlashDevise", "news-title": "Analyses & Flux News",
        "legal-title": "Note Légale",
        "legal-note": "Outil de consultation gratuit. Les taux sont fournis à titre informatif.",
        "about-desc": "Terminal indépendant fournissant des données neutres."
    },
    en: {
        "nav-dash": "Markets", "nav-about": "About", "nav-news": "Analysis",
        "calc-title": "Universal Converter", "init-text": "Initializing...",
        "aff-title": "Best Execution Rate", "modal-title": "Rate Ready!",
        "modal-desc": "Share this result or use our partner offer to save on transfer fees.",
        "buy-crypto": "Check on Binance", "buy-metal": "Invest via Revolut", "buy-fiat": "Open Wise Account",
        "about-title": "FlashDevise Transparency", "news-title": "Market Analysis & News",
        "legal-title": "Legal Disclaimer",
        "legal-note": "Free consultation tool. Rates are for informational purposes only.",
        "about-desc": "Independent terminal providing neutral data."
    }
};

let currentLang = localStorage.getItem('preferredLang') || 'fr';
const cryptos = [{id:"bitcoin", symbol:"BTC"}, {id:"ethereum", symbol:"ETH"}, {id:"solana", symbol:"SOL"}];
const metals = [{id:"gold", symbol:"XAU"}, {id:"silver", symbol:"XAG"}];

function updateAffiliateInfo(toCurrency) {
    const mainBtnText = document.getElementById('mainAffText');
    const mainBtnIcon = document.getElementById('mainAffIcon');
    const mainBtnLink = document.getElementById('mainAffiliateLink');
    const modalBtnText = document.getElementById('modalAffText');
    const modalBtnIcon = document.getElementById('modalAffIcon');
    const modalBtnLink = document.getElementById('modalAffiliateLink');

    let text, iconClass, link;

    if (cryptos.find(c => c.symbol === toCurrency)) {
        text = translations[currentLang]["buy-crypto"];
        iconClass = "fab fa-bitcoin"; // Icône générique crypto
        link = "https://www.binance.com";
    } else if (metals.find(m => m.symbol === toCurrency)) {
        text = translations[currentLang]["buy-metal"];
        iconClass = "fas fa-coins"; // Icône pour métaux
        link = "https://www.revolut.com";
    } else {
        text = translations[currentLang]["buy-fiat"];
        iconClass = "fas fa-university"; // Icône pour banque/fiat
        link = "https://wise.com";
    }

    [mainBtnText, modalBtnText].forEach(el => el.innerText = text);
    [mainBtnLink, modalBtnLink].forEach(el => el.href = link);
    [mainBtnIcon, modalBtnIcon].forEach(el => {
        el.className = iconClass + " text-lg";
    });
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

async function fetchNews() {
    const container = document.getElementById('news-container');
    const ticker = document.getElementById('ticker');
    try {
        const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://cryptopanic.com/api/v1/posts/?public=true')}`);
        const data = await res.json();
        const posts = JSON.parse(data.contents).results.slice(0, 4);
        container.innerHTML = posts.map(p => `
            <div class="glass p-6 rounded-2xl border border-white/5">
                <span class="text-[8px] font-black text-indigo-500 uppercase">${p.source.title}</span>
                <h4 class="text-[11px] font-bold mt-2 h-10 overflow-hidden">${p.title}</h4>
                <a href="${p.url}" target="_blank" class="text-[9px] text-slate-500 mt-4 block font-black hover:text-white transition">Source →</a>
            </div>
        `).join('');
        ticker.innerText = posts.map(p => `${p.title.toUpperCase()} • `).join('');
    } catch (e) { console.log("News error"); }
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
    if (from === "BTC" || to === "BTC" || from === "ETH" || to === "ETH") symbol = "BINANCE:BTCUSDT";
    if (from === "XAU" || to === "XAU") symbol = "OANDA:XAUUSD";
    new TradingView.widget({
        "autosize": true, "symbol": symbol, "interval": "D", "theme": "dark", "style": "3",
        "container_id": "tradingview_chart", "locale": currentLang, "hide_top_toolbar": true, "backgroundColor": "#05070a"
    });
}

async function init() {
    const fS = document.getElementById('fromCurrency'), tS = document.getElementById('toCurrency');
    const res = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`);
    const data = await res.json();
    const all = [...Object.keys(data.rates), "BTC", "ETH", "SOL", "XAU", "XAG"].sort();
    all.forEach(s => { fS.add(new Option(s, s)); tS.add(new Option(s, s)); });
    fS.value = "EUR"; tS.value = "USD";
    setLanguage(currentLang);
    fetchNews(); convert(); updateChart();
}

document.getElementById('amount').addEventListener('change', convert);
[document.getElementById('fromCurrency'), document.getElementById('toCurrency')].forEach(s => s.addEventListener('change', () => { convert(); updateChart(); }));

init();
setInterval(fetchNews, 600000);
