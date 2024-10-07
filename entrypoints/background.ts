import { defineBackground } from 'wxt/sandbox';

export default defineBackground({
  main() {
    console.log('Background script loaded');

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      console.log('Message received in background:', request);
      if (request.action === 'openPopup') {
        chrome.storage.local.get('contentScriptReady', (result) => {
          console.log('Content script ready status in background:', result.contentScriptReady);
          if (result.contentScriptReady) {
            chrome.windows.create({
              url: chrome.runtime.getURL('popup.html'),
              type: 'popup',
              width: 400,
              height: 400
            }, (window) => {
              if (chrome.runtime.lastError) {
                console.error('Error creating window:', chrome.runtime.lastError);
                sendResponse({ success: false, error: chrome.runtime.lastError.message });
              } else {
                console.log('Popup window created:', window?.id);
                sendResponse({ success: true, windowId: window?.id });
              }
            });
          } else {
            console.log('Content script not ready, cannot open popup');
            sendResponse({ success: false, error: 'Content script not ready' });
          }
        });
        return true; 
      }
    });
  },
});