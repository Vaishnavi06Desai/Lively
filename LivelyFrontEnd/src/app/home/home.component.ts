import { Component, OnInit } from '@angular/core';
//import { ApiAiClient } from 'api-ai-javascript';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }
  google: any;

  opened: boolean;


  // googleTranslateElementInit() {
  //   google.translate.TranslateElement({ pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE }, 'google_translate_element');
  // }
  ngOnInit(): void {

  }
}
