export type ItemStatus = "Available" | "Sold";

export type InventoryItem = {
  id: string;
  itemName: string;
  category: string;
  purchasePrice: number;
  shippingCost: number;
  freeShipping: boolean;
  listingPrice: number;
  status: ItemStatus;
  datePurchased: string;
  dateListed: string;
  notes: string;
  imageData: string;
  createdAt: string;
};

const STORAGE_KEY = "reselling-tracker-items";

export function getItems(): InventoryItem[] {
  if (typeof window === "undefined") return [];

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    return JSON.parse(raw) as InventoryItem[];
  } catch {
    return [];
  }
}

export function saveItems(items: InventoryItem[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function getItemById(id: string) {
  return getItems().find((item) => item.id === id) ?? null;
}

export function createItem(
  item: Omit<InventoryItem, "id" | "createdAt">
): InventoryItem {
  const newItem: InventoryItem = {
    ...item,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  const items = getItems();
  saveItems([newItem, ...items]);
  return newItem;
}

export function updateItem(updatedItem: InventoryItem) {
  const items = getItems().map((item) =>
    item.id === updatedItem.id ? updatedItem : item
  );
  saveItems(items);
}

export function deleteItem(id: string) {
  const items = getItems().filter((item) => item.id !== id);
  saveItems(items);
}

export function calculateProfit(item: InventoryItem) {
  return item.listingPrice - item.purchasePrice - item.shippingCost;
}
