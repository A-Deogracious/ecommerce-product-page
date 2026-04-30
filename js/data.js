/* =====================================================
   NOVACARTEL — data.js
   Product catalog & constants
   ===================================================== */

// Currency configuration
const RATES   = { USD: 1, UGX: 3750, KES: 130 };
const SYMBOLS = { USD: '$', UGX: 'UGX ', KES: 'KES ' };

/**
 * products
 * - id: unique string
 * - name: display name
 * - brand: brand/manufacturer
 * - category: 'vehicles' | 'energy' | 'merch'
 * - price: base price in USD
 * - tag: optional badge label
 * - image: hero image URL
 * - specs: short headline specs
 * - desc: marketing description
 * - colors: [{ n: 'Name', v: '#hex' }]
 * - options: trims / sizes / capacities
 */
const products = [

  // ═══════════════ TESLA ═══════════════
  {
    id:'tesla-s-plaid', name:'Model S', brand:'Tesla', category:'vehicles',
    price:94990, tag:'Best Seller',
    // Clean white studio sedan, correct Tesla branding
    image:'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-S-All-Electric-Performance-Desktop-NA-TW-KR.jpg',
    specs:'1,020 hp  |  1.99s 0–60 mph  |  396 mi range',
    desc:'The quickest production sedan ever made. Plaid tri‑motor powertrain with track‑ready hardware.',
    colors:[
      {n:'Pearl White',v:'#f5f5f0'},{n:'Midnight Silver',v:'#8a8f9e'},
      {n:'Ultra Red',v:'#c0392b'},{n:'Solid Black',v:'#1a1a1a'},{n:'Deep Blue',v:'#1a3a5c'}
    ],
    options:['19" Tempest','21" Arachnid']
  },
  {
    id:'tesla-model3', name:'Model 3', brand:'Tesla', category:'vehicles',
    price:57990,
    image:'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Standard-Affordable-Desktop.jpg',
    specs:'510 hp  |  3.1s 0–60 mph  |  315 mi range',
    desc:'Compact sport sedan with razor‑sharp handling and everyday practicality.',
    colors:[
      {n:'Pearl White',v:'#f5f5f0'},{n:'Midnight Silver',v:'#8a8f9e'},
      {n:'Deep Blue',v:'#1a3a5c'},{n:'Solid Black',v:'#1a1a1a'},{n:'Quicksilver',v:'#c8c8c8'}
    ],
    options:['18" Aero','20" Überturbine']
  },
  {
    id:'tesla-modelx', name:'Model X', brand:'Tesla', category:'vehicles',
    price:119990, tag:'New',
    image:'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-X-Hero-Desktop-US.png',
    specs:'1,020 hp  |  2.5s 0–60 mph  |  333 mi range  |  6–7 seats',
    desc:'Falcon Wing doors, supercar acceleration, and space for the whole family.',
    colors:[
      {n:'Pearl White',v:'#f5f5f0'},{n:'Midnight Silver',v:'#8a8f9e'},
      {n:'Deep Blue',v:'#1a3a5c'},{n:'Solid Black',v:'#1a1a1a'},{n:'Red',v:'#c0392b'}
    ],
    options:['20" Cyberstream','22" Turbine']
  },
  {
    id:'tesla-cybertruck', name:'Cybertruck', brand:'Tesla', category:'vehicles',
    price:79990, tag:'Limited',
    image:'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Cybertruck-Accessories-Desktop.jpg',
    specs:'845 hp  |  2.6s 0–60 mph  |  320 mi range  |  Exoskeleton',
    desc:'Ultra‑hard stainless steel exoskeleton, adaptive air suspension, and vault‑like storage.',
    colors:[{n:'Stainless Steel',v:'#d4d4d0'}],
    options:['All‑Terrain','Off‑Road']
  },

  // ═══════════════ FERRARI ═══════════════
  {
    id:'ferrari-f8', name:'F8 Tributo', brand:'Ferrari', category:'vehicles',
    price:280000, tag:'Exotic',
    image:'https://ferrari-cdn.thron.com/delivery/public/thumbnail/ferrari/e9677798-7b8b-42b1-becf-387235c70b2a/bocxuw/std/488x325/e9677798-7b8b-42b1-becf-387235c70b2a?scalemode=auto',
    specs:'710 hp  |  2.9s 0–60 mph  |  V8 Twin‑Turbo',
    desc:'The most powerful V8 Ferrari ever, blending Formula 1 know‑how with road‑car usability.',
    colors:[
      {n:'Rosso Corsa',v:'#cc0000'},{n:'Giallo Modena',v:'#f0c000'},
      {n:'Nero Daytona',v:'#1a1a1a'},{n:'Bianco Avus',v:'#f5f5f5'},{n:'Grigio Titanio',v:'#6a6a6a'}
    ],
    options:['Standard','Sport Exhaust','Lift System']
  },
  {
    id:'ferrari-roma', name:'Roma', brand:'Ferrari', category:'vehicles',
    price:230000,
    image:'https://cdn.ferrari.com/cms/network/media/img/resize/%7CMOD_000000000000050%7CWEB%7Cferrari_roma_4_3_RWFx768.png?width=384&height=288&bucket=genuine',
    specs:'612 hp  |  3.4s 0–60 mph  |  V8 Twin‑Turbo  |  GT',
    desc:'A modern take on la dolce vita, with minimalist design and long‑distance comfort.',
    colors:[
      {n:'Rosso Portofino',v:'#b22222'},{n:'Grigio Ingrid',v:'#888888'},
      {n:'Bianco Cervino',v:'#f0f0f0'},{n:'Nero DS',v:'#111111'},{n:'Blu Corsa',v:'#003d6b'}
    ],
    options:['Carbon Package','Daytona Seats']
  },

  // ═══════════════ TOYOTA ═══════════════
  {
    id:'toyota-lc300', name:'Land Cruiser 300', brand:'Toyota', category:'vehicles',
    price:85000,
    image:'https://www.toyota.co.ug/media/gamme/modeles/images/4f0fe5d326716b260e169ec9a75417d4.png',
    specs:'415 hp  |  Twin‑Turbo V6  |  Multi‑Terrain 4WD',
    desc:'The latest Land Cruiser: bulletproof reliability with a new level of refinement.',
    colors:[
      {n:'White Pearl',v:'#f5f5f0'},{n:'Graphite',v:'#4a4a4a'},
      {n:'Silver',v:'#c8c8c8'},{n:'Bronze',v:'#8B6914'},{n:'Black',v:'#111111'}
    ],
    options:['GX','VX','GR Sport']
  },
  {
    id:'toyota-supra', name:'GR Supra', brand:'Toyota', category:'vehicles',
    price:56000, tag:'Performance',
    image:'https://tmna.aemassets.toyota.com/is/image/toyota/toyota/vehicles/2026/grsupra2/galleries/MUL_MY26_0001_V002.png:tcom_gallery_4x3?ts=1777498116351&fmt=jpg&fit=crop&dpr=on,2',
    specs:'382 hp  |  3.9s 0–60 mph  |  B58 Inline‑6',
    desc:'Rear‑wheel‑drive sports car tuned on the Nürburgring, born from Gazoo Racing.',
    colors:[
      {n:'Nitro Yellow',v:'#f0c000'},{n:'White',v:'#f5f5f0'},
      {n:'Black',v:'#111111'},{n:'Renaissance Red',v:'#aa2222'},{n:'Horizon Blue',v:'#4169e1'}
    ],
    options:['3.0 GR','3.0 GR Premium','A91‑MT']
  },
  {
    id:'toyota-hilux', name:'Hilux GR‑S', brand:'Toyota', category:'vehicles',
    price:42000,
    image:'https://4x4afrika.com/wp-content/uploads/2024/05/Hilux-7.jpg',
    specs:'228 hp  |  2.8L Diesel  |  4x4 Automatic',
    desc:'Africa’s favorite pick‑up, upgraded with GR Sport suspension and styling.',
    colors:[
      {n:'White',v:'#f5f5f0'},{n:'Silver',v:'#c0c0c0'},
      {n:'Grey',v:'#808080'},{n:'Red',v:'#c00000'},{n:'Black',v:'#111111'}
    ],
    options:['Single Cab','Double Cab','Xtra Cab']
  },

  // ═══════════════ FORD ═══════════════
  {
    id:'ford-mustang', name:'Mustang Dark Horse', brand:'Ford', category:'vehicles',
    price:57990, tag:'New',
    image:'https://www.ford.com/acslibs/content/dam/na/ford/en_us/images/mustang/2026/jellybeans/26_frd_mst_dkhr_sc_dr78_arbl.png',
    specs:'500 hp  |  3.9s 0–60 mph  |  5.0L Coyote V8',
    desc:'Track‑focused Mustang with unique aero, cooling, and chassis tuning.',
    colors:[
      {n:'Vapor Blue',v:'#4a5f7f'},{n:'Shadow Black',v:'#1a1a1a'},
      {n:'Race Red',v:'#cc0000'},{n:'Atlas Blue',v:'#1c3f6e'},{n:'White',v:'#f5f5f5'}
    ],
    options:['Fastback','Convertible','California Special']
  },
  {
    id:'ford-bronco', name:'Bronco Raptor', brand:'Ford', category:'vehicles',
    price:70995, tag:'Off‑Road',
    image:'https://www.ford.com/acslibs/content/dam/na/ford/en_us/images/bronco/2026/general/26_frd_bro_rptr_4d_dr34_shgn.png',
    specs:'418 hp  |  Twin‑Turbo V6  |  37" tires',
    desc:'Wide‑body Bronco with FOX Live Valve dampers and desert‑rated suspension.',
    colors:[
      {n:'Code Orange',v:'#e55500'},{n:'Avalanche',v:'#e0e0e0'},
      {n:'Cactus Gray',v:'#6b7b6a'},{n:'Oxford White',v:'#f5f5f0'},{n:'Black',v:'#111111'}
    ],
    options:['2‑Door','4‑Door','Sasquatch Pkg']
  },
  {
    id:'ford-f150-lightning', name:'F‑150 Lightning', brand:'Ford', category:'vehicles',
    price:55000,
    image:'https://www.assets.ford.com/adobe/assets/urn:aaid:aem:22986718-11ac-4e3b-ad52-be0251ab02b4/as/Lightning_Mosaic4.webp?max-quality=75&crop-names=1_1x1&width=1920',
    specs:'580 hp  |  4.5s 0–60 mph  |  320 mi range  |  Electric',
    desc:'America’s best‑selling truck, now fully electric with Pro Power Onboard.',
    colors:[
      {n:'Platinum White',v:'#f0f0f0'},{n:'Rapid Red',v:'#b22222'},
      {n:'Atlas Blue',v:'#1c3f6e'},{n:'Carbonized Gray',v:'#555555'},{n:'Black',v:'#111111'}
    ],
    options:['Standard Range','Extended Range','Platinum']
  },

  // ═══════════════ JEEP ═══════════════
  {
    id:'jeep-wrangler', name:'Wrangler Rubicon 392', brand:'Jeep', category:'vehicles',
    price:72000, tag:'Icon',
    image:'https://www.jeep.com/content/dam/cross-regional/stellantis/jeep/emea/south-africa/en_za/Offers/g-offer.jpg.img.2000.jpg',
    specs:'470 hp  |  4.9s 0–60 mph  |  6.4L HEMI V8',
    desc:'The loudest, wildest Wrangler with factory V8 power and serious trail gear.',
    colors:[
      {n:'Sarge Green',v:'#4a5f40'},{n:'Firecracker Red',v:'#cc2200'},
      {n:'Black',v:'#111111'},{n:'Hydro Blue',v:'#2060a0'},{n:'Bright White',v:'#f5f5f5'}
    ],
    options:['2‑Door','4‑Door','Sky One‑Touch']
  },
  {
    id:'jeep-grand-cherokee', name:'Jeep Grand Cherokee', brand:'Jeep', category:'vehicles',
    price:95000,
    image:'https://www.jeep.com/content/dam/cross-regional/stellantis/jeep/emea/south-africa/en_za/Showrooms/Grand/grand-main.png.img.2880.png',
    specs:'707 hp  |  3.5s 0–60 mph  |  Supercharged V8',
    desc:'Super‑SUV with Hellcat power, Brembo brakes, and adaptive suspension.',
    colors:[
      {n:'Diamond Black',v:'#111111'},{n:'White',v:'#f5f5f0'},
      {n:'Silver',v:'#c0c0c0'},{n:'Velvet Red',v:'#7b1c1c'},{n:'Granite',v:'#555555'}
    ],
    options:['7‑Seat','5‑Seat','L Trim']
  },

  // ═══════════════ MERCEDES ═══════════════
  {
    id:'mercedes-g63', name:'G 63 AMG', brand:'Mercedes', category:'vehicles',
    price:175000, tag:'Icon',
    //image:'data:image/webp;base64,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',
    image:'https://www.mercedes-amg.com/media/images/e4ce284b433bf5dad43b40051f89f627b9ad6ee4-1440x810.jpg?auto=format&fit=max&q=75&w=1440',
    specs:'577 hp  |  4.5s 0–60 mph  |  V8 Biturbo  |  4MATIC+',
    desc:'Hand‑built AMG V8 in a modernised G‑Class shell — the ultimate luxury off‑roader.',
    colors:[
      {n:'Obsidian Black',v:'#111111'},{n:'Diamond White',v:'#f0f0f0'},
      {n:'Designo Platinum',v:'#c0b090'},{n:'Emerald Green',v:'#1a5f2a'},{n:'Manufaktur Red',v:'#8b0000'}
    ],
    options:['Standard','Night Package','Manufaktur']
  },
  {
    id:'mercedes-gle63', name:'GLE 63 S AMG', brand:'Mercedes', category:'vehicles',
    price:135000,
    image:'https://th.bing.com/th/id/OIP.DLQ_e4qzYpiUBxvQiBEg7wHaEo?w=261&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3',
    specs:'603 hp  |  3.7s 0–60 mph  |  V8 Biturbo  |  Luxury SUV',
    desc:'High‑riding, high‑performance AMG SUV with coupe‑like styling and air suspension.',
    colors:[
      {n:'Obsidian Black',v:'#111111'},{n:'Polar White',v:'#f5f5f0'},
      {n:'Selenite Grey',v:'#8a8a8a'},{n:'Brilliant Blue',v:'#1a3060'},{n:'Hyacinth Red',v:'#700028'}
    ],
    options:['5‑Seat','7‑Seat','Coupe']
  },

  // ═══════════════ BMW ═══════════════
  {
    id:'bmw-m5', name:'M5 CS', brand:'BMW', category:'vehicles',
    price:145000, tag:'Performance',
    image:'https://www.bmw-m.com/content/dam/bmw/marketBMW_M/www_bmw-m_com/topics/magazine-article-pool/2021/entwickler-faq/bmw-m5-cs-cp-03.jpg?imwidth=1024',
    specs:'627 hp  |  2.9s 0–60 mph  |  V8 Biturbo  |  M xDrive',
    desc:'The lightest, most powerful M5 ever built — a four‑door supercar.',
    colors:[
      {n:'Frozen Brands Hatch Grey',v:'#888888'},{n:'Alpine White',v:'#f5f5f5'},
      {n:'Sapphire Black',v:'#111111'},{n:'Tanzanite Blue',v:'#1a1f60'}
    ],
    options:['Sedan','Track Package']
  },
  {
    id:'bmw-x5m', name:'X5 M Competition', brand:'BMW', category:'vehicles',
    price:117000,
    image:'https://bmw.scene7.com/is/image/BMW/BMW-MY26-X5-DI22_000118721-Retouched:3to2?fmt=webp&wid=1504&hei=1003',
    specs:'617 hp  |  3.7s 0–60 mph  |  V8 Biturbo  |  M xDrive',
    desc:'High‑performance family SUV with adaptive M suspension and luxurious interior.',
    colors:[
      {n:'Brooklyn Grey',v:'#777777'},{n:'Black Sapphire',v:'#111111'},
      {n:'Mineral White',v:'#f0f0f0'},{n:'Phytonic Blue',v:'#3a4f6e'},{n:'Tanzanite Blue',v:'#1a1f60'}
    ],
    options:['Standard','Competition Pro','Ultimate']
  },

  // ═══════════════ LAMBORGHINI ═══════════════
  {
    id:'lambo-urus', name:'Urus S', brand:'Lamborghini', category:'vehicles',
    price:240000, tag:'Exotic',
    image:'https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/0_facelift_2025/model_details/urus_s/refresh_11_25/1.jpg',
    specs:'657 hp  |  3.3s 0–60 mph  |  V8 Twin‑Turbo  |  AWD',
    desc:'Super‑SUV that combines everyday usability with unmistakable Lamborghini drama.',
    colors:[
      {n:'Bianco Monocerus',v:'#f5f5f0'},{n:'Nero Noctis',v:'#111111'},
      {n:'Giallo Auge',v:'#f0c000'},{n:'Arancio Borealis',v:'#e06000'},{n:'Verde Mantis',v:'#2d6e1a'}
    ],
    options:['Urus S','Urus Performante']
  },
  {
    id:'lambo-huracan', name:'Huracán Tecnica', brand:'Lamborghini', category:'vehicles',
    price:280000,
    image:'https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/model_detail/huracan/tecnica/2025/s1.jpg',
    specs:'630 hp  |  3.2s 0–60 mph  |  V10 NA  |  RWD',
    desc:'Naturally aspirated V10 with rear‑wheel drive and rear‑axle steering.',
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
    image:'https://prs.porsche.com/iod/image/US/992142/1/N4Igxg9gdgZglgcxALlAQynAtmgLnaAZxQG0BdAGnDSwFMAnNFUOAExRFoA9cBaAC0T9e9Wmnq8ANrRi4QVCAAd8RZiABu4uBjnIQrWoQDWuJSAC+5qrSjq49aHSi6W7PQHk0hOMQXKCUMSollSSQvhQSKggbBwAIgCCAJryIEoqgcwhIIoOrACuYC4xbiAAnGUATACMACyVqekBQaCQsIikIAAMAJIAzKldAHIArINDAEKDAAplgwAqAMKp1RMAaisA4gAcKwAyAMorQ9XHCSvTXSsAGg1UlYtj93Gn9wCyqZVrryCVAOpXe4ALQAYqk+iDzlQ+gAJKEgPoHWqpWoJAZUWoggBsKM20xRexxGIAqlMqCNtilyQBpI7k+Yw1Ija7XVJYibwrEAUS5bJBPyxIL+bP6bIAUnE2UNOQAlZZULHXDZUADsCT2qRV1PRIBVxM2mrWgN1t1S2x68zNe0ZVG2QxVZvmP22awNtqBRPKIzJ5QSkqoZTF8LK012AbW1NSZT+loDQN5VASrKocRVPq5XXhXLedxAIPtqRBQONm2qYKomxhOs28xL31SPTWuZ6fx11O28pA1ISuepAEUdXsa3EZRqqH3an3Un2YT8+2LPX2+7m+zK5uPiWGQMSernidMfsTrg6qGtFrm1iCL3tjWsZbf5p6gdUjpRwBB8s56ABPDjEukgFgEAGJISRiPQKCVF0lRYpYVggIQtC4BECAtCAMAQPQOC6CAABWii0EgVC4IwgSKOINi6DAaCSIhlhAA?clientId=modelpage',
    specs:'473 hp  |  2.9s 0–60 mph  |  Flat‑6 Twin‑Turbo',
    desc:'Crucial to the unique 911 driving experience: the optimal set-up. This includes new engine mounts, a completely revised chassis, and even wider wheels to transform the increased power output into breathtaking dynamics..',
    colors:[
      {n:'GT Silver',v:'#a0a8b0'},{n:'Guards Red',v:'#cc0000'},
      {n:'Python Green',v:'#2d5a1a'},{n:'Black',v:'#111111'},{n:'White',v:'#f5f5f0'}
    ],
    options:['Coupé','Targa','Cabriolet']
  },
  {
    id:'porsche-cayenne', name:'Cayenne Turbo GT', brand:'Porsche', category:'vehicles',
    price:182000, tag:'Performance',
    image:'https://a.storyblok.com/f/322327/2616x1472/d6b80b56cf/cy24j5sox0004-cayenne-turbo-gt-side.jpg/m/1800x1012/smart/filters:format(avif)?dpl=dpl_84DQ5T7k2cVR1pikEsfobyXKvQmA',
    specs:'631 hp  |  3.1s 0–60 mph  |  V8 Twin‑Turbo',
    desc:'Nürburgring‑record SUV with track‑ready chassis and expressive styling.',
    colors:[
      {n:'Arctic Grey',v:'#8a8f9e'},{n:'Jet Black',v:'#111111'},
      {n:'Carrara White',v:'#f5f5f5'},{n:'Crayon',v:'#d4d4d0'},{n:'Lava Orange',v:'#ff4500'}
    ],
    options:['Turbo GT','Coupe Turbo GT']
  },

  // ═══════════════ LAND ROVER ═══════════════
  {
    id:'SUV', name:'SUV 2020 Defender', brand:'Land Rover', category:'vehicles',
    price:98000, tag:'Adventure',
    image:'https://editorial.pxcrush.net/carsales/general/editorial/land_rover_defender_01-6k5y.jpg?width=1024&height=682',
    specs:'395 hp  |  3.0L i6  |  All‑Terrain AWD  |  4 seats',
    desc:'Best Off-Road SUV 2022: The verdict; built for East African backroads.',
    colors:[
      {n:'Gondwana Stone',v:'#8a7a5a'},{n:'Hakuba Silver',v:'#c0c0c0'},
      {n:'Tasman Blue',v:'#21486b'},{n:'Fuji White',v:'#f5f5f5'},{n:'Santorini Black',v:'#111111'}
    ],
    options:['X‑Dynamic SE','X‑Dynamic HSE','X']
  },

  // ═══════════════ KIIRA MOTORS / UGANDA ═══════════════
  {
    id:'kayoola-evs', name:'Kayoola EVS', brand:'Kiira Motors', category:'vehicles',
    price:210000, tag:'Made in Uganda',
    image:'https://kiiramotorsstorage.blob.core.windows.net/assets/database_assets/products/tour%20bus%202.jpg',
    specs:'Fully Electric  |  200+ km range  |  56–90 passengers',
    desc:'Uganda’s flagship electric city bus, engineered by Kiira Motors for African cities.',
    colors:[
      {n:'Pearl White',v:'#f5f5f0'},{n:'Emerald Green',v:'#1a5f2a'},
      {n:'Sunrise Yellow',v:'#f2c200'},{n:'Kampala Blue',v:'#003f7f'}
    ],
    options:['8‑m City Bus','12‑m City Bus','School Bus']
  },
  {
    id:'kayoola-dvs', name:'Kayoola DVS Hybrid', brand:'Kiira Motors', category:'vehicles',
    price:185000,
    image:'https://kiiramotorsstorage.blob.core.windows.net/assets/database_assets/products/Bus%20images/Kayoola%20EVS%202023%2010m%201.1.jpg',
    specs:'Hybrid Diesel‑Electric  |  High efficiency  |  Urban & up‑country routes',
    desc:'Dual‑powertrain bus optimised for long duty cycles and demanding African routes.',
    colors:[
      {n:'Pearl White',v:'#f5f5f0'},{n:'Forest Green',v:'#175c30'}
    ],
    options:['City Bus','Rapid Bus']
  },
  {
    id:'kiira-ev-pickup', name:'Kiira EV Coach Concept', brand:'Kiira Motors', category:'vehicles',
    price:65000,
    image:'https://kiiramotorsstorage.blob.core.windows.net/assets/database_assets/products/Bus%20images/13m%20Kayoola%20Coach%20(2025%20Model)_available%20in%20electric%20or%20diesel%20variants.jpg',
    specs:'Electric  |  300 km range  |  1‑ton payload',
    desc:'Concept electric pickup targeting farms, fleets, and last‑mile logistics in East Africa.',
    colors:[
      {n:'Summit White',v:'#f5f5f0'},{n:'Graphite',v:'#555555'}
    ],
    options:['Single Cab','Double Cab']
  },

  // ═══════════════ ENERGY SOLUTIONS ═══════════════
  {
    id:'nova-solar-home', name:'Tesla Solar Panels', brand:'NovaEnergy', category:'energy',
    price:1200, tag:'Off‑Grid Ready',
    image:'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Solar-Panels-Sleek-Desktop.jpg',
    specs:'1.5 kW  |  Lithium Battery  |  Hybrid Inverter',
    desc:'Home solar bundle sized for lighting, TV, fridge and phone charging in East Africa.',
    colors:[
      {n:'Midnight Black',v:'#111111'},{n:'Arctic White',v:'#f5f5f5'}
    ],
    options:['Starter (1.5 kW)','Plus (3 kW)','Pro (5 kW)']
  },
  {
    id:'nova-solar-business', name:'Solar Business Micro‑Grid', brand:'Tata Group', category:'energy',
    price:7800, tag:'SME Favorite',
    image:'https://www.tata.com/content/dam/tata/images/newsroom/business/desktop/microgrid_tatapower_banner_desktop_1920x1080.jpg',
    specs:'10–50 kW  |  Remote Monitoring  |  Financing Available',
    desc:'Scalable micro‑grids for schools, clinics, and SMEs, with remote monitoring and support.',
    colors:[
      {n:'Industrial Grey',v:'#555555'},{n:'Signal Blue',v:'#004f9f'}
    ],
    options:['10 kW','25 kW','50 kW']
  },

  // ═══════════════ MERCH / NOVA WEAR ═══════════════
  {
    id:'novawear-shirt', name:'Honda Marked White Quater Zip Work Shirt', brand:'Honda', category:'merch',
    price:45,
    image:'https://scene7.zumiez.com/is/image/zumiez/409416-US',
    specs:'Premium cotton  |  Unisex  |  Kampala–Nairobi–Kigali',
    desc:'Soft‑touch black tee with subtle NovaCartel wordmark — ideal for car meets and track days.',
    colors:[
      {n:'Jet Black',v:'#111111'},{n:'Ivory',v:'#f5f5f0'},{n:'Deep Navy',v:'#1c2741'}
    ],
    options:['XS','S','M','L','XL','XXL']
  },
  {
    id:'novawear-jacket', name:'Black Racing Jacket', brand:'Honda', category:'merch',
    price:35, tag:'New',
    image:'https://scene7.zumiez.com/is/image/zumiez/395401-US',
    specs:'Adjustable  |  Embroidered logo  |  UV resistant',
    desc:'Low‑profile cap with embroidered NovaCartel crest for daily wear in the Kampala sun.',
    colors:[
      {n:'Stone',v:'#b9b49a'},{n:'Black',v:'#111111'},{n:'Forest Green',v:'#1f4f2a'}
    ],
    options:['One Size']
  },
  {
    id:'novawear-bag', name:'Toyota Racing Travel Bag', brand:'Toyota', category:'merch',
    price:85, tag:'Limited',
    // image:'data:image/webp;base64,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',
    image:'https://s7d4.scene7.com/is/image/BIworldwide/TO020500?$listGrid$',
    specs:'Heavyweight fleece  |  Hidden phone pocket',
    desc:'Oversized hoodie with gold circuit print inspired by night drives across East Africa.',
    colors:[
      {n:'Charcoal',v:'#333333'},{n:'Ash',v:'#777777'},{n:'Midnight',v:'#02030a'}
    ],
    options:['S','M','L','XL']
  }

];

// Hero carousel featured products
const heroProducts = [
  'tesla-s','ferrari-f8','toyota-lc300',
  'lambo-huracan','kayoola-evs','bmw-m5','mercedes-g63',
  'ford-bronco','rr-defender'
];