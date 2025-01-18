"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
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
    relatedExhibitions: RelatedExhibition[];
}

export default function ExhibitionDetailPage() {
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
                console.log(response.data);
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
            <div className="min-h-screen bg-gray-100">
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
                                    <strong>主催者：</strong> {details.organizer.name}
                                </p>
                                <p className="text-gray-600">
                                    <strong>会期：</strong> {details.start_date} - {details.end_date}
                                </p>
                                <p className="text-gray-600">
                                    <strong>会場：</strong> {details.venue.name}
                                </p>
                                <p className="text-gray-600">
                                    <strong>住所：</strong> {details.venue.address}, {details.venue.city}, {details.venue.prefecture}
                                </p>
                            </div>
                        </div>
                    </section>

                    <hr className="border-t border-gray-300" />

                    {/* 概要 */}
                    <section>
                        <h2 className="text-lg font-bold text-gray-800 mb-4">概要</h2>
                        <p className="text-gray-600 leading-relaxed">{details.description}</p>
                    </section>

                    <hr className="border-t border-gray-300" />

                    {/* 関連展示会 */}
                    <section>
                        <h2 className="text-lg font-bold text-gray-800 mb-4">関連展示会</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {details.relatedExhibitions.map((exhibition) => (
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

                    <hr className="border-t border-gray-300" />

                    {/* 申請ボタン */}
                    <div className="text-center mt-8">
                        <button
                            onClick={() => {
                                window.location.href = `http://localhost:3001/exhibitor/exhibitions/${details.id}/details`;
                            }}
                            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700"
                        >
                            出展申請
                        </button>
                    </div>
                </main>
            </div>
        </PrivateRoute>
    );
}
