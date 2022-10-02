export const findNextUnusedItem = <T>(
  usedList: Array<T>,
  list: Array<T>,
  index: number
): number => {
  const nextIndex = index + 1;
  const nextQuestionInOrder = list[nextIndex];
  if (
    nextQuestionInOrder &&
    usedList.find((question) => question === nextQuestionInOrder)
  ) {
    return findNextUnusedItem(usedList, list, nextIndex);
  }

  return nextIndex < list.length ? nextIndex : -1;
};
