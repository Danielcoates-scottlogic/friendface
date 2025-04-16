import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PostComponent } from '../../components/post/post.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, PostComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
   
}
