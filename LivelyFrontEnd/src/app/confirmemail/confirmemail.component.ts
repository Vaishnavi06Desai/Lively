import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-confirmemail',
  templateUrl: './confirmemail.component.html',
  styleUrls: ['./confirmemail.component.scss']
})
export class ConfirmemailComponent implements OnInit {

  error: boolean = false;
  errormessage: string;
  email: boolean = false;
  messageemail: string;
  success: boolean = false;

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    
  }

  form = new FormGroup({
    Email: new FormControl(''),
   })

   validate(){
    var flag = 'true';
    this.error = false;
    this.email = false;
    this.success = false;
    
    if (this.form.get("Email").value == "" || !(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.form.get("Email").value)))                                   
    { 
        //window.alert("Please enter a valid e-mail address."); 
        this.email = true;
        this.messageemail = "Email badly formatted."
        flag = 'false'; 
    }


     if (flag == 'true') {
      this.submit();
     }
  }

  submit() {
   this.auth.resetpass(this.form.get("Email").value).then(
    () => {
      this.success = true;
      // success, show some message
    },
    err => {
      this.errormessage = this.auth.Parse(err['code']);
      this.error = true;
      // handle errors
    }
  );
  }

}
