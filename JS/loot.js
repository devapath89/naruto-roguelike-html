function triggerLootDrop() {
    console.log("Loot dropped!");
    const relic = { name: "Chakra Crystal", effect: "+10 Chakra" };
    gameState.relics.push(relic);
}
