const fiats = ["EUR", "USD", "GBP", "MAD", "CAD", "CHF", "JPY", "AED"];
const cryptos = [
    {id:"bitcoin", symbol:"BTC"}, 
    {id:"ethereum", symbol:"ETH"}, 
    {id:"solana", symbol:"SOL"}
];

// REFORMULATION IA
function reformulate(title, source) {
    const variants = [
        `L'analyse de "${title}" via ${source} confirme une volatilité élevée sur les marchés ce trimestre.`,
        `Selon ${source}, l'actualité "${title}" pourrait impacter les taux de change à court terme.`,
        `Focus FlashDevise : "${title}" (${source}) incite les traders à la prudence technique.`
    ];
    return variants[Math.floor(Math.random() * variants.length)];
}

// NEWS + TICKER
async function fetchNews() {
    const container = document.getElementById('news-container');
    const ticker = document.getElementById('ticker');
    
    // Fallback news pour indexation immédiate
    const fallbacks = [
        { title: "Le marché des devises attend les chiffres de l'inflation", source: "EcoLive" },
        { title: "Bitcoin maintient son support stratégique", source: "CryptoPro" },
        { title: "L'Euro se stabilise face au dollar ce matin", source: "ForexNet" },
        { title: "Nouveaux records d'échanges sur le réseau Solana", source: "Web3" }
    ];

    const renderNews = (posts) => {
        container.innerHTML = posts.map(p => `
            <div class="glass p-6 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition">
                <span class="text-[8px] font-bold text-indigo-400 uppercase">${p.source.title || p.source}</span>
                <h4 class="text-[11px] font-bold mt-2 leading-tight h-8 overflow-hidden">${p.title}</h4>
                <p class="text-[10px] text-slate-500 mt-3 italic">${reformulate(p.title, p.source.title || p.source)}</p>
            </div>
        `).join('');
    };

    renderNews(fallbacks);

    try {
        const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://cryptopanic.com/api/v1/posts/?public=true')}`);
        const data = await res.json();
        const posts = JSON.parse(data.contents).results.slice(0, 4);
        renderNews(posts);
        ticker.innerText = posts.map(p => `${p.title.toUpperCase()} • `).join('');
    } catch (e) { console.log("Live News Offline"); }
}

// CONVERTISSEUR
async function convert() {
    const amount = parseFloat(document.getElementById('amount').value);
    const from = document.getElementById('fromCurrency').value;
    const to = document.getElementById('toCurrency').value;
    if (!amount) return;

    try {
        const res = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`);
        const data = await res.json();

        const getP = async (sym) => {
            const c = cryptos.find(i => i.symbol === sym);
            if(c) {
                const r = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${c.id}&vs_currencies=usd`);
                const d = await r.json(); return d[c.id].usd;
            }
            return 1 / data.rates[sym];
        };

        const rate = (await getP(from)) / (await getP(to));
        document.getElementById('baseText').innerText = `1 ${from} = ${rate.toFixed(4)} ${to}`;
        document.getElementById('resultValue').innerText = (amount * rate).toLocaleString(undefined, {maximumFractionDigits: 2}) + " " + to;
        document.getElementById('fee-bank').innerText = (amount * 0.035 + 5).toFixed(2) + " €";
        document.getElementById('fee-flash').innerText = (amount * 0.004).toFixed(2) + " €";
    } catch(e) {}
}

// PARTAGE
function share(platform) {
    const amount = document.getElementById('amount').value;
    const from = document.getElementById('fromCurrency').value;
    const result = document.getElementById('resultValue').innerText;
    const text = encodeURIComponent(`📊 FlashDevise 2026 :\nLe meilleur taux pour ${amount} ${from} est de ${result}.\n\nComparez ici : ${window.location.href}`);
    const url = platform === 'whatsapp' ? `https://api.whatsapp.com/send?text=${text}` : `https://t.me/share/url?url=${window.location.href}&text=${text}`;
    window.open(url, '_blank');
}

// GRAPHIQUE
function updateChart() {
    const from = document.getElementById('fromCurrency').value;
    const to = document.getElementById('toCurrency').value;
    new TradingView.widget({
        "autosize": true, "symbol": `FX_IDC:${from}${to}`, "interval": "D", "theme": "dark", "style": "3",
        "container_id": "tradingview_chart", "locale": "fr", "hide_top_toolbar": true
    });
}

function init() {
    const fS = document.getElementById('fromCurrency'), tS = document.getElementById('toCurrency');
    const all = [...fiats, ...cryptos.map(c => c.symbol)].sort();
    all.forEach(s => { fS.add(new Option(s, s)); tS.add(new Option(s, s)); });
    fS.value = "EUR"; tS.value = "USD";
    fetchNews(); convert(); updateChart();
}

document.getElementById('amount').addEventListener('input', convert);
[document.getElementById('fromCurrency'), document.getElementById('toCurrency')].forEach(s => s.addEventListener('change', () => { convert(); updateChart(); }));
init();
setInterval(fetchNews, 600000);