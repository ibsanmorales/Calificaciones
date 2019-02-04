import { Component } from '@angular/core';
import { ExcelinfoService } from './services/excelinfo.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private dataexcel: any[]= [];
  private data:File;
  private arr:any[] = [];
  private view_max:any; 
  private view_min:any;
  private view_avge_general:number; 
  private view_avge_grado:any[]=[];

  title = 'summary';

  constructor(private excelData:ExcelinfoService) { 
    
  }
 
  handleFileInput(files: FileList) {
    this.data = files.item(0);
    this.getInfoExcel(this.data);

   };

  
  getInfoExcel(data:File){
   this.excelData.readExcel(data);
      
  }

  chargeinfo(){
    this.validationData();
    this.view_max = this.getmayor(this.arr);
    this.view_avge_general = this.getpromedio();
    this.view_min = this.getmin(this.arr);
    this.view_avge_grado = this.promGrados();
  
  } 

  //validation error file parse
  validationData(){
    if(this.excelData.jsonfile==null){
    console.log("Algo a pasado, porfavor verifica el archivo o su contenido");
    }else{
      this.dataexcel= this.excelData.jsonfile;
      this.arr = Object.keys(this.dataexcel).map(i => this.dataexcel[i])
      
    }

  }
 //max value
  getmayor(arr){
    var max = 0;
    var i =0;
    var nombre=""
     arr.forEach((element, index) => {
     if(max < element["Calificacion"]){
        i= index;
        max=element["Calificacion"];
        nombre=element["Nombres"]+" "+element["Apellido Paterno"]+" "+element["Apellido Materno"];
      }
    });
     return {points:max,id_student:i,nombre:nombre}
  }
 //min value
  getmin(arr){
    var max = 10;
    var i =0;
    var nombre=""
    arr.forEach((element, index) => {
     if(max > element["Calificacion"]){
        i= index;
        max=element["Calificacion"];
        nombre=element["Nombres"]+" "+element["Apellido Paterno"]+" "+element["Apellido Materno"];
      }
    });
    return {points:max,id_student:i,nombre:nombre}
  }

  //general average
  getpromedio(){
    var max = 0;
    var avge= 0;
    
    this.arr.forEach((element) => {
         max+=element["Calificacion"];
     });
    avge=max/this.arr.length ;
      return avge
  }


//get Grado average
  getpromedioGrado(){
    var max = 0;
    var avge= 0;
    
    this.arr.forEach((element) => {
         max+=element["Calificacion"];
     });
    avge=max/this.arr.length ;
    return avge
  }

//get unique Grados types
  uniqueGrado(){ 
    var gradoUnique = this.arr.map(item => item["Grado"])
  .filter((value, index, self) => self.indexOf(value) === index)
  return gradoUnique;
 }

//Get Grado Values 
 getGrado(num){
    var arrGrado = this.arr.filter(function (studentGrado) {
      return studentGrado["Grado"] === num;
    });
     return arrGrado
  };

 //Get Grados Values 
  getGrados(){
    var arrGrados=[];
    var grado = this.uniqueGrado();
    grado.forEach(element => {
      arrGrados.push(this.getGrado(element));
    });  
    return arrGrados
  }

  //Get average Grados Values 
  promGrados(){
    var arr = this.getGrados();
    var promGradoarr;
    var i;
    var avge;
    var gradoAvge:any=[]
    arr.forEach((element, index) =>{
      avge=0
      i=0
      promGradoarr=0
       element.forEach((element2) => {
       promGradoarr += element2["Calificacion"];
       i++ 
      });
      gradoAvge.push(avge={promedio:promGradoarr/i,grado:index+1});
  
    });
    return gradoAvge;
  }
  

}
