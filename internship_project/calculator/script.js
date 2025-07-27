const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
let currentInput = '';
let resultDisplayed = false;

function updateDisplay(value) {
    display.value = value;
}

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const val = btn.getAttribute('data-value');
        if (btn.id === 'clear') {
            currentInput = '';
            updateDisplay('');
        } else if (btn.id === 'equals') {
            try {
                currentInput = eval(currentInput).toString();
                updateDisplay(currentInput);
                resultDisplayed = true;
            } catch {
                updateDisplay('Error');
                currentInput = '';
            }
        } else {
            if (resultDisplayed && !isNaN(val)) {
                currentInput = '';
                resultDisplayed = false;
            }
            currentInput += val;
            updateDisplay(currentInput);
        }
    });
});

// Keyboard support
document.addEventListener('keydown', (e) => {
    if ((e.key >= '0' && e.key <= '9') || ['+', '-', '*', '/', '.'].includes(e.key)) {
        if (resultDisplayed && !isNaN(e.key)) {
            currentInput = '';
            resultDisplayed = false;
        }
        currentInput += e.key;
        updateDisplay(currentInput);
    } else if (e.key === 'Enter' || e.key === '=') {
        try {
            currentInput = eval(currentInput).toString();
            updateDisplay(currentInput);
            resultDisplayed = true;
        } catch {
            updateDisplay('Error');
            currentInput = '';
        }
    } else if (e.key === 'Backspace') {
        currentInput = currentInput.slice(0, -1);
        updateDisplay(currentInput);
    } else if (e.key.toLowerCase() === 'c') {
        currentInput = '';
        updateDisplay('');
    }
});