import { Pipe, PipeTransform } from '@angular/core';
import { Settings } from '../../../shared/models/settings.model';

@Pipe({
  name: 'settings'
})
export class SettingsPipe implements PipeTransform {

  transform(settings: Settings, atribute: string): unknown {
    return settings[atribute];
  }

}
