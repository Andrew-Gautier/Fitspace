import { Component, Input } from '@angular/core';
import { mock_list_slides } from './mock_list';
import { Router } from '@angular/router';
import { SlideData } from 'src/app/Database/slideData';
import { POST_MANAGER } from 'src/main';
@Component({
  selector: 'app-post-component',
  templateUrl: './post-component.component.html',
  styleUrls: ['./post-component.component.css']
})
export class PostComponentComponent {
  //slides = mock_list_slides;

  @Input() PostTitle : string;
  @Input() Slides : SlideData[];
  @Input() Username : string;
  @Input() PostID : string;

  constructor(private router: Router){
    this.Slides = mock_list_slides;
    this.PostTitle = "Missing Post";
    this.Username = "Missing User";
    this.PostID = "0";

    //console.log(this.PostID);
    //console.log(this.Slides);

    // setTimeout(() => {
    //   this.updateSlides();
    // }, 100);
  }

  // async updateSlides(){

  //   let data = await POST_MANAGER.loadData(this.PostID);
  //   this.Slides = data.slides;
  // }

  //This routes to a new unique page based on id 
  viewComments(id: string): void {
    this.router.navigate(['comments', id]);
  }
}
