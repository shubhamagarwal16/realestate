import { AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from '../services/common.service';
import { environment } from '@sa-environments/environment';

@Injectable()
export class RegistrationValidators {

    constructor(public http: HttpClient, private commonService: CommonService) { }

    passwordMatch(control: AbstractControl) {
        let password = control.get('password');
        let cPassword = control.get('cPassword');

        if (password.value !== '' && cPassword.value !== '' && (password.value !== cPassword.value))
            return { passwordMatch: true };

        return null;
    }

    checkEmailAvailability(control: AbstractControl): Promise<ValidationErrors | null> {
        return new Promise((resolve, reject) => {
            this.http.get(environment.BASE_URL + '/common/checkemail-availability/email/' + control.value).subscribe(data => {
                if (data['response'])
                    resolve({ checkEmailAvailability: true });
                else
                    resolve(null);
            });
        });
    }
}