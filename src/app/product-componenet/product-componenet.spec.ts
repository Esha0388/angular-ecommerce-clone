import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponenet } from './product-componenet';

describe('ProductComponenet', () => {
  let component: ProductComponenet;
  let fixture: ComponentFixture<ProductComponenet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductComponenet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductComponenet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
