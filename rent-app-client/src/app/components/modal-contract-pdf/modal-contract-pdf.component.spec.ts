import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalContractPdfComponent } from './modal-contract-pdf.component';

describe('ModalContractPdfComponent', () => {
  let component: ModalContractPdfComponent;
  let fixture: ComponentFixture<ModalContractPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalContractPdfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalContractPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
