import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-newtype',
  templateUrl: './newtype.component.html',
  styleUrls: ['./newtype.component.scss']
})
export class NewtypeComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private db: AngularFirestore, private auth: AuthService) { }

  types: any;
  breeds: any;
  breedid:any;

  type = null;
  breed = null;
  subbreed = null;

  typeid: any;

  isbreed: boolean = false;
  issubreed:boolean = false;

  isnewtype: boolean = false;
  isnewbreed: boolean = false;
  isnewsubbreed: boolean = false;

  userID: any;
  formtype = new FormGroup(
    {
      type: new FormControl(''),
      breed: new FormControl(''),
      subbreed: new FormControl('')
    }
  )
  ngOnInit(): void {
    this.auth.getUserState()
      .subscribe(user => {
        this.userID = user.uid;
        this.gettypes();
      })
  }

  gettypes() {
    return this.db.collection('Users').doc(this.userID).collection('Types').snapshotChanges().subscribe(res => { this.types = res; console.log(res[0].payload.doc.data()) });
  }

  isnewtypefunc(){
    this.isnewtype = true;
  }

  submittype(){
    this.isnewtype = false;
    return this.db.collection('Users').doc(this.userID).collection('Types').add({"Name": this.formtype.get('type').value})
  }

  isnewbreedfunc(){
    this.isnewbreed = true;
  }

  submitbreed(){
    this.isnewbreed = false;
    return this.db.collection('Users').doc(this.userID).collection('Types').doc(this.typeid).collection('Breed').add({"Name": this.formtype.get('breed').value})
  }

  // isnewsubbreedfunc(){
  //   this.isnewsubbreed = true;
  // }

  submitsubbreed(){
    return this.db.collection('Users').doc(this.userID).collection('Types').doc(this.typeid).collection('Breed').doc(this.breedid).collection('SubBreed').add({"Name": this.formtype.get('subbreed').value})
  }

  enternewbreed(docid){
    this.typeid = docid;
    return this.db.collection('Users').doc(this.userID).collection('Types').doc(docid).collection('Breed').snapshotChanges().subscribe(res => { this.breeds = res; console.log(res[0].payload.doc.data()) });
  }

  enternewsubbreed(docid){
    this.isnewsubbreed = true;
    this.breedid = docid;
    console.log("Hii");
    //return this.db.collection('Users').doc(this.userID).collection('Types').doc(this.typeid).collection('Breed').doc(docid).collection('SubBreed').snapshotChanges().subscribe(res => { this.subbreeds = res; console.log(res[0].payload.doc.data()) });
  }

  submit(){
    this.router.navigate(['/inventory']);
  }

}
