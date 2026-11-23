(function () {
  'use strict';

  const $ = (selector) => document.querySelector(selector);
  const inputA = $('#input-a');
  const inputB = $('#input-b');
  const addButton = $('#add-mode');
  const subButton = $('#sub-mode');
  let mode = 0;

  const toBinary = (value, width = 4) => value.toString(2).padStart(width, '0');
  const signedText = (value) => value < 0 ? `−${Math.abs(value)}` : String(value);

  function readBinary(input) {
    const value = input.value.trim();
    if (!/^[01]{1,4}$/.test(value)) {
      input.classList.add('invalid');
      return null;
    }
    input.classList.remove('invalid');
    input.value = value.padStart(4, '0');
    return Number.parseInt(input.value, 2);
  }

  function setMode(nextMode) {
    mode = nextMode;
    addButton.classList.toggle('active', mode === 0);
    subButton.classList.toggle('active', mode === 1);
    addButton.setAttribute('aria-pressed', String(mode === 0));
    subButton.setAttribute('aria-pressed', String(mode === 1));
    $('#mode-value').textContent = `M = ${mode}`;
    $('#expr-op').textContent = mode === 0 ? '+' : '−';
    render();
  }

  function setFlag(id, value, note) {
    $(`#${id}`).textContent = value;
    const noteId = id.replace('flag-', '') + '-note';
    const noteElement = $(`#${noteId}`);
    if (noteElement && note) noteElement.textContent = note;
  }

  function render() {
    const a = readBinary(inputA);
    const b = readBinary(inputB);
    const validation = $('#validation-message');
    if (a === null || b === null) {
      validation.textContent = 'Please enter only 0 and 1 (up to four bits) in both inputs.';
      return;
    }
    validation.textContent = '';

    const result = window.AdderSubtractorLogic.calculate(a, b, mode, 4);
    const aBits = toBinary(a);
    const bBits = toBinary(b);
    const resultBits = toBinary(result.result);
    const operation = mode === 0 ? '+' : '−';

    $('#expr-a').textContent = aBits;
    $('#expr-b').textContent = bBits;
    $('#expr-op').textContent = operation;
    $('#result-bits').textContent = resultBits.split('').join(' ');
    $('#result-decimal').textContent = `DECIMAL ${result.result}`;
    $('#result-description').textContent = `${a} ${operation} ${b} = ${mode === 0 ? a + b : a - b} (4-bit output: ${result.result})`;
    $('#signed-note').textContent = `Signed interpretation of output: ${signedText(result.signedResult)} (4-bit two's complement)`;

    setFlag('flag-carry', result.carryOut, result.carryOut ? 'Final carry = 1' : 'Final carry = 0');
    setFlag('flag-borrow', result.borrow === null ? '—' : result.borrow, mode === 0 ? 'Not used in addition' : (result.borrow ? 'Unsigned borrow' : 'No unsigned borrow'));
    setFlag('flag-overflow', result.signedOverflow, result.signedOverflow ? 'Signed overflow detected' : 'No signed overflow');
    setFlag('flag-zero', result.zero, result.zero ? 'Result is zero' : 'Result is non-zero');

    const rows = [...result.trace].map((row) => `
      <tr>
        <td>FA<sub>${row.bit}</sub></td><td>${row.bit}</td><td>${row.aBit}</td><td>${row.bBit}</td>
        <td>${row.conditionedB}</td><td>${row.carryIn}</td><td class="sum-cell">${row.sum}</td><td>${row.carryOut}</td>
      </tr>`).join('');
    $('#trace-body').innerHTML = rows;
    $('#carry-chain').textContent = `Carry chain: ${result.carryChain.join(' → ')}`;
  }

  addButton.addEventListener('click', () => setMode(0));
  subButton.addEventListener('click', () => setMode(1));
  inputA.addEventListener('input', render);
  inputB.addEventListener('input', render);
  document.querySelectorAll('[data-a][data-b][data-mode]').forEach((button) => {
    button.addEventListener('click', () => {
      inputA.value = button.dataset.a;
      inputB.value = button.dataset.b;
      setMode(Number(button.dataset.mode));
    });
  });

  render();
})();
