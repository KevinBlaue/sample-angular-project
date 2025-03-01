import { Routes } from '@angular/router';
import { ImageGenerationPromptComponent } from './image-generation-prompt/image-generation-prompt.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'image-generation', component: ImageGenerationPromptComponent },
];
