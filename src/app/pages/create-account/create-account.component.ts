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
    if (data.createPwd !== data.createPwdCheck){
      alert("Passwords don't match");
    }
    this.createUserService.createUser(data).subscribe(
      response => {
        console.log('user submitted successfully:', response);
      },
      error => {
        console.error('Error submitting user:', error);
      }
    );
  }
}
