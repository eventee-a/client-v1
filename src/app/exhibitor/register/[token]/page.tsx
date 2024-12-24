"use client";

import axios from 'axios';
import { useParams, useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from 'react';

// 新規会員登録画面
export default function ExhibitorRegisterPage() {
    const [formData, setFormData] = useState({
        email: '',
        emailConfirm: '',
        password: '',
        passwordConfirm: '',
        companyName: '',
        companyNameKana: '',
        role: '',
        phoneNumber: '',
        postalCode: '',
        prefecture: '',
        city: '',
        address: '',
        building: '',
        agreeToTerms: false,
    });

    const [isTokenValid, setIsTokenValid] = useState(false);
    const [error, setError] = useState("");
    const termsRef = useRef<HTMLTextAreaElement>(null);
    const [canAgree, setCanAgree] = useState(false);

    const router = useRouter();
    const params = useParams();

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3100/api/exhibitor/register/${params.token}/verify`
                );
                setFormData((prevData) => ({ ...prevData, email: response.data.email, role: response.data.role }));
                setIsTokenValid(true);
            } catch (err) {
                console.error(err);
                setError("トークンが無効です。");
            }
        };

        verifyToken();
    }, [params.token]);

    const handleScroll = () => {
        if (termsRef.current) {
            const isScrolledToBottom =
                termsRef.current.scrollHeight - termsRef.current.scrollTop === termsRef.current.clientHeight;
            setCanAgree(isScrolledToBottom);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const queryData = { ...formData, agreeToTerms: formData.agreeToTerms ? "true" : "false" };
        const queryString = new URLSearchParams(queryData as Record<string, string>).toString();
        router.push(`/exhibitor/register/${params.token}/confirm?${queryString}`);
    };

    if (!isTokenValid) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-red-500">{error || "トークンを検証しています..."}</p>
            </div>
        );
    }

    if (!isTokenValid) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-red-500">{error || "トークンを検証しています..."}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <header className="w-full py-6 bg-white shadow-md z-10">
                <div className="container mx-auto px-4">
                    <h1 className="text-2xl font-bold text-gray-800">新規会員登録</h1>
                </div>
            </header>

            <main className="flex-1 w-full max-w-4xl bg-white shadow-md p-8">
                <form onSubmit={handleSubmit}>
                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">ログイン情報</h2>
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label className="block text-gray-600 mb-1">メールアドレス</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="例) xxxx@xxx.xx.jp"
                                    className="text-black w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 mb-1">メールアドレス確認</label>
                                <input
                                    type="email"
                                    name="emailConfirm"
                                    value={formData.emailConfirm}
                                    onChange={handleChange}
                                    placeholder="例) xxxx@xxx.xx.jp"
                                    className="text-black w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 mb-1">パスワード</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="text-black w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 mb-1">パスワード確認</label>
                                <input
                                    type="password"
                                    name="passwordConfirm"
                                    value={formData.passwordConfirm}
                                    onChange={handleChange}
                                    className="text-black w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">基本情報</h2>
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label className="block text-gray-600 mb-1">会社名または屋号</label>
                                <input
                                    type="text"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    className="text-black w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 mb-1">会社名または屋号（カナ）</label>
                                <input
                                    type="text"
                                    name="companyNameKana"
                                    value={formData.companyNameKana}
                                    onChange={handleChange}
                                    className="text-black w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 mb-1">電話番号</label>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    className="text-black w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 mb-1">郵便番号</label>
                                <input
                                    type="text"
                                    name="postalCode"
                                    value={formData.postalCode}
                                    onChange={handleChange}
                                    className="text-black w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 mb-1">都道府県</label>
                                <input
                                    type="text"
                                    name="prefecture"
                                    value={formData.prefecture}
                                    onChange={handleChange}
                                    className="w-full text-black px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 mb-1">市区町村</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="text-black w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 mb-1">番地</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="text-black w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 mb-1">ビル名・建物名</label>
                                <input
                                    type="text"
                                    name="building"
                                    value={formData.building}
                                    onChange={handleChange}
                                    className="text-black w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">サービス利用規約</h2>
                        <textarea
                            readOnly
                            ref={termsRef}
                            onScroll={handleScroll}
                            className="w-full px-4 py-2 border text-black rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={6}
                            value={"サービス利用規約の例文\n\n1. 利用者は本サービスを遵守し、責任を持って使用するものとします。\n2. 本サービスは予告なく変更または終了する場合があります。\n3. 利用者の情報を適切に管理し、第三者に開示しないことを保証します。\n4. 本サービス利用にあたり生じた損害について、運営者は一切の責任を負いません。\n5. その他の利用規約は別途記載します。"}
                        ></textarea>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="agreeToTerms"
                                checked={formData.agreeToTerms}
                                onChange={handleChange}
                                disabled={!canAgree}
                                className="mr-2"
                            />
                            <label className={`text-gray-600 ${!canAgree ? 'opacity-50' : ''}`}>利用規約に同意する</label>
                        </div>
                    </section>

                    <div className="text-center">
                        <button
                            type="submit"
                            disabled={!formData.agreeToTerms}
                            className={`px-6 py-2 rounded-md text-white ${formData.agreeToTerms ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'}`}
                        >
                            入力内容確認へ
                        </button>
                    </div>
                </form>
            </main>

            <footer className="w-full py-4 bg-white shadow-md border-t">
                <div className="container mx-auto text-center text-gray-600">
                    &copy; 2024 Eventee+. All rights reserved。
                </div>
            </footer>
        </div>
    );
}
