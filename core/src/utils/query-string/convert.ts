import type {ParsedUrlQuery, ParsedUrlQueryInput, StringifyOptions} from 'querystring';

// record의 value로 object만 없으면 됨.
export type ConvertableQuery = Record<string, string | string[] | boolean | number | number[] | null | undefined>;

export function cleanQuery(query: ConvertableQuery) {
  return Object.entries(query).reduce((a, [key, value]) => {
    if(!REMOVE_VALUE_ARRAY.includes(value as any)) {
      if (typeof value === 'number' || typeof value === 'boolean') {
        a[key] = value.toString();
      } else if (value === null) {
        a[key] = undefined;
      } else if (Array.isArray(value)) {
        a[key] = value.map(item => item.toString());
      } else {
        a[key] = value;
      }
    }

    return a;
  }, {} as ParsedUrlQuery);
}

export function stringifyQuery(query?: ConvertableQuery): '' | `?${string}` {
  const cleanedQuery = query ? cleanQuery(query) : {};

  if (Object.keys(cleanedQuery).length === 0) {
    return '';
  } else {
    return `?${stringify(cleanedQuery)}`;
  }
}

/*************************************************************************************************************
 * Non Export
 *************************************************************************************************************/
const REMOVE_VALUE_ARRAY = [undefined, null, Number.NaN];

function stringify(obj?: ParsedUrlQueryInput, sep = '&', eq = '=', options?: StringifyOptions): string {
  if (obj === null || obj === undefined) {
    return '';
  }

  const encode = options?.encodeURIComponent || globalThis.encodeURIComponent;
  const pairs: string[] = [];

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      const encodedKey = encode(key);

      if (Array.isArray(value)) {
        value.forEach((item) => {
          if (item !== undefined) {
            pairs.push(`${encodedKey}${eq}${encode(String(item))}`);
          }
        });
      } else if (value !== undefined) {
        pairs.push(`${encodedKey}${eq}${encode(String(value))}`);
      }
    }
  }

  return pairs.join(sep);
}
