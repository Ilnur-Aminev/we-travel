import { SightColor, SightType } from '../types';

export function getSightColor(color: SightColor): string {
  switch (color) {
    case 'blue':
      return '#2C98F0';
    case 'orange':
      return '#FFB03A';
    case 'green':
      return '#6CA73F';
    case 'red':
      return '#DB4569';
    default:
      return '#000';
  }
}

export function getSightIcon(type: SightType): string {
  switch (type) {
    case 'Пляж':
    case 'Остров':
      return '🌴';
    case 'Храм':
      return '🛕';
    case 'Смотровая площадка':
      return '🖼';
    case 'Природа':
      return '🌲';
    default:
      return '|';
  }
}
