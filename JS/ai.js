// ai.js
// Enemy AI Decision Engine for Naruto Text-Based Roguelike
// This module evaluates enemy behavior during combat and returns an optimal action.

/**
 * Main AI decision function.
 * Called from combat.js or boss.js to determine enemy action for the current turn.
 * @param {Object} enemy - The enemy object (contains stats, chakra, abilities, passives, ai_type).
 * @param {Object} player - The player object (HP, chakra, status effects).
 * @param {Object} stateContext - Includes node type, memory tags, turn number, phase data, ai_modifiers, lastPlayerAction.
 * @returns {Object} actionObject - Contains { type: 'attack' | 'special' | 'buff', ability: abilityObject }
 */
function decideEnemyAction(enemy, player, stateContext) {
  let availableAbilities = getAvailableAbilities(enemy);

  // Apply AI restrictions if any
  if (stateContext.ai_modifiers && stateContext.ai_modifiers.restricted_abilities) {
    const restricted = stateContext.ai_modifiers.restricted_abilities;
    availableAbilities = availableAbilities.filter(ab => !restricted.includes(ab.name));
  }

  const scored = availableAbilities.map(ab => {
    return {
      ability: ab,
      score: scoreAbility(ab, player, stateContext, enemy)
    };
  });

  const adjusted = applyMemoryTagModifiers(stateContext.memoryTags || [], scored);
  return selectActionFromScores(adjusted);
}

function getAvailableAbilities(enemy) {
  return enemy.abilities.filter(ab => {
    return enemy.chakra >= ab.cost && !ab.cooldown;
  });
}

function scoreAbility(ability, player, stateContext, enemy) {
  let score = 0;
  const turn = stateContext.turn || 1;
  const playerLowHP = player.hp / player.maxHp < 0.5;
  const enemyLowChakra = enemy.chakra < 0.3 * enemy.maxChakra;
  const aiType = enemy.ai_type || "balanced";
  const lastPlayerAction = stateContext.lastPlayerAction || null;

  if (ability.type === 'damage') {
    score += ability.power;
    if (playerLowHP) score += 10;
    if (enemyLowChakra && ability.cost > 10) score -= 5;
    if (ability.critChance) score += ability.critChance * 2;
  }

  if (ability.type === 'buff') {
    if (turn === 1) score += 8;
    if (turn > 5) score -= 3;
  }

  if (ability.type === 'special') {
    score += 5;
    if (ability.tags && ability.tags.includes('disrupt')) score += 5;
    if (enemyLowChakra && ability.cost > 20) score -= 8;
  }

  if (aiType === 'reckless') {
    if (ability.type === 'damage') score += 5;
    if (ability.cost > 15) score += 3;
  } else if (aiType === 'strategist') {
    if (ability.type === 'buff') score += 4;
    if (ability.tags && ability.tags.includes('debuff')) score += 4;
  } else if (aiType === 'cautious') {
    if (enemy.hp / enemy.maxHp < 0.5 && ability.type === 'buff') score += 5;
    if (ability.type === 'damage' && ability.power > 20) score -= 3;
  } else if (aiType === 'opportunist') {
    if (playerLowHP || player.chakra < 20) score += 5;
    if (ability.type === 'special' && ability.tags && ability.tags.includes('execute')) score += 6;
  }

  if (lastPlayerAction && ability.tags && ability.tags.includes('counter')) {
    if (lastPlayerAction.type === 'buff' || lastPlayerAction.type === 'setup') {
      score += 4;
    }
  }

  return score;
}

function applyMemoryTagModifiers(tags, scoredAbilities) {
  let adjusted = scoredAbilities.map(entry => ({ ...entry }));

  tags.forEach(tag => {
    if (tag === 'War') {
      adjusted.forEach(e => { if (e.ability.type === 'damage') e.score += 5; });
    }
    if (tag === 'Betrayal') {
      adjusted.forEach(e => { if (e.ability.critChance) e.score += 3; });
    }
    if (tag === 'Training') {
      adjusted.forEach(e => { if (e.ability.type === 'buff') e.score += 3; });
    }
  });

  return adjusted;
}

function selectActionFromScores(scoredAbilities) {
  scoredAbilities.sort((a, b) => b.score - a.score);
  const top = scoredAbilities[0];
  return {
    type: top.ability.type,
    ability: top.ability
  };
}

function handleBossPhaseShift(boss, stateContext) {
  if (boss.hp / boss.maxHp <= 0.5 && !boss.phaseChanged) {
    boss.phaseChanged = true;
    boss.abilities.push(...boss.phaseAbilities);
    boss.passives.push(...(boss.phasePassives || []));
  }
  return boss;
}

function injectEliteBehavior(baseAI) {
  return function(elite, player, stateContext) {
    let action = baseAI(elite, player, stateContext);

    if (elite.passives.includes('Berserk') && elite.hp / elite.maxHp < 0.5) {
      action.score += 5;
    }
    if (elite.passives.includes('Reflect')) {
      if (action.ability.tags && action.ability.tags.includes('aoe')) {
        action.score -= 6;
      }
    }
    if (elite.passives.includes('Heal') && elite.hp / elite.maxHp < 0.5) {
      if (elite.abilities.some(ab => ab.type === 'buff')) action.score += 3;
    }

    return action;
  }
}

// Exported for use in combat.js and boss.js
export {
  decideEnemyAction,
  handleBossPhaseShift,
  injectEliteBehavior
 };