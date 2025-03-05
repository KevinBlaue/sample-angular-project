import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ImageGenerationPromptComponent } from './image-generation-prompt.component';

describe('ImageGenerationPromptComponent', () => {
  let component: ImageGenerationPromptComponent;
  let fixture: ComponentFixture<ImageGenerationPromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageGenerationPromptComponent],
      providers: [provideHttpClient(), provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(ImageGenerationPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
