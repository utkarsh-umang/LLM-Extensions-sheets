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

  const fullQuery = `${prompt}: ${value}`;

  const headers = {
    "x-api-key": apiKey,
    "anthropic-version": "2023-06-01",
    "Content-Type": "application/json"
  };

  const payload = JSON.stringify({
    "model": "claude-3-sonnet-20240229", // Change model here according to need
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

function Claude(prompt, value) {
  return callClaude(prompt, value);
}

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Claude 3.5 Sonnet')
    .addItem('Send Query', 'Claude')
    .addToUi();
}