function callOpenAI(prompt, value) {
  const apiKey = "your-api-key"; // Replace this with your actual API key
  const url = "https://api.openai.com/v1/chat/completions";

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  if (typeof prompt === 'string' && prompt.startsWith('=')) {
    prompt = sheet.getRange(prompt.slice(1)).getValue();
  }
  if (typeof value === 'string' && value.startsWith('=')) {
    value = sheet.getRange(value.slice(1)).getValue();
  }

  const fullQuery = ${prompt}: ${value};

  const headers = {
    "Authorization": Bearer ${apiKey},
    "Content-Type": "application/json"
  };

  const payload = JSON.stringify({
    "model": "gpt-3.5-turbo", // change model here according to need
    "messages": [{"role": "user", "content": fullQuery}]
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
    return Error: ${jsonResponse.error.message};
  }

  return jsonResponse.choices[0].message.content.trim();
}

function GPT(prompt, value) {
  return callOpenAI(prompt, value);
}

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('GPT')
    .addItem('Send Query', 'GPT')
    .addToUi();
}