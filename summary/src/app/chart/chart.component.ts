import { Component, Input, OnChanges, SimpleChanges, } from '@angular/core';
import { student } from '../models/studet';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']

})


export class ChartComponent implements OnChanges {
   @Input() dataexcel:student[]; 
   @Input() arr:any[]; 
   @Input() view_max:any[]; 
   @Input() view_min:any[]; 
   @Input() view_avge_general:number; 
   @Input() view_avge_grado:any[];

 //Bar chart graphic
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = [];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
  public barChartData:any[] = [{data:[],label:""}];;

//Pie chart graphic
  public pieChartOption:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public pieChartLabels:string[] = [];
  public pieChartType:string = 'pie';
  public pieChartLegend:boolean = true;
  public pieChartData:any[] = [{data:[],label:""}];
 

  constructor() { 
    
  }

  ngOnChanges(changes: SimpleChanges) {
   
    for (let propName in changes) {  
      let change = changes[propName];
     
      let calificanes = this.arr.map(a => a["Calificacion"]);
      let nombres = this.arr.map(a => a["Nombres"]);
           
      this.barChartData[0].data=calificanes;
      this.barChartData[0].label="Alumno"
      this.barChartLabels=nombres;

      let grado = this.view_avge_grado.map(a => a["grado"]);
      let promedioGrado = this.view_avge_grado.map(a => a["promedio"]);
      
      this.pieChartData[0].data=promedioGrado;
      this.pieChartData[0].label="Grados";
      this.pieChartLabels=grado;
              
         }


  }

}

