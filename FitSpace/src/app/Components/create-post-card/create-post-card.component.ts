import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-post-card',
  templateUrl: './create-post-card.component.html',
  styleUrls: ['./create-post-card.component.css']
})
export class CreatePostCardComponent implements OnInit{

  @Input() title: string; //username
  @Input() description: string; //input text / caption from user
  @Input() img: string; //img source

  constructor() {
    this.img = "";
    this.description = "No Caption";
    this.title = "@userName";

  }
  
  ngOnInit(): void {

  }

}
