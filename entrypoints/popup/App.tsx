import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [command, setCommand] = useState('');
  const [response, setResponse] = useState('');
  const [isContentScriptReady, setIsContentScriptReady] = useState(false);

  useEffect(() => {
    const checkContentScript = () => {
      console.log('Checking content script status...');
      chrome.storage.local.get('contentScriptReady', (result) => {
        console.log('Content script ready status in popup:', result.contentScriptReady);
        if (result.contentScriptReady) {
          console.log('Content script is ready');
          setIsContentScriptReady(true);
        } else {
          console.log('Content script not ready, retrying...');
          setTimeout(checkContentScript, 1000); 
        }
      });
    };

    checkContentScript();
  }, []);

  const handleGenerate = () => {
    setResponse("Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.");
  };

  console.log(isContentScriptReady);

  const handleInsert = () => {
    if (!isContentScriptReady) {      
      console.error('Content script is not ready');
      return;
    }

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      console.log(response);
      
      const activeTab = tabs[0];
      if (activeTab.id) {        
        chrome.tabs.sendMessage(
          activeTab.id,
          { action: 'insertResponse', response },
          (response) => {
            console.log(chrome.runtime, chrome.runtime.lastError);

            if (chrome.runtime.lastError) {
              console.error('Error sending message:', chrome.runtime.lastError.message);
            } else {
              console.log('Response inserted successfully');
            }
          }
        );
      }
    });
  };

  return (
    <div className="app">
      <h1>LinkedIn AI Reply</h1>
      <textarea
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        placeholder="Enter your command here..."
        rows={4}
      />
      <button onClick={handleGenerate}>Generate</button>
      {response && (
        <div className="response">
          <h2>Generated Response:</h2>
          <p>{response}</p>
          <button onClick={() => setResponse('')}>Regenerate</button>
          <button onClick={handleInsert} disabled={!isContentScriptReady}>
            Insert
          </button>
        </div>
      )}
    </div>
  );
}

export default App;