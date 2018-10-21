import { List, Map } from "immutable";


const defaultState = Map({
  discs: List(
    [
      {
        id: 1,
        name: "Mako3",
        type: 'midrange',
        manufacturer: 'innova',
        material: 'star',
        weight: 175,
        speed: 5,
        glide: 5,
        stability: 0,
        fade: 0,
        additional: null,
        image: 'https://testdb-8e20.restdb.io/media/5babdf7981f9ca39000071f7',
        isMissing: false,
        missingDescription: null,
        isSold: false,
        soldAt: null,
        isBroken: false,
        holeInOneCount: 0,
        isCollectionItem: false,
      },
      {
        id: 2,
        name: "Teebird",
        type: 'fairwayDriver',
        manufacturer: 'innova',
        material: 'star',
        weight: 167,
        speed: 7,
        glide: 5,
        stability: 0,
        fade: 2,
        additional: null,
        image: 'https://testdb-8e20.restdb.io/media/56d9dc47011d315d00004c35',
        isMissing: false,
        missingDescription: null,
        isSold: false,
        soldAt: null,
        isBroken: false,
        holeInOneCount: 0,
        isCollectionItem: false,
      },
      {
        id: 3,
        name: "Teebird",
        type: 'fairwayDriver',
        manufacturer: 'innova',
        material: 'star',
        weight: 167,
        speed: 7,
        glide: 5,
        stability: 0,
        fade: 2,
        additional: null,
        image: 'https://testdb-8e20.restdb.io/media/5939739b639cc705000000da',
        isMissing: false,
        missingDescription: null,
        isSold: false,
        soldAt: null,
        isBroken: false,
        holeInOneCount: 0,
        isCollectionItem: false,
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
