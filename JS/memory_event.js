function resolveMemoryEvent(eventType) {
    if (eventType === "Combat" || eventType === "Elite" || eventType === "Boss") {
        const enemy = { name: eventType + " Enemy", hp: 100, attackPower: 15, isBoss: eventType === "Boss", maxHp: 100 };
        startCombat(enemy);
    } else if (eventType === "Story" || eventType === "Mystery") {
        console.log("Story or Mystery event encountered.");
    }
}
