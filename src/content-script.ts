// content-script.js

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'startListening') {
        const promptTextarea = document.getElementById('prompt-textarea');

        if (promptTextarea) {
            promptTextarea.addEventListener('keyup', () => {
                // Send a message to the background script whenever a key is pressed
                chrome.runtime.sendMessage({ action: 'keyupDetected' });
            });
        }
    }
});
