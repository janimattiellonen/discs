import { List, Map } from "immutable";


const defaultState = Map({
  discs: List(
    [
      {
        id: 1,
        name: "Mako3",
      },
      {
        id: 2,
        name: "Destroyer",
      }
    ]
  ),
});

export default function (state = defaultState, action = {}) {
  const { type, payload } = action;

  switch(type) {
    default:
      return state;
  }
};
