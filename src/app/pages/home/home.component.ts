import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostComponent } from '../../components/post/post.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, PostComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
   onClickSubmit(data: any) {
    console.log(data);
   }
}
