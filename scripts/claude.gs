function callClaude(prompt, value) {
  const apiKey = "your-api-key"; // Your Anthropic API key
  const url = "https://api.anthropic.com/v1/messages";

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  if (typeof prompt === 'string' && prompt.startsWith('=')) {
    prompt = sheet.getRange(prompt.slice(1)).getValue();
  }
  if (typeof value === 'string' && value.startsWith('=')) {
    value = sheet.getRange(value.slice(1)).getValue();
  }

  // You can play around with your prompt here, if needed
  const fullQuery = `${prompt}: ${value}`;

  const headers = {
    "x-api-key": apiKey,
    "anthropic-version": "2023-06-01",
    "Content-Type": "application/json"
  };

  const payload = JSON.stringify({
    "model": "claude-3-sonnet-20240229", // Select your model 
    "messages": [{"role": "user", "content": fullQuery}],
    "max_tokens": 4096
  });

  const options = {
    "method": "post",
    "headers": headers,
    "payload": payload,
    "muteHttpExceptions": true
  };

  const response = UrlFetchApp.fetch(url, options);
  const jsonResponse = JSON.parse(response.getContentText());

  if (response.getResponseCode() !== 200) {
    return `Error: ${jsonResponse.error.message}`;
  }

  return jsonResponse.content[0].text;
}

function Claude(prompt, value) {      // This has been configured to take in two cells as input which  
  return callClaude(prompt, value);   // are then used in the fullQuery to generate the full prompt
}

// Use this if you want to run the Claude every time the sheet is opened otherwise remove
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Claude 3.5 Sonnet')
    .addItem('Send Query', 'Claude')
    .addToUi();
}

// Use this function if you want to trigger the Claude call whenever there is a change in the input cells passed to prompt
function onEdit(e) {
  const range = e.range;
  const sheet = range.getSheet();
  
  // Check if the edited cell is in the column where you want to trigger Claude
  if (range.getColumn() === 1 && range.getRow() > 1) { // Adjust column number as needed
    const prompt = sheet.getRange(range.getRow(), 1).getValue(); // Adjust column number for prompt
    const value = sheet.getRange(range.getRow(), 2).getValue(); // Adjust column number for value
    
    if (prompt && value) {
      const result = callClaude(prompt, value);
      sheet.getRange(range.getRow(), 3).setValue(result); // Adjust column number for result
    }
  }
}