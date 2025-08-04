export interface Data {
    id: number;
    title: string;
    release_date: string;
    poster_path: string;
    vote_average: number;
    
    name: string; // For TV shows
    first_air_date: string; // For TV shows
}
export interface DataResponse {
    page: number;
    results: Data [];
    total_pages: number;
    total_results: number;
}