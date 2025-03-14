import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FasesProcessoCardComponent } from './fases-processo-card.component'; 

describe('FasesProcessoCardComponent', () => {
  let component: FasesProcessoCardComponent;
  let fixture: ComponentFixture<FasesProcessoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FasesProcessoCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FasesProcessoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
