import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {ItemService} from '../../services/item/item.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-deploiement',
  templateUrl: './deploiement.component.html',
  styleUrls: ['./deploiement.component.css'],
})

export class DeploiementComponent implements OnInit {
   user:Object;

  licao: String;
  name_companie: String;
  //login: String = "rasami@airbus.com";
  login: String = this.getLoginUserConnected();
  type_deploiement:String = "Formation";
  name_application: String = "AirFASE";
  date_depart: Date;
  date_retour: Date;
  day_number: Number;
  document: String;


  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private itemService: ItemService,
    private router: Router,
    private authService : AuthService
  ) { }

  ngOnInit() {

  }

  onRegisterSubmit(){
    const deploiement = {
       licao: this.licao,
       name_companie: this.name_companie,
       login: this.login,
       type_deploiement: this.type_deploiement,
       name_application: this.name_application,
       date_depart: this.date_depart,
       date_retour: this.date_retour,
       day_number: this.day_number,
       document: this.document,
    }

    //Required Fields
    if(!this.validateService.validateRegisterDeploiement(deploiement)){
     this.flashMessage.show('Please fill in all fields',{cssClass:'alert-danger', timeout: 3000});
     return false;
    }

      //Register deploiement
    this.itemService.registerDeploiement(deploiement).subscribe(data=> {
    if(data.success){
      this.flashMessage.show('Deployment registered',{cssClass:'alert-success', timeout:3000});
      this.router.navigate(['/deploiement-profile']);
    }else {
      this.flashMessage.show('Something went wrong',{cssClass:'alert-danger', timeout:3000});
      this.router.navigate(['/deploiement']);
      }
    });
  }

  getLoginUserConnected(){
      let goal = "{L_USERNAME}";
      return goal; 
    }
}
