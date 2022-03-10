export const updateObjectInArray = (
  items: any,
  itemId: number | string,
  objPropName: string,
  newObjProps: any,
) => {
  return items.map((item: any) =>
    item[objPropName] === itemId ? { ...item, ...newObjProps } : item,
  );
};
