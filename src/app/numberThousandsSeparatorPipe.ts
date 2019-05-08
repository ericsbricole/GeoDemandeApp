import { PipeTransform, Pipe } from "@angular/core";

@Pipe({name:"numberThousandsSeparator"})
export class numberThousandsSeparatorPipe implements PipeTransform{

    transform(val: number): string {
        if (val !== undefined && val !== null) {
            let s = val.toString();
            let newVal: string;
            for (let i = s.length; i >0; i--){
                if (i % 3 === 0){
                    newVal = s.slice(0, s.length-i) + " " + s.slice(s.length-i);
                    s = newVal; 
                }
            }
            return newVal;
          } else {
            return '';
          }
    }

}