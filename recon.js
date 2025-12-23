const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
ctx.lineWidth = 4
ctx.lineCap = 'round' 
// Function to draw text on the canvas


let drawing = false;

function getPos(evt) {
  let rect = canvas.getBoundingClientRect();
  if (evt.touches) {
    return {
      x: evt.touches[0].clientX - rect.left,
      y: evt.touches[0].clientY - rect.top
    };
  } else {
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }
}

function startDrawing(evt) {
  drawing = true;
  const pos = getPos(evt);
  ctx.beginPath();
  ctx.moveTo(pos.x, pos.y);
  evt.preventDefault();
}

function draw(evt) {
  if (!drawing) return;
  const pos = getPos(evt);
  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();
  evt.preventDefault();
}

function stopDrawing() {
  drawing = false;
  ctx.closePath();
}

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);

canvas.addEventListener("touchstart", startDrawing, { passive: false });
canvas.addEventListener("touchmove", draw, { passive: false });
canvas.addEventListener("touchend", stopDrawing);
// Call the function to draw the text when the page loads

document.getElementById("sub").addEventListener('click', runOCR)
// Function to perform OCR when the button is clicked
async function runOCR() {
    const outputElement = document.getElementById('output');
    outputElement.textContent = 'Processing...';

    try {
        // Recognize the text from the canvas.
        // The language 'chi_sim' is for Simplified Chinese.
        // You can use 'chi_tra' for Traditional Chinese.
        const { data: { text } } = await Tesseract.recognize(
            canvas,
            'chi_sim'
        );

        // Display the recognized text
        outputElement.textContent = `Recognized Text: \n${text}`;
    } catch (error) {
        console.error('OCR failed:', error);
        outputElement.textContent = 'Error during OCR. Check the console for details.';
    }
}

function clearC(param) {
  ctx.clearRect(0,0, canvas.width, canvas.height)
}