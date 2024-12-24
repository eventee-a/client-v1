"use client";

import React from "react";
import Sidebar from "@/app/components/layout/Sidebar";
import ProductDetails from "@/app/components/ui/ProductDetail";
import Header from "@/app/components/layout/Header";
import { useSearchParams } from "next/navigation";

const productMock = {
    id: 1,
    name: "会議用テーブルW1800×D450",
    code: "01-TU-KGT45W",
    price: "¥1,200（税込: ¥1,320）",
    images: ["/placeholder.png", "/placeholder1.png", "/placeholder2.png"],
    description: "折りたたみ式で簡単に設置できます。3人掛けの会議テーブルです。\n\n幅1800mm × 奥行450mm × 高さ700mm\n■重量: 約14kg\n■耐荷重: 30kg",
    company: "さめじまリース株式会社",
};

export default function CommodityPage() {
    const searchParams = useSearchParams();
    const category = searchParams.get("category") || "top";

    return (
        <div className="min-h-screen flex flex-col">
            {/* ヘッダー */}
            <Header />

            {/* コンテンツ */}
            <div className="flex flex-1">
                {/* サイドバー */}
                <Sidebar currentCategory={category} />

                {/* メインセクション */}
                <main className="flex-1 bg-white shadow-md p-8 pt-24 space-y-8">
                    <ProductDetails product={productMock} />
                </main>
            </div>
        </div>
    );
}
