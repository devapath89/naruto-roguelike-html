function startCombat(enemy) {
    console.log("Combat started against:", enemy.name);
    gameState.currentEnemy = enemy;
    showCombatOptions();
}

function showCombatOptions() {
    const gameDiv = document.getElementById('game');
    if (!gameDiv) return;

    gameDiv.innerHTML = "<h3>Choose an Ability:</h3>";
    gameState.playerAbilities.forEach(ability => {
        const button = document.createElement('button');
        button.textContent = ability.name;
        button.onclick = () => useAbility(ability);
        gameDiv.appendChild(button);
    });
}

function useAbility(ability) {
    console.log("Using ability:", ability.name);
    gameState.currentEnemy.hp -= ability.damage;
    if (gameState.currentEnemy.hp <= 0) {
        console.log("Enemy defeated!");
        triggerLootDrop();
        checkEvolutionConditions();
    } else {
        enemyTurn();
    }
}

function enemyTurn() {
    console.log("Enemy attacks!");
    gameState.playerHP -= 10;
    if (gameState.playerHP <= 0) {
        console.log("Player defeated.");
    } else {
        showCombatOptions();
    }
}
