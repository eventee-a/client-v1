"use client";

import React, { useEffect, useState } from "react";
import Header from "@/app/components/layout/Header";
import Sidebar from "@/app/components/layout/Sidebar";
import CartSummary from "@/app/components/ui/CartSummary";
import PrivateRoute from "@/components/PrivateRoute";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useParams } from "next/navigation";

type CartItem = {
    id: number;
    name: string;
    image_url: string;
    quantity: number;
    price: number;
    subtotal: number;
};

type ExhibitorInfo = {
    company: string;
    email: string;
    address: string;
};

export default function CheckoutPage() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [exhibitorInfo, setExhibitorInfo] = useState<ExhibitorInfo | null>(null);
    const { token } = useAuth();
    const { id: exhibitionId } = useParams();

    const fetchCartItems = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3100/api/exhibitor/exhibitions/${exhibitionId}/cart`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setTotal(response.data.total);
            setCartItems(response.data.cart_items);
        } catch (error) {
            console.error("カート情報の取得に失敗しました:", error);
        }
    };

    const fetchExhibitorInfo = async () => {
        try {
            const response = await axios.get("http://localhost:3100/api/exhibitor/info", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setExhibitorInfo(response.data);
        } catch (error) {
            console.error("出展者情報の取得に失敗しました:", error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchCartItems();
            fetchExhibitorInfo();
        }
    }, [token]);

    return (
        <PrivateRoute>
            <div className="min-h-screen flex flex-col">
                {/* ヘッダー */}
                <Header />

                <div className="flex flex-1">
                    {/* メインコンテンツ */}
                    <main className="flex-1 bg-white p-8 space-y-8 pt-20">
                        {/* 見出し */}
                        <section>
                            <h2 className="text-2xl font-bold text-black">申請情報入力</h2>
                            <hr className="border-gray-300" />
                        </section>

                        {/* 商品情報 */}
                        <section>
                            <h3 className="text-lg font-bold text-black mb-2">商品情報</h3>
                            <div className="space-y-4">
                                {cartItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center border p-4 rounded-lg shadow-sm"
                                    >
                                        <img
                                            src={item.image_url}
                                            alt={item.name}
                                            className="w-24 h-24 object-cover border rounded-lg"
                                        />
                                        <div className="flex-1 px-4">
                                            <p className="text-lg font-bold text-black mb-1">
                                                {item.name}
                                            </p>
                                            <p className="text-black">数量: {item.quantity}</p>
                                        </div>
                                        <p className="text-lg font-bold text-black">
                                            ¥{item.subtotal.toLocaleString()}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* 利用期間 */}
                        <section className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-black font-bold mb-2">利用開始日</label>
                                <input type="date" className="w-full border rounded-lg p-2 text-black" />
                            </div>
                            <div>
                                <label className="block text-black font-bold mb-2">利用終了日</label>
                                <input type="date" className="w-full border rounded-lg p-2 text-black" />
                            </div>
                        </section>

                        {/* 出展者情報 */}
                        {exhibitorInfo && (
                            <section>
                                <h3 className="text-lg font-bold text-black mb-2">出展者情報</h3>
                                <div className="p-4 border rounded-lg bg-gray-50 space-y-2">
                                    <p className="text-black">
                                        <strong>会社名:</strong> {exhibitorInfo.company}
                                    </p>
                                    <p className="text-black">
                                        <strong>メールアドレス:</strong> {exhibitorInfo.email}
                                    </p>
                                    <p className="text-black">
                                        <strong>住所:</strong> {exhibitorInfo.address}
                                    </p>
                                </div>
                            </section>
                        )}

                        {/* 小間情報 */}
                        <section>
                            <h3 className="text-lg font-bold text-black mb-2">小間情報</h3>
                            <div className="border rounded-lg p-4 shadow">
                                <p className="text-black">小間番号: A18-17</p>
                                <p className="text-black">サイズ: 9.0m × 2.7m</p>
                            </div>
                        </section>

                        {/* 支払い方法 */}
                        <section>
                            <h3 className="text-lg font-bold text-black mb-2">支払い方法</h3>
                            <select className="w-full border rounded-lg p-2 text-black">
                                <option>銀行振込</option>
                                <option>クレジットカード</option>
                                <option>請求書払い</option>
                            </select>
                        </section>
                    </main>

                    {/* サイドバー */}
                    <aside className="w-1/4 bg-gray-50 p-4 shadow-inner">
                        <CartSummary total={total} />
                    </aside>
                </div>
            </div>
        </PrivateRoute>
    );
}
