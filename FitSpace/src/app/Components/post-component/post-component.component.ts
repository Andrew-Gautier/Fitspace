import { Component, Input } from '@angular/core';
import { mock_list_slides } from './mock_list';
import { Router } from '@angular/router';
@Component({
  selector: 'app-post-component',
  templateUrl: './post-component.component.html',
  styleUrls: ['./post-component.component.css']
})
export class PostComponentComponent {
  slides = mock_list_slides;

  @Input() PostTitle : string;
  @Input() Slides : any[];
  @Input() Username : string;
  @Input() PostID : string;

  constructor(private router: Router){
    this.Slides = mock_list_slides;
    this.PostTitle = "Missing Post";
    this.Username = "Missing User";
    this.PostID = "0";
  }

  //This routes to a new unique page based on id 
  viewComments(id: string): void {
    this.router.navigate(['comments', id]);
  }
}
