"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

type Product = {
    id: number;
    image: string;
    name: string;
    code: string;
    price: string;
};

interface ProductListProps {
    title: string;
    products: Product[];
}

export default function ProductList({ title, products }: ProductListProps) {
    const searchParams = useSearchParams();
    const category = searchParams.get("category") || "top"; // 現在のカテゴリを取得
    const router = useRouter(); // ページ遷移用

    const handleProductClick = (productId: number) => {
        const url = `/exhibitor/exhibitions/1/application/commodity/${productId}`;
        router.push(url);
    };    

    return (
        <section className="space-y-4">
            {/* 見出し */}
            <h2 className="text-2xl font-bold text-black">{title}</h2>
            <hr className="border-gray-300" />

            {/* 商品一覧 */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="border rounded-lg shadow hover:shadow-lg p-4 cursor-pointer"
                        onClick={() => handleProductClick(product.id)}
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-32 object-cover mb-2"
                        />
                        <h3 className="text-lg font-bold text-black">
                            {product.name}
                        </h3>
                        <p className="text-black text-sm">商品コード: {product.code}</p>
                        <p className="text-black text-sm font-bold">価格: {product.price}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
