interface ValidString {
  required: boolean;
  minLength: number;
  value: string;
}
interface ValidNumber {
  required: boolean;
  value: number;
  min: number;
  max: number;
}

export function inputValidation(
  conditions: ValidNumber | ValidString
): boolean {
  if ('max' in conditions) {
    const { max, min, value, required } = conditions;
    if (required) {
      if (value < min || value > max) {
        return false;
      }
    }
  } else {
    const { value, minLength, required } = conditions;
    if (required) {
      if (value.trim().length < minLength) {
        return false;
      }
    }
  }
  return true;
}
