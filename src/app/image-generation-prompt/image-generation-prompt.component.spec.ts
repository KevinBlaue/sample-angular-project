import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageGenerationPromptComponent } from './image-generation-prompt.component';

describe('ImageGenerationPromptComponent', () => {
  let component: ImageGenerationPromptComponent;
  let fixture: ComponentFixture<ImageGenerationPromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageGenerationPromptComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ImageGenerationPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
