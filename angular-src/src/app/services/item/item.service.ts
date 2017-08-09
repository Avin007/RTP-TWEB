import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ItemService {
  deploiement: any;

  constructor(private http:Http) { }

  //Deploiement
  registerDeploiement(deploiement){
  let headers = new Headers();
    headers.append('Content-Type','application/json');
    //return this.http.post('http://localhost:3000/deploiements/register',deploiement,{headers: headers})
    return this.http.post('deploiements/register',deploiement,{headers: headers})
      .map(res => res.json());
  }
     
  getProfileDeploiement(){
     let headers = new Headers();
     headers.append('Content-Type','application/json');
     //return this.http.get('http://localhost:3000/deploiements/deploiement-profile',{headers: headers})
     return this.http.get('deploiements/deploiement-profile',{headers: headers})
     .map(res => res.json());
  }
}
