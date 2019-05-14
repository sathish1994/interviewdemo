import { Component ,OnInit} from '@angular/core';
import { Http, Response ,Headers} from "@angular/http";
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import { Service } from './service';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  weather:any;
  city:any;
  panelId:any;
  constructor( private http: Http,private service: Service,) {
    this.city = {cityName:''};
      this.weather = [{celsius:0,weatherStatus:'-',city:'Click here to enter City'},
      {celsius:0,weatherStatus:'-',city:'Click here to enter City'},
      {celsius:0,weatherStatus:'-',city:'Click here to enter City'},
      {celsius:0,weatherStatus:'-',city:'Click here to enter City'},
      {celsius:0,weatherStatus:'-',city:'Click here to enter City'},
      {celsius:0,weatherStatus:'-',city:'Click here to enter City'},
      {celsius:0,weatherStatus:'-',city:'Click here to enter City'},
      {celsius:0,weatherStatus:'-',city:'Click here to enter City'},
      {celsius:0,weatherStatus:'-',city:'Click here to enter City'}]      
  }
  apiCityUrl:any;
    ngOnInit(){      
      var d = new Date();
      var n = d.getHours(); 
      var getData =  localStorage.getItem('weatherShow');
      if(getData != null){
        var weather = localStorage.getItem('weatherData');
        this.weather =  JSON.parse(weather);
      }     
    }
    cityChange(id){
      this.panelId = id;
      $("#citymodal").modal('show');
    }
    GetcityWeather(cityName){   
      var id = this.panelId;
      this.apiCityUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&units=metric&appid=de6d52c2ebb7b1398526329875a49c57';
    var cityArray =[];
      this.service.getCityService(this.apiCityUrl)
      .subscribe((data) => {
        if(data.cod == '200'){
          for(var i=0; i <= 3; i++){
              cityArray.push(data.list[i])
          }
          var celsius = '';
          var weatherStatus = '';
          var city = '';
          cityArray.forEach(function(weadata){
            var d = new Date();
            var n = d.getHours(); 
              var date = weadata.dt_txt;
              var date1 = date.split(' ');
              var minu = date1[1].split(':');
              var hour = minu[0];
              var hourVal = 0;
              
              if(n > 0 && n < 3){
                hourVal = 3; 
              } else if(n > 3 && n <= 6){
                hourVal = 6;
              } else if(n > 6 && n <= 9){
                hourVal = 9;
              } else if(n > 9 && n <= 12){
                hourVal = 12;
              } else if(n > 12 && n <= 15){
                hourVal = 15;
              } else if(n > 15 && n <= 18){
                hourVal = 18;
              } else if(n > 18 && n <= 21){
                hourVal = 21;
              } else if(n > 21 && n <= 24){
                hourVal = 24;
              }        
              
              if(hourVal == hour){      
                celsius = weadata.main.temp_max;
                weatherStatus = weadata.weather[0].description;
                city = data.city.name;               
              }

             
          });
          
          this.weather.forEach(function(insertData,index){
            if(id == index){
              insertData.celsius = celsius;
              insertData.weatherStatus = weatherStatus;
              insertData.city = city;
            }
            
          });
          this.city = {cityName:''};
          localStorage.setItem('weatherData',JSON.stringify( this.weather));
          localStorage.setItem('weatherShow','1');
          this.autoWeatherData();
          $("#citymodal").modal('hide');
        }else{
          alert('City not found');
        }   
      }), error => {
       alert(error);
      };
    } 
    
    editCity(cityValue){
      $("#citymodal").modal('show');
        this.city.cityName = cityValue;
    }
    
   autoWeatherData(){
    let timer=300000;
    console.log(timer);
    
		var timeCheckerSubscription = Observable.interval(timer).subscribe(() => {
      //timeCheckerSubscription.unsubscribe();
        var weatherdata = this.weather;
        for(var i=0; i<this.weather.length; i++){
          var id = i;          
         
          var cityName = this.weather[i].city;
         
            if(cityName != 'Click here to enter City'){
              
                var returndat = this.getautoweatherData(cityName);  
                console.log(returndat);  
                if(returndat.celsius != ''){
                  weatherdata[i].celsius = returndat.celsius;
                  weatherdata[i].weatherStatus = returndat.weatherStatus;
                  weatherdata[i].city = returndat.city; 
                  localStorage.setItem('weatherData',JSON.stringify( this.weather));
                  localStorage.setItem('weatherShow','1');
                }                  
               
            }   
        }
    });
   }
weatharAuto:any;
   getautoweatherData(cityName){
    var apiCityUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&units=metric&appid=de6d52c2ebb7b1398526329875a49c57';
    var cityArray =[];
    var celsius = '';
    var weatherStatus = '';
    var city = '';
    var new_obj = {celsius:'',weatherStatus:'',city:''}  
    this.service.getCityService(apiCityUrl)
    .subscribe((data) => {
      if(data.cod == '200'){
        for(var i=0; i <= 3; i++){
            cityArray.push(data.list[i])
        }
        cityArray.forEach(function(weadata){
            var d = new Date();
            var n = d.getHours(); 
            var date = weadata.dt_txt;
            var date1 = date.split(' ');
            var minu = date1[1].split(':');
            var hour = minu[0];  
            var hourVal = 0;
            if(n > 0 && n < 3){
              hourVal = 3; 
            } else if(n > 3 && n <= 6){
              hourVal = 6;
            } else if(n > 6 && n <= 9){
              hourVal = 9;
            } else if(n > 9 && n <= 12){
              hourVal = 12;
            } else if(n > 12 && n <= 15){
              hourVal = 15;
            } else if(n > 15 && n <= 18){
              hourVal = 18;
            } else if(n > 18 && n <= 21){
              hourVal = 21;
            } else if(n > 21 && n <= 24){
              hourVal = 24;
            }    
            if(hourVal == hour){ 
              new_obj.celsius = weadata.main.temp_max;
              new_obj.weatherStatus = weadata.weather[0].description;
              new_obj.city = data.city.name; 
              sessionStorage.setItem('autodata',JSON.stringify(new_obj)) ;              
            }          
        }); 
                    
      } 
    });
    return new_obj;
   }
}
