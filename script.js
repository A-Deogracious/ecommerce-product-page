/* =====================================================
   NOVACARTEL — script.js
   Premium Automotive Marketplace
   ===================================================== */

// ── APP STATE ──────────────────────────────────────────
let cart        = JSON.parse(localStorage.getItem('nc_cart') || '[]');
let wishlist    = JSON.parse(localStorage.getItem('nc_wl')   || '[]');
let currency    = localStorage.getItem('nc_currency') || 'USD';
let currentCategory = 'all';
let currentBrand    = 'all';
let currentSort     = 'default';
let currentProduct  = null;   // product open in configurator
let cfgQty    = 1;
let cfgColor  = null;
let cfgOption = null;
let heroIndex    = 0;
let heroInterval = null;
let payMethod    = 'card';
let loggedIn     = localStorage.getItem('nc_user') || null;

// ── CURRENCY ──────────────────────────────────────────
const RATES   = { USD: 1, UGX: 3750, KES: 130 };
const SYMBOLS = { USD: '$', UGX: 'UGX ', KES: 'KES ' };

function fmt(usd) {
  const val = usd * RATES[currency];
  const sym = SYMBOLS[currency];
  if (currency === 'USD') return sym + val.toLocaleString();
  return sym + Math.round(val).toLocaleString();
}

function setCurrency(c) {
  currency = c;
  localStorage.setItem('nc_currency', c);
  document.querySelectorAll('.cur-btn').forEach(b =>
    b.classList.toggle('active', b.textContent === c)
  );
  renderProducts();
  updateCartUI();
  updateHeroPricing();
  toast(`Currency set to ${c}`, 'success');
}

// ── PRODUCTS DATA ──────────────────────────────────────
const products = [

  // ═══════════════ TESLA ═══════════════
  {
    id:'tesla-s-plaid', name:'Model S Plaid', brand:'Tesla', category:'vehicles',
    price:94990, tag:'Best Seller',
    image:'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1400&q=90&auto=format&fit=crop',
    specs:'1,020 hp  |  1.99s 0–60 mph  |  396 mi range',
    desc:'The quickest production sedan ever made. Plaid powertrain with three motors.',
    colors:[
      {n:'Pearl White',v:'#f5f5f0'},{n:'Midnight Silver',v:'#8a8f9e'},
      {n:'Ultra Red',v:'#c0392b'},{n:'Solid Black',v:'#1a1a1a'},{n:'Deep Blue',v:'#1a3a5c'}
    ],
    options:['19" Tempest','21" Arachnid']
  },
  {
    id:'tesla-model3', name:'Model 3 Performance', brand:'Tesla', category:'vehicles',
    price:57990,
    image:'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=1400&q=90&auto=format&fit=crop',
    specs:'510 hp  |  3.1s 0–60 mph  |  315 mi range',
    desc:'Precision handling meets next-generation efficiency.',
    colors:[
      {n:'Pearl White',v:'#f5f5f0'},{n:'Midnight Silver',v:'#8a8f9e'},
      {n:'Deep Blue',v:'#1a3a5c'},{n:'Solid Black',v:'#1a1a1a'},{n:'Quicksilver',v:'#c8c8c8'}
    ],
    options:['18" Aero','20" Überturbine']
  },
  {
    id:'tesla-modelx', name:'Model X Plaid', brand:'Tesla', category:'vehicles',
    price:119990, tag:'New',
    image:'https://images.unsplash.com/photo-1620891549027-942fdc95d3f5?w=1400&q=90&auto=format&fit=crop',
    specs:'1,020 hp  |  2.5s 0–60 mph  |  333 mi range  |  6-7 seats',
    desc:'The safest, most capable SUV ever built. Falcon Wing doors standard.',
    colors:[
      {n:'Pearl White',v:'#f5f5f0'},{n:'Midnight Silver',v:'#8a8f9e'},
      {n:'Deep Blue',v:'#1a3a5c'},{n:'Solid Black',v:'#1a1a1a'},{n:'Red',v:'#c0392b'}
    ],
    options:['20" Cyberstream','22" Turbine']
  },
  {
    id:'tesla-cybertruck', name:'Cybertruck', brand:'Tesla', category:'vehicles',
    price:79990, tag:'Limited',
    image:'https://images.unsplash.com/photo-1694027308754-e49c7714e2c2?w=1400&q=90&auto=format&fit=crop',
    specs:'845 hp  |  2.6s 0–60 mph  |  320 mi range  |  Exoskeleton',
    desc:'Ultra-hard stainless steel body. Built for any planet.',
    colors:[{n:'Stainless',v:'#d4d4d0'}],
    options:['All-Terrain','Off-Road']
  },

  // ═══════════════ FERRARI ═══════════════
  {
    id:'ferrari-f8', name:'F8 Tributo', brand:'Ferrari', category:'vehicles',
    price:280000, tag:'Exotic',
    image:'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=1400&q=90&auto=format&fit=crop',
    specs:'710 hp  |  2.9s 0–60 mph  |  V8 Twin-Turbo',
    desc:'The most powerful V8 Ferrari ever. Racing DNA in a road car.',
    colors:[
      {n:'Rosso Corsa',v:'#cc0000'},{n:'Giallo Modena',v:'#f0c000'},
      {n:'Nero Daytona',v:'#1a1a1a'},{n:'Bianco Avus',v:'#f5f5f5'},{n:'Grigio Titanio',v:'#6a6a6a'}
    ],
    options:['Standard','Sport Exhaust','Lift System']
  },
  {
    id:'ferrari-roma', name:'Roma', brand:'Ferrari', category:'vehicles',
    price:230000,
    image:'https://images.unsplash.com/photo-1574610758050-17e9d6a05374?w=1400&q=90&auto=format&fit=crop',
    specs:'612 hp  |  3.4s 0–60 mph  |  V8 Twin-Turbo  |  GT',
    desc:'The dolce vita of the Ferrari range. Timeless Italian elegance.',
    colors:[
      {n:'Rosso Portofino',v:'#b22222'},{n:'Grigio Ingrid',v:'#888'},
      {n:'Bianco Cervino',v:'#f0f0f0'},{n:'Nero DS',v:'#111'},{n:'Blu Corsa',v:'#003d6b'}
    ],
    options:['Carbon Package','Daytona Seats']
  },

  // ═══════════════ TOYOTA ═══════════════
  {
    id:'toyota-lc300', name:'Land Cruiser 300', brand:'Toyota', category:'vehicles',
    price:85000,
    image:'https://images.unsplash.com/photo-1606216794075-b5bd09dbc6aa?w=1400&q=90&auto=format&fit=crop',
    specs:'415 hp  |  V8 / Twin-Turbo V6  |  Multi-Terrain 4WD',
    desc:'Legendary off-road capability meets modern luxury. Redefining adventure.',
    colors:[
      {n:'White Pearl',v:'#f5f5f0'},{n:'Graphite',v:'#4a4a4a'},
      {n:'Silver',v:'#c8c8c8'},{n:'Bronze',v:'#8B6914'},{n:'Black',v:'#111'}
    ],
    options:['GX','VX','GR Sport']
  },
  {
    id:'toyota-supra', name:'GR Supra', brand:'Toyota', category:'vehicles',
    price:56000, tag:'Performance',
    image:'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1400&q=90&auto=format&fit=crop',
    specs:'382 hp  |  3.9s 0–60 mph  |  B58 Inline-6',
    desc:'Born on the track. Bred on the street. The icon returns.',
    colors:[
      {n:'Nitro Yellow',v:'#f0c000'},{n:'White',v:'#f5f5f0'},
      {n:'Black',v:'#111'},{n:'Renaissance Red',v:'#aa2222'},{n:'Horizon Blue',v:'#4169e1'}
    ],
    options:['3.0 GR','3.0 GR Premium','A91-MT']
  },
  {
    id:'toyota-hilux', name:'Hilux GR-S', brand:'Toyota', category:'vehicles',
    price:42000,
    image:'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1400&q=90&auto=format&fit=crop',
    specs:'228 hp  |  2.8L Diesel  |  4x4 Automatic',
    desc:"Africa's most trusted workhorse — now with GR Sport DNA.",
    colors:[
      {n:'White',v:'#f5f5f0'},{n:'Silver',v:'#c0c0c0'},
      {n:'Grey',v:'#808080'},{n:'Red',v:'#c00'},{n:'Black',v:'#111'}
    ],
    options:['Single Cab','Double Cab','Xtra Cab']
  },

  // ═══════════════ FORD ═══════════════
  {
    id:'ford-mustang', name:'Mustang Dark Horse', brand:'Ford', category:'vehicles',
    price:57990, tag:'New',
    image:'https://images.unsplash.com/photo-1552517034-6533479cbfe8?w=1400&q=90&auto=format&fit=crop',
    specs:'500 hp  |  3.9s 0–60 mph  |  5.0L Coyote V8',
    desc:'The most powerful naturally aspirated Mustang ever. No turbos. Pure V8.',
    colors:[
      {n:'Vapor Blue',v:'#4a5f7f'},{n:'Shadow Black',v:'#1a1a1a'},
      {n:'Race Red',v:'#cc0000'},{n:'Atlas Blue',v:'#1c3f6e'},{n:'White',v:'#f5f5f5'}
    ],
    options:['Fastback','Convertible','California Special']
  },
  {
    id:'ford-bronco', name:'Bronco Raptor', brand:'Ford', category:'vehicles',
    price:70995, tag:'Off-Road',
    image:'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1400&q=90&auto=format&fit=crop',
    specs:'418 hp  |  Twin-Turbo V6  |  Live-Valve FOX Shocks',
    desc:'Raptor-grade off-road performance. Factory-built for the wild.',
    colors:[
      {n:'Code Orange',v:'#e55500'},{n:'Avalanche',v:'#e0e0e0'},
      {n:'Cactus Gray',v:'#6b7b6a'},{n:'Oxford White',v:'#f5f5f0'},{n:'Black',v:'#111'}
    ],
    options:['2-Door','4-Door','Sasquatch Pkg']
  },
  {
    id:'ford-f150-lightning', name:'F-150 Lightning', brand:'Ford', category:'vehicles',
    price:55000,
    image:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=90&auto=format&fit=crop',
    specs:'580 hp  |  4.5s 0–60 mph  |  320 mi range  |  Electric',
    desc:'The electric truck that changes everything. 10,000 lb towing.',
    colors:[
      {n:'Platinum White',v:'#f0f0f0'},{n:'Rapid Red',v:'#b22222'},
      {n:'Atlas Blue',v:'#1c3f6e'},{n:'Carbonized Gray',v:'#555'},{n:'Black',v:'#111'}
    ],
    options:['Standard Range','Extended Range','Platinum']
  },

  // ═══════════════ JEEP ═══════════════
  {
    id:'jeep-wrangler', name:'Wrangler Rubicon 392', brand:'Jeep', category:'vehicles',
    price:72000, tag:'Icon',
    image:'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1400&q=90&auto=format&fit=crop',
    specs:'470 hp  |  4.9s 0–60 mph  |  6.4L HEMI V8',
    desc:'The ultimate Wrangler. Brutal V8 power meets Rubicon off-road pedigree.',
    colors:[
      {n:'Sarge Green',v:'#4a5f40'},{n:'Firecracker Red',v:'#cc2200'},
      {n:'Black',v:'#111'},{n:'Hydro Blue',v:'#2060a0'},{n:'Bright White',v:'#f5f5f5'}
    ],
    options:['2-Door','4-Door','Sky One-Touch']
  },
  {
    id:'jeep-grand-cherokee', name:'Grand Cherokee Trackhawk', brand:'Jeep', category:'vehicles',
    price:95000,
    image:'https://images.unsplash.com/photo-1606216794075-b5bd09dbc6aa?w=1400&q=90&auto=format&fit=crop',
    specs:'707 hp  |  3.5s 0–60 mph  |  Supercharged V8',
    desc:'The most powerful SUV ever produced by Jeep. Supercharged Hellcat engine.',
    colors:[
      {n:'Diamond Black',v:'#111'},{n:'White',v:'#f5f5f0'},
      {n:'Silver',v:'#c0c0c0'},{n:'Velvet Red',v:'#7b1c1c'},{n:'Granite',v:'#555'}
    ],
    options:['7-Seat','5-Seat','L Trim']
  },

  // ═══════════════ MERCEDES ═══════════════
  {
    id:'mercedes-g63', name:'G 63 AMG', brand:'Mercedes', category:'vehicles',
    price:175000, tag:'Icon',
    image:'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1400&q=90&auto=format&fit=crop',
    specs:'577 hp  |  4.5s 0–60 mph  |  V8 Biturbo  |  Permanent 4WD',
    desc:'The legend continues. The G-Wagen turns 45 and gets more powerful than ever.',
    colors:[
      {n:'Obsidian Black',v:'#111'},{n:'Diamond White',v:'#f0f0f0'},
      {n:'Designo Platinum',v:'#c0b090'},{n:'Emerald Green',v:'#1a5f2a'},{n:'Manufaktur Red',v:'#8b0000'}
    ],
    options:['Standard','Night Package','Manufaktur']
  },
  {
    id:'mercedes-gle63', name:'GLE 63 S AMG', brand:'Mercedes', category:'vehicles',
    price:135000,
    image:'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1400&q=90&auto=format&fit=crop',
    specs:'603 hp  |  3.7s 0–60 mph  |  V8 Biturbo  |  Luxury SUV',
    desc:'Performance redefined. AMG DNA in the most luxurious SUV Mercedes offers.',
    colors:[
      {n:'Obsidian Black',v:'#111'},{n:'Polar White',v:'#f5f5f0'},
      {n:'Selenite Grey',v:'#8a8a8a'},{n:'Brilliant Blue',v:'#1a3060'},{n:'Hyacinth Red',v:'#700028'}
    ],
    options:['5-Seat','7-Seat','Coupe']
  },

  // ═══════════════ BMW ═══════════════
  {
    id:'bmw-m5', name:'M5 CS', brand:'BMW', category:'vehicles',
    price:145000, tag:'Performance',
    image:'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1400&q=90&auto=format&fit=crop',
    specs:'627 hp  |  2.9s 0–60 mph  |  V8 Biturbo  |  M xDrive',
    desc:'The most powerful M5 ever. Lightweight Carbon, 627 hp, pure obsession.',
    colors:[
      {n:'Frozen Brands Hatch Grey',v:'#888'},{n:'Alpine White',v:'#f5f5f5'},
      {n:'Sapphire Black',v:'#111'},{n:'Individual Tanzanite Blue',v:'#1a1f60'}
    ],
    options:['Sedan','Track Package']
  },
  {
    id:'bmw-x5m', name:'X5 M Competition', brand:'BMW', category:'vehicles',
    price:117000,
    image:'https://images.unsplash.com/photo-1608023136037-626dad6df87a?w=1400&q=90&auto=format&fit=crop',
    specs:'617 hp  |  3.7s 0–60 mph  |  V8 Biturbo  |  M xDrive',
    desc:'The definitive high-performance SAV. Track ability, everyday usability.',
    colors:[
      {n:'Brooklyn Grey',v:'#777'},{n:'Black Sapphire',v:'#111'},
      {n:'Mineral White',v:'#f0f0f0'},{n:'Phytonic Blue',v:'#3a4f6e'},{n:'Tanzanite Blue',v:'#1a1f60'}
    ],
    options:['Standard','Competition Pro','Ultimate']
  },

  // ═══════════════ LAMBORGHINI ═══════════════
  {
    id:'lambo-urus', name:'Urus S', brand:'Lamborghini', category:'vehicles',
    price:240000, tag:'Exotic',
    image:'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1400&q=90&auto=format&fit=crop',
    specs:'657 hp  |  3.3s 0–60 mph  |  V8 Twin-Turbo  |  AWD',
    desc:"The world's first Super Sport Utility Vehicle. Nothing else comes close.",
    colors:[
      {n:'Bianco Monocerus',v:'#f5f5f0'},{n:'Nero Noctis',v:'#111'},
      {n:'Giallo Auge',v:'#f0c000'},{n:'Arancio Borealis',v:'#e06000'},{n:'Verde Mantis',v:'#2d6e1a'}
    ],
    options:['Urus S','Urus Performante']
  },
  {
    id:'lambo-huracan', name:'Huracán Tecnica', brand:'Lamborghini', category:'vehicles',
    price:280000,
    image:'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1400&q=90&auto=format&fit=crop',
    specs:'630 hp  |  3.2s 0–60 mph  |  V10 NA  |  RWD',
    desc:'Natural aspiration. Rear-wheel drive. Pure Lamborghini emotion.',
    colors:[
      {n:'Arancio Xanto',v:'#e06000'},{n:'Blu Laufey',v:'#003366'},
      {n:'Verde Citrea',v:'#6a8a00'},{n:'Rosso Mars',v:'#8b0000'},{n:'Bianco Monocerus',v:'#f5f5f0'}
    ],
    options:['Standard','Racing Seats','Sensonum Audio']
  },

  // ═══════════════ PORSCHE ═══════════════
  {
    id:'porsche-911gts', name:'911 Carrera GTS', brand:'Porsche', category:'vehicles',
    price:145000,
    image:'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1400&q=90&auto=format&fit=crop',
    specs:'473 hp  |  2.9s 0–60 mph  |  Flat-6 Twin-Turbo',
    desc:'The pinnacle of the 911 range. Naturally inspiring. Technically superior.',
    colors:[
      {n:'GT Silver',v:'#a0a8b0'},{n:'Guards Red',v:'#cc0000'},
      {n:'Python Green',v:'#2d5a1a'},{n:'Black',v:'#111'},{n:'White',v:'#f5f5f0'}
    ],
    options:['Coupé','Targa','Cabriolet']
  },
  {
    id:'porsche-cayenne', name:'Cayenne Turbo GT', brand:'Porsche', category:'vehicles',
    price:182000, tag:'Performance',
    image:'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1400&q=90&auto=format&fit=crop',
    specs:'631 hp  |  3.1s 0–60 mph  |  V8 Twin-Turbo  |  AWD',
    desc:'The most powerful Cayenne ever. Track-ready, road-legal, family-approved.',
    colors:[
      {n:'Papaya Metallic',v:'#e06000'},{n:'Black',v:'#111'},
      {n:'Frozen Blue',v:'#2050a0'},{n:'White',v:'#f5f5f0'},{n:'Dark Olive',v:'#4a5a30'}
    ],
    options:['Standard','GT Package']
  },

  // ═══════════════ LAND ROVER ═══════════════
  {
    id:'rr-sport-svr', name:'Range Rover Sport SVR', brand:'Land Rover', category:'vehicles',
    price:120000,
    image:'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=1400&q=90&auto=format&fit=crop',
    specs:'575 hp  |  4.3s 0–60 mph  |  V8 Supercharged',
    desc:'British performance meets Terrain Response®. The SVR rewrites the rules.',
    colors:[
      {n:'Santorini Black',v:'#111'},{n:'Fuji White',v:'#f5f5f0'},
      {n:'Silicon Silver',v:'#c0c8d0'},{n:'Carpathian Grey',v:'#555'},{n:'Firenze Red',v:'#7b1010'}
    ],
    options:['5-Seat','7-Seat','SVAutobiography']
  },
  {
    id:'rr-defender', name:'Defender V8', brand:'Land Rover', category:'vehicles',
    price:95000, tag:'Iconic',
    image:'https://images.unsplash.com/photo-1513836279014-a89f7d76ae86?w=1400&q=90&auto=format&fit=crop',
    specs:'518 hp  |  4.9s 0–60 mph  |  V8 Supercharged',
    desc:'The most capable Defender ever. Pure off-road with V8 soundtrack.',
    colors:[
      {n:'Gondwana Stone',v:'#c8b090'},{n:'Tasman Blue',v:'#2060a0'},
      {n:'Black',v:'#111'},{n:'White',v:'#f5f5f0'},{n:'Green',v:'#2d5a2a'}
    ],
    options:['90 (3-Door)','110 (5-Door)','130 (8-Seat)']
  },

  // ═══════════════ KIIRA MOTORS (Uganda) ═══════════════
  {
    id:'kayoola-evs', name:'Kayoola EVS', brand:'Kiira Motors', category:'vehicles',
    price:450000, tag:'Uganda Made',
    image:'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1400&q=90&auto=format&fit=crop',
    specs:'Electric  |  70 passengers  |  250 km range  |  Solar-assist',
    desc:"East Africa's first solar-electric bus. Built in Uganda by Kiira Motors.",
    colors:[{n:'Kiira White',v:'#f5f5f0'},{n:'Green',v:'#1a8a2a'},{n:'Blue',v:'#1a4a8a'}],
    options:['Standard','Premium Interior','Custom Wrap']
  },
  {
    id:'kayoola-solar-bus', name:'Kayoola Solar Bus', brand:'Kiira Motors', category:'vehicles',
    price:480000, tag:'Solar',
    image:'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=1400&q=90&auto=format&fit=crop',
    specs:'Solar + Electric  |  80 passengers  |  Solar panels on roof',
    desc:'The flagship solar bus — powered by the African sun. Zero direct emissions.',
    colors:[{n:'Pearl White',v:'#f5f5f0'},{n:'Kiira Blue',v:'#003d80'}],
    options:['City Config','Highway Config']
  },
  {
    id:'kiira-ev-smack', name:'Kiira EV Smack', brand:'Kiira Motors', category:'vehicles',
    price:15000, tag:'Made in Uganda',
    image:'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1400&q=90&auto=format&fit=crop',
    specs:'Electric  |  4 seats  |  150 km range  |  Compact City Car',
    desc:"Uganda's first mass-market electric car. Affordable, clean, locally engineered.",
    colors:[{n:'White',v:'#f5f5f0'},{n:'Red',v:'#cc0000'},{n:'Blue',v:'#1a4080'},{n:'Black',v:'#111'}],
    options:['Standard','Solar Roof']
  },
  {
    id:'kayoola-minibus', name:'Kayoola Minibus 30', brand:'Kiira Motors', category:'vehicles',
    price:85000,
    image:'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=1400&q=90&auto=format&fit=crop',
    specs:'Electric  |  30 passengers  |  180 km range',
    desc:"Right-sized for urban routes. Perfect for Kampala's matatu network.",
    colors:[{n:'White',v:'#f5f5f0'},{n:'Yellow',v:'#f0c000'},{n:'Blue',v:'#1a4080'}],
    options:['Basic','Luxury','Custom']
  },

  // ═══════════════ ENERGY ═══════════════
  {
    id:'solar-pro-10kw', name:'Solar Pro Kit 10kW', brand:'NovaEnergy', category:'energy',
    price:12500, tag:'Best Seller',
    image:'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1400&q=90&auto=format&fit=crop',
    specs:'10kW  |  Roof Solar  |  Battery Storage  |  24/7 Power',
    desc:'Complete home energy solution. Power your home and charge your EV.',
    colors:[{n:'Standard Black',v:'#111'},{n:'All-Black Premium',v:'#222'}],
    options:['No Battery','10kWh Battery','20kWh Battery']
  },
  {
    id:'solar-home-5kw', name:'Solar Home System 5kW', brand:'NovaEnergy', category:'energy',
    price:6500,
    image:'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1400&q=90&auto=format&fit=crop',
    specs:'5kW  |  Grid-tie + Backup  |  10-year warranty',
    desc:'Smart solar for modern homes. Monitor from your phone.',
    colors:[{n:'Black Panels',v:'#111'},{n:'Transparent',v:'#8a8a8a'}],
    options:['5kWh Battery','No Battery']
  },
  {
    id:'ev-charger', name:'EV Home Charger Pro', brand:'NovaEnergy', category:'energy',
    price:1200,
    image:'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1400&q=90&auto=format&fit=crop',
    specs:'22kW  |  WiFi Smart  |  Compatible with all EVs  |  24/7 monitoring',
    desc:'Fast, smart, always-on EV charging for your home.',
    colors:[{n:'White',v:'#f5f5f0'},{n:'Black',v:'#111'}],
    options:['7kW','11kW','22kW']
  },

  // ═══════════════ MERCH ═══════════════
  {
    id:'nc-dad-cap', name:'NovaCartel Dad Cap', brand:'NovaWear', category:'merch',
    price:45,
    image:'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=1400&q=90&auto=format&fit=crop',
    specs:'100% Cotton  |  Adjustable  |  Embroidered Logo',
    desc:'Classic unstructured cap with gold embroidered NovaCartel wordmark.',
    colors:[{n:'Black',v:'#111'},{n:'White',v:'#f5f5f0'},{n:'Gold',v:'#c9a84c'},{n:'Navy',v:'#1a2a4a'},{n:'Olive',v:'#556b2f'}],
    options:['One Size']
  },
  {
    id:'nc-snapback', name:'NovaCartel Snapback', brand:'NovaWear', category:'merch',
    price:55,
    image:'https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=1400&q=90&auto=format&fit=crop',
    specs:'Structured Fit  |  Snapback  |  Flat Brim  |  Embroidered',
    desc:'Bold structured snapback. The cap that turns heads.',
    colors:[{n:'Black/Gold',v:'#111'},{n:'Navy/White',v:'#1a2a4a'},{n:'White/Gold',v:'#f5f5f0'},{n:'Olive',v:'#556b2f'}],
    options:['One Size']
  },
  {
    id:'nc-premium-hoodie', name:'Elite Pullover Hoodie', brand:'NovaWear', category:'merch',
    price:250, tag:'Premium',
    image:'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=1400&q=90&auto=format&fit=crop',
    specs:'400gsm Fleece  |  Relaxed Fit  |  Embroidered & Print',
    desc:"Heavyweight premium hoodie. The only hoodie you'll ever need.",
    colors:[{n:'Jet Black',v:'#111'},{n:'Cream',v:'#f0e8d8'},{n:'Forest',v:'#1a3a1a'},{n:'Navy',v:'#1a2a4a'},{n:'Charcoal',v:'#444'}],
    options:['S','M','L','XL','XXL']
  },
  {
    id:'nc-zip-hoodie', name:'NC Zip Hoodie', brand:'NovaWear', category:'merch',
    price:220,
    image:'https://images.unsplash.com/photo-1562572159-4efd90232402?w=1400&q=90&auto=format&fit=crop',
    specs:'350gsm  |  Full Zip  |  Kangaroo Pocket  |  Gold zip pull',
    desc:'Luxury zip hoodie with signature gold hardware details.',
    colors:[{n:'Black',v:'#111'},{n:'Grey',v:'#666'},{n:'Navy',v:'#1a2a4a'}],
    options:['S','M','L','XL','XXL']
  },
  {
    id:'nc-classic-tee', name:'Classic Logo Tee', brand:'NovaWear', category:'merch',
    price:75,
    image:'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1400&q=90&auto=format&fit=crop',
    specs:'200gsm  |  Oversized Fit  |  Screen Printed',
    desc:'The essential NovaCartel tee. Clean, minimal, permanent.',
    colors:[{n:'Black',v:'#111'},{n:'White',v:'#f5f5f0'},{n:'Stone',v:'#c8b090'},{n:'Forest',v:'#1a3a1a'}],
    options:['XS','S','M','L','XL','XXL']
  },
  {
    id:'nc-polo', name:'NovaCartel Polo', brand:'NovaWear', category:'merch',
    price:95,
    image:'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1400&q=90&auto=format&fit=crop',
    specs:'Piqué Cotton  |  Slim Fit  |  Embroidered Logo  |  3 Button Placket',
    desc:'Smart casual perfection. The polo that means business.',
    colors:[{n:'White',v:'#f5f5f0'},{n:'Black',v:'#111'},{n:'Navy',v:'#1a2a4a'},{n:'Gold',v:'#c9a84c'}],
    options:['S','M','L','XL','XXL']
  },
  {
    id:'nc-bomber', name:'Bomber Jacket', brand:'NovaWear', category:'merch',
    price:350, tag:'Premium',
    image:'https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=1400&q=90&auto=format&fit=crop',
    specs:'Nylon Shell  |  Quilted Lining  |  Gold hardware  |  Embroidered',
    desc:'Statement outerwear. Ribbed cuffs, custom lining, gold NovaCartel emblem.',
    colors:[{n:'Black',v:'#111'},{n:'Olive',v:'#556b2f'},{n:'Navy',v:'#1a2a4a'},{n:'Burgundy',v:'#6a1020'}],
    options:['S','M','L','XL','XXL']
  },
  {
    id:'nc-track-jacket', name:'Track Jacket', brand:'NovaWear', category:'merch',
    price:180,
    image:'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1400&q=90&auto=format&fit=crop',
    specs:'Tricot Fabric  |  Side Pockets  |  Full Zip  |  Slim Fit',
    desc:'The varsity-inspired track jacket. Sport meets street.',
    colors:[{n:'Black/Gold',v:'#111'},{n:'Navy/White',v:'#1a2a4a'},{n:'Red/White',v:'#aa0000'}],
    options:['S','M','L','XL','XXL']
  }
];

// ── HERO FEATURED PRODUCTS ─────────────────────────────
const heroProducts = [
  'tesla-s-plaid','ferrari-f8','lambo-huracan',
  'kayoola-evs','porsche-911gts','bmw-m5','mercedes-g63',
  'toyota-lc300','rr-defender'
];


/* =====================================================
   INIT
   ===================================================== */
window.addEventListener('DOMContentLoaded', () => {

  // Hide loader after 2 seconds
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 2000);

  renderBrandsStrip();
  renderHero();
  renderProducts();
  updateBadges();

  if (loggedIn) updateAuthBtn();

  // Sticky navbar
  window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
  });
  document.getElementById('navbar').classList.add('scrolled');

  // Hero auto-rotate
  heroInterval = setInterval(nextHero, 5500);
});


/* =====================================================
   BRANDS STRIP
   ===================================================== */
function renderBrandsStrip() {
  const brands = [
    'Tesla','Ferrari','Toyota','Ford','Jeep',
    'Mercedes','BMW','Lamborghini','Porsche',
    'Land Rover','Kiira Motors','NovaEnergy','NovaWear'
  ];
  const doubled = [...brands, ...brands]; // duplicate for infinite scroll illusion
  document.getElementById('brands-track').innerHTML =
    doubled.map(b => `<span class="brand-label" onclick="filterByBrand('${b}')">${b}</span>`).join('');
}


/* =====================================================
   HERO
   ===================================================== */
function renderHero(idx) {
  if (idx !== undefined) heroIndex = idx;
  const p = products.find(x => x.id === heroProducts[heroIndex % heroProducts.length]);
  if (!p) return;

  document.getElementById('hero-bg').style.backgroundImage = `url('${p.image}')`;
  document.getElementById('hero-eyebrow').textContent = p.brand;
  document.getElementById('hero-title').textContent   = p.name;
  document.getElementById('hero-specs').textContent   = p.specs;
  document.getElementById('hero-price').textContent   = `From ${fmt(p.price)}`;
  document.getElementById('hero-order-btn').dataset.id = p.id;

  // Navigation dots
  document.getElementById('hero-dots').innerHTML = heroProducts.map((_, i) =>
    `<button class="hero-dot ${i === heroIndex % heroProducts.length ? 'active' : ''}"
      onclick="renderHero(${i}); resetHeroInterval();"></button>`
  ).join('');
}

function nextHero() {
  heroIndex = (heroIndex + 1) % heroProducts.length;
  renderHero();
}

function resetHeroInterval() {
  clearInterval(heroInterval);
  heroInterval = setInterval(nextHero, 5500);
}

function updateHeroPricing() {
  const p = products.find(x => x.id === heroProducts[heroIndex % heroProducts.length]);
  if (p) document.getElementById('hero-price').textContent = `From ${fmt(p.price)}`;
}

function heroOrder() {
  const id = document.getElementById('hero-order-btn').dataset.id;
  const p  = products.find(x => x.id === id);
  if (p) openConfigurator(p);
}

function scrollToProducts() {
  document.getElementById('filter-section').scrollIntoView({ behavior: 'smooth' });
}


/* =====================================================
   PRODUCTS — FILTER, SORT, RENDER
   ===================================================== */
function getFiltered() {
  let list = [...products];
  if (currentCategory !== 'all') list = list.filter(p => p.category === currentCategory);
  if (currentBrand !== 'all')    list = list.filter(p => p.brand === currentBrand);
  if (currentSort === 'price-asc')  list.sort((a, b) => a.price - b.price);
  else if (currentSort === 'price-desc') list.sort((a, b) => b.price - a.price);
  else if (currentSort === 'name')  list.sort((a, b) => a.name.localeCompare(b.name));
  return list;
}

function renderProducts() {
  const list = getFiltered();
  const grid = document.getElementById('product-grid');
  document.getElementById('results-count').textContent =
    `${list.length} product${list.length !== 1 ? 's' : ''} found`;

  if (!list.length) {
    grid.innerHTML = `<div class="empty-state">
      <h3>No products found</h3>
      <p style="color:var(--text-dim)">Try a different filter or category.</p>
    </div>`;
    return;
  }

  grid.innerHTML = list.map(p => {
    const inWL = wishlist.includes(p.id);
    return `
    <div class="product-card" id="pc-${p.id}">
      <div class="card-img-wrap">
        <img src="${p.image}" alt="${p.name}" loading="lazy"
          onerror="this.src='https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80'">
        ${p.tag ? `<span class="card-tag">${p.tag}</span>` : ''}
        <button class="card-wishlist ${inWL ? 'active' : ''}"
          onclick="quickWishlist(event,'${p.id}')" title="Wishlist">${inWL ? '♥' : '♡'}</button>
      </div>
      <div class="card-body">
        <div class="card-brand">${p.brand}</div>
        <div class="card-name">${p.name}</div>
        <div class="card-specs">${p.specs}</div>
        <div class="card-footer">
          <div class="card-price">${fmt(p.price)}</div>
          <button class="card-cta"
            onclick="openConfigurator(products.find(x=>x.id==='${p.id}'))">Configure</button>
        </div>
      </div>
    </div>`;
  }).join('');

  // Staggered entrance animation
  setTimeout(() => {
    document.querySelectorAll('.product-card').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 60);
    });
  }, 50);

  renderBrandFilters();
}

function renderBrandFilters() {
  const row = document.getElementById('brand-filter-row');
  if (['all','merch','energy'].includes(currentCategory)) { row.innerHTML = ''; return; }
  const brands = [...new Set(getFiltered().map(p => p.brand))];
  row.innerHTML = [
    `<button class="filter-btn ${currentBrand==='all'?'active':''}"
      onclick="filterByBrand('all')">All Brands</button>`,
    ...brands.map(b =>
      `<button class="filter-btn ${currentBrand===b?'active':''}"
        onclick="filterByBrand('${b}')">${b}</button>`)
  ].join('');
}

function setCategory(cat, btn) {
  currentCategory = cat;
  currentBrand    = 'all';
  document.querySelectorAll('.filter-section .filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const titles = {
    all:'All Products', vehicles:'Vehicles',
    energy:'Energy Solutions', merch:'NovaWear Merchandise'
  };
  document.getElementById('section-title').textContent = titles[cat] || 'Products';
  renderProducts();
}

function filterByBrand(brand) {
  currentBrand = brand;
  renderProducts();
}

function filterAndScroll(cat) {
  setCategory(cat, null);
  document.querySelectorAll('.filter-section .filter-btn').forEach(b => {
    const match = b.textContent.toLowerCase() === cat.toLowerCase()
      || (cat==='vehicles' && b.textContent==='Vehicles')
      || (cat==='energy'   && b.textContent==='Energy')
      || (cat==='merch'    && b.textContent==='Merch');
    b.classList.toggle('active', match);
  });
  document.getElementById('filter-section').scrollIntoView({ behavior: 'smooth' });
}

function sortProducts(val) {
  currentSort = val;
  renderProducts();
}


/* =====================================================
   WISHLIST
   ===================================================== */
function quickWishlist(e, id) {
  e.stopPropagation();
  toggleWishlistById(id);
}

function toggleWishlistById(id) {
  const idx = wishlist.indexOf(id);
  if (idx === -1) { wishlist.push(id); toast('Added to wishlist ♥', 'success'); }
  else            { wishlist.splice(idx, 1); toast('Removed from wishlist'); }
  localStorage.setItem('nc_wl', JSON.stringify(wishlist));
  updateBadges();
  renderProducts();
}

function toggleWishlistItem() {
  if (!currentProduct) return;
  toggleWishlistById(currentProduct.id);
  updateWishlistBtn();
}

function updateWishlistBtn() {
  const btn = document.getElementById('cfg-wishlist-btn');
  if (!btn || !currentProduct) return;
  const inWL = wishlist.includes(currentProduct.id);
  btn.textContent = inWL ? '♥ In Wishlist' : '♡ Add to Wishlist';
  btn.classList.toggle('active', inWL);
}

function openWishlist() {
  const body = document.getElementById('wl-body');
  if (!wishlist.length) {
    body.innerHTML = `<div class="cart-empty">
      <div class="cart-empty-icon">♡</div><p>Your wishlist is empty</p>
    </div>`;
  } else {
    const items = wishlist.map(id => products.find(p => p.id === id)).filter(Boolean);
    body.innerHTML = items.map(p => `
      <div class="cart-item">
        <img class="cart-item-img" src="${p.image}" alt="${p.name}"
          onerror="this.src='https://images.unsplash.com/photo-1617788138017-80ad40651399?w=200&q=70'">
        <div class="cart-item-info">
          <div class="cart-item-name">${p.name}</div>
          <div class="cart-item-sub">${p.brand}</div>
          <div class="cart-item-price">${fmt(p.price)}</div>
          <div style="display:flex;gap:0.5rem;margin-top:0.5rem;">
            <button class="card-cta" style="font-size:0.78rem;padding:0.35rem 0.75rem;"
              onclick="openConfigurator(products.find(x=>x.id==='${p.id}')); closeWishlist();">Configure</button>
            <button class="remove-btn"
              onclick="toggleWishlistById('${p.id}'); openWishlist();">Remove</button>
          </div>
        </div>
      </div>`).join('');
  }
  document.getElementById('wl-overlay').classList.add('active');
  document.getElementById('wl-drawer').classList.add('open');
}

function closeWishlist() {
  document.getElementById('wl-overlay').classList.remove('active');
  document.getElementById('wl-drawer').classList.remove('open');
}


/* =====================================================
   CONFIGURATOR
   ===================================================== */
function openConfigurator(p) {
  currentProduct = p;
  cfgQty    = 1;
  cfgColor  = p.colors[0];
  cfgOption = p.options[0];

  document.getElementById('cfg-img').src        = p.image;
  document.getElementById('cfg-brand').textContent = p.brand;
  document.getElementById('cfg-name').textContent  = p.name;
  document.getElementById('cfg-price').textContent = fmt(p.price);
  document.getElementById('cfg-specs').textContent = p.specs;
  document.getElementById('cfg-qty').textContent   = 1;

  // Tag badge
  const tagEl = document.getElementById('cfg-tag');
  tagEl.textContent   = p.tag || '';
  tagEl.style.display = p.tag ? '' : 'none';

  // Color swatches
  const swatchWrap = document.getElementById('cfg-colors-wrap');
  if (p.colors && p.colors.length) {
    swatchWrap.style.display = '';
    document.getElementById('cfg-color-name').textContent = cfgColor.n;
    document.getElementById('cfg-swatches').innerHTML = p.colors.map((c, i) =>
      `<button class="color-swatch ${i===0?'active':''}"
        style="background:${c.v};" title="${c.n}"
        onclick="selectColor(${i})"></button>`
    ).join('');
  } else swatchWrap.style.display = 'none';

  // Options (Trim / Size / Capacity)
  const optsWrap = document.getElementById('cfg-options-wrap');
  if (p.options && p.options.length) {
    optsWrap.style.display = '';
    const label = p.category === 'merch' ? 'Size'
      : p.category === 'energy' ? 'Capacity' : 'Trim / Wheels';
    document.getElementById('cfg-options-label').textContent = label;
    document.getElementById('cfg-options').innerHTML = p.options.map((o, i) =>
      `<button class="option-btn ${i===0?'active':''}"
        onclick="selectOption(this,'${o}')">${o}</button>`
    ).join('');
  } else optsWrap.style.display = 'none';

  updateLineTotalDisplay();
  updateWishlistBtn();
  document.getElementById('config-modal').classList.add('active');
}

function closeConfigurator() {
  document.getElementById('config-modal').classList.remove('active');
}

function closeConfigOnBg(e) {
  if (e.target === document.getElementById('config-modal')) closeConfigurator();
}

function selectColor(idx) {
  cfgColor = currentProduct.colors[idx];
  document.getElementById('cfg-color-name').textContent = cfgColor.n;
  document.querySelectorAll('.color-swatch').forEach((s, i) =>
    s.classList.toggle('active', i === idx)
  );
}

function selectOption(btn, val) {
  cfgOption = val;
  document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function changeQty(delta) {
  cfgQty = Math.max(1, Math.min(10, cfgQty + delta));
  document.getElementById('cfg-qty').textContent = cfgQty;
  updateLineTotalDisplay();
}

function updateLineTotalDisplay() {
  if (!currentProduct) return;
  document.getElementById('cfg-line-total').innerHTML =
    `<span>${fmt(currentProduct.price * cfgQty)}</span>`;
}

function addToCartFromConfig() {
  if (!currentProduct) return;
  addToCart(currentProduct, cfgColor, cfgOption, cfgQty);
  closeConfigurator();
}

function buyNowFromConfig() {
  if (!currentProduct) return;
  addToCart(currentProduct, cfgColor, cfgOption, cfgQty);
  closeConfigurator();
  openCheckout();
}


/* =====================================================
   CART
   ===================================================== */
function addToCart(product, color, option, qty = 1) {
  const existing = cart.find(i =>
    i.id === product.id && i.colorN === color?.n && i.option === option
  );
  if (existing) {
    existing.qty = Math.min(10, existing.qty + qty);
  } else {
    cart.push({
      id: product.id, name: product.name, brand: product.brand,
      image: product.image, price: product.price,
      colorN: color?.n || '', colorV: color?.v || '',
      option: option || '', qty
    });
  }
  localStorage.setItem('nc_cart', JSON.stringify(cart));
  updateBadges();
  toast(`${product.name} added to cart 🛒`, 'success');
}

function updateBadges() {
  const totalQty = cart.reduce((s, i) => s + i.qty, 0);

  const cartBadge = document.getElementById('cart-badge');
  cartBadge.textContent   = totalQty;
  cartBadge.style.display = totalQty ? '' : 'none';

  const wlBadge = document.getElementById('wl-badge');
  wlBadge.textContent   = wishlist.length;
  wlBadge.style.display = wishlist.length ? '' : 'none';

  const header = document.getElementById('cart-count-header');
  if (header) header.textContent = totalQty ? `(${totalQty})` : '';
}

function openCart() {
  updateCartUI();
  document.getElementById('cart-overlay').classList.add('active');
  document.getElementById('cart-drawer').classList.add('open');
}

function closeCart() {
  document.getElementById('cart-overlay').classList.remove('active');
  document.getElementById('cart-drawer').classList.remove('open');
}

function updateCartUI() {
  const body   = document.getElementById('cart-body');
  const footer = document.getElementById('cart-footer');

  if (!cart.length) {
    body.innerHTML = `<div class="cart-empty">
      <div class="cart-empty-icon">🛒</div>
      <p>Your cart is empty</p>
      <p style="font-size:0.82rem;color:var(--text-dim);margin-top:0.5rem;">
        Add a vehicle or item to get started
      </p>
    </div>`;
    footer.style.display = 'none';
    return;
  }

  body.innerHTML = cart.map((item, i) => `
    <div class="cart-item">
      <img class="cart-item-img" src="${item.image}" alt="${item.name}"
        onerror="this.src='https://images.unsplash.com/photo-1617788138017-80ad40651399?w=200&q=70'">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-sub">${item.colorN ? item.colorN + ' · ' : ''}${item.option}</div>
        <div class="cart-item-price">${fmt(item.price)}</div>
        <div class="qty-controls">
          <button class="qty-btn" onclick="changeCartQty(${i},-1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="changeCartQty(${i},1)">+</button>
          <button class="remove-btn" onclick="removeCartItem(${i})">✕ Remove</button>
        </div>
      </div>
    </div>`).join('');

  const sub = cart.reduce((s, i) => s + (i.price * i.qty), 0);
  const tax = sub * 0.18;
  document.getElementById('s-subtotal').textContent = fmt(sub);
  document.getElementById('s-tax').textContent      = fmt(tax);
  document.getElementById('s-total').textContent    = fmt(sub + tax);
  footer.style.display = '';
  updateBadges();
}

function changeCartQty(idx, delta) {
  cart[idx].qty = Math.max(1, Math.min(10, cart[idx].qty + delta));
  localStorage.setItem('nc_cart', JSON.stringify(cart));
  updateCartUI();
}

function removeCartItem(idx) {
  cart.splice(idx, 1);
  localStorage.setItem('nc_cart', JSON.stringify(cart));
  updateCartUI();
  toast('Item removed from cart');
}


/* =====================================================
   CHECKOUT
   ===================================================== */
function openCheckout() {
  if (!cart.length) { toast('Your cart is empty', 'error'); return; }
  closeCart();

  // Order summary
  document.getElementById('co-summary').innerHTML = cart.map(i =>
    `<div class="checkout-item">
      <span class="checkout-item-name">
        ${i.name} ${i.colorN ? '(' + i.colorN + ')' : ''} ×${i.qty}
      </span>
      <span class="checkout-item-price">${fmt(i.price * i.qty)}</span>
    </div>`
  ).join('');

  // Totals
  const sub = cart.reduce((s, i) => s + (i.price * i.qty), 0);
  const tax = sub * 0.18;
  document.getElementById('co-subtotal').textContent = fmt(sub);
  document.getElementById('co-vat').textContent      = fmt(tax);
  document.getElementById('co-grand').textContent    = fmt(sub + tax);

  // Reset pay button state
  document.getElementById('pay-btn-label').style.display = '';
  document.getElementById('pay-loading').style.display   = 'none';
  document.getElementById('pay-btn').disabled = false;

  document.getElementById('checkout-modal').classList.add('active');
}

function closeCheckout() {
  document.getElementById('checkout-modal').classList.remove('active');
}

function closeCheckoutOnBg(e) {
  if (e.target === document.getElementById('checkout-modal')) closeCheckout();
}

function switchPayTab(method, btn) {
  payMethod = method;
  document.querySelectorAll('.pay-tab').forEach(b  => b.classList.remove('active'));
  document.querySelectorAll('.pay-form').forEach(f => f.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('pf-' + method).classList.add('active');
}

// ── Card input formatting ──
function formatCardNum(el) {
  let v   = el.value.replace(/\D/g, '').substring(0, 16);
  el.value = v.replace(/(.{4})/g, '$1 ').trim();
}

function formatExpiry(el) {
  let v   = el.value.replace(/\D/g, '').substring(0, 4);
  if (v.length > 2) v = v.substring(0, 2) + ' / ' + v.substring(2);
  el.value = v;
}

// ── Payment validation ──
function validatePayment() {
  if (payMethod === 'card') {
    const name = document.getElementById('card-name').value.trim();
    const num  = document.getElementById('card-num').value.replace(/\s/g, '');
    const exp  = document.getElementById('card-exp').value;
    const cvv  = document.getElementById('card-cvv').value;
    if (!name)          { toast('Enter cardholder name', 'error'); return false; }
    if (num.length < 16){ toast('Enter a valid 16-digit card number', 'error'); return false; }
    if (exp.length < 4) { toast('Enter a valid expiry date', 'error'); return false; }
    if (cvv.length < 3) { toast('Enter a valid CVV', 'error'); return false; }
  } else if (payMethod === 'mtn') {
    const ph = document.getElementById('mtn-phone').value.trim();
    if (!ph || ph.length < 10) { toast('Enter a valid MTN Uganda number', 'error'); return false; }
  } else if (payMethod === 'airtel') {
    const ph = document.getElementById('airtel-phone').value.trim();
    if (!ph || ph.length < 10) { toast('Enter a valid Airtel Uganda number', 'error'); return false; }
  } else if (payMethod === 'mpesa') {
    const ph = document.getElementById('mpesa-phone').value.trim();
    if (!ph || ph.length < 10) { toast('Enter a valid M-Pesa number', 'error'); return false; }
  }
  return true;
}

// ── Process payment with animated steps ──
function processPayment() {
  if (!validatePayment()) return;

  const btn        = document.getElementById('pay-btn');
  const label      = document.getElementById('pay-btn-label');
  const loading    = document.getElementById('pay-loading');
  const statusText = document.getElementById('pay-status-text');

  btn.disabled         = true;
  label.style.display  = 'none';
  loading.style.display = 'flex';

  const steps = {
    card:   ['Connecting to bank…', 'Verifying card…', 'Processing payment…', 'Confirming order…'],
    mtn:    ['Sending MTN MoMo prompt…', 'Waiting for approval…', 'Payment received…', 'Confirming order…'],
    airtel: ['Sending Airtel prompt…', 'Waiting for approval…', 'Payment received…', 'Confirming order…'],
    mpesa:  ['Sending STK push…', 'Awaiting M-Pesa PIN…', 'Payment received…', 'Confirming order…']
  };

  const msgs = steps[payMethod];
  let step = 0;
  const stepInterval = setInterval(() => {
    statusText.textContent = msgs[step] || msgs[msgs.length - 1];
    step++;
    if (step >= msgs.length) {
      clearInterval(stepInterval);
      setTimeout(() => { closeCheckout(); showOrderSuccess(); }, 800);
    }
  }, 900);
}


/* =====================================================
   ORDER SUCCESS
   ===================================================== */
function generateTrackingId() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let id = 'NC-2026-';
  for (let i = 0; i < 8; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}

function showOrderSuccess() {
  const trackId = generateTrackingId();
  document.getElementById('tracking-id-display').textContent = trackId;

  const delivery = new Date();
  delivery.setDate(delivery.getDate() + 14 + Math.floor(Math.random() * 7));
  document.getElementById('est-delivery-date').textContent =
    delivery.toLocaleDateString('en-UG', {
      weekday:'long', day:'numeric', month:'long', year:'numeric'
    });

  // Clear cart after order
  cart = [];
  localStorage.setItem('nc_cart', JSON.stringify(cart));
  updateBadges();

  document.getElementById('success-modal').classList.add('active');
  toast(`Order placed! ID: ${trackId}`, 'success');
}

function closeSuccess() {
  document.getElementById('success-modal').classList.remove('active');
}

function copyTracking() {
  const id = document.getElementById('tracking-id-display').textContent;
  navigator.clipboard.writeText(id).then(() => toast('Tracking ID copied!', 'success'));
}


/* =====================================================
   AUTH
   ===================================================== */
function openAuth()         { document.getElementById('auth-modal').classList.add('active'); }
function closeAuth()        { document.getElementById('auth-modal').classList.remove('active'); }
function closeAuthOnBg(e)   { if (e.target === document.getElementById('auth-modal')) closeAuth(); }

function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab-btn').forEach((b, i) =>
    b.classList.toggle('active', (i===0 && tab==='signin') || (i===1 && tab==='signup'))
  );
  document.getElementById('signin-panel').classList.toggle('active', tab === 'signin');
  document.getElementById('signup-panel').classList.toggle('active', tab === 'signup');
}

function isValidPassword(pw) {
  return pw.length >= 6 && /[A-Z]/.test(pw) && /[a-z]/.test(pw) && /[@#$?!]/.test(pw);
}

function handleSignIn() {
  const email  = document.getElementById('si-email').value.trim();
  const pass   = document.getElementById('si-password').value;
  const stored = JSON.parse(localStorage.getItem('nc_users') || '[]');
  const user   = stored.find(u => u.email === email && u.pass === pass);
  if (!email || !pass) { toast('Please fill in all fields', 'error'); return; }
  if (user) {
    loggedIn = email;
    localStorage.setItem('nc_user', email);
    updateAuthBtn();
    closeAuth();
    toast(`Welcome back, ${email.split('@')[0]}! 👋`, 'success');
  } else {
    toast('Incorrect email or password', 'error');
  }
}

function handleSignUp() {
  const name    = document.getElementById('su-name').value.trim();
  const email   = document.getElementById('su-email').value.trim();
  const phone   = document.getElementById('su-phone').value.trim();
  const pass    = document.getElementById('su-pass').value;
  const confirm = document.getElementById('su-confirm').value;
  const stored  = JSON.parse(localStorage.getItem('nc_users') || '[]');

  if (!name || !email || !pass) { toast('Please fill in all required fields', 'error'); return; }
  if (pass !== confirm)         { toast('Passwords do not match', 'error'); return; }
  if (!isValidPassword(pass))   { toast('Password: 6+ chars, uppercase, lowercase, and @#$?!', 'error'); return; }
  if (stored.find(u => u.email === email)) { toast('Email already registered', 'error'); return; }

  stored.push({ name, email, phone, pass });
  localStorage.setItem('nc_users', JSON.stringify(stored));
  loggedIn = email;
  localStorage.setItem('nc_user', email);
  updateAuthBtn();
  closeAuth();
  toast(`Account created! Welcome, ${name}! 🎉`, 'success');
}

function updateAuthBtn() {
  const btn = document.getElementById('auth-nav-btn');
  if (!loggedIn) return;
  const name = loggedIn.split('@')[0];
  btn.textContent = `Hi, ${name}`;
  btn.onclick = () => {
    if (confirm('Sign out of NovaCartel?')) {
      loggedIn = null;
      localStorage.removeItem('nc_user');
      btn.textContent = 'Sign In';
      btn.onclick = openAuth;
      toast('Signed out successfully');
    }
  };
}


/* =====================================================
   TOAST NOTIFICATIONS
   ===================================================== */
function toast(msg, type = 'info') {
  const el    = document.createElement('div');
  el.className = `toast ${type}`;
  const icons  = { success: '✓', error: '✕', info: 'ℹ' };
  el.innerHTML = `<span>${icons[type] || '•'}</span><span>${msg}</span>`;
  document.getElementById('toast-container').appendChild(el);
  setTimeout(() => el.remove(), 3100);
}