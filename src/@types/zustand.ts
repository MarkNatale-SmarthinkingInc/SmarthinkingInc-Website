// Zustand Selector good typed
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type SelectParameters<T extends (...args: any) => any> = Parameters<
  Parameters<T>[0]
>[0];
