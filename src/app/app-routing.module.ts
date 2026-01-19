import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/components/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'registration',
    loadComponent: () =>
      import('./features/auth/components/registration/registration.component').then(
        (m) => m.RegistrationComponent,
      ),
  },
  {
    path: 'articles',
    loadComponent: () =>
      import('./features/articles/components/articles-list/articles.component').then(
        (m) => m.ArticlesComponent,
      ),
  },
  {
    path: 'films',
    loadComponent: () =>
      import('./features/films/components/films-list/films.component').then(
        (m) => m.FilmsComponent,
      ),
  },
  {
    path: 'films/:filmsId',
    loadComponent: () =>
      import('./features/films/components/film-details/film-details.component').then(
        (m) => m.FilmDetailsComponent,
      ),
  },
  {
    path: 'country',
    loadComponent: () =>
      import('./features/country/components/country-list/country.component').then(
        (m) => m.CountryComponent,
      ),
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: '**',
    loadComponent: () =>
      import('./features/page-not-found/page-not-found.component').then(
        (m) => m.PageNotFoundComponent,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
