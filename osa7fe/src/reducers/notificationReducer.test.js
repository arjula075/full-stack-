import { notificationChange } from './notificationReducer'
import deepFreeze from 'deep-freeze'
import store from '../store'
const utils = require('./../utils/utils.js')

describe(' test visibilityReducer', () => {
// ensin testataan että ei näytetä mitään
test('initial state', () => {
    const state = store.getState()
    console.log('state', state);
    expect(state.notification.notification).toMatch(/Nothing new in the western front/)
    expect(state.notification.type).toMatch(/NO_NOTIFICATION/)
})

// sitten testataan, että muutoksen jälkeen näkyy
// ja sitten että taas kohta ei näy
test('after change and then reset to normal', () => {

  deepFreeze({})
  var unsubscribe = store.subscribe(function() {
    const state = store.getState()
    expect(state.notification.notification).toMatch(/this is getting too silly/)
    expect(state.notification.type).toMatch(/NOTIFICATION_ON/)
    done();
  })
  notificationChange('this is getting too silly', 2)

  setTimeout(() => {
    const state = store.getState()
    console.log('state', state);
    expect(state.notification.notification).toMatch(/this is getting too silly/)
    expect(state.notification.type).toMatch(/NOTIFICATION_ON/)
    }, 1000)

    setTimeout(() => {
      const state = store.getState()
      expect(state.notification.notification).toMatch(/Nothing new in the western front/)
      expect(state.notification.type).toMatch(/NO_NOTIFICATION/)
    }, 1500)
  })
})
