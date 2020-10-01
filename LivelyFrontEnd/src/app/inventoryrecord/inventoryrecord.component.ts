import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-inventoryrecord',
  templateUrl: './inventoryrecord.component.html',
  styleUrls: ['./inventoryrecord.component.scss']
})
export class InventoryrecordComponent implements OnInit {

  selected1 = null;
  type = null;
  typeid;
  breed = null;
  subbreed = null;
  health = null;
  farm = null;

  farms: any;
  types: any;
  breeds:any;
  subbreeds:any;
  userID: any;
  constructor(private router: Router, private db: AngularFirestore, private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.getUserState()
    .subscribe(user => {
      this.userID = user.uid;
      this.gettypes();
      this.getfarms();
    })
  }

  form = new FormGroup({
    ID: new FormControl(''),
    Birth: new FormControl('None'),
    Buy: new FormControl('None'),
    // Death: new FormControl(''),
    // Sell: new FormControl(''),
    Age: new FormControl(''),
    Weight: new FormControl(''),
    PlaceOfOrigin: new FormControl(''),
    Type: new FormControl(''),
    Breed: new FormControl(''),
    SubBreed: new FormControl('None'),
    HealthCondition: new FormControl(''),
    Quantity: new FormControl(1),
   })

   form2 = new FormGroup({
    Entry: new FormControl(''),
    Exit: new FormControl(''),
   })

   submit(){
     if(this.selected1 == 'birth') this.form.get('Birth').setValue(this.selected1);
     else this.form.get('Buy').setValue(this.selected1);
     this.form.get('Type').setValue(this.type);
     this.form.get('Breed').setValue(this.breed);
     this.form.get('SubBreed').setValue(this.subbreed);
     this.form.get('HealthCondition').setValue(this.health);
     return this.db.collection('Users').doc(this.userID).collection('Farms').doc(this.farm).collection('Livestock').add(this.form.value);
   }

   getfarms(){
    return this.db.collection('Users').doc(this.userID).collection('Farms').snapshotChanges().subscribe(res => {this.farms = res; console.log(res[0].payload.doc.data())});
   }
   submittype(docid){
     this.typeid = docid;
    return this.db.collection('Users').doc(this.userID).collection('Types').doc(docid).collection('Breed').snapshotChanges().subscribe(res => {this.breeds = res; console.log(res[0].payload.doc.data())});
   }

   submitbreed(docid){
    return this.db.collection('Users').doc(this.userID).collection('Types').doc(this.typeid).collection('Breed').doc(docid).collection('SubBreed').snapshotChanges().subscribe(res => {this.subbreeds = res; console.log(res[0].payload.doc.data())});
   }

   gettypes(){
    return this.db.collection('Users').doc(this.userID).collection('Types').snapshotChanges().subscribe(res => {this.types = res; console.log(res[0].payload.doc.data())});
   }
}
