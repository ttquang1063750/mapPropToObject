import {Utils} from './utils';

export class Is {
  static of(obj: unknown): string {
    return (Object.prototype.toString.call(obj) as string).slice(8, -1).toLowerCase();
  }

  static array(obj: unknown): boolean {
    return Is.of(obj) === 'array';
  }

  static notArray(obj: unknown): boolean {
    return !Is.array(obj);
  }

  static object(obj: unknown): boolean {
    return Is.of(obj) === 'object';
  }

  static notObject(obj: unknown): boolean {
    return !Is.object(obj);
  }

  static empty(value: unknown): boolean {
    if (value === null || value === undefined) {
      return true;
    }

    if (Is.array(value)) {
      return (value as unknown[]).length === 0;
    }

    if (Is.object(value)) {
      return Object.keys(value).length === 0;
    }

    return Utils.deleteAllSpaces(value as string) === '';
  }

  static boolean(value: unknown): boolean {
    return ['false', 'true', '0', '1'].includes(String(value));
  }

  static number(value: unknown): boolean {
    const n = Number(value);
    return !isNaN(n) && !['false', 'true', false, true].includes(value as string | boolean);
  }

  static exist(value: unknown, array: any[]): boolean {
    return array.some(item => {
      if (item instanceof Object) {
        return Is.objectEqual(item, value);
      }
      return item === value;
    });
  }

  static objectEqual(obj1: Record<string, unknown>, obj2: Record<string, unknown> | any): boolean {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (const key of keys1) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }

    return true;
  }

  static objectEqualNotRegardingId(
    obj1: Record<string, unknown>,
    obj2: Record<string, unknown> | any
  ): boolean {
    const keys1 = Object.keys(obj1).filter(key => key !== 'id');
    const keys2 = Object.keys(obj2).filter(key => key !== 'id');

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (const key of keys1) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }

    return true;
  }

  static containsObjectFromEntityList(list: any[], obj: unknown): boolean {
    return !!list.filter(x => Is.objectEqualNotRegardingId(x.entity, obj)).length;
  }

  static isInt(value: string): boolean {
    const num = Number(value);
    return Number(num) === num && num % 1 !== 0;
  }

  static index(key: any): boolean {
    return !isNaN(+key);
  }
}
