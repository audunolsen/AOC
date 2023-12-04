const input = await Deno.readTextFile("2-cube-conundrum/puzzle-input.txt")

type GameRecord = Array<{
    gameId: number
    pulls: Array<Record<string, number>>
}>

export const gameRecord: GameRecord = input.split("\n").map((line, i) => {
    line = line.replace(/\s/g, "")
    const [, rawGameData] = line.split(":")

    const gameData = rawGameData.split(";").map(pull => {
        const matches = [...pull.matchAll(/(?<qty>\d+)(?<color>\w+)/g)]

        return matches.reduce<Record<string, number>>((acc, match) => {
            const color = match?.groups?.color

            return !color
                ? acc
                : { ...acc, [color]: parseInt(match?.groups?.qty ?? "0") }
        }, {})
    })

    return {
        gameId: i + 1,
        pulls: gameData,
    }
}, {})
