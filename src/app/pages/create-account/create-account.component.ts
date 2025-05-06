import { Component } from '@angular/core';
import { CreateUserService } from '../../services/create-user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-create-account',
  imports: [FormsModule],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent {
  constructor(private createUserService: CreateUserService, private loginService: LoginService){}

  ngOnInit() {
    if (localStorage.getItem('jwt') !== null) {
      localStorage.removeItem('jwt');
    }
  }

  onLogin(data: any) {
    if(!this.usernameLength(data.username)) return;
    if(!this.passwordLength(data.pwd)) return;
    this.loginService.login(data).subscribe(
      response => {
        console.log('logged in:', response);
        localStorage.setItem('jwt', response.token);
        window.location.href = '/pages/home';
      },
      error => {
        if(error.status === 401) {
          alert(error.error?.message || "Invalid credentials")
        } else {
          alert('Login failed. Please try again.');
        }
      }
    );
  }
  onClickSubmit(data: any, addUser: NgForm) {
    if(!this.usernameLength(data.createUsername)) return;
    if(!this.passwordLength(data.createPwd)) return;
    if(!this.passwordCheck(data.createPwd, data.createPwdCheck)) return;
    this.createUserService.createUser(data).subscribe(
      response => {
        console.log('user submitted successfully:', response);
        alert("Account created! You can now Login");
        addUser.resetForm();
      },
      error => {
        console.error('Error submitting user:', error);
        alert("Error, please try again!");
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
  passwordLength(password: string) {
    if (password.length > 99) {
      alert("password can't be longer than 100 characters");
      return false;
    }
    if (password.length < 3)  {
      alert("password must be at least 3 characters");
      return false;
    }
    return true;
  }
  usernameLength(username: string) {
    if (username.length > 99) {
      alert("Username can't be longer than 100 characters");
      return false;
    }
    if (username.length < 3)  {
      alert("Username must be at least 3 characters");
      return false;
    }
    return true;
  }

}
