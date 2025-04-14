function updateUI() {
    const gameDiv = document.getElementById('game');
    if (!gameDiv) return;

    gameDiv.innerHTML = "";

    const eventText = document.createElement('p');
    eventText.textContent = gameState.currentNode.description;
    gameDiv.appendChild(eventText);

    // Button: Start the real Adventure
    const adventureButton = document.createElement('button');
    adventureButton.textContent = "Adventure";
    adventureButton.onclick = startAdventure;
    gameDiv.appendChild(adventureButton);

    // ===== TEST FUNCTIONS =====

    // Button: Test Combat Memory (FOR TESTING ONLY - REMOVE AFTER STABILIZATION)
    const testCombatButton = document.createElement('button');
    testCombatButton.textContent = "Combat Memory";
    testCombatButton.onclick = () => onNodeSelected("Combat");
    gameDiv.appendChild(testCombatButton);

    // Button: Test Elite Memory (FOR TESTING ONLY - REMOVE AFTER STABILIZATION)
    const testEliteButton = document.createElement('button');
    testEliteButton.textContent = "Elite Memory";
    testEliteButton.onclick = () => onNodeSelected("Elite");
    gameDiv.appendChild(testEliteButton);

    // Button: Test Story Memory (FOR TESTING ONLY - REMOVE AFTER STABILIZATION)
    const testStoryButton = document.createElement('button');
    testStoryButton.textContent = "Story Memory";
    testStoryButton.onclick = () => onNodeSelected("Story");
    gameDiv.appendChild(testStoryButton);

    // Button: Test Mystery Memory (FOR TESTING ONLY - REMOVE AFTER STABILIZATION)
    const testMysteryButton = document.createElement('button');
    testMysteryButton.textContent = "Mystery Memory";
    testMysteryButton.onclick = () => onNodeSelected("Mystery");
    gameDiv.appendChild(testMysteryButton);
}
