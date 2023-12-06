chrome.runtime.onInstalled.addListener(() => {
    chrome.webNavigation.onCompleted.addListener(() => {
        chrome.tabs.query({ active: true, currentWindow: true }, ([{ id }]) => {
            if (id) {
                chrome.action.disable(id);
            }
        });
    }, { url: [{ hostContains: 'chat.openai.com' }] });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'keyupDetected') {
        // Send a message to the Angular app
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'handleKeyUp' });
        });
    }
});