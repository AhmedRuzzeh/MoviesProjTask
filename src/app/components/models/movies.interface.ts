export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
    backdrop_path: string;
}
export interface MovieResponse {
    page: number;
    results: Movie [];
    total_pages: number;
    total_results: number;
}