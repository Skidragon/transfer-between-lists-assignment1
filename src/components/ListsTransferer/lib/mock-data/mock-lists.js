import uuidv1 from "uuid/v1";
const mockList1 = [
  {
    id: uuidv1(),
    name: "sushi",
    isChecked: false,
  },
  {
    id: uuidv1(),
    name: "bananas",
    isChecked: false,
  },
  {
    id: uuidv1(),
    name: "ice cream",
    isChecked: false,
  },
];

const mockList2 = [
  {
    id: uuidv1(),
    name: "a",
    isChecked: false,
  },
  {
    id: uuidv1(),
    name: "b",
    isChecked: false,
  },
  {
    id: uuidv1(),
    name: "c",
    isChecked: false,
  },
];

export { mockList1, mockList2 };
