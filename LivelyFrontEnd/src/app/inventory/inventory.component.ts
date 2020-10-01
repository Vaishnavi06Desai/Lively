import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  constructor(private router: Router, private db: AngularFirestore, private auth: AuthService) { }

  userID:any;
  farms:any;
  farm = null;
  livestock:any;

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
     console.log("Hii")
    return this.db.collection('Users').doc(this.userID).collection('Farms').doc(farm).collection('Livestock').snapshotChanges().subscribe(res => {this.livestock = res;});
   }

   newrec(){
     this.router.navigate(['/inventory/newrecord']);
   }
}
