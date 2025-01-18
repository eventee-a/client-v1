"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Header() {
    const { id: exhibitionId } = useParams();
    return (
        <header className="w-full py-4 bg-white shadow-md fixed top-0 left-0 z-10">
            <div className="container mx-auto flex justify-between items-center px-4">
                <h1 className="text-2xl font-bold text-gray-800">AI・人工知能EXPO【秋】</h1>
                <div className="flex items-center space-x-4">
                    <span className="text-gray-600">SJP株式会社</span>
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-gray-800">👤</span>
                    </div>
                    {/* カートアイコン */}
                    <Link
                        href={`/exhibitor/exhibitions/${exhibitionId}/application/cart`} 
                        className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400"
                    >
                        <span className="text-gray-800">🛒</span>
                    </Link>
                </div>
            </div>
        </header>
    );
}
