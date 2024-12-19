import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GitInegrationComponent } from './git-inegration.component';

describe('GitInegrationComponent', () => {
  let component: GitInegrationComponent;
  let fixture: ComponentFixture<GitInegrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GitInegrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GitInegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
