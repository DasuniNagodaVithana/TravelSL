import kandyImg from "../images/kandy.jpg";
import galleImg from "../images/galle (2).jpg";
import sigiriyaImg from "../images/sigiriya.jpg";
import idalgashinnaImg from "../images/idalgashinna.jpg";
import bentotaImg from "../images/madhu-river-bentota-sri.jpg";
import anuradhapuraImg from "../images/mirisaweti-stupa.jpg";

interface Review {
  name: string;
  rating: number;
}

interface Tour {
  id: string;
  title: string;
  city: string;
  address:string;
  distance: number;
  price: number;
  maxGroupSize: number;
  desc: string;
  reviews: Review[];
  avgRating: number;
  photo: string;
  featured: boolean;
}

const tours: Tour[] = [
  {
    id: "01",
    title: "Temple of the Tooth",
    city: "Kandy",
    address: "Somewhere",
    distance: 100,
    price: 50,
    maxGroupSize: 20,
    desc: "Visit the sacred Temple of the Tooth in the heart of Kandy.",
    reviews: [
      {
        name: "Sayumi Tharumila",
        rating: 4.7,
      },
    ],
    avgRating: 4.7,
    photo: kandyImg,
    featured: true,
  },
  {
    id: "02",
    title: "Galle Fort",
    city: "Galle",
    address: "Somewhere",
    distance: 120,
    price: 60,
    maxGroupSize: 15,
    desc: "Explore the historical Galle Fort, a UNESCO World Heritage Site.",
    reviews: [
      {
        name: "Raveena Liyanage",
        rating: 4.8,
      },
    ],
    avgRating: 4.8,
    photo: galleImg,
    featured: true,
  },
  {
    id: "03",
    title: "Sigiriya Rock Fortress",
    city: "Sigiriya",
    address: "Somewhere",
    distance: 150,
    price: 75,
    maxGroupSize: 10,
    desc: "Climb the ancient Sigiriya Rock Fortress, an iconic landmark.",
    reviews: [
      {
        name: "Alice Smith",
        rating: 4.9,
      },
    ],
    avgRating: 4.9,
    photo: sigiriyaImg,
    featured: true,
  },
  {
    id: "04",
    title: "Scenic Train Ride",
    city: "Idalgashinna",
    address: "Somewhere",
    distance: 180,
    price: 40,
    maxGroupSize: 25,
    desc: "Experience one of the most scenic train rides in the world.",
    reviews: [
      
    ],
    avgRating: 4.6,
    photo: idalgashinnaImg,
    featured: true,
  },
  {
    id: "05",
    title: "Bentota Beach",
    city: "Bentota",
    address: "Somewhere",
    distance: 80,
    price: 50,
    maxGroupSize: 30,
    desc: "Relax on the beautiful beaches of Bentota.",
    reviews: [
      {
        name: "Nalina Udayana",
        rating: 4.5,
      },
    ],
    avgRating: 4.5,
    photo: bentotaImg,
    featured: true,
  },
  {
    id: "06",
    title: "Sacred City of Anuradhapura",
    city: "Anuradhapura",
    address: "Somewhere",
    distance: 200,
    price: 65,
    maxGroupSize: 15,
    desc: "Discover the ancient ruins of the Sacred City of Anuradhapura.",
    reviews: [
      {
        name: "David Green",
        rating: 4.7,
      },
    ],
    avgRating: 4.7,
    photo: anuradhapuraImg,
    featured: true,
  },
];

export default tours;
