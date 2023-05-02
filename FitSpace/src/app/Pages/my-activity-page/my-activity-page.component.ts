import { Component, OnInit } from '@angular/core';
//import CanvasJS from 'canvasjs';
//import * as CanvasJSAngularChart from '../../../assets/canvasjs.angular.component';
//var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;
//var CanvasJS = require('canvasjs');

declare var myActivity: any;

declare function getNextActivity(): any;
declare function getNextDuration(): any;

@Component({
  selector: 'app-my-activity-page',
  templateUrl: './my-activity-page.component.html',
  styleUrls: ['./my-activity-page.component.css']
})

export class MyActivityPageComponent implements OnInit {
  sun = 0;
  mon = 0;
  tue = 0;
  wed = 0;
  thu = 0;
  fri = 0;
  sat = 0;

  max = 7;

  activities = Array<any>;
  durations = Array<any>;

  chart: any;

  // Default data points (to present an initial "interesting" bar graph)
  dps = [
    { label: "Saturday", y: 73 },
    { label: "Friday", y: 20 },
    { label: "Thursday", y: 24 },
    { label: "Wednesday", y: 29 },
    { label: "Tuesday", y: 19 },
    { label: "Monday", y: 33 },
    { label: "Sunday", y: 13 }
  ];

  chartOptions = {
    title: {
      text: "Workout comparison by day"
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
      dataPoints: this.dps,
    }]
  }

  getChartInstance(chart: object) {
    this.chart = chart;
    console.log("getChartInstance called");
    //setTimeout(this.updateChart, 1000);
    //this.chart.render();
  }

  //updateChart = () => {
  //this.chart.render();
  //  setTimeout(this.updateChart, 1000); //Chart updated every 1 second
  //}

  ngOnInit() {
    myActivity = this;
  }

  ngOnDestroy(): any {
    myActivity = null;
  }

  workoutData() {
    var sunWork = (document.getElementById("sunday") as HTMLInputElement).value;
    var monWork = (document.getElementById("monday") as HTMLInputElement).value;
    var tueWork = (document.getElementById("tuesday") as HTMLInputElement).value;
    var wedWork = (document.getElementById("wednesday") as HTMLInputElement).value;
    var thuWork = (document.getElementById("thursday") as HTMLInputElement).value;
    var friWork = (document.getElementById("friday") as HTMLInputElement).value;
    var satWork = (document.getElementById("saturday") as HTMLInputElement).value;

    console.log("Sunday: " + sunWork);
    console.log("Monday: " + monWork);
    console.log("Tuesday: " + tueWork);
    console.log("Wednesday: " + wedWork);
    console.log("Thursday: " + thuWork);
    console.log("Friday: " + friWork);
    console.log("Saturday: " + satWork);

    if (sunWork == null || Number.isNaN(Number(sunWork))) { sunWork = "0"; }
    if (monWork == null || Number.isNaN(Number(monWork))) { monWork = "0"; }
    if (tueWork == null || Number.isNaN(Number(tueWork))) { tueWork = "0"; }
    if (wedWork == null || Number.isNaN(Number(wedWork))) { wedWork = "0"; }
    if (thuWork == null || Number.isNaN(Number(thuWork))) { thuWork = "0"; }
    if (friWork == null || Number.isNaN(Number(friWork))) { friWork = "0"; }
    if (satWork == null || Number.isNaN(Number(satWork))) { satWork = "0"; }

    this.dps[0] = { label: "Sunday", y: Number(sunWork) };
    this.dps[1] = { label: "Monday", y: Number(monWork) };
    this.dps[2] = { label: "Tuesday", y: Number(tueWork) };
    this.dps[3] = { label: "Wednesday", y: Number(wedWork) };
    this.dps[4] = { label: "Thursday", y: Number(thuWork) };
    this.dps[5] = { label: "Friday", y: Number(friWork) };
    this.dps[6] = { label: "Saturday", y: Number(satWork) };

    console.log(this.dps);

    this.chart.render();

    var total = Number(sunWork) + Number(monWork) + Number(tueWork) + Number(wedWork) + Number(thuWork) + Number(friWork) + Number(satWork);
    console.log("Weekly total: " + total + " minutes");

    const totalMessage: HTMLElement = (document.getElementById("totalMessage") as HTMLElement);
  
    totalMessage.innerHTML = "Total workout duration this week is " + total + " minutes.";
    console.log("TotalMessage: " + totalMessage.innerHTML);
  }

  async refreshChart() {
    
    this.chart.options = {
      title: {
        text: "Workout comparison by day"
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
        dataPoints: this.dps,
      }]

    };

    console.log("Refresh button pressed");

    this.chart.render();
  
    console.log(this.chart);
  }
}