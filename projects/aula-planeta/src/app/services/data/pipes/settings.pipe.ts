import { Pipe, PipeTransform } from '@angular/core';
import { Settings } from '../../../shared/models/settings.model';

@Pipe({
  name: 'settings'
})
export class SettingsPipe implements PipeTransform {
  transform(settings: Settings, atribute: string): unknown {
    const hour = new Date().getHours();
    if (atribute === 'theme' && settings.autoNightMode) {
      return (hour >= 21 || hour <= 7) ? settings.nightTheme : settings.theme
    } else {
      return settings[atribute];
    } 
  }
}
