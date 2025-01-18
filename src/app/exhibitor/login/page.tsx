"use client";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

// ログイン画面
export default function ExhibitorLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post(
                "http://localhost:3100/api/exhibitor/login",
                { email, password },
                { headers: { "Content-Type": "application/json" }, withCredentials: true }
            );

            if (response.status === 200) {
                
                login(response.data.token, response.data.user); // AuthContext にログイン状態を保存
            } else {
                throw new Error(response.data.message || "ログインに失敗しました。");
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "ログイン中にエラーが発生しました。");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <header className="w-full py-6 bg-white shadow-md">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800">Eventee+</h1>
                </div>
            </header>

            <main className="flex-1 flex flex-col justify-center items-center px-4 text-center">
                <form onSubmit={handleSubmit} className="w-full max-w-md">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">ログイン</h2>
                    <p className="text-gray-600 mb-8 max-w-lg">
                        登録したメールアドレスとパスワードを使用してログインしてください。
                    </p>
                    <input
                        type="email"
                        placeholder="メールアドレス"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none text-black focus:ring-2 focus:ring-blue-600"
                    />
                    <input
                        type="password"
                        placeholder="パスワード"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none text-black focus:ring-2 focus:ring-blue-600"
                    />
                    {error && (
                        <p className="text-red-600 text-sm mb-4">{error}</p>
                    )}
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        ログイン
                    </button>
                </form>
                <div className="mt-6 space-y-2 space-x-6">
                    <button
                        onClick={() => router.push("/exhibitor/register")}
                        className="text-blue-600 hover:underline"
                    >
                        新規登録はこちら
                    </button>
                    <button
                        onClick={() => router.push("/exhibitor")}
                        className="text-blue-600 hover:underline"
                    >
                        TOPに戻る
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
