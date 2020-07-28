import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  aboutMode = false;
  constructor(private http: HttpClient) { }

  ngOnInit() {

  }

  registerToggle() {
    this.registerMode = true;
  }

  aboutToogle() {
    this.aboutMode = true;
  }

  cancelRegisterMode(registerMode: boolean) {
    this.registerMode = registerMode;
  }

  cancelAboutMode(aboutMode: boolean) {
    this.aboutMode = aboutMode;
  }



}
