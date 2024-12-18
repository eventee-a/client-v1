"use client";
import React, { useState } from 'react';

// 仮登録メール送信画面
export default function ExhibitorTemporaryRegisterPage() {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <header className="w-full py-6 bg-white shadow-md">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800">Eventee+</h1>
                </div>
            </header>

            <main className="flex-1 flex flex-col justify-center items-center px-4 text-center">
                {isSubmitted ? (
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">仮登録が完了しました</h2>
                        <p className="text-gray-600 mb-8 max-w-lg">
                            入力いただいたメールアドレスに仮登録用のメールを送信しました。メールをご確認の上、本登録を完了してください。
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="w-full max-w-md">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">仮登録を開始する</h2>
                        <p className="text-gray-600 mb-8 max-w-lg">
                            仮登録用のメールを送信します。メールアドレスを入力してください。
                        </p>
                        <input
                            type="email"
                            placeholder="メールアドレス"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none text-black focus:ring-2 focus:ring-blue-600"
                        />
                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            仮登録メールを送信
                        </button>
                    </form>
                )}
            </main>

            <footer className="w-full py-4 bg-white border-t">
                <div className="container mx-auto text-center text-gray-600">
                    &copy; 2024 Eventee+. All rights reserved。
                </div>
            </footer>
        </div>
    );
}
