import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessoEticoCardComponent } from './processo-etico-card.component';

describe('ProcessoEticoCardComponent', () => {
  let component: ProcessoEticoCardComponent;
  let fixture: ComponentFixture<ProcessoEticoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessoEticoCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessoEticoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
