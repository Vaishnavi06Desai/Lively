import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {

  constructor(private db: AngularFirestore, private auth: AuthService) { }

  userID: any;
  email: any;
  messages: any;
  ngOnInit(): void {
    this.auth.getUserState()
      .subscribe(user => {
        this.userID = user.uid;
        this.getmyemail();
        this.getthreads();
      })
  }

  form = new FormGroup(
    {
      Message: new FormControl(''),
      Username: new FormControl(''),
      Likes: new FormControl(0),
      Dislikes: new FormControl(0)
    }
  );

  getmyemail(){
    this.db.collection("Users").doc(this.userID).snapshotChanges().subscribe(res =>{
      var temp;
      temp = res;
      console.log(temp);
      this.email = temp.payload.data().email;
    })
  }

  getthreads(){
    this.db.collection('Forum').snapshotChanges().subscribe(res => {
      this.messages = res;
    })
  }

  submit(){
    console.log(this.email);
    this.form.get('Username').setValue(this.email);
    this.db.collection('Forum').add(this.form.value).then(e => {
      this.form.get('Message').setValue("");
    });

  }

  like(thread, likes){
    this.db.collection('Forum').doc(thread).update({Likes: likes + 1});
  }

  dislike(thread, dislikes){
    this.db.collection('Forum').doc(thread).update({Dislikes: dislikes + 1});
  }
}
