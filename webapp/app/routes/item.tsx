import React from 'react'
import { useLoaderData } from "react-router";
import type { Route } from "./+types/item";

interface Product {
    product_id: number;
    product_name: string;
    product_desc: string;
    product_category: string;
    sale_prices: any;
    available: boolean;
    date_purchased: string | null;
    date_sold: string | null;
}

export async function loader({ params }: Route.LoaderArgs) {
    try {
        console.log("Loading product with ID:", params.id);
        const response = await fetch(`http://127.0.0.1:8080/product/${params.id}`);
        
        if (!response.ok) {
            throw new Error(`Failed to load product: ${response.statusText}`);
        }
        
        const product = await response.json();
        console.log("Product data loaded:", product);
        return { product };
    } catch (error) {
        console.error("Error loading product:", error);
        throw error;
    }
}

export function meta({ data }: Route.MetaArgs) {
    return [
        { title: data?.product?.product_name || "Product Details" },
        { name: "description", content: "View product details" },
    ];
}

export default function Item() {
    const { product } = useLoaderData<typeof loader>() as { product: Product };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-3xl font-bold mb-6">{product.product_name}</h1>
                
                <div className="space-y-4">
                    <div>
                        <h2 className="text-sm font-semibold text-gray-600 uppercase mb-1">Description</h2>
                        <p className="text-gray-800">{product.product_desc}</p>
                    </div>
                    
                    <div>
                        <h2 className="text-sm font-semibold text-gray-600 uppercase mb-1">Category</h2>
                        <p className="text-gray-800">{product.product_category}</p>
                    </div>
                    
                    <div>
                        <h2 className="text-sm font-semibold text-gray-600 uppercase mb-1">Availability</h2>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                            product.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                            {product.available ? 'Available' : 'Sold'}
                        </span>
                    </div>
                    
                    {product.date_purchased && (
                        <div>
                            <h2 className="text-sm font-semibold text-gray-600 uppercase mb-1">Date Purchased</h2>
                            <p className="text-gray-800">{new Date(product.date_purchased).toLocaleDateString()}</p>
                        </div>
                    )}
                    
                    {product.date_sold && (
                        <div>
                            <h2 className="text-sm font-semibold text-gray-600 uppercase mb-1">Date Sold</h2>
                            <p className="text-gray-800">{new Date(product.date_sold).toLocaleDateString()}</p>
                        </div>
                    )}
                    
                    {product.sale_prices && (
                        <div>
                            <h2 className="text-sm font-semibold text-gray-600 uppercase mb-1">Sale Prices</h2>
                            <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
                                {JSON.stringify(product.sale_prices, null, 2)}
                            </pre>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
