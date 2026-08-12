"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PageShell from "@/components/PageShell";
import { getLocalOrders, updateOrderStatus, Order } from "@/lib/db";
import { products as initialProducts, Product } from "@/data/products";
import {
  BadgeIndianRupee,
  CheckCircle2,
  Clock,
  Eye,
  Filter,
  LogOut,
  PackageCheck,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  ShoppingBag,
  Truck,
  UserCheck,
  X
} from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<"orders" | "products">("orders");
  const [orders, setOrders] = useState<Order[]>([]);
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  // Selected Order Modal
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusNote, setStatusNote] = useState("");

  // New Product Modal
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    category: "groceries",
    categoryLabel: "Groceries",
    price: 499,
    mrp: 699,
    rating: 4.8,
    reviewsCount: 12,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
    description: "",
    specifications: ["High Quality", "Trusted Sourcing"],
    inStock: true,
    unit: "1 Unit"
  });

  // Verify authentication on load
  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = sessionStorage.getItem("carebridge_admin_session");
      if (auth !== "authenticated_true") {
        router.push("/admin/login");
        return;
      }
      setIsAuthenticated(true);
      setOrders(getLocalOrders());
      setProductsList(initialProducts);
    }
  }, [router]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("carebridge_admin_session");
    }
    router.push("/admin/login");
  };

  const handleStatusChange = (orderId: string, newStatus: Order["status"]) => {
    const updated = updateOrderStatus(orderId, newStatus, statusNote || `Status updated by Admin to ${newStatus}`);
    if (updated) {
      setOrders(getLocalOrders());
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...updated });
      }
      setStatusNote("");
    }
  };

  const handleToggleProductStock = (id: string) => {
    setProductsList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, inStock: !p.inStock } : p))
    );
  };

  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;

    const createdProduct: Product = {
      id: `p-${Date.now()}`,
      name: newProduct.name,
      category: (newProduct.category as any) || "groceries",
      categoryLabel: newProduct.categoryLabel || "General",
      price: Number(newProduct.price),
      mrp: Number(newProduct.mrp || newProduct.price),
      rating: 4.9,
      reviewsCount: 1,
      image: newProduct.image || "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
      description: newProduct.description || "Product item added via Admin dashboard.",
      specifications: newProduct.specifications || ["Wholesale Quality"],
      inStock: true,
      unit: newProduct.unit || "1 Unit"
    };

    setProductsList((prev) => [createdProduct, ...prev]);
    setShowAddProductModal(false);
    setNewProduct({
      name: "",
      category: "groceries",
      categoryLabel: "Groceries",
      price: 499,
      mrp: 699,
      rating: 4.8,
      reviewsCount: 12,
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
      description: "",
      specifications: ["High Quality", "Trusted Sourcing"],
      inStock: true,
      unit: "1 Unit"
    });
  };

  if (!isAuthenticated) {
    return <div className="p-12 text-center text-gray-500">Checking admin authentication...</div>;
  }

  // Calculate Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrdersCount = orders.length;
  const pendingOrdersCount = orders.filter((o) => o.status === "Pending" || o.status === "Processing").length;
  const activeProductsCount = productsList.length;

  const filteredOrders = orders.filter((o) => {
    const matchesStatus = statusFilter === "All" || o.status === statusFilter;
    const matchesQuery =
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer.phone.includes(searchQuery);
    return matchesStatus && matchesQuery;
  });

  return (
    <PageShell>
      <div className="bg-[#faf9f6] py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          {/* Top Admin Navigation Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-[#0b4938] px-3 py-0.5 text-xs font-bold text-[#f4c542]">
                  CareBridge Admin
                </span>
                <span className="text-xs text-gray-500">Fulfillment & Order Control Desk</span>
              </div>
              <h1 className="text-3xl font-extrabold text-[#173f35] mt-1">Admin Dashboard</h1>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setOrders(getLocalOrders())}
                className="inline-flex items-center gap-1.5 rounded-xl border border-gray-300 bg-white px-3.5 py-2 text-xs font-bold text-[#173f35] hover:bg-gray-50"
              >
                <RefreshCw size={14} /> Refresh Data
              </button>

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white hover:bg-red-700 shadow-sm"
              >
                <LogOut size={14} /> Logout
              </button>
            </div>
          </div>

          {/* Overview Metrics Cards */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-10">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Total Revenue</span>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
                  <BadgeIndianRupee size={20} />
                </div>
              </div>
              <p className="mt-3 text-2xl font-black text-[#173f35]">
                ₹{totalRevenue.toLocaleString("en-IN")}
              </p>
              <span className="text-[11px] text-gray-400">Total sales recorded</span>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Total Orders</span>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-800">
                  <ShoppingBag size={20} />
                </div>
              </div>
              <p className="mt-3 text-2xl font-black text-[#173f35]">{totalOrdersCount}</p>
              <span className="text-[11px] text-gray-400">Processed orders count</span>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Pending Fulfillment</span>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
                  <Clock size={20} />
                </div>
              </div>
              <p className="mt-3 text-2xl font-black text-amber-700">{pendingOrdersCount}</p>
              <span className="text-[11px] text-gray-400">Awaiting shipment / delivery</span>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Catalog Products</span>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-800">
                  <PackageCheck size={20} />
                </div>
              </div>
              <p className="mt-3 text-2xl font-black text-[#173f35]">{activeProductsCount}</p>
              <span className="text-[11px] text-gray-400">Active store inventory</span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-gray-200 mb-8">
            <button
              onClick={() => setActiveTab("orders")}
              className={`pb-3 px-6 text-sm font-bold border-b-2 transition-all ${
                activeTab === "orders"
                  ? "border-[#0b4938] text-[#0b4938]"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              Order Management ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab("products")}
              className={`pb-3 px-6 text-sm font-bold border-b-2 transition-all ${
                activeTab === "products"
                  ? "border-[#0b4938] text-[#0b4938]"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              Product Inventory ({productsList.length})
            </button>
          </div>

          {/* TAB 1: ORDERS MANAGEMENT */}
          {activeTab === "orders" && (
            <div className="space-y-6">
              {/* Filters & Search */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                <div className="flex flex-wrap gap-2">
                  {["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"].map((status) => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                        statusFilter === status
                          ? "bg-[#0b4938] text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>

                <div className="relative max-w-xs">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by order ID or name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 pl-9 pr-4 py-1.5 text-xs focus:outline-none focus:border-[#0b4938]"
                  />
                </div>
              </div>

              {/* Orders Table */}
              <div className="overflow-x-auto rounded-3xl border border-gray-200 bg-white shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#faf9f6] text-[#173f35] uppercase font-bold text-[11px] border-b border-gray-200">
                    <tr>
                      <th className="px-5 py-4">Order ID & Date</th>
                      <th className="px-5 py-4">Customer</th>
                      <th className="px-5 py-4">Items Count</th>
                      <th className="px-5 py-4">Payment</th>
                      <th className="px-5 py-4">Total</th>
                      <th className="px-5 py-4">Order Status</th>
                      <th className="px-5 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-700">
                    {filteredOrders.length > 0 ? (
                      filteredOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-[#faf9f6]">
                          <td className="px-5 py-4 font-bold text-[#173f35]">
                            <div>{order.id}</div>
                            <span className="text-[10px] text-gray-400 font-normal">
                              {new Date(order.date).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <div className="font-bold text-gray-800">{order.customer.fullName}</div>
                            <div className="text-[10px] text-gray-500">{order.customer.phone}</div>
                          </td>
                          <td className="px-5 py-4 font-medium">
                            {order.items.reduce((s, i) => s + i.qty, 0)} items
                          </td>
                          <td className="px-5 py-4">
                            <span className="font-bold uppercase text-[10px]">
                              {order.paymentMethod}
                            </span>
                            <div className={`text-[10px] ${order.paymentStatus === "Paid" ? "text-emerald-700 font-bold" : "text-amber-700"}`}>
                              {order.paymentStatus}
                            </div>
                          </td>
                          <td className="px-5 py-4 font-black text-[#0b4938] text-sm">
                            ₹{order.total.toLocaleString("en-IN")}
                          </td>
                          <td className="px-5 py-4">
                            <select
                              value={order.status}
                              onChange={(e) => handleStatusChange(order.id, e.target.value as Order["status"])}
                              className="rounded-lg border border-gray-300 bg-white px-2.5 py-1 text-xs font-bold text-[#173f35] focus:outline-none focus:border-[#0b4938]"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="px-5 py-4 text-right">
                            <button
                              onClick={() => setSelectedOrder(order)}
                              className="inline-flex items-center gap-1 rounded-lg bg-[#0b4938] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#125c48]"
                            >
                              <Eye size={14} /> Details
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="px-5 py-8 text-center text-gray-500">
                          No orders found matching criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCTS INVENTORY */}
          {activeTab === "products" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                <div>
                  <h3 className="text-base font-bold text-[#173f35]">Product Catalog & Stock Controls</h3>
                  <p className="text-xs text-gray-500">Manage pricing, availability, and add new products to the storefront.</p>
                </div>
                <button
                  onClick={() => setShowAddProductModal(true)}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#0b4938] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#125c48] shadow-md"
                >
                  <Plus size={16} /> Add New Product
                </button>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {productsList.map((product) => (
                  <div key={product.id} className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm space-y-3">
                    <div className="flex items-center gap-3">
                      <img src={product.image} alt={product.name} className="h-16 w-16 rounded-xl object-cover bg-gray-50 shrink-0" />
                      <div className="truncate">
                        <span className="text-[10px] font-bold text-[#b68d40] uppercase">{product.categoryLabel}</span>
                        <h4 className="font-bold text-[#173f35] text-sm truncate">{product.name}</h4>
                        <p className="text-xs font-extrabold text-[#0b4938] mt-0.5">₹{product.price}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
                      <span className="text-gray-500">Status:</span>
                      <button
                        onClick={() => handleToggleProductStock(product.id)}
                        className={`rounded-full px-3 py-1 text-[11px] font-bold ${
                          product.inStock ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Modal 1: Order Details Drawer */}
          {selectedOrder && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in">
              <div className="w-full max-w-2xl rounded-3xl bg-white p-6 md:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#b68d40]">Fulfillment Details</span>
                    <h2 className="text-xl font-extrabold text-[#173f35]">{selectedOrder.id}</h2>
                  </div>
                  <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-gray-600">
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-2 gap-4 rounded-2xl bg-[#faf9f6] p-4 border border-gray-200">
                    <div>
                      <p className="font-bold text-[#173f35] text-sm">{selectedOrder.customer.fullName}</p>
                      <p className="text-gray-600 mt-1">{selectedOrder.customer.address}</p>
                      <p className="text-gray-600">{selectedOrder.customer.city}, {selectedOrder.customer.pincode}</p>
                      <p className="text-gray-500 mt-2 font-medium">Phone: {selectedOrder.customer.phone}</p>
                      <p className="text-gray-500 font-medium">Email: {selectedOrder.customer.email}</p>
                    </div>

                    <div>
                      <p className="text-gray-500">Order Date: {new Date(selectedOrder.date).toLocaleString("en-IN")}</p>
                      <p className="text-gray-500 mt-1">Payment Method: <span className="font-bold uppercase text-gray-800">{selectedOrder.paymentMethod}</span></p>
                      <p className="text-gray-500 mt-1">Payment Status: <span className="font-bold text-emerald-700">{selectedOrder.paymentStatus}</span></p>
                      <p className="text-gray-500 mt-1">Tracking ID: <span className="font-mono font-bold text-gray-800">{selectedOrder.trackingNumber}</span></p>
                    </div>
                  </div>

                  {/* Status update note input */}
                  <div className="rounded-2xl bg-amber-50 p-4 border border-amber-200 space-y-2">
                    <label className="font-bold text-amber-900 block">Add Status Update Note (Notified to Customer)</label>
                    <input
                      type="text"
                      placeholder="e.g. Dispatched via Express Courier / Delivery Executive Assigned"
                      value={statusNote}
                      onChange={(e) => setStatusNote(e.target.value)}
                      className="w-full rounded-xl border border-amber-300 bg-white px-3 py-2 text-xs focus:outline-none"
                    />
                    <div className="flex gap-2 pt-1">
                      {["Processing", "Shipped", "Delivered"].map((st) => (
                        <button
                          key={st}
                          onClick={() => handleStatusChange(selectedOrder.id, st as any)}
                          className="rounded-lg bg-[#0b4938] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#125c48]"
                        >
                          Set to {st}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Items list */}
                  <div>
                    <h4 className="font-bold text-[#173f35] mb-2 text-sm">Order Items</h4>
                    <div className="divide-y divide-gray-100 border border-gray-200 rounded-2xl overflow-hidden bg-white">
                      {selectedOrder.items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-3">
                          <div className="flex items-center gap-3">
                            <img src={item.image} alt={item.name} className="h-10 w-10 rounded-lg object-cover bg-gray-50" />
                            <div>
                              <p className="font-bold text-gray-800">{item.name}</p>
                              <p className="text-[11px] text-gray-500">Qty: {item.qty} × ₹{item.price}</p>
                            </div>
                          </div>
                          <span className="font-bold text-gray-900">₹{item.price * item.qty}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Modal 2: Add Product Modal */}
          {showAddProductModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in">
              <div className="w-full max-w-lg rounded-3xl bg-white p-6 md:p-8 shadow-2xl">
                <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4">
                  <h2 className="text-xl font-extrabold text-[#173f35]">Add New Product</h2>
                  <button onClick={() => setShowAddProductModal(false)} className="text-gray-400 hover:text-gray-600">
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleAddProductSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="font-bold text-[#173f35] block mb-1">Product Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Digital Pulse Oximeter"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      className="w-full rounded-xl border border-gray-300 px-3 py-2 text-xs focus:outline-none focus:border-[#0b4938]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-[#173f35] block mb-1">Category *</label>
                      <select
                        value={newProduct.category}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            category: e.target.value as any,
                            categoryLabel: e.target.options[e.target.selectedIndex].text,
                          })
                        }
                        className="w-full rounded-xl border border-gray-300 px-3 py-2 text-xs focus:outline-none focus:border-[#0b4938]"
                      >
                        <option value="groceries">Groceries</option>
                        <option value="medicines">Medicines</option>
                        <option value="medical-equipment">Medical Equipment</option>
                        <option value="rentals">Equipment Rentals</option>
                        <option value="pooja">Pooja Essentials</option>
                        <option value="care-box">Festival Care Boxes</option>
                        <option value="wellness">Health & Wellness</option>
                        <option value="home-care">Home Care</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-[#173f35] block mb-1">Unit Description</label>
                      <input
                        type="text"
                        placeholder="1 Unit / 25 kg Bag"
                        value={newProduct.unit}
                        onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
                        className="w-full rounded-xl border border-gray-300 px-3 py-2 text-xs focus:outline-none focus:border-[#0b4938]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-[#173f35] block mb-1">Selling Price (₹) *</label>
                      <input
                        type="number"
                        required
                        placeholder="1499"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                        className="w-full rounded-xl border border-gray-300 px-3 py-2 text-xs focus:outline-none focus:border-[#0b4938]"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-[#173f35] block mb-1">MRP Price (₹)</label>
                      <input
                        type="number"
                        placeholder="1999"
                        value={newProduct.mrp}
                        onChange={(e) => setNewProduct({ ...newProduct, mrp: Number(e.target.value) })}
                        className="w-full rounded-xl border border-gray-300 px-3 py-2 text-xs focus:outline-none focus:border-[#0b4938]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-[#173f35] block mb-1">Image URL</label>
                    <input
                      type="text"
                      placeholder="https://images.unsplash.com/..."
                      value={newProduct.image}
                      onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                      className="w-full rounded-xl border border-gray-300 px-3 py-2 text-xs focus:outline-none focus:border-[#0b4938]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#173f35] block mb-1">Description</label>
                    <textarea
                      rows={3}
                      placeholder="Product summary and features..."
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      className="w-full rounded-xl border border-gray-300 px-3 py-2 text-xs focus:outline-none focus:border-[#0b4938]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0b4938] py-3 text-sm font-extrabold text-white transition hover:bg-[#125c48] shadow-md"
                  >
                    Save & Publish Product
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
}
