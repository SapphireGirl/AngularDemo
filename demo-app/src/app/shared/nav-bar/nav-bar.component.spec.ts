import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';

import { NavBarComponent } from './nav-bar.component';
import { AccountMenuComponent } from '../account-menu/account-menu.component';
import { UserRepositoryService } from '../../services/user-repository.service';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  beforeEach(async () => {
    const mockUserRepo = jasmine.createSpyObj('UserRepositoryService', [], { currentUser: null });

    await TestBed.configureTestingModule({
      declarations: [NavBarComponent, AccountMenuComponent],
      imports: [RouterTestingModule, CommonModule],
      providers: [
        { provide: UserRepositoryService, useValue: mockUserRepo }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
