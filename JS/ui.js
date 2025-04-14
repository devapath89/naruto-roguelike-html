function updateUI() {
    const gameDiv = document.getElementById('game');
    if (!gameDiv) return;

    gameDiv.innerHTML = "";

    const eventText = document.createElement('p');
    eventText.textContent = gameState.currentNode.description;
    gameDiv.appendChild(eventText);

    const nodeOptions = ["Combat", "Elite", "Story", "Mystery"];
    nodeOptions.forEach(type => {
        const button = document.createElement('button');
        button.textContent = type + " Memory";
        button.onclick = () => onNodeSelected(type);
        gameDiv.appendChild(button);
    });
}
