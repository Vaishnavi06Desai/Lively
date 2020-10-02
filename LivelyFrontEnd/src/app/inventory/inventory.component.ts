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

  ipfarmname: Boolean = false;

  farmname = "Farm Name"

  ngOnInit(): void {
    this.auth.getUserState()
    .subscribe(user => {
      this.userID = user.uid;
      this.getfarms();
    })
  }

  form = new FormGroup(
    {
      Farm: new FormControl('')
    }
  )
  getfarms(){
    return this.db.collection('Users').doc(this.userID).collection('Farms').snapshotChanges().subscribe(res => {this.farms = res;});
   }

   getrecords(farm){
     this.farmname = farm;
     this.farm = farm;
    return this.db.collection('Users').doc(this.userID).collection('Farms').doc(farm).collection('Livestock').snapshotChanges().subscribe(res => {this.livestock = res;});
   }

   edit(record){
    var myurl = `/inventory/newrecord?mode=edit&farm=${this.farm}&id=${record.payload.doc.id}`;
    this.router.navigateByUrl(myurl);
   }

   newrec(){
     //this.router.navigate(['/newrecord?mode=new']);
     this.router.navigateByUrl('/inventory/newrecord?mode=new');
   }

   ipfarm(){
    this.ipfarmname = true;
   }

   newfarm(){
    this.db.collection('Users').doc(this.userID).collection('Farms').doc(this.form.get('Farm').value).set({}).then(e => {this.ipfarmname = false});
   }

   deletefarm(id){
    this.db.collection('Users').doc(this.userID).collection('Farms').doc(id).delete();
   }

   delete(record){
    this.db.collection('Users').doc(this.userID).collection('Farms').doc(this.farm).collection('Livestock').doc(record.payload.doc.id).delete().then().catch(e => {console.log(e)});
   }

   newtype(){
     this.router.navigate(['/inventory/newtype']);
   }
}
