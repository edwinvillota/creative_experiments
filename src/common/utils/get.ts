import { TNestedKeyOf } from '../types';

export function get<TObject>(
  object: TObject,
  path: TNestedKeyOf<TObject>
): string | number | boolean | undefined {
  if (!object || typeof path !== 'string') return undefined;

  const segments = path.split('.');
  const [first, ...rest] = segments;

  if (
    segments.length === 1 ||
    typeof object[first as keyof TObject] !== 'object' ||
    object[first as keyof TObject] === null
  ) {
    return object[first as keyof TObject] as string | number | boolean;
  }

  return get(
    object[first as keyof TObject] as TObject,
    rest.join('.') as TNestedKeyOf<TObject>
  );
}
