# LLM Integration for Google Sheets (Claude and GPT)

This project integrates AI models (Anthropic's Claude or OpenAI's GPT) with Google Sheets, allowing users to dynamically generate AI responses based on input from two columns.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Obtaining API Keys](#obtaining-api-keys)
3. [Setup](#setup)
4. [Usage](#usage)
6. [Customization](#customization)
7. [Understanding onOpen() and onEdit() Functions](#understanding-onopen-and-onedit-functions-recommended---remove-both)
8. [Troubleshooting](#troubleshooting)
9. [Security Considerations](#security-considerations)

## Prerequisites

- A Google account with access to Google Sheets 
- An Anthropic API key for Claude AI or an OpenAI API key for GPT (depending on which model you choose to use)

## Obtaining API Keys

### For Claude AI (Anthropic):
1. Go to the [Anthropic website](https://www.anthropic.com) and sign up for an account.
2. Once logged in, navigate to the API section.
3. Follow the instructions to create a new API key.
4. Copy the API key and keep it secure.
5. [![Youtube Tutorial](https://img.youtube.com/vi/4Tzs4qunYJY/0.jpg)](https://www.youtube.com/watch?v=4Tzs4qunYJY)

### For GPT (OpenAI):
1. Go to the [OpenAI website](https://openai.com) and sign up for an account.
2. Once logged in, navigate to the API section in your account dashboard.
3. Create a new API key.
4. Copy the API key and keep it secure.
5. Only the first minute [![Youtube Tutorial [Only the first minute]](https://img.youtube.com/vi/eRWZuijASuU/0.jpg)](https://www.youtube.com/watch?v=eRWZuijASuU)

## Setup

1. **Create a new Google Sheet** or open an existing one where you want to use the AI integration.

2. **Open the Script Editor**:
   - In your Google Sheet, go to `Extensions` > `Apps Script`.

3. **Copy and paste the code**:
   - In the Script Editor, replace any existing code with the provided script for either Claude AI or GPT (choose one).
   - Make sure to replace `"YOUR_API_KEY_HERE"` with your actual API key (Anthropic or OpenAI, depending on your choice).

4. **Save the project**:
   - Click on `File` > `Save` or use the floppy disk icon.
   - Give your project a name.

5. **Set up the trigger** *[Optional - only if using onEdit]*:
   - In the Apps Script editor, click on the clock icon on the left sidebar to open the Triggers page.
   - Click the "+ Add Trigger" button in the bottom right.
   - Choose the following settings:
     - Choose which function to run: `onEdit`
     - Choose which deployment should run: `Head`
     - Select event source: `From spreadsheet`
     - Select event type: `On edit`
   - Click "Save".

6. **Authorize the script**:
   - The first time you run the script, you'll be asked to authorize it.
   - Follow the instructions to grant the necessary permission.

## Usage

1. In your Google Sheet, use column A for the Prompt and column B for any value that you want to pass.

2. In column C, enter the formula `=Claude(A2,B2)` for Claude AI or `=GPT(A2,B2)` for OpenAI GPT (adjust the cell references as needed).

3. Enter or modify content in columns A and B. The AI response will automatically generate or update in column C.

4. The script will call the AI API whenever you change values in columns A or B, updating the corresponding cell in column C. [This step will only happen if using Trigger of onEdit (Step 5)]

## Customization

- You can modify the final prompt sent to the AI in the following ways: 
   - Using the `fullQuery` variable in the script. The prompt and value passed to the function are just variable names, they can be used in any way to reference two values.
   - ![Example fullQuery](https://github.com/utkarsh-umang/LLM-Extensions-sheets/blob/develop/img/customiseFinalPrompt.png)
   - Using `=CONCATENATE` to add string values from excel sheet only
   - ![Example sheetPrompt](https://github.com/utkarsh-umang/LLM-Extensions-sheets/blob/develop/img/finalPromptFromSheet.png)
- For GPT, you can change the model (e.g., from "gpt-3.5-turbo" to "gpt-4") if you have access to different models.
- For Claude, you can change the model (e.g., from "claude-3-sonnet" to "claude-3-haiku").

## Understanding onOpen and onEdit Functions [Recommended - Remove Both]

### onOpen Function
The `onOpen` function is designed to create a custom menu when the spreadsheet is opened.

```javascript
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Claude 3.5 Sonnet')
    .addItem('Send Query', 'Claude')
    .addToUi();
}
```
![Example onOpen](https://github.com/utkarsh-umang/LLM-Extensions-sheets/blob/develop/img/onOpen.png)

- **Purpose**: Creates a custom menu for easy access to the Claude AI function.
- **Behavior**: Runs once when the spreadsheet is opened, adding a new menu item.
- **API Usage**: Does not trigger any API calls on its own.
- **User Control**: Allows users to initiate API calls manually through the menu.

**Benefits**:
- Provides a user-friendly interface for interacting with the AI function.
- Does not increase API usage by automatically making calls when the sheet is opened.
- Gives users control over when to send queries to the API.

### onEdit Function (if implemented)
The `onEdit` function is triggered when a cell from the column specified in the function is changed.

```javascript
function onEdit(e) {
  const range = e.range;
  const sheet = range.getSheet();
  
  // Check if the edited cell is in the column where you want to trigger Claude
  // Adjust column number as needed 1 for A, 2 for B etc
  if (range.getColumn() === 1 && range.getRow() > 1) { 
    const prompt = sheet.getRange(range.getRow(), 1).getValue(); // Adjust column number for prompt
    const value = sheet.getRange(range.getRow(), 2).getValue(); // Adjust column number for value
    
    if (prompt && value) {
      const result = callClaude(prompt, value);
      sheet.getRange(range.getRow(), 3).setValue(result); // Adjust column number for result
    }
  }
}
```

- **Usage**: Can be used to automatically update AI responses when input cells are changed.
- **Behavior**: Runs each time a cell from specified column is edited, potentially triggering multiple API calls.
- **Tradeoff**: Provides real-time updates but may lead to increased API usage and potential rate limiting.

### Formula-Based Usage
When using the AI function as a formula (e.g., `=Claude(A2, B2)` or `=GPT(A2,B2)`):

- **Usage**: Users manually enter the formula in cells where they want AI-generated content.
- **Behavior**: Updates only when the cell containing the formula is recalculated.
- **API Calls**: Triggered only when the formula is calculated or forcibly refreshed.
- **Tradeoffs**: 
  - Offers more control over when API calls are made.
  - May be slower if updating multiple cells, as each formula triggers a separate API call.
  - Can hit API rate limits if too many cells are recalculated simultaneously.
  - Requires manual triggering or recalculation for updates.

## Troubleshooting

- If you encounter errors, check the execution log in the Apps Script editor for details.
- Ensure your API key is correct and has the necessary permissions.
- If changes aren't triggering updates, make sure the trigger is set up correctly.
- Check your API usage limits and billing status if you suddenly stop getting responses.

## Security Considerations

- Keep your API keys confidential. Don't share your script or sheet publicly with the API key included.