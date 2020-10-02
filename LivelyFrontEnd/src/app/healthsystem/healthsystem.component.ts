import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-healthsystem',
  templateUrl: './healthsystem.component.html',
  styleUrls: ['./healthsystem.component.scss']
})
export class HealthsystemComponent implements OnInit {

  constructor(private router: Router, private db: AngularFirestore, private auth: AuthService) { }

  userID:any;
  farms:any;
  farm = null;
  livestock:any;

  farmname = "Farm Name"

  ngOnInit(): void {
    this.auth.getUserState()
    .subscribe(user => {
      this.userID = user.uid;
      this.getfarms();
    })
  }

  getfarms(){
    return this.db.collection('Users').doc(this.userID).collection('Farms').snapshotChanges().subscribe(res => {this.farms = res;});
   }

   getrecords(farm){
     this.farmname = farm;
     this.farm = farm;
    return this.db.collection('Users').doc(this.userID).collection('Farms').doc(farm).collection('Livestock').snapshotChanges().subscribe(res => {this.livestock = res;});
   }

   update(record){
     var myurl = `/animalwelfare/healthrecord?farm=${this.farm}&id=${record.payload.doc.id}`;
     this.router.navigateByUrl(myurl);
   }

}
