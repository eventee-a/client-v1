"use client";

import React, { useState, useEffect } from "react";
import ProductList from "@/app/components/ui/ProductList";
import { useSearchParams } from "next/navigation";

const productsMock = [
    {
        id: 1,
        image: "/placeholder.png",
        name: "会議用テーブル",
        code: "01-TU-KGT45W",
        price: "¥1,200",
    },
    {
        id: 2,
        image: "/placeholder.png",
        name: "折りたたみ椅子",
        code: "02-CH-FOLD001",
        price: "¥1,000",
    },
];

interface Product {
    id: number;
    image: string;
    name: string;
    code: string;
    price: string;
}

export default function ApplicationsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const searchParams = useSearchParams();
    const category = searchParams.get("category") || "top";
    const [title, setTitle] = useState("申請TOP");

    // サイドバー項目
    const sidebarItems = [
        { name: "申請TOP", key: "top" },
        { name: "レンタル備品", key: "rental-items" },
        { name: "レンタル設備", key: "rental-equipment" },
        { name: "床面工事", key: "flooring" },
        { name: "電灯・電力工事", key: "lighting" },
        { name: "水道配管工事", key: "plumbing" },
    ];

    const [applications, setApplications] = useState([
        {
            id: 1,
            description: "XXXXXXXXXXXXXX",
            date: "2024/12/15",
            amount: "〇〇〇",
            company: "XXXXXXXXXXXXXX",
            checked: false,
        },
        {
            id: 2,
            description: "XXXXXXXXXXXXXX",
            date: "2024/12/15",
            amount: "〇〇〇",
            company: "XXXXXXXXXXXXXX",
            checked: false,
        },
    ]);

    const toggleCheckbox = (id: number) => {
        setApplications((prev) =>
            prev.map((app) =>
                app.id === id ? { ...app, checked: !app.checked } : app
            )
        );
    };

    // 選択されたカテゴリに応じた内容設定
    useEffect(() => {
        switch (category) {
            case "rental-items":
                setTitle("レンタル備品");
                setProducts(productsMock);
                break;
            case "rental-equipment":
                setTitle("レンタル設備");
                setProducts(productsMock);
                break;
            default:
                setTitle("申請TOP");
                setProducts([]);
        }
    }, [category]);

    return (
        <div className="min-h-screen flex">
            {/* ヘッダー */}
            <header className="w-full py-4 bg-white shadow-md fixed top-0 left-0 z-10">
                <div className="container mx-auto flex justify-between items-center px-4">
                    {/* 左側: タイトル */}
                    <h1 className="text-2xl font-bold text-gray-800">AI・人工知能EXPO【秋】</h1>

                    {/* 右側: ユーザー情報とカート */}
                    <div className="flex items-center space-x-4">
                        <span className="text-gray-600">SJP株式会社</span>

                        {/* ユーザーアイコン */}
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                            <span className="text-gray-800">👤</span>
                        </div>

                        {/* カートアイコン */}
                        <a
                            href={`/exhibitor/exhibitions/1/application/cart`}
                            className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition duration-200"
                            title="カートを見る"
                        >
                            <span className="text-gray-800">🛒</span>
                        </a>
                    </div>
                </div>
            </header>

            {/* サイドバー */}
            <aside className="w-1/5 bg-gray-50 shadow-inner min-h-screen p-4 pt-20">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                    AI・人工知能EXPO【秋】
                </h2>
                <ul>
                    {sidebarItems.map((item) => (
                        <li key={item.key}>
                            <a
                                href={`?category=${item.key}`}
                                className={`block text-lg font-semibold p-2 rounded-md ${category === item.key
                                        ? "text-blue-600 bg-blue-50"
                                        : "text-gray-800 hover:text-blue-600 hover:bg-blue-50"
                                    }`}
                            >
                                {item.name}
                            </a>
                            <hr className="border-gray-200" />
                        </li>
                    ))}
                </ul>
            </aside>

            {/* メインセクション */}
            <main className="flex-1 bg-white shadow-md p-8 pt-20 space-y-8">
                {category === "top" ? (
                    <>
                        {/* 見出し */}
                        <section>
                            <h1 className="text-2xl font-bold text-gray-800 mb-4">
                                AI・人工知能EXPO【秋】
                            </h1>
                            <hr className="border-gray-300" />
                        </section>

                        {/* 申請マニュアル */}
                        <section>
                            <h2 className="text-lg font-bold text-gray-800 mb-2">
                                申請マニュアル
                            </h2>
                            <a href="#" className="text-blue-600 hover:underline">
                                申請規則_AI・人工知能EXPO【秋】
                            </a>
                            <hr className="border-gray-300 mt-4" />
                        </section>

                        {/* 申請履歴 */}
                        <section>
                            <h2 className="text-lg font-bold text-gray-800 mb-4">申請履歴</h2>
                            <div className="overflow-auto">
                                <table className="w-full border-collapse border border-gray-300 text-gray-800">
                                    <thead>
                                        <tr className="bg-gray-100 text-gray-800">
                                            <th className="border p-2 text-left">
                                                <input type="checkbox" />
                                            </th>
                                            <th className="border p-2 text-left">申請内容</th>
                                            <th className="border p-2 text-left">申請日時</th>
                                            <th className="border p-2 text-left">料金</th>
                                            <th className="border p-2 text-left">申請先会社</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {applications.map((app) => (
                                            <tr key={app.id} className="hover:bg-gray-50">
                                                <td className="border p-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={app.checked}
                                                        onChange={() => toggleCheckbox(app.id)}
                                                    />
                                                </td>
                                                <td className="border p-2">{app.description}</td>
                                                <td className="border p-2">{app.date}</td>
                                                <td className="border p-2">{app.amount}</td>
                                                <td className="border p-2">{app.company}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </>
                ) : (
                    <ProductList title={title} products={products} />
                )}
            </main>
        </div>
    );
}
