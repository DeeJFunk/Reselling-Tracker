import { useState } from 'react';
import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

// Mock inventory items
const INVENTORY_ITEMS = Array.from({ length: 18 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
  status: i % 3 === 0 ? 'Sold' : 'Available',
  category: ['Pants', 'Shoes', 'Tops'][i % 3],
  price: Math.floor(Math.random() * 500) + 10,
}));

export default function Home() {
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

  // Filter items based on active filters
  const filteredItems = INVENTORY_ITEMS.filter(item => {
    // Status filter
    if (statusFilter !== 'All' && item.status !== statusFilter) {
      return false;
    }

    // Category filter
    const hasActiveCategoryFilter = Object.values(categoryFilters).some(v => v);
    if (hasActiveCategoryFilter && !categoryFilters[item.category as keyof typeof categoryFilters]) {
      return false;
    }

    // Price filter
    if (priceRange.min && item.price < parseFloat(priceRange.min)) {
      return false;
    }
    if (priceRange.max && item.price > parseFloat(priceRange.max)) {
      return false;
    }

    return true;
  });

  return (
    <div className="bg-white w-full min-h-screen flex flex-col">
      <Navbar />
      {/* Blank dashboard area at top */}
      <div 
        className="h-80 bg-[#9D5FC2] border-b border-gray-200 p-6 flex items-center justify-center">
        <h2 className="text-2xl font-arial-medium text-black">
          Future financial dashboard area
        </h2>
      </div>
      
      {/* Inventory section with filters */}
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
        <main className="flex-1 p-8 overflow-y-auto bg-[#3F3047]">
          <div className="mb-4">
            <p className="text-white text-sm">
              Showing {filteredItems.length} of {INVENTORY_ITEMS.length} items
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <div
                key={item.id}
                className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors"
              >
                <div className="text-center">
                  <p className="text-gray-800 font-xl">{item.name}</p>
                  <p className="text-gray-600 text-medium font-bold">${item.price}</p>
                  <p
                    className={`text-xs mt-1 font-semibold ${
                      item.status === "Sold"
                        ? "text-green-600"
                        : item.status === "Available"
                        ? "text-red-600"
                        : "text-gray-500"
                    }`}
                  >
                    {item.status}
                  </p>
                  <p className="text-gray-700 text-[10px] mt-3">({item.category})</p>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-500 text-lg">No items match your filters</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
