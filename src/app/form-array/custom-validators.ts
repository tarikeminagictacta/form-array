import { FormArray, FormGroup } from '@angular/forms';

export class CustomValidators {
  static onlyOneValidPerson(a: FormArray) {
    const isValidArray = a.controls
      .map((c: FormGroup) => c.get('isValid').value as boolean)
      .filter(x => x === true);

    if (isValidArray.length !== 1) {
      return {
        onlyOnePersonValid: {
          foundPersons: isValidArray.length
        }
      };
    }

    return null;
  }

  static minLengthOfValidPersons(numberOfPersons: number) {
    return (a: FormArray) => {
      const isValidArray = a.controls
        .map((c: FormGroup) => c.get('isValid').value as boolean)
        .filter(x => x === true);

      if (isValidArray.length !== numberOfPersons) {
        return {
          minLengthOfValidPersons: {
            foundPersons: isValidArray.length,
            requiredValidPersons: numberOfPersons
          }
        };
      }

      return null;
    };
  }
}
