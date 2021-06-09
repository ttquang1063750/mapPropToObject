import {Is} from './is';

export class Utils {
    static deleteAllSpaces(value: string): string {
        return String(value).replace(/\s/g, '');
    }

    static createObjectByProp(obj: Record<string, any>, keys: (string | number)[], value: string, i = 0) {
        if (i === keys.length) {
            return;
        }

        const isLast = (index: number) => index === keys.length - 1;
        const key = keys[i];
        const prevKey = keys[i - 1];
        const nextKey = keys[i + 1];

        if (Is.index(nextKey)) {
            let prev = keys[i];
            let next = keys[i + 1];
            i++;
            obj[prev] = Is.array(obj[prev]) ? obj[prev] : [];
            let prevObj = obj[key];

            while (Is.index(keys[i + 1])) {
                prev = keys[i];
                next = keys[i + 1];
                prevObj[prev] = Is.array(prevObj[prev]) ? prevObj[prev] : [];
                prevObj = prevObj[prev];
                i++;
            }

            if (isLast(i)) {
                prevObj.push(value);
            } else {
                if (Is.index(keys[i]) && !Is.index(keys[i + 1])) {
                    const index = keys[i];
                    prevObj[index] = prevObj[index] || {};
                    Utils.createObjectByProp(prevObj[index], keys, value, ++i);
                } else {
                    Utils.createObjectByProp(prevObj, keys, value, ++i);
                }
            }
        } else {
            obj[key] = obj[key] || {};
            if (isLast(i)) {
                obj[key] = value;
            } else {
                Utils.createObjectByProp(obj[key], keys, value, ++i);
            }
        }
    }

    static toKey(key: string): string | number {
        if(Is.index(key)) {
            return +key;
        }

        return key;
    }
}
