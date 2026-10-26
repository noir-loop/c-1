export type MenuCategory =
  | 'chai'
  | 'cold_coffee'
  | 'hot_coffee'
  | 'coffee'
  | 'shake'
  | 'matcha'
  | 'mojito'
  | 'munchies'
  | 'bites'
  | 'maggi'
  | 'sandwich'
  | 'burger'
  | 'sandwich_burger'
  | 'pizza'
  | 'pasta'
  | 'soup'
  | 'soup_pasta'
  | 'pastry'
  | 'chinese'
  | 'combo';

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number | null; // in Rupees ₹, or null for blank/unpriced items (e.g. Matcha, Pastry, Water MRP)
  priceVariants?: { [variantName: string]: number }; // e.g. Regular vs Large, Dry vs Gravy, Small vs Kulhad
  category: MenuCategory;
  emoji: string;
  isSpecialty?: boolean;
  dietary?: ('veg' | 'jain')[];
  spiceLevel?: 0 | 1 | 2 | 3;
  popular?: boolean;
}

export type MascotPose = 'serving' | 'noting' | 'listening' | 'happy' | 'smiling' | 'idle';

export interface CafeConfig {
  openingTime: string;
  closingTime: string;
  daysOpen: string;
  address: string;
}
