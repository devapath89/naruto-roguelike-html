function onNodeSelected(nodeType) {
    console.log("Player selected node:", nodeType);
    gameState.currentNode = {
        type: nodeType,
        description: "You entered a " + nodeType + " Memory."
    };
    updateUI();
}

function onAbilitySelected(ability) {
    console.log("Player used ability:", ability);
}
