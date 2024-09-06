# LLM Integration for Google Sheets (Claude and GPT)

This project integrates AI models (Anthropic's Claude or OpenAI's GPT) with Google Sheets, allowing users to dynamically generate AI responses based on input from two columns.

## Quick Start Guide

### Prerequisites
- A Google account with access to Google Sheets 
- An Anthropic API key for Claude AI or an OpenAI API key for GPT

### Setup
1. Open your Google Sheet.
2. Go to `Extensions` > `Apps Script`.
3. Replace existing code with the provided script (choose Claude or GPT version).
4. Replace `"YOUR_API_KEY_HERE"` with your actual API key (Check Advanced Guide for Help).
5. Save the project and Run (Give required permissions).

### Usage
1. Use column A for the Prompt and column B for any additional value.
2. In column C, enter the formula `=Claude(A2,B2)` for Claude AI or `=GPT(A2,B2)` for GPT.
3. Enter content in columns A and B. The AI response will generate in column C.

For more detailed information, customization options, and advanced features, please refer to the [Advanced Guide](https://github.com/utkarsh-umang/LLM-Extensions-sheets/blob/develop/ADVANCED_GUIDE.md).