

package frontend.reducers;

import { createStore, combineReducers } from 'redux';
import { mauiApp } from './mauiApp';

const MAUI_APP_CREATED = 'MAUI_APP_CREATED';
const MAUI_APP_UPDATED = 'MAUI_APP_UPDATED';

const mauiAppReducer = (state = mauiApp, action) => {
    switch (action.type) {
        case MAUI_APP_CREATED:
            return { ...state, instance: action.instance };
        case MAUI_APP_UPDATED:
            return { ...state, ...action.update };
        default:
            throw new Error(`Invalid action type: ${action.type}`);
    }
};

const rootReducer = combineReducers({
    mauiApp: mauiAppReducer
});

const store = createStore(rootReducer);

export default store;