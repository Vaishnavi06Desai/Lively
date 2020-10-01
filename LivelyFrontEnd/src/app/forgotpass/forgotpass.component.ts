import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.scss']
})
export class ForgotpassComponent implements OnInit {

  password: boolean = false;
  messagepassword: string;
  
  cpassword: boolean = false;
  messagecpassword: string;

  error: boolean = false;
  errormessage: string;

  code: any;

  constructor(private route: ActivatedRoute, private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    this.code = this.route.snapshot.queryParams['oobCode'];
  }

  form = new FormGroup({
    NewPassword: new FormControl(''),
    ConfirmPassword: new FormControl('')
   })

   validate(){
    var flag = 'true';
    this.cpassword = false;
    this.password = false;
    this.error = false;
    

    if (this.form.get("NewPassword").value == "" || !(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(this.form.get("NewPassword").value)) )                                    
    { 
        //window.alert("Please enter a valid e-mail address."); 
        this.password = true;
        this.messagepassword = "A strong 8 character password must contain at least:[a-z],[A-Z],[0-9],a special character"; 
        flag = 'false'; 
    }
    if (this.form.get("ConfirmPassword").value == "" || !(this.form.get("ConfirmPassword").value))                                   
    { 
        //window.alert("Please enter a valid e-mail address."); 
        this.cpassword = true;
        this.messagecpassword = "Password does not match"
        flag = 'false'; 
    }


     if (flag == 'true') {
      console.log("success");
      this.submit();
     }
  }

  submit() {
    this.auth.newpassword(this.code, this.form.get("NewPassword").value).then(() => this.router.navigate(['/login']))
  .catch(err => {
    console.log(err.code);
    this.error = true;
    this.errormessage = this.auth.Parse(err['code']); // check this helper class at the bottom
  });
  }


}
