import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent {

  @Input() userID : string | null;
  
  constructor(private route: ActivatedRoute){
    this.userID = this.route.snapshot.paramMap.get('id');
    console.log(this.userID);
  }
}
