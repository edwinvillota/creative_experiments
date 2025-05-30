export type TNestedKeyOf<
  TObject,
  TKey = keyof TObject,
> = TKey extends keyof TObject & (string | number)
  ?
      | `${TKey}`
      | (TObject[TKey] extends object
          ? `${TKey}.${TNestedKeyOf<TObject[TKey]>}`
          : never)
  : never;
