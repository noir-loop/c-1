import { MenuItem } from '../types';

export type MoodType = 'happy' | 'sad' | 'stressed' | 'tired' | 'energetic' | 'relaxed';

export interface MoodConfig {
  id: MoodType;
  label: string;
  emoji: string;
  vibeTitle: string; // From menu screenshots: "CELEBRATE THE VIBE", "UNWIND & COMFORT", etc.
  tagline: string;
  friendlyResponse: string;
  featuredItemId: string; // Highlighted flagship item
  itemIds: string[]; // Curated food & drink pairings from screenshots 3 & 4
}

export const CHEF_MOOD_QUOTE =
  "Whatever your vibe today—whether you're celebrating wins, beating afternoon burnout, or looking for warm comfort—our kitchen has carefully balanced beverages and fresh bites to match every state of mind.";

/**
 * Exact Curated by Mood pairings matching Chai Cafe menu screenshots:
 *
 * 1. Feeling Happy (Celebrate The Vibe):
 *    Brownie Cold Coffee, Hazelnut Latte Cold, Cardamom Chai, Butterscotch Shake,
 *    Coconut Matcha, Blueberry Mojito, Pink Sauce Pasta
 *
 * 2. Feeling Stressed (Unwind & Comfort):
 *    Hot Chocolate, Masala Virgin Mojito, Black Coffee, Blueberry Matcha, Chocolate Shake
 *
 * 3. Feeling Tired (Recharge & Revive):
 *    Hazelnut Latte Cold, Chocolate Chai, Coffee Matcha, Butterfly Ice Tea,
 *    Ginger Chai, Cinnamon Chai, Peri Peri French Fries
 *
 * 4. Feeling Sad (Soul Healing Treats):
 *    Mango Shake, Chocolava Cake, Ice Cream 1 (Scoop), Brownie, Lemongrass Chai, Veg Cheese Cutlet
 *
 * 5. Feeling Energetic (High-Powered Boosters):
 *    Virgin Masala Mojito, Lemon Tea, Peach Ice Tea, Tiramisu Coffee, Red Bull,
 *    Diet Coke, Hell Drink, Black Coffee, Espresso Shot, Green Apple Mojito, Orange Mojito
 *
 * 6. Feeling Relaxed (Slow & Peaceful Bites):
 *    Blueberry Matcha, Strawberry Matcha, Special CFC Soup, Special CFC Pizza,
 *    Masala Maggi, Cheese French Fries, Poha
 */
export const MOOD_CONFIGS: Record<MoodType, MoodConfig> = {
  happy: {
    id: 'happy',
    label: 'Happy',
    emoji: '😊',
    vibeTitle: 'Celebrate The Vibe',
    tagline: 'Sweet treats & celebratory bites',
    friendlyResponse:
      "Celebrate your wonderful mood! We recommend pairing our decadent Brownie Cold Coffee with a plate of creamy Pink Sauce Pasta.",
    featuredItemId: 'cof-brownie-cold',
    itemIds: [
      'cof-brownie-cold',
      'cof-hazelnut-latte-cold',
      'chai-cardamom',
      'shk-butter-scotch',
      'mat-coconut',
      'moj-blueberry',
      'pas-pink-sauce'
    ]
  },
  stressed: {
    id: 'stressed',
    label: 'Stressed',
    emoji: '😣',
    vibeTitle: 'Unwind & Comfort',
    tagline: 'Warm sips to melt away tension',
    friendlyResponse:
      "Take a deep breath and unwind. A warm, velvety cup of Hot Chocolate or tangy Masala Virgin Mojito will help you decompress.",
    featuredItemId: 'cof-hot-chocolate',
    itemIds: [
      'cof-hot-chocolate',
      'moj-masala-virgin',
      'cof-black-coffee',
      'mat-blueberry',
      'shk-chocolate'
    ]
  },
  tired: {
    id: 'tired',
    label: 'Tired',
    emoji: '😴',
    vibeTitle: 'Recharge & Revive',
    tagline: 'High-energy revival drinks & hot fries',
    friendlyResponse:
      "Need a power recharge? Boost your energy with our chilled Hazelnut Latte Cold or spicy Ginger Chai paired with crispy Peri Peri Fries!",
    featuredItemId: 'cof-hazelnut-latte-cold',
    itemIds: [
      'cof-hazelnut-latte-cold',
      'chai-chocolate',
      'mat-coffee',
      'moj-butterfly-ice-tea',
      'chai-ginger',
      'chai-cinnamon',
      'bit-peri-peri-fries'
    ]
  },
  sad: {
    id: 'sad',
    label: 'Sad',
    emoji: '🥺',
    vibeTitle: 'Soul Healing Treats',
    tagline: 'Comforting chocolate, cakes & warm cutlets',
    friendlyResponse:
      "Sending you warmth and gentle comfort. Treat yourself to our warm Chocolava Cake, fresh Brownie, or a comforting Mango Shake.",
    featuredItemId: 'des-chocolava-cake',
    itemIds: [
      'shk-mango',
      'des-chocolava-cake',
      'des-ice-cream-scoop',
      'des-brownie',
      'chai-lemongrass',
      'mun-veg-cheese-cutlet'
    ]
  },
  energetic: {
    id: 'energetic',
    label: 'Energetic',
    emoji: '⚡',
    vibeTitle: 'High-Powered Boosters',
    tagline: 'Zesty refreshers, espresso & vitality drinks',
    friendlyResponse:
      "Keep that vibrant momentum going! Power through with our zesty Masala Mojito, a bold Espresso Shot, or an icy Peach Ice Tea.",
    featuredItemId: 'moj-masala-virgin',
    itemIds: [
      'moj-masala-virgin',
      'chai-lemon-tea',
      'moj-peach-ice-tea',
      'cof-tiramisu',
      'drk-red-bull',
      'drk-diet-coke',
      'drk-hell-drink',
      'cof-black-coffee',
      'cof-espresso-shot',
      'moj-green-apple',
      'moj-orange'
    ]
  },
  relaxed: {
    id: 'relaxed',
    label: 'Relaxed',
    emoji: '😌',
    vibeTitle: 'Slow & Peaceful Bites',
    tagline: 'Peaceful matcha infusions, soup & comfort snacks',
    friendlyResponse:
      "Savor this tranquil moment. Slow down with our ceremonial Blueberry Matcha, hot Special CFC Soup, and cheesy fries.",
    featuredItemId: 'mat-blueberry',
    itemIds: [
      'mat-blueberry',
      'mat-strawberry',
      'sop-special-cfc',
      'piz-special-cfc',
      'mag-masala',
      'bit-cheese-french-fries',
      'mun-poha'
    ]
  }
};

export const MOOD_LIST: MoodConfig[] = [
  MOOD_CONFIGS.happy,
  MOOD_CONFIGS.stressed,
  MOOD_CONFIGS.tired,
  MOOD_CONFIGS.sad,
  MOOD_CONFIGS.energetic,
  MOOD_CONFIGS.relaxed
];

export const UNSUPPORTED_QUESTION_RESPONSE =
  "I'm still learning! Choose one of our 6 curated moods above and I'll display the chef's balanced food & drink pairings.";

interface KeywordRule {
  keywords: string[];
  friendlyResponse: string;
  itemId: string;
}

/**
 * Predefined keyword rules covering both Food & Drinks across the whole menu.
 * Deterministic with zero external AI calls.
 */
const KEYWORD_RULES: KeywordRule[] = [
  {
    keywords: ['chai', 'tea', 'kadak', 'masala', 'cardamom', 'ginger', 'adrak', 'kulhad'],
    friendlyResponse:
      'Our signature Cardamom Chai (₹45) and royal Masala Chai (₹45) are slow-brewed with freshly ground whole spices and creamy milk! Extra Kulhad: ₹15.',
    itemId: 'chai-cardamom'
  },
  {
    keywords: ['coffee', 'cold coffee', 'latte', 'cappuccino', 'tiramisu', 'espresso', 'handbeaten', 'frappe'],
    friendlyResponse:
      'We serve freshly brewed Handbeaten Coffee (₹190), Tiramisu Coffee (₹160), and chilled Brownie Cold Coffee (₹220)!',
    itemId: 'cof-brownie-cold'
  },
  {
    keywords: ['chocolate', 'hot chocolate', 'cocoa', 'chocolava', 'brownie'],
    friendlyResponse:
      'Satisfy your sweet tooth with our molten Chocolava Cake (₹120), fudge Brownie (₹110), or European Hot Chocolate (₹160)!',
    itemId: 'des-chocolava-cake'
  },
  {
    keywords: ['pizza', 'thin crust', 'pizzas', 'cottage cheese pizza', 'farmhouse'],
    friendlyResponse:
      'Try our signature Special CFC Pizza (Regular 6": ₹290 / Thin Crust 8": ₹300) loaded with veggies, paneer, and bubbling mozzarella!',
    itemId: 'piz-special-cfc'
  },
  {
    keywords: ['maggi', 'maggie', 'noodles', 'comfort'],
    friendlyResponse:
      'Nothing beats hot Maggi! We serve Plain (₹90), Veg (₹120), Masala (₹120), Corn Cheese (₹130), and Cheese Loaded Maggi (₹150).',
    itemId: 'mag-masala'
  },
  {
    keywords: ['pasta', 'white sauce', 'red sauce', 'pink sauce'],
    friendlyResponse:
      'Our Italian pastas are made fresh to order. Enjoy Pink Sauce Pasta (₹210), White Sauce (₹210), Red Sauce (₹210), or Special CFC Pasta (₹250)!',
    itemId: 'pas-pink-sauce'
  },
  {
    keywords: ['burger', 'burgers', 'paneer burger'],
    friendlyResponse:
      'Sink your teeth into our Veg Burger (₹110), Veg Cheese Burger (₹140), or colossal Veg Cheese Paneer Burger (₹180)!',
    itemId: 'brg-veg-cheese-paneer'
  },
  {
    keywords: ['sandwich', 'sandwiches', 'grilled sandwich'],
    friendlyResponse:
      'Enjoy our crisp grilled sandwiches: Paneer Cheese Sandwich (₹180), Cheese Corn (₹140), or triple-decker Special CFC Sandwich (₹210)!',
    itemId: 'snd-special-cfc'
  },
  {
    keywords: ['momos', 'momo', 'dumpling', 'kurkure', 'steam momos'],
    friendlyResponse:
      'From Steamed Momos (₹180) to crunchy Kurkure Momos (₹250) and decadent Cheese Burst Momos (₹280), our dumplings are a crowd favorite!',
    itemId: 'mun-cheese-burst-momos'
  },
  {
    keywords: ['fries', 'french fries', 'peri peri', 'cheese fries', 'bites'],
    friendlyResponse:
      'Crispy golden potato fingers! Choose Salted (₹110), spicy Peri Peri (₹150), or molten Cheese French Fries (₹180).',
    itemId: 'bit-peri-peri-fries'
  },
  {
    keywords: ['chinese', 'fried rice', 'manchurian', 'hakka', 'chilli paneer'],
    friendlyResponse:
      'Wok-tossed Indo-Chinese delicacies: Crispy Corn (₹210), Chilli Paneer (Dry ₹310 / Gravy ₹350), and Veg Hakka Noodles (₹180)!',
    itemId: 'chi-chilli-paneer'
  },
  {
    keywords: ['matcha', 'japanese', 'green matcha'],
    friendlyResponse:
      'Ceremonial Japanese matcha infusions: Blueberry Matcha (₹250), Strawberry Matcha (₹220), Mango (₹230), and Coconut Matcha (₹250)!',
    itemId: 'mat-blueberry'
  },
  {
    keywords: ['shake', 'shakes', 'oreo', 'kitkat', 'butterscotch'],
    friendlyResponse:
      'Thick, velvety milkshakes blitzed with premium ice cream: KitKat Shake (₹180), Oreo (₹180), Butter Scotch (₹180), and Blueberry (₹170)!',
    itemId: 'shk-kitkat'
  },
  {
    keywords: ['mojito', 'cooler', 'soda', 'ice tea', 'red bull'],
    friendlyResponse:
      'Chill out with sparkling Virgin Mojito (₹120), Peach Ice Tea (₹140), Butterfly Ice Tea (₹140), or Red Bull (₹250)!',
    itemId: 'moj-virgin'
  },
  {
    keywords: ['soup', 'soups', 'hot and sour', 'manchow'],
    friendlyResponse:
      'Warm and soothing bowls: Hot & Sour (₹150), Manchow Soup with crisp noodles (₹160), and rich Special CFC Soup (₹199).',
    itemId: 'sop-special-cfc'
  },
  {
    keywords: ['dessert', 'ice cream', 'scoop', 'sweet'],
    friendlyResponse:
      'Sweet endings: Chocolava Cake (₹120), Brownie (₹110), Pastry (₹90), or 1 Scoop of Ice Cream in Butterscotch, Strawberry, Chocolate, or Vanilla (₹50)!',
    itemId: 'des-ice-cream-scoop'
  },
  {
    keywords: ['hour', 'hours', 'timing', 'timings', 'open', 'close', 'when'],
    friendlyResponse:
      'We are open daily from 10:00 AM to 10:00 PM! Visit us anytime for freshly prepared food and drinks.',
    itemId: 'chai-cardamom'
  },
  {
    keywords: ['location', 'address', 'where', 'place'],
    friendlyResponse:
      'We are located at Shop 4, Ground Floor, Central Market, Jaipur.',
    itemId: 'chai-masala'
  },
  {
    keywords: ['veg', 'vegetarian', 'pure veg', 'jain', 'meat', 'egg'],
    friendlyResponse:
      'Chai Cafe is 100% Pure Vegetarian! All of our food, snacks, pizzas, pastas, desserts, and drinks are prepared vegetarian.',
    itemId: 'chai-regular'
  },
  {
    keywords: ['packing', 'parcel', 'takeaway', 'packaging charge'],
    friendlyResponse:
      'Packing charge is ₹15 per parcel. Extra earthen clay kulhad is ₹15.',
    itemId: 'chai-extra-kulhad'
  },
  {
    keywords: ['hi', 'hello', 'hey', 'greetings', 'namaste'],
    friendlyResponse:
      "Hello! Welcome to Chai Cafe ♡ Select a mood above to view our kitchen's curated drink & food pairings!",
    itemId: 'chai-cardamom'
  },
  {
    keywords: ['miko', 'who are you', 'what are you', 'assistant', 'mascot'],
    friendlyResponse:
      'I am Miko, your friendly cafe spirit! I know our complete menu and curated pairings for every mood.',
    itemId: 'chai-masala'
  }
];

export interface AssistantResponse {
  friendlyResponse: string;
  recommendedItem: MenuItem | null; // Top recommendation
  recommendedDrink: MenuItem | null; // Backwards-compatibility alias
  curatedPairings: MenuItem[]; // Complete food & drink pairing list
  vibeTitle?: string;
  isSupported: boolean;
  matchedKeyword?: string;
}

/**
 * Finds a menu item by ID from the provided menu list (falls back to matching name if needed).
 */
export function findMenuItemById(itemId: string, menuItems: MenuItem[]): MenuItem | null {
  if (!itemId || !Array.isArray(menuItems)) return null;
  const found = menuItems.find((item) => item.id === itemId);
  if (found) return found;
  // Fallback match by name/id substring
  return (
    menuItems.find(
      (item) => item.id.includes(itemId) || item.name.toLowerCase().includes(itemId.toLowerCase())
    ) || null
  );
}

/**
 * Returns deterministic food & drink recommendation for a chosen mood,
 * including all curated pairings from Screenshots 3 & 4.
 */
export function getDrinkRecommendationForMood(
  mood: MoodType,
  menuItems: MenuItem[]
): AssistantResponse {
  const config = MOOD_CONFIGS[mood] || MOOD_CONFIGS.happy;
  const featuredItem = findMenuItemById(config.featuredItemId, menuItems);

  // Resolve all curated pairings from menuItems
  const curatedPairings: MenuItem[] = config.itemIds
    .map((id) => findMenuItemById(id, menuItems))
    .filter((item): item is MenuItem => item !== null);

  return {
    friendlyResponse: config.friendlyResponse,
    vibeTitle: config.vibeTitle,
    recommendedItem: featuredItem,
    recommendedDrink: featuredItem, // backwards compatibility
    curatedPairings,
    isSupported: true
  };
}

/**
 * Answers a customer's typed question using deterministic keyword matching rules.
 */
export function answerCustomerQuestion(
  rawQuery: string,
  menuItems: MenuItem[]
): AssistantResponse {
  const query = rawQuery.trim().toLowerCase();

  if (!query) {
    return {
      friendlyResponse: "Please pick a mood above or type a question about our menu!",
      recommendedItem: null,
      recommendedDrink: null,
      curatedPairings: [],
      isSupported: true
    };
  }

  // Off-topic guard
  const offTopicTerms = [
    'stock', 'crypto', 'bitcoin', 'quantum', 'poem', 'essay',
    'homework', 'weather in', 'president', 'politics', 'movie', 'code'
  ];
  if (offTopicTerms.some((term) => query.includes(term))) {
    return {
      friendlyResponse: UNSUPPORTED_QUESTION_RESPONSE,
      recommendedItem: null,
      recommendedDrink: null,
      curatedPairings: [],
      isSupported: false
    };
  }

  // Direct mood match
  const moodMatch = (Object.keys(MOOD_CONFIGS) as MoodType[]).find(
    (m) =>
      query === m ||
      query.includes(`feeling ${m}`) ||
      query.includes(`feel ${m}`) ||
      query.includes(`am ${m}`) ||
      query.includes(m)
  );

  if (moodMatch) {
    return getDrinkRecommendationForMood(moodMatch, menuItems);
  }

  // Check keyword rules
  for (const rule of KEYWORD_RULES) {
    const matched = rule.keywords.some((kw) => {
      if (kw.includes(' ')) {
        return query.includes(kw);
      }
      const regex = new RegExp(`\\b${kw}\\b`, 'i');
      return regex.test(query);
    });

    if (matched) {
      const item = findMenuItemById(rule.itemId, menuItems);
      return {
        friendlyResponse: rule.friendlyResponse,
        recommendedItem: item,
        recommendedDrink: item,
        curatedPairings: item ? [item] : [],
        isSupported: true
      };
    }
  }

  // Unsupported query fallback
  return {
    friendlyResponse: UNSUPPORTED_QUESTION_RESPONSE,
    recommendedItem: null,
    recommendedDrink: null,
    curatedPairings: [],
    isSupported: false
  };
}
