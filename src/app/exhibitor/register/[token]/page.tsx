"use client";

import React, { useState, useRef } from 'react';

// 新規会員登録画面
export default function ExhibitorRegisterPage() {
    const [formData, setFormData] = useState({
        email: '',
        emailConfirm: '',
        password: '',
        passwordConfirm: '',
        companyName: '',
        companyNameKana: '',
        phoneNumber: '',
        postalCode: '',
        prefecture: '',
        city: '',
        address: '',
        building: '',
        agreeToTerms: false,
    });

    const termsRef = useRef<HTMLTextAreaElement>(null);
    const [canAgree, setCanAgree] = useState(false);

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
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(formData);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <header className="w-full py-6 bg-white shadow-md">
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
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 mb-1">会社名または屋号（カナ）</label>
                                <input
                                    type="text"
                                    name="companyNameKana"
                                    value={formData.companyNameKana}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 mb-1">電話番号</label>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 mb-1">郵便番号</label>
                                <input
                                    type="text"
                                    name="postalCode"
                                    value={formData.postalCode}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 mb-1">都道府県</label>
                                <input
                                    type="text"
                                    name="prefecture"
                                    value={formData.prefecture}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 mb-1">市区町村</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 mb-1">番地</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 mb-1">ビル名・建物名</label>
                                <input
                                    type="text"
                                    name="building"
                                    value={formData.building}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
