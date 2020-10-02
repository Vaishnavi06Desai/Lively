import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  health = "healthy";
  farm = null;

  farms: any;
  types: any;
  breeds: any;
  subbreeds: any;
  userID: any;

  mode: any;
  editfarm: any;
  editid: any;
  editform: any;
  constructor(private route: ActivatedRoute, private router: Router, private db: AngularFirestore, private auth: AuthService) { }

  ngOnInit(): void {
    this.mode = this.route.snapshot.queryParams['mode'];
    this.auth.getUserState()
      .subscribe(user => {
        this.userID = user.uid;
        this.gettypes();
        this.getfarms();
        if (this.mode == "edit") {
          this.editfarm = this.route.snapshot.queryParams['farm'];
          this.editid = this.route.snapshot.queryParams['id'];
          this.edit();
          //console.log(farm, id);
        }
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

  submit() {
    if(this.mode == "edit"){
      this.db.collection('Users').doc(this.userID).collection('Farms').doc(this.editfarm).collection('Livestock').doc(this.editid).delete();
    }
    this.form.get('Type').setValue(this.type);
    this.form.get('Breed').setValue(this.breed);
    this.form.get('SubBreed').setValue(this.subbreed);
    this.form.get('HealthCondition').setValue(this.health);
    return this.db.collection('Users').doc(this.userID).collection('Farms').doc(this.farm).collection('Livestock').add(this.form.value).then( e => {this.router.navigate(['/inventory']);});
  }

  getfarms() {
    return this.db.collection('Users').doc(this.userID).collection('Farms').snapshotChanges().subscribe(res => { this.farms = res; console.log(res[0].payload.doc.data()) });
  }
  submittype(docid) {
    this.typeid = docid;
    return this.db.collection('Users').doc(this.userID).collection('Types').doc(docid).collection('Breed').snapshotChanges().subscribe(res => { this.breeds = res; console.log(res[0].payload.doc.data()) });
  }

  submitbreed(docid) {
    return this.db.collection('Users').doc(this.userID).collection('Types').doc(this.typeid).collection('Breed').doc(docid).collection('SubBreed').snapshotChanges().subscribe(res => { this.subbreeds = res; console.log(res[0].payload.doc.data()) });
  }

  gettypes() {
    return this.db.collection('Users').doc(this.userID).collection('Types').snapshotChanges().subscribe(res => { this.types = res; console.log(res[0].payload.doc.data()) });
  }

  edit() {
    this.db.collection('Users').doc(this.userID).collection('Farms').doc(this.editfarm).collection('Livestock').doc(this.editid).snapshotChanges().subscribe(res => {
      this.editform = res;
      this.form.get('ID').setValue(this.editform.payload.data().ID);
      this.farm = this.editfarm;
      if (this.editform.payload.data().Birth != "None") {
        this.selected1 = "birth";
        this.form.get('Birth').setValue(this.editform.payload.data().Birth);
      }
      if (this.editform.payload.data().Buy != "None") {
        this.selected1 = "buy";
        this.form.get('Buy').setValue(this.editform.payload.data().Buy);
      }
      if (this.editform.payload.data().Type != null) {
        this.db.collection('Users').doc(this.userID).collection('Types', ref => ref.where('Name', '==', this.editform.payload.data().Type)).snapshotChanges().subscribe(res => {
          this.submittype(res[0].payload.doc.id); console.log(res[0].payload.doc.id);
          if (this.editform.payload.data().Breed != null) {
            this.db.collection('Users').doc(this.userID).collection('Types').doc(this.typeid).collection('Breed', ref => ref.where('Name', '==', this.editform.payload.data().Breed)).snapshotChanges().subscribe(res1 => {
               this.submitbreed(res1[0].payload.doc.id); console.log(res1[0].payload.doc.id);
               if (this.editform.payload.data().SubBreed != null)
               {
                this.subbreed = this.editform.payload.data().SubBreed;
                this.form.get('SubBreed').setValue(this.editform.payload.data().SubBreed);
               }
              });
            this.breed = this.editform.payload.data().Breed;
            this.form.get('Breed').setValue(this.editform.payload.data().Breed);
          }
        });
        this.type = this.editform.payload.data().Type;
        this.form.get('Type').setValue(this.editform.payload.data().Type);
      }

      this.form.get('Age').setValue(this.editform.payload.data().Age);
      this.form.get('Weight').setValue(this.editform.payload.data().Weight);
      this.form.get('PlaceOfOrigin').setValue(this.editform.payload.data().PlaceOfOrigin);
      this.form.get('Quantity').setValue(this.editform.payload.data().Quantity);
      this.health = this.editform.payload.data().HealthCondition;
      this.form.get('HealthCondition').setValue(this.editform.payload.data().HealthCondition);
    });
  }
}
