import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'aula-planeta-prompt',
  templateUrl: './prompt-component.html',
  styleUrls: [ './prompt-component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PromptComponent {
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { mobileType: 'ios' | 'android'; promptEvent?: any },
    private bottomSheetRef: MatBottomSheetRef<PromptComponent>
  ) // private translateService: TranslateService,
  {
  }

  public installPwa(): void {
    this.data.promptEvent.prompt();
    this.close();
  }

  public close() {
    this.bottomSheetRef.dismiss();
  }
}
