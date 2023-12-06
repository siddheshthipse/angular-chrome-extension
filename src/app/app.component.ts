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
  debounceTimeoutId: any;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    console.log("Hello from the Angular Chrome Extension")

    chrome.runtime.onMessage.addListener((message) => {
      if (message.action === 'handleKeyUp') {
        this.handleInput();
      }
    });

    this.myForm = this.formBuilder.group({
      inputField: ['', Validators.required]
    });
  }

  onKeyUp() {
    // Debounce logic
    console.log("On keyup event")
    clearTimeout(this.debounceTimeoutId);
    this.debounceTimeoutId = setTimeout(() => {
      this.handleInput();
    }, 300);
  }

  handleInput() {
    // Your function logic here
    console.log('Check the logic');
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
      console.log(this.myForm.value.inputField);
      const color: string = this.myForm.value.inputField;
      this.paintItRed(color)
    } else {
      this.myForm.markAllAsTouched();
    }
  }
}
