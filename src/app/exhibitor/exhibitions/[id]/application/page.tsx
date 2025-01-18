"use client";

import React, { useState, useEffect } from "react";
import ProductList from "@/app/components/ui/ProductList";
import { useParams, useSearchParams } from "next/navigation";
import Sidebar from "@/app/components/layout/Sidebar";
import axios from "axios";
import PrivateRoute from "@/components/PrivateRoute";
import { useAuth } from "@/context/AuthContext";

interface Application {
    id: number;
    description: string;
    date: string;
    total_price: string;
    contractor: { id: number; name: string };
}

interface Product {
    id: number;
    name: string;
    code: string;
    price: string;
    image_url: string;
}

interface Category {
    id: number;
    name: string;
}

export default function ApplicationsPage() {
    const { id: exhibitionId } = useParams();
    const searchParams = useSearchParams();
    const currentCategory = searchParams.get("category") || "top";
    const { token, isInitialized } = useAuth();

    const [applications, setApplications] = useState<Application[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [title, setTitle] = useState("申請TOP");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // 初回カテゴリと申請情報を取得
    useEffect(() => {
        if (!isInitialized || !token) return;

        const fetchApplicationsAndCategories = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(
                    `http://localhost:3100/api/exhibitor/exhibitions/${exhibitionId}/applications`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const { applications, categories } = response.data;
                setApplications(applications || []);
                setCategories(categories || []);

                // currentCategory が "top" でない場合はカテゴリ商品を取得
                if (currentCategory !== "top" && categories.length) {
                    fetchCategoryProducts(currentCategory, categories);
                }
            } catch (err) {
                setError("データの取得に失敗しました。");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchApplicationsAndCategories();
    }, [exhibitionId, token, isInitialized]);

    // currentCategory が変わったときに商品を取得
    useEffect(() => {
        if (!isInitialized || !token || currentCategory === "top" || !categories.length) return;

        fetchCategoryProducts(currentCategory, categories);
    }, [currentCategory, categories, exhibitionId, token, isInitialized]);

    // カテゴリの商品を取得
    const fetchCategoryProducts = async (categoryName: string, categoryList: Category[]) => {
        const selectedCategory = categoryList.find((cat) => cat.name === categoryName);
        if (!selectedCategory) {
            setError("カテゴリが見つかりません。");
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(
                `http://localhost:3100/api/exhibitor/exhibitions/${exhibitionId}/applications/categories/${selectedCategory.id}/products`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setTitle(selectedCategory.name);
            setProducts(response.data || []);
        } catch (err) {
            setError("商品データの取得に失敗しました。");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <PrivateRoute>
            <div className="min-h-screen flex">
                <header className="w-full py-4 bg-white shadow-md fixed top-0 left-0 z-10">
                    <div className="container mx-auto flex justify-between items-center px-4">
                        <h1 className="text-2xl font-bold text-gray-800">AI・人工知能EXPO【秋】</h1>
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-600">SJP株式会社</span>
                            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                <span className="text-gray-800">👤</span>
                            </div>
                            <a
                                href={`/exhibitor/exhibitions/${exhibitionId}/application/cart`}
                                className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400"
                                title="カートを見る"
                            >
                                🛒
                            </a>
                        </div>
                    </div>
                </header>

                <Sidebar
                    currentCategory={currentCategory}
                    categories={categories.map((cat) => ({ name: cat.name }))}
                />

                <main className="flex-1 bg-white shadow-md p-8 pt-20 space-y-8">
                    {loading ? (
                        <p className="text-gray-600">読み込み中...</p>
                    ) : error ? (
                        <p className="text-red-600">{error}</p>
                    ) : currentCategory === "top" ? (
                        <>
                            <section>
                                <h1 className="text-2xl font-bold text-gray-800 mb-4">申請TOP</h1>
                                <hr className="border-gray-300" />
                            </section>

                            <section>
                                <h2 className="text-lg font-bold text-gray-800 mb-2">申請履歴</h2>
                                <div className="overflow-auto">
                                    <table className="w-full border-collapse border border-gray-300 text-gray-800">
                                        <thead>
                                            <tr className="bg-gray-100 text-gray-800">
                                                <th className="border p-2 text-left">申請内容</th>
                                                <th className="border p-2 text-left">申請日時</th>
                                                <th className="border p-2 text-left">料金</th>
                                                <th className="border p-2 text-left">申請先会社</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {applications.length ? (
                                                applications.map((app) => (
                                                    <tr key={app.id} className="hover:bg-gray-50">
                                                        <td className="border p-2">{app.description}</td>
                                                        <td className="border p-2">{app.date}</td>
                                                        <td className="border p-2">{app.total_price}</td>
                                                        <td className="border p-2">{app.contractor.name}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={4} className="text-center text-gray-500">
                                                        申請履歴がありません。
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </section>
                        </>
                    ) : (
                        <ProductList title={title} products={products} category={currentCategory} />
                    )}
                </main>
            </div>
        </PrivateRoute>
    );
}
