"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

// 登録内容確認画面
export default function ConfirmPage() {
    const router = useRouter();

    // ダミーデータ（実際にはフォームデータを渡すことを想定）
    const formData = {
        email: "expo@sharky.jp",
        password: "********",
        companyName: "SJP株式会社",
        companyNameKana: "エスジェーピーカブシキガイシャ",
        phoneNumber: "080-1234-5678",
        postalCode: "541-0059",
        prefecture: "大阪府",
        city: "大阪市中央区",
        address: "博労町4-6-17",
        building: "第三丸光ビル207",
    };

    const handleSubmit = () => {
        // 確定処理（API呼び出しなど）
        console.log("登録内容確定", formData);
        router.push("/exhibitor/register/success"); // 確定後の画面に遷移
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <header className="w-full py-6 bg-white shadow-md">
                <div className="container mx-auto px-4">
                    <h1 className="text-2xl font-bold text-gray-800">登録内容確認</h1>
                </div>
            </header>

            <main className="flex-1 w-full max-w-4xl bg-white shadow-md p-8">
                <section className="mb-8">
                    <div className="border-b-2 border-gray-300 pb-4 mb-4">
                        <h2 className="text-xl font-bold text-gray-800">ログイン情報</h2>
                    </div>
                    <ul className="space-y-4">
                        <li>
                            <strong className="text-gray-800">メールアドレス:</strong>
                            <p className="text-gray-600 pt-2">{formData.email}</p>
                        </li>
                        <li>
                            <strong className="text-gray-800">パスワード:</strong>
                            <p className="text-gray-600 pt-2">{formData.password}</p>
                        </li>
                    </ul>
                </section>

                <section className="mb-8">
                    <div className="border-b-2 border-gray-300 pb-4 mb-4">
                        <h2 className="text-xl font-bold text-gray-800">基本情報</h2>
                    </div>
                    <ul className="space-y-4">
                        <li>
                            <strong className="text-gray-800">会社名または屋号:</strong>
                            <p className="text-gray-600 pt-2">{formData.companyName}</p>
                        </li>
                        <li>
                            <strong className="text-gray-800">会社名または屋号（カナ）:</strong>
                            <p className="text-gray-600 pt-2">{formData.companyNameKana}</p>
                        </li>
                        <li>
                            <strong className="text-gray-800">電話番号:</strong>
                            <p className="text-gray-600 pt-2">{formData.phoneNumber}</p>
                        </li>
                        <li>
                            <strong className="text-gray-800">郵便番号:</strong>
                            <p className="text-gray-600 pt-2">{formData.postalCode}</p>
                        </li>
                        <li>
                            <strong className="text-gray-800">都道府県:</strong>
                            <p className="text-gray-600 pt-2">{formData.prefecture}</p>
                        </li>
                        <li>
                            <strong className="text-gray-800">市区町村:</strong>
                            <p className="text-gray-600 pt-2">{formData.city}</p>
                        </li>
                        <li>
                            <strong className="text-gray-800">番地:</strong>
                            <p className="text-gray-600 pt-2">{formData.address}</p>
                        </li>
                        <li>
                            <strong className="text-gray-800">ビル名・建物名:</strong>
                            <p className="text-gray-600 pt-2">{formData.building}</p>
                        </li>
                    </ul>
                </section>

                <div className="text-center">
                    <button
                        onClick={handleSubmit}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        登録する
                    </button>
                </div>
            </main>

            <footer className="w-full py-4 bg-white shadow-md border-t">
                <div className="container mx-auto text-center text-gray-600">
                    &copy; 2024 Eventee+. All rights reserved。
                </div>
            </footer>
        </div>
    );
}
