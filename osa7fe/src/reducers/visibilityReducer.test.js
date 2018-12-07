import {loggedIn, loggedOut} from './visibilityReducer'
import deepFreeze from 'deep-freeze'
import store from '../store'
const utils = require('./../utils/utils.js')

describe(' test visibilityReducer', () => {

  test('initializes state', () => {

    deepFreeze({})
    var unsubscribe = store.subscribe(function() {
      const state = store.getState()
      expect(state.hideWhenLoggedIn.display.length).toBe(0)
      expect(state.showWhenLoggedIn.display).toMatch(/none/)
      //expect(store.getState()).;
      done();
    })
    loggedOut()
  })

  test('when logged in, should return opposite', () => {

    deepFreeze({})
    var unsubscribe = store.subscribe(function() {
      const state = store.getState()
      expect(state.showWhenLoggedIn.display.length).toBe(0)
      expect(state.hideWhenLoggedIn.display).toMatch(/none/)
      //expect(store.getState()).;
      done();
    })
    loggedIn()

  })

})
