import { useState } from 'react';
import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Create Item" },
    { name: "description", content: "Create a new item" },
  ];
}

export default function CreateItem() {
  const [formData, setFormData] = useState({
    itemImage: null as File | null,
    itemName: '',
    category: '',
    purchasePrice: '',
    shippingCost: '',
    freeShipping: false,
    listingPrice: '',
    status: 'Available',
    datePurchased: '',
    dateListed: '',
    notes: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      itemImage: file,
    }));
  };

  return (
    <div className="bg-white w-full min-h-screen">
      <Navbar />
      <main className="pt-20 pb-8 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-arial-medium text-black mb-8">Create Item</h1>
          
          <form className="space-y-6">
            {/* Item Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Item Image *
              </label>
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ccbrown"
              />
              {formData.itemImage && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected: {formData.itemImage.name}
                </p>
              )}
            </div>

            {/* Item Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Item Name *
              </label>
              <input
                type="text"
                name="itemName"
                value={formData.itemName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ccbrown text-black"
                placeholder="Enter item name"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ccbrown text-black"
                placeholder="Enter category"
              />
            </div>

            {/* Purchase Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Purchase Price *
              </label>
              <input
                type="number"
                name="purchasePrice"
                value={formData.purchasePrice}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ccbrown text-black"
                placeholder="Enter purchase price"
                step="0.01"
              />
            </div>

            {/* Shipping Cost */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shipping Cost (Optional)
              </label>
              <div className="flex gap-4">
                <input
                  type="number"
                  name="shippingCost"
                  value={formData.shippingCost}
                  onChange={handleInputChange}
                  disabled={formData.freeShipping}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ccbrown disabled:bg-gray-100 text-black"
                  placeholder="Enter shipping cost"
                  step="0.01"
                />
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="freeShipping"
                    checked={formData.freeShipping}
                    onChange={handleInputChange}
                    className="w-4 h-4 accent-ccbrown"
                  />
                  <span className="text-sm text-gray-700">Free Shipping</span>
                </label>
              </div>
            </div>

            {/* Listing Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Listing Price (Optional)
              </label>
              <input
                type="number"
                name="listingPrice"
                value={formData.listingPrice}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ccbrown text-black"
                placeholder="Enter listing price"
                step="0.01"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status *
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ccbrown text-black"
              >
                <option value="Available">Available</option>
                <option value="Sold">Sold</option>
              </select>
            </div>

            {/* Date Purchased */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date Purchased (Optional)
              </label>
              <input
                type="date"
                name="datePurchased"
                value={formData.datePurchased}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ccbrown text-black"
              />
            </div>

            {/* Date Listed */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date Listed (Optional)
              </label>
              <input
                type="date"
                name="dateListed"
                value={formData.dateListed}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ccbrown text-black"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes (Optional)
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ccbrown resize-none text-black"
                placeholder="Enter any notes about the item"
                rows={4}
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-ccbrown text-white py-2 px-4 rounded-lg hover:opacity-80 transition-opacity font-arial-medium"
              >
                Create Item
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
