import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { OnDestroy } from '@angular/core'
import { Directive, TemplateRef, ViewContainerRef, Input, OnInit } from '@angular/core';
import { AuthManagementService } from '../../auth/auth-management.service';
import { User } from '../../../shared/models/user.model';


@Directive({
  selector: '[hasPermission]'
})
export class PermissionDirective implements OnInit, OnDestroy {
  /**
   * Current user to inspect his privileges
   */
  private currentUser: User;
  /**
   * Privileges to analize
   */
  private privileges: string[] = [];
  /**
   * Operation to add conditional. OR / AND
   */
  logicalOperation: 'OR' | 'AND' = 'OR';
  /**
   * Determinates if viewContainer is hidden or not
   */
  private isHidden = true;

  private destroy$: Subject<void> = new Subject<void>();
  /**
   * 
   * @param templateRef 
   * @param viewContainer 
   * @param applicationUserService 
   */
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authManagementService: AuthManagementService
  ) { }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit() {
    this.authManagementService.currentUser$.pipe(
      take(1),
      takeUntil(this.destroy$))
      .subscribe(user => {
        this.currentUser = user;
        this.updateView();
      });
  }

  @Input()
  set hasPermission(val) {
    this.privileges = val;
    this.updateView();
  }

  @Input()
  set hasPermissionOperation(permop) {
    this.logicalOperation = permop;
    this.updateView();
  }

  /**
   * Update view if is needed based on user privileges
   */
  private updateView() {
    if (this.checkPermission()) {
      if (this.isHidden) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.isHidden = false;
      }
    } else {
      this.isHidden = true;
      this.viewContainer.clear();
    }
  }

  /**
   * Check the user privileges if the operational
   * @returns boolean if component must be renderized or not
   */
  private checkPermission(): boolean {
    let hasPermission = false;
    if (this.currentUser && this.currentUser.role && this.currentUser.role.length) {
      for (const checkPrivilege of this.privileges) {
        const permissionFound = this.authManagementService.userCan([checkPrivilege]);
        if (permissionFound) {
          hasPermission = true;
          if (this.logicalOperation === 'OR') {
            break;
          }
        } else {
          hasPermission = false;
          if (this.logicalOperation === 'AND') {
            break;
          }
        }
      }
    }
    return hasPermission;
  }

}
