

```javascript
function lockNumberValue(secondNumber, resultText) {
    if (secondNumber === 0 && resultText) {
        try {
            lockValue(resultText.textContent);
        } catch (error) {
            console.error(`Error locking number value: ${error}`);
        }
    }
}

function lockValue(text) {
    // implement logic to lock the number value and pass the text as an argument
    console.log(`Locking number value with text: ${text}`);
}
```