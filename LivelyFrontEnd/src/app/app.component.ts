import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  x : boolean = true;
  opened: boolean;
  title = 'djhackathon';
  user:any;

  constructor(private auth: AuthService) {}
  
  ngOnInit(): void {
    console.log(this.auth)
    this.auth.getUserState()
      .subscribe(user => {
        this.user = user;
      });
      (function(d, m){
        var kommunicateSettings = 
            {"appId":"300bf55d7e74456b47b2473c55f2d22c4","popupWidget":true,"automaticChatOpenOnNavigation":true};
        var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
        s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
        var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
        (window as any).kommunicate = m; m._globals = kommunicateSettings;
    })(document, (window as any).kommunicate || {});
   }

  logout() {
    this.auth.logout();
  }
}
