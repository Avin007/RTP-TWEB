import { Component, OnInit } from '@angular/core';
import {ItemService} from '../../services/item/item.service';
import {Router} from '@angular/router';
import {Http, Headers} from '@angular/http';

@Component({
  selector: 'app-deploiement-profile',
  templateUrl: './deploiement-profile.component.html',
  styleUrls: ['./deploiement-profile.component.css']
})
export class DeploiementProfileComponent implements OnInit {
  deploiement:Object;

  constructor(
    private itemService: ItemService,
    private router: Router
  ) { }

  ngOnInit() {
    this.itemService.getProfileDeploiement()
    .subscribe(deploiement=>{
      this.deploiement = deploiement;
    },
    err=>{
      console.log(err);
      return false;
    });
  }
}
