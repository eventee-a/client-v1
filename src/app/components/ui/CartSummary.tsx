"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface CartSummaryProps {
    total: number;
}

export default function CartSummary({ total }: CartSummaryProps) {
    const router = useRouter();

    return (
        <div className="space-y-4 pt-20">
            {/* 合計金額 */}
            <div className="p-4 border rounded-lg shadow bg-white">
                <p className="text-lg font-bold text-black">
                    合計金額: <span className="ml-4">¥{total.toLocaleString()}</span>
                </p>
            </div>

            {/* ボタン */}
            <div className="flex flex-col space-y-2">
                <button
                    onClick={() => router.push("/exhibitor/exhibitions/1/application/confirm")}
                    className="w-full px-4 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700"
                >
                    申請する
                </button>
                <button
                    onClick={() => router.push("/exhibitor/exhibitions/1/application/cart")}
                    className="w-full px-4 py-2 bg-gray-300 text-black font-bold rounded hover:bg-gray-400"
                >
                    カートへ戻る
                </button>
            </div>
        </div>
    );
}
