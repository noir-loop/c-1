import { MenuItem } from '../types';

export type MoodType = 'happy' | 'sad' | 'stressed' | 'tired' | 'energetic' | 'relaxed';

export interface MoodConfig {
  id: MoodType;
  label: string;
  emoji: string;
  tagline: string;
  friendlyResponse: string;
  drinkId: string; // References authentic menu item ID in ALL_MENU_ITEMS
}

/**
 * Fixed mood choices mapped to authentic menu drinks:
 * 1. Happy -> Kitkat Shake (₹120)
 * 2. Sad -> Hot Chocolate (₹150)
 * 3. Stressed -> Cardamom Chai (₹25)
 * 4. Tired -> Handbeaten Coffee (₹70)
 * 5. Energetic -> Virgin Mojito (₹90)
 * 6. Relaxed -> Green Tea (₹30)
 */
export const MOOD_CONFIGS: Record<MoodType, MoodConfig> = {
  happy: {
    id: 'happy',
    label: 'Happy',
    emoji: '😊',
    tagline: 'Cheerful & Celebratory',
    friendlyResponse: "That's wonderful! Celebrate your cheerful mood with a decadent, sweet treat.",
    drinkId: 'shk-kitkat'
  },
  sad: {
    id: 'sad',
    label: 'Sad',
    emoji: '🥺',
    tagline: 'Need a Warm Hug',
    friendlyResponse: 'Sending you warmth and comfort! A luxurious, rich cup of hot chocolate will lift your spirits.',
    drinkId: 'cof-hot-chocolate'
  },
  stressed: {
    id: 'stressed',
    label: 'Stressed',
    emoji: '😣',
    tagline: 'Unwind & Decompress',
    friendlyResponse: 'Take a deep breath and unwind. Fragrant slow-brewed cardamom chai helps melt away tension.',
    drinkId: 'chai-cardamom'
  },
  tired: {
    id: 'tired',
    label: 'Tired',
    emoji: '😴',
    tagline: 'Low Energy Booster',
    friendlyResponse: 'Need a power boost? Our rich, frothy handbeaten coffee is whipped thick to recharge you instantly!',
    drinkId: 'cof-handbeaten'
  },
  energetic: {
    id: 'energetic',
    label: 'Energetic',
    emoji: '⚡',
    tagline: 'High Energy & Active',
    friendlyResponse: 'Match that vibrant energy with a bubbly, zesty Virgin Mojito infused with fresh mint and tangy lime!',
    drinkId: 'moj-virgin'
  },
  relaxed: {
    id: 'relaxed',
    label: 'Relaxed',
    emoji: '😌',
    tagline: 'Peaceful & Mindful',
    friendlyResponse: 'Savor this tranquil moment with a gentle, antioxidant-rich cup of freshly steeped green tea.',
    drinkId: 'chai-green-tea'
  }
};

export const MOOD_LIST: MoodConfig[] = [
  MOOD_CONFIGS.happy,
  MOOD_CONFIGS.sad,
  MOOD_CONFIGS.stressed,
  MOOD_CONFIGS.tired,
  MOOD_CONFIGS.energetic,
  MOOD_CONFIGS.relaxed
];

export const UNSUPPORTED_QUESTION_RESPONSE =
  "I'm still learning! Choose a mood and I'll help you find your perfect drink.";

interface KeywordRule {
  keywords: string[];
  friendlyResponse: string;
  drinkId: string;
}

/**
 * Predefined keyword rules for customer queries.
 * Evaluated deterministically with zero external AI or API calls.
 */
const KEYWORD_RULES: KeywordRule[] = [
  {
    keywords: ['chai', 'tea', 'kadak', 'masala', 'cardamom', 'ginger', 'adrak', 'assam'],
    friendlyResponse:
      'Our signature Cardamom Chai (₹25) and royal Masala Chai (₹25) are slow-brewed with freshly ground spices and creamy milk!',
    drinkId: 'chai-cardamom'
  },
  {
    keywords: ['coffee', 'cold coffee', 'latte', 'cappuccino', 'cuppacino', 'espresso', 'caffeine', 'frappe'],
    friendlyResponse:
      'For a chilled coffee fix, our thick Regular Cold Coffee (₹120) is a customer favorite. We also whip up authentic Handbeaten Coffee (₹70)!',
    drinkId: 'cof-regular-cold'
  },
  {
    keywords: ['chocolate', 'hot chocolate', 'cocoa', 'choco'],
    friendlyResponse:
      'Indulge in our luxurious Hot Chocolate (₹150) blended with pure melted cocoa and warm steamed milk.',
    drinkId: 'cof-hot-chocolate'
  },
  {
    keywords: ['shake', 'shakes', 'kitkat', 'oreo', 'blueberry', 'mango', 'strawberry', 'pineapple'],
    friendlyResponse:
      'Our Trickle Couture shakes (all ₹120) are blended thick with rich ice cream. Try our top-rated Kitkat Shake!',
    drinkId: 'shk-kitkat'
  },
  {
    keywords: ['mojito', 'soda', 'mint', 'lime', 'chilled', 'cooler', 'summer', 'ice tea', 'fizzy'],
    friendlyResponse:
      'Cool off with our sparkling Virgin Mojito (₹90) or fruit mojitos muddled with garden mint and sparkling soda!',
    drinkId: 'moj-virgin'
  },
  {
    keywords: ['green tea', 'lemon tea', 'healthy', 'diet', 'weight', 'detox', 'sugar free', 'light'],
    friendlyResponse:
      'For a clean, healthy, antioxidant-rich sip, try our whole-leaf Green Tea (₹30) or zesty Lemon Tea (₹30).',
    drinkId: 'chai-green-tea'
  },
  {
    keywords: ['hour', 'hours', 'timing', 'timings', 'open', 'close', 'when'],
    friendlyResponse:
      'We are open daily from 10:00 AM to 10:00 PM! Visit us anytime for freshly brewed tea and snacks.',
    drinkId: 'chai-cardamom'
  },
  {
    keywords: ['location', 'address', 'where', 'place', 'kapoorthala', 'aliganj', 'lucknow'],
    friendlyResponse:
      'We are located at Shop No UGF 18 Arohi Block 2, Kapoorthala Commercial Complex, Aliganj, Lucknow - 226024.',
    drinkId: 'chai-masala'
  },
  {
    keywords: ['veg', 'vegetarian', 'non veg', 'egg', 'meat', 'jain', 'pure veg'],
    friendlyResponse:
      'Chai Cafe is 100% Pure Vegetarian! All of our food, snacks, chai, and chilled sips are completely vegetarian.',
    drinkId: 'chai-regular'
  },
  {
    keywords: ['menu price', 'menu prices', 'drink prices', 'prices', 'pricing', 'rates', 'cheap', 'affordable', 'how much', 'budget'],
    friendlyResponse:
      'Our authentic chais start at just ₹25, coffees and mojitos start at ₹70-₹90, and all items are budget-friendly!',
    drinkId: 'chai-regular'
  },
  {
    keywords: ['order', 'delivery', 'table', 'service', 'pay', 'payment', 'upi', 'cash', 'zomato', 'swiggy'],
    friendlyResponse:
      'We offer table-service dining! Browse the digital menu, and our table servers will take your order and accept cash or UPI.',
    drinkId: 'chai-cardamom'
  },
  {
    keywords: ['hi', 'hello', 'hey', 'greetings', 'namaste', 'morning', 'evening', 'afternoon'],
    friendlyResponse:
      "Hello! Welcome to Chai Cafe ♡ Pick how you're feeling from our mood buttons, and I'll find your perfect drink!",
    drinkId: 'chai-cardamom'
  },
  {
    keywords: ['miko', 'who are you', 'what are you', 'assistant', 'bot', 'spirit', 'mascot'],
    friendlyResponse:
      'I am Miko, the friendly cafe spirit of Chai Cafe! I know all 70+ authentic menu items and help guests find delicious drinks.',
    drinkId: 'chai-masala'
  }
];

export interface AssistantResponse {
  friendlyResponse: string;
  recommendedDrink: MenuItem | null;
  isSupported: boolean;
  matchedKeyword?: string;
}

/**
 * Finds a menu item by ID from the provided menu list (falls back to matching name if needed).
 */
export function findMenuItemById(drinkId: string, menuItems: MenuItem[]): MenuItem | null {
  const found = menuItems.find((item) => item.id === drinkId);
  if (found) return found;
  // Fallback match by name part
  return (
    menuItems.find((item) => item.id.includes(drinkId) || item.name.toLowerCase().includes(drinkId.toLowerCase())) ||
    null
  );
}

/**
 * Returns deterministic drink recommendation and friendly response for a chosen mood.
 */
export function getDrinkRecommendationForMood(
  mood: MoodType,
  menuItems: MenuItem[]
): AssistantResponse {
  const config = MOOD_CONFIGS[mood] || MOOD_CONFIGS.happy;
  const drink = findMenuItemById(config.drinkId, menuItems);
  return {
    friendlyResponse: config.friendlyResponse,
    recommendedDrink: drink,
    isSupported: true
  };
}

/**
 * Answers a customer's typed question using deterministic keyword matching rules.
 * If unsupported, responds with: "I'm still learning! Choose a mood and I'll help you find your perfect drink."
 */
export function answerCustomerQuestion(
  rawQuery: string,
  menuItems: MenuItem[]
): AssistantResponse {
  const query = rawQuery.trim().toLowerCase();

  if (!query) {
    return {
      friendlyResponse: "Please pick a mood above or type a question about our drinks!",
      recommendedDrink: null,
      isSupported: true
    };
  }

  // Off-topic / general knowledge check to prevent false positives
  const offTopicTerms = ['stock', 'crypto', 'bitcoin', 'quantum', 'poem', 'essay', 'homework', 'weather in', 'president', 'politics', 'movie', 'code', 'javascript', 'python'];
  if (offTopicTerms.some((term) => query.includes(term))) {
    return {
      friendlyResponse: UNSUPPORTED_QUESTION_RESPONSE,
      recommendedDrink: null,
      isSupported: false
    };
  }

  // Check if the query directly names a mood (e.g. "I feel tired", "happy", "stressed")
  const moodMatch = (Object.keys(MOOD_CONFIGS) as MoodType[]).find(
    (m) => query === m || query.includes(`feeling ${m}`) || query.includes(`am ${m}`) || query.includes(m)
  );

  if (moodMatch) {
    return getDrinkRecommendationForMood(moodMatch, menuItems);
  }

  // Check keyword rules
  for (const rule of KEYWORD_RULES) {
    const matched = rule.keywords.some((kw) => {
      // Word boundary match or includes for multi-word phrases
      if (kw.includes(' ')) {
        return query.includes(kw);
      }
      const regex = new RegExp(`\\b${kw}\\b`, 'i');
      return regex.test(query);
    });

    if (matched) {
      const drink = findMenuItemById(rule.drinkId, menuItems);
      return {
        friendlyResponse: rule.friendlyResponse,
        recommendedDrink: drink,
        isSupported: true
      };
    }
  }

  // Unsupported query fallback
  return {
    friendlyResponse: UNSUPPORTED_QUESTION_RESPONSE,
    recommendedDrink: null,
    isSupported: false
  };
}
