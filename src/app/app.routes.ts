import { Routes } from '@angular/router'

import { HomeComponent } from './components/home/home.component'
import { MoviesComponent } from './components/movies/movies.component'
import { TVShowsComponent } from './components/tvshows/tvshows.component'

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
    }
    ,
    {
        path: 'tvshows',
        component: TVShowsComponent,
        title: 'TMDB TV Shows Page',
    }
];

export default routeConfig;
