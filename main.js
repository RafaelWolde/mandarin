let files = ["chashewlie", "leshayaw" , "kermacode",'hoihoich', "moonlight", "shigeday","heyahacanto", "zhashew", "skiurgod", "daybyday",
"beautyithin", "heyaha"]
let urls = ['', 'pGNnHRLVR6c', '']
let ls = document.getElementById('musics')
let fm = document.getElementById('format')
let showOps = document.querySelectorAll('[type="checkbox"]')
var utterance = null
try {
 utterance = new SpeechSynthesisUtterance();
utterance.pitch = 1; // Range from 0 to 2 (default 1)
utterance.rate = 1; // Range from 0.1 to 10 (default 1)
utterance.volume = 1; // Range from 0 to 1 (default 1)
var synth = window.speechSynthesis;
} catch (e) {
  
}


showOps.forEach(ele=>{
  ele.addEventListener('change' , e=>{
    if(e.target){
      console.log(e.target.id+'s')
      let targs = document.getElementsByClassName(e.target.id+'s')
      for (let targ of targs) {
        targ.classList.toggle('hidden')
      }
    }
  })
})
for (var i = 0; i < files.length; i++) {
  
  let opt = document.createElement('option')
  opt.value = files[i]
  opt.textContent = files[i]
  ls.appendChild(opt)
}
function update() {
  fetch('/'+ls.value+'.json').then(reslt=>reslt.json()).then(
  (lyr) => {
    if(!lyr.length)
    lyr = lyr.lyrics
      if (fm.value==='tabled') {
        renderTable(lyr)
      } else {
        renderBlock(lyr)
      }
      
  }
)

}
let tbody = document.querySelector("#lyricsTable tbody");
function renderTable(lyrics) {
  // Tab to edit
  const container = document.getElementById("lyrics-container");
  container.innerHTML = ""; // clear
  showOps.forEach(e=>e.checked=false)
  lyrics.forEach(sentence => {
    const table = document.createElement("table");

    // Row 1: chars
    const rowChars = document.createElement("tr");
    rowChars.classList.add('chars')
    sentence.chars.forEach(ch => {
      const td = document.createElement("td");
      td.textContent = ch;
      
      td.addEventListener('click', () => {
  if (utterance) {
    
  }
  utterance.rate = 1
  utterance.lang = 'zh-CN'; // 'zh-CN' for Mandarin Chinese (mainland China)
  utterance.text = ch
  synth.speak(utterance)
})
      rowChars.appendChild(td);
      
    });
    table.appendChild(rowChars);

    // Row 2: pinyin
    const rowPinyin = document.createElement("tr");
    rowPinyin.classList.add('pinyins')
    rowPinyin.addEventListener('click', ()=>{
      if (utterance) {
        
      }
      utterance.rate = .6
      utterance.lang = 'zh-CN'; // 'zh-CN' for Mandarin Chinese (mainland China)
      utterance.text = sentence.chars.join('')
      synth.speak(utterance)
    })
  
    sentence.pinyin.forEach(py => {
      const td = document.createElement("td");
      td.textContent = py;
      rowPinyin.appendChild(td);
    });
    table.appendChild(rowPinyin);

    // Row 3: char_meaning
    const rowMeaning = document.createElement("tr");
    rowMeaning.classList.add('chardefs')
    sentence.char_meaning.forEach(m => {
      const td = document.createElement("td");
      td.textContent = m;
      rowMeaning.appendChild(td);
    });
    table.appendChild(rowMeaning);

    // Row 4: sentence_meaning (spanning all columns)
    const rowSentenceMeaning = document.createElement("tr");
    rowSentenceMeaning.classList.add('defs')
    const td = document.createElement("td");
    td.className = "sentence-meaning";
    td.colSpan = sentence.chars.length;
    td.textContent = sentence.sentence_meaning;
    rowSentenceMeaning.appendChild(td);
    table.appendChild(rowSentenceMeaning);

    container.appendChild(table);
  });

}

function speakChar(ch) {
  utterance.rate = .6
utterance.lang = 'zh-CN'; // 'zh-CN' for Mandarin Chinese (mainland China)
utterance.text = ch
synth.speak(utterance)
}

function renderBlock(lyrics) {
  // Tab to edit
  const container = document.getElementById("lyrics-container");
  container.innerHTML = ""; // clear
  showOps.forEach(e=>e.checked=false)
  lyrics.forEach(sentence => {
    const table = document.createElement("div");

    // Row 1: chars
    const rowChars = document.createElement("p");
    rowChars.classList.add('chars')
    sentence.chars.forEach(ch => {
      const td = document.createElement("span");
      td.textContent = '[ '+ch+' ]';
      td.addEventListener('click', ()=>speakChar(ch))
      rowChars.appendChild(td);
    });
    table.appendChild(rowChars);

    // Row 2: pinyin
    const rowPinyin = document.createElement("p");
    rowPinyin.classList.add('pinyins')
    rowPinyin.addEventListener('click', ()=>{
      if (utterance) {
        utterance.rate = .6
      utterance.lang = 'zh-CN'; // 'zh-CN' for Mandarin Chinese (mainland China)
      utterance.text = sentence.chars.join('')
      synth.speak(utterance)
      }
      
    })
    sentence.pinyin.forEach(py => {
      const td = document.createElement("span");
      td.textContent = '[ '+py+' ]';
      rowPinyin.appendChild(td);
    });
    table.appendChild(rowPinyin);

    // Row 3: char_meaning
    const rowMeaning = document.createElement("p");
    rowMeaning.classList.add('chardefs')
    sentence.char_meaning.forEach(m => {
      const td = document.createElement("span");
      td.textContent = '[ '+m+' ]';
      rowMeaning.appendChild(td);
    });
    table.appendChild(rowMeaning);

    // Row 4: sentence_meaning (spanning all columns)
    const rowSentenceMeaning = document.createElement("p");
    rowSentenceMeaning.classList.add('defs')
    const td = document.createElement("span");
    td.className = "sentence-meaning";
    td.colSpan = sentence.chars.length;
    td.textContent = sentence.sentence_meaning;
    rowSentenceMeaning.appendChild(td);
    table.appendChild(rowSentenceMeaning);

    container.appendChild(table);
  });

}

update()
fm.onchange = update
ls.onchange = update


// Create a new SpeechSynthesisUtterance object
