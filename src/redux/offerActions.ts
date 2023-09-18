import { addOFferToDB, getOffersData } from '../utils/db';

export const ADD_OFFER = 'ADD_OFFER';
export const LOAD_OFFERS = 'LOAD_OFFERS';

export const addOffer = (offerData: any) => {
  return async (dispatch: any, getState: any) => {
    try {
      const { loggedUserID } = getState().auth;
      await addOFferToDB({ ...offerData, uid: loggedUserID });
      dispatch(loadOffers());
    } catch (error) {
      console.error('Error adding offer:', error);
    }
  };
};

export const loadOffers = () => {
  return async (dispatch: any, getState: any) => {
    try {
      const { loggedUserID } = getState().auth;
      const offers = await getOffersData(loggedUserID);

      dispatch({
        type: LOAD_OFFERS,
        payload: offers,
      });
    } catch (error) {
      console.error('Error loading offers:', error);
    }
  };
};
