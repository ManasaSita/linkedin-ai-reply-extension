```md
# LinkedIn AI Reply Chrome Extension

## Overview

This Chrome extension enhances LinkedIn messaging by providing AI-generated reply suggestions. The AI icon is displayed when focusing on the message input field, allowing users to generate and insert pre-defined replies directly into LinkedIn messages. This is a demo extension, so no actual API calls are made for generating responses.

![Screenshot](https://drive.google.com/file/d/1qmLjBRrPRwzVPCJhusfZCPPmvQri1_Gt/view?usp=sharing)

## Features

- **AI Icon on Message Input Focus**: When a LinkedIn message input field is focused, an AI icon appears.
- **Modal for Command Input**: Click on the AI icon to open a modal where users can enter a command.
- **Predefined Response Generation**: Clicking "Generate" provides a static response: _"Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask."_
- **Insert Generated Text**: The generated response can be inserted directly into the LinkedIn message input field.
- **Regenerate Button**: A button to regenerate the response (non-functional in this demo).

## Technologies

- **React** with **TypeScript**
- **Tailwind CSS** for styling
- **WXT Framework** for building Chrome extensions
- **Chrome Extension APIs**

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ManasaSita/linkedin-ai-reply-extension.git
   cd linkedin-ai-reply-extension
   ```

2. **Install the dependencies**:
   ```bash
   npm install
   ```

3. **Build the project**:
   ```bash
   npm run dev
   ```

4. **Load the extension in Chrome**:
   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable **Developer Mode** (toggle switch at the top right).
   - Click **Load unpacked** and select the `.output/chrome-mv3` folder from the project.

## Usage

1. **Navigate to LinkedIn** and open a message.
2. **Focus on the message input field**: The AI icon will appear.
3. **Click on the AI icon** to open the command modal.
4. **Generate a reply** by clicking the "Generate" button.
5. **Insert the generated reply** into the message field by clicking "Insert."

## Demo

You can see the extension in action in the video below:

[Demo Video](https://drive.google.com/file/d/1u15NX_TLhaLjXw2hPjF3eAqioVJ1-BZF/view?usp=sharing)

## Folder Structure

```
├── .output
│   ├── chrome-mv3
│       ├── chunks
│       ├── content-scripts
│       ├── icon
│       ├── background.js
│       └── manifest.json
├── .wxt
│   ├── types
│   ├── eslintrc-auto-import.json
│   ├── tsconfig.json
│   └── wxt.d.ts
├── assets
├── entrypoints
│   ├── popup
│       ├── App.css
│       ├── App.tsx
│       ├── index.html
│       ├── main.tsx
│       ├── style.css
├── node_modules
├── public
│   └── icon
│       └── wxt.svg
├── src
│   ├── style.css
│   ├── background.ts
│   ├── content.ts
├── .gitignore
├── package-lock.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── tsconfig.json
├── wxt.config.ts
```

## Known Issues

- The **Regenerate** button is non-functional (as specified in the assignment).
- On some page reloads, the content script might not immediately inject. This can be resolved by reloading the LinkedIn page.

## License

This project is licensed under the MIT License.
```
