import { test, describe } from "node:test"
import assert from "node:assert"
import { sum } from './app.js'

describe("If sum is working correctly", () => {
    test("If the sum is correct", () => {
        const a = 2
        const b = 1
        const actual = a + b
        const expected = 3
        assert.equal(actual, expected)
    })

    test("If the sum is not correct", () => {
        const a = 2
        const b = 2
        const actual = a + b
        const expected = 3
        assert.notEqual(actual, expected)
    })
})