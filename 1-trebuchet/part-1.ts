// deno run --allow-read 1-trebuchet/part-1.ts

const input = await Deno.readTextFile("1-trebuchet/puzzle-input.txt")

const sum = input.split("\n").reduce((acc, line) => {
    const chars = line.split("")
    const secret = [chars, [...chars].reverse()].reduce(
        (a, e) => a + e.find(e => !isNaN(Number(e))),
        ""
    )

    return acc + parseInt(secret)
}, 0)

console.log(sum)
