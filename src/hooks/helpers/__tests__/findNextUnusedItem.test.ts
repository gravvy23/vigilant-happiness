import { findNextUnusedItem } from "../findNextUnusedItem";

describe("findNextUnusedItem", () => {
  test("should return next item index from the list when used list is empty", () => {
    const testList = ["Alice", "Beatrice", "Cindy", "Dakota", "Ester"];
    const usedList = [] as Array<string>;

    expect(findNextUnusedItem(usedList, testList, 0)).toEqual(1);
  });
  test("should return next item index from the list when used list desn't contain item", () => {
    const testList = ["Alice", "Beatrice", "Cindy", "Dakota", "Ester"];
    const usedList = ["Alice", "Ester"];

    expect(findNextUnusedItem(usedList, testList, 0)).toEqual(1);
  });
  test("should return next item index from the list when used list contain next item", () => {
    const testList = ["Alice", "Beatrice", "Cindy", "Dakota", "Ester"];
    const usedList = ["Beatrice", "Ester", "Cindy"];

    expect(findNextUnusedItem(usedList, testList, 0)).toEqual(3);
  });
  test("should return -1 when no next item in the list", () => {
    const testList = ["Alice", "Beatrice", "Cindy", "Dakota", "Ester"];
    const usedList = [] as Array<string>;

    expect(findNextUnusedItem(usedList, testList, testList.length - 1)).toEqual(
      -1
    );
  });
  test("should return -1 when no next unused item in the list", () => {
    const testList = ["Alice", "Beatrice", "Cindy", "Dakota", "Ester"];
    const usedList = [...testList];

    expect(findNextUnusedItem(usedList, testList, 0)).toEqual(-1);
  });
});
