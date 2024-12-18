"use client";

import React from "react";
import Link from "next/link";

export default function ExhibitionDetailPage() {
    // ダミーデータ
    const exhibitionDetails = {
        title: "AI・人工知能EXPO【秋】",
        organizer: "RX Japan株式会社",
        date: "2024/11/20 - 2024/11/22",
        venue: "幕張メッセ",
        address: "〒261-8550 千葉県千葉市美浜区中瀬2丁目1",
        description:
            "本展は、近年その活用方法に注目の高まるAI・人工知能に関する専門展として2017年に第1回を開催。回を重ねるごとに出展社数・来場者数ともに増加し、日本最大のAI専門展としてあらゆる業界から注目されています。2020年より10月には秋展を開催し、商談・技術相談・ビジネスパートナー獲得の絶好の場です。※同国の展示市との出展者比較。",
        relatedExhibitions: [
            { id: 1, title: "ブロックチェーンEXPO【秋】" },
            { id: 2, title: "電子コンピューティングEXPO【秋】" },
            { id: 3, title: "デジタル人材育成支援EXPO【秋】" },
            { id: 4, title: "XR・メタバース総合展【秋】" },
        ],
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="w-full py-4 bg-white shadow-md">
                <div className="container mx-auto flex justify-between items-center px-4">
                    <h1 className="text-2xl font-bold text-gray-800">{exhibitionDetails.title}</h1>
                    <div className="flex items-center space-x-4">
                        <span className="text-gray-600">SJP株式会社</span>
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                            <span className="text-gray-800">👤</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* メインコンテンツ */}
            <main className="container mx-auto mt-8 px-4 space-y-8">
                {/* 基本情報 */}
                <section>
                    <h2 className="text-lg font-bold text-gray-800 mb-4">基本情報</h2>
                    <div className="flex items-start">
                        <div className="w-1/4">
                            <img
                                src="/placeholder.png"
                                alt="展示会ロゴ"
                                className="w-full rounded-md shadow-sm"
                            />
                        </div>
                        <div className="w-3/4 pl-6 space-y-2">
                            <p className="text-gray-600">
                                <strong>主催者：</strong> {exhibitionDetails.organizer}
                            </p>
                            <p className="text-gray-600">
                                <strong>会期：</strong> {exhibitionDetails.date}
                            </p>
                            <p className="text-gray-600">
                                <strong>会場：</strong> {exhibitionDetails.venue}
                            </p>
                            <p className="text-gray-600">
                                <strong>住所：</strong> {exhibitionDetails.address}
                            </p>
                        </div>
                    </div>
                </section>

                {/* 区切り線 */}
                <hr className="border-t border-gray-300" />

                {/* 概要 */}
                <section>
                    <h2 className="text-lg font-bold text-gray-800 mb-4">概要</h2>
                    <p className="text-gray-600 leading-relaxed">{exhibitionDetails.description}</p>
                </section>

                {/* 区切り線 */}
                <hr className="border-t border-gray-300" />

                {/* 関連展示会 */}
                <section>
                    <h2 className="text-lg font-bold text-gray-800 mb-4">関連展示会</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {exhibitionDetails.relatedExhibitions.map((exhibition) => (
                            <div
                                key={exhibition.id}
                                className="bg-gray-50 shadow-sm rounded-lg p-4 flex flex-col items-center"
                            >
                                <div className="w-16 h-16 bg-gray-200 rounded-md mb-4"></div>
                                <h3 className="text-gray-800 text-sm text-center font-medium">
                                    {exhibition.title}
                                </h3>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 区切り線 */}
                <hr className="border-t border-gray-300" />

                {/* 申請ボタン */}
                <div className="text-center mt-8">
                    <Link
                        href="/exhibitor/exhibitions/1/details" // IDを動的に変更する場合は1を動的値に
                        className="px-6 py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700"
                    >
                        出展申請
                    </Link>
                </div>
            </main>
        </div>
    );
}
