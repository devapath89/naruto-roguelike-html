// combat.js (Integration Example)

// Assume currentEnemy and playerState are defined in combat loop
import { decideEnemyAction } from './ai.js';

// Simulated data (in real code, this would come from game state)
const currentTurn = 4;
const activeTags = ['War', 'Betrayal'];
const previousPlayerMove = { type: 'buff', name: 'Chakra Boost' };
const enemyAIOptions = {
  restricted_abilities: ['Majestic Flame']
};

// Example usage inside combat loop
function enemyTurn(currentEnemy, playerState) {
  const action = decideEnemyAction(currentEnemy, playerState, {
    turn: currentTurn,
    memoryTags: activeTags,
    lastPlayerAction: previousPlayerMove,
    ai_modifiers: enemyAIOptions
  });

  resolveEnemyAction(action); // Custom game engine resolution
}

// Placeholder: implement this in your game loop
function resolveEnemyAction(action) {
  console.log("Enemy chooses:", action);
}