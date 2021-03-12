export function AutoBinder(_: any, _2: string, descriptor: PropertyDescriptor) {
  const handler = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    get() {
      const boundFn = handler.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}
