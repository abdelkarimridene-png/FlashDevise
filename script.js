const translations = {
    fr: {
        "nav-dash": "Marchés", "nav-about": "À Propos", "nav-news": "Analyses",
        "calc-title": "Convertisseur Universel", "init-text": "Initialisation...",
        "aff-title": "Meilleure Exécution", "modal-title": "Taux prêt !",
        "modal-desc": "Partagez ce résultat ou profitez de l'offre partenaire pour économiser sur vos frais.",
        "buy-crypto": "Vérifier sur Binance", "buy-metal": "Investir via Revolut", "buy-fiat": "Ouvrir un compte Wise",
        "about-title": "Transparence FlashDevise", "news-title": "Analyses & Flux News",
        "legal-title": "Note Légale",
        "legal-note": "Outil de consultation gratuit. Les taux sont fournis à titre informatif. En utilisant nos liens partenaires, vous soutenez ce projet sans aucun surcoût pour vous.",
        "about-desc": "Terminal indépendant fournissant des données neutres. Nous aidons les utilisateurs à identifier le taux de change réel pour minimiser les frais de transaction bancaires."
    },
    en: {
        "nav-dash": "Markets", "nav-about": "About", "nav-news": "Analysis",
        "calc-title": "Universal Converter", "init-text": "Initializing...",
        "aff-title": "Best Execution", "modal-title": "Rate Ready!",
        "modal-desc": "Share this result or use our partner offer to save on transfer fees.",
        "buy-crypto": "Check on Binance", "buy-metal": "Invest via Revolut", "buy-fiat": "Open Wise Account",
        "about-title": "FlashDevise Transparency", "news-title": "Market Analysis & News",
        "legal-title": "Legal Disclaimer",
        "legal-note": "Free consultation tool. Rates are for informational purposes only. By using our partner links, you support this project at no extra cost for you.",
        "about-desc": "Independent terminal providing neutral data. We help users identify the real exchange rate to minimize bank transaction fees."
    }
};

// Logos PNG stables (Wikimedia)
const logos = {
    wise: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Wise_logo_on_blue.png/512px-Wise_logo_on_blue.png",
    binance: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Binance_Logo.svg/512px-Binance_Logo.svg.png",
    revolut: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Revolut_logo.svg/512px-Revolut_logo.svg.png"
};

const cryptos = [{id:"bitcoin", symbol:"BTC"}, {id:"ethereum", symbol:"ETH"}, {id:"solana", symbol:"SOL"}];
const metals = [{id:"gold", symbol:"XAU"}, {id:"silver", symbol:"XAG"}];
let currentLang = localStorage.getItem('preferredLang') || 'fr';

function updateAffiliateInfo(toCurrency) {
    const mainBtnText = document.getElementById('mainAffText');
    const modalBtnText = document.getElementById('modalAffText');
    const mainBtnLogo = document.getElementById('mainAffLogo');
    const modalBtnLogo = document.getElementById('modalBtnLogo');
    const mainBtnLink = document.getElementById('mainAffiliateLink');
    const modalBtnLink = document.getElementById('modalAffiliateLink');

    let text, logo, link;

    if (cryptos.find(c => c.symbol === toCurrency)) {
        text = translations[currentLang]["buy-crypto"]; logo = logos.binance; link = "https://www.binance.com";
    } else if (metals.find(m => m.symbol === toCurrency)) {
        text = translations[currentLang]["buy-metal"]; logo = logos.revolut; link = "https://www.revolut.com";
    } else {
        text = translations[currentLang]["buy-fiat"]; logo = logos.wise; link = "https://wise.com";
    }

    if(mainBtnText) [mainBtnText, modalBtnText].forEach(el => { if(el) el.innerText = text; });
    if(mainBtnLogo) mainBtnLogo.src = logo;
    if(modalBtnLogo) modalBtnLogo.src = logo;
    if(mainBtnLink) [mainBtnLink, modalBtnLink].forEach(el => { if(el) el.href = link; });
}

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
        setTimeout(() => document.getElementById('shareModal').style.display = 'flex', 1500);
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
            <div class="glass p-6 rounded-2xl border border-white/5 hover:border-indigo-500/20 transition cursor-pointer">
                <span class="text-[8px] font-black text-indigo-500 uppercase">${p.source.title}</span>
                <h4 class="text-[11px] font-bold mt-2 h-10 overflow-hidden text-slate-200">${p.title}</h4>
                <a href="${p.url}" target="_blank" class="text-[9px] text-slate-500 mt-4 block font-black hover:text-white transition">VOIR L'ARTICLE →</a>
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
    if (from === "BTC" || to === "BTC") symbol = "BINANCE:BTCUSDT";
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
    setLanguage(currentLang); fetchNews(); convert(); updateChart();
}

function share(platform) {
    const res = document.getElementById('resultValue').innerText;
    const text = encodeURIComponent(`FlashDevise : Taux de ${res} trouvé. Calculez en direct : `);
    const url = platform === 'whatsapp' ? `https://api.whatsapp.com/send?text=${text}%20${window.location.href}` : `https://t.me/share/url?url=${window.location.href}&text=${text}`;
    window.open(url, '_blank');
}

document.getElementById('amount').addEventListener('change', convert);
[document.getElementById('fromCurrency'), document.getElementById('toCurrency')].forEach(s => s.addEventListener('change', () => { convert(); updateChart(); }));
function closeModal() { document.getElementById('shareModal').style.display = 'none'; }

init();
setInterval(fetchNews, 600000);
