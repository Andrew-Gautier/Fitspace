import { Component, Injectable, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-slide-component',
  templateUrl: './slide-component.component.html',
  styleUrls: ['./slide-component.component.css']
})
export class SlideComponentComponent implements OnInit {

  @Input() imgData : string;
  @Input() textData : string;

  ngOnInit(): void {
    
  }

  constructor() { 
    this.imgData = "assets/Under-Construction.jpg";
    this.textData = "TEST Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur in iaculis ex. Etiam volutpat laoreet urna.Morbi ut tortor nec nulla commodo malesuada sit amet vel lacus. Fusce eget efficitur libero. Morbi dapibus portaquam laoreet placerat."
  }
}
