"use client";

import React from "react";
import Header from "@/app/components/layout/Header";
import { useRouter } from "next/navigation";

export default function ConfirmationPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen flex flex-col">
            {/* ヘッダー */}
            <Header />

            {/* メインコンテンツ */}
            <main className="flex-1 flex flex-col items-center justify-center bg-gray-50 p-8">
                {/* 申請完了メッセージ */}
                <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-3xl w-full">
                    <h2 className="text-2xl font-bold text-black mb-4">申請完了</h2>
                    <p className="text-black mb-4">
                        ご申請ありがとうございます。
                        <br />
                        下記のメールアドレス宛に申請内容に関するメールを送信しました。
                    </p>

                    {/* メールアドレス */}
                    <p className="text-lg text-black font-bold mb-6">expo@sharky.jp</p>

                    {/* 注意事項 */}
                    <div className="bg-gray-100 p-4 rounded-md text-left text-sm text-black mb-6">
                        <p className="font-bold mb-2">● メールが届かない場合</p>
                        <ul className="list-disc list-inside space-y-1">
                            <li>迷惑メールフォルダ等に振り分けられていないかご確認ください。</li>
                            <li>
                                メールアドレスが誤っていた場合は、正しいメールアドレスで再度申請を行ってください。
                            </li>
                            <li>
                                携帯メールアドレスの場合、ドメイン設定によりメールが受信できない場合がございます。
                            </li>
                        </ul>
                    </div>

                    {/* TOPページに戻るボタン */}
                    <button
                        onClick={() => router.push("/exhibitor/exhibitions/1/application")}
                        className="px-6 py-2 bg-gray-300 text-black font-bold rounded hover:bg-gray-400"
                    >
                        TOPページに戻る
                    </button>
                </div>
            </main>
        </div>
    );
}
