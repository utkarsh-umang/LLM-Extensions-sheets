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

function GPT(prompt, value) {         // This has been configured to take in two cells as input which 
  return callOpenAI(prompt, value);  // are then used in the fullQuery to generate the full prompt
}

// Use this if you want to run the GPT every time the sheet is opened otherwise remove
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('GPT')
    .addItem('Send Query', 'GPT')
    .addToUi();
}

// Use this function if you want to trigger the GPT whenever there is a change in the input cells passed to prompt
function onEdit(e) {
  const range = e.range;
  const sheet = range.getSheet();
  
  // Check if the edited cell is in the column where you want to trigger GPT
  if (range.getColumn() === 1 && range.getRow() > 1) { // Adjust column number as needed
    const prompt = sheet.getRange(range.getRow(), 1).getValue(); // Adjust column number for prompt
    const value = sheet.getRange(range.getRow(), 2).getValue(); // Adjust column number for value
    
    if (prompt && value) {
      const result = callOpenAI(prompt, value);
      sheet.getRange(range.getRow(), 3).setValue(result); // Adjust column number for result
    }
  }
}