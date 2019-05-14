import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
@Injectable()
export class Service {    
   
    constructor(private _http: Http) {
        
    }   
    
    getCityService(data){        
        
        var getmappinglistdata= this._http.get(data)
        .map((res: Response) => res.json());        
        return getmappinglistdata;
    }
    
}

