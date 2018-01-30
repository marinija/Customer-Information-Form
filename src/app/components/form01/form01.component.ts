import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { Customer } from './customer';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { fade } from './animations';
@Component({
  selector: 'app-form01',
  templateUrl: './form01.component.html',
  styleUrls: ['./form01.component.css'],
  animations: [
    fade
  ]
})
export class Form01Component implements OnInit {

  public myForm: FormGroup;
  customer: Customer[];
  items: FormArray;
  firstname: FormControl;
  lastname: FormControl;
  myemail: FormControl;
  myphone: FormControl;
  public mystreet: FormControl;
  public mystate: FormControl;
  public mycity: FormControl;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
      this.firstname = new FormControl('', [Validators.required, Validators.minLength(5)]);
      this.lastname = new FormControl('', [Validators.required, Validators.minLength(5)]);
      this.myemail = new FormControl('', [Validators.required, Validators.pattern('[^ @]*@[^ @]')]);
      this.myphone = new FormControl('', Validators.required);
      this.mystreet = new FormControl('', Validators.required);
      this.mystate = new FormControl('', Validators.required);
      this.mycity = new FormControl('', Validators.required);
  }

  createForm() {
   this.myForm = this.fb.group({
    name: new FormGroup({
      firstname: this.firstname,
      lastname: this.lastname
    }),
      items: this.fb.array([
        this.initEmail()
      ]),
      phones: this.fb.array([
        this.InitPhone()
      ]),
      address: this.fb.array([
        this.InitAddress()
      ])
    });
  }

  initEmail() {
    return this.fb.group({
      myemail: this.myemail
    });
  }

  InitPhone() {
    return this.fb.group({
      myphone: this.myphone
    });
  }

  InitAddress() {
    return this.fb.group({
      mystreet: this.mystreet,
      mycity: this.mycity,
      mystate: this.mystate
    });
  }

  AddEmail(): void {
    this.items = this.myForm.get('items') as FormArray;
    this.items.push(this.initEmail());
  }

  AddPhone() {
    this.items = this.myForm.get('phones') as FormArray;
    this.items.push(this.InitPhone());
  }

  AddAddress(): void {
    this.items = this.myForm.get('address') as FormArray;
    this.items.push(this.InitAddress());
  }

  removeEmail(i: number) {
    const control = < FormArray > this.myForm.controls['items'];
    control.removeAt(i);
  }

  RemovePhone(i: number): void {
    const control = <FormArray>this.myForm.controls['phones'];
    control.removeAt(i);
  }

  RemoveAddress(i: number): void {
    const control = < FormArray > this.myForm.controls['address'];
    control.removeAt(i);
  }

  onSubmit(): void {

  }
}
