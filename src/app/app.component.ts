import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = "Angular Chrome Extension";
  constructor() {}

  ngOnInit(): void {
    console.log("Hello from the Angular Chrome Extension")      
  }
}
