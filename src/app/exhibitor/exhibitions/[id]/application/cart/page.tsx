"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/app/components/layout/Sidebar";
import Header from "@/app/components/layout/Header";
import Link from "next/link";
import PrivateRoute from "@/components/PrivateRoute";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useParams } from "next/navigation";

type CartItem = {
    id: number;
    name: string;
    image_url: string;
    price: number;
    quantity: number;
    subtotal: number;
};

export default function CartPage() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [total, setTotal] = useState(0);
    const { token } = useAuth();
    const { id: exhibitionId } = useParams();

    console.log(token);
    // カートアイテムの取得
    const fetchCartItems = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3100/api/exhibitor/exhibitions/${exhibitionId}/cart`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            );

            setCartItems(response.data.cart_items);
            setTotal(response.data.total);
        } catch (error) {
            console.error("カート情報の取得に失敗しました:", error);
        }
    };

    // アイテム削除
    const removeFromCart = async (cartId: number) => {
        try {
            await axios.delete(`http://localhost:3100/api/exhibitor/cart/${cartId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // 更新されたカートを再取得
            fetchCartItems();
        } catch (error) {
            console.error("アイテム削除中にエラーが発生しました:", error);
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    const tax = total * 0.1; // 消費税10%
    const grandTotal = total + tax;

    return (
        <PrivateRoute>
            <div className="min-h-screen flex">
                {/* ヘッダー */}
                <Header />

                {/* サイドバー */}
                <Sidebar currentCategory="cart" />

                {/* メインコンテンツ */}
                <main className="flex-1 bg-white shadow-md rounded-lg p-8 pt-20 space-y-8">
                    {/* 見出し */}
                    <h2 className="text-2xl font-bold text-black">カート</h2>
                    <hr className="border-gray-300" />

                    {/* カート情報 */}
                    <div className="space-y-4">
                        {/* 列ヘッダー */}
                        <div className="grid grid-cols-12 text-black font-bold pb-2 border-b border-gray-300">
                            <span className="col-span-6 text-left text-lg">商品内容</span>
                            <span className="col-span-3 text-center text-lg">個数</span>
                            <span className="col-span-3 text-right pr-6 text-lg">小計</span>
                        </div>

                        {/* 商品リスト */}
                        {cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="grid grid-cols-12 items-center border-b pb-4 pt-4"
                            >
                                <img
                                    src={item.image_url}
                                    alt={item.name}
                                    className="col-span-2 w-20 h-20 object-cover border rounded-lg"
                                />
                                <div className="col-span-4 pl-4">
                                    <p className="text-lg font-bold text-black mb-1">{item.name}</p>
                                    <p className="text-black">¥{item.price.toLocaleString()}</p>
                                </div>
                                <div className="col-span-3 text-center font-bold  text-black text-xl">
                                    {item.quantity}
                                </div>
                                <p className="col-span-3 text-right pr-6 font-bold  text-black text-xl">
                                    ¥{item.subtotal.toLocaleString()}
                                </p>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="col-span-1 text-red-600 hover:underline"
                                >
                                    削除
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* 合計金額 */}
                    <div className="text-right space-y-4 pr-4">
                        <p className="text-black text-lg">
                            小計: <span className="ml-4">¥{total.toLocaleString()}</span>
                        </p>
                        <p className="text-black text-lg">
                            消費税: <span className="ml-4">¥{tax.toLocaleString()}</span>
                        </p>
                        <p className="text-2xl font-bold text-black">
                            合計: <span className="ml-4">¥{grandTotal.toLocaleString()}</span>
                        </p>
                    </div>

                    {/* 申請情報入力ボタン */}
                    <div className="text-center mt-8">
                        <Link
                            href={`/exhibitor/exhibitions/${exhibitionId}/application/checkout`} // IDを動的に変更する場合は1を動的値に
                            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700"
                        >
                            申請入力に進む
                        </Link>
                    </div>
                </main>
            </div>
        </PrivateRoute>
    );
}
