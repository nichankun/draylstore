export interface Game {
  id: string;
  title: string;
  img: string;
  tag?: string;
  tagColor?: string;
}

export interface Nominal {
  id: string;
  label: string;
  price: string;
  rawPrice: number;
}

export const POPULAR_GAMES: Game[] = [
  {
    id: "mlbb",
    title: "Mobile Legends",
    img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=500",
  },
  {
    id: "pubgm",
    title: "PUBG Mobile",
    img: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=500",
  },
  {
    id: "ff",
    title: "Free Fire",
    img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=500",
    tag: "EVENT",
    tagColor: "bg-[#f472b6]",
  },
  {
    id: "genshin",
    title: "Genshin Impact",
    img: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=500",
  },
  {
    id: "valorant",
    title: "Valorant",
    img: "https://images.unsplash.com/photo-1589241062272-c0a000072dfa?q=80&w=500",
  },
  {
    id: "efootball",
    title: "eFootball 2026",
    img: "https://images.unsplash.com/photo-1517603951033-2ae7de621244?q=80&w=500",
    tag: "UPDATE",
    tagColor: "bg-[#4ade80]",
  },
];

export const NOMINAL_OPTIONS: Nominal[] = [
  { id: "172", label: "172 Diamonds", price: "38.900", rawPrice: 38900 },
  { id: "257", label: "257 Diamonds", price: "58.000", rawPrice: 58000 },
  { id: "706", label: "706 Diamonds", price: "155.500", rawPrice: 155500 },
];

export const PAYMENT_METHODS = [
  { id: "dana", logo: "https://placehold.co/200x60/ffffff/007aff?text=DANA" },
  { id: "ovo", logo: "https://placehold.co/200x60/ffffff/4b0082?text=OVO" },
  {
    id: "shopeepay",
    logo: "https://placehold.co/200x60/ffffff/ee4d2d?text=ShopeePay",
  },
];
