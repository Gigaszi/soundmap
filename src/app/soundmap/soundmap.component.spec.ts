import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundmapComponent } from './soundmap.component';

describe('SoundmapComponent', () => {
  let component: SoundmapComponent;
  let fixture: ComponentFixture<SoundmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SoundmapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SoundmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
