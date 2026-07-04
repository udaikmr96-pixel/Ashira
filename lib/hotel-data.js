// Static seed data for Ashira Inn. This mirrors the eventual Google Sheets structure
// so it can be swapped later without changing the UI contract.

export const HOTEL = {
  name: 'Ashira Inn',
  tagline: 'Our Speciality Is Your Comfort',
  address: 'Plot No.17, Namauli, Knowledge Park III, Greater Noida, UP 201306',
  city: 'Greater Noida',
  state: 'Uttar Pradesh',
  country: 'India',
  postal: '201306',
  phones: ['9810014623', '8800958309'],
  email: 'ashira.inn@gmail.com',
  whatsapp: '9810014623',
  checkIn: '12:00 PM',
  checkOut: '11:00 AM',
  gstPercent: 12,
  currency: '₹',
  mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.5!2d77.505!3d28.470!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sKnowledge%20Park%20III%2C%20Greater%20Noida!5e0!3m2!1sen!2sin!4v1700000000000',
  socials: { instagram: '#', facebook: '#', google: '#' }
}

// Real Ashira Inn photos provided by owner
export const OWNER_IMAGES = {
  exterior: 'https://customer-assets.emergentagent.com/job_e2784338-0ee3-494e-8f67-23b4aa80b1fa/artifacts/7wdkvuyh_img-3.jpg',
  entrance: 'https://customer-assets.emergentagent.com/job_e2784338-0ee3-494e-8f67-23b4aa80b1fa/artifacts/n5guaobm_img-5.jpg',
  hallway: 'https://customer-assets.emergentagent.com/job_e2784338-0ee3-494e-8f67-23b4aa80b1fa/artifacts/q7tmq9zf_A.jpg',
  bedroom: 'https://customer-assets.emergentagent.com/job_e2784338-0ee3-494e-8f67-23b4aa80b1fa/artifacts/9c4a8tm2_img-8.jpg',
  bathtub: 'https://customer-assets.emergentagent.com/job_e2784338-0ee3-494e-8f67-23b4aa80b1fa/artifacts/oxes79rq_img-11.jpg',
}

const U = (id, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

export const ROOM_TYPES = [
  {
    id: 'deluxe',
    slug: 'deluxe-room',
    name: 'Deluxe Room',
    tagline: 'Warm comfort, thoughtfully designed',
    price: 2499,
    originalPrice: 2999,
    size: '220 sq ft',
    occupancy: '2 Adults + 1 Child',
    beds: '1 Queen Bed',
    view: 'City View',
    inventory: 6,
    description:
      'Our signature Deluxe Room blends warm wood tones with crisp linens for a restful stay. Every detail — from the plush bedding to the soft ambient lighting — is curated to make you feel instantly at home in the heart of Knowledge Park.',
    highlights: ['Queen Bed', 'City View', 'Work Desk', 'Rain Shower'],
    images: [
      OWNER_IMAGES.bedroom,
      U('photo-1611892440504-42a792e24d32'),
      U('photo-1618773928121-c32242e63f39'),
      OWNER_IMAGES.hallway,
    ],
  },
  {
    id: 'premium',
    slug: 'premium-room',
    name: 'Premium Room',
    tagline: 'Elevated space, refined finishes',
    price: 3299,
    originalPrice: 3899,
    size: '280 sq ft',
    occupancy: '2 Adults + 1 Child',
    beds: '1 King Bed',
    view: 'City / Garden View',
    inventory: 5,
    description:
      'The Premium Room offers a more spacious layout with a king-size bed, sitting nook and larger workspace. Perfect for business travellers visiting India Expo Mart or families exploring Greater Noida.',
    highlights: ['King Bed', 'Sitting Nook', 'Premium Toiletries', '43" Smart TV'],
    images: [
      U('photo-1631049307264-da0ec9d70304'),
      OWNER_IMAGES.bedroom,
      U('photo-1590490360182-c33d57733427'),
      U('photo-1590381105924-c72589b9ef3f'),
    ],
  },
  {
    id: 'premium-bathtub',
    slug: 'premium-room-with-bathtub',
    name: 'Premium Room with Bathtub',
    tagline: 'A private spa moment, every night',
    price: 4199,
    originalPrice: 4999,
    size: '320 sq ft',
    occupancy: '2 Adults + 1 Child',
    beds: '1 King Bed',
    view: 'Premium View',
    inventory: 4,
    description:
      'Our most indulgent room features a private soaking bathtub, king-size bed and elevated amenities. Unwind after a day at Buddh Circuit or Sharda University in a room designed for slow, luxurious evenings.',
    highlights: ['Private Bathtub', 'King Bed', 'Rain Shower', 'Bathrobe & Slippers'],
    images: [
      OWNER_IMAGES.bathtub,
      OWNER_IMAGES.bedroom,
      U('photo-1552321554-5fefe8c9ef14'),
      U('photo-1600585154340-be6161a56a0c'),
    ],
  },
]

export const ROOM_AMENITIES = [
  { key: 'ac', label: 'Air Conditioning', icon: 'Snowflake' },
  { key: 'wifi', label: 'Free High-Speed WiFi', icon: 'Wifi' },
  { key: 'tv', label: 'Smart TV', icon: 'Tv' },
  { key: 'kettle', label: 'Electric Kettle', icon: 'CupSoda' },
  { key: 'tea', label: 'Tea & Coffee Kit', icon: 'Coffee' },
  { key: 'wardrobe', label: 'Wardrobe', icon: 'Shirt' },
  { key: 'desk', label: 'Work Desk', icon: 'PenTool' },
  { key: 'hotwater', label: '24hr Hot Water', icon: 'Droplets' },
  { key: 'service', label: 'Room Service', icon: 'BellRing' },
  { key: 'housekeeping', label: 'Daily Housekeeping', icon: 'Sparkles' },
  { key: 'toiletries', label: 'Complimentary Toiletries', icon: 'Bath' },
  { key: 'linen', label: 'Fresh Linen', icon: 'BedDouble' },
]

export const HOTEL_AMENITIES = [
  { title: 'Multi-Cuisine Restaurant', desc: 'In-house Indian & Chinese kitchen serving breakfast to dinner.', icon: 'UtensilsCrossed' },
  { title: '24 / 7 Front Desk', desc: 'Warm hospitality round the clock, whenever you arrive.', icon: 'ConciergeBell' },
  { title: 'Free High-Speed WiFi', desc: 'Uninterrupted connectivity in every room and public area.', icon: 'Wifi' },
  { title: 'Complimentary Parking', desc: 'Secure on-site parking for guests, including EV-friendly spot.', icon: 'Car' },
  { title: 'Airport & Local Transfers', desc: 'Cab arrangements to IGI Airport, Expo Mart and Sharda campus.', icon: 'Plane' },
  { title: 'Laundry & Housekeeping', desc: 'Same-day laundry and daily housekeeping on request.', icon: 'Shirt' },
  { title: 'Power Backup', desc: '100% power backup so your stay is never interrupted.', icon: 'Zap' },
  { title: 'Elevator Access', desc: 'Lift access to every floor for effortless movement.', icon: 'ArrowUpDown' },
]

export const ATTRACTIONS = [
  {
    name: 'India Expo Mart',
    distance: '3.5 km',
    time: '10 min drive',
    desc: 'India’s largest integrated exhibition & convention centre — host to global expos year-round.',
    image: U('photo-1587825140708-dfaf72ae4b04'),
    maps: 'https://maps.google.com/?q=India+Expo+Mart',
  },
  {
    name: 'Sharda University',
    distance: '2.2 km',
    time: '6 min drive',
    desc: 'One of North India’s largest multi-disciplinary universities — perfect for parents visiting students.',
    image: U('photo-1607237138185-eedd9c632b0b'),
    maps: 'https://maps.google.com/?q=Sharda+University+Greater+Noida',
  },
  {
    name: 'Knowledge Park Metro',
    distance: '1.4 km',
    time: '4 min drive',
    desc: 'Direct Aqua Line connectivity to Noida, DND & the greater Delhi metropolitan region.',
    image: U('photo-1544620347-c4fd4a3d5957'),
    maps: 'https://maps.google.com/?q=Knowledge+Park+II+Metro+Station',
  },
  {
    name: 'Buddh International Circuit',
    distance: '18 km',
    time: '25 min drive',
    desc: 'India’s premier Formula 1 & MotoGP venue — ideal weekend racing getaway.',
    image: U('photo-1541447271487-09612b3f49f7'),
    maps: 'https://maps.google.com/?q=Buddh+International+Circuit',
  },
  {
    name: 'Surajpur Bird Sanctuary',
    distance: '11 km',
    time: '20 min drive',
    desc: 'A protected wetland home to 180+ bird species — a peaceful escape into nature.',
    image: U('photo-1552083375-1447ce886485'),
    maps: 'https://maps.google.com/?q=Surajpur+Bird+Sanctuary',
  },
  {
    name: 'Pari Chowk',
    distance: '4.8 km',
    time: '12 min drive',
    desc: 'The commercial heart of Greater Noida — shopping malls, cafes and nightlife.',
    image: U('photo-1519113440813-e2c7cbb43cbc'),
    maps: 'https://maps.google.com/?q=Pari+Chowk+Greater+Noida',
  },
]

export const RESTAURANT = {
  hero: U('photo-1414235077428-338989a2e8c0'),
  intro:
    'Our multi-cuisine restaurant serves lovingly prepared Indian and Chinese dishes, all day. Whether it’s a hearty breakfast before a day at Expo Mart or a late dinner after Buddh Circuit — we’re open.',
  timings: [
    { meal: 'Breakfast', time: '7:00 – 10:30 AM' },
    { meal: 'Lunch', time: '12:30 – 3:30 PM' },
    { meal: 'Dinner', time: '7:30 – 11:00 PM' },
    { meal: 'Room Service', time: '24 hours' },
  ],
  menu: [
    {
      section: 'Indian Signatures',
      image: U('photo-1585937421612-70a008356fbe'),
      items: [
        { name: 'Butter Chicken', desc: 'Slow-simmered tomato-cream gravy with tandoori chicken.', price: 320 },
        { name: 'Paneer Lababdar', desc: 'Cottage cheese in a rich onion-tomato masala.', price: 280 },
        { name: 'Dal Makhani', desc: 'Overnight-cooked black lentils, finished with cream.', price: 240 },
        { name: 'Assorted Kebab Platter', desc: 'Seekh, malai tikka & tandoori chicken with mint chutney.', price: 420 },
      ],
    },
    {
      section: 'Chinese Kitchen',
      image: U('photo-1563245372-f21724e3856d'),
      items: [
        { name: 'Chilli Chicken (Dry)', desc: 'Wok-tossed chicken, bell pepper & green chilli.', price: 300 },
        { name: 'Veg Manchurian', desc: 'Crispy veggie dumplings in tangy dark sauce.', price: 240 },
        { name: 'Hakka Noodles', desc: 'Stir-fried noodles with garden vegetables.', price: 220 },
        { name: 'Schezwan Fried Rice', desc: 'Fiery Schezwan-tossed long-grain rice.', price: 230 },
      ],
    },
    {
      section: 'Breakfast',
      image: U('photo-1533089860892-a7c6f0a88666'),
      items: [
        { name: 'Aloo Paratha Thali', desc: 'Two parathas with curd, pickle & butter.', price: 180 },
        { name: 'Bombay Masala Omelette', desc: 'Three-egg omelette with toast & hash browns.', price: 160 },
        { name: 'Continental Platter', desc: 'Eggs, sausage, beans, toast & fresh fruit.', price: 260 },
        { name: 'South Indian Combo', desc: 'Idli, medu vada, sambar & chutney trio.', price: 190 },
      ],
    },
    {
      section: 'Chef Specials',
      image: U('photo-1546069901-ba9599a7e63c'),
      items: [
        { name: 'Ashira Signature Biryani', desc: 'Dum-cooked long-grain rice, saffron, tender meat.', price: 380 },
        { name: 'Handi Kadhai Paneer', desc: 'Slow-cooked in traditional clay handi.', price: 300 },
        { name: 'Tandoori Platter Deluxe', desc: 'Chef’s choice of the day, straight from the tandoor.', price: 520 },
      ],
    },
  ],
}

export const GALLERY = [
  { src: OWNER_IMAGES.exterior, category: 'Exterior', caption: 'Ashira Inn Exterior' },
  { src: OWNER_IMAGES.entrance, category: 'Exterior', caption: 'Main Entrance' },
  { src: OWNER_IMAGES.hallway, category: 'Interior', caption: 'Guest Corridor' },
  { src: OWNER_IMAGES.bedroom, category: 'Rooms', caption: 'Deluxe Bedroom' },
  { src: OWNER_IMAGES.bathtub, category: 'Bathrooms', caption: 'Premium Bathtub Suite' },
  { src: U('photo-1414235077428-338989a2e8c0'), category: 'Restaurant', caption: 'Restaurant Ambience' },
  { src: U('photo-1590490360182-c33d57733427'), category: 'Lobby', caption: 'Reception Lounge' },
  { src: U('photo-1611892440504-42a792e24d32'), category: 'Rooms', caption: 'Premium Room' },
  { src: U('photo-1585937421612-70a008356fbe'), category: 'Restaurant', caption: 'Indian Thali' },
  { src: U('photo-1552321554-5fefe8c9ef14'), category: 'Bathrooms', caption: 'Spa-style Bathroom' },
  { src: U('photo-1541447271487-09612b3f49f7'), category: 'Nearby', caption: 'Buddh Circuit' },
  { src: U('photo-1552083375-1447ce886485'), category: 'Nearby', caption: 'Surajpur Sanctuary' },
]

export const TESTIMONIALS = [
  {
    name: 'Rohit Sharma',
    city: 'Mumbai',
    rating: 5,
    text: 'Stayed here during the auto expo. The rooms are spotless, the staff is genuinely warm, and the food from their kitchen was outstanding. Will absolutely return.',
    initials: 'RS',
  },
  {
    name: 'Priya Menon',
    city: 'Bengaluru',
    rating: 5,
    text: 'Visited my daughter at Sharda University — Ashira Inn felt more like a boutique home than a hotel. The bathtub room was a beautiful surprise.',
    initials: 'PM',
  },
  {
    name: 'Anand Verma',
    city: 'Delhi',
    rating: 5,
    text: 'Great value, spotless housekeeping, and the manager personally called to confirm my early check-in. This is how hospitality should be done.',
    initials: 'AV',
  },
  {
    name: 'Sanya Kapoor',
    city: 'Chandigarh',
    rating: 5,
    text: 'The location is perfect for Buddh Circuit weekends. Rooms are quiet, WiFi is fast, and the butter chicken deserves its own award.',
    initials: 'SK',
  },
]

export const OFFERS = [
  { title: 'Long Stay Saver', desc: 'Book 4+ nights & get 15% off + complimentary breakfast.', tag: '15% OFF', code: 'STAY15' },
  { title: 'Expo Mart Corporate', desc: 'Special corporate rates for India Expo Mart visitors.', tag: 'CORPORATE', code: 'EXPO10' },
  { title: 'Weekend Escape', desc: 'Fri–Sun stays include a Buddh Circuit tour discount.', tag: 'WEEKEND', code: 'RACE20' },
]

export const FAQ_ITEMS = [
  { q: 'What are the check-in and check-out timings?', a: 'Standard check-in is 12:00 PM and check-out is 11:00 AM. Early check-in and late check-out are subject to availability — just ask.' },
  { q: 'Do you accept walk-in guests?', a: 'Yes, subject to availability. We strongly recommend booking online to lock in our best direct rate.' },
  { q: 'Is parking available?', a: 'Yes, complimentary secure parking on-site including an EV-friendly slot.' },
  { q: 'Do you allow extra guests in a room?', a: 'Each room comfortably fits 2 adults + 1 child (below 8 years) free. Extra adult is chargeable at ₹600/night.' },
  { q: 'What ID proofs are accepted?', a: 'Aadhaar, Passport, Driving Licence and Voter ID. International guests must present a valid passport with visa.' },
  { q: 'How do I cancel my booking?', a: 'Bookings cancelled 48 hours prior to check-in are fully refundable. Please refer to our Cancellation Policy for details.' },
  { q: 'Do you provide airport transfers?', a: 'Yes, on request. Please share your flight details at least 6 hours in advance.' },
]

// Seed room inventory (individual room numbers)
export function buildRoomInventory() {
  const rooms = []
  const map = [
    { type: 'deluxe', floor: 1, count: 6, startNo: 101 },
    { type: 'premium', floor: 2, count: 5, startNo: 201 },
    { type: 'premium-bathtub', floor: 3, count: 4, startNo: 301 },
  ]
  map.forEach(({ type, floor, count, startNo }) => {
    const rt = ROOM_TYPES.find((r) => r.id === type)
    for (let i = 0; i < count; i++) {
      rooms.push({
        roomNumber: String(startNo + i),
        floor,
        roomType: type,
        typeName: rt.name,
        price: rt.price,
        capacity: rt.occupancy,
        status: 'available',
        cleaningStatus: 'clean',
        maintenance: false,
      })
    }
  })
  return rooms
}
