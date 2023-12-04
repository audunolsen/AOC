// deno run --allow-read 2-cube-conundrum/part-2.ts

import { gameRecord } from "./index.ts"

const bagsPerGame = gameRecord.map(game => {
    return game.pulls.reduce<Record<string, number>>((acc, pull) => {
        for (const [color, qty] of Object.entries(pull)) {
            acc[color] ??= qty
            if (qty > acc[color]) acc[color] = qty
        }

        return acc
    }, {})
})

const ultimatePower = bagsPerGame.reduce((acc, bag) => {
    return acc + Object.values(bag).reduce((a, b) => a * b)
}, 0)

console.log(ultimatePower)
