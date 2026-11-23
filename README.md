# Mode-Controlled 4-Bit Binary Adder–Subtractor

**Computer Organisation · Semester III Mini Project · Group F · Question 6**

A responsive, browser-based demonstration of a 4-bit adder–subtractor using XOR gates and ripple-connected full adders. The same arithmetic hardware performs addition and subtraction; a single mode input controls the operation.

## Team

| No. | Student name | Roll number |
|---:|---|---:|
| 1 | MD ALI ZINNA MOLLA | 27600125093 |
| 2 | ARGHA MAITY | 27600125094 |
| 3 | AKASHDIP SAH | 27600125095 |
| 4 | SHRUTI BISWAS | 27600125096 |

## Core design

The circuit implements:

\[
S=A+(B\oplus M)+M
\]

- `M = 0`: each XOR passes the corresponding B bit unchanged and the first carry-in is 0. The circuit computes `A + B`.
- `M = 1`: each XOR complements the corresponding B bit and the first carry-in is 1. The circuit computes `A + ~B + 1`, which is `A - B` in two's-complement arithmetic.

The 4-bit output is the low four bits of the arithmetic result. The simulator also shows carry-out, unsigned borrow during subtraction, signed overflow, zero, signed two's-complement interpretation, and the carry at every full-adder stage.

## Live demonstration

Production website (Vercel): https://mode-controlled-adder-subtractor.vercel.app

The public deployment is a static, interactive 4-bit simulator. The downloadable project archive contains the full source, report, circuit notes, test vectors, viva questions, and automated tests.

## Run locally

No framework or package installation is required. The web app is plain HTML, CSS, and JavaScript.

1. Download or clone this repository.
2. Open the project folder in a terminal.
3. Start a local static server:

   ```bash
   python -m http.server 8000
   ```

4. Open `http://localhost:8000` in a browser.

You can also open `index.html` directly, although a local server is recommended.

## Run logic tests

Node.js 18 or later is recommended. The test suite uses Node's built-in test runner; there are no third-party dependencies.

```bash
npm test
```

The automated suite checks representative edge cases and all 512 combinations of two 4-bit operands and the two mode values.

## Automated verification on GitHub

The workflow in `.github/workflows/ci.yml` runs `npm test` on pushes to `main`, pull requests, and manual workflow dispatch. It uses Node.js 22 and needs no secrets or third-party package dependencies.

## GitHub upload

1. Sign in to GitHub and create a new **public** repository named `mode-controlled-adder-subtractor` (or another name you prefer).
2. Do not add a README, `.gitignore`, or licence from GitHub because this project already contains those files.
3. In the project folder, run:

   ```bash
   git init
   git add .
   git commit -m "Initial adder-subtractor mini project"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/mode-controlled-adder-subtractor.git
   git push -u origin main
   ```

4. Replace `YOUR-USERNAME` with your GitHub username. Your source code will then be available in that repository.

## Deploy on Vercel

1. Sign in to Vercel using the same GitHub account.
2. Select **Add New → Project**, then import `mode-controlled-adder-subtractor`.
3. Framework preset: **Other**.
4. Root directory: `./`.
5. Build command: leave blank / no build command.
6. Output directory: `.` (project root).
7. Click **Deploy**. Vercel will provide a public `*.vercel.app` URL.

The included `vercel.json` adds clean URLs and a couple of basic security headers. Every push to the connected GitHub branch can trigger a new deployment.

## Project files

```text
.
├── index.html                 # Website structure and sections
├── styles.css                 # Responsive dark-theme styling
├── adder.js                   # Pure arithmetic logic shared by UI and tests
├── script.js                  # Simulator controls and live result rendering
├── assets/
│   ├── favicon.svg
│   └── circuit-diagram.svg
├── docs/
│   ├── PROJECT_REPORT.md      # Full academic mini-project report
│   └── CIRCUIT_NOTES.md       # Design equations, assumptions, and flags
├── tests/
│   └── adder.test.cjs         # Representative and exhaustive logic tests
├── .github/workflows/ci.yml  # GitHub Actions test workflow
├── vercel.json
├── package.json
└── README.md
```

## Technical assumptions

- The implemented data width is four bits.
- Inputs are unsigned values from 0 to 15.
- The 4-bit result wraps modulo 16; the carry output is displayed separately.
- Borrow is defined for unsigned subtraction as `NOT(Cout)`.
- Signed overflow is the XOR of the carry into the most-significant bit and the carry out of that bit.
- The web visualisation is a logic simulator / educational model. It is not a physical breadboard measurement.

## Suggested viva questions

1. Why is an XOR gate used before each full adder?
2. Why is the mode bit connected to the initial carry input?
3. What is the relationship between two's complement and subtraction?
4. What does the final carry mean in unsigned subtraction?
5. How is signed overflow detected?
6. Why are four full adders connected in a ripple-carry arrangement?

See `docs/PROJECT_REPORT.md` for the report and worked examples.
