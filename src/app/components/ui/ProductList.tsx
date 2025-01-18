"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";

type Product = {
    id: number;
    name: string;
    code: string;
    price: string;
    image_url: string; // 修正: image -> image_url
};

interface ProductListProps {
    title: string;
    products: Product[];
    category: string;
}

export default function ProductList({ title, products, category }: ProductListProps) {
    const router = useRouter();
    const { id } = useParams(); // 動的な展示会IDを取得

    const handleProductClick = (commodityId: number) => {
        const url = `/exhibitor/exhibitions/${id}/application/commodity/${commodityId}?category=${category}`;
        router.push(url);
    };

    return (
        <section className="space-y-4">
            <h2 className="text-2xl font-bold text-black">{title}</h2>
            <hr className="border-gray-300" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="border rounded-lg shadow hover:shadow-lg p-4 cursor-pointer"
                        onClick={() => handleProductClick(product.id)}
                    >
                        <img
                            src={product.image_url} // 修正: product.image -> product.image_url
                            alt={product.name}
                            className="w-full h-32 object-cover mb-2"
                        />
                        <h3 className="text-lg font-bold text-black">{product.name}</h3>
                        <p className="text-black text-sm">商品コード: {product.code}</p>
                        <p className="text-black text-sm font-bold">価格: {product.price}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
