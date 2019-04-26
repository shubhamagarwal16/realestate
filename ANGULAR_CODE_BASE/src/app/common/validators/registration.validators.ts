import { AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from '../services/common.service';

@Injectable()
export class RegistrationValidators{

    constructor( public http: HttpClient, private commonService: CommonService ){}

    passwordMatch(control: AbstractControl){
        let password = control.get('password');
        let cPassword = control.get('cPassword');
        // console.log(password.value, "cPassword ", cPassword.value);
        
        if(password.value !== '' && cPassword.value !== '' && (password.value !== cPassword.value))
            return { passwordMatch: true };

        return null;
    }

    checkEmailAvailability(control: AbstractControl): Promise <ValidationErrors | null> { 
        return new Promise((resolve, reject) => {
            // console.log('checkEmailAvailability', control.value);
            this.http.get(this.commonService.base_url + '/common/checkemail-availability/email/'+control.value).subscribe(data => {
                // console.log('--! ', data, data['response']);
                if(data['response'])
                    resolve({ checkEmailAvailability: true });
                else
                    resolve (null);             
            });            
        });
    }
}