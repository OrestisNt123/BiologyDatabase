import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneProteinComponent } from './gene-protein.component';

describe('GeneProteinComponent', () => {
  let component: GeneProteinComponent;
  let fixture: ComponentFixture<GeneProteinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneProteinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneProteinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
