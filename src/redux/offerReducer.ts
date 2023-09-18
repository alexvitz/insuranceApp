const initialOffersState = {
  offers: [],
};

const offerReducer = (state = initialOffersState, action: any) => {
  switch (action.type) {
    case 'ADD_OFFER':
      const newOffer = { ...action.payload, id: state.offers.length + 1 };
      return { ...state, offers: [...state.offers, newOffer] };
    case 'LOAD_OFFERS':
      return { ...state, offers: action.payload };
    default:
      return state;
  }
};

export default offerReducer;
