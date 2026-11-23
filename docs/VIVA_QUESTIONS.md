# Viva Questions and Answers

### 1. What is an adder-subtractor circuit?
A combinational logic circuit that can perform both binary addition and binary subtraction using a shared set of arithmetic stages.

### 2. Why are XOR gates used?
An XOR gate works as a controlled inverter. With M = 0 it passes B unchanged; with M = 1 it complements B.

### 3. Why is the mode input connected to the first carry input?
For subtraction, two's complement requires adding one after complementing B. Setting C0 = 1 provides that +1. For addition, C0 = 0.

### 4. What is the operation when M = 0?
The circuit computes A + B.

### 5. What is the operation when M = 1?
The circuit computes A + NOT(B) + 1, which is A − B in two's-complement arithmetic.

### 6. What is a full adder?
A combinational circuit with three one-bit inputs (A, B, and carry-in) and two outputs (sum and carry-out).

### 7. What is a ripple-carry adder?
An arrangement in which the carry output from one full-adder stage becomes the carry input of the next stage.

### 8. How is unsigned borrow detected during subtraction?
For this two's-complement subtractor, Borrow = NOT(Cout). Cout = 1 means no unsigned borrow; Cout = 0 means a borrow occurred.

### 9. How is signed overflow detected?
Signed overflow is the XOR of the carry into the most-significant bit and the carry out of the most-significant bit.

### 10. What is the signed range of a 4-bit two's-complement number?
From −8 to +7.

### 11. What does the zero flag indicate?
It is 1 when all four result bits are zero.

### 12. What is the limitation of a ripple-carry design?
Carry must propagate from one stage to the next, so the delay grows as the number of stages increases.

### 13. What does the website demonstrate?
It accepts two 4-bit operands, selects add/subtract mode, calculates the output and flags, and shows the carry at each full-adder stage.

### 14. How many possible input/mode combinations are tested?
There are 16 choices for A, 16 choices for B, and 2 mode settings: 16 × 16 × 2 = 512 combinations.
