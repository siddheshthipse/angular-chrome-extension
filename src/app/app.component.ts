import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = "Angular Chrome Extension";
  constructor() { }

  ngOnInit(): void {
    console.log("Hello from the Angular Chrome Extension")
  }

  paintItRed(): void {
    const updateBackgroundColor = (color: string) => document.body.style.backgroundColor = color;

    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      console.log("All the Tabs", tabs)
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id! },
        func: updateBackgroundColor,
        args: ['red']
      });
    });
  }
}
