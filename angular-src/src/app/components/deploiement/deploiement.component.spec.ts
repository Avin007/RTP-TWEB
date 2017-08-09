/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DeploiementComponent } from './deploiement.component';

describe('DeploiementComponent', () => {
  let component: DeploiementComponent;
  let fixture: ComponentFixture<DeploiementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeploiementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeploiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
