import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import {Location} from '@angular/common';
import { tap, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-healthform',
  templateUrl: './healthform.component.html',
  styleUrls: ['./healthform.component.scss']
})
export class HealthformComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private db: AngularFirestore, private auth: AuthService, 
    private storage: AngularFireStorage, private _location: Location) { }

  userID: any;
  farm: any;
  id: any;

  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadUrl;

  health = "healthy"

  canbepregnant = true;

  isvaccination = false;
  ischeckup = false;
  ismedrep = false;
  isdisease = false;
  ispregnancy = false;

  cusfileToUpload: any;
  mrfileToUpload: any;
  vsfileToUpload: any;
  pcsfileToUpload: any;

  link: any;
  islink: boolean = false;

  ngOnInit(): void {
    this.auth.getUserState()
      .subscribe(user => {
        this.userID = user.uid;
        this.farm = this.route.snapshot.queryParams['farm'];
        this.id = this.route.snapshot.queryParams['id'];
        this.link = `http://localhost:4200/animalwelfare/healthrecord?farm=${this.farm}&id=${this.id}`
        this.canbepregnantfunc();
        //console.log(farm, id);
      })
  }

  canbepregnantfunc(){
    this.db.collection('Users').doc(this.userID).collection('Farms').doc(this.farm).collection('Livestock').doc(this.id).snapshotChanges().subscribe(res => {
      var dets;
      dets = res;
      if(dets.payload.data().Gender == "male") this.canbepregnant = false; 
    })
  }
  

  form = new FormGroup({
    HealthCondition: new FormControl(''),
    Disease: new FormControl(''),
    VaccinationDescription: new FormControl(''),
    VaccinationDate: new FormControl(''),
    PregnancyDueDate: new FormControl(''),
    PregnancyMedicationDetails: new FormControl(''),
  })

  files = new FormGroup({
    CheckupSchedule: new FormControl(''),
    MedialReport: new FormControl('None'),
    VaccinationSchedule: new FormControl('None'),
    PregnancyCheckupSchedule: new FormControl(''),
  })

  cus(files: FileList) {
    this.cusfileToUpload = files.item(0);
  }

  mr(files: FileList) {
    this.mrfileToUpload = files.item(0);
  }

  vs(files: FileList) {
    this.vsfileToUpload = files.item(0);
  }

  pcs(files: FileList) {
    this.pcsfileToUpload = files.item(0);
  }

  uploadfiles(fileToUpload, key, hrid, type) {
    const path = `${this.userID}/${this.id}/health/${type}/${fileToUpload.name}`;
    const ref = this.storage.ref(path);
    this.task = this.storage.upload(path, fileToUpload);
    this.percentage = this.task.percentageChanges();
    this.task.snapshotChanges().subscribe(
      ress => {
        ref.getDownloadURL().subscribe(res => {
          console.log(res);
          var temp = {}
          temp[key] = res;
          this.db.collection('Users').doc(this.userID).collection('Farms').doc(this.farm).collection('Livestock').doc(this.id).collection('HealthRecords').doc(hrid).update(temp).then(e => {
          }).catch(e => { console.log(e) });
          //this.db.collection('Files').add({Url: res})});
        });
      });
  }
  submit() {
    console.log(this.farm, this.id)
    this.form.get('HealthCondition').setValue(this.health);
    this.db.collection('Users').doc(this.userID).collection('Farms').doc(this.farm).collection('Livestock').doc(this.id).update({ HealthCondition: this.health }).then(e => {
      var date = Date();
      this.db.collection('Users').doc(this.userID).collection('Farms').doc(this.farm).collection('Livestock').doc(this.id).collection('HealthRecords').doc(date).set(this.form.value).then(e => {
        this.upload(date);
      })
    }).catch(e => {
      console.log("1", e)
    })
    this._location.back();
  }
  
  upload(id) {
    if (this.cusfileToUpload != null) {
      this.uploadfiles(this.cusfileToUpload, "CheckUpSchedule", id, "CheckupSchedule");
    }
    if (this.mrfileToUpload != null) {
      this.uploadfiles(this.mrfileToUpload, "MedicalReport", id, "MedicalReport");
    }
    if (this.vsfileToUpload != null) {
      this.uploadfiles(this.vsfileToUpload, "VaccinationSchedule", id, "VaccinationSchedule");
    }
    if (this.pcsfileToUpload != null) {
      this.uploadfiles(this.pcsfileToUpload, "PregnancyCheckUpchedule", id, "PregnancyCheckupSchedule");
    }
  }

  flipvaccination(bool) {
    this.isvaccination = !bool;
  }

  flippregnancy(bool) {
    this.ispregnancy = !bool;
  }

  flipdisease(bool) {
    this.isdisease = !bool;
  }

  flipcheckup(bool) {
    this.ischeckup = !bool;
  }

  flipmedrep(bool) {
    this.ismedrep = !bool;
  }

  history(){
    var myurl = `/animalwelfare/healthrecordhistory?farm=${this.farm}&id=${this.id}`;
    this.router.navigateByUrl(myurl);
  }

  getalink(bool){
    this.islink = !bool;
  }

  copy(){
  var copyText = document.getElementById("myInput") as HTMLInputElement;
  copyText.select();
  copyText.setSelectionRange(0, 99999)
  document.execCommand("copy");
  this.islink = false;
  window.alert("Text copied!");
  }

  back(){
    this._location.back();
  }
}
