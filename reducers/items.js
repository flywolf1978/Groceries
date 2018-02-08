// Start the sequence of item ID's at 0
let nextItemId = 0;
const defaultState = [
    { id: '1', name: 'First Item', "bgColor": "#333333" },
    { id: '2', name: 'Second Item', "bgColor": "#33aa33" }
];
// Items reducer
const items = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      return [
        ...state,
        {
          id: nextItemId++,
          name: action.name,
          bgColor: action.bgColor
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
