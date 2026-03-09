declare global {
  interface ObjectConstructor {
    keys(o: object): string[];
    values<T>(o: { [key: string]: T } | ArrayLike<T>): T[];
    values(o: object): any[];
  }
}

export {};
