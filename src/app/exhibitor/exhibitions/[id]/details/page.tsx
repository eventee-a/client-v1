"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Link from "next/link";
import PrivateRoute from "@/components/PrivateRoute";

interface Venue {
    id: number;
    name: string;
    prefecture: string;
    city: string;
    address: string;
}

interface Organizer {
    id: number;
    name: string;
    company_name: string;
}

interface Booth {
    id: number;
    booth_number: string;
    booth_size: string;
    booth_count: number;
    special_notes: string | null;
}

interface RelatedExhibition {
    id: number;
    title: string;
}

interface ExhibitionDetails {
    id: number;
    title: string;
    start_date: string;
    end_date: string;
    venue: Venue;
    organizer: Organizer;
    description: string;
    booths: Booth[];
    relatedExhibitions: RelatedExhibition[];
    image_path: string | null;
    map_path: string | null;
}

export default function BoothPurchaseDetailPage() {
    const { id } = useParams(); // URLパラメータからIDを取得
    const [details, setDetails] = useState<ExhibitionDetails | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!id) return;

        const fetchDetails = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:3100/api/exhibitor/exhibitions/${id}`);
                setDetails(response.data.exhibition); // レスポンスの "exhibition" 部分を取得
            } catch (error) {
                console.error("詳細データの取得に失敗しました。", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [id]);

    if (loading || !details) {
        return <p className="text-center mt-8">読み込み中...</p>;
    }

    return (
        <PrivateRoute>
            <div className="bg-gray-100 min-h-screen flex flex-col">
                <header className="w-full py-4 bg-white shadow-md">
                    <div className="container mx-auto flex justify-between items-center px-4">
                        <h1 className="text-2xl font-bold text-gray-800">{details.title}</h1>
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-600">{details.organizer.company_name}</span>
                            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                <span className="text-gray-800">👤</span>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="container mx-auto flex-1 mt-8 px-4 space-y-8 pb-8">
                    {/* 基本情報 */}
                    <section>
                        <h2 className="text-lg font-bold text-black mb-4">基本情報</h2>
                        <div className="flex items-start space-x-8">
                            {details.image_path ? (
                                <img
                                    src={details.image_path}
                                    alt="展示会イメージ"
                                    className="w-32 h-32 rounded-md shadow-md"
                                />
                            ) : (
                                <div className="w-32 h-32 bg-gray-200 rounded-md shadow-md"></div>
                            )}
                            <div className="space-y-2 text-black">
                                <p><strong>主催者：</strong> {details.organizer.name}</p>
                                <p><strong>会期：</strong> {details.start_date} - {details.end_date}</p>
                                <p><strong>会場：</strong> {details.venue.name}</p>
                                <p><strong>住所：</strong> {details.venue.address}, {details.venue.city}, {details.venue.prefecture}</p>
                            </div>
                        </div>
                    </section>

                    <hr className="border-gray-300" />

                    {/* 小間情報 */}
                    <section>
                        <h2 className="text-lg font-bold text-black mb-4">小間情報</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8 text-black">
                            {details.booths.map((booth) => (
                                <div key={booth.id} className="space-y-2">
                                    <p><strong>小間番号：</strong> {booth.booth_number}</p>
                                    <p><strong>小間寸法：</strong> {booth.booth_size}</p>
                                    <p><strong>小間数：</strong> {booth.booth_count}</p>
                                    <p><strong>特記事項：</strong> {booth.special_notes || "なし"}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <hr className="border-gray-300" />

                    {/* 会場図 */}
                    <section>
                        <h2 className="text-lg font-bold text-black mb-4">会場図</h2>
                        {details.map_path ? (
                            <>
                                <img
                                    src={details.map_path}
                                    alt="会場図"
                                    className="w-full rounded-md shadow-md"
                                />
                                <div className="text-right mt-4">
                                    <a
                                        href={details.map_path}
                                        download
                                        className="px-6 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700"
                                    >
                                        会場図ダウンロード
                                    </a>
                                </div>
                            </>
                        ) : (
                            <p className="text-gray-600">会場図が登録されていません。</p>
                        )}
                    </section>

                    <hr className="border-gray-300" />

                    {/* 概要 */}
                    <section>
                        <h2 className="text-lg font-bold text-black mb-4">概要</h2>
                        <p className="text-black leading-relaxed">{details.description}</p>
                    </section>

                    <hr className="border-gray-300" />

                    {/* 関連展示会 */}
                    <section>
                        <h2 className="text-lg font-bold text-black mb-4">関連展示会</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {details.relatedExhibitions.map((exhibition) => (
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

                    <div className="text-center mt-8">
                        <Link
                            href={`/exhibitor/exhibitions/${id}/application`}
                            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700"
                        >
                            各種申請
                        </Link>
                    </div>
                </main>
            </div>
        </PrivateRoute >
    );
}
