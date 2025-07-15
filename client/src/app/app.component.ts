import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
    standalone: false,

  templateUrl: './app.component.html',
styleUrls: ['./app.component.css'] //  Correct: plural and array
})
export class AppComponent {
  title = 'client';
}
