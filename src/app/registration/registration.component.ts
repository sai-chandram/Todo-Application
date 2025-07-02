import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { TodoService } from '../service/todo.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private todoService: TodoService) { }       //formBuilder is used to build our formgroup.

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(6)]],
      lastName: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      hobbies: this.fb.array([this.fb.control('', Validators.required)]),
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      confirmPassword: ['', Validators.required]
    },{
      validators: this.passwordValidator
  });
  }

  get hobbies(): FormArray {
    return this.registerForm.get('hobbies') as FormArray;
  }

  addHobbies() {
    this.hobbies.push(this.fb.control('', Validators.required));
  }

  passwordValidator(formGroup: AbstractControl): ValidationErrors | null {
    // const password = this.registerForm.get('password')?.value;
    // const confirmPassword = this.registerForm.get('confirmPassword')?.value;
    //return password === confirmPassword ? null : {mismatch: true};


    const password = formGroup.get('password')?.value;
  const confirmPassword = formGroup.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      return { passwordMismatch: true }
    }
    return null;
  }

  // onSubmit() {
  //   if(this.registerForm.valid) {
  //     console.log("form is valid");
  //     console.log(this.registerForm.value);
  //   } else {
  //     console.log('form is invalid');
  //   }
  // }

  disableCopy(event: ClipboardEvent) {
    event.preventDefault();
  }

  onSubmit() {
    if(this.registerForm.valid) {
      const formData = this.registerForm.value;
      this.todoService.registerUser(formData).subscribe({
        next: (successResponse) => {
          console.log("Successfully User Created");
        },
        error : (error) => {
          console.error(error);
        }
      });
    }
  }
}
