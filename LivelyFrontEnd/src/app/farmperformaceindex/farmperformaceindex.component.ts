import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-farmperformaceindex',
  templateUrl: './farmperformaceindex.component.html',
  styleUrls: ['./farmperformaceindex.component.scss']
})
export class FarmperformaceindexComponent implements OnInit {

  public doughnutChartLabels_p = ['Poor', 'Average', 'Good', 'Healthy'];
  public doughnutChartData_p = [100, 150, 180, 110];
  public doughnutChartType_p = 'pie';

  public doughnutChartLabels_c = ['Poor', 'Average', 'Good', 'Healthy'];
  public doughnutChartData_c = [90, 110, 220, 120];
  public doughnutChartType_c = 'pie';

  public doughnutChartLabels_pi = ['Poor', 'Average', 'Good', 'Healthy'];
  public doughnutChartData_pi = [80, 170, 200, 90];
  public doughnutChartType_pi = 'pie';

  public doughnutChartLabels_g = ['Poor', 'Average', 'Good', 'Healthy'];
  public doughnutChartData_g = [120, 130, 140, 150];
  public doughnutChartType_g = 'pie';

  public radarChartLabels = ['Poultry', 'Cattle', 'Pigs', 'Goats'];
  public radarChartData = [
    {data: [70, 110, 90, 60], label: '2018'},
    {data: [120, 130, 110, 70], label: '2019'},
    {data: [90, 150, 150, 85], label: '2020'}
  ];
  public radarChartType = 'radar';

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['Poultry', 'Cattle', 'Pigs', 'Goat'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [10, 25, 12, 7], label: 'Male'},
    {data: [8, 20, 15, 5], label: 'Female'}
  ];
  constructor() { }

  ngOnInit(): void {
  }

}


