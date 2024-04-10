import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numbertoYesNoPipe'
})
export class NumbertoYesNo implements PipeTransform {

  transform(value: unknown): string {
    if(value == 1){
      return "Yes";
    }else if(value == 0){
      return "No";
    }else{
      return " ";
    }
  }

}
