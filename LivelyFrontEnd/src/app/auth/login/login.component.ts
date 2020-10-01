import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  authError: any;
  user:any;

  error: boolean = false;
  email: boolean = false;
  messageemail: string;
  password: boolean = false;
  messagepassword: string;
  errormessage: string;


  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.error = false;
    this.auth.eventAuthError$.subscribe(data => {
      this.authError=data
      if(data['code']){
        this.errormessage = this.auth.Parse(data['code']);
        console.log(this.errormessage);
        if(this.errormessage != '')
          this.error = true;
      }
    });
    this.auth.getUserState()
    .subscribe( user => {
      this.user = user;
      if(user)
      {
        this.router.navigate(['/home']);
      }
    })
  }

  form = new FormGroup({
    Email: new FormControl(''),
    Password: new FormControl('')
   })

   validate(){
    var flag = 'true';
    this.error = false;
    this.email = false;
    this.password = false;
   
    if (this.form.get("Email").value == "" || !(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.form.get("Email").value)))                                   
    { 
        //window.alert("Please enter a valid e-mail address."); 
        this.email = true;
        this.messageemail = "Email badly formatted."
        flag = 'false'; 
    }

    if (this.form.get("Password").value == "")                                   
    { 
        //window.alert("Please enter a valid e-mail address."); 
        this.password = true;
        this.messagepassword = "Password cannot be blank."
        flag = 'false'; 
    }


     if (flag == 'true') {
      console.log("success");
      this.submit();
     }
  }

  submit() {
    this.auth.login(this.form.value);
  }


}
