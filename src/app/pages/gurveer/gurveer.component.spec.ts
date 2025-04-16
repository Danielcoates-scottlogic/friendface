import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GurveerComponent } from './gurveer.component';

describe('GurveerComponent', () => {
  let component: GurveerComponent;
  let fixture: ComponentFixture<GurveerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GurveerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GurveerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
