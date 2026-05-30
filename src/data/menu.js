export const menuCategories = [
  { id: 'wraps', label: 'Wraps', emoji: '🌯' },
  { id: 'plates', label: 'Plates', emoji: '🍽️' },
  { id: 'choma', label: 'Nyama Choma', emoji: '🥩' },
  { id: 'chips', label: 'Chips', emoji: '🍟' },
  { id: 'combos', label: 'Combos', emoji: '🎁' },
  { id: 'drinks', label: 'Drinks', emoji: '🥤' },
  { id: 'addons', label: 'Add-ons', emoji: '🥗' },
];

export const menuItems = [
  // SHAWARMA WRAPS
  { id: 1, category: 'wraps', name: 'Classic Chicken Shawarma', desc: 'Tender marinated chicken, garlic sauce, pickles & veggies in fresh pita bread', price: 280, badge: 'popular', image: '/images/menu/menu_chicken.webp' },
  { id: 2, category: 'wraps', name: 'Beef Shawarma', desc: 'Slow-roasted beef, tahini sauce, tomatoes & onions wrapped to perfection', price: 320, badge: null, image: '/images/menu/menu_beef.webp' },
  { id: 3, category: 'wraps', name: 'Mixed Shawarma', desc: 'Best of both worlds — chicken & beef with our signature house sauce', price: 350, badge: 'chef', image: '/images/menu/menu_mixed.webp' },
  { id: 4, category: 'wraps', name: 'Spicy Harissa Chicken', desc: 'Fiery harissa-marinated chicken with jalapeños and cooling yoghurt', price: 300, badge: 'hot', image: '/images/menu/menu_spicy.webp' },

  // SHAWARMA PLATES
  { id: 5, category: 'plates', name: 'Chicken Plate', desc: 'Generous chicken shawarma served with fragrant rice & fresh salad', price: 420, badge: null, image: '/images/menu/plate_chicken.webp' },
  { id: 6, category: 'plates', name: 'Mixed Grill Plate', desc: 'Premium selection of chicken, beef and lamb with pita & dips', price: 580, badge: 'chef', image: '/images/menu/plate_mixed.webp' },

  // NYAMA CHOMA
  { id: 7, category: 'choma', name: 'Goat Choma (1/2 Kg)', desc: 'Flame-grilled tender goat meat seasoned with Kenyan spices, served with kachumbari', price: 800, badge: 'popular', image: '/images/menu/grill_goat.webp' },
  { id: 8, category: 'choma', name: 'Beef Choma (1/2 Kg)', desc: 'Juicy, slow-roasted beef ribs right off the grill', price: 700, badge: null, image: '/images/menu/grill_beef.webp' },

  // CHIPS
  { id: 9, category: 'chips', name: 'Classic Chips', desc: 'Golden, crispy fries seasoned with our house spice blend', price: 150, badge: null, image: '/images/menu/chips_classic.webp' },
  { id: 10, category: 'chips', name: 'Masala Chips', desc: 'Crispy fries tossed in a rich, spicy masala tomato sauce', price: 200, badge: 'hot', image: '/images/menu/chips_masala.webp' },
  { id: 11, category: 'chips', name: 'Garlic Chips', desc: 'Fries tossed in roasted garlic butter and fresh parsley', price: 180, badge: null, image: '/images/menu/chips_garlic.webp' },

  // COMBOS
  { id: 12, category: 'combos', name: 'Shawarma + Chips Combo', desc: 'Any Wrap + Classic Chips + Soft Drink. The perfect midday fuel', price: 450, badge: 'value', image: '/images/menu/combo_shawarma.webp' },
  { id: 13, category: 'combos', name: 'Family Grill Combo', desc: '1Kg Nyama Choma + Family Chips + 2L Soda', price: 1800, badge: 'popular', image: '/images/menu/combo_family.webp' },

  // ADD-ONS
  { id: 14, category: 'addons', name: 'Sukuma Wiki', desc: 'Freshly sautéed collard greens with onions', price: 100, badge: 'veggie', image: '/images/menu/addon_sukuma.webp' },
  { id: 15, category: 'addons', name: 'Side Salad (Kachumbari)', desc: 'Fresh tomatoes, onions, cilantro, and lemon juice', price: 80, badge: null, image: '/images/menu/addon_kachumbari.webp' },

  // DRINKS
  { id: 16, category: 'drinks', name: 'Soft Drink (300ml)', desc: 'Coca-Cola, Sprite, Fanta or Stoney', price: 80, badge: null, image: '/images/menu/drink_cola.webp' },
  { id: 17, category: 'drinks', name: 'Fresh Lemonade', desc: 'Freshly squeezed lemons with a hint of mint', price: 150, badge: null, image: '/images/menu/drink_lemonade.webp' },
];

// Featured items for the homepage
export const featuredItems = menuItems.filter(item => [1, 7, 12].includes(item.id));
