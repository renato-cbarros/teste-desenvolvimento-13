import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Movie {
  nome: string;
  ano: string;
  diretor: string;
  genero: string;
  descricao: string;
  poster: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private readonly URL = `assets/json/FILMES.JSON`;

  movies$!: Observable<Movie[]>;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.movies$ = this.listMovies();
  }

  listMovies = () =>
    this.httpClient
      .get<Movie[]>(this.URL)
      .pipe(
        map((res: Movie[]) =>
          res.sort((a: Movie, b: Movie) =>
            a.nome > b.nome ? 1 : b.nome > a.nome ? -1 : 0
          )
        )
      );
}
