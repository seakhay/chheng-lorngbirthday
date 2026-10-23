// Birthday website interactions. No external music file is required.
const giftButton = document.getElementById('giftButton');
const giftCaption = document.getElementById('giftCaption');
const surpriseMessage = document.getElementById('surpriseMessage');
const wishButton = document.getElementById('wishButton');
const wishMessage = document.getElementById('wishMessage');
const confettiLayer = document.getElementById('confettiLayer');
const musicToggle = document.getElementById('musicToggle');
const musicIcon = document.getElementById('musicIcon');
const musicLabel = document.getElementById('musicLabel');

function celebrate(count = 45) {
  const pieces = ['✦', '♡', '✧', '✿', '♥', '✨'];
  for (let i = 0; i < count; i++) {
    const piece = document.createElement('span');
    piece.className = 'confetti';
    piece.textContent = pieces[Math.floor(Math.random() * pieces.length)];
    piece.style.left = Math.random() * 100 + '%';
    piece.style.color = ['#ffb5d2', '#d7baff', '#ffe5a5', '#ffffff'][Math.floor(Math.random() * 4)];
    piece.style.setProperty('--duration', (2.2 + Math.random() * 2.8) + 's');
    piece.style.animationDelay = (Math.random() * .7) + 's';
    piece.style.fontSize = (12 + Math.random() * 18) + 'px';
    confettiLayer.appendChild(piece);
    piece.addEventListener('animationend', () => piece.remove());
  }
}

giftButton.addEventListener('click', () => {
  const opened = giftButton.classList.toggle('opened');
  surpriseMessage.classList.toggle('visible', opened);
  giftButton.setAttribute('aria-expanded', String(opened));
  giftCaption.textContent = opened ? 'Your surprise is open ♡' : 'Tap to open your gift';
  if (opened) celebrate(55);
});

document.querySelectorAll('.candle').forEach((candle) => {
  candle.addEventListener('click', () => {
    const isOff = candle.classList.toggle('off');
    candle.setAttribute('aria-pressed', String(!isOff));
  });
});

wishButton.addEventListener('click', () => {
  document.querySelectorAll('.candle').forEach((candle) => {
    candle.classList.add('off');
    candle.setAttribute('aria-pressed', 'false');
  });
  wishMessage.textContent = '✨ Wish sent! May something wonderful find its way to you this year. រីករាយថ្ងៃកំណើត! 💖';
  celebrate(90);
  wishButton.textContent = 'Wish made! 💖';
  window.setTimeout(() => { wishButton.textContent = 'Make another wish ✨'; }, 2500);
});

// A tiny original melody made with Web Audio, so the page needs no downloaded music.
let audioContext = null;
let musicTimer = null;
let musicPlaying = false;
let noteIndex = 0;
let nextNoteTime = 0;
let masterGain = null;
const melody = [
  [523.25, .25], [659.25, .25], [783.99, .5], [659.25, .5],
  [698.46, .25], [783.99, .25], [880.00, .5], [783.99, .5],
  [659.25, .25], [523.25, .25], [587.33, .5], [523.25, .75],
  [392.00, .25], [523.25, .25], [659.25, .5], [587.33, .5]
];
function playNote(frequency, start, duration) {
  if (!audioContext || !masterGain) return;
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(frequency, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(0.11, start + 0.025);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration * .9);
  osc.connect(gain);
  gain.connect(masterGain);
  osc.start(start);
  osc.stop(start + duration);
}
function scheduleMelody() {
  if (!musicPlaying || !audioContext) return;
  while (nextNoteTime < audioContext.currentTime + 0.5) {
    const [frequency, beats] = melody[noteIndex % melody.length];
    const duration = beats * 0.42;
    playNote(frequency, nextNoteTime, duration);
    // A soft lower harmony on every other note.
    if (noteIndex % 2 === 0) playNote(frequency / 2, nextNoteTime, duration * 0.8);
    nextNoteTime += duration + 0.04;
    noteIndex++;
  }
}
async function startMusic() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) {
    musicLabel.textContent = 'Music not supported here';
    return;
  }
  if (!audioContext) {
    audioContext = new AudioContextClass();
    masterGain = audioContext.createGain();
    masterGain.gain.value = 0.65;
    masterGain.connect(audioContext.destination);
  }
  await audioContext.resume();
  musicPlaying = true;
  nextNoteTime = audioContext.currentTime + 0.08;
  scheduleMelody();
  musicTimer = window.setInterval(scheduleMelody, 180);
  musicToggle.classList.add('playing');
  musicToggle.setAttribute('aria-pressed', 'true');
  musicIcon.textContent = '♫';
  musicLabel.textContent = 'Pause birthday music';
}
function stopMusic() {
  musicPlaying = false;
  if (musicTimer) window.clearInterval(musicTimer);
  musicTimer = null;
  if (masterGain && audioContext) {
    masterGain.gain.setTargetAtTime(0.0001, audioContext.currentTime, 0.03);
    window.setTimeout(() => {
      if (!musicPlaying && masterGain && audioContext) {
        masterGain.gain.setValueAtTime(0.65, audioContext.currentTime);
      }
    }, 180);
  }
  musicToggle.classList.remove('playing');
  musicToggle.setAttribute('aria-pressed', 'false');
  musicIcon.textContent = '♫';
  musicLabel.textContent = 'Play birthday music';
}
musicToggle.addEventListener('click', () => {
  if (musicPlaying) stopMusic();
  else startMusic().catch(() => { musicLabel.textContent = 'Tap to enable music'; });
});

// Add a few gentle stars when the page is first opened.
window.addEventListener('load', () => {
  window.setTimeout(() => celebrate(18), 650);
});
