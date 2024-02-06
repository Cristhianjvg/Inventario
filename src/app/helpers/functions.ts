import { FormGroup } from "@angular/forms";
import { ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";


export class functions{
    static invalidField(field:string, f:FormGroup, formSubmitted:boolean):boolean{
        if(formSubmitted && f.controls[field].invalid){
            return true;
        }else{
            return false;
        }
    }
    static getDismissReason(reason: any): string {
      
      switch (reason) {
        case ModalDismissReasons.ESC:
          return 'by pressing ESC';
        case ModalDismissReasons.BACKDROP_CLICK:
          return 'by clicking on a backdrop';
        default:
          return `with: ${reason}`;
      }
    }
    static updateFilter(event: any, temp: any) {
      const val = event.target.value.toLowerCase();
      const tempConst = temp.filter(function (d: { name: string; }) {
        return d.name.toLowerCase().indexOf(val) !== -1 || !val;
      });
      const rows = tempConst;
      const offset = 0;
      return [tempConst, 0];
    }
}