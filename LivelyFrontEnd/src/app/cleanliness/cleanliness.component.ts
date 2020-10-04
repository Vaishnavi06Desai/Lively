import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cleanliness',
  templateUrl: './cleanliness.component.html',
  styleUrls: ['./cleanliness.component.scss']
})
export class CleanlinessComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private db: AngularFirestore, private auth: AuthService,
    private storage: AngularFireStorage) { }

  userID: any;
  farms: any;

  isupload = false;
  filetoupload: any;

  recordid: any;

  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadUrl;

  ngOnInit(): void {
    this.auth.getUserState()
      .subscribe(user => {
        this.userID = user.uid;
        this.getfarms();
      })
  }

  getfarms() {
    return this.db.collection('Users').doc(this.userID).collection('Farms').snapshotChanges().subscribe(res => { this.farms = res; });
  }

  switchisupload(record) {
    this.recordid = record.payload.doc.id;
    this.isupload = true;
  }

  upload(files: FileList) {
    this.filetoupload = files.item(0);
  }

  uploadfile(record) {
    this.isupload = false;
    const path = `${this.userID}/${record.payload.doc.id}/cleanliness/${this.filetoupload.name}`;
    const ref = this.storage.ref(path);
    this.task = this.storage.upload(path, this.filetoupload);
    this.percentage = this.task.percentageChanges();
    this.task.snapshotChanges().subscribe(
      ress => {
        ref.getDownloadURL().subscribe(res => {
          this.db.collection('Users').doc(this.userID).collection('Farms').doc(record.payload.doc.id).update({ "CleanlinessSchedule": res }).then(e => {
          }).catch(e => { console.log(e) });
        });
      });
  }

  view(record) {
    var myurl = `/pdf?mode=cleanliness&farm=${record.payload.doc.id}`;
    this.router.navigateByUrl(myurl);
  }

}
