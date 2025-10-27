console.log("Layer loaded")
addLayer("normal", {
    name: "Normal Air",
    symbol: "N",
    position: 0,
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    color: "#CCCCCC",
    requires: new Decimal(10),
    resource: "Normal air",
    baseResource: "air",
    baseAmount() { return player.points }, 
    type: "normal",
    exponent: 0.75, //scaling, lower = harder higher =  easier, values more than 1 are not recommended and 0.5 is normal. 1 is no scaling (bad :0)
    //notes for myself idk
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade("normal", 12)) mult = mult.times(upgradeEffect("normal", 12))
        if (hasUpgrade("normal", 14)) mult = mult.times(upgradeEffect("normal", 14))
        if (hasUpgrade("normal", 18)) mult = mult.times(upgradeEffect("normal", 18))
        return mult
    //upgrade multipliers
    
    },
    gainExp() {
        return new Decimal(1)
    },
    row: 0,
    hotkeys: [
        {key: "n", description: "N: Transform Air Essence into Normal Air", onPress() { if (canReset(this.layer)) doReset(this.layer) }},
    ],
    layerShown() { return true },
    upgrades: {//upgrades
        11: {
            title: "Air extraction efficiency boost",
            description: "2x air. Nice and simple.",
            cost: new Decimal(3),
            effect() {
                return new Decimal(2)
            },
            effectDisplay() {
                return "x" + format(this.effect())
            },
        },
        12: {
            title: "Normal Air conversion boost",
            description: "3x Normal Air.",
            cost: new Decimal(10),
            effect() {
                return new Decimal(3)
            },
            effectDisplay() {
                return "x" + format(this.effect())
            },
            unlocked() {
                return hasUpgrade("p", 11)
            }
        },
        13: {
            title: "generic incremental upgrade",
            description: "You have seen this a million times before, so why not again? :3",
            cost: new Decimal(15),
            effect() {
                return player.points.add(1).log(5).add(1)
            },
            effectDisplay() {
                return "×" + format(this.effect())
            },
            unlocked() {
                return hasUpgrade("p", 12)
            }
        },
        14: {
            title: "Even more efficient converters",
            description: "Air conversion to normal air is now 5x as efficient.",
            cost: new Decimal(25),
            effect() {
                return new Decimal(5)
            },
            effectDisplay() {
                return "×" + format(this.effect())
            },
            unlocked() {
                return hasUpgrade("p", 13)
            }
            
        },
        15: {
            title: "time to get big numbers!",
            description: "10x normal air and unlock a buyable :0",
            cost: new Decimal(100),
            effect() {
                return new Decimal(10)
            },
            effectDisplay() {
                return "×" + format(this.effect())
            },
            unlocked() {
                return hasUpgrade("p", 14)
            }
        },
        17: {
            title: "i really need to get to big numbers soon",
            description: "100x air",
            cost: new Decimal(250),
            effect() {
                return new Decimal(100)
            },
            unlocked() {   
                return hasUpgrade("p", 15)
            }
        },
        18: {
            title: "normal air powered air exractors",
            description: "Boost air gain by normal air by using normal air",
            cost: new Decimal(500),
            effect() {
                return player.p.points.add(1).log(5).add(1)
            },
            effectDisplay() {
                return "×" + format(this.effect())
            },
        }
    },
    buyables: { //buyables idk
        16: {
            cost(x) {
                return new Decimal(100).mul(Decimal.pow(3, x || getBuyableAmount("p", 16))) //*3 each time i think
            },
            effect(x) {
                return Decimal.pow(2, x) //2x air
            },
            display() {
                const amt = getBuyableAmount("p", 16)
                return `Double air gain<br>Level: ${amt}<br>Effect: ×${format(this.effect(amt))}<br>Cost: ${format(this.cost(amt))}`
            },
            canAfford() {
                return player.p.points.gte(this.cost())
            },
            buy() {
                let cost = this.cost()
                if (!player.p.points.gte(cost)) return
                player.p.points = player.p.points.sub(cost)
                addBuyables("p", 16, 1)
            },
            unlocked() {
                return hasUpgrade("p", 15)
            },
        },
    },
    
})
console.log("Layer loaded")//console log