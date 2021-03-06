import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { UserQuery, UserService } from 'src/app/stores/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  alertController: any;
  constructor(
    public formBuilder: FormBuilder,
    private userService: UserService,
    public userQuery: UserQuery,
    private navCtrl: NavController,
    private router: Router
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: [
        '',
        Validators.compose([
          Validators.maxLength(100),
          Validators.required,
          Validators.email,
        ]),
      ],
      password: [
        '',
        Validators.compose([Validators.minLength(6), Validators.required]),
      ],
      name:['', [Validators.required]],
      surname:['', Validators.required],
      confirmpassword:[''],
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  presentAlert(errorText) {
    this.alertController.create({
      // header: 'Alert',
      subHeader: 'Error registering',
      message: errorText,
      buttons: ['OK']
    }).then(res => {

      res.present();

    });
  }

  async onSubmit() {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.invalid) {
      this.presentAlert('Invalid credentials');
      return;
    }
    await this.userService
    .register(this.f.name.value,this.f.surname.value, this.f.password.value, this.f.email.value)
    .then(() => {
        this.navCtrl.navigateBack('');
      });
  }

}
