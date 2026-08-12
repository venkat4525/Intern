import { Product, products } from "@/data/products";

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  image?: string;
  unit?: string;
}

export interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  notes?: string;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  customer: CustomerDetails;
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  paymentMethod: "razorpay" | "cod";
  paymentStatus: "Pending" | "Paid" | "Failed";
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  trackingNumber?: string;
  statusHistory: { status: string; timestamp: string; note: string }[];
}

// Initial mock orders for demonstration
const initialOrders: Order[] = [
  {
    id: "CB-908231",
    date: new Date(Date.now() - 86400000 * 2).toISOString(),
    items: [
      {
        id: "bp-monitor-digital",
        name: "Omron Automatic Digital BP Monitor",
        price: 1849,
        qty: 1,
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80",
        unit: "1 Unit"
      },
      {
        id: "pooja-camphor-pure-bhimseni",
        name: "Pure Bhimseni Camphor for Daily Pooja (250g)",
        price: 299,
        qty: 2,
        image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=600&q=80",
        unit: "250g Jar"
      }
    ],
    customer: {
      fullName: "Raghavendra Rao",
      email: "raghav.rao@example.com",
      phone: "+91 98450 12345",
      address: "42, 4th Main, Malleshwaram",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560003"
    },
    subtotal: 2447,
    tax: 122,
    shipping: 0,
    discount: 0,
    total: 2569,
    paymentMethod: "razorpay",
    paymentStatus: "Paid",
    razorpayPaymentId: "pay_Rzp908231Live",
    status: "Shipped",
    trackingNumber: "TRK-BLR-908231",
    statusHistory: [
      { status: "Pending", timestamp: new Date(Date.now() - 86400000 * 2).toISOString(), note: "Order placed successfully" },
      { status: "Processing", timestamp: new Date(Date.now() - 86400000 * 1.5).toISOString(), note: "Order verified & dispatched to warehouse" },
      { status: "Shipped", timestamp: new Date(Date.now() - 86400000 * 0.5).toISOString(), note: "In transit with courier delivery partner" }
    ]
  },
  {
    id: "CB-908232",
    date: new Date(Date.now() - 86400000 * 5).toISOString(),
    items: [
      {
        id: "sona-masoori-rice-25kg",
        name: "Royal Sona Masoori Raw Rice (25 kg Bag)",
        price: 1399,
        qty: 1,
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
        unit: "25 kg Bag"
      }
    ],
    customer: {
      fullName: "Ananya Sharma",
      email: "ananya.s@example.com",
      phone: "+91 99001 88776",
      address: "108, Indiranagar 100ft Road",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560038"
    },
    subtotal: 1399,
    tax: 70,
    shipping: 0,
    discount: 100,
    total: 1369,
    paymentMethod: "cod",
    paymentStatus: "Paid",
    status: "Delivered",
    trackingNumber: "TRK-BLR-908232",
    statusHistory: [
      { status: "Pending", timestamp: new Date(Date.now() - 86400000 * 5).toISOString(), note: "Order received" },
      { status: "Processing", timestamp: new Date(Date.now() - 86400000 * 4).toISOString(), note: "Packed" },
      { status: "Shipped", timestamp: new Date(Date.now() - 86400000 * 3).toISOString(), note: "Out for delivery" },
      { status: "Delivered", timestamp: new Date(Date.now() - 86400000 * 2).toISOString(), note: "Delivered and payment collected" }
    ]
  }
];

const STORAGE_KEY_ORDERS = "carebridge_orders_store";

export function getLocalOrders(): Order[] {
  if (typeof window === "undefined") return initialOrders;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ORDERS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(initialOrders));
      return initialOrders;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error("Error reading orders from localStorage", e);
    return initialOrders;
  }
}

export function saveLocalOrders(orders: Order[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
  } catch (e) {
    console.error("Error saving orders to localStorage", e);
  }
}

export function createOrder(
  items: OrderItem[],
  customer: CustomerDetails,
  paymentMethod: "razorpay" | "cod",
  subtotal: number,
  discount: number = 0,
  razorpayDetails?: { orderId?: string; paymentId?: string }
): Order {
  const tax = Math.round(subtotal * 0.05); // 5% estimated tax
  const shipping = subtotal >= 999 ? 0 : 99;
  const total = Math.max(0, subtotal + tax + shipping - discount);

  const orderId = `CB-${Math.floor(100000 + Math.random() * 900000)}`;

  const newOrder: Order = {
    id: orderId,
    date: new Date().toISOString(),
    items,
    customer,
    subtotal,
    tax,
    shipping,
    discount,
    total,
    paymentMethod,
    paymentStatus: paymentMethod === "razorpay" ? "Paid" : "Pending",
    razorpayOrderId: razorpayDetails?.orderId,
    razorpayPaymentId: razorpayDetails?.paymentId || (paymentMethod === "razorpay" ? `pay_${Date.now()}` : undefined),
    status: "Pending",
    trackingNumber: `TRK-BLR-${Math.floor(100000 + Math.random() * 900000)}`,
    statusHistory: [
      {
        status: "Pending",
        timestamp: new Date().toISOString(),
        note: "Order placed successfully. Awaiting fulfillment processing."
      }
    ]
  };

  const currentOrders = getLocalOrders();
  const updated = [newOrder, ...currentOrders];
  saveLocalOrders(updated);

  return newOrder;
}

export function getOrderById(id: string): Order | undefined {
  const orders = getLocalOrders();
  return orders.find((o) => o.id.toLowerCase() === id.toLowerCase().trim());
}

export function updateOrderStatus(
  orderId: string,
  newStatus: Order["status"],
  note: string = ""
): Order | undefined {
  const orders = getLocalOrders();
  const idx = orders.findIndex((o) => o.id.toLowerCase() === orderId.toLowerCase());
  if (idx === -1) return undefined;

  const target = orders[idx];
  target.status = newStatus;
  if (newStatus === "Delivered" && target.paymentMethod === "cod") {
    target.paymentStatus = "Paid";
  }

  target.statusHistory.push({
    status: newStatus,
    timestamp: new Date().toISOString(),
    note: note || `Status updated to ${newStatus}`
  });

  orders[idx] = { ...target };
  saveLocalOrders(orders);
  return target;
}
