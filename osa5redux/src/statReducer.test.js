import statReducer from './statReducer'
import deepFreeze from 'deep-freeze'

describe('statRenderer', () => {

  const OK = { type: 'OK'}
  const BAD = { type: 'BAD'}
  const GOOD = { type: 'GOOD'}
  const ZERO = {type: 'ZERO'}
  const DO_NOTHING = {type: 'DO_NOTHING'}

  test('initializes state', () => {
    const state = {
      good: 0,
      ok: 0,
      bad: 0
    }

    deepFreeze(state)
    const newState = statReducer(state, ZERO)
    expect(newState.good).toBe(0)
    expect(newState.ok).toBe(0)
    expect(newState.bad).toBe(0)
  })

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}

    deepFreeze(state)
    const newState = statReducer(undefined, DO_NOTHING)
    expect(newState.good).toBe(0)
    expect(newState.ok).toBe(0)
    expect(newState.bad).toBe(0)
  })

  test('adds to OK', () => {
    const state = {
      good: 0,
      ok: 0,
      bad: 0
    }

    deepFreeze(state)
    const newState = statReducer(state, OK)
    expect(newState.good).toBe(0)
    expect(newState.ok).toBe(state.ok + 1)
    expect(newState.bad).toBe(0)
  })

  test('adds to bad', () => {
    const state = {
      good: 0,
      ok: 0,
      bad: 0
    }

    deepFreeze(state)
    const newState = statReducer(state, BAD)
    expect(newState.good).toBe(0)
    expect(newState.ok).toBe(0)
    expect(newState.bad).toBe(state.bad + 1)
  })

  test('adds to good', () => {
    const state = {
      good: 0,
      ok: 0,
      bad: 0
    }

    deepFreeze(state)
    const newState = statReducer(state, GOOD)
    expect(newState.good).toBe(state.good + 1)
    expect(newState.ok).toBe(0)
    expect(newState.bad).toBe(0)
  })

  test('adds to all and zeroes', () => {
    const state = {
      good: 0,
      ok: 0,
      bad: 0
    }

    deepFreeze(state)
    let newState = statReducer(state, OK)
    newState = statReducer(newState, BAD)
    newState = statReducer(newState, GOOD)
    expect(newState.good).toBe(state.good + 1)
    expect(newState.ok).toBe(state.ok + 1)
    expect(newState.bad).toBe(state.bad + 1)
    newState = statReducer(newState, ZERO)
    expect(newState.good).toBe(0)
    expect(newState.ok).toBe(0)
    expect(newState.bad).toBe(0)
  })


})
