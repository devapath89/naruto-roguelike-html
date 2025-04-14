function triggerAbilityEvolution() {
    console.log("Triggering ability evolution...");
    gameState.playerAbilities.push({ name: "Majestic Fireball", damage: 40 });
}

function checkEvolutionConditions() {
    if (gameState.memoryEventsCleared >= 3) {
        triggerAbilityEvolution();
    }
}
