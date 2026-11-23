# MINI PROJECT REPORT

## MODE-CONTROLLED 4-BIT BINARY ADDER–SUBTRACTOR USING XOR GATES AND FULL ADDERS

**Subject:** Computer Organisation  
**Semester:** III  
**Group:** F  
**Assignment:** Question 6

### Submitted by

| Sl. No. | Name | Roll Number |
|---:|---|---:|
| 1 | MD ALI ZINNA MOLLA | 27600125093 |
| 2 | ARGHA MAITY | 27600125094 |
| 3 | AKASHDIP SAH | 27600125095 |
| 4 | SHRUTI BISWAS | 27600125096 |

---

## 1. Abstract

This project presents the design and simulation of a 4-bit binary adder–subtractor controlled by a single mode input. XOR gates are used to conditionally complement the bits of the second operand, while four full adders are connected in a ripple-carry arrangement to produce the result. When the mode input is 0, the circuit performs addition. When the mode input is 1, the circuit performs subtraction using two's-complement arithmetic. An interactive website has also been developed to enter operands, select the operation, and observe the result, carry chain, and status flags.

## 2. Problem statement

Design a circuit that performs addition and subtraction using a mode-control input. Use XOR gates and full adders to implement both operations. Verify the results for different binary input combinations.

## 3. Objectives

1. Design one combinational circuit that can perform both binary addition and subtraction.
2. Understand how XOR gates can conditionally invert binary signals.
3. Implement the arithmetic operation with four full-adder stages connected by carry signals.
4. Explain subtraction through two's-complement representation.
5. Verify the operation with representative and exhaustive input combinations using a software simulator.

## 4. Components and functional blocks

### Main logical blocks

- Four XOR gates: one for each bit of operand B.
- Four full adders: one for each bit position of the 4-bit operands.
- One mode-control input, M.
- Two 4-bit operand inputs, A and B.
- Four sum outputs, S[3:0], and one final carry output, Cout.

The design may be represented using individual full-adder blocks or a full-adder implementation made from elementary logic gates. This project models the logical function and does not claim physical hardware measurements.

## 5. Theory

### 5.1 XOR gate as a controlled inverter

The XOR operation has the following truth table:

| X | M | X XOR M |
|---:|---:|---:|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

Therefore:

- If M = 0, `X XOR M = X`.
- If M = 1, `X XOR M = NOT X`.

For each bit of B, an XOR gate is placed before the corresponding full adder. The same mode signal is connected to all four XOR gates.

### 5.2 Mode-control operation

| Mode M | Conditioned operand | Initial carry C0 | Function |
|---:|---|---:|---|
| 0 | B XOR 0 = B | 0 | A + B |
| 1 | B XOR 1 = NOT B | 1 | A + NOT B + 1 = A − B |

The combined arithmetic expression is:

**S = A + (B XOR M) + M**

### 5.3 Full-adder operation

A full adder accepts three one-bit inputs: Aᵢ, Xᵢ, and Cᵢ. It produces a sum bit and a carry bit.

Let `Xᵢ = Bᵢ XOR M`.

- `Sumᵢ = Aᵢ XOR Xᵢ XOR Cᵢ`
- `Cᵢ₊₁ = (Aᵢ AND Xᵢ) OR (Cᵢ AND (Aᵢ XOR Xᵢ))`

An equivalent carry expression is the majority function:

`Cᵢ₊₁ = AᵢXᵢ + AᵢCᵢ + XᵢCᵢ`.

### 5.4 Full-adder truth table

| A | X | Cin | Sum | Cout |
|---:|---:|---:|---:|---:|
| 0 | 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 1 | 0 |
| 0 | 1 | 0 | 1 | 0 |
| 0 | 1 | 1 | 0 | 1 |
| 1 | 0 | 0 | 1 | 0 |
| 1 | 0 | 1 | 0 | 1 |
| 1 | 1 | 0 | 0 | 1 |
| 1 | 1 | 1 | 1 | 1 |

### 5.5 Four-bit ripple-carry arrangement

The least-significant bit is processed by FA₀. Its carry output is connected to the carry input of FA₁. This connection continues through FA₂ and FA₃. The final carry from FA₃ is Cout.

The carry path is:

`C0 → FA0 → C1 → FA1 → C2 → FA2 → C3 → FA3 → C4 (Cout)`

The initial carry is C0 = M. The sum outputs of FA₀ through FA₃ form S[3:0].

## 6. Circuit design procedure

1. Provide the two 4-bit operands A[3:0] and B[3:0].
2. Connect each B bit to one XOR gate.
3. Connect the common mode signal M to the second input of all XOR gates.
4. Connect each XOR output to the B-side input of its corresponding full adder.
5. Connect each A bit to the other operand input of its corresponding full adder.
6. Connect M to the carry input of FA₀.
7. Cascade the carry outputs from FA₀ to FA₃.
8. Read the four sum outputs as S[3:0] and the last carry as Cout.

Refer to `../assets/circuit-diagram.svg` for the conceptual block diagram and the website's Circuit section for a responsive view.

## 7. Working examples

### Example 1: Addition (M = 0)

Given:

- A = 0101₂ = 5₁₀
- B = 0011₂ = 3₁₀
- M = 0

Calculation:

`S = 0101 + (0011 XOR 0000) + 0`

`S = 0101 + 0011 = 1000`

The 4-bit result is 1000. Cout = 0. In 4-bit signed two's-complement interpretation, 1000 represents −8; because +5 and +3 exceed the signed range −8 to +7, signed overflow = 1.

### Example 2: Subtraction without borrow (M = 1)

Given A = 0101₂ (5) and B = 0011₂ (3).

`NOT B = 1100`

`S = 0101 + 1100 + 1 = 1 0010`

The low four result bits are 0010. Cout = 1, therefore unsigned borrow = NOT(Cout) = 0. The result is 2.

### Example 3: Subtraction with borrow (M = 1)

Given A = 0011₂ (3) and B = 0101₂ (5).

`NOT B = 1010`

`S = 0011 + 1010 + 1 = 1110`

The 4-bit result is 1110. Cout = 0, therefore unsigned borrow = 1. The low four bits represent 14 unsigned, or −2 in 4-bit signed two's-complement form.

### Example 4: Signed overflow in addition (M = 0)

Given A = 0111₂ (+7) and B = 0001₂ (+1).

`0111 + 0001 = 1000`

The mathematical signed result +8 is outside the 4-bit signed range −8 to +7. Therefore signed overflow = 1.

## 8. Status flags

| Flag | Definition | Meaning |
|---|---|---|
| Carry-out | Final carry from FA₃ | Carry beyond the 4-bit result |
| Borrow | `NOT(Cout)` in subtraction mode | 1 indicates an unsigned borrow |
| Signed overflow | Carry into MSB XOR carry out of MSB | 1 indicates signed two's-complement overflow |
| Zero | 1 if S[3:0] = 0000 | Indicates a zero result |
| Sign | Most-significant result bit S₃ | Sign bit in two's-complement interpretation |

For this simulator, borrow is shown as not applicable in addition mode. The 4-bit output is the low four bits; Cout is presented separately.

## 9. Verification and test cases

The website includes quick tests and a stage-by-stage carry trace. Automated tests also check every possible combination of two 4-bit operands and the two possible mode values: 16 × 16 × 2 = 512 cases.

| Test | A | B | M | Operation | 4-bit result | Cout | Borrow | Overflow |
|---:|---|---|---:|---|---|---:|---:|---:|
| 1 | 0101 | 0011 | 0 | 5 + 3 | 1000 | 0 | — | 1 |
| 2 | 0101 | 0011 | 1 | 5 − 3 | 0010 | 1 | 0 | 0 |
| 3 | 0011 | 0101 | 1 | 3 − 5 | 1110 | 0 | 1 | 0 |
| 4 | 0111 | 0001 | 0 | 7 + 1 | 1000 | 0 | — | 1 |
| 5 | 1111 | 0001 | 0 | 15 + 1 | 0000 | 1 | — | 0 |
| 6 | 0000 | 0000 | 1 | 0 − 0 | 0000 | 1 | 0 | 0 |
| 7 | 0000 | 0001 | 1 | 0 − 1 | 1111 | 0 | 1 | 0 |
| 8 | 1111 | 1111 | 1 | 15 − 15 | 0000 | 1 | 0 | 0 |

**Automated verification command:** `npm test` (Node.js required). The tests use the same pure logic module as the interactive website.

## 10. Website implementation

The project includes a responsive static website built with HTML, CSS, and vanilla JavaScript. It provides:

- Four-bit binary operand entry and add/subtract mode controls.
- Preset test examples.
- A live result and decimal output view.
- Carry-out, borrow, signed-overflow, and zero flags.
- A bit-by-bit trace of all four full adders and the ripple carry chain.
- A block-level circuit diagram, equations, design notes, and team details.

The site can be hosted as a static project on Vercel. No backend or database is required.

## 11. Advantages and limitations

### Advantages

- A single circuit supports both addition and subtraction.
- XOR gates provide simple conditional inversion of B.
- The same full adders are reused for both operations.
- The simulator makes intermediate carry values visible for learning and verification.

### Limitations

- The project models a 4-bit circuit; it is not a physical hardware prototype.
- A ripple-carry adder has carry propagation from one stage to the next.
- Only two's-complement subtraction is implemented.
- The displayed arithmetic result is four bits wide; the carry output is separate.

## 12. Conclusion

The mode-controlled 4-bit binary adder–subtractor demonstrates how XOR gates and full adders can be combined to perform two arithmetic operations with shared hardware. With M = 0, the circuit performs A + B. With M = 1, it performs A + NOT B + 1, which is A − B in two's-complement form. The simulator and exhaustive test suite provide a way to inspect and verify the circuit for all 512 input/mode combinations.

## 13. References

1. M. Morris Mano, *Computer System Architecture*, 3rd edition, Pearson — arithmetic and digital logic concepts.
2. William Stallings, *Computer Organization and Architecture* — processor arithmetic and ALU concepts.
3. Course notes and the assignment statement supplied for the Computer Organisation mini project.
