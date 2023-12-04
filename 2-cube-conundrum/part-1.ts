// deno run --allow-read 2-cube-conundrum/part-1.ts

import { gameRecord } from "./index.ts"

const gameCriteria = {
    red: 12,
    green: 13,
    blue: 14,
}

const validGames = gameRecord.filter(
    game =>
        !Object.entries(gameCriteria)
            .map(([color, qty]) => game.pulls.some(pull => pull[color] > qty))
            .some(Boolean)
)

const validGameIdSum = validGames.reduce((acc, game) => acc + game.gameId, 0)

console.log(validGameIdSum)
