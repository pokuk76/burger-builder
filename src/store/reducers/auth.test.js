import reducer from './auth';
import { initialState } from './auth';

import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
    it('should return the initial state on undefined behaviour', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should store token upon login', () => {
        expect(reducer({ ...initialState, authRedirectPath: '/', }, {
            type: actionTypes.AUTH_SUCCESS, 
            idToken: 'some-token', 
            userId: 'some-user-id', 
        })).toEqual({
            token: 'some-token', 
            userId: 'some-user-id', 
            error: null,
            loading: false,
            authRedirectPath: '/', 
        });
    });
})