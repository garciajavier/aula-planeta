import { TestBed } from '@angular/core/testing';
import { UserManagementService } from './user-management.service';


describe('UserManagementService', () => {
  let service: UserManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserManagementService]
    });

    service = TestBed.inject<UserManagementService>(UserManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should provide initial users', (done) => {
    service.users$.subscribe((users) => {
      expect(users.length).toBe(3);
      done();
    });
  });

  it('should add user', (done) => {
    service.addUser({ username: 'test', name: 'Test', surname: 'Tester' });
    service.users$.subscribe((users) => {
      expect(users.length).toBe(4);
      expect(users[3].username).toBe('test');
      done();
    });
  });
});
