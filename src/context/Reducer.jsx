export const boardReducer = (state, action) => {
  console.log(state);
  switch (action.type) {
    case "ADD_BOARD":
      localStorage.setItem(
        "boards",
        JSON.stringify([
          ...state,
          {
            id: parseInt(Date.now() * Math.random()),
            title: action.payload.title,
          },
        ])
      );
      return [
        ...state,
        {
          id: parseInt(Date.now() * Math.random()),
          title: action.payload.title,
        },
      ];
    case "REMOVE_BOARD":
      localStorage.setItem(
        "boards",
        JSON.stringify([
          ...state.filter((board) => board.id !== action.payload.id),
        ])
      );

      return [...state.filter((board) => board.id !== action.payload.id)];
    case "UPDATE_TO_LOCALSTORAGE":
      localStorage.setItem("boards", JSON.stringify([...state]));
      return state;
    case "UPDATE_FROM_LOCALSTORAGE":
      return [...action.payload.data];
    default:
      return state;
  }
};

export const cardReducer = (state, action) => {
  switch (action.type) {
    case "ADD_CARD":
      localStorage.setItem(
        "cards",
        JSON.stringify([
          ...state,
          {
            bid: action.payload.bid,
            id: action.payload.id,
            title: action.payload.title,
          },
        ])
      );
      return [
        ...state,
        {
          bid: action.payload.bid,
          id: action.payload.id,
          title: action.payload.title,
        },
      ];
    case "REMOVE_CARD":
      console.log(
        "rem",
        JSON.stringify([
          ...state.filter((card) => card.id !== action.payload.id),
        ])
      );
      localStorage.setItem(
        "cards",
        JSON.stringify([
          ...state.filter((card) => card.id !== action.payload.id),
        ])
      );
      return [...state.filter((card) => card.id !== action.payload.id)];
    case "EDIT_CARD":
      localStorage.setItem(
        "cards",
        JSON.stringify([
          ...state.map((card) => {
            console.log("Set", action.payload.title);
            console.log(card.id === action.payload.id);
            if (card.id === action.payload.id) {
              card.title = action.payload.title;
            }
            return card;
          }),
        ])
      );
      return [
        ...state.map((card) => {
          if (card.id === action.payload.id) {
            card.title = action.payload.title;
          }
          return card;
        }),
      ];
    case "UPDATE_FROM_LOCALSTORAGE":
      return [...action.payload.data];
    default:
      state;
  }
};
