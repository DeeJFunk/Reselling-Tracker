import { useEffect, useMemo, useState } from 'react';
import type { Route } from "./+types/home";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Navbar from "~/components/Navbar";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const INVENTORY_ITEMS = [
  { id: 1, name: 'Vintage Denim Jeans', status: 'Available', category: 'Pants', purchasePrice: 42, listingPrice: 95, soldPrice: 0 },
  { id: 2, name: 'Retro Skate Sneakers', status: 'Sold', category: 'Shoes', purchasePrice: 55, listingPrice: 120, soldPrice: 140 },
  { id: 3, name: 'Silk Bomber Jacket', status: 'Available', category: 'Tops', purchasePrice: 38, listingPrice: 88, soldPrice: 0 },
  { id: 4, name: 'Leather Chelsea Boots', status: 'Sold', category: 'Shoes', purchasePrice: 65, listingPrice: 140, soldPrice: 170 },
  { id: 5, name: 'Corduroy Chinos', status: 'Available', category: 'Pants', purchasePrice: 30, listingPrice: 75, soldPrice: 0 },
  { id: 6, name: 'Graphic Tee Bundle', status: 'Sold', category: 'Tops', purchasePrice: 18, listingPrice: 42, soldPrice: 55 },
  { id: 7, name: 'High Waist Shorts', status: 'Available', category: 'Pants', purchasePrice: 24, listingPrice: 60, soldPrice: 0 },
  { id: 8, name: 'Running Trainers', status: 'Available', category: 'Shoes', purchasePrice: 48, listingPrice: 105, soldPrice: 0 },
  { id: 9, name: 'Linen Button Shirt', status: 'Sold', category: 'Tops', purchasePrice: 22, listingPrice: 52, soldPrice: 68 },
  { id: 10, name: 'Relaxed Fit Sweatpants', status: 'Available', category: 'Pants', purchasePrice: 35, listingPrice: 80, soldPrice: 0 },
  { id: 11, name: 'Canvas Slip-Ons', status: 'Sold', category: 'Shoes', purchasePrice: 28, listingPrice: 58, soldPrice: 75 },
  { id: 12, name: 'Oversized Hoodie', status: 'Available', category: 'Tops', purchasePrice: 27, listingPrice: 65, soldPrice: 0 },
];

type Item = (typeof INVENTORY_ITEMS)[number];

type EditForm = {
  name: string;
  purchasePrice: string;
  listingPrice: string;
  soldPrice: string;
  status: Item['status'];
};

export default function Home() {
  const [items, setItems] = useState<Item[]>(INVENTORY_ITEMS);
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilters, setCategoryFilters] = useState({
    Pants: false,
    Shoes: false,
    Tops: false,
  });
  const [priceRange, setPriceRange] = useState({
    min: '',
    max: '',
  });
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [editForm, setEditForm] = useState<EditForm>({
    name: '',
    purchasePrice: '',
    listingPrice: '',
    soldPrice: '',
    status: 'Available',
  });
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const totalSales = useMemo(
    () => items.filter(item => item.status === 'Sold').reduce((sum, item) => sum + item.soldPrice, 0),
    [items]
  );

  const estimatedProfit = useMemo(
    () => items.filter(item => item.status === 'Sold').reduce((sum, item) => sum + (item.soldPrice - item.purchasePrice), 0),
    [items]
  );

  const inventoryValue = useMemo(
    () => items.filter(item => item.status === 'Available').reduce((sum, item) => sum + item.listingPrice, 0),
    [items]
  );

  const itemsSold = useMemo(
    () => items.filter(item => item.status === 'Sold').length,
    [items]
  );

  const categoryChartData = useMemo(() => {
    const categories = ['Pants', 'Shoes', 'Tops'];
    return categories.map(category => ({
      category,
      value: items.filter(item => item.status === 'Sold' && item.category === category).reduce((sum, item) => sum + item.soldPrice, 0),
    }));
  }, [items]);

  const handleCategoryChange = (category: string) => {
    setCategoryFilters(prev => ({
      ...prev,
      [category]: !prev[category as keyof typeof prev],
    }));
  };

  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    setPriceRange(prev => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleOpenEdit = (item: Item) => {
    setSelectedItem(item);
    setEditForm({
      name: item.name,
      purchasePrice: String(item.purchasePrice),
      listingPrice: String(item.listingPrice),
      soldPrice: item.status === 'Sold' ? String(item.soldPrice) : '',
      status: item.status,
    });
  };

  const handleEditChange = (field: keyof EditForm, value: string) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCancel = () => {
    setSelectedItem(null);
  };

  const handleSave = () => {
    if (!selectedItem) return;
    const updatedItem = {
      ...selectedItem,
      name: editForm.name || selectedItem.name,
      purchasePrice: Number(editForm.purchasePrice) || selectedItem.purchasePrice,
      listingPrice: Number(editForm.listingPrice) || selectedItem.listingPrice,
      soldPrice: editForm.status === 'Sold' ? Number(editForm.soldPrice) || selectedItem.soldPrice : 0,
      status: editForm.status,
    };
    setItems(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
    setSelectedItem(null);
  };

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      if (statusFilter !== 'All' && item.status !== statusFilter) {
        return false;
      }
      const hasActiveCategoryFilter = Object.values(categoryFilters).some(v => v);
      if (hasActiveCategoryFilter && !categoryFilters[item.category as keyof typeof categoryFilters]) {
        return false;
      }
      if (priceRange.min && item.listingPrice < parseFloat(priceRange.min)) {
        return false;
      }
      if (priceRange.max && item.listingPrice > parseFloat(priceRange.max)) {
        return false;
      }
      return true;
    });
  }, [items, statusFilter, categoryFilters, priceRange]);

  return (
    <div className="bg-gray-500 w-full min-h-screen flex flex-col pt-20">
      <Navbar />

      {/* TOP DASHBOARD STATS */}
      <div className="bg-gray-500 border-b border-gray-200 p-6">
        <div className="mx-auto flex flex-col gap-6 px-4 py-6 lg:max-w-7xl lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <p className="text-sm uppercase tracking-[0.18em] text-gray-500">Total Sales</p>
              <p className="mt-4 text-3xl font-semibold text-gray-900">${totalSales.toLocaleString()}</p>
            </div>
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <p className="text-sm uppercase tracking-[0.18em] text-gray-500">Estimated Profit</p>
              <p className="mt-4 text-3xl font-semibold text-gray-900">${estimatedProfit.toLocaleString()}</p>
            </div>
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <p className="text-sm uppercase tracking-[0.18em] text-gray-500">Inventory Value</p>
              <p className="mt-4 text-3xl font-semibold text-gray-900">${inventoryValue.toLocaleString()}</p>
            </div>
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <p className="text-sm uppercase tracking-[0.18em] text-gray-500">Items Sold</p>
              <p className="mt-4 text-3xl font-semibold text-gray-900">{itemsSold}</p>
            </div>
          </div>
          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-base font-semibold text-gray-900">Revenue by Category</p>
            </div>
            <div className="h-64">
              {hasMounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="category" tick={{ fill: '#4b5563', fontSize: 12 }} />
                    <YAxis tick={{ fill: '#4b5563', fontSize: 12 }} />
                    <Tooltip formatter={(value) => `$${value ?? 0}`} />
                    <Bar dataKey="value" fill="#7c3aed" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-gray-500">Loading chart</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-1">
        {/* LEFT SIDEBAR - FILTERS */}
        <aside className="w-64 border-r border-gray-300 bg-gray-50 p-6 overflow-y-auto">
          <h2 className="text-xl font-arial-medium text-black mb-6">Filters</h2>

          {/* Status Filter */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-800 mb-3">Status</h3>
            <div className="space-y-2">
              {['All', 'Available', 'Sold'].map(status => (
                <label key={status} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value={status}
                    checked={statusFilter === status}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-4 h-4 accent-ccbrown"
                  />
                  <span className="text-sm text-gray-700">{status}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-800 mb-3">Category</h3>
            <div className="space-y-2">
              {['Pants', 'Shoes', 'Tops'].map(category => (
                <label key={category} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={categoryFilters[category as keyof typeof categoryFilters]}
                    onChange={() => handleCategoryChange(category)}
                    className="w-4 h-4 accent-ccbrown"
                  />
                  <span className="text-sm text-gray-700">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div>
            <h3 className="text-sm font-medium text-gray-800 mb-3">Listed Price</h3>
            <div className="space-y-2">
              <input
                type="number"
                value={priceRange.min}
                onChange={(e) => handlePriceChange('min', e.target.value)}
                placeholder="Min Price"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ccbrown text-black"
              />
              <input
                type="number"
                value={priceRange.max}
                onChange={(e) => handlePriceChange('max', e.target.value)}
                placeholder="Max Price"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ccbrown text-black"
              />
            </div>
          </div>
        </aside>

        {/* RIGHT SIDE - INVENTORY GRID */}
        <main className="flex-1 p-8 overflow-y-auto bg-gray-700">
          <div className="mb-4">
            <p className="text-white text-sm">
              Showing {filteredItems.length} of {items.length} items
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {filteredItems.map(item => (
            // <Link key={item.id} to={`/product/${item.id}`} className="w-full" onClick={(e) => e.stopPropagation()}>
              <div
                key={item.id}
                className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors"
                onClick={() => handleOpenEdit(item)}
              >
                <div className="text-center">
                  <p className="text-gray-800 font-medium">{item.name}</p>
                  <p className="text-gray-600 text-sm">${item.listingPrice}</p>
                  <p className="text-gray-500 text-xs mt-1">{item.status}</p>
                </div>
              </div>
            // </Link>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-500 text-lg">No items match your filters</p>
            </div>
          )}
        </main>
      </div>
      {selectedItem ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
            <h2 className="text-2xl font-arial-medium text-black mb-4">Edit Item</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Item Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => handleEditChange('name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-ccbrown text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Purchase Price</label>
                <input
                  type="number"
                  value={editForm.purchasePrice}
                  onChange={(e) => handleEditChange('purchasePrice', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-ccbrown text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Listing Price</label>
                <input
                  type="number"
                  value={editForm.listingPrice}
                  onChange={(e) => handleEditChange('listingPrice', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-ccbrown text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sold Price</label>
                <input
                  type="number"
                  value={editForm.soldPrice}
                  onChange={(e) => handleEditChange('soldPrice', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-ccbrown text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={editForm.status}
                  onChange={(e) => handleEditChange('status', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-ccbrown text-black"
                >
                  <option value="Available">Available</option>
                  <option value="Sold">Sold</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={handleCancel}
                className="rounded-full border border-gray-300 px-5 py-3 text-sm text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="rounded-full bg-ccbrown px-5 py-3 text-sm text-white hover:opacity-90"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
