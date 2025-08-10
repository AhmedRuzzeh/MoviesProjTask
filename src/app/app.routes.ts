import { Routes } from '@angular/router'

import { HomeComponent } from './components/home/home.component'
import { MoviesComponent } from './components/movies/movies.component'
import { TVShowsComponent } from './components/tvshows/tvshows.component'
import { DetailsComponent } from './components/details/details.component'
import { NewMovieComponent } from './components/new-movie/new-movie.component'

const routeConfig: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'TMDB Home Page',
    },
    {
        path: 'movies',
        component: MoviesComponent,
        title: 'TMDB Movies Page',
    },
    {
        path: 'tvshows',
        component: TVShowsComponent,
        title: 'TMDB TV Shows Page',
    },
    {
        path: 'details/:type/:id',
        component: DetailsComponent,
        title: 'TMDB Details Page',
    },
    {
        path: 'newmovie',
        component: NewMovieComponent,
        title: 'TMDB New Movie Page'
    }
];

export default routeConfig;