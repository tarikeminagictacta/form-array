import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Person } from './person';
import { CustomValidators } from './custom-validators';

@Component({
  selector: 'app-form-array',
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.scss']
})
export class FormArrayComponent implements OnInit {
  @Input() title: string;
  form: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    const firstPerson: Person = {
      firstName: 'Tarik',
      lastName: 'Eminagic'
    };
    this.form = this.fb.group({
      question: this.fb.control(''),
      persons: this.fb.array(
        [this.personGroup(firstPerson), this.personGroup()],
        [Validators.minLength(2), CustomValidators.minLengthOfValidPersons(1)]
      )
    });
  }

  personGroup(personData: Person = null): FormGroup {
    return this.fb.group({
      name: [personData && personData.firstName],
      lastName: this.fb.control(personData && personData.lastName),
      isValid: false
    });
  }

  get personsArray(): FormArray {
    return this.form.get('persons') as FormArray;
  }

  get formStatus() {
    return {
      valid: this.form.valid,
      dirty: this.form.dirty,
      touched: this.form.touched,
      value: this.form.value
    };
  }

  addAnotherPerson() {
    this.personsArray.push(this.personGroup());
  }

  addNamedPerson() {
    this.personsArray.push(
      this.personGroup({
        firstName: 'Ime',
        lastName: 'Prezime'
      })
    );
  }

  get removeButtonDisabled(): boolean {
    // return this.personsArray.length === 2;
    return false;
  }

  removePerson(i: number) {
    this.personsArray.removeAt(i);
  }
}
