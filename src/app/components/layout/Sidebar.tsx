"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface SidebarProps {
    currentCategory: string;
}

const sidebarItems = [
    { name: "申請TOP", key: "top" },
    { name: "レンタル備品", key: "rental-items" },
    { name: "レンタル設備", key: "rental-equipment" },
    { name: "床面工事", key: "flooring" },
    { name: "電灯・電力工事", key: "lighting" },
    { name: "水道配管工事", key: "plumbing" },
];

export default function Sidebar({ currentCategory }: SidebarProps) {
    const router = useRouter();

    const handleCategoryClick = (key: string) => {
        // ベースURLを構築して category パラメータを追加
        const exhibitionId = 1; // 仮の展示会ID、動的な場合は props から受け取る
        router.push(`/exhibitor/exhibitions/${exhibitionId}/application?category=${key}`);
    };

    return (
        <aside className="w-1/5 bg-gray-50 shadow-inner min-h-screen p-4 pt-20">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
                AI・人工知能EXPO【秋】
            </h2>
            <ul>
                {sidebarItems.map((item) => (
                    <li key={item.key}>
                        <button
                            onClick={() => handleCategoryClick(item.key)}
                            className={`block text-lg font-semibold p-2 rounded-md w-full text-left ${
                                currentCategory === item.key
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
