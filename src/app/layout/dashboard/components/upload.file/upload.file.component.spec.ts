import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Upload.FileComponent } from './upload.file.component';

describe('Upload.FileComponent', () => {
  let component: Upload.FileComponent;
  let fixture: ComponentFixture<Upload.FileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Upload.FileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Upload.FileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
