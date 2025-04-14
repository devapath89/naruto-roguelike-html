function applyEnemyScaling(enemy) {
    enemy.hp = Math.floor(enemy.hp * 1.05);
    enemy.attackPower = Math.floor(enemy.attackPower * 1.05);
}
