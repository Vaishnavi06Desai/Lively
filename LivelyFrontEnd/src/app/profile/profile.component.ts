import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private db: AngularFirestore, private auth: AuthService) { }
  user: any;
  userID: any;
  profile: any;
  access: boolean = false;

  ngOnInit(): void {
    this.auth.getUserState()
    .subscribe(user => {
      this.userID = user.uid;
      this.getprofile();
    })
   
  }

  getprofile(){
    return this.db.collection('Users').doc(this.userID).snapshotChanges().subscribe(res => {this.profile = res; if(this.profile.payload.data().role > 0){this.access = true} else{this.access = false}});
  }

}
