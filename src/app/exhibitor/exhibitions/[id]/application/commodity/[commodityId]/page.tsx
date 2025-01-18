"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/app/components/layout/Sidebar";
import ProductDetails from "@/app/components/ui/ProductDetail";
import Header from "@/app/components/layout/Header";
import { useSearchParams, useParams } from "next/navigation";
import axios from "axios";
import PrivateRoute from "@/components/PrivateRoute";

export default function CommodityPage() {
    const searchParams = useSearchParams();
    const { id: exhibitionId, commodityId: commodityId } = useParams(); // 動的な展示会IDを取得
    console.log("useParams():", useParams());
    console.log("exhibitionId:", exhibitionId);
    console.log("commodityId:", commodityId);
    const currentCategory = searchParams.get("category") || "top";
    const [categories, setCategories] = useState<{ name: string }[]>([]);
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3100/api/exhibitor/exhibitions/${exhibitionId}/applications`
                );
                setCategories(response.data.categories);
            } catch (error) {
                console.error("カテゴリデータの取得に失敗しました:", error);
            }
        };
        console.log(commodityId);
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3100/api/exhibitor/exhibitions/${exhibitionId}/products/${commodityId}`
                );
                setProduct(response.data);
            } catch (error) {
                console.error("商品データの取得に失敗しました:", error);
            }
        };

        fetchCategories();
        if (commodityId) fetchProductDetails();
    }, [exhibitionId, commodityId]);

    return (
        <PrivateRoute>
            <div className="min-h-screen flex flex-col">
                {/* ヘッダー */}
                <Header />

                {/* コンテンツ */}
                <div className="flex flex-1">
                    {/* サイドバー */}
                    <Sidebar currentCategory={currentCategory} categories={categories} />

                    {/* メインセクション */}
                    <main className="flex-1 bg-white shadow-md p-8 pt-24 space-y-8">
                        {product ? (
                            <ProductDetails product={product} />
                        ) : (
                            <p className="text-black">商品データを読み込んでいます...</p>
                        )}
                    </main>
                </div>
            </div>
        </PrivateRoute>
    );
}
