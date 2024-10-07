import { defineContentScript } from 'wxt/sandbox';

export default defineContentScript({
  matches: ['https://*.linkedin.com/*'],
  main() {
    console.log('LinkedIn AI Reply content script loaded');

    chrome.storage.local.set({ contentScriptReady: true }, () => {
      console.log('Content script ready status set to true');
      chrome.storage.local.get('contentScriptReady', (result) => {
        console.log('Checked contentScriptReady status:', result.contentScriptReady);
      });
    });

    function createAIIcon() {
      const icon = document.createElement('div');
      icon.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`;
      icon.style.cssText = `
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        display: none;
        z-index: 9999;
      `;
      
      icon.addEventListener('click', (event) => {
        console.log('AI icon clicked');
        event.preventDefault();
        event.stopPropagation();
        console.log(chrome.runtime.sendMessage);
        chrome.runtime.sendMessage({ action: 'openPopup' }, (response) => {          
          if (response && response.success) {
            console.log('Popup opened successfully. Window ID:', response.windowId);
          } else if (response) {
            console.error('Failed to open popup:', response.error);
          } else {
            console.error('No response received from background script');
          }
        });

        chrome.runtime.sendMessage({ action: 'insertResponse' }, (response) => {          
          if (chrome.runtime.lastError) {
            console.error('Error sending message:', chrome.runtime.lastError.message);
          } else if (response && response.success) {
            console.log('Popup opened successfully. Window ID:', response.windowId);
          } else {
            console.error('No response received from background script');
          }
        });
      });
      return icon;
    }

    function setupMessageInputListener() {
      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          for (const node of mutation.addedNodes) {
            if (node instanceof HTMLElement) {
              const messageInput = node.querySelector('.msg-form__contenteditable');
              if (messageInput) {
                const aiIcon = createAIIcon();
                messageInput.parentElement?.appendChild(aiIcon);
                messageInput.addEventListener('focus', () => {
                  aiIcon.style.display = 'block';
                });
              }
            }
          }
        }
      });

      observer.observe(document.body, { childList: true, subtree: true });
      console.log('Observer set up');
    }

    // Listen for message from popup
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === "insertResponse" && request.response) {
        const messageInput = document.querySelector('.msg-form__contenteditable');
        if (messageInput) {
          (messageInput as HTMLElement).innerText = request.response;  
          sendResponse({ success: true });
        } else {
          sendResponse({ success: false, error: 'Message input not found' });
        }
      }
      return true;
    });
    
    setupMessageInputListener();
  },
});
