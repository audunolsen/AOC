// deno run --allow-read 2-cube-conundrum/part-1.ts

const input = await Deno.readTextFile("2-cube-conundrum/puzzle-input.txt")

type GameRecord = Array<{
    gameId: number
    pulls: Array<Record<string, number>>
}>

const gameRecord: GameRecord = input.split("\n").map((line, i) => {
    line = line.replace(/\s/g, "")
    const [, rawGameData] = line.split(":")

    const gameData = rawGameData.split(";").map(pull => {
        const matches = [...pull.matchAll(/(?<qty>\d+)(?<color>\w+)/g)]

        return matches.reduce<Record<string, number>>((acc, match) => {
            const color = match?.groups?.color
            if (!color) return acc

            return {
                ...acc,
                // Assumes color is only mentioned once in each pull
                [color]: parseInt(match?.groups?.qty ?? "0"),
            }
        }, {})
    })

    return {
        gameId: i + 1,
        pulls: gameData,
    }
}, {})

const gameCriteria = {
    red: 12,
    green: 13,
    blue: 14,
}

const validGames = gameRecord.filter(game => {
    let isLacking = false

    for (const [color, qty] of Object.entries(gameCriteria)) {
        isLacking = game.pulls.some(pull => pull[color] > qty)

        if (isLacking) break
    }

    return isLacking
})

const validGameIdSum = validGames.reduce((acc, e) => acc + e.gameId, 0)

console.log(validGames, validGameIdSum)
