import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'length',
  standalone: true,
})
export class LengthPipe implements PipeTransform {
  transform(value: string | any[] | any): number {
    if (typeof value === 'string' || Array.isArray(value)) {
      return value.length;
    }
    return 0;
  }
}
