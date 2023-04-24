/* import { Component, OnInit } from '@angular/core'; */
import { Component } from '@angular/core';
//import { MyActivityModel } from '../../Components/my-activity/my-activity.model';
//import { mock_list } from '../../Components/my-activity/mock_list';

declare function getNextActivity(): any;
declare function getNextDuration(): any;

@Component({
  selector: 'app-my-activity-page',
  templateUrl: './my-activity-page.component.html',

  styleUrls: ['./my-activity-page.component.css']
})

export class MyActivityPageComponent {
  chart: any;

  chartOptions = {
    title: {
      text: "Past 7 Workouts"
    },
    animationEnabled: true,
    axisY: {
      includeZero: true,
      suffix: "mins"
    },
    data: [{
      type: "bar",
      indexLabel: "{y}",
      yValueFormatString: "#,###mins",
      dataPoints: [
        { label: getNextActivity(), y: getNextDuration() },
        { label: getNextActivity(), y: getNextDuration() },
        { label: getNextActivity(), y: getNextDuration() },
        { label: getNextActivity(), y: getNextDuration() },
        { label: getNextActivity(), y: getNextDuration() },
        { label: getNextActivity(), y: getNextDuration() },
        { label: getNextActivity(), y: getNextDuration() }
      ]
    }]
  }

  //cards: MyActivityModel[] = [];

  constructor() {
    // for (var item of mock_list) {
    //   console.log(item);
    //   this.cards.push(item);
  }
}