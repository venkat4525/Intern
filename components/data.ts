import { Activity, Bath, BedDouble, HeartPulse, Home, PackageCheck, PersonStanding, Stethoscope, Utensils } from "lucide-react";
export const categories=[
 {name:"Health Essentials",count:"300+ products",icon:"HeartPulse"},{name:"Medical Devices",count:"100+ devices",icon:Stethoscope},{name:"Personal Care",count:"250+ items",icon:"Bath"},{name:"Mobility Aids",count:"150+ solutions",icon:"PersonStanding"},{name:"Nutrition",count:"200+ products",icon:"Utensils"},{name:"Home Care",count:"150+ items",icon:"Home"},{name:"Care Boxes",count:"Curated care",icon:PackageCheck}
];
export const products=[
 {id:"bp-monitor",name:"Digital BP Monitor",category:"Health Monitoring",price:1499,mrp:1999,rating:5,icon:"HeartPulse"},
 {id:"adult-diapers",name:"Adult Diapers",category:"Personal Care",price:799,mrp:999,rating:5,icon:"Bath"},
 {id:"walking-stick",name:"Walking Stick",category:"Mobility Aids",price:699,mrp:899,rating:4,icon:"PersonStanding"},
 {id:"bath-mat",name:"Anti-slip Bath Mat",category:"Comfort & Safety",price:499,mrp:699,rating:5,icon:"Home"},
 {id:"nutrition-pack",name:"Nutrition & Wellness Pack",category:"Nutrition",price:999,mrp:1299,rating:5,icon:"Utensils"},
 {id:"home-care",name:"Home Care Kit",category:"Home Care",price:1299,mrp:1699,rating:4,icon:"Home"},
 {id:"comfort-blanket",name:"Comfort Blanket",category:"Comfort & Sleep",price:899,mrp:1199,rating:5,icon:"BedDouble"},
 {id:"thermometer",name:"Digital Thermometer",category:"Health Monitoring",price:299,mrp:399,rating:4,icon:"Activity"}
];
export const careBoxes=[
 {id:"monthly",name:"Monthly Care Box",description:"Nutrition, health and daily essentials.",price:1999},
 {id:"diabetes",name:"Diabetes Care Box",description:"Healthy foods and diabetes-friendly products.",price:2499},
 {id:"heart",name:"Heart Wellness Box",description:"Heart-conscious essentials for everyday wellness.",price:2999},
 {id:"wellness",name:"Wellness Care Box",description:"Comfort, personal care and wellness products.",price:1799}
];
