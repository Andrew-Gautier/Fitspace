import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-exercise-post-card',
  templateUrl: './exercise-post-card.component.html',
  styleUrls: ['./exercise-post-card.component.css']
})
export class ExercisePostCardComponent implements OnInit {


  @Input() title: string;
  @Input() description: string;
  @Input() img: string;


  constructor(){
    this.img = "No img found";
    this.description = "No description found";
    this.title = "No title found";

  }

  ngOnInit(): void {
  }
}
