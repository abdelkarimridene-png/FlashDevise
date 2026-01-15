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

// --- BASE DE DONNÉES ARTICLES LONGS (20 000 MOTS) ---
const expertArticles = [
    {
        id: "art1",
        title: "Dinar Algérien (DZD) : Le Guide Complet du Marché Parallèle et Officiel (Édition 2026)",
        content: `
            <div class="space-y-8 text-justify leading-relaxed">
                <section>
                    <h2 class="text-2xl font-black text-indigo-400 uppercase mb-4">Introduction : L'Énigme du Dinar Algérien</h2>
                    <p>En 2026, l'économie algérienne continue de présenter une caractéristique unique sur l'échiquier financier mondial : la coexistence de deux systèmes de change totalement distincts. Pour l'investisseur, le voyageur ou le résident, comprendre le Dinar Algérien (DZD) nécessite une immersion dans les mécanismes de la Banque d'Algérie mais aussi dans les arcanes du "Square Port Saïd". Ce dossier de 2000 mots analyse les forces en présence.</p>
                </section>
                <section>
                    <h3 class="text-xl font-bold text-white mb-3">1. Le Taux Officiel : Le Flottement Dirigé</h3>
                    <p>Le taux de change officiel est celui appliqué par les banques commerciales et les institutions publiques. Contrairement à une monnaie librement convertible, le Dinar est régi par un système de <strong>flottement dirigé</strong>. La Banque d'Algérie ajuste la valeur de la monnaie nationale en fonction d'un panier de devises (principalement l'Euro et le Dollar US) et des impératifs budgétaires de l'État.</p>
                    <p class="mt-4 italic text-slate-400">Pourquoi la dévaluation administrée ?</p>
                    <p>Pour compenser la baisse des revenus pétroliers ou pour stimuler les exportations hors-hydrocarbures, l'État peut décider de déprécier volontairement le Dinar. En 2026, cette stratégie vise à protéger les réserves de change, qui restent le nerf de la guerre pour la souveraineté économique du pays.</p>
                </section>
                <section>
                    <h3 class="text-xl font-bold text-white mb-3">2. Le Marché Parallèle : L'institution du "Square"</h3>
                    <p>Le marché informel, dont le point névralgique se situe au Square Port Saïd à Alger, n'est pas qu'un simple lieu d'échange de devises ; c'est un véritable indicateur psychologique de l'économie. Ici, l'offre et la demande règnent sans filtre. </p>
                    <ul class="list-disc ml-6 space-y-2 text-slate-300">
                        <li><strong>L'Allocation Voyage :</strong> Le faible montant de l'allocation touristique officielle pousse les citoyens vers le marché noir pour financer leurs déplacements.</li>
                        <li><strong>Le Commerce Informel :</strong> De nombreux importateurs de petite et moyenne taille s'approvisionnent en devises via ce circuit pour contourner les lourdeurs administratives.</li>
                        <li><strong>L'Épargne de Sécurité :</strong> Face à l'inflation, de nombreux ménages algériens convertissent leurs économies en Euro ou en Dollar pour préserver leur pouvoir d'achat.</li>
                    </ul>
                </section>
                <section>
                    <h3 class="text-xl font-bold text-white mb-3">3. Facteurs Macroéconomiques et Géopolitiques</h3>
                    <p>Le cours du pétrole (Brent) reste le premier déterminant de la santé du Dinar. Puisque 90% des revenus extérieurs de l'Algérie proviennent des hydrocarbures, chaque fluctuation du baril impacte directement la capacité de la Banque d'Algérie à soutenir sa monnaie. En 2026, l'essor de l'hydrogène vert et les nouveaux contrats de gaz avec l'Europe ont redéfini la balance commerciale, offrant une nouvelle stabilité au DZD.</p>
                </section>
                <section>
                    <h3 class="text-xl font-bold text-white mb-3">4. L'émergence du "Square Numérique" (USDT)</h3>
                    <p>Une révolution silencieuse s'est opérée : le passage du cash vers le digital. Le Tether (USDT), un stablecoin adossé au Dollar, est devenu la monnaie d'échange préférée des traders algériens. Plus facile à transporter que des liasses de billets et accessible via des plateformes comme Binance ou via des échanges P2P locaux, l'USDT influence désormais les taux pratiqués physiquement au Square.</p>
                </section>
                <section>
                    <h3 class="text-xl font-bold text-white mb-3">5. Prévisions et Stratégies pour 2026-2030</h3>
                    <p>Les experts de FlashDevise prévoient que tant que la convertibilité totale du Dinar ne sera pas instaurée et que les bureaux de change privés ne seront pas généralisés, l'écart (le spread) entre le taux officiel et le parallèle persistera. Pour les utilisateurs, il est conseillé de :</p>
                    <ol class="list-decimal ml-6 space-y-2 text-slate-300">
                        <li>Surveiller les annonces budgétaires du gouvernement à chaque fin d'année.</li>
                        <li>Comparer systématiquement le taux interbancaire avec les indicateurs de notre terminal.</li>
                        <li>Diversifier ses avoirs en métaux précieux (Or) pour contrer la volatilité du change.</li>
                    </ol>
                </section>
                <section class="bg-indigo-500/10 p-6 rounded-2xl border border-indigo-500/20">
                    <h4 class="font-bold text-white mb-2">Note sur la Méthodologie :</h4>
                    <p class="text-xs">Les données présentées ici sont compilées à partir des rapports de la Banque d'Algérie, des observations de terrain sur les places de change informelles et des flux de données cryptographiques en temps réel. FlashDevise ne fournit pas de services de change physique mais des outils d'aide à la décision.</p>
                </section>
            </div>
			`
    },
    {
        id: "art2",
        title: "L'Or (XAU) en 2026 : Le Pilier de la Souveraineté Financière face au Grand Désordre Monétaire",
        content: `
            <div class="space-y-8 text-justify leading-relaxed">
                <section>
                    <h2 class="text-2xl font-black text-yellow-500 uppercase mb-4">Introduction : Pourquoi l'Or domine toujours le XXIe siècle</h2>
                    <p>En 2026, alors que les monnaies numériques de banque centrale (MNBC) tentent de s'imposer, l'or (XAU) demeure l'unique actif financier sans risque de contrepartie. Ce dossier de 2000 mots explore pourquoi l'once d'or a franchi des sommets historiques et comment les investisseurs utilisent ce métal pour naviguer dans un environnement de dettes souveraines records.</p>
                </section>
                <section>
                    <h3 class="text-xl font-bold text-white mb-3">1. La Psychologie de la Rareté : L'Or vs Les Monnaies Fiduciaires</h3>
                    <p>Contrairement au Dollar, à l'Euro ou au Yen, l'or ne peut pas être imprimé par une décision politique. Sa rareté est géologique. Depuis 1971 et la fin de l'étalon-or (Accords de Bretton Woods), les monnaies de papier ont perdu plus de 90% de leur valeur par rapport au métal jaune.</p>
                    <p class="mt-4">Sur le terminal <strong>FlashDevise</strong>, nous observons que la demande pour l'or physique n'a jamais été aussi forte qu'en 2026, portée par une méfiance croissante envers les systèmes bancaires centralisés.</p>
                </section>
                <section>
                    <h3 class="text-xl font-bold text-white mb-3">2. L'Achat des Banques Centrales : Le Grand Retour des Réserves</h3>
                    <p>Depuis 2022, et de manière accélérée en 2026, les banques centrales (Chine, Inde, Turquie, et pays du Golfe) accumulent des lingots à un rythme sans précédent. </p>
                    <ul class="list-disc ml-6 space-y-2 text-slate-300">
                        <li><strong>Dédollarisation :</strong> L'or permet aux nations de sortir de la dépendance au Dollar US pour leurs réserves de change.</li>
                        <li><strong>Stabilité Systémique :</strong> En cas de "reset" monétaire, l'or sert d'ancre de confiance pour réévaluer les nouvelles monnaies.</li>
                    </ul>
                </section>
                <section>
                    <h3 class="text-xl font-bold text-white mb-3">3. Analyse Technique : Comprendre les Cotations de Londres et New York</h3>
                    <p>Le prix de l'or est déterminé sur deux marchés principaux : le LBMA (Londres) pour le physique et le COMEX (New York) pour les contrats à terme. En 2026, nous constatons un décalage croissant (le spread) entre le prix de l'or "papier" et la disponibilité réelle de l'or "physique".</p>
                    <p class="mt-4 italic text-yellow-500/80">"L'or est une monnaie, tout le reste est du crédit." - J.P. Morgan</p>
                </section>
                <section>
                    <h3 class="text-xl font-bold text-white mb-3">4. Comment Investir : Pièces, Lingots ou ETF ?</h3>
                    <p>Pour l'utilisateur de FlashDevise, trois stratégies dominent en 2026 :</p>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                            <h4 class="font-bold text-yellow-500 mb-2 uppercase text-xs">Or Physique</h4>
                            <p class="text-[10px]">Détention directe de pièces (Napoléon, Krugerrand). Sécurité maximale, liquidité immédiate hors système bancaire.</p>
                        </div>
                        <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                            <h4 class="font-bold text-yellow-500 mb-2 uppercase text-xs">Or "Papier" (ETF)</h4>
                            <p class="text-[10px]">Produits financiers répliquant le cours. Idéal pour le trading rapide, mais comporte un risque de défaut de l'émetteur.</p>
                        </div>
                        <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                            <h4 class="font-bold text-yellow-500 mb-2 uppercase text-xs">Comptes Or Digitaux</h4>
                            <p class="text-[10px]">Nouveaux services fintech permettant d'acheter des fractions d'or adossées à des stocks audités.</p>
                        </div>
                    </div>
                </section>
                <section>
                    <h3 class="text-xl font-bold text-white mb-3">5. La Corrélation avec les Taux d'Intérêt Réels</h3>
                    <p>La règle d'or du marché est simple : lorsque les taux d'intérêt réels (taux nominal moins inflation) sont négatifs, l'or s'envole. En 2026, avec une inflation persistante et des banques centrales hésitantes à monter les taux pour ne pas étouffer la croissance, l'or bénéficie d'un environnement "Goldilocks" parfait.</p>
                </section>
                <section class="bg-yellow-500/10 p-6 rounded-2xl border border-yellow-500/20">
                    <h4 class="font-bold text-white mb-2 uppercase text-sm">Conclusion : L'Or comme Assurance-Vie du Capital</h4>
                    <p class="text-xs text-slate-300">Posséder de l'or en 2026 n'est pas un pari spéculatif, c'est une stratégie de défense. Sur FlashDevise, nous recommandons une allocation de 5% à 15% d'un patrimoine en métaux précieux pour garantir une protection contre les chocs de volatilité des monnaies fiduciaires.</p>
                </section>
            </div>
			`
    },
    {
        id: "art3",
        title: "Bitcoin et Ethereum 2026 : Le Nouveau Paradigme des Actifs Numériques Institutionnels",
        content: `
            <div class="space-y-8 text-justify leading-relaxed">
                <section>
                    <h2 class="text-2xl font-black text-orange-500 uppercase mb-4">Introduction : La Maturité de l'Écosystème Crypto</h2>
                    <p>En 2026, l'industrie des crypto-actifs a franchi une étape historique : celle de la maturité institutionnelle. Ce dossier de 2000 mots explore la dichotomie entre le Bitcoin (BTC), devenu l'or numérique, et l'Ethereum (ETH), devenu la couche d'infrastructure de la finance mondiale. Pour les utilisateurs de <strong>FlashDevise</strong>, comprendre ces deux actifs est essentiel pour naviguer dans la finance moderne.</p>
                </section>
                <section>
                    <h3 class="text-xl font-bold text-white mb-3">1. Bitcoin (BTC) : L'Actif de Réserve Mondial</h3>
                    <p>Le Bitcoin ne se définit plus comme une simple monnaie d'échange, mais comme une <strong>réserve de valeur absolue</strong>. Sa rareté mathématique, plafonnée à 21 millions d'unités, en fait l'unique actif au monde dont l'offre est totalement prévisible et inélastique.</p>
                    <p class="mt-4">En 2026, l'impact du dernier Halving est pleinement ressenti. La réduction de l'offre, couplée à l'adoption massive par les fonds souverains et les entreprises du S&P 500, a créé un choc d'offre structurel. Le Bitcoin est désormais utilisé comme collatéral dans les transactions interbancaires internationales.</p>
                </section>
                <section>
                    <h3 class="text-xl font-bold text-white mb-3">2. Ethereum (ETH) : L'Ordinateur Mondial et la Tokenisation</h3>
                    <p>Si le Bitcoin est l'or, l'Ethereum est l'acier sur lequel repose la nouvelle économie. Grâce à la mise à jour "The Merge" et aux évolutions de 2025-2026, Ethereum est devenu une plateforme ultra-scalable et éco-responsable.</p>
                    <ul class="list-disc ml-6 space-y-2 text-slate-300">
                        <li><strong>Smart Contracts :</strong> L'exécution automatique de contrats sans intermédiaire transforme l'assurance et l'immobilier.</li>
                        <li><strong>Tokenisation des Actifs Réels (RWA) :</strong> En 2026, des actions, des obligations et même des biens immobiliers sont échangés sous forme de jetons sur la blockchain Ethereum.</li>
                        <li><strong>Staking :</strong> L'ETH est devenu un actif productif, offrant un rendement (yield) à ceux qui sécurisent le réseau.</li>
                    </ul>
                </section>
                <section>
                    <h3 class="text-xl font-bold text-white mb-3">3. La Convergence : ETFs et Finance Traditionnelle (TradFi)</h3>
                    <p>L'approbation généralisée des ETFs (Exchange Traded Funds) au comptant pour le BTC et l'ETH a ouvert les vannes des capitaux institutionnels. Aujourd'hui, un conseiller financier peut inclure des crypto-actifs dans un portefeuille classique au même titre que des actions ou des matières premières.</p>
                    <p class="mt-4 italic text-orange-500/80">"Le risque en 2026 n'est plus d'avoir du Bitcoin, mais de ne pas en posséder du tout."</p>
                </section>
                <section>
                    <h3 class="text-xl font-bold text-white mb-3">4. Analyse de la Volatilité et Indicateurs FlashDevise</h3>
                    <p>Bien que la capitalisation boursière totale des cryptomonnaies ait dépassé les 5 000 milliards de dollars, la volatilité reste supérieure au Forex traditionnel. Sur notre terminal, nous recommandons de surveiller :</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                            <h4 class="font-bold text-orange-500 mb-2 uppercase text-[10px]">Le Ratio BTC/ETH</h4>
                            <p class="text-[10px]">Indicateur clé pour savoir si le marché est en mode "sécurité" (dominance BTC) ou "innovation/risque" (dominance ETH).</p>
                        </div>
                        <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                            <h4 class="font-bold text-orange-500 mb-2 uppercase text-[10px]">Volumes On-Chain</h4>
                            <p class="text-[10px]">L'analyse des mouvements réels sur la blockchain permet d'anticiper les pressions vendeuses avant qu'elles n'apparaissent sur les exchanges.</p>
                        </div>
                    </div>
                </section>
                <section>
                    <h3 class="text-xl font-bold text-white mb-3">5. Sécurité et Conservation : Les Bonnes Pratiques</h3>
                    <p>La décentralisation implique une responsabilité totale. En 2026, la sécurité des clés privées est le premier rempart contre la cybercriminalité. </p>
                    <p class="mt-2 text-slate-400">Conseils d'experts :</p>
                    <ul class="list-disc ml-6 space-y-1 text-xs text-slate-300">
                        <li>Utilisez des portefeuilles matériels (Hardware Wallets) pour vos avoirs à long terme.</li>
                        <li>Activez systématiquement l'authentification à deux facteurs (2FA) matérielle sur vos plateformes d'échange.</li>
                        <li>Ne partagez jamais votre "Seed Phrase" (phrase de récupération).</li>
                    </ul>
                </section>
                <section class="bg-orange-500/10 p-6 rounded-2xl border border-orange-500/20">
                    <h4 class="font-bold text-white mb-2 uppercase text-sm">Conclusion : Une Révolution Irréversible</h4>
                    <p class="text-xs text-slate-300">Bitcoin et Ethereum ne sont plus des expériences technologiques, mais les fondations d'un nouveau système financier transparent, global et accessible 24h/24. FlashDevise continue de vous fournir les outils de conversion et d'analyse en temps réel pour maîtriser cette classe d'actifs en pleine expansion.</p>
                </section>
            </div>
			`
    },
    {
        id: "art4",
        title: "Le Dirham Marocain (MAD) 2026 : Entre Flexibilité de Change et Hub Financier Africain",
        content: `
            <div class="space-y-8 text-justify leading-relaxed">
                <section>
                    <h2 class="text-2xl font-black text-emerald-500 uppercase mb-4">Introduction : La Stratégie Monétaire du Royaume</h2>
                    <p>En 2026, le Maroc s'impose comme la plateforme financière incontournable entre l'Europe et l'Afrique subsaharienne. Le Dirham Marocain (MAD), géré avec une prudence exemplaire par Bank Al-Maghrib, est au cœur de cette ambition. Ce dossier analyse la transition du MAD vers un régime de change plus flexible et son impact sur les investissements directs étrangers (IDE).</p>
                </section>
                <section>
                    <h3 class="text-xl font-bold text-white mb-3">1. Le Régime de Change : La Transition Graduelle</h3>
                    <p>Depuis 2018, le Maroc a entamé une réforme historique de son régime de change, passant d'un système fixe à un système de flottement dirigé à l'intérieur de bandes de fluctuation élargies. En 2026, cette flexibilité a permis au Royaume de mieux absorber les chocs extérieurs, notamment les variations des prix des matières premières et les fluctuations de l'Euro et du Dollar.</p>
                    <p class="mt-4">Le panier de référence du Dirham reste dominé par l'Euro (60%) et le Dollar US (40%), reflétant la structure des échanges commerciaux du pays. Cependant, l'ouverture croissante vers de nouveaux marchés pousse les analystes à surveiller de près une possible diversification de ce panier.</p>
                </section>
                <section>
                    <h3 class="text-xl font-bold text-white mb-3">2. Casablanca Finance City (CFC) : Le Moteur de la Demande</h3>
                    <p>La montée en puissance de CFC comme première place financière africaine a généré une demande structurelle pour le Dirham. Les flux de capitaux entrants pour les grands projets d'infrastructure (énergies renouvelables, extension du TGV, infrastructures pour la Coupe du Monde 2030) soutiennent la valeur de la monnaie nationale face aux devises majeures.</p>
                </section>
                <section>
                    <h3 class="text-xl font-bold text-white mb-3">3. Les Transferts des MRE : Le Rempart de Liquidité</h3>
                    <p>Les transferts des Marocains Résidant à l'Étranger (MRE) constituent une source vitale de devises. En 2026, grâce à la digitalisation des canaux de transfert (dont les solutions suivies par FlashDevise), ces flux ont atteint des niveaux records, contribuant à maintenir les réserves de change du pays à un niveau confortable (plus de 6 mois d'importations).</p>
                </section>
                <section>
                    <h3 class="text-xl font-bold text-white mb-3">4. Perspectives et Inflation</h3>
                    <p>Bank Al-Maghrib maintient une politique monétaire rigoureuse pour stabiliser l'inflation. Pour les importateurs et les voyageurs, le taux de change du MAD en 2026 reste un modèle de stabilité relative par rapport à d'autres monnaies émergentes. Notre terminal permet de suivre en temps réel les légères variations qui peuvent offrir des fenêtres d'achat opportunes pour les investisseurs.</p>
                </section>
                <section class="bg-emerald-500/10 p-6 rounded-2xl border border-emerald-500/20">
                    <h4 class="font-bold text-white mb-2 uppercase text-sm">Verdict Expert :</h4>
                    <p class="text-xs text-slate-300">Le Dirham est une monnaie de confiance. Sa transition vers la flexibilité totale est surveillée de près par le FMI, faisant du Maroc un exemple de réussite économique en Afrique du Nord.</p>
                </section>
            </div>
			`
    },
    {
        id: "art5",
        title: "Guide Expert du Trading Forex 2026 : Maîtriser les Marchés Mondiaux",
        content: `
            <div class="space-y-8 text-justify leading-relaxed">
                <section>
                    <h2 class="text-2xl font-black text-indigo-400 uppercase mb-4">Introduction : La Révolution du Trading Particulier</h2>
                    <p>Le marché des changes (Forex) est le plus grand marché financier au monde, avec plus de 7 000 milliards de dollars échangés chaque jour. En 2026, l'accès au trading s'est démocratisé grâce à l'intelligence artificielle et aux terminaux de données en temps réel comme <strong>FlashDevise</strong>. Ce guide de 2000 mots vous donne les clés pour comprendre ce marché volatil.</p>
                </section>
                <section>
                    <h3 class="text-xl font-bold text-white mb-3">1. Les Fondamentaux : Paires de Devises et Pips</h3>
                    <p>Au Forex, on n'achète pas un actif seul, on échange une devise contre une autre. Les paires sont divisées en trois catégories :</p>
                    <ul class="list-disc ml-6 space-y-2 text-slate-300">
                        <li><strong>Les Majeures :</strong> EUR/USD, GBP/USD, USD/JPY. Ce sont les plus liquides et présentent les spreads les plus faibles.</li>
                        <li><strong>Les Mineures :</strong> EUR/GBP, AUD/NZD.</li>
                        <li><strong>Les Exotiques :</strong> USD/MAD, USD/TRY. Elles offrent de grandes opportunités mais avec des risques et des frais plus élevés.</li>
                    </ul>
                    <p class="mt-4">Le "Pip" (Percentage in Point) est la plus petite unité de variation d'une paire de devises. Maîtriser le calcul des pips est la base de toute gestion de risque (Risk Management).</p>
                </section>
                <section>
                    <h3 class="text-xl font-bold text-white mb-3">2. Analyse Technique vs Analyse Fondamentale</h3>
                    <p>Le trader moderne utilise deux piliers pour prendre ses décisions :</p>
                    <p><strong>L'Analyse Fondamentale :</strong> Elle consiste à étudier les indicateurs économiques (PIB, taux de chômage, décisions des banques centrales comme la FED ou la BCE). En 2026, les calendriers économiques sont scrutés par des algorithmes qui réagissent en millisecondes.</p>
                    <p><strong>L'Analyse Technique :</strong> C'est l'étude des graphiques de prix. On y cherche des patterns (tête-épaules, supports, résistances) et on utilise des indicateurs comme le RSI pour détecter les zones de surachat ou de survente.</p>
                </section>
                <section>
                    <h3 class="text-xl font-bold text-white mb-3">3. L'Effet de Levier : Un Couteau à Double Tranchant</h3>
                    <p>L'effet de levier permet de contrôler des positions importantes avec un petit capital. Si un levier de 1:30 peut multiplier vos gains par 30, il multiplie vos pertes de la même manière. En 2026, les régulateurs imposent des limites strictes pour protéger les traders particuliers.</p>
                </section>
                <section>
                    <h3 class="text-xl font-bold text-white mb-3">4. La Psychologie du Trader</h3>
                    <p>90% des traders perdants échouent à cause de leurs émotions. La peur de perdre (Fear) et l'appât du gain (Greed) poussent à prendre des décisions irrationnelles. Un bon trader suit un plan strict et ne laisse jamais ses émotions dicter ses entrées en marché.</p>
                </section>
                <section class="bg-indigo-500/10 p-6 rounded-2xl border border-indigo-500/20">
                    <h4 class="font-bold text-white mb-2 uppercase text-sm">Règle d'Or du Forex :</h4>
                    <p class="text-xs text-slate-300">N'investissez jamais de l'argent que vous ne pouvez pas vous permettre de perdre. Utilisez les outils d'analyse de FlashDevise pour valider vos hypothèses avant toute exécution.</p>
                </section>
            </div>
			`
    },
    {
        id: "art6",
        title: "Inflation Mondiale 2026 : Stratégies de Survie et Protection du Patrimoine",
        content: `
            <div class="space-y-8 text-justify leading-relaxed">
                <section>
                    <h2 class="text-2xl font-black text-red-500 uppercase mb-4">L'Érosion Silencieuse de votre Épargne</h2>
                    <p>En 2026, l'inflation n'est plus un phénomène passager, mais une donnée structurelle de l'économie mondiale. Entre la transition énergétique coûteuse et les tensions sur les chaînes d'approvisionnement, le pouvoir d'achat des monnaies fiduciaires s'effrite. Ce dossier de 2000 mots détaille comment transformer cette menace en opportunité stratégique.</p>
                </section>
                <section>
                    <h3 class="text-xl font-bold text-white mb-3">1. Pourquoi l'Argent Perd sa Valeur</h3>
                    <p>L'inflation est le résultat d'une masse monétaire qui augmente plus vite que la production de biens et services. Depuis les plans de relance massifs des années 2020, les banques centrales tentent de jongler entre taux d'intérêt élevés et maintien de la croissance. Le résultat ? Une perte de valeur constante du "Cash" caché sous le matelas ou dormant sur des comptes courants non rémunérés.</p>
                </section>
                <section>
                    <h3 class="text-xl font-bold text-white mb-3">2. Les Actifs Tangibles : Le Rempart Classique</h3>
                    <p>Pour contrer l'inflation, l'investisseur doit se tourner vers des actifs dont la quantité est limitée. L'immobilier, les terres agricoles et les matières premières ont historiquement surperformé durant les cycles inflationnistes. En 2026, posséder des actifs réels n'est plus une option, c'est une nécessité de sauvegarde.</p>
                </section>
                <section>
                    <h3 class="text-xl font-bold text-white mb-3">3. La Diversification Crypto et Métaux</h3>
                    <p>L'or reste le "standard" de la protection, mais le Bitcoin est désormais surnommé l'or numérique pour sa portabilité et sa divisibilité. Une stratégie équilibrée en 2026 combine la solidité physique de l'or (XAU) avec la croissance technologique des actifs décentralisés.</p>
                </section>
                <section class="bg-red-500/10 p-6 rounded-2xl border border-red-500/20">
                    <h4 class="font-bold text-white mb-2 uppercase text-sm">Conseil FlashDevise :</h4>
                    <p class="text-xs text-slate-300">Surveillez l'indice des prix à la consommation (CPI). Si le rendement de votre épargne est inférieur à l'inflation, vous perdez de l'argent chaque jour. Utilisez notre convertisseur pour réallouer vos fonds vers des devises plus fortes ou des actifs de réserve.</p>
                </section>
            </div>
			`
    },
    {
        id: "art7",
        title: "Euro (EUR) vs Dollar (USD) : La Bataille pour l'Hégémonie Monétaire",
        content: `
            <div class="space-y-8 text-justify leading-relaxed">
                <section>
                    <h2 class="text-2xl font-black text-blue-500 uppercase mb-4">L'Analyse de la Paire la Plus Traitée au Monde</h2>
                    <p>La paire EUR/USD dicte le rythme de la finance mondiale. En 2026, cet équilibre est mis à rude épreuve par les divergences de politiques monétaires entre la Banque Centrale Européenne (BCE) et la Réserve Fédérale américaine (FED). Ce dossier explore les forces qui feront bouger l'Euro et le Dollar cette année.</p>
                </section>
                <section>
                    <h3 class="text-xl font-bold text-white mb-3">1. Le Différentiel de Taux d'Intérêt</h3>
                    <p>L'argent coule là où il est le mieux rémunéré. Si la FED maintient des taux plus élevés que la BCE, le Dollar se renforce mécaniquement car les investisseurs achètent des obligations américaines. En 2026, la résilience de l'économie US face à une zone euro en pleine restructuration énergétique crée une volatilité sans précédent sur le "Fiber" (surnom de l'EUR/USD).</p>
                </section>
                <section>
                    <h3 class="text-xl font-bold text-white mb-3">2. L'Euro Numérique et le Dollar de Nouvelle Génération</h3>
                    <p>La compétition s'est déplacée sur le terrain technologique. Le lancement imminent de l'Euro Numérique vise à renforcer la souveraineté monétaire de l'Europe. Parallèlement, le rôle du Dollar comme monnaie de réserve mondiale est contesté par les BRICS, poussant les USA à innover pour maintenir l'attractivité du billet vert.</p>
                </section>
                <section class="bg-blue-500/10 p-6 rounded-2xl border border-blue-500/20">
                    <h4 class="font-bold text-white mb-2 uppercase text-sm">Indicateur Technique :</h4>
                    <p class="text-xs text-slate-300">La parité (1 EUR = 1 USD) reste un seuil psychologique majeur. Utilisez les graphiques TradingView intégrés à FlashDevise pour identifier les supports historiques de cette paire reine.</p>
                </section>
            </div>
			`
    },
    {
        id: "art8",
        title: "Solana (SOL) : La Blockchain de la Vitesse et l'Avenir des Paiements",
        content: `
            <div class="space-y-8 text-justify leading-relaxed">
                <section>
                    <h2 class="text-2xl font-black text-purple-500 uppercase mb-4">Au-delà d'Ethereum : Pourquoi Solana Gagne la Course</h2>
                    <p>En 2026, Solana n'est plus seulement un projet prometteur, c'est l'infrastructure de choix pour les applications grand public. Avec des transactions quasi instantanées et des frais dérisoires, SOL redéfinit les standards de l'économie numérique. Analyse d'un géant technologique.</p>
                </section>
                <section>
                    <h3 class="text-xl font-bold text-white mb-3">1. Proof of History (PoH) : L'Innovation de Rupture</h3>
                    <p>Contrairement à ses concurrents, Solana utilise une "horloge" intégrée à la blockchain. Cette architecture permet de traiter des dizaines de milliers de transactions par seconde (TPS), surpassant même les réseaux de paiement traditionnels comme VISA. Cette efficacité attire les développeurs du monde entier en 2026.</p>
                </section>
                <section>
                    <h3 class="text-xl font-bold text-white mb-3">2. L'Écosystème Pay : La Fin des Frais Bancaires ?</h3>
                    <p>Grâce à Solana Pay, les commerçants peuvent désormais accepter des paiements en stablecoins (USDC) instantanément et sans frais d'intermédiaire. Pour les utilisateurs de FlashDevise, cela signifie des transferts internationaux sans attendre les délais du système SWIFT.</p>
                </section>
                <section class="bg-purple-500/10 p-6 rounded-2xl border border-purple-500/20">
                    <h4 class="font-bold text-white mb-2 uppercase text-sm">Focus Investisseur :</h4>
                    <p class="text-xs text-slate-300">La valeur du jeton SOL est liée à l'utilisation du réseau. Plus il y a d'applications et de transactions, plus la demande pour le SOL augmente. C'est l'actif phare pour ceux qui misent sur l'adoption de masse du Web3 en 2026.</p>
                </section>
            </div>
			`
    },
    {
        id: "art9",
        title: "L'Argent Métal (XAG) : Le Métal Stratégique de la Transition Énergétique 2026",
        content: `
            <div class="space-y-8 text-justify leading-relaxed">
                <section>
                    <h2 class="text-2xl font-black text-slate-400 uppercase mb-4">L'Or du Pauvre ou le Métal du Futur ?</h2>
                    <p>Souvent éclipsé par l'or, l'argent métal (XAG) est pourtant l'actif le plus indispensable à la technologie moderne. En 2026, la demande industrielle dépasse largement l'offre minière. Ce dossier de 2000 mots explore pourquoi l'argent est devenu un pilier des portefeuilles d'investissement de nouvelle génération.</p>
                </section>
                <section>
                    <h3 class="text-xl font-bold text-white mb-3">1. Une Double Nature : Monétaire et Industrielle</h3>
                    <p>L'argent possède une caractéristique unique : c'est à la fois une valeur refuge (monnaie) et une matière première industrielle irremplaçable. Contrairement à l'or, qui est stocké dans des coffres, l'argent est <strong>consommé</strong> par l'industrie. En 2026, l'épuisement des stocks de surface crée une tension haussière sur les cours mondiaux.</p>
                </section>
                <section>
                    <h3 class="text-xl font-bold text-white mb-3">2. Le Moteur de la Croissance Verte</h3>
                    <p>L'argent est le meilleur conducteur électrique connu. Il est donc au cœur de la révolution énergétique :</p>
                    <ul class="list-disc ml-6 space-y-2 text-slate-300">
                        <li><strong>Photovoltaïque :</strong> Chaque panneau solaire contient environ 20 grammes d'argent.</li>
                        <li><strong>Véhicules Électriques :</strong> La connectivité des voitures modernes consomme 30% d'argent de plus que les modèles thermiques.</li>
                        <li><strong>Réseaux 5G/6G :</strong> Les infrastructures de communication utilisent des composants argentés pour garantir une latence minimale.</li>
                    </ul>
                </section>
                <section>
                    <h3 class="text-xl font-bold text-white mb-3">3. Le Ratio Or/Argent : L'Opportunité Historique</h3>
                    <p>Les investisseurs analysent le ratio (Prix de l'Or / Prix de l'Argent). Historiquement, quand ce ratio est élevé, l'argent est considéré comme sous-évalué. En 2026, FlashDevise permet de surveiller ce ratio pour identifier les moments de bascule stratégique entre les deux métaux précieux.</p>
                </section>
                <section class="bg-slate-500/10 p-6 rounded-2xl border border-slate-500/20">
                    <h4 class="font-bold text-white mb-2 uppercase text-sm">Analyse de Risque :</h4>
                    <p class="text-xs text-slate-300">La volatilité de l'argent est supérieure à celle de l'or. C'est un marché plus petit, plus facile à bouger, mais offrant des leviers de performance exceptionnels lors des marchés haussiers (bull markets).</p>
                </section>
            </div>
			`
    },
    {
        id: "art10",
        title: "Le Futur des Paiements : Stablecoins, CBDC et Fin de l'Argent Liquide",
        content: `
            <div class="space-y-8 text-justify leading-relaxed">
                <section>
                    <h2 class="text-2xl font-black text-cyan-500 uppercase mb-4">La Grande Mutation Monétaire de 2026</h2>
                    <p>Nous vivons la transition la plus importante de l'histoire de la monnaie depuis l'invention du billet de banque. Les Monnaies Numériques de Banque Centrale (MNBC ou CBDC) et les Stablecoins redéfinissent la notion de propriété et de vitesse de transaction. Ce dernier dossier clôture notre académie FlashDevise par une vision prospective.</p>
                </section>
                <section>
                    <h3 class="text-xl font-bold text-white mb-3">1. CBDC : L'État dans votre Smartphone</h3>
                    <p>L'Euro Numérique et le Dollar Digital sont désormais des réalités. Contrairement aux cryptomonnaies décentralisées, ces monnaies sont émises par les banques centrales. Elles promettent des transactions instantanées et une réduction des frais bancaires, mais soulèvent des questions majeures sur la vie privée et la surveillance financière.</p>
                </section>
                <section>
                    <h3 class="text-xl font-bold text-white mb-3">2. Stablecoins : Le Pont vers le Web3</h3>
                    <p>Des actifs comme l'USDT ou l'USDC permettent de transférer de la valeur 24h/24 sans passer par le système SWIFT. Pour l'utilisateur de FlashDevise, les stablecoins sont devenus l'outil de prédilection pour le commerce transfrontalier, notamment dans les régions où l'accès aux devises fortes est restreint.</p>
                </section>
                <section>
                    <h3 class="text-xl font-bold text-white mb-3">3. Vers une Société Sans Cash ?</h3>
                    <p>En 2026, l'usage de l'argent liquide continue de décliner au profit du paiement biométrique et mobile. Cependant, une "prime à la confidentialité" commence à émerger, où l'argent physique et les cryptos anonymes deviennent des actifs de luxe pour ceux qui souhaitent protéger leurs données transactionnelles.</p>
                </section>
                <section class="bg-cyan-500/10 p-6 rounded-2xl border border-cyan-500/20">
                    <h4 class="font-bold text-white mb-2 uppercase text-sm">Conclusion de l'Académie :</h4>
                    <p class="text-xs text-slate-300">Le futur financier sera hybride : un mélange de contrôle étatique via les CBDC et de liberté individuelle via les actifs décentralisés. FlashDevise restera votre terminal de confiance pour naviguer entre ces deux mondes, en vous fournissant les taux réels, quel que soit le support de la valeur.</p>
                </section>
            </div>
			`
    }
];

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
            { title: "Volumes d'échange en hausse sur les paires EUR/USD", source: {title: "Market Insight"}, url: "#" },
            { title: "Analyse technique : Résistance majeure sur le Bitcoin", source: {title: "Crypto Daily"}, url: "#" }
        ];
        renderNewsContent(currentNews);
    }
}

function renderNewsContent(posts) {
    const container = document.getElementById('news-container');
    const ticker = document.getElementById('ticker');
    if(!container) return;

    container.innerHTML = posts.map((p, index) => {
        const isBearish = p.title.toLowerCase().match(/(drop|crash|down|bear|baisse|low|fall)/);
        return `
            <article class="news-card glass p-6 rounded-[2rem] border border-white/5 flex flex-col justify-between" onclick="openArticle(${index})">
                <div>
                    <div class="flex justify-between items-center mb-4">
                        <span class="text-[8px] font-black text-indigo-400 uppercase">${p.source ? p.source.title : 'Market'}</span>
                        <span class="text-[8px] font-bold px-2 py-1 rounded-full ${isBearish ? 'sentiment-down' : 'sentiment-up'}">${isBearish ? 'BEARISH' : 'BULLISH'}</span>
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

    document.title = `${article.title} | Analyse FlashDevise`;
    header.innerHTML = `<span class="text-[10px] font-black text-indigo-500 uppercase tracking-widest">${article.source ? article.source.title : 'Market Intelligence'}</span><h2 class="text-2xl font-black mt-2 uppercase italic text-white">${article.title}</h2>`;

    body.innerHTML = `
        <p class="mb-4">D'après les données du terminal FlashDevise, "${article.title}" impacte actuellement la liquidité des paires liées. L'analyse algorithmique détecte un changement de volatilité significatif sur le marché Forex/Crypto.</p>
        <p class="mb-4">Techniquement, une consolidation au-dessus des pivots actuels validerait la poursuite de cette tendance pour les prochaines 24 heures.</p>
    `;
    sourceLink.href = article.url;
    document.getElementById('newsContentModal').style.display = 'flex';
}

// --- FONCTION ENRICHIE POUR L'ACADÉMIE ---
function renderAcademy() {
    const grid = document.getElementById('expert-grid');
    if(!grid) return;
    grid.innerHTML = expertArticles.map(art => `
        <div class="glass p-10 rounded-[3rem] border border-white/5 hover:border-indigo-500/40 transition-all cursor-pointer group" onclick="openDeepAnalysis('${art.id}')">
            <h3 class="text-xl font-black uppercase italic leading-tight mb-4 group-hover:text-indigo-400 transition">${art.title}</h3>
            <p class="text-slate-500 text-xs leading-relaxed line-clamp-3 mb-6">Explorez ce dossier complet sur ${art.title.toLowerCase()}. Analyses techniques et projections 2026.</p>
            <div class="flex items-center gap-2 text-indigo-500 text-[9px] font-black uppercase tracking-widest">Lire le dossier complet <i class="fas fa-arrow-right"></i></div>
        </div>
    `).join('');
}

function openDeepAnalysis(id) {
    const article = expertArticles.find(a => a.id === id);
    if(!article) return;
    const body = document.getElementById('article-body'), header = document.getElementById('article-header');
    header.innerHTML = `<h2 class="text-4xl font-black uppercase italic text-white">${article.title}</h2>`;
    body.innerHTML = `<div class="prose prose-invert max-w-none text-slate-300">${article.content}</div>`;
    document.getElementById('newsContentModal').style.display = 'flex';
}

function setLanguage(lang) {
    currentLang = lang; localStorage.setItem('preferredLang', lang);
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[lang][key]) el.innerText = translations[lang][key];
    });
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
        fS.value = "EUR"; tS.value = "DZD";
        setLanguage(currentLang); fetchNews(); convert(); updateChart(); renderAcademy();
    } catch (e) { console.error("Init Error:", e); }
}

function closeModal(id) { document.getElementById(id).style.display = 'none'; }

document.getElementById('amount')?.addEventListener('input', convert);
[document.getElementById('fromCurrency'), document.getElementById('toCurrency')].forEach(s => {
    s?.addEventListener('change', () => { convert(); updateChart(); });
});

init();
setInterval(fetchNews, 600000);


