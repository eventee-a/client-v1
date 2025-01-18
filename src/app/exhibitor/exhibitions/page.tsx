"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { Exhibition } from "@/types/types"; // 型定義をインポート
import PrivateRoute from "@/components/PrivateRoute";

export default function LoggedInTopPage() {
    const [filters, setFilters] = useState({
        keyword: "",
        period: "",
        industry: "",
        organizer: "",
    });

    const [exhibitions, setExhibitions] = useState<Exhibition[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [periods, setPeriods] = useState<string[]>([]);
    const [organizers, setOrganizers] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [initialized, setInitialized] = useState(false); // 初回データ取得済みフラグ

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const fetchExhibitions = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:3100/api/exhibitor/exhibitions", {
                params: filters,
            });
            const data = response.data as Exhibition[];

            setExhibitions(data);

            if (!initialized) {
                const periodsSet = new Set<string>(
                    data.map((exhibition) => exhibition.start_date?.slice(0, 7) || "不明")
                );
                setPeriods(Array.from(periodsSet).sort());
                const categoriesSet = new Set<string>();
                data.forEach((exhibition) => {
                    exhibition.exhibition_categories.forEach((category) => {
                        if (category.name) {
                            categoriesSet.add(category.name);
                        }
                    });
                });
                setCategories(Array.from(categoriesSet).sort());
                const organizersSet = new Set<string>(
                    data.map((exhibition) => (exhibition.organizer ? exhibition.organizer.company_name : "不明"))
                );
                setOrganizers(Array.from(organizersSet));

                setInitialized(true); // 初期化済みとしてフラグをセット
            }
        } catch (error) {
            console.error("展示会データの取得に失敗しました。", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExhibitions();
    }, []);

    return (
        <PrivateRoute>
            <div className="min-h-screen bg-gray-100">
                <header className="w-full py-4 bg-white shadow-md">
                    <div className="container mx-auto flex justify-between items-center px-4">
                        <h1 className="text-2xl font-bold text-gray-800">Eventee+</h1>
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-600">SJP株式会社</span>
                            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                <span className="text-gray-800">👤</span>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="bg-gray-200 py-4">
                    <div className="container mx-auto text-center">
                        <h2 className="text-3xl font-bold text-gray-800">
                            展示会一覧
                        </h2>
                        <div className="mt-2 w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
                    </div>
                </div>

                <main className="container mx-auto flex mt-4 px-4">
                    <aside className="w-1/4 bg-white shadow-md rounded-md p-4 self-start">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">
                            検索条件
                        </h3>
                        <div className="mb-4">
                            <label className="block text-gray-600 mb-2">キーワード検索</label>
                            <input
                                type="text"
                                name="keyword"
                                value={filters.keyword}
                                onChange={handleInputChange}
                                placeholder="例) AI、IoT"
                                className="w-full text-black px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-600 mb-2">開催時期</label>
                            <select
                                name="period"
                                value={filters.period}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            >
                                <option value="">選択してください</option>
                                {periods.map((period) => (
                                    <option key={period} value={period}>
                                        {period}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-600 mb-2">業種別</label>
                            <select
                                name="industry"
                                value={filters.industry}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            >
                                <option value="">選択してください</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-600 mb-2">主催者別</label>
                            <select
                                name="organizer"
                                value={filters.organizer}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            >
                                <option value="">選択してください</option>
                                {organizers.map((organizer) => (
                                    <option key={organizer} value={organizer}>
                                        {organizer}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button
                            onClick={fetchExhibitions}
                            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 mt-4"
                        >
                            検索
                        </button>
                    </aside>

                    <section className="w-3/4 ml-8 mb-6">
                        {loading ? (
                            <p>読み込み中...</p>
                        ) : (
                            <div className="space-y-4">
                                {exhibitions.map((exhibition) => (
                                    <div
                                        key={exhibition.id}
                                        className="bg-white shadow-md rounded-md p-4 flex flex-col space-y-4"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="w-20 h-20 bg-gray-200 flex items-center justify-center rounded-md">
                                                <span className="text-gray-600">📷</span>
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold text-gray-800">
                                                    {exhibition.title}
                                                </h3>
                                                <p className="text-gray-600 text-sm pt-2">
                                                    開催期間：{exhibition.start_date} - {exhibition.end_date}
                                                </p>
                                                <p className="text-gray-600 text-sm">
                                                    会場：{exhibition.venue.name}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 text-sm line-clamp-3">
                                            {exhibition.description}
                                        </p>
                                        <div className="text-right">
                                            <Link
                                                href={`/exhibitor/exhibitions/${exhibition.id}`}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 inline-block"
                                            >
                                                詳細を見る
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                </main>
            </div>
        </PrivateRoute>
    );
}
