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

export interface ExhibitionCategory {
    id: number;
    name: string;
    pivot: {
        exhibition_id: number;
        category_id: number;
    };
}

export interface Exhibition {
    id: number;
    title: string;
    start_date: string;
    end_date: string;
    year: string;
    organizer_id: number;
    venue_id: number;
    category_id: number;
    description: string;
    map_path: string | null;
    image_path: string | null;
    created_at: string;
    updated_at: string;
    venue: {
        id: number;
        name: string;
        prefecture: string;
        city: string;
        address: string;
        latitude: string;
        longitude: string;
        created_at: string;
        updated_at: string;
    };
    exhibition_categories: ExhibitionCategory[]; // カテゴリ情報を追加
    organizer: {
        id: number;
        name: string;
        email: string;
        company_name: string;
        company_name_kana: string;
        phone_number: string;
        postal_code: string;
        prefecture: string;
        city: string;
        address: string;
        building: string;
        role: string;
        category_id: number | null;
        email_verified_at: string;
        created_at: string;
        updated_at: string;
    };
}

export interface Product {
    id: number;
    name: string;
    code: string;
    price: string;
    image_url: string;
}