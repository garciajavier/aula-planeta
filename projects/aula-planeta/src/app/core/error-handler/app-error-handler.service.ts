import { Injectable, ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../../environments/environment';

import { NotificationService } from '../notifications/notification.service';

/** Application-wide error handler that adds a UI notification to the error handling
 * provided by the default Angular ErrorHandler.
 */
@Injectable()
export class AppErrorHandler extends ErrorHandler {
  constructor(private notificationsService: NotificationService) {
    super();
  }

  handleError(error: Error | HttpErrorResponse | any) {
    // let displayMessage = 'An error occurred.';

    // if (!environment.production) {
    //   displayMessage += ' See console for details.';
    // }

    // this.notificationsService.error(displayMessage);
    const err = (error && error.error && error.error.message) || error.statusText;
    this.notificationsService.error(err);

    super.handleError(error);
  }
}
