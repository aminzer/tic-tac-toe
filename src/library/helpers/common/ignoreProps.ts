interface IgnoreProps {
  (...ignoredProps: string[]): (prop: string) => boolean;
}

const ignoreProps: IgnoreProps = (...ignoredProps) => {
  return (prop) => !ignoredProps.includes(prop);
};

export default ignoreProps;
