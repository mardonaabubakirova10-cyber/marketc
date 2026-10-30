export type StockStatus = "in_stock" | "low_stock" | "out_of_stock";
export type Finish = "matte" | "satin" | "glossy" | "sheer";
export type Category = "lips" | "eyes" | "face" | "care";

export interface ProductShade {
  id: string;
  name: string;
  nameEn: string;
  hex: string;
  stock: StockStatus;
  price?: number; // если отличается от базовой цены
}

export interface Product {
  id: string;
  slug: string;
  category: Category;
  name: string;
  nameEn: string;
  tagline: string;
  taglineEn: string;
  description: string;
  descriptionEn: string;
  ingredients: string;
  ingredientsEn: string;
  application: string;
  applicationEn: string;
  price: number;
  originalPrice?: number;
  currency: "RUB";
  finish: Finish;
  image: string; // URL Unsplash
  images: string[];
  shades: ProductShade[];
  stock: StockStatus;
  isNew?: boolean;
  isBestseller?: boolean;
  tags: string[];
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "p01",
    slug: "velvet-lip-tint-01",
    category: "lips",
    name: "Бархатный тинт для губ",
    nameEn: "Velvet Lip Tint",
    tagline: "Стойкое покрытие, матовый финиш без ощущения сухости",
    taglineEn: "Long-wearing matte coverage without the dry feel",
    description:
      "Стойкая формула с высоким содержанием пигмента создаёт однородное матовое покрытие, не подчёркивает шелушения и не стягивает губы. Обогащена маслом ши и каротиноидами — кожа остаётся увлажнённой до 8 часов.",
    descriptionEn:
      "A high-pigment, weightless formula that builds to a true matte without flaking or feeling tight. Enriched with shea butter and carotenoids for up to 8-hour hydration.",
    ingredients:
      "Dimethicone, Isododecane, Trimethylsiloxysilicate, Butyrospermum Parkii Butter, Vitamin E, Mica",
    ingredientsEn:
      "Dimethicone, Isododecane, Trimethylsiloxysilicate, Butyrospermum Parkii Butter, Vitamin E, Mica",
    application:
      "Нанесите тинт по контуру губ, затем распределите по всей поверхности. При желании добавьте второй слой для насыщенного покрытия.",
    applicationEn:
      "Apply along the lip line, then blend across the full lip. Build a second layer for deeper intensity.",
    price: 2490,
    currency: "RUB",
    finish: "matte",
    image: "/products/p01-lip-tint.jpg",
    images: [
      "/products/p01-lip-tint.jpg",
    ],
    shades: [
      { id: "s1-01", name: "Розовое пралине", nameEn: "Rose Praline", hex: "#C47B78", stock: "in_stock" },
      { id: "s1-02", name: "Пыльная роза", nameEn: "Dusty Rose", hex: "#B56E6E", stock: "in_stock" },
      { id: "s1-03", name: "Старая вишня", nameEn: "Antique Cherry", hex: "#8B3A3A", stock: "low_stock" },
      { id: "s1-04", name: "Нюд-беж", nameEn: "Nude Beige", hex: "#D4A595", stock: "in_stock" },
    ],
    stock: "in_stock",
    isBestseller: true,
    tags: ["lips", "matte", "bestseller"],
  },
  {
    id: "p02",
    slug: "gloss-serum-lips",
    category: "lips",
    name: "Блеск-сыворотка для губ",
    nameEn: "Lip Glow Serum",
    tagline: "Плампинг, сияние и уход в одном флаконе",
    taglineEn: "Plumping, gloss and care in one",
    description:
      "Блеск-сыворотка с пептидным комплексом и гиалуроновой кислотой мягко увеличивает объём губ и создаёт стойкое зеркальное сияние. Без эффекта жжения, без силиконовой тяжести.",
    descriptionEn:
      "A peptide-infused serum gloss with hyaluronic acid that plumps and reflects light with a mirror-finish shine — no tingling, no heavy silicone.",
    ingredients: "Aqua, Glycerin, Hyaluronic Acid, Palmitoyl Tripeptide-1, Rosa Damascena Extract",
    ingredientsEn: "Aqua, Glycerin, Hyaluronic Acid, Palmitoyl Tripeptide-1, Rosa Damascena Extract",
    application:
      "Нанесите аппликатором на чистые губы. Допустимо нанесение поверх помады для дополнительного блеска.",
    applicationEn: "Apply with the doe-foot applicator to bare lips or over lipstick for extra gloss.",
    price: 1890,
    currency: "RUB",
    finish: "glossy",
    image: "/products/p02-lip-gloss.jpg",
    images: [
      "/products/p02-lip-gloss.jpg",
    ],
    shades: [
      { id: "s2-01", name: "Прозрачный", nameEn: "Clear", hex: "#FFE4E1", stock: "in_stock" },
      { id: "s2-02", name: "Нежная коралль", nameEn: "Soft Coral", hex: "#E8A89C", stock: "in_stock" },
      { id: "s2-03", name: "Малиновый иней", nameEn: "Raspberry Frost", hex: "#C0587A", stock: "out_of_stock" },
    ],
    stock: "in_stock",
    isNew: true,
    tags: ["lips", "glossy", "new"],
  },
  {
    id: "p03",
    slug: "precision-liner-eyes",
    category: "eyes",
    name: "Жидкая подводка",
    nameEn: "Precision Liquid Liner",
    tagline: "Точная линия с первого нанесения, держится весь день",
    taglineEn: "A precise line from the first stroke, all day wear",
    description:
      "Ультратонкий кончик кисти диаметром 0.1 мм позволяет рисовать как классическую стрелку, так и сложные графические формы. Водостойкая и трансферустойчивая формула.",
    descriptionEn:
      "A 0.1 mm ultra-fine brush tip draws a classic flick or complex graphic shapes with precision. Waterproof and transfer-resistant.",
    ingredients: "Aqua, Acrylates Copolymer, Carbon Black, Butylene Glycol, Phenoxyethanol",
    ingredientsEn: "Aqua, Acrylates Copolymer, Carbon Black, Butylene Glycol, Phenoxyethanol",
    application:
      "Проведите линию вдоль ресничного края. Для стрелки начните с уголка глаза и проведите линию к центру.",
    applicationEn:
      "Draw along the lash line. For a wing, start from the outer corner and work inward.",
    price: 1650,
    currency: "RUB",
    finish: "matte",
    image: "/products/p03-eyeliner.jpg",
    images: [
      "/products/p03-eyeliner.jpg",
    ],
    shades: [
      { id: "s3-01", name: "Чёрный", nameEn: "Jet Black", hex: "#0A0A0A", stock: "in_stock" },
      { id: "s3-02", name: "Тёмно-синий", nameEn: "Deep Navy", hex: "#1B2A4A", stock: "in_stock" },
      { id: "s3-03", name: "Шоколад", nameEn: "Chocolate", hex: "#3B1F0E", stock: "low_stock" },
    ],
    stock: "in_stock",
    isBestseller: true,
    tags: ["eyes", "liner", "bestseller"],
  },
  {
    id: "p04",
    slug: "velvet-eyeshadow-palette",
    category: "eyes",
    name: "Палетка теней «Bois»",
    nameEn: "Bois Eyeshadow Palette",
    tagline: "12 оттенков дерева и земли для дневного и вечернего макияжа",
    taglineEn: "12 forest and earth shades for day-to-evening looks",
    description:
      "Редакционная палетка включает матовые переходные оттенки, шиммерные хайлайтеры и тёмные акценты. Микронизированные пигменты легко растушёвываются и не сыпятся.",
    descriptionEn:
      "An editorial palette with matte transitions, shimmering highlights, and deep accent shades. Micro-milled pigments blend seamlessly with minimal fallout.",
    ingredients:
      "Talc, Mica, Magnesium Stearate, Kaolin, Boron Nitride, Silica, Dimethicone, Tocopheryl Acetate",
    ingredientsEn:
      "Talc, Mica, Magnesium Stearate, Kaolin, Boron Nitride, Silica, Dimethicone, Tocopheryl Acetate",
    application:
      "Лёгким оттеночным оттенком нанесите на подвижное веко. Добавьте тёмный оттенок в складку для глубины.",
    applicationEn:
      "Apply a light transition shade on the lid. Build depth in the crease with a darker matte.",
    price: 3990,
    originalPrice: 4890,
    currency: "RUB",
    finish: "matte",
    image: "/products/p04-eyeshadow-palette.jpg",
    images: [
      "/products/p04-eyeshadow-palette.jpg",
    ],
    shades: [
      { id: "s4-01", name: "Единая палетка", nameEn: "One size", hex: "#C9A98A", stock: "in_stock" },
    ],
    stock: "in_stock",
    tags: ["eyes", "palette", "sale"],
  },
  {
    id: "p05",
    slug: "satin-foundation",
    category: "face",
    name: "Тональный крем «Satin Skin»",
    nameEn: "Satin Skin Foundation",
    tagline: "Второй слой кожи — лёгкое покрытие с сатиновым финишем",
    taglineEn: "A second-skin veil with a satin finish",
    description:
      "Формула с полимерной плёнкой адаптируется к рельефу кожи, скрывает поры и мелкие неровности, не забивает их. Держится до 14 часов без основы.",
    descriptionEn:
      "A polymer-film formula that adapts to skin texture, blurs pores and unevenness without clogging them. Holds up to 14 hours without a primer.",
    ingredients:
      "Aqua, Cyclopentasiloxane, Nylon-12, Dimethicone, Titanium Dioxide, Iron Oxides, Glycerin, Tocopherol",
    ingredientsEn:
      "Aqua, Cyclopentasiloxane, Nylon-12, Dimethicone, Titanium Dioxide, Iron Oxides, Glycerin, Tocopherol",
    application:
      "Нанесите каплю крема на центр лица и растушуйте к периферии спонжем или кистью.",
    applicationEn: "Apply a small amount to the center of the face and blend outward with a sponge or brush.",
    price: 3290,
    currency: "RUB",
    finish: "satin",
    image: "/products/p05-foundation.jpg",
    images: [
      "/products/p05-foundation.jpg",
    ],
    shades: [
      { id: "s5-01", name: "Фарфор", nameEn: "Porcelain", hex: "#F5EAE2", stock: "in_stock" },
      { id: "s5-02", name: "Слоновая кость", nameEn: "Ivory", hex: "#EDD9C8", stock: "in_stock" },
      { id: "s5-03", name: "Бежевый песок", nameEn: "Sand Beige", hex: "#D4AF8E", stock: "in_stock" },
      { id: "s5-04", name: "Тёплый мёд", nameEn: "Warm Honey", hex: "#C09070", stock: "low_stock" },
    ],
    stock: "in_stock",
    isBestseller: true,
    tags: ["face", "foundation", "bestseller"],
  },
  {
    id: "p06",
    slug: "rose-blush-compact",
    category: "face",
    name: "Компактные румяна «Brume»",
    nameEn: "Brume Powder Blush",
    tagline: "Воздушный пигмент, вплавляющийся в кожу без следа",
    taglineEn: "An airy pigment that melts into skin without a trace",
    description:
      "Ультратонкая пудра без наполнителей создаёт естественный румянец, имитирующий лёгкое волнение кожи. Не даёт эффекта маски даже при многослойном нанесении.",
    descriptionEn:
      "An ultra-fine powder without fillers creates a natural flush that mimics real skin warmth. No mask effect even when layered.",
    price: 2190,
    currency: "RUB",
    finish: "satin",
    image: "/products/p06-blush.jpg",
    images: [
      "/products/p06-blush.jpg",
    ],
    ingredients: "Mica, Talc, Boron Nitride, Silica, Tocopheryl Acetate, Iron Oxides",
    ingredientsEn: "Mica, Talc, Boron Nitride, Silica, Tocopheryl Acetate, Iron Oxides",
    application: "Нанесите на яблочки щёк широкой кистью, растушёвывая вверх к вискам.",
    applicationEn: "Sweep onto the apples of the cheeks and blend upward toward the temples.",
    shades: [
      { id: "s6-01", name: "Персиковая дымка", nameEn: "Peach Haze", hex: "#E8B89A", stock: "in_stock" },
      { id: "s6-02", name: "Розовая пыль", nameEn: "Rose Dust", hex: "#D4899E", stock: "in_stock" },
      { id: "s6-03", name: "Бронзовый закат", nameEn: "Bronze Sunset", hex: "#C08060", stock: "in_stock" },
    ],
    stock: "in_stock",
    isNew: true,
    tags: ["face", "blush", "new"],
  },
  {
    id: "p07",
    slug: "serum-face-glow",
    category: "care",
    name: "Сыворотка «Éclat»",
    nameEn: "Éclat Glow Serum",
    tagline: "Витамин C нового поколения и ниацинамид для сияния без раздражения",
    taglineEn: "Next-gen Vitamin C and niacinamide for glow without irritation",
    description:
      "Стабилизированный L-аскорбат магния не окисляется, не вызывает покраснения и видимо выравнивает тон кожи уже через 2 недели применения.",
    descriptionEn:
      "Stabilised magnesium L-ascorbate won't oxidise or cause redness, visibly evening skin tone in as few as 2 weeks.",
    ingredients: "Aqua, Niacinamide, Magnesium Ascorbyl Phosphate, Glycerin, Panthenol, Allantoin",
    ingredientsEn: "Aqua, Niacinamide, Magnesium Ascorbyl Phosphate, Glycerin, Panthenol, Allantoin",
    application:
      "Нанесите 3–4 капли на очищенную кожу утром и вечером. Используйте до крема.",
    applicationEn: "Apply 3–4 drops to cleansed skin morning and evening, before moisturiser.",
    price: 3890,
    currency: "RUB",
    finish: "sheer",
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1617897903246-719242758050?w=800&auto=format&fit=crop",
    ],
    shades: [
      { id: "s7-01", name: "Один размер", nameEn: "One size", hex: "#F5E8C0", stock: "in_stock" },
    ],
    stock: "in_stock",
    isNew: true,
    isBestseller: true,
    tags: ["care", "serum", "bestseller", "new"],
  },
  {
    id: "p08",
    slug: "lip-liner-classic",
    category: "lips",
    name: "Контурный карандаш для губ",
    nameEn: "Defining Lip Liner",
    tagline: "Чёткая линия, стойкость и лёгкая растушёвка",
    taglineEn: "A clean line, long wear and easy blending",
    description:
      "Деревянный карандаш с рецептурой воска и масла жожоба не крошится, легко растушёвывается и создаёт стойкую базу под помаду.",
    descriptionEn:
      "A wood-cased pencil with a wax and jojoba oil formula that won't crumble, blends easily and creates a long-lasting base for lipstick.",
    ingredients: "Hydrogenated Vegetable Oil, Ozokerite, Carnauba Wax, Beeswax, Jojoba Oil, Mica",
    ingredientsEn: "Hydrogenated Vegetable Oil, Ozokerite, Carnauba Wax, Beeswax, Jojoba Oil, Mica",
    application: "Обведите контур губ, затем слегка заполните их внутри для основы под помаду.",
    applicationEn:
      "Outline the lip shape, then lightly fill in to create a base that extends lipstick wear.",
    price: 1290,
    currency: "RUB",
    finish: "matte",
    image: "https://images.unsplash.com/photo-1583209814683-c023dd293cc6?w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1583209814683-c023dd293cc6?w=800&auto=format&fit=crop",
    ],
    shades: [
      { id: "s8-01", name: "Нюд", nameEn: "Nude", hex: "#C49A82", stock: "in_stock" },
      { id: "s8-02", name: "Розовый", nameEn: "Pink", hex: "#D4809A", stock: "in_stock" },
      { id: "s8-03", name: "Тёмный нюд", nameEn: "Dark Nude", hex: "#A0725A", stock: "in_stock" },
      { id: "s8-04", name: "Бордо", nameEn: "Bordeaux", hex: "#7A2040", stock: "low_stock" },
    ],
    stock: "in_stock",
    tags: ["lips", "liner"],
  },
  {
    id: "p09",
    slug: "setting-powder-translucent",
    category: "face",
    name: "Фиксирующая пудра «Brume Légère»",
    nameEn: "Brume Légère Setting Powder",
    tagline: "Невидимая фиксация, матирование и финишный блюр",
    taglineEn: "Invisible setting, oil-control and a soft-focus finish",
    description:
      "Лёгкая рассыпная пудра без покрытия фиксирует макияж на 10+ часов, контролирует блеск и создаёт мягкий блюр-эффект на порах.",
    descriptionEn:
      "A weightless loose powder with no coverage that sets makeup for 10+ hours, controls shine and creates a pore-blurring effect.",
    ingredients: "Silica, Boron Nitride, Nylon-12, Polymethylsilsesquioxane, Tocopheryl Acetate",
    ingredientsEn: "Silica, Boron Nitride, Nylon-12, Polymethylsilsesquioxane, Tocopheryl Acetate",
    application: "Наносите рассыпной кистью или спонжем поверх нанесённого макияжа.",
    applicationEn: "Apply with a loose powder brush or sponge over finished makeup.",
    price: 2590,
    currency: "RUB",
    finish: "matte",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&auto=format&fit=crop",
    ],
    shades: [
      { id: "s9-01", name: "Прозрачная", nameEn: "Translucent", hex: "#F0EBE0", stock: "in_stock" },
      { id: "s9-02", name: "Матовый банан", nameEn: "Banana Matte", hex: "#E8D8A0", stock: "in_stock" },
    ],
    stock: "in_stock",
    isBestseller: true,
    tags: ["face", "powder", "bestseller"],
  },
  {
    id: "p10",
    slug: "mascara-volume-curl",
    category: "eyes",
    name: "Тушь «Volume & Curl»",
    nameEn: "Volume & Curl Mascara",
    tagline: "Объём и изгиб с первого нанесения, без склеивания",
    taglineEn: "Volume and curl from the first coat, no clumping",
    description:
      "Формула с карнаубским воском и провитамином B5 обволакивает каждую ресницу, придавая стойкий изгиб и видимый объём. Конусообразная кисть охватывает даже короткие ресницы.",
    descriptionEn:
      "A carnauba wax and pro-vitamin B5 formula coats each lash with a lasting curl and visible volume. The cone brush reaches even the shortest lashes.",
    ingredients: "Aqua, Carnauba Wax, Beeswax, Stearic Acid, Panthenol, Iron Oxides",
    ingredientsEn: "Aqua, Carnauba Wax, Beeswax, Stearic Acid, Panthenol, Iron Oxides",
    application:
      "Нанесите от основания ресниц к кончикам зигзагообразными движениями. Повторите для объёма.",
    applicationEn: "Apply from the lash base to tips with a zigzag motion. Repeat for more volume.",
    price: 2290,
    currency: "RUB",
    finish: "matte",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&auto=format&fit=crop",
    ],
    shades: [
      { id: "s10-01", name: "Чёрный", nameEn: "Jet Black", hex: "#0A0A0A", stock: "in_stock" },
      { id: "s10-02", name: "Тёмно-коричневый", nameEn: "Deep Brown", hex: "#2E1810", stock: "in_stock" },
    ],
    stock: "in_stock",
    isNew: true,
    tags: ["eyes", "mascara", "new"],
  },
  {
    id: "p11",
    slug: "velvet-matte-lipstick",
    category: "lips",
    name: "Матовая помада «Velours»",
    nameEn: "Velours Matte Lipstick",
    tagline: "Стойкий насыщенный цвет с бархатистой текстурой",
    taglineEn: "Rich lasting colour with a velvet-soft texture",
    description:
      "Кремовая формула с высоким содержанием пигмента ложится одним движением и держится до 10 часов. Обогащена маслом жожоба — губы остаются мягкими весь день.",
    descriptionEn:
      "A high-pigment creamy formula that applies in one stroke and lasts up to 10 hours. Enriched with jojoba oil to keep lips soft throughout the day.",
    ingredients: "Hydrogenated Polyisobutene, Ricinus Communis Seed Oil, Jojoba Oil, Mica, Iron Oxides",
    ingredientsEn: "Hydrogenated Polyisobutene, Ricinus Communis Seed Oil, Jojoba Oil, Mica, Iron Oxides",
    application: "Нанесите помаду непосредственно с пули или с помощью кисти для губ.",
    applicationEn: "Apply directly from the bullet or with a lip brush for precision.",
    price: 1990,
    currency: "RUB",
    finish: "matte",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&auto=format&fit=crop"],
    shades: [
      { id: "s11-01", name: "Красный занавес", nameEn: "Red Curtain", hex: "#9B2335", stock: "in_stock" },
      { id: "s11-02", name: "Нюд пудра", nameEn: "Powder Nude", hex: "#D4A095", stock: "in_stock" },
      { id: "s11-03", name: "Слива", nameEn: "Damson", hex: "#6B3050", stock: "in_stock" },
      { id: "s11-04", name: "Терракота", nameEn: "Terracotta", hex: "#A0502A", stock: "low_stock" },
    ],
    stock: "in_stock",
    isBestseller: true,
    tags: ["lips", "matte", "bestseller"],
  },
  {
    id: "p12",
    slug: "lip-oil-glow",
    category: "lips",
    name: "Масло для губ «Lueur»",
    nameEn: "Lueur Lip Oil",
    tagline: "Питание, блеск и оттенок в одном",
    taglineEn: "Nourishment, shine and tint in one",
    description:
      "Лёгкое масло на основе арганового масла и витамина E создаёт зеркальное сияние и интенсивно питает губы. Лёгкий тонирующий оттенок выравнивает естественный цвет.",
    descriptionEn:
      "A lightweight argan and vitamin E oil delivers mirror shine while intensely nourishing. A sheer tint evens out the natural lip colour.",
    ingredients: "Argania Spinosa Kernel Oil, Tocopherol, Rosa Canina Fruit Oil, Mica",
    ingredientsEn: "Argania Spinosa Kernel Oil, Tocopherol, Rosa Canina Fruit Oil, Mica",
    application: "Нанесите аппликатором на губы в любое время для дополнительного блеска и ухода.",
    applicationEn: "Apply with the wand whenever lips need gloss and care.",
    price: 1490,
    currency: "RUB",
    finish: "glossy",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop"],
    shades: [
      { id: "s12-01", name: "Прозрачный", nameEn: "Clear", hex: "#FFE8E0", stock: "in_stock" },
      { id: "s12-02", name: "Розовый берег", nameEn: "Pink Shore", hex: "#E8A0A8", stock: "in_stock" },
      { id: "s12-03", name: "Коралловый", nameEn: "Coral", hex: "#E07060", stock: "in_stock" },
    ],
    stock: "in_stock",
    isNew: true,
    tags: ["lips", "glossy", "new", "care"],
  },
  {
    id: "p13",
    slug: "brow-sculpt-gel",
    category: "eyes",
    name: "Гель для бровей «Brow Arch»",
    nameEn: "Brow Arch Sculpting Gel",
    tagline: "Чёткий изгиб, стойкая фиксация, натуральный вид",
    taglineEn: "Clean arch, lasting hold, natural finish",
    description:
      "Гель с микроволокнами заполняет пробелы, фиксирует волоски в нужном направлении и создаёт эффект густых, естественных бровей. Держится 12+ часов.",
    descriptionEn:
      "A microfibre gel fills gaps, locks hairs in place and creates the look of full, natural brows. Holds for 12+ hours.",
    ingredients: "Aqua, Acrylates Copolymer, PVP, Nylon-3, Iron Oxides, Panthenol",
    ingredientsEn: "Aqua, Acrylates Copolymer, PVP, Nylon-3, Iron Oxides, Panthenol",
    application: "Нанесите спулером вдоль роста волос от основания к кончикам.",
    applicationEn: "Brush through brows with the spoolie following the natural hair direction.",
    price: 1350,
    currency: "RUB",
    finish: "matte",
    image: "https://images.unsplash.com/photo-1591360236480-4ed861025fa1?w=800&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1591360236480-4ed861025fa1?w=800&auto=format&fit=crop"],
    shades: [
      { id: "s13-01", name: "Светло-коричневый", nameEn: "Light Brown", hex: "#8B6347", stock: "in_stock" },
      { id: "s13-02", name: "Тёмно-коричневый", nameEn: "Dark Brown", hex: "#4A2E1A", stock: "in_stock" },
      { id: "s13-03", name: "Чёрный", nameEn: "Black", hex: "#0A0A0A", stock: "in_stock" },
    ],
    stock: "in_stock",
    isNew: true,
    tags: ["eyes", "brows", "new"],
  },
  {
    id: "p14",
    slug: "eyeshadow-stick-shimmer",
    category: "eyes",
    name: "Карандаш-тени «Lumière»",
    nameEn: "Lumière Eyeshadow Stick",
    tagline: "Кремовые тени-карандаш — один штрих, насыщенный цвет",
    taglineEn: "Cream shadow stick — one stroke, intense colour",
    description:
      "Кремовая формула мгновенно растушёвывается и высыхает в стойкий шиммерный финиш. Не требует кисти — просто нарисуйте и растушуйте пальцем.",
    descriptionEn:
      "The creamy formula blends instantly and sets to a long-wearing shimmer finish. No brush needed — draw and blend with a fingertip.",
    price: 1550,
    currency: "RUB",
    finish: "satin",
    image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=800&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=800&auto=format&fit=crop"],
    ingredients: "Hydrogenated Polyisobutene, Synthetic Wax, Mica, Silica, Tocopherol",
    ingredientsEn: "Hydrogenated Polyisobutene, Synthetic Wax, Mica, Silica, Tocopherol",
    application: "Нанесите на веко, растушуйте пальцем или кистью.",
    applicationEn: "Apply to the lid and blend with a fingertip or brush.",
    shades: [
      { id: "s14-01", name: "Шампань", nameEn: "Champagne", hex: "#E8D090", stock: "in_stock" },
      { id: "s14-02", name: "Розовое золото", nameEn: "Rose Gold", hex: "#C0908A", stock: "in_stock" },
      { id: "s14-03", name: "Бронза", nameEn: "Bronze", hex: "#A06030", stock: "low_stock" },
      { id: "s14-04", name: "Дымчатый", nameEn: "Smoky", hex: "#484848", stock: "in_stock" },
    ],
    stock: "in_stock",
    tags: ["eyes", "shimmer"],
  },
  {
    id: "p15",
    slug: "concealer-skin-veil",
    category: "face",
    name: "Консилер «Skin Veil»",
    nameEn: "Skin Veil Concealer",
    tagline: "Перекрывает без маскировки — кожа выглядит ухоженно",
    taglineEn: "Covers without masking — skin looks healthy",
    description:
      "Жидкий консилер с кремовой текстурой перекрывает тёмные круги и несовершенства, не собираясь в складках. Формула с гиалуроновой кислотой не сушит кожу.",
    descriptionEn:
      "A liquid concealer with a creamy texture covers dark circles and blemishes without settling into lines. Hyaluronic acid formula keeps skin hydrated.",
    price: 1890,
    currency: "RUB",
    finish: "satin",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&auto=format&fit=crop"],
    ingredients: "Aqua, Dimethicone, Glycerin, Hyaluronic Acid, Titanium Dioxide, Iron Oxides",
    ingredientsEn: "Aqua, Dimethicone, Glycerin, Hyaluronic Acid, Titanium Dioxide, Iron Oxides",
    application: "Нанесите точечно на зону и растушуйте кончиком пальца или спонжем.",
    applicationEn: "Dot onto the area and blend with a fingertip or sponge.",
    shades: [
      { id: "s15-01", name: "Фарфор", nameEn: "Porcelain", hex: "#F5EAE2", stock: "in_stock" },
      { id: "s15-02", name: "Ваниль", nameEn: "Vanilla", hex: "#EDD9C0", stock: "in_stock" },
      { id: "s15-03", name: "Бежевый", nameEn: "Beige", hex: "#D4AE8E", stock: "in_stock" },
      { id: "s15-04", name: "Тёплый песок", nameEn: "Warm Sand", hex: "#C09070", stock: "in_stock" },
    ],
    stock: "in_stock",
    isNew: true,
    tags: ["face", "concealer", "new"],
  },
  {
    id: "p16",
    slug: "highlighter-lumiere",
    category: "face",
    name: "Хайлайтер «Étoile»",
    nameEn: "Étoile Highlighter",
    tagline: "Сияние на скулах — от тонкого свечения до яркого блика",
    taglineEn: "Cheekbone glow — from a subtle radiance to a blinding highlight",
    description:
      "Прессованный хайлайтер с микронизированными перламутрами даёт стойкое многомерное сияние. Наносится кистью или пальцем — яркость регулируется давлением.",
    descriptionEn:
      "A pressed highlighter with micro-pearl pigments delivers a lasting, multi-dimensional glow. Apply by brush or finger — intensity is pressure-controlled.",
    price: 2090,
    currency: "RUB",
    finish: "glossy",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop"],
    ingredients: "Mica, Boron Nitride, Dimethicone, Silica, Tocopheryl Acetate",
    ingredientsEn: "Mica, Boron Nitride, Dimethicone, Silica, Tocopheryl Acetate",
    application: "Нанесите на скулы, дугу Купидона и переносицу для максимального эффекта.",
    applicationEn: "Apply to cheekbones, cupid's bow and the bridge of the nose for maximum effect.",
    shades: [
      { id: "s16-01", name: "Лунный камень", nameEn: "Moonstone", hex: "#E8E0D0", stock: "in_stock" },
      { id: "s16-02", name: "Розовая аврора", nameEn: "Rose Aurora", hex: "#E0B8B0", stock: "in_stock" },
      { id: "s16-03", name: "Золото", nameEn: "Gold", hex: "#D4A840", stock: "low_stock" },
    ],
    stock: "in_stock",
    isBestseller: true,
    tags: ["face", "highlight", "bestseller"],
  },
  {
    id: "p17",
    slug: "hydra-cream-barrier",
    category: "care",
    name: "Крем «Barrier Boost»",
    nameEn: "Barrier Boost Hydra Cream",
    tagline: "Восстановление барьера кожи за ночь",
    taglineEn: "Skin barrier restoration overnight",
    description:
      "Насыщенный крем с церамидами, бетаином и мочевиной восстанавливает нарушенный кожный барьер, удерживает влагу и снимает ощущение стянутости.",
    descriptionEn:
      "A rich cream with ceramides, betaine and urea restores a compromised skin barrier, locks in moisture and relieves tightness.",
    price: 3290,
    currency: "RUB",
    finish: "sheer",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop"],
    ingredients: "Aqua, Glycerin, Ceramide NP, Ceramide AP, Betaine, Urea, Niacinamide, Tocopherol",
    ingredientsEn: "Aqua, Glycerin, Ceramide NP, Ceramide AP, Betaine, Urea, Niacinamide, Tocopherol",
    application: "Нанесите на лицо и шею утром и вечером после сыворотки.",
    applicationEn: "Apply to face and neck morning and evening after serum.",
    shades: [
      { id: "s17-01", name: "Один размер", nameEn: "One size", hex: "#F5E8D0", stock: "in_stock" },
    ],
    stock: "in_stock",
    isBestseller: true,
    tags: ["care", "moisturizer", "bestseller"],
  },
  {
    id: "p18",
    slug: "face-oil-rosehip",
    category: "care",
    name: "Масло для лица «Rosehip»",
    nameEn: "Rosehip Regenerating Face Oil",
    tagline: "Шиповник + ретинол для регенерации и выравнивания тона",
    taglineEn: "Rosehip + retinol for regeneration and even tone",
    description:
      "Лёгкое масло шиповника обогащено природным бета-каротином и фитостеролами. Выравнивает постакне, уменьшает пигментацию и улучшает текстуру кожи при регулярном использовании.",
    descriptionEn:
      "A lightweight rosehip oil rich in natural beta-carotene and phytosterols. Fades post-acne marks, reduces pigmentation and refines skin texture with regular use.",
    price: 2690,
    currency: "RUB",
    finish: "sheer",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&auto=format&fit=crop"],
    ingredients: "Rosa Canina Fruit Oil, Tocopherol, Beta-Carotene, Phytosterols",
    ingredientsEn: "Rosa Canina Fruit Oil, Tocopherol, Beta-Carotene, Phytosterols",
    application: "Нанесите 3–4 капли на сухую кожу вечером, похлопывая кончиками пальцев.",
    applicationEn: "Press 3–4 drops into dry skin in the evening using fingertips.",
    shades: [
      { id: "s18-01", name: "Один размер", nameEn: "One size", hex: "#F0D080", stock: "in_stock" },
    ],
    stock: "in_stock",
    isNew: true,
    tags: ["care", "oil", "new"],
  },
  {
    id: "p19",
    slug: "toner-gentle-balance",
    category: "care",
    name: "Тонер «Balance»",
    nameEn: "Balance Gentle Toner",
    tagline: "pH-баланс, увлажнение и подготовка кожи к уходу",
    taglineEn: "pH balance, hydration and skin prep for actives",
    description:
      "Безспиртовой тонер с цветочной водой и экстрактом зелёного чая мягко очищает поры, восстанавливает pH и усиливает проникновение последующих активов.",
    descriptionEn:
      "An alcohol-free toner with rose water and green tea extract gently purifies pores, restores pH and enhances absorption of following actives.",
    price: 1790,
    currency: "RUB",
    finish: "sheer",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&auto=format&fit=crop"],
    ingredients: "Aqua, Rosa Damascena Flower Water, Camellia Sinensis Leaf Extract, Glycerin, Panthenol, Allantoin",
    ingredientsEn: "Aqua, Rosa Damascena Flower Water, Camellia Sinensis Leaf Extract, Glycerin, Panthenol, Allantoin",
    application: "Нанесите ватным диском или похлопайте по лицу руками после очищения.",
    applicationEn: "Apply with a cotton pad or pat onto the face with hands after cleansing.",
    shades: [
      { id: "s19-01", name: "Один размер", nameEn: "One size", hex: "#F0E8F0", stock: "in_stock" },
    ],
    stock: "in_stock",
    tags: ["care", "toner"],
  },
];

export const MOCK_CATEGORIES = [
  { id: "lips", slug: "lips", name: "Губы", nameEn: "Lips" },
  { id: "eyes", slug: "eyes", name: "Глаза", nameEn: "Eyes" },
  { id: "face", slug: "face", name: "Лицо", nameEn: "Face" },
  { id: "care", slug: "care", name: "Уход", nameEn: "Skincare" },
] as const;
