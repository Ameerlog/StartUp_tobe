import { Icon } from "lucide-react";
import Tshirt from  "../assets/merchandise/tshirt1.svg"
import Vneck from  "../assets/merchandise/vneck.svg"
 import Billboard from  "../assets/merchandise/billboards.svg"
 import Cap from  "../assets/merchandise/cap.svg"
 import Hoodie from  "../assets/merchandise/hoodie.svg"
 
export const merchandiseData = [
 
   {
    id: 1,
    category: "tshirts",
    icon:Tshirt,
    name: "Premium Round Neck",
    price: "₹300.99",
    image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    category: "tshirts",
    icon:Vneck,
    name: "Polo Tshirt",
    price: "₹340.99",
    image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=400&fit=crop",
  },


 
  {
    id: 3,
    icon:Hoodie,
    category: "hoodies",
    name: "Classic Hoodie",
    price: "₹509.99",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
  },
 

 
  {
    id: 4,
    icon:Cap,
    category: "caps",
    name: "Snapback Cap",
    price: "₹204.99",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop",
  },
 
 
  


  {
    id: 5,
    icon:Billboard,
    category: "billboards",
    name: "Digital Billboard",
    price: "₹499.99",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=400&fit=crop",
  },

 

];

export const categories = [
  { id: "all", label: "All" },
  { id: "tshirts", label: "T-Shirts" },
  { id: "hoodies", label: "Hoodies" },
  { id: "caps", label: "Caps" },
  { id: "billboards", label: "Billboards" },
];