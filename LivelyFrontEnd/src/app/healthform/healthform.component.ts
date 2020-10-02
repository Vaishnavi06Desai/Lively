import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-healthform',
  templateUrl: './healthform.component.html',
  styleUrls: ['./healthform.component.scss']
})
export class HealthformComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private db: AngularFirestore, private auth: AuthService, private storage: AngularFireStorage) { }

  userID: any;
  farm: any;
  id: any;

  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadUrl;

  health = "healthy"

  isvaccination = false;
  isvschedule = false;
  isvdesc = false;
  isvdate = false;
  isdisease = false;
  ispregnancy = false;
  ispdd = false;
  ispcheckup = false;
  ispmeddets = false;

  cusfileToUpload: any;
  mrfileToUpload: any;
  vsfileToUpload: any;
  pcsfileToUpload: any;

  ngOnInit(): void {
    this.auth.getUserState()
      .subscribe(user => {
        this.userID = user.uid;
        this.farm = this.route.snapshot.queryParams['farm'];
        this.id = this.route.snapshot.queryParams['id'];
        //console.log(farm, id);
      })
  }

  form = new FormGroup({
    HealthCondition: new FormControl(''),
    Disease: new FormControl(''),
    CheckupSchedule: new FormControl(''),
    MedialReport: new FormControl('None'),
    VaccinationSchedule: new FormControl('None'),
    VaccinationDescription: new FormControl(''),
    Date: new FormControl(''),
    PregnancyDueDate: new FormControl(''),
    PregnancyCheckupSchedule: new FormControl(''),
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
          this.db.collection('Users').doc(this.userID).collection('Farms').doc(this.farm).collection('Livestock').doc(this.id).collection('HealthRecords').doc(hrid).update(temp).then().catch(e => {console.log(e)});
          //this.db.collection('Files').add({Url: res})});
        });
      });
  }

  upload(){
    if(this.cusfileToUpload != null)
    {
      this.uploadfiles(this.cusfileToUpload, "CheckUpSchedule", "123", "CheckupSchedule");
    }
    if(this.mrfileToUpload != null)
    {
      this.uploadfiles(this.mrfileToUpload, "MedicalReport", "123", "MedicalReport");
    }
    if(this.vsfileToUpload != null)
    {
      this.uploadfiles(this.vsfileToUpload, "VaccinationSchedule", "123", "VaccinationSchedule");
    }
    if(this.pcsfileToUpload != null)
    {
      this.uploadfiles(this.pcsfileToUpload, "PregnancyCheckUpchedule", "123", "PregnancyCheckupSchedule");
    }
  }
}
