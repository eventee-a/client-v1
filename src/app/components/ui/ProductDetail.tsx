"use client";

import React, { useState } from "react";

type Product = {
    id: number;
    name: string;
    code: string;
    price: string;
    images: string[];
    description: string;
    company: string;
};

interface ProductDetailsProps {
    product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
    const [selectedImage, setSelectedImage] = useState(product.images[0]);
    const [quantity, setQuantity] = useState(1); // 個数を管理する状態

    // 個数を増やす関数
    const incrementQuantity = () => {
        setQuantity((prev) => prev + 1);
    };

    // 個数を減らす関数 (0以下にはならない)
    const decrementQuantity = () => {
        setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
    };

    return (
        <section className="space-y-8">
            {/* 見出し */}
            <h2 className="text-2xl font-bold text-black">{product.name}</h2>
            <hr className="border-gray-300" />

            {/* 商品概要 */}
            <div className="flex flex-col lg:flex-row space-x-8">
                {/* 商品画像 */}
                <div className="flex flex-col items-center space-y-4">
                    <img
                        src={selectedImage}
                        alt={product.name}
                        className="w-80 h-80 object-cover border rounded-lg shadow"
                    />
                    {/* サムネイル */}
                    <div className="flex space-x-2">
                        {product.images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`サムネイル${index}`}
                                onClick={() => setSelectedImage(image)}
                                className={`w-20 h-20 cursor-pointer border ${
                                    image === selectedImage ? "border-blue-500" : "border-gray-300"
                                } rounded-lg`}
                            />
                        ))}
                    </div>
                </div>

                {/* 商品情報 */}
                <div className="space-y-4">
                    <p className="text-lg text-black">
                        <strong>申請先会社:</strong> {product.company}
                    </p>
                    <p className="text-lg text-black">
                        <strong>商品コード:</strong> {product.code}
                    </p>
                    <p className="text-lg text-black">
                        <strong>料金:</strong> {product.price}
                    </p>
                    {/* カートボタン */}
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={incrementQuantity}
                            className="w-10 h-10 bg-black text-white font-bold rounded"
                        >
                            ＋
                        </button>
                        {/* 個数表示 */}
                        <span className="text-lg font-bold text-black">{quantity}</span>
                        <button
                            onClick={decrementQuantity}
                            className="w-10 h-10 bg-black text-white font-bold rounded"
                        >
                            －
                        </button>
                        <button className="px-6 py-2 bg-gray-300 text-black font-bold rounded hover:bg-gray-400">
                            カートに追加
                        </button>
                    </div>
                </div>
            </div>

            {/* 商品説明 */}
            <div className="p-4 border rounded-lg bg-gray-50">
                <h3 className="text-lg font-bold text-black mb-2">説明</h3>
                <p className="text-black whitespace-pre-line">{product.description}</p>
            </div>
        </section>
    );
}
