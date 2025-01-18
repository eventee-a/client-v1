"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

interface CartSummaryProps {
    total: number;
}

export default function CartSummary({ total }: CartSummaryProps) {
    const router = useRouter();
    const { token, user } = useAuth(); // ユーザー情報とトークンを取得
    const { id: exhibitionId } = useParams(); // 動的な exhibitionId を取得

    const handleApplicationSubmit = async () => {
        try {
            if (!token || !user) {
                alert("ログインが必要です。");
                return;
            }

            const response = await axios.post(
                `http://localhost:3100/api/exhibitor/exhibitions/${exhibitionId}/applications`,
                {}, // 必要なデータはバックエンドで処理
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`, // トークンをヘッダーに追加
                    },
                }
            );

            if (response.status === 200) {
                alert("申請が完了しました！");
                router.push(`/exhibitor/exhibitions/${exhibitionId}/application/confirm`);
            }
        } catch (error) {
            console.error("申請中にエラーが発生しました:", error);
            alert("申請中にエラーが発生しました。");
        }
    };

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
                    onClick={handleApplicationSubmit}
                    className="w-full px-4 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700"
                >
                    申請する
                </button>
                <button
                    onClick={() =>
                        router.push(`/exhibitor/exhibitions/${exhibitionId}/application/cart`)
                    }
                    className="w-full px-4 py-2 bg-gray-300 text-black font-bold rounded hover:bg-gray-400"
                >
                    カートへ戻る
                </button>
            </div>
        </div>
    );
}
