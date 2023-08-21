import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup,ValidationErrors,ValidatorFn,Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'CarRide';
  seatForm!: FormGroup;
  submittedData:any[]=[];
  constructor (public formBuilder:FormBuilder){}
  ngOnInit(): void 
  {
    this.seatForm=this.formBuilder.group(
      {
        name:['',Validators.required],
        start:['',Validators.required],
        destination:['',Validators.required],
        car:['',Validators.required],
        seats:['',[Validators.required,seatValidator()]],
      }
    );
  };
  onSubmit(){
    if(this.seatForm?.valid){
      const formData=this.seatForm.value;
      this.submittedData.push(formData);
      this.seatForm.reset();
      alert("Form Submitted!");
    }
    else{
      alert("Form is invalid");
    }
  }

}


export function seatValidator(): ValidatorFn {
  return (control:AbstractControl) : ValidationErrors | null => {

      const value = control.value;

      if (!value) {
          return null;
      }

      let isValid;
      if(value>8 || value<0)
      {
        isValid=false;
      }
      else{
        isValid=true;
      }

      return !isValid ? {seatValidity:true}: null;
  }
}