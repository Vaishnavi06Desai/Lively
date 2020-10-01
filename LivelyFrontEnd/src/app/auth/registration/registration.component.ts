import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  authError:any;

  error: boolean = false;
  username: boolean = false;
  messageusername: string;
  email: boolean = false;
  messageemail: string;
  contact: boolean = false;
  messagecontact: string;
  password: boolean = false;
  messagepassword: string;
  errormessage: string;

  constructor(private auth: AuthService) { }

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
    })
  }


  form = new FormGroup({
    Username: new FormControl(''),
    Email: new FormControl(''),
    Contact: new FormControl(''),
    Password: new FormControl(''),
    Role: new FormControl(1)
   })

   validate(){
    var flag = 'true';
    this.error = false;
    this.username = false;
    this.email = false;
    this.contact = false;
    this.password = false;
    
    if (this.form.get("Username").value == "" || !(/^[A-Za-z]+$/.test(this.form.get("Username").value)))                                  
    { 
       // window.alert("Please enter a valid first name."); 
        //this.error = true;
        this.username = true;
        this.messageusername = "Invalid username. A username contains only Alphabets and no spaces."
        flag = 'false'; 
    }
    
 
    if (this.form.get("Contact").value == "" || !(/^\d{10}$/.test(this.form.get("Contact").value)) )                           
    { 
        //window.alert("Please enter a valid phone number."); 
        this.contact = true;
        this.messagecontact = "Invalid Phone number. Please enter a 10 digit valid phone number."
        flag = 'false'; 
    } 
   
    if (this.form.get("Email").value == "" || !(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.form.get("Email").value)))                                   
    { 
        //window.alert("Please enter a valid e-mail address."); 
        this.email = true;
        this.messageemail = "Invalid email. Email is badly formatted."
        flag = 'false'; 
    }

    if (this.form.get("Password").value == "" || !(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(this.form.get("Password").value)) )                           
    { 
        this.password = true;
        this.messagepassword = "A strong 8 character password must contain at least:[a-z],[A-Z],[0-9],a special character"; 
        flag = 'false'; 
    }

     if (flag == 'true') {
      console.log("success");
      this.submit();
     }
  }



   submit(){
    this.auth.createUser(this.form.value);
  }
}
