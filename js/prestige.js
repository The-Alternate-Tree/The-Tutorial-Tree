addLayer("t", {
    name: "tutorial", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "T", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#f1a603",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "tutorial points", // Name of prestige currency
    baseResource: "cats", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        gain = new Decimal(1)
        if (hasUpgrade("t", 12)) gain = gain.times(5)

        return gain
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "t", description: "T: Reset for tutorial points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    milestones: {
    1: {
        requirementDescription: "10 tutorial points",
        effectDescription: "X5 tutorial points",
        done() { return player.t.points.gte(10) }
    },
    
},
    upgrades: {
    11: {
        title: "your upgrade name",
        description: "double something",
        cost: new Decimal("1"),
        
    },
    12: {
        title: "your 2nd upgrade name",
        description: "triple something",
        cost: new Decimal("2"),
        unlocked() {
            return hasUpgrade('t', 11)
        },
        
    },
    21: {
        title: "non-static",
        description: "points boost points",
        cost: new Decimal("3"),
        unlocked() {
            return hasUpgrade('t', 11)
        },
        effect() {
            let eff = player.points.plus(2).pow(0.5)

            return eff
        },
                        effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect

        
    },
},
})

//player.points
//player.t.points

addLayer("r", {
    name: "rebirth", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#039af1",
    requires: new Decimal(500), // Can be a function that takes requirement increases into account
    resource: "rebirth points", // Name of prestige currency
    baseResource: "cats", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        gain = new Decimal(1)

        return gain
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "r", description: "R: Reset for rebirth points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    branches: ['t'],
})

//player.points
//player.t.points