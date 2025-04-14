function applyMemoryTagEffects(tag) {
    console.log("Applying Memory Tag:", tag);

    if (tag === "War") {
        gameState.playerHP += 20;
    } else if (tag === "Betrayal") {
        gameState.playerChakra -= 10;
    } else if (tag === "Training") {
        gameState.playerAbilities.forEach(ability => ability.damage += 5);
    }
}
