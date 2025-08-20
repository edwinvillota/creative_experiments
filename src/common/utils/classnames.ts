type ClassNameCondition = [
  condition: boolean,
  classname: string,
  fallback?: string,
];

function isClassNameCondition(
  value: ClassNameCondition | string
): value is ClassNameCondition {
  return (
    Array.isArray(value) &&
    typeof value[0] === 'boolean' &&
    typeof value[1] === 'string'
  );
}

export function classnames(...args: Array<ClassNameCondition | string>) {
  let result: string = '';

  for (const condition of args) {
    if (isClassNameCondition(condition)) {
      if (condition[0]) {
        result = result.concat(condition[1] + ' ');
      } else if (condition[2]) {
        result = result.concat(condition[2] + ' ');
      }
    }

    if (typeof condition === 'string') {
      result = result.concat(condition + ' ');
    }
  }

  return result.trim();
}
