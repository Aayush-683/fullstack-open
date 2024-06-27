import deepFreeze from 'deep-freeze'
import counterReducer from './reducer.js'
import { describe, test } from 'node:test'
import assert from 'node:assert'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    assert.deepEqual(newState, initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    assert(newState.good === 1 && newState.ok === 0 && newState.bad === 0)
  })
})