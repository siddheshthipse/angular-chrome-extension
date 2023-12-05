import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = "Angular Chrome Extension";

  myForm: FormGroup | any;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    console.log("Hello from the Angular Chrome Extension")
    this.myForm = this.formBuilder.group({
      inputField: ['', Validators.required]
    });
  }

  paintItRed(color: string): void {
    const updateBackgroundColor = (color: string) => document.body.style.backgroundColor = color;

    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      console.log("All the Tabs", tabs)
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id! },
        func: updateBackgroundColor,
        args: [color]
      });
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      console.log(this.myForm.inputField);
      const color: string = this.myForm.inputField;
      this.paintItRed(color)
    } else {
      this.myForm.markAllAsTouched();
    }
  }
}
