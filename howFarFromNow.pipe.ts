import {Pipe, PipeTransform} from '@angular/core';
import { TranslationService } from '@app/core/translation';

import * as moment from 'moment';

@Pipe({name: 'howFarFromNow'})
export class HowFarFromNowPipe implements PipeTransform {
  mappings: { [id: string]: string };
  constructor(private translator: TranslationService) {
    this.mappings = this.translator.getMappings();
  }

  transform(value: string, precision: string, dayRounding?: boolean): string {
    const givenDate = moment.utc(value);
    const now = moment();
    const minuteTranslation = this.mappings['minute'];
    const minutesTranslation = this.mappings['minutes'];
    const hourTranslation = this.mappings['hour'];
    const hoursTranslation = this.mappings['hours'];
    const dayTranslation = this.mappings['day'];
    const daysTranslation = this.mappings['days'];
    const weekTranslation = this.mappings['week'];
    const weeksTranslation = this.mappings['weeks'];
    const monthTranslation = this.mappings['month'];
    const monthsTranslation = this.mappings['months'];

    if (givenDate <= now && (!dayRounding || precision !== 'days')) {
      return  givenDate.toDate().toLocaleDateString();
    }

    switch (precision) {
      case 'days': {
        const days = givenDate.diff(now, 'days');
        if (days < 0) {
          return givenDate.toDate().toLocaleDateString();
        } else {
          return (days === 1 ? `${days} ${dayTranslation}` : `${days} ${daysTranslation}`);
        }
      }
      case 'withWeek': {
        let result = '';
        const months = givenDate.diff(now, 'months');
        if (months) {
          result += (months === 1 ? `${months} ${monthTranslation}, ` : `${months} ${monthsTranslation}, `);
        }

        const weeks = givenDate.subtract(months, 'months').diff(now, 'weeks');
        if (weeks) {
          result += (weeks === 1 ? `${weeks} ${weekTranslation}, ` : `${weeks} ${weeksTranslation}, `);
        }

        const days = givenDate.subtract(weeks, 'weeks').diff(now, 'days');
        if (days) {
          result += (days === 1 ? `${days} ${dayTranslation}, ` : `${days} ${daysTranslation}, `);
        }

        const hours = givenDate.subtract(days, 'days').diff(now, 'hours');
        if (hours) {
          result += (hours === 1 ? `${hours} ${hourTranslation}, ` : `${hours} ${hoursTranslation}, `);
        }

        const minutes = givenDate.subtract(hours, 'hours').diff(now, 'minutes');
        if (minutes) {
          result += (minutes === 1 ? `${minutes} ${minuteTranslation}` : `${minutes} ${minutesTranslation}`);
        }

        return result.replace(/,\s*$/, '');
      }
      default: {
        let result = '';
        let count = 0;
        const months = givenDate.diff(now, 'months');
        if (months) {
          count++;
          result += (months === 1 ? `${months} ${monthTranslation}, ` : `${months} ${monthsTranslation}, `);
        }

        const days = givenDate.subtract(months, 'months').diff(now, 'days');
        if (days) {
          count++;
          result += (days === 1 ? `${days} ${dayTranslation}, ` : `${days} ${daysTranslation}, `);
          if (count === 2 && months) {
            return result.replace(/,\s*$/, '');
          }
        }

        const hours = givenDate.subtract(days, 'days').diff(now, 'hours');
        if (hours) {
          count++;
          result += (hours === 1 ? `${hours} ${hourTranslation}, ` : `${hours} ${hoursTranslation}, `);
          if (count === 2 && days) {
            return result.replace(/,\s*$/, '');
          }
        }

        const minutes = givenDate.subtract(hours, 'hours').diff(now, 'minutes');
        if (minutes) {
          count++;
          result += (minutes === 1 ? `${minutes} ${minuteTranslation}` : `${minutes} ${minutesTranslation}`);
        }

        return result.replace(/,\s*$/, '');
      }
    }
  }
}
