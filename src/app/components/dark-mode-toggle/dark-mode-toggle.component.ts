import { Component } from '@angular/core';
import { DarkModeServiceService } from '../../services/dark-mode-service.service';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-dark-mode-toggle',
  imports: [MatIconModule],
  templateUrl: './dark-mode-toggle.component.html',
  styleUrl: './dark-mode-toggle.component.css'
})
export class DarkModeToggleComponent {
  isDarkMode: boolean;

  constructor(private darkModeService: DarkModeServiceService) {
    this.isDarkMode = this.darkModeService.isDarkMode();
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.darkModeService.setDarkMode(this.isDarkMode);
  }
}
