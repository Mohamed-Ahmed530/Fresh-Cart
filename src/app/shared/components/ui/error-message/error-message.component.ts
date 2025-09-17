import { AbstractControl } from '@angular/forms';
import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'app-error-message',
  imports: [],
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.scss',
})
export class ErrorMessageComponent {
  nameControl = input<AbstractControl | null>();
}
