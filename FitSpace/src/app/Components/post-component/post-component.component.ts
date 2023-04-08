import { Component } from '@angular/core';
import { mock_list_slides } from './mock_list';
@Component({
  selector: 'app-post-component',
  templateUrl: './post-component.component.html',
  styleUrls: ['./post-component.component.css']
})
export class PostComponentComponent {
  slides = mock_list_slides;
}
