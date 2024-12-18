"use client";

import React from "react";
import Link from "next/link";

export default function BoothPurchaseDetailPage() {
    const boothDetails = {
        title: "AI・人工知能EXPO【秋】",
        organizer: "RX Japan株式会社",
        date: "2024/11/20 - 2024/11/22",
        venue: "幕張メッセ",
        address: "〒261-8550 千葉県千葉市美浜区中瀬2丁目1",
        boothNumber: "A18-17",
        boothSize: "9.0m × 2.7m",
        boothCount: 3,
        specialNotes: "",
        description:
            "本展は、近年その活用方法に注目の高まるAI・人工知能に関する専門展として2017年に第1回を開催。回を重ねるごとに出展社数・来場者数ともに増加し、日本最大のAI専門展としてあらゆる業界から注目されています。",
        relatedExhibitions: [
            { id: 1, title: "ブロックチェーンEXPO【秋】" },
            { id: 2, title: "電子コンピューティングEXPO【秋】" },
            { id: 3, title: "デジタル人材育成支援EXPO【秋】" },
            { id: 4, title: "XR・メタバース総合展【秋】" },
        ],
    };

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <header className="w-full py-4 bg-white shadow-md">
                <div className="container mx-auto flex justify-between items-center px-4">
                    <h1 className="text-2xl font-bold text-gray-800">{boothDetails.title}</h1>
                    <div className="flex items-center space-x-4">
                        <span className="text-gray-600">SJP株式会社</span>
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                            <span className="text-gray-800">👤</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto flex-1 mt-8 px-4 space-y-8 pb-2">
                {/* 基本情報 */}
                <section>
                    <h2 className="text-lg font-bold text-black mb-4">基本情報</h2>
                    <div className="flex items-start space-x-8">
                        <img
                            src="/placeholder.png"
                            alt="展示会ロゴ"
                            className="w-32 h-32 rounded-md shadow-md"
                        />
                        <div className="space-y-2 text-black">
                            <p><strong>主催者：</strong> {boothDetails.organizer}</p>
                            <p><strong>会期：</strong> {boothDetails.date}</p>
                            <p><strong>会場：</strong> {boothDetails.venue}</p>
                            <p><strong>住所：</strong> {boothDetails.address}</p>
                        </div>
                    </div>
                </section>

                <hr className="border-gray-300" />

                {/* 小間情報 */}
                <section>
                    <h2 className="text-lg font-bold text-black mb-4">小間情報</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-black">
                        <p><strong>小間番号：</strong> {boothDetails.boothNumber}</p>
                        <p><strong>小間寸法：</strong> {boothDetails.boothSize}</p>
                        <p><strong>小間数：</strong> {boothDetails.boothCount}</p>
                        <p><strong>特記事項：</strong> {boothDetails.specialNotes || "なし"}</p>
                    </div>
                </section>

                <hr className="border-gray-300" />

                {/* 会場図 */}
                <section>
                    <h2 className="text-lg font-bold text-black mb-4">会場図</h2>
                    <img
                        src="/placeholder-map.png"
                        alt="会場図"
                        className="w-full rounded-md shadow-md"
                    />
                    <div className="text-right mt-4">
                        <button className="px-6 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700">
                            会場図ダウンロード
                        </button>
                    </div>
                </section>

                <hr className="border-gray-300" />

                {/* 概要 */}
                <section>
                    <h2 className="text-lg font-bold text-black mb-4">概要</h2>
                    <p className="text-black leading-relaxed">{boothDetails.description}</p>
                </section>

                <hr className="border-gray-300" />

                {/* 関連展示会 */}
                <section>
                    <h2 className="text-lg font-bold text-black mb-4">関連展示会</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {boothDetails.relatedExhibitions.map((exhibition) => (
                            <div
                                key={exhibition.id}
                                className="bg-gray-50 rounded-lg shadow-md p-4 text-center"
                            >
                                <div className="w-16 h-16 bg-gray-200 mx-auto rounded-md mb-4"></div>
                                <h3 className="text-sm font-bold text-black">
                                    {exhibition.title}
                                </h3>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 各種申請ボタン */}
                <div className="text-center mt-8 pb-8">
                    <Link
                        href="/exhibitor/exhibitions/1/application" // IDを動的に変更する場合は1を動的値に
                        className="px-6 py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700"
                    >
                        各種申請
                    </Link>
                </div>
            </main>
        </div>
    );
}
