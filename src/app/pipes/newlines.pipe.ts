import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newlines'
})
export class NewlinesPipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(/(?:\r\n|\r|\n)/g, '<br />');
  }

}
