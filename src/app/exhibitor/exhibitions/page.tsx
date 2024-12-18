"use client";

import React, { useState } from "react";
import Link from "next/link";

// ログイン後のTOP画面
export default function LoggedInTopPage() {
    const [filters, setFilters] = useState({
        keyword: "",
        period: "",
        industry: "",
        organizer: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
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

            {/* 見出し */}
            <div className="bg-gray-200 py-4">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-800">
                        展示会一覧
                    </h2>
                    <div className="mt-2 w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
                </div>
            </div>

            <main className="container mx-auto flex mt-4 px-4">
                {/* 左側の検索条件エリア */}
                <aside className="w-1/4 bg-white shadow-md rounded-md p-4">
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
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                            <option value="2024-11">2024年11月</option>
                            <option value="2024-12">2024年12月</option>
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
                            <option value="ai">AI・人工知能</option>
                            <option value="iot">IoT</option>
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
                            <option value="expo_inc">EXPO Inc.</option>
                            <option value="future_tech">Future Tech</option>
                        </select>
                    </div>
                </aside>

                {/* 右側の展示会カードエリア */}
                <section className="w-3/4 ml-8">
                    <div className="space-y-4">
                        {/* カード例 */}
                        <div className="bg-white shadow-md rounded-md p-4 flex flex-col space-y-4">
                            <div className="flex items-center space-x-4">
                                <div className="w-20 h-20 bg-gray-200 flex items-center justify-center rounded-md">
                                    <span className="text-gray-600">📷</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800">
                                        AI・人工知能EXPO【秋】
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        2024/11/20 - 2024/11/22
                                    </p>
                                    <p className="text-gray-600 text-sm">東京都</p>
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm line-clamp-3">
                                近年、小売流通・エネルギー・ヘルスケアなどあらゆる業界でその活用方法に注目が集まるブロックチェーン。本展は、
                                ブロックチェーンに関する最新の研究からアプリケーションまで一堂に集まる専門見本市です。
                            </p>
                            <div className="text-right">
                                <Link
                                    href="/exhibitor/exhibitions/1" // IDを動的に変更する場合は1を動的値に
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 inline-block"
                                >
                                    詳細を見る
                                </Link>
                            </div>
                        </div>

                        {/* 他のカードをここに追加 */}
                    </div>
                </section>
            </main>
        </div>
    );
}
