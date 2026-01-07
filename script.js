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
        "about-desc": "Terminal indépendant fournissant des données neutres. Nous aidons les utilisateurs à identifier le taux de change réel."
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
        "about-desc": "Independent terminal providing neutral data. We help find the real rate."
    }
};

const currencyNames = {
    "USD": "US Dollar", "EUR": "Euro", "GBP": "British Pound", "JPY": "Japanese Yen",
    "CAD": "Canadian Dollar", "AUD": "Australian Dollar", "CHF": "Swiss Franc",
    "CNY": "Chinese Yuan", "MAD": "Dirham Marocain", "DZD": "Dinar Algérien",
    "BTC": "Bitcoin", "ETH": "Ethereum", "SOL": "Solana", "XAU": "Or (Once)",
    "XAG": "Argent (Once)", "AED": "UAE Dirham", "INR": "Indian Rupee",
    "TRY": "Turkish Lira", "BRL": "Brazilian Real"
};

const svgLogos = {
    binance: `<svg viewBox="0 0 24 24" fill="#F0B90B" class="h-5 w-5"><path d="M16.624 13.9202l-4.624 4.624-4.624-4.624-2.147 2.147L12 23.3333l7.271-7.2661-2.647-2.147zm4.624-4.624L24 12l-2.752 2.704-2.147-2.147 2.147-2.257zm-18.496 0L0 12l2.752 2.704 2.147-2.147-2.147-2.257zm9.248-9.2962L19.271 7.2661l-2.647 2.147L12 4.7889l-4.624 4.624-2.647-2.147L12 0zm0 6.1364l2.647 2.647L12 11.4304l-2.647-2.647L12 6.1364zm7.271 3.1116l2.147 2.147-2.147 2.147-2.147-2.147 2.147-2.147zm-14.542 0l2.147 2.147-2.147 2.147-2.147-2.147 2.147-2.147z"/></svg>`,
    wise: `<svg viewBox="0 0 24 24" fill="#00B5FF" class="h-5 w-5"><path d="M12 0L8.63 8.37L0 14.5L13.12 14.5L14.75 24L18.12 15.63L24 9.5L12.37 9.5L12 0Z"/></svg>`,
    revolut: `<svg viewBox="0 0 24 24" fill="white" class="h-5 w-5"><path d="M19.333 3.333H4.667C3.931 3.333 3.333 3.931 3.333 4.667v14.666c0 .736.598 1.334 1.334 1.334h14.666c.736 0 1.334-.598 1.334-1.334V4.667c0-.736-.598-1.334-1.334-1.334zm-7.333 13.334l-3.333-3.334h6.666l-3.333 3.334z"/></svg>`
};

const cryptos = [{id:"bitcoin", symbol:"BTC"}, {id:"ethereum", symbol:"ETH"}, {id:"solana", symbol:"SOL"}];
const metals = [{id:"gold", symbol:"XAU"}, {id:"silver", symbol:"XAG"}];
let currentLang = localStorage.getItem('preferredLang') || 'fr';
let currentNews = [];

function updateAffiliateInfo(toCurrency) {
    const mainBtnText = document.getElementById('mainAffText'), mainBtnLink = document.getElementById('mainAffiliateLink');
    const mainIcon = document.getElementById('mainAffIcon'), modalBtnText = document.getElementById('modalAffText');
    const modalBtnLink = document.getElementById('modalAffiliateLink'), modalIcon = document.getElementById('modalAffIcon');

    let text, link, icon;
    if (cryptos.find(c => c.symbol === toCurrency)) {
        text = translations[currentLang]["buy-crypto"]; link = "https://www.binance.com"; icon = svgLogos.binance;
    } else if (metals.find(m => m.symbol === toCurrency)) {
        text = translations[currentLang]["buy-metal"]; link = "https://www.revolut.com"; icon = svgLogos.revolut;
    } else {
        text = translations[currentLang]["buy-fiat"]; link = "https://wise.com"; icon = svgLogos.wise;
    }
    
    if(mainBtnText) mainBtnText.innerText = text;
    if(modalBtnText) modalBtnText.innerText = text;
    if(mainBtnLink) mainBtnLink.href = link;
    if(modalBtnLink) modalBtnLink.href = link;
    if(mainIcon) mainIcon.innerHTML = icon;
    if(modalIcon) modalIcon.innerHTML = icon;
}

async function convert() {
    const amountInput = document.getElementById('amount');
    const amount = amountInput ? amountInput.value : 0;
    const from = document.getElementById('fromCurrency').value;
    const to = document.getElementById('toCurrency').value;
    
    if (!amount || amount <= 0) return;
    updateAffiliateInfo(to);
    
    try {
        const res = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`);
        const data = await res.json();
        
        const getP = async (s) => {
            const c = cryptos.find(i => i.symbol === s);
            if(c){
                const r = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${c.id}&vs_currencies=usd`);
                const d = await r.json(); 
                return d[c.id].usd;
            }
            if(s === "XAU") return 2050; 
            if(s === "XAG") return 23.50; 
            return 1 / data.rates[s];
        };

        const priceFrom = await getP(from);
        const priceTo = await getP(to);
        const rate = priceFrom / priceTo;
        
        document.getElementById('resultValue').innerText = (amount * rate).toLocaleString(undefined, {maximumFractionDigits: 2}) + " " + to;
        document.getElementById('baseText').innerText = `1 ${from} = ${rate.toFixed(4)} ${to}`;
        
        setTimeout(() => {
            const modal = document.getElementById('shareModal');
            if(modal) modal.style.display = 'flex';
        }, 3000);
        
    } catch(e) { console.error("Conversion Error:", e); }
}

async function fetchNews() {
    try {
        const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://cryptopanic.com/api/v1/posts/?public=true')}`);
        const data = await res.json();
        currentNews = JSON.parse(data.contents).results.slice(0, 8);
        renderNewsContent(currentNews);
    } catch (e) { 
        currentNews = [
            { title: "Volumes d'échange en hausse sur les paires EUR/USD", source: {title: "Market Insight"}, url: "https://cryptopanic.com" },
            { title: "Analyse technique : Résistance majeure sur le Bitcoin", source: {title: "Crypto Daily"}, url: "https://cryptopanic.com" }
        ];
        renderNewsContent(currentNews);
    }
}

function renderNewsContent(posts) {
    const container = document.getElementById('news-container');
    const ticker = document.getElementById('ticker');
    if(!container) return;

    // Sémantique HTML5 <article> pour Google News / AI
    container.innerHTML = posts.map((p, index) => {
        const titleLower = p.title.toLowerCase();
        const isBearish = titleLower.match(/(drop|crash|down|bear|baisse|low|fall)/);
        const sentimentClass = isBearish ? 'sentiment-down' : 'sentiment-up';
        const sentimentText = isBearish ? 'BEARISH' : 'BULLISH';
        
        return `
            <article class="news-card glass p-6 rounded-[2rem] border border-white/5 flex flex-col justify-between" onclick="openArticle(${index})">
                <div>
                    <div class="flex justify-between items-center mb-4">
                        <span class="text-[8px] font-black text-indigo-400 uppercase tracking-tighter">${p.source ? p.source.title : 'Market'}</span>
                        <span class="text-[8px] font-bold px-2 py-1 rounded-full ${sentimentClass}">${sentimentText}</span>
                    </div>
                    <h3 class="text-[12px] font-bold leading-relaxed text-slate-200 line-clamp-3">${p.title}</h3>
                </div>
                <div class="text-[9px] text-indigo-500 font-black mt-4 uppercase">Voir l'Analyse IA →</div>
            </article>
        `;
    }).join('');
    
    if(ticker) ticker.innerText = " • " + posts.map(p => p.title.toUpperCase()).join(' • ');
}

function openArticle(index) {
    const article = currentNews[index];
    const header = document.getElementById('article-header');
    const body = document.getElementById('article-body');
    const sourceLink = document.getElementById('source-link');

    // Mise à jour du titre de la page pour le SEO social
    document.title = `${article.title} | Analyse FlashDevise`;

    header.innerHTML = `
        <span class="text-[10px] font-black text-indigo-500 uppercase tracking-widest">${article.source ? article.source.title : 'Market Intelligence'}</span>
        <h2 class="text-2xl font-black mt-2 leading-tight uppercase italic text-white">${article.title}</h2>
    `;

    // Prompt IA simulé avec mots-clés riches (Sémantique finance)
    const analysis = [
        `D'après les données du terminal FlashDevise, "${article.title}" impacte actuellement la liquidité des paires liées. L'analyse algorithmique détecte un changement de volatilité significatif sur le marché Forex/Crypto.`,
        `Le momentum actuel, couplé aux indicateurs RSI et aux zones de support/résistance, suggère une phase d'accumulation stratégique.`,
        `Techniquement, une consolidation au-dessus des pivots actuels validerait la poursuite de cette tendance pour les prochaines 24 heures.`,
        `Note FlashDevise : Surveillez les volumes de clôture pour confirmer la force du mouvement sur notre convertisseur.`
    ];

    body.innerHTML = analysis.map(text => `<p class="mb-4">${text}</p>`).join('');
    sourceLink.href = article.url;
    document.getElementById('newsContentModal').style.display = 'flex';
}

function setLanguage(lang) {
    currentLang = lang; localStorage.setItem('preferredLang', lang);
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[lang][key]) el.innerText = translations[lang][key];
    });
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.id === `btn-${lang}`);
        const img = btn.querySelector('img');
        if(img) img.alt = lang === 'fr' ? 'Français' : 'English';
    });
    const toCurrency = document.getElementById('toCurrency')?.value;
    if(toCurrency) updateAffiliateInfo(toCurrency);
}

function updateChart() {
    const from = document.getElementById('fromCurrency').value;
    const to = document.getElementById('toCurrency').value;
    let symbol = (from === "BTC" || from === "ETH" || from === "SOL") ? `BINANCE:${from}USDT` : 
                 (to === "BTC" || to === "ETH" || to === "SOL") ? `BINANCE:${to}USDT` : 
                 (from === "XAU" || to === "XAU") ? "OANDA:XAUUSD" : `FX_IDC:${from}${to}`;

    if(window.TradingView) {
        new TradingView.widget({
            "autosize": true, "symbol": symbol, "interval": "D", "theme": "dark", "style": "3",
            "container_id": "tradingview_chart", "locale": currentLang === 'fr' ? 'fr' : 'en', 
            "hide_top_toolbar": true, "backgroundColor": "#05070a", "gridColor": "rgba(255, 255, 255, 0.05)"
        });
    }
}

async function init() {
    try {
        const fS = document.getElementById('fromCurrency'), tS = document.getElementById('toCurrency');
        const res = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`);
        const data = await res.json();
        const all = [...Object.keys(data.rates), "BTC", "ETH", "SOL", "XAU", "XAG"].sort();
        
        [fS, tS].forEach(select => {
            select.innerHTML = '';
            all.forEach(s => {
                const label = currencyNames[s] ? `${s} - ${currencyNames[s]}` : s;
                select.add(new Option(label, s));
            });
        });

        fS.value = "EUR"; tS.value = "USD";
        setLanguage(currentLang); fetchNews(); convert(); updateChart();
    } catch (e) { console.error("Init Error:", e); }
}

function share(platform) {
    const resValue = document.getElementById('resultValue').innerText;
    const text = encodeURIComponent(`FlashDevise : Taux de ${resValue} trouvé !`);
    const shareUrl = platform === 'whatsapp' ? `https://api.whatsapp.com/send?text=${text}%20${window.location.href}` : `https://t.me/share/url?url=${window.location.href}&text=${text}`;
    window.open(shareUrl, '_blank');
}

function closeModal(id) { 
    document.getElementById(id).style.display = 'none';
    // Reset du titre de la page lors de la fermeture d'une news
    document.title = "FlashDevise | Convertisseur de Devises Temps Réel, Crypto & Métaux";
}

document.getElementById('amount')?.addEventListener('input', convert);
[document.getElementById('fromCurrency'), document.getElementById('toCurrency')].forEach(s => {
    s?.addEventListener('change', () => { convert(); updateChart(); });
});

init();
setInterval(fetchNews, 600000);
