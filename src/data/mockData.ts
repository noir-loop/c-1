import { MenuItem } from '../types';

export const ALL_MENU_ITEMS: MenuItem[] = [
  // ==========================================
  // 1. MOJITO & DRINKS (From Menu Board)
  // ==========================================
  {
    id: 'moj-virgin',
    name: 'Virgin Mojito',
    description: 'Crisp, sparkling beverage infused with freshly crushed mint leaves and tangy lime.',
    price: 120,
    category: 'mojito',
    emoji: '🍹',
    popular: true,
    isSpecialty: true,
    dietary: ['veg']
  },
  {
    id: 'moj-pineapple',
    name: 'Pineapple Mojito',
    description: 'Tropical sparkling refresher with vibrant sweet pineapple juice and fresh garden mint.',
    price: 120,
    category: 'mojito',
    emoji: '🍍',
    dietary: ['veg']
  },
  {
    id: 'moj-orange',
    name: 'Orange Mojito',
    description: 'Zesty citrus cooler crafted with real orange pulp, bubbly soda, and cooling mint.',
    price: 120,
    category: 'mojito',
    emoji: '🍊',
    dietary: ['veg']
  },
  {
    id: 'moj-blueberry',
    name: 'Blueberry Mojito',
    description: 'Chilled berry bliss loaded with succulent crushed blueberries and sparkling soda.',
    price: 120,
    category: 'mojito',
    emoji: '🫐',
    popular: true,
    dietary: ['veg']
  },
  {
    id: 'moj-mango',
    name: 'Mango Mojito',
    description: 'Sweet golden Alphonso mango nectar blended with refreshing mint and crushed ice.',
    price: 120,
    category: 'mojito',
    emoji: '🥭',
    dietary: ['veg']
  },
  {
    id: 'moj-strawberry',
    name: 'Strawberry Mojito',
    description: 'Ruby-red sweet strawberry infusion over crushed ice, sparkling fizz, and lime.',
    price: 120,
    category: 'mojito',
    emoji: '🍓',
    dietary: ['veg']
  },
  {
    id: 'moj-green-apple',
    name: 'Green Apple Mojito',
    description: 'Crisp, tart green apple syrup mingled with cooling mint leaves and fizzy soda.',
    price: 120,
    category: 'mojito',
    emoji: '🍏',
    dietary: ['veg']
  },
  {
    id: 'moj-lemon-ice-tea',
    name: 'Lemon Ice Tea',
    description: 'Handcrafted chilled black tea with a lively squeeze of sun-ripened yellow lemons.',
    price: 140,
    category: 'mojito',
    emoji: '🍋',
    popular: true,
    dietary: ['veg']
  },
  {
    id: 'moj-masala-virgin',
    name: 'Masala Virgin Mojito',
    description: 'Traditional desi twist with tangy chaat spices, black salt, fresh lime, and mint.',
    price: 140,
    category: 'mojito',
    emoji: '🍹',
    dietary: ['veg'],
    spiceLevel: 1
  },
  {
    id: 'moj-peach-ice-tea',
    name: 'Peach Ice Tea',
    description: 'Delicate floral cold-brewed tea sweetened with juicy peach fruit nectar.',
    price: 140,
    category: 'mojito',
    emoji: '🍑',
    dietary: ['veg']
  },
  {
    id: 'drk-cold-drink',
    name: 'Cold Drink',
    description: 'Chilled glass of popular aerated beverages served frosty cold.',
    price: 60,
    category: 'mojito',
    emoji: '🥤',
    dietary: ['veg']
  },
  {
    id: 'drk-diet-coke',
    name: 'Diet Coke (Can)',
    description: 'Chilled slim can of sugar-free Diet Coca-Cola.',
    price: 80,
    category: 'mojito',
    emoji: '🥫',
    dietary: ['veg']
  },
  {
    id: 'moj-butterfly-blue-pea',
    name: 'Butterfly Blue Pea Ice Tea',
    description: 'Stunning natural royal blue botanical tea infused with lemongrass and citrus blossom.',
    price: 120,
    category: 'mojito',
    emoji: '🪻',
    isSpecialty: true,
    dietary: ['veg']
  },
  {
    id: 'drk-red-bull',
    name: 'Red Bull',
    description: 'Vitalizing premium energy drink served chilled.',
    price: 150,
    category: 'mojito',
    emoji: '⚡',
    dietary: ['veg']
  },

  // ==========================================
  // 2. MUNCHIES
  // ==========================================
  {
    id: 'mun-honey-chilli-potato',
    name: 'Honey Chilli Potato',
    description: 'Crispy glazed fried potato batons tossed in sweet organic honey and fiery red chillies.',
    price: 180,
    category: 'munchies',
    emoji: '🥔',
    popular: true,
    dietary: ['veg'],
    spiceLevel: 1
  },
  {
    id: 'mun-chilli-potato',
    name: 'Chilli Potato',
    description: 'Crispy fried potato strips wok-tossed with spicy garlic sauce, bell peppers, and onions.',
    price: 170,
    category: 'munchies',
    emoji: '🥔',
    dietary: ['veg'],
    spiceLevel: 2
  },
  {
    id: 'mun-cheese-balls',
    name: 'Cheese Balls',
    description: 'Golden-fried molten mozzarella and cheddar balls served with creamy herb dip.',
    price: 170,
    category: 'munchies',
    emoji: '🧀',
    popular: true,
    dietary: ['veg']
  },
  {
    id: 'mun-veg-cutlet',
    name: 'Veg Cutlet',
    description: 'Hearty spiced vegetable patties breadcrumb-coated and shallow-fried golden crisp.',
    price: 120,
    category: 'munchies',
    emoji: '🧆',
    dietary: ['veg']
  },
  {
    id: 'mun-paneer-cutlet',
    name: 'Paneer Cutlet',
    description: 'Rich cottage cheese patties seasoned with aromatic spices and herbs.',
    price: 170,
    category: 'munchies',
    emoji: '🧀',
    dietary: ['veg']
  },
  {
    id: 'mun-veg-cheese-cutlet',
    name: 'Veg Cheese Cutlet',
    description: 'Loaded vegetable cutlet packed with melted cheddar and mozzarella core.',
    price: 180,
    category: 'munchies',
    emoji: '🧀',
    dietary: ['veg']
  },
  {
    id: 'mun-vada-pav',
    name: 'Vada Pav',
    description: 'Authentic Mumbai street style spiced potato dumpling tucked into a soft bun with chutneys.',
    price: 90,
    category: 'munchies',
    emoji: '🍔',
    popular: true,
    dietary: ['veg'],
    spiceLevel: 1
  },
  {
    id: 'mun-poha',
    name: 'Poha',
    description: 'Light flattened rice tempered with mustard seeds, peanuts, curry leaves, and crunchy sev.',
    price: 90,
    category: 'munchies',
    emoji: '🥣',
    dietary: ['veg']
  },
  {
    id: 'mun-momos-steam',
    name: 'Momos Steam',
    description: 'Delicate steamed dumplings stuffed with spiced vegetables, served with spicy red chutney.',
    price: 180,
    priceVariants: { 'Regular': 180, 'Full': 250 },
    category: 'munchies',
    emoji: '🥟',
    popular: true,
    dietary: ['veg'],
    spiceLevel: 1
  },
  {
    id: 'mun-kurkure-momo',
    name: 'Kurkure Momo',
    description: 'Super crunchy outer crust stuffed with juicy spiced vegetables, served piping hot.',
    price: 180,
    priceVariants: { 'Regular': 180, 'Full': 250 },
    category: 'munchies',
    emoji: '🥟',
    isSpecialty: true,
    dietary: ['veg'],
    spiceLevel: 1
  },
  {
    id: 'mun-paneer-momo',
    name: 'Paneer Momo',
    description: 'Steamed or fried momos filled with seasoned creamy paneer and fresh herbs.',
    price: 180,
    priceVariants: { 'Regular': 180, 'Full': 250 },
    category: 'munchies',
    emoji: '🥟',
    dietary: ['veg']
  },
  {
    id: 'mun-cheese-burst-momos',
    name: 'Cheese Burst Momos',
    description: 'Decadent momos overflowing with melted gooey cheese, served with chef special dip.',
    price: 240,
    priceVariants: { 'Regular': 240, 'Full': 280 },
    category: 'munchies',
    emoji: '🥟',
    popular: true,
    isSpecialty: true,
    dietary: ['veg']
  },

  // ==========================================
  // 3. BITES & FRIES
  // ==========================================
  {
    id: 'bit-bun-makkhan',
    name: 'Bun Makkhan',
    description: 'Soft pillow bun toasted warm and loaded with generous dollops of creamy butter.',
    price: 40,
    category: 'bites',
    emoji: '🍞',
    popular: true,
    dietary: ['veg']
  },
  {
    id: 'bit-sweet-bun-makkhan',
    name: 'Sweet Bun Makkhan',
    description: 'Fresh warm bun stuffed with rich salted butter and sweet tutti-frutti relish.',
    price: 55,
    category: 'bites',
    emoji: '🧈',
    dietary: ['veg']
  },
  {
    id: 'bit-salted-french-fries',
    name: 'Salted French Fries',
    description: 'Crispy golden potato fingers tossed in fine sea salt, served with tangy ketchup.',
    price: 110,
    category: 'bites',
    emoji: '🍟',
    dietary: ['veg']
  },
  {
    id: 'bit-peri-peri-fries',
    name: 'Peri Peri French Fries',
    description: 'Hot crispy french fries generously dusted with spicy African bird-eye chilli seasoning.',
    price: 150,
    category: 'bites',
    emoji: '🍟',
    popular: true,
    dietary: ['veg'],
    spiceLevel: 2
  },
  {
    id: 'bit-cheese-french-fries',
    name: 'Cheese French Fries',
    description: 'Golden fries smothered under rich warm melted cheddar cheese sauce.',
    price: 180,
    category: 'bites',
    emoji: '🍟',
    dietary: ['veg']
  },
  {
    id: 'bit-cheese-garlic-bread',
    name: 'Cheese Garlic Bread',
    description: 'Toasted baguette slices rubbed with garlic butter and crowned with bubbling mozzarella.',
    price: 180,
    category: 'bites',
    emoji: '🥖',
    popular: true,
    dietary: ['veg']
  },

  // ==========================================
  // 4. MAGGI
  // ==========================================
  {
    id: 'mag-plain',
    name: 'Plain Maggi',
    description: 'Nostalgic 2-minute classic Maggi noodles cooked in savory signature tastemaker broth.',
    price: 90,
    category: 'maggi',
    emoji: '🍜',
    dietary: ['veg']
  },
  {
    id: 'mag-veg',
    name: 'Veg Maggi',
    description: 'Maggi noodles tossed with sauteed onions, capsicum, tomatoes, and tender sweet corn.',
    price: 120,
    category: 'maggi',
    emoji: '🍜',
    popular: true,
    dietary: ['veg']
  },
  {
    id: 'mag-cheese-loaded',
    name: 'Cheese Loaded Maggi',
    description: 'Rich steaming noodles crowned with melted cheese blanket and Italian seasoning.',
    price: 150,
    category: 'maggi',
    emoji: '🧀',
    isSpecialty: true,
    dietary: ['veg']
  },
  {
    id: 'mag-masala',
    name: 'Masala Maggi',
    description: 'Spicy street-style Maggi cooked with extra roasted spices, green chillies, and butter.',
    price: 120,
    category: 'maggi',
    emoji: '🍜',
    dietary: ['veg'],
    spiceLevel: 2
  },
  {
    id: 'mag-corn-cheese',
    name: 'Corn Cheese Maggi',
    description: 'Sweet juicy golden corn kernels and molten cheese blended into hot Maggi.',
    price: 130,
    category: 'maggi',
    emoji: '🌽',
    dietary: ['veg']
  },

  // ==========================================
  // 5. PASTA
  // ==========================================
  {
    id: 'pas-white-sauce',
    name: 'White Sauce Pasta',
    description: 'Creamy Italian Alfredo penne pasta with garlic butter, mushroom, corn, and parmesan.',
    price: 210,
    category: 'pasta',
    emoji: '🍝',
    popular: true,
    dietary: ['veg']
  },
  {
    id: 'pas-red-sauce',
    name: 'Red Sauce Pasta',
    description: 'Tangy Arabiatta pasta simmered in crushed San Marzano tomato sauce, basil, and garlic.',
    price: 210,
    category: 'pasta',
    emoji: '🍝',
    dietary: ['veg'],
    spiceLevel: 1
  },
  {
    id: 'pas-pink-sauce',
    name: 'Pink Sauce Pasta',
    description: 'The best of both worlds: creamy white sauce married with rich tangy red marinara.',
    price: 210,
    category: 'pasta',
    emoji: '🍝',
    dietary: ['veg']
  },
  {
    id: 'pas-cfc-special',
    name: 'CFC Special Pasta',
    description: 'Signature house-special baked pasta loaded with fresh vegetables, herbs, and triple cheese.',
    price: 250,
    category: 'pasta',
    emoji: '🍝',
    isSpecialty: true,
    popular: true,
    dietary: ['veg']
  },

  // ==========================================
  // 6. CHAI & HOT BREWS
  // ==========================================
  {
    id: 'chai-chocolate',
    name: 'Chocolate Chai',
    description: 'Decadent fusion of aromatic Assam black tea, velvety cocoa, and creamy milk.',
    price: 45,
    category: 'chai',
    emoji: '🍫',
    dietary: ['veg']
  },
  {
    id: 'chai-regular',
    name: 'Regular Chai',
    description: 'Freshly brewed everyday classic milk tea prepared with premium estate tea leaves.',
    price: 25,
    priceVariants: { 'Small': 25, 'Kulhad': 40 },
    category: 'chai',
    emoji: '☕',
    dietary: ['veg']
  },
  {
    id: 'chai-cinnamon',
    name: 'Cinnamon Chai',
    description: 'Slow-simmered milk tea infused with warm, sweet fragrant Ceylon cinnamon bark.',
    price: 35,
    priceVariants: { 'Small': 35, 'Kulhad': 45 },
    category: 'chai',
    emoji: '🫖',
    dietary: ['veg']
  },
  {
    id: 'chai-ginger',
    name: 'Ginger Chai',
    description: 'Freshly crushed spicy ginger root boiled with strong Assam tea & creamy milk.',
    price: 45,
    category: 'chai',
    emoji: '☕',
    popular: true,
    dietary: ['veg'],
    spiceLevel: 1
  },
  {
    id: 'chai-clove',
    name: 'Clove Chai',
    description: 'Aromatic soothing milk tea gently infused with whole organic cloves.',
    price: 35,
    priceVariants: { 'Small': 35, 'Kulhad': 45 },
    category: 'chai',
    emoji: '🫖',
    dietary: ['veg']
  },
  {
    id: 'chai-lemongrass',
    name: 'Lemongrass Chai',
    description: 'Zesty citrus lemongrass leaves steeped with milk tea for an energizing uplift.',
    price: 35,
    priceVariants: { 'Small': 35, 'Kulhad': 45 },
    category: 'chai',
    emoji: '🌿',
    dietary: ['veg']
  },
  {
    id: 'chai-blackpepper',
    name: 'Blackpepper Chai',
    description: 'Bold warming milk tea infused with freshly cracked spicy black peppercorns.',
    price: 35,
    priceVariants: { 'Small': 35, 'Kulhad': 45 },
    category: 'chai',
    emoji: '☕',
    dietary: ['veg'],
    spiceLevel: 2
  },
  {
    id: 'chai-masala',
    name: 'Masala Chai',
    description: 'Authentic royal blend of cardamom, cloves, ginger, cinnamon & peppercorn.',
    price: 35,
    priceVariants: { 'Small': 35, 'Kulhad': 45 },
    category: 'chai',
    emoji: '🫖',
    popular: true,
    isSpecialty: true,
    dietary: ['veg'],
    spiceLevel: 1
  },
  {
    id: 'chai-cardamom',
    name: 'Cardamom Chai',
    description: 'Slow-brewed rich milk tea infused with freshly ground fragrant green cardamom pods.',
    price: 40,
    priceVariants: { 'Small': 40, 'Kulhad': 45 },
    category: 'chai',
    emoji: '🫖',
    popular: true,
    isSpecialty: true,
    dietary: ['veg']
  },
  {
    id: 'chai-lemon-tea',
    name: 'Lemon Tea',
    description: 'Refreshing clear black liquor tea squeezed with fresh zesty lemon juice.',
    price: 25,
    priceVariants: { 'Cup': 25, 'Pot': 50 },
    category: 'chai',
    emoji: '🍋',
    dietary: ['veg']
  },
  {
    id: 'chai-green-tea',
    name: 'Green Tea',
    description: 'Delicate antioxidant-rich whole green tea leaves gently steeped in hot water.',
    price: 30,
    priceVariants: { 'Cup': 30, 'Pot': 50 },
    category: 'chai',
    emoji: '🍵',
    dietary: ['veg']
  },
  {
    id: 'chai-black-tea',
    name: 'Black Tea',
    description: 'Pure, robust estate whole leaf black tea steeped without milk.',
    price: 20,
    priceVariants: { 'Cup': 20, 'Pot': 50 },
    category: 'chai',
    emoji: '🫖',
    dietary: ['veg']
  },
  {
    id: 'chai-jaggery-tea',
    name: 'Jaggery Tea',
    description: 'Traditional desi chai naturally sweetened with organic country gur/jaggery.',
    price: 25,
    priceVariants: { 'Cup': 25, 'Pot': 50 },
    category: 'chai',
    emoji: '🍯',
    dietary: ['veg']
  },
  {
    id: 'drk-water-bottle',
    name: 'Water Bottle',
    description: 'Packaged drinking water bottle served at MRP.',
    price: null, // Blank / MRP on board
    category: 'chai',
    emoji: '💧',
    dietary: ['veg']
  },

  // ==========================================
  // 7. SHAKE
  // ==========================================
  {
    id: 'shk-blueberry',
    name: 'Blueberry Shake',
    description: 'Thick creamy milkshake blended with wild blueberries and premium vanilla ice cream.',
    price: 170,
    category: 'shake',
    emoji: '🫐',
    dietary: ['veg']
  },
  {
    id: 'shk-oreo',
    name: 'Oreo Shake',
    description: 'Rich thick shake blitzed with whole Oreo cookies and topped with cookie crumbs.',
    price: 180,
    category: 'shake',
    emoji: '🍪',
    popular: true,
    dietary: ['veg']
  },
  {
    id: 'shk-pineapple',
    name: 'Pineapple Shake',
    description: 'Sunny tropical thick shake with juicy pineapple chunks and rich dairy cream.',
    price: 165,
    category: 'shake',
    emoji: '🍍',
    dietary: ['veg']
  },
  {
    id: 'shk-orange',
    name: 'Orange Shake',
    description: 'Zesty and creamy milkshake whipped with sweet citrus orange compote.',
    price: 165,
    category: 'shake',
    emoji: '🍊',
    dietary: ['veg']
  },
  {
    id: 'shk-chocolate',
    name: 'Chocolate Shake',
    description: 'Deep cocoa indulgence prepared with Belgian chocolate fudge and chilled milk.',
    price: 165,
    category: 'shake',
    emoji: '🍫',
    dietary: ['veg']
  },
  {
    id: 'shk-mango',
    name: 'Mango Shake',
    description: 'Classic Indian summer favorite crafted with rich Alphonso mango pulp.',
    price: 165,
    category: 'shake',
    emoji: '🥭',
    dietary: ['veg']
  },
  {
    id: 'shk-strawberry',
    name: 'Strawberry Shake',
    description: 'Luscious pink strawberry milkshake with fresh berry puree and vanilla cream.',
    price: 170,
    category: 'shake',
    emoji: '🍓',
    dietary: ['veg']
  },
  {
    id: 'shk-kitkat',
    name: 'Kitkat Shake',
    description: 'Crisp KitKat chocolate wafer bars blended into thick ice cream shake with chocolate drizzle.',
    price: 180,
    category: 'shake',
    emoji: '🍫',
    popular: true,
    isSpecialty: true,
    dietary: ['veg']
  },
  {
    id: 'shk-butter-scotch',
    name: 'Butter Scotch Shake',
    description: 'Creamy caramel praline shake with crunchy butterscotch bits in every sip.',
    price: 180,
    category: 'shake',
    emoji: '🍨',
    dietary: ['veg']
  },
  {
    id: 'shk-brownie',
    name: 'Brownie Shake',
    description: 'Decadent fudge brownie blended with rich chocolate ice cream and dark fudge.',
    price: 180,
    category: 'shake',
    emoji: '🧁',
    popular: true,
    dietary: ['veg']
  },

  // ==========================================
  // 8. SANDWICH
  // ==========================================
  {
    id: 'snd-cheese',
    name: 'Cheese Sandwich',
    description: 'Layers of melted cheddar and mozzarella cheese toasted between golden buttery bread slices.',
    price: 140,
    category: 'sandwich',
    emoji: '🥪',
    dietary: ['veg']
  },
  {
    id: 'snd-veg-grill',
    name: 'Veg Grill Sandwich',
    description: 'Crunchy cucumber, tomato, capsicum, and mint chutney grilled crisp with butter.',
    price: 140,
    category: 'sandwich',
    emoji: '🥪',
    popular: true,
    dietary: ['veg']
  },
  {
    id: 'snd-paneer-cheese',
    name: 'Paneer Cheese Sandwich',
    description: 'Spiced cottage cheese cubes and molten cheese grilled between crusty bread slices.',
    price: 180,
    category: 'sandwich',
    emoji: '🥪',
    popular: true,
    dietary: ['veg']
  },
  {
    id: 'snd-classic-veg',
    name: 'Classic Veg Sandwich',
    description: 'Traditional cafe cold or lightly toasted sandwich with crunchy garden vegetables.',
    price: 120,
    category: 'sandwich',
    emoji: '🥪',
    dietary: ['veg']
  },
  {
    id: 'snd-cheese-corn',
    name: 'Cheese Corn Sandwich',
    description: 'Sweet juicy corn kernels tossed in melted cheese and aromatic oregano herbs.',
    price: 140,
    category: 'sandwich',
    emoji: '🌽',
    dietary: ['veg']
  },
  {
    id: 'snd-cheese-cucumber',
    name: 'Cheese Cucumber Sandwich',
    description: 'Cool crisp English cucumber slices layered with smooth cream cheese and black pepper.',
    price: 140,
    category: 'sandwich',
    emoji: '🥒',
    dietary: ['veg']
  },
  {
    id: 'snd-grilled-potato',
    name: 'Grilled Potato Sandwich',
    description: 'Desi spiced potato masala mashed and grilled with green chutney and butter.',
    price: 110,
    category: 'sandwich',
    emoji: '🥔',
    dietary: ['veg']
  },
  {
    id: 'snd-cfc-special',
    name: 'CFC Special Sandwich',
    description: 'Triple-decker loaded sandwich with paneer, vegetables, double cheese, and signature dressing.',
    price: 210,
    category: 'sandwich',
    emoji: '🥪',
    isSpecialty: true,
    popular: true,
    dietary: ['veg']
  },

  // ==========================================
  // 9. PIZZA (Regular / Large)
  // ==========================================
  {
    id: 'piz-special-cfc',
    name: 'Special CFC Pizza',
    description: 'Signature cafe pizza overloaded with paneer, golden corn, olives, bell peppers, and extra mozzarella.',
    price: 250,
    priceVariants: { 'Regular': 250, 'Large': 280 },
    category: 'pizza',
    emoji: '🍕',
    isSpecialty: true,
    popular: true,
    dietary: ['veg']
  },
  {
    id: 'piz-mediterranean',
    name: 'Mediterranean Pizza',
    description: 'Crispy thin crust topped with black olives, sun-dried tomatoes, capsicum, and feta-mozzarella blend.',
    price: 200,
    priceVariants: { 'Regular': 200, 'Large': 220 },
    category: 'pizza',
    emoji: '🍕',
    dietary: ['veg']
  },
  {
    id: 'piz-peri-peri-cottage-cheese',
    name: 'Peri Peri Cottage Cheese Pizza',
    description: 'Spicy peri-peri marinated paneer cubes, crisp onions, red paprika, and gooey cheese.',
    price: 200,
    priceVariants: { 'Regular': 200, 'Large': 230 },
    category: 'pizza',
    emoji: '🍕',
    dietary: ['veg'],
    spiceLevel: 2
  },
  {
    id: 'piz-farm-house',
    name: 'Farm House Pizza',
    description: 'Loaded rustic garden pizza with crunchy capsicum, sweet corn, fresh tomatoes, and mushrooms.',
    price: 240,
    priceVariants: { 'Regular': 240, 'Large': 270 },
    category: 'pizza',
    emoji: '🍕',
    popular: true,
    dietary: ['veg']
  },
  {
    id: 'piz-double-cheese',
    name: 'Double Cheese Pizza',
    description: 'Double portion of melted mozzarella, cheddar, and gouda cheese on herbed tomato base.',
    price: 250,
    priceVariants: { 'Regular': 250, 'Large': 280 },
    category: 'pizza',
    emoji: '🧀',
    popular: true,
    dietary: ['veg']
  },
  {
    id: 'piz-corn-paneer',
    name: 'Corn / Paneer Pizza',
    description: 'Tender cottage cheese chunks and sweet golden American corn kernels on herbed crust.',
    price: 250,
    priceVariants: { 'Regular': 250, 'Large': 280 },
    category: 'pizza',
    emoji: '🍕',
    dietary: ['veg']
  },
  {
    id: 'piz-capsicum',
    name: 'Capsicum Pizza',
    description: 'Crisp green bell peppers, tangy tomato sauce, and molten mozzarella cheese.',
    price: 210,
    priceVariants: { 'Regular': 210, 'Large': 230 },
    category: 'pizza',
    emoji: '🫑',
    dietary: ['veg']
  },

  // ==========================================
  // 10. COLD COFFEE
  // ==========================================
  {
    id: 'cof-ice-mango-latte',
    name: 'Ice Mango Latte Coffee',
    description: 'Exotic pairing of sweet Alphonso mango puree with rich iced espresso and creamy cold milk.',
    price: 120,
    category: 'cold_coffee',
    emoji: '🥭',
    dietary: ['veg']
  },
  {
    id: 'cof-butter-butterfly-ice',
    name: 'Butter Butterfly Ice Coffee',
    description: 'Frothy butterfly pea botanical infusion shaken cold with signature coffee and sweet cream.',
    price: 120,
    category: 'cold_coffee',
    emoji: '🧊',
    dietary: ['veg']
  },
  {
    id: 'cof-latte-cold',
    name: 'Latte Cold',
    description: 'Smooth, mellow double shot of espresso poured over chilled whole milk and ice.',
    price: 170,
    category: 'cold_coffee',
    emoji: '🥛',
    dietary: ['veg']
  },
  {
    id: 'cof-cinnamon-gold',
    name: 'Cinnamon Coffee Gold',
    description: 'Aromatic iced latte dusted with warm cinnamon spice and golden caramel drizzle.',
    price: 170,
    category: 'cold_coffee',
    emoji: '✨',
    dietary: ['veg']
  },
  {
    id: 'cof-hazelnut-latte-cold',
    name: 'Hazelnut Latte Cold',
    description: 'Toasted roasted hazelnut syrup blended with bold iced espresso and chilled milk.',
    price: 210,
    category: 'cold_coffee',
    emoji: '🌰',
    popular: true,
    dietary: ['veg']
  },
  {
    id: 'cof-caramel-latte-cold',
    name: 'Caramel Latte Cold',
    description: 'Buttery dulce de leche caramel swirled with iced milk and dark roast espresso.',
    price: 190,
    category: 'cold_coffee',
    emoji: '🍮',
    popular: true,
    dietary: ['veg']
  },
  {
    id: 'cof-strong-cold',
    name: 'Strong Cold Coffee',
    description: 'Extra dark shot of roasted beans whipped thick with cold milk for an intense caffeine boost.',
    price: 100,
    category: 'cold_coffee',
    emoji: '⚡',
    dietary: ['veg']
  },
  {
    id: 'cof-regular-cold',
    name: 'Regular Cold Coffee',
    description: 'Classic cafe cold coffee blended frothy with milk, sugar, and rich coffee.',
    price: 170,
    category: 'cold_coffee',
    emoji: '🥤',
    popular: true,
    dietary: ['veg']
  },
  {
    id: 'cof-brownie-cold',
    name: 'Brownie Cold Coffee',
    description: 'Rich cold coffee topped with crumbled chocolate fudge brownie and chocolate sauce.',
    price: 220,
    category: 'cold_coffee',
    emoji: '🍫',
    isSpecialty: true,
    popular: true,
    dietary: ['veg']
  },
  {
    id: 'cof-ice-americano',
    name: 'Ice Americano',
    description: 'Bold double espresso pulled over cold spring water and crystal clear ice cubes.',
    price: 120,
    category: 'cold_coffee',
    emoji: '🧊',
    dietary: ['veg']
  },
  {
    id: 'cof-blueberry-matcha-cold',
    name: 'Blueberry Matcha',
    description: 'Layered iced drink featuring wild blueberry compote, organic green matcha, and oat/dairy milk.',
    price: 210,
    category: 'cold_coffee',
    emoji: '🫐',
    isSpecialty: true,
    dietary: ['veg']
  },
  {
    id: 'cof-ice-spiced-latte',
    name: 'Ice Spiced Latte',
    description: 'Chilled espresso latte infused with autumnal spices including nutmeg and clove.',
    price: 190,
    category: 'cold_coffee',
    emoji: '🌶️',
    dietary: ['veg']
  },
  {
    id: 'cof-ice-hazelnut-latte',
    name: 'Ice Hazelnut Latte',
    description: 'Nutty, silky smooth chilled latte with premium Monin hazelnut syrup.',
    price: 190,
    category: 'cold_coffee',
    emoji: '🌰',
    dietary: ['veg']
  },

  // ==========================================
  // 11. HOT COFFEE
  // ==========================================
  {
    id: 'cof-handbeaten',
    name: 'Handbeaten Coffee',
    description: 'Desi style whipped coffee frothed with sugar and hot steaming milk until ultra creamy.',
    price: 120,
    category: 'hot_coffee',
    emoji: '☕',
    popular: true,
    isSpecialty: true,
    dietary: ['veg']
  },
  {
    id: 'cof-hot-cappuccino',
    name: 'Hot Cappuccino',
    description: 'Equal parts dark espresso, hot steamed milk, and velvety thick micro-foam dusted with cocoa.',
    price: 90,
    category: 'hot_coffee',
    emoji: '☕',
    dietary: ['veg']
  },
  {
    id: 'cof-hot-chocolate',
    name: 'Hot Chocolate',
    description: 'Silky, rich melted European cocoa steamed with whole milk and topped with frothy foam.',
    price: 160,
    category: 'hot_coffee',
    emoji: '🍫',
    popular: true,
    isSpecialty: true,
    dietary: ['veg']
  },
  {
    id: 'cof-latte-hot',
    name: 'Latte Hot',
    description: 'Delicate shot of espresso gently blended with generous steamed milk and light foam.',
    price: 110,
    category: 'hot_coffee',
    emoji: '☕',
    dietary: ['veg']
  },
  {
    id: 'cof-black-coffee',
    name: 'Black Coffee',
    description: 'Pure, intense dark roast freshly brewed without milk or sugar.',
    price: 50,
    category: 'hot_coffee',
    emoji: '☕',
    dietary: ['veg']
  },
  {
    id: 'cof-cinnamon-hot',
    name: 'Cinnamon Hot Coffee',
    description: 'Warm steaming cappuccino infused with freshly grated sweet aromatic cinnamon.',
    price: 90,
    category: 'hot_coffee',
    emoji: '☕',
    dietary: ['veg']
  },
  {
    id: 'cof-hazelnut-latte-hot',
    name: 'Hazelnut Latte Hot',
    description: 'Steaming silky latte flavored with rich European roasted hazelnut syrup.',
    price: 140,
    category: 'hot_coffee',
    emoji: '🌰',
    dietary: ['veg']
  },
  {
    id: 'cof-irish-coffee',
    name: 'Irish Coffee',
    description: 'Non-alcoholic rich dark coffee flavored with creamy Irish cream essence and brown sugar.',
    price: 160,
    category: 'hot_coffee',
    emoji: '☕',
    dietary: ['veg']
  },
  {
    id: 'cof-tiramisu-coffee',
    name: 'Tiramisu Coffee',
    description: 'Luxurious hot beverage inspired by classic Italian tiramisu with notes of mascarpone & cocoa.',
    price: 160,
    category: 'hot_coffee',
    emoji: '🍰',
    isSpecialty: true,
    dietary: ['veg']
  },
  {
    id: 'cof-vanilla-coffee',
    name: 'Vanilla Coffee',
    description: 'Sweet, soothing hot latte infused with fragrant Madagascar vanilla extract.',
    price: 140,
    category: 'hot_coffee',
    emoji: '🍦',
    dietary: ['veg']
  },

  // ==========================================
  // 12. MATCHA (No prices on menu board -> blank option / editable by owner)
  // ==========================================
  {
    id: 'mat-blueberry',
    name: 'Blueberry Matcha',
    description: 'Japanese ceremonial grade matcha layered over wild blueberry puree and chilled milk.',
    price: null, // Blank / Price on Request
    category: 'matcha',
    emoji: '🍵',
    isSpecialty: true,
    dietary: ['veg']
  },
  {
    id: 'mat-strawberry',
    name: 'Strawberry Matcha',
    description: 'Sweet crushed strawberries topped with vibrant whisked green matcha and milk.',
    price: null, // Blank / Price on Request
    category: 'matcha',
    emoji: '🍓',
    dietary: ['veg']
  },
  {
    id: 'mat-mango',
    name: 'Mango Matcha',
    description: 'Tropical pairing of Alphonso mango nectar with earthy, umami Japanese green matcha.',
    price: null, // Blank / Price on Request
    category: 'matcha',
    emoji: '🥭',
    dietary: ['veg']
  },
  {
    id: 'mat-coffee',
    name: 'Coffee Matcha',
    description: 'A fusion of earthy matcha green tea, bold dark roast espresso, and smooth milk.',
    price: null, // Blank / Price on Request
    category: 'matcha',
    emoji: '☕',
    dietary: ['veg']
  },
  {
    id: 'mat-coconut',
    name: 'Coconut Matcha',
    description: 'Refreshing tropical blend of pure coconut milk with ceremonial stone-ground matcha.',
    price: null, // Blank / Price on Request
    category: 'matcha',
    emoji: '🥥',
    dietary: ['veg']
  },

  // ==========================================
  // 13. BURGER
  // ==========================================
  {
    id: 'brg-veg',
    name: 'Veg Burger',
    description: 'Crispy herb potato patty topped with sliced tomato, onion, lettuce, and mayo in a toasted sesame bun.',
    price: 110,
    category: 'burger',
    emoji: '🍔',
    popular: true,
    dietary: ['veg']
  },
  {
    id: 'brg-veg-cheese',
    name: 'Veg Cheese Burger',
    description: 'Crispy veggie patty crowned with a slice of melted yellow cheddar cheese and garlic sauce.',
    price: 140,
    category: 'burger',
    emoji: '🍔',
    popular: true,
    dietary: ['veg']
  },
  {
    id: 'brg-veg-cheese-paneer',
    name: 'Veg Cheese Paneer Burger',
    description: 'Ultimate burger stacked with a grilled spiced paneer steak, melted cheese slice, and veggie crisp.',
    price: 180,
    category: 'burger',
    emoji: '🍔',
    isSpecialty: true,
    dietary: ['veg']
  },

  // ==========================================
  // 14. SOUP
  // ==========================================
  {
    id: 'sop-hot-and-sour',
    name: 'Hot & Sour Soup',
    description: 'Tangy and spicy thick broth with finely diced mushrooms, cabbage, tofu, and green chillies.',
    price: 150,
    category: 'soup',
    emoji: '🍲',
    dietary: ['veg'],
    spiceLevel: 2
  },
  {
    id: 'sop-manchow',
    name: 'Manchow Soup',
    description: 'Flavorful Indo-Chinese dark vegetable soup served with a mountain of crispy fried noodles.',
    price: 150,
    category: 'soup',
    emoji: '🍲',
    popular: true,
    dietary: ['veg'],
    spiceLevel: 1
  },
  {
    id: 'sop-cfc-special',
    name: 'CFC Special Soup',
    description: 'Chef signature velvety vegetable soup simmered with sweet corn, paneer, and garlic croutons.',
    price: 180,
    category: 'soup',
    emoji: '🥣',
    isSpecialty: true,
    dietary: ['veg']
  },

  // ==========================================
  // 15. PASTRY & DESSERTS (No prices on menu board -> blank option / editable by owner)
  // ==========================================
  {
    id: 'pas-chocolava-cake',
    name: 'Chocolava Cake',
    description: 'Warm chocolate sponge cake with an irresistible flowing core of molten dark chocolate ganache.',
    price: null, // Blank / Price on Request
    category: 'pastry',
    emoji: '🧁',
    popular: true,
    dietary: ['veg']
  },
  {
    id: 'pas-brownie',
    name: 'Brownie',
    description: 'Dense, fudgy chocolate brownie with cracked top and chewy cocoa center.',
    price: null, // Blank / Price on Request
    category: 'pastry',
    emoji: '🍫',
    popular: true,
    dietary: ['veg']
  },
  {
    id: 'pas-cake-pastry',
    name: 'Cake & Pastry',
    description: 'Assorted seasonal fresh gateau and pastry slices available at the dessert counter.',
    price: null, // Blank / Price on Request
    category: 'pastry',
    emoji: '🍰',
    dietary: ['veg']
  },

  // ==========================================
  // 16. CHINESE
  // ==========================================
  {
    id: 'chi-veg-noodle',
    name: 'Veg Noodle',
    description: 'Wok-tossed noodles with shredded cabbage, carrots, bell peppers, soy sauce, and scallions.',
    price: 180,
    category: 'chinese',
    emoji: '🍜',
    popular: true,
    dietary: ['veg']
  },
  {
    id: 'chi-veg-fried-rice',
    name: 'Veg Fried Rice',
    description: 'Fragrant basmati rice stir-fried in a roaring wok with farm vegetables and light soy.',
    price: 170,
    category: 'chinese',
    emoji: '🍚',
    popular: true,
    dietary: ['veg']
  },
  {
    id: 'chi-paneer-fried-rice',
    name: 'Paneer Fried Rice',
    description: 'Wok-tossed basmati rice packed with golden seared paneer cubes and crunchy vegetables.',
    price: 180,
    category: 'chinese',
    emoji: '🍚',
    dietary: ['veg']
  },
  {
    id: 'chi-crispy-corn',
    name: 'Crispy Corn',
    description: 'Sweet corn kernels batter-fried crunchy and tossed with black pepper, spring onions, and green chillies.',
    price: 210,
    category: 'chinese',
    emoji: '🌽',
    popular: true,
    dietary: ['veg'],
    spiceLevel: 1
  },
  {
    id: 'chi-mushroom-chilli',
    name: 'Mushroom Chilli',
    description: 'Crispy button mushrooms tossed in spicy Indo-Chinese chilli-garlic soya glaze.',
    price: 300,
    priceVariants: { 'Dry': 300, 'Gravy': 320 },
    category: 'chinese',
    emoji: '🍄',
    dietary: ['veg'],
    spiceLevel: 2
  },
  {
    id: 'chi-baby-corn-chilli',
    name: 'Baby Corn Chilli',
    description: 'Tender baby corn spears batter-crisped and tossed with bell peppers and fiery chilli sauce.',
    price: 300,
    priceVariants: { 'Dry': 300, 'Gravy': 350 },
    category: 'chinese',
    emoji: '🌽',
    dietary: ['veg'],
    spiceLevel: 2
  },
  {
    id: 'chi-chilli-paneer',
    name: 'Chilli Paneer',
    description: 'Cottage cheese cubes tossed in spicy chilli garlic sauce with crunchy onions and capsicum.',
    price: 300,
    priceVariants: { 'Dry': 300, 'Gravy': 350 },
    category: 'chinese',
    emoji: '🧀',
    popular: true,
    isSpecialty: true,
    dietary: ['veg'],
    spiceLevel: 2
  },
  {
    id: 'chi-veg-manchurian',
    name: 'Veg Manchurian',
    description: 'Crisp vegetable dumplings simmered in dark savory garlic, ginger, and soy sauce glaze.',
    price: 300,
    priceVariants: { 'Dry': 300, 'Gravy': 350 },
    category: 'chinese',
    emoji: '🧆',
    popular: true,
    dietary: ['veg'],
    spiceLevel: 1
  },
  {
    id: 'chi-veg-hakka-noodles',
    name: 'Veg Hakka Noodles',
    description: 'Classic Kolkata style wok-tossed Hakka noodles with julienned vegetables and white pepper.',
    price: 180,
    priceVariants: { 'Dry': 180, 'Gravy': 210 },
    category: 'chinese',
    emoji: '🥢',
    dietary: ['veg']
  },
  {
    id: 'chi-schezwan-fried-rice',
    name: 'Schezwan Fried Rice',
    description: 'Fiery red wok-fried rice cooked with pungent Schezwan peppers, garlic, and fresh vegetables.',
    price: 180,
    priceVariants: { 'Mild': 180, 'Spicy': 210 },
    category: 'chinese',
    emoji: '🌶️',
    dietary: ['veg'],
    spiceLevel: 3
  },
  {
    id: 'chi-schezwan-noodles',
    name: 'Schezwan Noodles',
    description: 'Spicy noodles tossed in bold in-house Schezwan chilli oil with crunchy peppers.',
    price: 190,
    priceVariants: { 'Regular': 190, 'Gravy': 210 },
    category: 'chinese',
    emoji: '🍜',
    dietary: ['veg'],
    spiceLevel: 3
  },
  {
    id: 'chi-paneer-noodles',
    name: 'Paneer Noodles',
    description: 'Stir-fried noodles loaded with succulent golden paneer cubes and spring greens.',
    price: 210,
    priceVariants: { 'Regular': 210, 'Gravy': 240 },
    category: 'chinese',
    emoji: '🍜',
    dietary: ['veg']
  },
  {
    id: 'chi-chilli-garlic-fried-rice',
    name: 'Chilli Garlic Fried Rice',
    description: 'Basmati rice cooked in fragrant burnt garlic oil with crushed red chillies and scallions.',
    price: 180,
    priceVariants: { 'Regular': 180, 'Special': 210 },
    category: 'chinese',
    emoji: '🧄',
    dietary: ['veg'],
    spiceLevel: 2
  },
  {
    id: 'chi-chilli-garlic-noodles',
    name: 'Chilli Garlic Noodles',
    description: 'Spicy noodles infused with golden roasted garlic cloves and spicy chilli oil.',
    price: 190,
    priceVariants: { 'Regular': 190, 'Gravy': 210 },
    category: 'chinese',
    emoji: '🍜',
    dietary: ['veg'],
    spiceLevel: 2
  },

  // ==========================================
  // 17. COMBO BITES
  // ==========================================
  {
    id: 'cmb-rice-paneer-coke',
    name: 'Veg Fried Rice + Chilli Paneer + Coke',
    description: 'Full combo meal with aromatic Veg Fried Rice, spicy Chilli Paneer gravy, and a chilled Coke.',
    price: 299,
    category: 'combo',
    emoji: '🍱',
    popular: true,
    isSpecialty: true,
    dietary: ['veg'],
    spiceLevel: 1
  },
  {
    id: 'cmb-pizza-chinese-chai',
    name: '1 Pizza + 1 Chinese + 2 Chai',
    description: 'Grand feast combo: Choice of fresh Pizza, Chinese dish, and 2 steaming cups of handcrafted Chai.',
    price: 350,
    category: 'combo',
    emoji: '🍕',
    popular: true,
    isSpecialty: true,
    dietary: ['veg']
  },
  {
    id: 'cmb-burger-fries-coke',
    name: 'Veg Burger + Coke + French Fries (Small)',
    description: 'Classic cafe trio: Crispy Veg Burger, golden salted fries, and a chilled beverage.',
    price: 250,
    category: 'combo',
    emoji: '🍔',
    popular: true,
    dietary: ['veg']
  },
  {
    id: 'cmb-chai-bun-makkhan',
    name: '1 Chai + 1 Bun Makkhan',
    description: 'The quintessential tea lover pairing: 1 cup of hot brewed tea with 1 buttered warm bun.',
    price: 70,
    category: 'combo',
    emoji: '☕',
    popular: true,
    dietary: ['veg']
  },
  {
    id: 'cmb-sandwich-coke',
    name: 'Veg Grilled Sandwich + Coke',
    description: 'Crispy golden toasted Veg Grill Sandwich accompanied by a frosty cold Coke.',
    price: 250,
    category: 'combo',
    emoji: '🥪',
    dietary: ['veg']
  }
];

export const CAFE_DETAILS = {
  name: 'Chai Cafe',
  tagline: 'Freshly Brewed & Baked With Love',
  instagram: 'https://www.instagram.com/chaifreecafe/',
  instagramHandle: '@chaifreecafe',
  googleReview: 'https://search.google.com/local/writereview?placeid=ChIJ64UZcgD9mzkRqVU37Bljdts',
  address: 'Shop 4, Ground Floor, Central Market',
  city: 'Jaipur, Rajasthan',
  pincode: '302001'
};
