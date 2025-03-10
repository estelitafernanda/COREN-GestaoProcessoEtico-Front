import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessoCardComponent } from './processo-card.component';

describe('ProcessoCardComponent', () => {
  let component: ProcessoCardComponent;
  let fixture: ComponentFixture<ProcessoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessoCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
