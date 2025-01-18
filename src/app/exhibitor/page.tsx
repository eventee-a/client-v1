"use client";
import { useRouter } from 'next/navigation';
import React from 'react';

// 出展者TOP（ログイン前）
export default function ExhibitorTopPage() {
    const router = useRouter();
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <header className="w-full py-6 bg-white shadow-md">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800">Eventee+</h1>
                </div>
            </header>

            <main className="flex-1 flex flex-col justify-center items-center px-4 text-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Eventeeへようこそ</h2>
                <p className="text-gray-600 mb-8 max-w-lg">
                    展示会検索から申請、展示会に必要な備品の調達や決済管理など、Eventee+が一元管理し効率化することで、みなさまの大切な時間を守ります。
                </p>
                <div className="flex space-x-4">
                    <button
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        onClick={() => router.push('/exhibitor/register')}
                    >
                        新規登録
                    </button>
                    <button
                        className="px-6 py-2 bg-gray-200 text-gray-800 outline rounded-md hover:bg-gray-300"
                        onClick={() => router.push('/exhibitor/login')}
                    >
                        ログイン
                    </button>
                </div>
            </main>

            <footer className="w-full py-4 bg-white border-t">
                <div className="container mx-auto text-center text-gray-600">
                    &copy; 2024 Eventee+. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
