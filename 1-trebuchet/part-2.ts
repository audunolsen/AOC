// deno run --allow-read 1-trebuchet/part-2.ts

const input = await Deno.readTextFile("1/input.txt")

const singleDigitWords = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
]

const sum = input.split("\n").reduce((acc, line) => {
    const first = findDigit(line)
    const last = findDigit(line, { reversed: true })

    return acc + parseInt("" + first + last)
}, 0)

console.log(sum)

function findDigit(line: string, opts: { reversed?: boolean } = {}) {
    let found = 0
    const chars = opts.reversed ? [...line].reverse() : [...line]

    for (const [index, char] of chars.entries()) {
        if (!isNaN(Number(char))) {
            found = parseInt(char)
            break
        }

        const words = opts.reversed
            ? singleDigitWords.map(w => [...w].reverse().join(""))
            : singleDigitWords

        const foundWord = words.find(w =>
            chars.join("").slice(index).startsWith(w)
        )

        if (foundWord) {
            found = words.indexOf(foundWord) + 1
            break
        }
    }

    return found
}
