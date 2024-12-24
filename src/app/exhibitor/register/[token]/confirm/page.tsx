"use client";

import React from 'react';
import { useParams, useRouter, useSearchParams } from "next/navigation";
import axios from 'axios';

// 登録内容確認画面
export default function ConfirmPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const params = useParams();

    const formData = {
        email: searchParams.get("email") || "",
        password: "********", // パスワードは非表示
        companyName: searchParams.get("companyName") || "",
        companyNameKana: searchParams.get("companyNameKana") || "",
        role: searchParams.get("role") || "",
        phoneNumber: searchParams.get("phoneNumber") || "",
        postalCode: searchParams.get("postalCode") || "",
        prefecture: searchParams.get("prefecture") || "",
        city: searchParams.get("city") || "",
        address: searchParams.get("address") || "",
        building: searchParams.get("building") || "",
    };
    console.log(formData);

    const handleSubmit = async () => {
        try {
            const token = params.token;
            // Laravel側に登録リクエストを送信
            const response = await axios.post("http://localhost:3100/api/exhibitor/register", {
                token: token,
                email: searchParams.get("email"),
                password: searchParams.get("password"),
                password_confirmation: searchParams.get("passwordConfirm"),
                company_name: searchParams.get("companyName"),
                company_name_kana: searchParams.get("companyNameKana"),
                role: searchParams.get("role"),
                phone_number: searchParams.get("phoneNumber"),
                postal_code: searchParams.get("postalCode"),
                prefecture: searchParams.get("prefecture"),
                city: searchParams.get("city"),
                address: searchParams.get("address"),
                building: searchParams.get("building"),
            });

            console.log(response.data);
            router.push("/exhibitor/exhibitions"); // 登録成功画面へ遷移
        } catch (error) {
            console.error("登録に失敗しました。", error);
        }
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
