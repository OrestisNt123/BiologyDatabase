import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProteinPathwayComponent } from './protein-pathway.component';

describe('ProteinPathwayComponent', () => {
  let component: ProteinPathwayComponent;
  let fixture: ComponentFixture<ProteinPathwayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProteinPathwayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProteinPathwayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
