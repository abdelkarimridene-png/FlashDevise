const translations = {
    fr: {
        "nav-dash": "Marchés", "nav-about": "À Propos", "nav-news": "Analyses",
        "calc-title": "Convertisseur Universel", "init-text": "Initialisation...",
        "aff-title": "Meilleure Exécution", "modal-title": "Taux prêt !",
        "modal-desc": "Le taux a été actualisé avec succès.",
        "buy-crypto": "Vérifier sur Binance", "buy-metal": "Investir via Revolut", "buy-fiat": "Ouvrir un compte Wise",
        "about-title": "Transparence FlashDevise", "news-title": "Analyses & Flux News",
        "legal-title": "Note Légale",
        "legal-note": "Outil de consultation gratuit. Les taux sont fournis à titre informatif.",
        "about-desc": "Terminal indépendant fournissant des données neutres."
    },
    en: {
        "nav-dash": "Markets", "nav-about": "About", "nav-news": "Analysis",
        "calc-title": "Universal Converter", "init-text": "Initializing...",
        "aff-title": "Best Execution", "modal-title": "Rate Ready!",
        "modal-desc": "Rate updated successfully.",
        "buy-crypto": "Check on Binance", "buy-metal": "Invest via Revolut", "buy-fiat": "Open Wise Account",
        "about-title": "FlashDevise Transparency", "news-title": "Market Analysis & News",
        "legal-title": "Legal Disclaimer",
        "legal-note": "Free tool. Rates are for info only.",
        "about-desc": "Independent terminal providing neutral data."
    }
};

const currencyNames = {
    "USD": "US Dollar", "EUR": "Euro", "GBP": "British Pound", "JPY": "Japanese Yen",
    "CAD": "Canadian Dollar", "AUD": "Australian Dollar", "CHF": "Swiss Franc",
    "CNY": "Chinese Yuan", "MAD": "Moroccan Dirham", "DZD": "Algerian Dinar",
    "BTC": "Bitcoin", "ETH": "Ethereum", "SOL": "Solana", "XAU": "Gold (Ounce)",
    "XAG": "Silver (Ounce)", "AED": "UAE Dirham", "INR": "Indian Rupee",
    "BRL": "Brazilian Real", "TRY": "Turkish Lira", "RUB": "Russian Ruble",
    "HKD": "Hong Kong Dollar", "SGD": "Singapore Dollar", "MXN": "Mexican Peso"
};

const svgLogos = {
    binance: `<svg viewBox="0 0 24 24" fill="#F0B90B" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"><path d="M16.624 13.9202l-4.624 4.624-4.624-4.624-2.147 2.147L12 23.3333l7.271-7.2661-2.647-2.147zm4.624-4.624L24 12l-2.752 2.704-2.147-2.147 2.147-2.257zm-18.496 0L0 12l2.752 2.704 2.147-2.147-2.147-2.257zm9.248-9.2962L19.271 7.2661l-2.647 2.147L12 4.7889l-4.624 4.624-2.647-2.147L12 0zm0 6.1364l2.647 2.647L12 11.4304l-2.647-2.647L12 6.1364zm7.271 3.1116l2.147 2.147-2.147 2.147-2.147-2.147 2.147-2.147zm-14.542 0l2.147 2.147-2.147 2.147-2.147-2.147 2.147-2.147z"/></svg>`,
    wise: `<svg viewBox="0 0 24 24" fill="#00B5FF" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"><path d="M12 0L8.63 8.37L0 14.5L13.12 14.5L14.75 24L18.12 15.63L24 9.5L12.37 9.5L12 0Z"/></svg>`,
    revolut: `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"><path d="M19.333 3.333H4.667C3.931 3.333 3.333 3.931 3.333 4.667v14.666c0 .736.598 1.334 1.334 1.334h14.666c.736 0 1.334-.598 1.334-1.334V4.667c0-.736-.598-1.334-1.334-1.334zm-7.333 13.334l-3.333-3.334h6.666l-3.333 3.334z"/></svg>`
};

const cryptos = [{id:"bitcoin", symbol:"BTC"}, {id:"ethereum", symbol:"ETH"}, {id:"solana", symbol:"SOL"}];
const metals = [{id:"gold", symbol:"XAU"}, {id:"silver", symbol:"XAG"}];
let currentLang = localStorage.getItem('preferredLang') || 'fr';

function updateAffiliateInfo(toCurrency) {
    const mainBtnText = document.getElementById('mainAffText'), modalBtnText = document.getElementById('modalAffText');
    const mainBtnLink = document.getElementById('mainAffiliateLink'), modalBtnLink = document.getElementById('modalAffiliateLink');
    const mainIcon = document.getElementById('mainAffIcon'), modalIcon = document.getElementById('modalAffIcon');
    let text, link, icon;
    if (cryptos.find(c => c.symbol === toCurrency)) {
        text = translations[currentLang]["buy-crypto"]; link = "https://www.binance.com"; icon = svgLogos.binance;
    } else if (metals.find(m => m.symbol === toCurrency)) {
        text = translations[currentLang]["buy-metal"]; link = "https://www.revolut.com"; icon = svgLogos.revolut;
    } else {
        text = translations[currentLang]["buy-fiat"]; link = "https://wise.com"; icon = svgLogos.wise;
    }
    if(mainBtnText) [mainBtnText, modalBtnText].forEach(el => { if(el) el.innerText = text; });
    if(mainBtnLink) [mainBtnLink, modalBtnLink].forEach(el => { if(el) el.href = link; });
    if(mainIcon) [mainIcon, modalIcon].forEach(el => { if(el) el.innerHTML = icon; });
}

async function convert() {
    const amount = document.getElementById('amount').value, from = document.getElementById('fromCurrency').value, to = document.getElementById('toCurrency').value;
    if (!amount) return;
    updateAffiliateInfo(to);
    try {
        const res = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`), data = await res.json();
        const getP = async (s) => {
            const c = cryptos.find(i => i.symbol === s);
            if(c){
                const r = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${c.id}&vs_currencies=usd`), d = await r.json(); return d[c.id].usd;
            }
            return 1 / data.rates[s];
        };
        const rate = (await getP(from)) / (await getP(to));
        document.getElementById('resultValue').innerText = (amount * rate).toLocaleString(undefined, {maximumFractionDigits: 2}) + " " + to;
        document.getElementById('baseText').innerText = `1 ${from} = ${rate.toFixed(4)} ${to}`;
        setTimeout(() => document.getElementById('shareModal').style.display = 'flex', 2000);
    } catch(e) { console.error(e); }
}

async function fetchNews() {
    const container = document.getElementById('news-container'), ticker = document.getElementById('ticker');
    try {
        const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://cryptopanic.com/api/v1/posts/?public=true')}`), data = await res.json();
        const posts = JSON.parse(data.contents).results.slice(0, 4);
        container.innerHTML = posts.map(p => `
            <div class="glass p-6 rounded-2xl border border-white/5">
                <span class="text-[8px] font-black text-indigo-500 uppercase">${p.source.title}</span>
                <h4 class="text-[11px] font-bold mt-2 text-slate-200 h-10 overflow-hidden">${p.title}</h4>
                <a href="${p.url}" target="_blank" class="text-[9px] text-slate-500 mt-4 block font-black hover:text-white">VOIR PLUS →</a>
            </div>
        `).join('');
        ticker.innerText = posts.map(p => `${p.title.toUpperCase()} • `).join('');
    } catch (e) { console.log("News error"); }
}

function setLanguage(lang) {
    currentLang = lang; localStorage.setItem('preferredLang', lang);
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[lang][key]) el.innerText = translations[lang][key];
    });
}

function updateChart() {
    const from = document.getElementById('fromCurrency').value, to = document.getElementById('toCurrency').value;
    let symbol = `FX_IDC:${from}${to}`;
    if (from === "BTC" || to === "BTC") symbol = "BINANCE:BTCUSDT";
    new TradingView.widget({
        "autosize": true, "symbol": symbol, "interval": "D", "theme": "dark", "style": "3",
        "container_id": "tradingview_chart", "locale": currentLang, "hide_top_toolbar": true, "backgroundColor": "#05070a"
    });
}

async function init() {
    const fS = document.getElementById('fromCurrency'), tS = document.getElementById('toCurrency');
    const res = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`), data = await res.json();
    const all = [...Object.keys(data.rates), "BTC", "ETH", "SOL", "XAU", "XAG"].sort();
    all.forEach(s => {
        const label = currencyNames[s] ? `${s} - ${currencyNames[s]}` : s;
        fS.add(new Option(label, s)); tS.add(new Option(label, s));
    });
    fS.value = "EUR"; tS.value = "USD";
    setLanguage(currentLang); fetchNews(); convert(); updateChart();
}

function share(platform) {
    const res = document.getElementById('resultValue').innerText;
    const text = encodeURIComponent(`FlashDevise : Taux de ${res} trouvé.`);
    const url = platform === 'whatsapp' ? `https://api.whatsapp.com/send?text=${text}%20${window.location.href}` : `https://t.me/share/url?url=${window.location.href}&text=${text}`;
    window.open(url, '_blank');
}

document.getElementById('amount').addEventListener('change', convert);
[document.getElementById('fromCurrency'), document.getElementById('toCurrency')].forEach(s => s.addEventListener('change', () => { convert(); updateChart(); }));
function closeModal() { document.getElementById('shareModal').style.display = 'none'; }
init();
setInterval(fetchNews, 600000);
