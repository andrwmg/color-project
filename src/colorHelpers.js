// {
//     paletteName: "Flat UI Colors French",
//     id: "flat-ui-colors-french",
//     emoji: "🇫🇷",
//     colors: [
//       { name: "FlatFlesh", color: "#fad390" },
//       { name: "MelonMelody", color: "#f8c291" },
//       { name: "Livid", color: "#6a89cc" },
//       { name: "Spray", color: "#82ccdd" },
//       { name: "ParadiseGreen", color: "#b8e994" },
//       { name: "SquashBlossom", color: "#f6b93b" },
//       { name: "MandarinRed", color: "#e55039" },
//       { name: "AzraqBlue", color: "#4a69bd" },
//       { name: "Dupain", color: "#60a3bc" },
//       { name: "AuroraGreen", color: "#78e08f" },
//       { name: "IcelandPoppy", color: "#fa983a" },
//       { name: "TomatoRed", color: "#eb2f06" },
//       { name: "YueGuangBlue", color: "#1e3799" },
//       { name: "GoodSamaritan", color: "#3c6382" },
//       { name: "Waterfall", color: "#38ada9" },
//       { name: "CarrotOrange", color: "#e58e26" },
//       { name: "JalapenoRed", color: "#b71540" },
//       { name: "DarkSapphire", color: "#0c2461" },
//       { name: "ForestBlues", color: "#0a3d62" },
//       { name: "ReefEncounter", color: "#079992" }
//     ]
//   }

import chroma from "chroma-js";
const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]

function generatePalette(starterPalette) {
    let newPalette = {
        paletteName: starterPalette.paletteName,
        id: starterPalette.id,
        emoji: starterPalette.emoji,
        colors: {}
    }
    for (let level of levels) {
        newPalette.colors[level] = []
    }
    for (let color of starterPalette.colors) {
        let scale = getScale(color.color, 10).reverse();
        for (let i in scale) {
            newPalette.colors[levels[i]].push({
                name: `${color.name} ${levels[i]}`,
                id: color.name.toLowerCase().replace(/ /g, '-'),
                hex: scale[i],
                rgb: chroma(scale[i]).css(),
                rgba: chroma(scale[i])
                .css()
                .replace('rgb','rgba')
                .replace(')', ',1.0)')
            })
        }
    }
    return newPalette
}

function getRange(hexColor) {
    const end = '#fff';
    return [
        chroma(hexColor)
            .darken(1.4)
            .hex(),
        hexColor,
        end
    ]
}
function getScale(hexColor, numberOfColors) {
    return chroma
        .scale(getRange(hexColor))
        .mode('lab')
        .colors(numberOfColors)
}

export default generatePalette