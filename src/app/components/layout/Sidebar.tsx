"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";

interface SidebarProps {
    currentCategory?: string; // オプショナル型に変更
    categories?: { name: string }[]; // categories をオプショナル型に変更
}

export default function Sidebar({ currentCategory = "top", categories = [] }: SidebarProps) {
    const router = useRouter();
    const { id: exhibitionId } = useParams(); // 動的な展示会IDを取得

    const handleCategoryClick = (key: string) => {
        router.push(`/exhibitor/exhibitions/${exhibitionId}/application?category=${key}`);
    };

    return (
        <aside className="w-1/5 bg-gray-50 shadow-inner min-h-screen p-4 pt-20">
            <h2 className="text-xl font-bold text-gray-800 mb-4">AI・人工知能EXPO【秋】</h2>
            <ul>
                <li>
                    <button
                        onClick={() => handleCategoryClick("top")}
                        className={`block text-lg font-semibold p-2 rounded-md w-full text-left ${currentCategory === "top"
                            ? "text-blue-600 bg-blue-50"
                            : "text-gray-800 hover:text-blue-600 hover:bg-blue-50"
                            }`}
                    >
                        申請TOP
                    </button>
                    <hr className="border-gray-200" />
                </li>
                {categories.map((item) => (
                    <li key={item.name}>
                        <button
                            onClick={() => handleCategoryClick(item.name)}
                            className={`block text-lg font-semibold p-2 rounded-md w-full text-left ${currentCategory === item.name
                                ? "text-blue-600 bg-blue-50"
                                : "text-gray-800 hover:text-blue-600 hover:bg-blue-50"
                                }`}
                        >
                            {item.name}
                        </button>
                        <hr className="border-gray-200" />
                    </li>
                ))}
            </ul>
        </aside>
    );
}
