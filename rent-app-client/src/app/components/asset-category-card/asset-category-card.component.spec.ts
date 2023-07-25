import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetCategoryCardComponent } from './asset-category-card.component';

describe('AssetCategoryCardComponent', () => {
  let component: AssetCategoryCardComponent;
  let fixture: ComponentFixture<AssetCategoryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetCategoryCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetCategoryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
