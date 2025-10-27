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
        console.log("NA gain mults loading")
        let mult = new Decimal(1)
        if (hasUpgrade("normal", 12)) mult = mult.times(upgradeEffect("normal", 12))
        if (hasUpgrade("normal", 14)) mult = mult.times(upgradeEffect("normal", 14))
        if (hasUpgrade("normal", 18)) mult = mult.times(upgradeEffect("normal", 18))
        return mult
    //upgrade multipliers   
    },

    gainExp() {
        console.log("NA gain exp loading (idk what ts is)")
        return new Decimal(1)
    },
    row: 0,
    
    hotkeys: [
        console.log("hotkeys loading"),
        {key: "n", description: "N: Extract Normal Air from Air Essence.", onPress() { if (canReset(this.layer)) doReset(this.layer) }},
    ],
    layerShown() { return true },
    
    infoboxes: {
        information: {
            title: "Normal Air Information",
            body() { return "Normal Air (NA) is the 1st layer. In NA, there are 6 upgrades and 1 buyable (numbers might be inaccurate if i dont update them during updates) (until you get to the other layers)." },
        },
    },

    upgrades: {//upgrades
        11: {
            title: "Essence extraction efficiency",
            description: "Increase the efficiency of extracting Essennce, making gathering Essence twice as fast.",
            cost: new Decimal(3),
            effect() {
                return new Decimal(2)
            },
            effectDisplay() {
                return "x" + format(this.effect())
            },
        },
        12: {
            title: "Normal Air extraction efficiency",
            description: "Use better methods of extracting the Normal Air from Essence, giving 3 times as much as before.",
            cost: new Decimal(10),
            effect() {
                return new Decimal(3)
            },
            effectDisplay() {
                return "x" + format(this.effect())
            },
            unlocked() {
                return hasUpgrade("normal", 11)
            }
        },
        13: {
            title: "Breathing",
            description: "breathe in the normal air to make extracting air better. wait does that mean u didnt breathe before??? what",
            cost: new Decimal(15),
            effect() {
                return player.points.add(1).log(10).add(1)
            },
            effectDisplay() {
                return "×" + format(this.effect())
            },
            unlocked() {
                return hasUpgrade("normal", 12)
            }
        },
        14: {
            title: "Normal Air extraction efficiency 2",
            description: "Normal Air extraction is now 5x as efficient.",
            cost: new Decimal(25),
            effect() {
                return new Decimal(5)
            },
            effectDisplay() {
                return "×" + format(this.effect())
            },
            unlocked() {
                return hasUpgrade("normal", 13)
            }
            
        },
        15: {
            title: "Normal Air extraction efficency 3 (pls help with names)",
            description: "10x normal air and unlock ???",
            cost: new Decimal(100),
            effect() {
                return new Decimal(10)
            },
            effectDisplay() {
                return "×" + format(this.effect())
            },
            unlocked() {
                return hasUpgrade("normal", 14)
            }
        },
        17: {
            title: "Where is the air coming from?",
            description: "100x NA",
            cost: new Decimal(250),
            effect() {
                return new Decimal(100)
            },
            unlocked() {   
                return hasUpgrade("normal", 15)
            }
        },
        18: {
            title: "Breathing 2",
            description: "Introducing breathing 2, which is more efficient than before. Buy breathing 2 now for only 500 NA!",
            cost: new Decimal(500),
            effect() {
                return player.normal.points.add(1).log(5).add(1)
            },
            effectDisplay() {
                return "×" + format(this.effect())
            },
        }
    },
    buyables: { //buyables idk
        16: {
            cost(x) {
                return new Decimal(100).mul(Decimal.pow(3, x || getBuyableAmount("normal", 16))) //*3 each time i think
            },
            effect(x) {
                return Decimal.pow(2, x) //2x air
            },
            display() {
                const amt = getBuyableAmount("normal", 16)
                return `Double NA gain!<br>Level: ${amt}<br>Effect: ×${format(this.effect(amt))}<br>Cost: ${format(this.cost(amt))}`
            },
            canAfford() {
                return player.normal.points.gte(this.cost())
            },
            buy() {
                let cost = this.cost()
                if (!player.normal.points.gte(cost)) return
                player.normal.points = player.normal.points.sub(cost)
                addBuyables("normal", 16, 1)
            },
            unlocked() {
                return hasUpgrade("normal", 15)
            },
        },
    },
    
})
console.log("Other layer stuff loaded")//console log