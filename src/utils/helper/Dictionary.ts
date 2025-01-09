declare type Dictionary<T, E extends { [key: string]: string }> = {
  [K in keyof E]: T & { code: E[K] };
};

export default Dictionary;