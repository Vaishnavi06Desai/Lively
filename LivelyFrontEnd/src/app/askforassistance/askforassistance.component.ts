import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-askforassistance',
  templateUrl: './askforassistance.component.html',
  styleUrls: ['./askforassistance.component.scss']
})
export class AskforassistanceComponent implements OnInit {

  constructor(private db: AngularFirestore) { }

  contacts: any;
  name: any;

  ngOnInit(): void {
  }

  getcontacts(collection){
    this.name = collection;
    this.db.collection(collection).snapshotChanges().subscribe(res => {
      this.contacts = res;
    })
  }

}
