// Object: Holds the overall game state
const gameState = {
    currentNode: null,
    playerHP: 100,
    playerChakra: 50,
    relics: [],
    memoryEventsCleared: 0,
    playerAbilities: []
};

function startGame() {
    console.log("Starting Naruto Roguelike...");
    generateStartingNode();
    updateUI();
}

function generateStartingNode() {
    gameState.currentNode = {
        type: "Story",
        description: "The Beginning of Madara's Journey."
    };
}
