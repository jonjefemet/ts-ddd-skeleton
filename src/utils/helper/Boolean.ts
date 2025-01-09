enum AllowBooleanValue {
  "false",
  "true"
}

export const isAllowBoolean = ( unknownValue: unknown ): boolean => {
  if ( typeof unknownValue === "boolean" ) {
    return true;
  }

  const AllowBoolean = Object.entries( AllowBooleanValue );

  return AllowBoolean.some(([
    key,
    value
  ]) => {
    return Number( key ) === Number( unknownValue ) || value.toString().toUpperCase() === unknownValue.toString().toUpperCase();
  });
};