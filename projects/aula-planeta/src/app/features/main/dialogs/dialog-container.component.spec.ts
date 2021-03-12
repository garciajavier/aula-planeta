import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogContainerComponent } from './dialog-container.component';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('DialogContainerComponent', () => {
  let component: DialogContainerComponent;
  let fixture: ComponentFixture<DialogContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot()
      ],
      providers: [
        provideMockStore({
          initialState: {
            auth: {
              isAuthenticated: true
            }
          }
        })
      ],
      declarations: [DialogContainerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
