import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'termText',
})
export class TermTextPipe implements PipeTransform {
  transform(value: string, limit: number): string {
    return value.split(' ', limit).join(' ');
  }
}
