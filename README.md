# LLM Integration for Google Sheets (Claude and GPT)

This project integrates AI models (Anthropic's Claude or OpenAI's GPT) with Google Sheets, allowing users to dynamically generate AI responses based on input from two columns.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Obtaining API Keys](#obtaining-api-keys)
3. [Setup](#setup)
4. [Usage](#usage)
5. [Choosing Between Claude and GPT](#choosing-between-claude-and-gpt)
6. [Customization](#customization)
7. [Troubleshooting](#troubleshooting)
8. [Security Considerations](#security-considerations)

## Prerequisites

- A Google account with access to Google Sheets 
- An Anthropic API key for Claude AI or an OpenAI API key for GPT (depending on which model you choose to use)

## Obtaining API Keys

### For Claude AI (Anthropic):
1. Go to the [Anthropic website](https://www.anthropic.com) and sign up for an account.
2. Once logged in, navigate to the API section.
3. Follow the instructions to create a new API key.
4. Copy the API key and keep it secure.
[![Youtube Tutorial](https://img.youtube.com/vi/4Tzs4qunYJY/0.jpg)](https://www.youtube.com/watch?v=4Tzs4qunYJY)

### For GPT (OpenAI):
1. Go to the [OpenAI website](https://openai.com) and sign up for an account.
2. Once logged in, navigate to the API section in your account dashboard.
3. Create a new API key.
4. Copy the API key and keep it secure.
[![Youtube Tutorial [Only the first minute]](https://img.youtube.com/vi/eRWZuijASuU/0.jpg)](https://www.youtube.com/watch?v=eRWZuijASuU)

## Setup

1. **Create a new Google Sheet** or open an existing one where you want to use the AI integration.

2. **Open the Script Editor**:
   - In your Google Sheet, go to `Extensions` > `Apps Script`.

3. **Copy and paste the code**:
   - In the Script Editor, replace any existing code with the provided script for either Claude AI or GPT (choose one).
   - Make sure to replace `"YOUR_API_KEY_HERE"` with your actual API key (Anthropic or OpenAI, depending on your choice).

4. **Save the project**:
   - Click on `File` > `Save` or use the floppy disk icon.
   - Give your project a name when prompted.

5. **Set up the trigger [Optional - only if using onEdit]**:
   - In the Apps Script editor, click on the clock icon on the left sidebar to open the Triggers page.
   - Click the "+ Add Trigger" button in the bottom right.
   - Choose the following settings:
     - Choose which function to run: `onEdit`
     - Choose which deployment should run: `Head`
     - Select event source: `From spreadsheet`
     - Select event type: `On edit`
   - Click "Save".

6. **Authorize the script**:
   - The first time you run the script, you'll be prompted to authorize it.
   - Follow the prompts to grant the necessary permissions.

## Usage

1. In your Google Sheet, use column A for the Prompt and column B for any value that you want to pass.

2. In column C, enter the formula `=Claude(A2,B2)` for Claude AI or `=GPT(A2,B2)` for OpenAI GPT (adjust the cell references as needed).

3. Enter or modify content in columns A and B. The AI response will automatically generate or update in column C.

4. The script will call the AI API whenever you change values in columns A or B, updating the corresponding cell in column C. [This step will only happen if using Trigger of onEdit (Step 5)]

## Choosing Between Claude and GPT

- Claude AI (Anthropic): Known for its strong performance in understanding context and generating nuanced responses.
- GPT (OpenAI): Widely used and known for its versatility across various tasks.

Choose based on your specific needs, API availability, and personal preference. You can implement both and compare results if desired.

## Customization

- You can modify the query sent to the AI in the `callClaude` or `callGPT` function to change the prompt.
- Adjust the column numbers in the `onEdit` function if you want to use different columns for input and output.
- For GPT, you can change the model (e.g., from "gpt-3.5-turbo" to "gpt-4") if you have access to different models.
- For Claude, you can change the model (e.g., from "claude-3-sonnet" to "claude-3-haiku").

## Troubleshooting

- If you encounter errors, check the execution log in the Apps Script editor for details.
- Ensure your API key is correct and has the necessary permissions.
- If changes aren't triggering updates, make sure the trigger is set up correctly.
- Check your API usage limits and billing status if you suddenly stop getting responses.

## Security Considerations

- Keep your API keys confidential. Don't share your script or sheet publicly with the API key included.