# Circuit Notes

## Signal mapping

| Signal | Connection |
|---|---|
| Aᵢ | Direct input to full-adder stage i |
| Bᵢ | First input to XOR gate i |
| M | Second input of all XOR gates and carry-in C₀ of FA₀ |
| Xᵢ | XOR output `Bᵢ XOR M`; second operand input of FAᵢ |
| Cᵢ | Carry input of FAᵢ |
| Sᵢ | Sum output of FAᵢ |
| Cᵢ₊₁ | Carry output of FAᵢ and input to FAᵢ₊₁ |

## Equations

- `Xᵢ = Bᵢ XOR M`
- `Sᵢ = Aᵢ XOR Xᵢ XOR Cᵢ`
- `Cᵢ₊₁ = AᵢXᵢ + AᵢCᵢ + XᵢCᵢ`
- `C₀ = M`
- `S = A + (B XOR M) + M`

## Flag definitions used by the website

- `Carry-out = C₄`
- `Borrow = NOT(C₄)` only when M = 1; otherwise shown as not applicable
- `Overflow = C₃ XOR C₄`
- `Zero = 1` exactly when S[3:0] equals 0000
- `Sign = S₃`

## Notes on signed and unsigned values

The inputs are interpreted as 4-bit unsigned values for the arithmetic controls. The result register shows the low four result bits and the final carry separately. The report and website additionally show the same four result bits interpreted as a signed two's-complement value. Signed overflow indicates that the signed mathematical result cannot be represented in four bits.
