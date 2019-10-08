import { Component } from '@angular/core';
import { DatabaseService } from "./database.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'movieAng';
  section = 1;

  actorsDB: any[] = [];
  moviesDB: any[] = [];

  actorsTwoMovie: any[] = [];

  actorId: string = "";
  movieId: string = "";

  actorName: string = "";
  

  constructor(private dbService: DatabaseService) {}

  ngOnInit() {
    this.onGetMovies();
    this.onGetActors();
  }

  changeSection(sectionNo){
    this.section = sectionNo;
    if (sectionNo == 2){
      this.onTwoMovies();
    }
  }
  
  onGetActors(){
    this.dbService.getActors().subscribe(function(data: any[]){
      this.actorsDB = data;
    })
  }

  onGetMovies(){
    this.dbService.getMovies().subscribe(function(data: any[]){
      this.moviesDB = data;
    })
  }

  onActorSelect(item){
    this.dbService.getActors().subscribe(function(data: any[]){
      this.actorsDB = data;
      this.actorId = item._id;

    })
  }

  onMovieSelect(item){
    this.dbService.getMovies().subscribe(function(data: any[]){
      this.moviesDB = data;
      this.movieId = item._id;

    })
  }

  onActorMovie(){
    this.dbService.addActorToMovie(this.actorId, this.movieId).subscribe(result => {
      
    })
  }
  
  onTwoMovies(){
    this.dbService.getActors().subscribe(function(data: any[]){
      this.actorsTwoMovie = data;
    })
    let index = 0;
    while( index < this.actorsTwoMovie.length){
      if (this.actorsTwoMovie[index].movies.length < 2){
        this.dbService.deleteActor(this.actorsTwoMovie[index]._id).subscribe(result => {
          this.onGetActors();
        })
      }
      index++;
    }
  }

}
