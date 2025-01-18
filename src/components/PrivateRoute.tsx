import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
    const { token, isInitialized } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isInitialized && !token) {
            router.push("/exhibitor/login");
        }
    }, [token, isInitialized, router]);

    if (!isInitialized) {
        return null; // 初期化中は何も表示しない
    }

    if (!token) {
        return null; // トークンがない場合も何も表示しない
    }

    return <>{children}</>;
}
