function checkBossPhase() {
    if (!gameState.currentEnemy) return;

    if (gameState.currentEnemy.isBoss && gameState.currentEnemy.hp <= gameState.currentEnemy.maxHp / 2) {
        triggerBossPhaseChange();
    }
}

function triggerBossPhaseChange() {
    console.log("Boss is changing phase!");
    gameState.currentEnemy.attackPower += 20;
    gameState.currentEnemy.newAbility = "Meteor Shower";
}
