import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-healthhistory',
  templateUrl: './healthhistory.component.html',
  styleUrls: ['./healthhistory.component.scss']
})
export class HealthhistoryComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private db: AngularFirestore, private auth: AuthService) { }

  userID:any;
  farm: any;
  id: any;
  health: any;

  animal: any;

  ngOnInit(): void {
    this.auth.getUserState()
    .subscribe(user => {
      this.userID = user.uid;
      this.farm = this.route.snapshot.queryParams['farm'];
        this.id = this.route.snapshot.queryParams['id'];
        this.getid();
        this.gethealthrecs();
    })
  }

  getid(){
    this.db.collection('Users').doc(this.userID).collection('Farms').doc(this.farm).collection('Livestock').doc(this.id).snapshotChanges().subscribe(res =>{
      this.animal = res;
      console.log()
    })
  }
  gethealthrecs(){
    console.log(this.farm, this.id);
    this.db.collection('Users').doc(this.userID).collection('Farms').doc(this.farm).collection('Livestock').doc(this.id).collection('HealthRecords').snapshotChanges().subscribe(res => {
      this.health = res;
      console.log(res[0].payload.doc.data())
    });
  }

  gotopdf(record, field){
    console.log(field)
    var myurl = `/animalwelfare/healthrecordhistory/pdf?farm=${this.farm}&id=${this.id}&healthrecid=${record.payload.doc.id}&field=${field}`;
    this.router.navigateByUrl(myurl);
  }

}
