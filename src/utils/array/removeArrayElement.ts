const removeArrayElement = <T>(array: T[], element: T): boolean => {
  const elementIndex = array.indexOf(element);

  if (elementIndex === -1) {
    return false;
  }

  array.splice(elementIndex, 1);

  return true;
};

export default removeArrayElement;
