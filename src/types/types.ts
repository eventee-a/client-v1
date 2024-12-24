// types.ts
export interface Venue {
    id: number;
    name: string;
    prefecture: string;
    city: string;
    address: string;
    latitude?: number;
    longitude?: number;
}

export interface Exhibition {
    id: number;
    title: string;
    start_date: string;
    end_date: string;
    description: string;
    venue: {
        id: number;
        name: string;
        prefecture: string;
        city: string;
        address: string;
        latitude: string | null;
        longitude: string | null;
    };
    categories: { id: number; name: string }[]; // 追加
    organizer: { id: number; company_name: string }; // 追加
}
