import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { environment } from '../../environments/environment.development';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-image-generation-prompt',
  imports: [
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './image-generation-prompt.component.html',
  styleUrl: './image-generation-prompt.component.scss',
})
export class ImageGenerationPromptComponent {
  public imageDescription: string = '';
  public imageDescriptionMaxLength: number = 1000;
  public imageGenerated: boolean = false;
  public isLoading: boolean = false;
  public imageUrl: string | null = null;

  private _snackBar = inject(MatSnackBar);

  constructor(private http: HttpClient) { }

  public async fetchImage() {
    if (this.imageDescription.length < 50) {
      this._snackBar.open('Description must be at least 50 characters long!', 'OK', {
        duration: 5000,
      });
      return;
    }

    this.isLoading = true;
    this.imageGenerated = false;
    this.imageUrl = null;

    this.http
      .post(
        environment.apiUrl,
        { description: this.imageDescription },
        {
          headers: { 'x-api-key': environment.apiKey },
          responseType: 'blob',
        },
      )
      .subscribe({
        next: (blob) => {
          this.imageUrl = URL.createObjectURL(blob);
          this.imageGenerated = true;
          this.isLoading = false;
        },
        error: (e) => {
          console.error(e);
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }
}
