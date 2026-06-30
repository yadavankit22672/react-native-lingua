const Tesseract = require('tesseract.js');

Tesseract.recognize(
  'prompt_material/02-onboarding-screen.png',
  'eng'
).then(({ data: { text } }) => {
  console.log("----- OCR TEXT -----");
  console.log(text);
});
