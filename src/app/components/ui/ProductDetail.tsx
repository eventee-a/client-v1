"use client";

import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useParams } from "next/navigation";
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
    const { id: exhibitionId } = useParams();
    const { token } = useAuth(); // AuthContext から token を取得

    // 個数を増やす関数
    const incrementQuantity = () => {
        setQuantity((prev) => prev + 1);
    };

    // 個数を減らす関数 (1以下にはならない)
    const decrementQuantity = () => {
        setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
    };

    // カートに追加する関数
    const addToCart = async () => {
        try {
            if (!token) {
                alert("ログインが必要です。");
                return;
            }

            const response = await axios.post(
                `http://localhost:3100/api/exhibitor/exhibitions/${exhibitionId}/cart`,
                {
                    product_id: product.id,
                    quantity: quantity,
                    price: parseFloat(product.price.replace(/[^0-9.-]+/g, "")), // 数字のみ抽出
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`, // トークンをヘッダーに追加
                    },
                }
            );

            if (response.status === 200) {
                alert("カートに商品を追加しました。");
            }
        } catch (error) {
            console.error("カートへの追加中にエラーが発生しました:", error);
            alert("カートへの追加中にエラーが発生しました。");
        }
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
                                className={`w-20 h-20 cursor-pointer border ${image === selectedImage ? "border-blue-500" : "border-gray-300"
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
                        <button
                            onClick={addToCart}
                            className="px-6 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700"
                        >
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
