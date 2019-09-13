import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-Register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister =  new EventEmitter();

  model: any = {};
  constructor(private authServive: AuthService) { }

  ngOnInit() {
  }

  register() {
    this.authServive.register(this.model).subscribe(() => {
      console.log('registration successful');
    },error => {
      console.log(error);
    }
    );


    console.log(this.model);
  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log('cancelled');
  }

}
