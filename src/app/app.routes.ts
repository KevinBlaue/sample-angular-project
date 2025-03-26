import { Routes } from '@angular/router';
import { ImageGenerationPromptComponent } from './image-generation-prompt/image-generation-prompt.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './guards/auth.guard';
import { BaseComponent } from './base/base.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: BaseComponent },
      {
        path: 'image-generation',
        component: ImageGenerationPromptComponent,
      },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
