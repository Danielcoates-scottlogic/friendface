import { Component } from '@angular/core';
import { CreateUserService } from '../../services/create-user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-account',
  imports: [FormsModule],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent {
  constructor(private createUserService: CreateUserService){}
  onClickSubmit(data: any) {
    if(!this.usernameLength(data.createUsername)) return;
    if(!this.passwordCheck(data.createPwd, data.createPwdCheck)) return;
    this.createUserService.createUser(data).subscribe(
      response => {
        console.log('user submitted successfully:', response);
      },
      error => {
        console.error('Error submitting user:', error);
      }
    );
  }
  passwordCheck(pwd1: string, pwd2: string) {
    if (pwd1 !== pwd2){
      alert("Passwords don't match");
      return false;
    }
    return true;
  }
  usernameLength(username: string) {
    if (username.length > 99) {
      alert("Username can't be longer than 100 characters");
      return false;
    }
    return true;
  }
}
