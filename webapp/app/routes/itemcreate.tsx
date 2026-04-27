import { useState } from "react";
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
    itemName: "",
    category: "",
    purchasePrice: "",
    shippingCost: "",
    freeShipping: false,
    listingPrice: "",
    status: "Available",
    datePurchased: "",
    dateListed: "",
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    setFormData((prev) => ({
      ...prev,
      itemImage: file,
    }));

    setErrors((prev) => ({
      ...prev,
      itemImage: "",
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.itemImage) {
      newErrors.itemImage = "Item image is required.";
    }

    if (!formData.itemName.trim()) {
      newErrors.itemName = "Item name is required.";
    }

    if (!formData.category.trim()) {
      newErrors.category = "Category is required.";
    }

    if (!formData.purchasePrice.trim()) {
      newErrors.purchasePrice = "Purchase price is required.";
    } else if (Number(formData.purchasePrice) <= 0) {
      newErrors.purchasePrice = "Purchase price must be greater than 0.";
    }

    if (!formData.status.trim()) {
      newErrors.status = "Status is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMessage("");

    if (!validateForm()) {
      return;
    }

    console.log("Item created:", formData);

    setSuccessMessage("Item created successfully!");

    setFormData({
      itemImage: null,
      itemName: "",
      category: "",
      purchasePrice: "",
      shippingCost: "",
      freeShipping: false,
      listingPrice: "",
      status: "Available",
      datePurchased: "",
      dateListed: "",
      notes: "",
    });
  };

  return (
    <div className="min-h-screen bg-ccwhite">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold mb-8 text-black">Create Item</h1>

        {successMessage && (
          <p className="mb-4 rounded-lg bg-green-100 px-4 py-3 text-green-700">
            {successMessage}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-semibold mb-2">Item Image *</label>
            <input
              type="file"
              name="itemImage"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
            />
            {formData.itemImage && (
              <p className="mt-2 text-sm text-gray-600">
                Selected: {formData.itemImage.name}
              </p>
            )}
            {errors.itemImage && (
              <p className="mt-1 text-sm text-red-600">{errors.itemImage}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold mb-2">Item Name *</label>
            <input
              type="text"
              name="itemName"
              value={formData.itemName}
              onChange={handleInputChange}
              placeholder="Enter item name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
            />
            {errors.itemName && (
              <p className="mt-1 text-sm text-red-600">{errors.itemName}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold mb-2">Category *</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              placeholder="Enter category"
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
            />
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold mb-2">Purchase Price *</label>
            <input
              type="number"
              name="purchasePrice"
              value={formData.purchasePrice}
              onChange={handleInputChange}
              placeholder="Enter purchase price"
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
            />
            {errors.purchasePrice && (
              <p className="mt-1 text-sm text-red-600">
                {errors.purchasePrice}
              </p>
            )}
          </div>

          <div className="flex items-center gap-6">
            <div className="flex-1">
              <label className="block font-semibold mb-2">
                Shipping Cost (Optional)
              </label>
              <input
                type="number"
                name="shippingCost"
                value={formData.shippingCost}
                onChange={handleInputChange}
                placeholder="Enter shipping cost"
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
              />
            </div>

            <label className="flex items-center gap-2 mt-8">
              <input
                type="checkbox"
                name="freeShipping"
                checked={formData.freeShipping}
                onChange={handleInputChange}
              />
              Free Shipping
            </label>
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Listing Price (Optional)
            </label>
            <input
              type="number"
              name="listingPrice"
              value={formData.listingPrice}
              onChange={handleInputChange}
              placeholder="Enter listing price"
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Status *</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
            >
              <option value="Available">Available</option>
              <option value="Sold">Sold</option>
            </select>
            {errors.status && (
              <p className="mt-1 text-sm text-red-600">{errors.status}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Date Purchased (Optional)
            </label>
            <input
              type="date"
              name="datePurchased"
              value={formData.datePurchased}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Date Listed (Optional)
            </label>
            <input
              type="date"
              name="dateListed"
              value={formData.dateListed}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Notes (Optional)</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Enter any notes about the item"
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-ccbrown text-white py-3 px-4 rounded-lg hover:opacity-80 font-semibold"
          >
            Create Item
          </button>
        </form>
      </main>
    </div>
  );
}
