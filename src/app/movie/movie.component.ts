import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database.service";
import { log } from 'util';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  constructor(private dbService: DatabaseService) {}

  ngOnInit() {
    this.onGetMovies();
  }

  moviesDB: any[] = [];
  section = 1;
  
  title: string = "";
  year: number = 0;
  aYear: number = 0;
  
  changeSection(sectionId) {
    this.section = sectionId;
    this.resetValues();
  }
  resetValues() {
    this.title = "";
    this.year = 0;
  }
  //Get all Movies
  onGetMovies(){
    this.dbService.getMovies().subscribe((data: any[]) =>{
      this.moviesDB = data;
    })
  }

  // Create a new Movie, POST request
  onSaveMovie() {
    let obj = {title: this.title, year: this.year };
    this.dbService.createMovie(obj).subscribe(result => {
      this.onGetMovies();
    })
  }

  // Delete a movie
  onDeleteMovie(item){
    this.dbService.deleteMovie(item._id).subscribe(result => {
      console.log("hi" + result);
      
      this.onGetMovies();
    })
  }


  //Delete movies before a year
  deleteBeforeYear(){
    let index = 0;
    
    while( index < this.moviesDB.length){      
      if( this.moviesDB[index].year < this.aYear){
        this.dbService.deleteMovie(this.moviesDB[index]._id).subscribe(result => {
          this.onGetMovies();
        })
      }
      index++;
    }
  }

  

}
