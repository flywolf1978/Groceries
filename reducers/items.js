// Start the sequence of item ID's at 0
let nextItemId = 0;
const defaultState = [
    { id: '1', item: 'Milk 1l', 'incart': false },
    { id: '2', item: 'Eggs Medium 12 pack', 'incart': true}
];
// Items reducer
const items = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      return [
        ...state,
        {
          id: nextItemId++,
          item: action.item,
          incart: action.incart
        }
      ];
    }
    case "REMOVE_ITEM": {
      // Find index of item with matching ID and then
      // remove it from the array by its' index
      const index = state.findIndex(x => x.id === action.id);
      return [...state.slice(0, index), ...state.slice(index + 1)];
    }
    default:
      return state;
  }
};

export default items;
