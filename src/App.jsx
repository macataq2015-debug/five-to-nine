import { useState, useEffect, useCallback, useRef } from "react";
import { Analytics } from '@vercel/analytics/react';

// ─── DAILY PUZZLES ────────────────────────────────────────────────────────────
const PUZZLES = {
  "2026-05-05": {
    rounds: [
      { clue: "A group of Lions",                              answer: "PRIDE",     revealIdx: 1 },
      { clue: "Austrian capital",                              answer: "VIENNA",    revealIdx: [5,0] },
      { clue: "Which metal is liquid at room temperature?",    answer: "MERCURY",   revealIdx: 6 },
      { clue: "Which organ produces insulin?",                 answer: "PANCREAS",  revealIdx: [5,4] },
      { clue: "When an animal sleeps for the winter they..",   answer: "HIBERNATE", revealIdx: 2 },
    ],
    anagram: { letters:["R","V","E","A","B","Y","R"], answer:"BRAVERY", clue:"noun · great courage in the face of danger or difficulty" },
    quote: `Van Diemen's land is a hell for a man
To end out his whole life in slavery
Where the climate is raw and the gun makes the law
Neither wind nor rain care for BRAVERY

Oh, oh, I wish I was back home in Derry
— Bobby Sands
🎬 https://youtu.be/c5_wZmTHfo8?si=7Q1lzn9HKFDJ26cD`,
  },
  "2026-05-22": {
    rounds: [
      { clue: "What word comes after 'Sweet' and before 'Ache'?",     answer: "TOOTH",     revealIdx: 4 },
      { clue: "A strip of tarmac for aircraft to take off and land",  answer: "RUNWAY",    revealIdx: 1 },
      { clue: "A room used for sleeping",                             answer: "BEDROOM",   revealIdx: 6 },
      { clue: "The right to vote in political elections",             answer: "SUFFRAGE",  revealIdx: 5 },
      { clue: "The long tube in the digestive system where food is broken down and absorbed", answer: "INTESTINE", revealIdx: 1 },
    ],
    anagram: { letters:["H","N","U","A","M"], answer:"HUMAN", clue:"noun · a member of the species Homo sapiens" },
    quote: `"I am HUMAN and I need to be loved
Just like everybody else does"

— How Soon Is Now?, The Smiths
Morrissey was born on this day, May 22nd 1959 🌹
🎬 https://youtu.be/hnpILIIo9ek?si=jAn0oSWuqRNKrDyO`,
  },
  "2026-05-21": {
    rounds: [
      { clue: "What word comes after 'Bedtime' and before 'Board'?",  answer: "STORY",     revealIdx: 0 },
      { clue: "Thick mucus in the respiratory passages",              answer: "PHLEGM",    revealIdx: 0 },
      { clue: "A mythical horse with one horn",                       answer: "UNICORN",   revealIdx: 2 },
      { clue: "The mathematical operation using the − symbol",        answer: "SUBTRACT",  revealIdx: 4 },
      { clue: "The elected head of state",                            answer: "PRESIDENT", revealIdx: [4,8] },
    ],
    anagram: { letters:["I","P","R","S","T","I"], answer:"SPIRIT", clue:"noun · the non-physical part of a person; their soul or inner force" },
    quote: `"On May 21st 1927, Charles Lindbergh landed in Paris having crossed the Atlantic solo in 33 hours. His plane — The SPIRIT of St. Louis — changed aviation forever. ✈️

🎬 https://youtu.be/7hMBJyNbpBs?si=ivAX40_UiJ_e_kTg`,
  },
  "2026-05-20": {
    rounds: [
      { clue: "What word comes after 'Posh' and before 'Bag'?",       answer: "SPICE",     revealIdx: 3 },
      { clue: "A person who works on ships",                          answer: "SAILOR",    revealIdx: 4 },
      { clue: "Extremely hard, transparent crystal used in jewellery and cutting tools", answer: "DIAMOND", revealIdx: 3 },
      { clue: "To assign responsibility or tasks to another person",  answer: "DELEGATE",  revealIdx: [1,0] },
      { clue: "The study of stars",                                   answer: "ASTRONOMY", revealIdx: 8 },
    ],
    anagram: { letters:["M","E","C","Y","D","O"], answer:"COMEDY", clue:"noun · something that makes you laugh" },
    quote: `"David Letterman hosted The Late Show for 22 years, redefining late night COMEDY in America. He hosted his final show on May 20th 2015. 📺"

🎬 https://youtu.be/OctbREjW0jw?si=aPvl0H6N6dgY2tU7`,
  },
  "2026-05-19": {
    rounds: [
      { clue: "What word comes after 'Doll' and before 'Party'?",     answer: "HOUSE",     revealIdx: 3 },
      { clue: "A strong regular repeated pattern of sound or movement", answer: "RHYTHM",   revealIdx: 3 },
      { clue: "A tool used for direction",                            answer: "COMPASS",   revealIdx: 4 },
      { clue: "A political system ruled by a king or queen",          answer: "MONARCHY",  revealIdx: 2 },
      { clue: "The name for the & symbol",                            answer: "AMPERSAND", revealIdx: 8 },
    ],
    anagram: { letters:["S","N","T","D","A"], answer:"STAND", clue:"noun · an attitude or position taken on an issue" },
    quote: `"A man who STANDS for nothing will fall for anything."

— Malcolm X
Malcolm X was born on this day, May 19th 1925 ✊
🔗 https://www.malcolmx.com/quotes/`,
  },
  "2026-05-18": {
    rounds: [
      { clue: "What word comes after 'Sun' and before 'House'?",      answer: "LIGHT",     revealIdx: 0 },
      { clue: "A surprise attack from hiding",                        answer: "AMBUSH",    revealIdx: 0 },
      { clue: "A small insect that glows at night",                   answer: "FIREFLY",   revealIdx: 6 },
      { clue: "The name for the ( ) symbols",                         answer: "BRACKETS",  revealIdx: [5,1] },
      { clue: "Surname of the 3rd US President",                      answer: "JEFFERSON", revealIdx: 6 },
    ],
    anagram: { letters:["L","Y","A","E","S","R"], answer:"LAYERS", clue:"Ogres are like onions — they have ___" },
    quote: `"Ogres are like onions. LAYERS. Onions have layers. Ogres have layers. We both have layers."

— Shrek, 2001
Shrek premiered at the Cannes Film Festival on this day in 2001 🧅
🎬 https://youtu.be/CwXOrWvPBPk?si=_cu4W5-Wryfir7JD`,
  },
  "2026-05-17": {
    rounds: [
      { clue: "What word comes after 'Mobile' and before 'Booth'?",   answer: "PHONE",     revealIdx: 3 },
      { clue: "A mischievous creature from folklore",                 answer: "GOBLIN",    revealIdx: 1 },
      { clue: "The line where the earth or sea appears to meet the sky", answer: "HORIZON", revealIdx: 2 },
      { clue: "Mathematical operation using the + symbol",            answer: "ADDITION",  revealIdx: [1,3] },
      { clue: "UK Prime Minister during WWII, surname",               answer: "CHURCHILL", revealIdx: 0 },
    ],
    anagram: { letters:["N","D","R","I","O","C"], answer:"NORDIC", clue:"Relating to Scandinavia, Finland and Iceland" },
    quote: `"Norway's Constitution was signed at Eidsvoll on May 17th 1814 — today is Syttende Mai, Norway's national day! A great NORDIC nation celebrates its independence. 🇳🇴

🔗 https://geographyworlds.com/blog/facts-about-norway/"`,
  },
  "2026-05-16": {
    rounds: [
      { clue: "What word comes after 'Business' and before 'Action'?", answer: "CLASS",     revealIdx: 0 },
      { clue: "A respiratory condition causing difficulty breathing",   answer: "ASTHMA",    revealIdx: 0 },
      { clue: "Site with runways and terminals for air travel",         answer: "AIRPORT",   revealIdx: 3 },
      { clue: "The name for the * symbol",                             answer: "ASTERISK",  revealIdx: [2,0] },
      { clue: "A person seeking elected office",                       answer: "CANDIDATE", revealIdx: [4,2] },
    ],
    anagram: { letters:["C","T","P","I","A","A","N"], answer:"CAPTAIN", clue:"Highest‑ranking officer on a ship or plane" },
    quote: `"So hoist up the John B's sail
See how the main sail sets
Call for the CAPTAIN ashore
Let me go home"

— Sloop John B, The Beach Boys
Pet Sounds was released on this day, May 16th 1966 🏄
🎬 https://youtu.be/nSAoEf1Ib58?si=zDfLMU9tqCFKVWM3`,
  },
  "2026-05-14": {
    rounds: [
      { clue: "Largest species of cat",                               answer: "TIGER",     revealIdx: 1 },
      { clue: "To go after or come behind something or someone",      answer: "FOLLOW",    revealIdx: [2,3] },
      { clue: "Which ship sank in 1912?",                             answer: "TITANIC",   revealIdx: 0 },
      { clue: "First female UK Prime Minister, surname",              answer: "THATCHER",  revealIdx: 1 },
      { clue: "A person who travels to space",                        answer: "ASTRONAUT", revealIdx: 3 },
    ],
    anagram: { letters:["I","L","R","H","T","L"], answer:"THRILL", clue:"To cause someone to feel delight or exhilaration" },
    quote: `"The THRILL is gone, baby
The thrill is gone away
Someday I know I'll be over it all, baby
Just like I know a man should"

— The Thrill is Gone, BB King
BB King died on this day, May 14th 2015 🎸
🎬 https://youtu.be/SgXSomPE_FY?si=M5h9_Xft4mzkXzZC`,
  },
  "2026-05-15": {
    rounds: [
      { clue: "Which bone is the longest in the human body?",             answer: "FEMUR",     revealIdx: 0 },
      { clue: "What word comes after 'Bob' and before 'And Me'?",        answer: "MARLEY",    revealIdx: 4 },
      { clue: "A powerful rotating storm",                               answer: "TORNADO",   revealIdx: [4,0] },
      { clue: "First name of fictional detective at 221B Baker Street",  answer: "SHERLOCK",  revealIdx: [1,2] },
      { clue: "A group of classical musicians",                          answer: "ORCHESTRA", revealIdx: [1,5] },
    ],
    anagram: { letters:["F","E","T","A","S","H","R","E"], answer:"FEATHERS", clue:"What birds are covered in" },
    quote: `"Hope" is the thing with FEATHERS —
That perches in the soul —
And sings the tune without the words —
And never stops — at all —

— Emily Dickinson
Emily Dickinson died on this day, May 15th 1886 🕊️
🔗 https://www.poetryfoundation.org/poems/42889/hope-is-the-thing-with-feathers-314`,
  },
  "2026-05-13": {
    rounds: [
      { clue: "What word comes after Bruce and before Rooney?",          answer: "WAYNE",     revealIdx: 0 },
      { clue: "What you get when you mix red and blue",                  answer: "PURPLE",    revealIdx: 2 },
      { clue: "A perfect example or embodiment of a quality or type",    answer: "EPITOME",   revealIdx: [2,3] },
      { clue: "Dickens, Orwell and Hemingway's job title",              answer: "NOVELIST",  revealIdx: [5,0] },
      { clue: "A flash of bright light from an electrical storm",        answer: "LIGHTNING", revealIdx: 2 },
    ],
    anagram: { letters:["R","I","W","G","T","I","N"], answer:"WRITING", clue:"noun · the activity of putting words on paper" },
    quote: `"Very superstitious, WRITING's on the wall
Very superstitious, ladders 'bout to fall"

— Superstition, Stevie Wonder
Stevie Wonder was born on this day, May 13th 1950 🎹
🎬 https://youtu.be/97hwNY3ni10?si=VUBjC0fQkZfZbedD`,
  },
  "2026-05-12": {
    rounds: [
      { clue: "US President before Trump",                               answer: "OBAMA",     revealIdx: 3 },
      { clue: "A narrow water passage connecting two seas",              answer: "STRAIT",    revealIdx: 4 },
      { clue: "A person who travels for pleasure",                       answer: "TOURIST",   revealIdx: 5 },
      { clue: "Not joined or touching; to move apart",                   answer: "SEPARATE",  revealIdx: 1 },
      { clue: "Which gland regulates hormone production?",               answer: "PITUITARY", revealIdx: [7,8] },
    ],
    anagram: { letters:["S","M","I","E","R","Y"], answer:"MISERY", clue:"noun · a state of great distress or discomfort" },
    quote: `"Am I happy or in MISERY?
Whatever it is, that girl put a spell on me"

— Purple Haze, Jimi Hendrix
"Are You Experienced" was released on this day in 1967 🎸
🎬 https://youtu.be/cJunCsrhJjg?si=TBhRrwnVOdv0QQgi`,
  },
  "2026-05-11": {
    rounds: [
      { clue: "What is the surname of Walter in Breaking Bad?",          answer: "WHITE",     revealIdx: 0 },       // W  (Music Film TV)
      { clue: "What is the capital of Albania?",                         answer: "TIRANA",    revealIdx: 1 },       // I  (Countries & Capitals)
      { clue: "Which scientist discovered penicillin?",                  answer: "FLEMING",   revealIdx: 5 },       // N  (Generic)
      { clue: "Which Norwegian explorer reached the South Pole first?",  answer: "AMUNDSEN",  revealIdx: 3 },       // N  (World History)
      { clue: "To cause someone to feel awkward or self-conscious",      answer: "EMBARRASS", revealIdx: [0,4] },   // E, R  (Difficult Spell)
    ],
    anagram: { letters:["N","W","I","E","R","N"], answer:"WINNER", clue:"Not a loser" },
    quote: `"When I meet you around the corner
You make me feel like a sweepstake WINNER"

— Satisfy My Soul, Bob Marley
Bob Marley died on this day, May 11th 1981. Gone but never forgotten. 🌿
🎬 https://youtu.be/2NUd5yrb3cM?si=sjZBqHAItnoBD0qM`,
  },
  "2026-05-10": {
    rounds: [
      { clue: "A space under the roof of a house",         answer: "ATTIC",     revealIdx: [1,2,3] },
      { clue: "Secret → _ _ _ _ _ _ ← Gnome",             answer: "GARDEN",    revealIdx: 4 },
      { clue: "Iraq's capital",                            answer: "BAGHDAD",   revealIdx: 4 },
      { clue: "Who discovered America in 1492?",           answer: "COLUMBUS",  revealIdx: 3 },
      { clue: "Which gland regulates hormone production?", answer: "PITUITARY", revealIdx: [6,2] },
    ],
    anagram: { letters:["D","I","T","U","T","A","T","E"], answer:"ATTITUDE", clue:"noun · a settled way of thinking or feeling about something" },
    quote: `"Everything can be taken from a man but one thing: the last of the human freedoms — to choose one's ATTITUDE in any given set of circumstances." — Viktor Frankl, Man's Search for Meaning`,
  },
  "2026-05-09": {
    rounds: [
      { clue: "A fruit for cider",                            answer: "APPLE",     revealIdx: 4 },       // E
      { clue: "A large area filled with trees",               answer: "FOREST",    revealIdx: 0 },       // F
      { clue: "Lithuania's capital",                          answer: "VILNIUS",   revealIdx: [5,6] },   // U, S
      { clue: "First name of the singer who sang Happy",      answer: "PHARRELL",  revealIdx: 3 },       // R
      { clue: "London Hotspurs",                              answer: "TOTTENHAM", revealIdx: 4 },       // E
    ],
    anagram: { letters:["F","U","S","E","R","E"], answer:"REFUSE", clue:"verb · to indicate you are not willing to do something" },
    quote: `"But maybe that's just the price you pay for the chains you REFUSE

— Bees Wing, Richard Thompson
🎬 https://youtu.be/unu79PP2Klo?si=k-wVZNKo2j0kSPQL`,
  },
  "2026-05-08": {
    rounds: [
      { clue: "Which organ pumps blood around the body?",          answer: "HEART",     revealIdx: [3,4] },   // R, T
      { clue: "What is the capital of Cuba?",                      answer: "HAVANA",    revealIdx: 2 },       // V
      { clue: "Tennessee → _ _ _ _ _ _ _ ← in the jar",               answer: "WHISKEY",   revealIdx: [2,6] },   // I, Y
      { clue: "What is the study of heredity?",                    answer: "GENETICS",  revealIdx: 6 },       // C
      { clue: "Aware of and responding to one's surroundings",     answer: "CONSCIOUS", revealIdx: 1 },       // O
    ],
    anagram: { letters:["T","R","O","V","Y","C","I"], answer:"VICTORY", clue:"noun · success in a struggle or contest" },
    quote: `VICTORY in Europe Day celebrates the formal surrender of Nazi Germany on 8 May 1945 — 80 years ago today. The day the world breathed again.

🔗 https://en.wikipedia.org/wiki/Victory_in_Europe_Day`,
  },
  "2026-05-07": {
    rounds: [
      { clue: "What city are last year's Champions League winners from?", answer: "PARIS",     revealIdx: 1 },       // A
      { clue: "Which planet has the most visible rings?",                answer: "SATURN",    revealIdx: [4,3] },   // R, U
      { clue: "Silent Chaplin",                                          answer: "CHARLIE",   revealIdx: 0 },       // C
      { clue: "Proud, insolent, overbearing, disdainful",               answer: "ARROGANT",  revealIdx: [3,4] },   // O, G
      { clue: "What is the capital of Iceland?",                         answer: "REYKJAVIK", revealIdx: 1 },       // E
    ],
    anagram: { letters:["U","C","O","A","G","R","E"], answer:"COURAGE", clue:"noun · the ability to do something that frightens you" },
    quote: `"Courage doesn't always roar. Sometimes COURAGE is the little voice at the end of the day that says I'll try again tomorrow." — Mary Anne Radmacher`,
  },
  "2026-05-06": {
    rounds: [
      { clue: "What is the name for molten rock?",             answer: "MAGMA",     revealIdx: 1 },
      { clue: "What's a group of geese called?",              answer: "GAGGLE",    revealIdx: 5 },
      { clue: "China's capital?",                              answer: "BEIJING",   revealIdx: 0 },
      { clue: "What is the main gas in Earth's atmosphere?",   answer: "NITROGEN",  revealIdx: [0,3,7] },
      { clue: "Group combined to promote a common interest",   answer: "SYNDICATE", revealIdx: [0,4,7] },
    ],
    anagram: { letters:["N","B","I","A","T","N","E","R","S"], answer:"BANNISTER", clue:"First sub four minute miler" },
    quote: `"The man who can drive himself further once the effort gets painful is the man who will win." — Roger BANNISTER

🔗 https://www.guinnessworldrecords.com/records/hall-of-fame/first-sub-four-minute-mile`,
  },
};

// ─── STREAK ───────────────────────────────────────────────────────────────────
function getToday() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
}
function getStreak() {
  try { return JSON.parse(localStorage.getItem("ftn_streak") || "{}"); }
  catch(e) { return {}; }
}
function saveStreak(won) {
  try {
    const today = getToday();
    const data = getStreak();
    const yesterday = (() => { const d=new Date(); d.setDate(d.getDate()-1); return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`; })();
    if (data.lastPlayed === today) return data;
    const newStreak = won ? (data.lastPlayed===yesterday ? (data.current||0)+1 : 1) : 0;
    const newData = { current:newStreak, best:Math.max(newStreak,data.best||0), lastPlayed:today, lastWon:won };
    localStorage.setItem("ftn_streak", JSON.stringify(newData));
    return newData;
  } catch(e) { return { current:0, best:0 }; }
}

// ─── PUZZLE LOOKUP ────────────────────────────────────────────────────────────
function getDailyPuzzle() {
  try {
    const params = new URLSearchParams(window.location.search);
    const dateParam = params.get("date");
    if (dateParam && PUZZLES[dateParam]) return PUZZLES[dateParam];
  } catch(e) {}
  const today = new Date();
  const key = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,"0")}-${String(today.getDate()).padStart(2,"0")}`;
  return PUZZLES[key] || PUZZLES[Object.keys(PUZZLES).sort().pop()];
}

// ─── SCORING ─────────────────────────────────────────────────────────────────
function getTitle(timeLeft) {
  if (timeLeft >= 120) return { title:"CEO",      color:"#c4941f" };
  if (timeLeft >= 90)  return { title:"DIRECTOR", color:"#888888" };
  if (timeLeft >= 60)  return { title:"MANAGER",  color:"#cd7f32" };
  if (timeLeft >= 30)  return { title:"INTERN",   color:"#5b8db8" };
  return                      { title:"MAILROOM", color:"#aaaaaa" };
}

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const HINT_PENALTY  = 10;
const TOTAL_SECONDS = 3 * 60;

function formatTime(s) {
  if (s <= 0) return "0:00";
  return `${Math.floor(s/60)}:${(s%60).toString().padStart(2,"0")}`;
}

function tileSize(len) {
  const w = typeof window !== "undefined" ? window.innerWidth : 400;
  return Math.min(52, Math.floor((Math.min(w,500) - 48 - (len-1)*6) / len));
}

function evaluateGuess(guess, answer) {
  const result = Array(guess.length).fill("absent");
  const ansArr = answer.split(""); const gArr = guess.split("");
  const used = Array(answer.length).fill(false);
  gArr.forEach((ch,i) => { if (ch===ansArr[i]) { result[i]="correct"; used[i]=true; } });
  gArr.forEach((ch,i) => {
    if (result[i]==="correct") return;
    const j = ansArr.findIndex((c,k)=>c===ch&&!used[k]);
    if (j!==-1) { result[i]="present"; used[j]=true; }
  });
  return result;
}

// ─── CSS ─────────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Nunito:wght@700;800;900&display=swap');
  @keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-8px)}75%{transform:translateX(8px)}}
  @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
  @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
  @keyframes flicker{0%,89%,91%,93%,100%{opacity:1}90%,92%{opacity:0.7}}
  @keyframes tileGlow{0%,100%{box-shadow:0 0 6px rgba(196,148,31,0.3)}50%{box-shadow:0 0 18px rgba(196,148,31,0.7)}}
  @keyframes penalty{0%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translateY(-30px)}}
  *{box-sizing:border-box;margin:0;padding:0}
  button:active{opacity:0.7}
`;

// ─── TYPEWRITER ROW ───────────────────────────────────────────────────────────
function TypewriterRow({ word, answer, correct, animate, onDone }) {
  const [count,   setCount]   = useState(animate ? 0 : word.length);
  const [flipped, setFlipped] = useState(!animate);
  useEffect(() => {
    if (!animate) return;
    if (count < word.length) { const t=setTimeout(()=>setCount(c=>c+1),100); return ()=>clearTimeout(t); }
    else { const t=setTimeout(()=>{ setFlipped(true); onDone?.(); },300); return ()=>clearTimeout(t); }
  }, [count, word.length, animate, onDone]);
  const sz = tileSize(word.length);
  const fs = Math.max(13, Math.min(20, Math.floor(sz*0.44)));
  const evaluation = correct ? Array(word.length).fill("correct") : evaluateGuess(word, answer);
  return (
    <div style={{ display:"flex", gap:5, justifyContent:"center", marginBottom:6 }}>
      {word.split("").map((ch,i) => {
        const shown = i < count;
        let color="#111111", border="#cccccc", bg="#ffffff", content=shown?ch:"";
        if (flipped) {
          const ev = evaluation[i];
          if (ev==="correct")      { color="#2e7d32"; border="#2e7d32"; bg="#e8f5e9"; }
          else if (ev==="present") { color="#1565c0"; border="#1565c0"; bg="#e3f2fd"; }
          else                     { color="#c62828"; border="#c62828"; bg="#ffebee"; }
          content = ch;
        } else if (!shown) { border="#cccccc"; color="transparent"; }
        return (
          <div key={i} style={{ width:sz, height:sz, border:`3px solid ${border}`, borderRadius:4, background:bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:fs, fontWeight:700, color: flipped?color:shown?"#111111":"#cccccc", fontFamily:"'Courier New',monospace", transition:flipped?`border-color 0.15s ${i*0.04}s,color 0.15s ${i*0.04}s`:"none", position:"relative" }}>
            {content}
            {animate && !flipped && i===count && <div style={{ position:"absolute", right:3, top:7, bottom:7, width:2, background:"#c4941f", animation:"blink 0.6s step-end infinite" }} />}
          </div>
        );
      })}
    </div>
  );
}

// ─── ANSWER DISPLAY ───────────────────────────────────────────────────────────
function AnswerDisplay({ length, revealed, input, shake }) {
  let freeIdx = 0; const cells = [];
  const sz = tileSize(length);
  const fs = Math.max(13, Math.min(20, Math.floor(sz*0.44)));
  for (let i=0; i<length; i++) {
    const hinted = revealed[i];
    if (hinted) { cells.push({ i, hinted, ch:hinted, isCursor:false }); }
    else { const ch=input[freeIdx]||""; const isCursor=freeIdx===input.length; cells.push({ i, hinted:false, ch, isCursor }); freeIdx++; }
  }
  return (
    <div style={{ display:"flex", gap:5, justifyContent:"center", marginBottom:6, animation:shake?"shake 0.4s ease":"none" }}>
      {cells.map(({ i, hinted, ch, isCursor }) => (
        <div key={i} style={{ width:sz, height:sz, border:`2px solid ${hinted?"#c4941f":ch?"#999999":"#cccccc"}`, borderRadius:4, display:"flex", alignItems:"center", justifyContent:"center", fontSize:fs, fontWeight:700, color:hinted?"#c4941f":"#111111", fontFamily:"'Courier New',monospace", background:"#ffffff", position:"relative" }}>
          {ch}
          {!hinted && isCursor && <div style={{ position:"absolute", right:3, top:7, bottom:7, width:2, background:"#c4941f", animation:"blink 0.6s step-end infinite" }} />}
        </div>
      ))}
    </div>
  );
}

// ─── ROUND SUMMARY ────────────────────────────────────────────────────────────
function RoundSummary({ r, i }) {
  const highlights = Array.isArray(r.revealIdx) ? r.revealIdx : [r.revealIdx];
  return (
    <div style={{ display:"flex", alignItems:"center", gap:10, padding:"7px 12px", background:r.solved?"rgba(46,125,50,0.06)":"rgba(198,40,40,0.04)", border:`1px solid ${r.solved?"rgba(46,125,50,0.3)":"rgba(198,40,40,0.2)"}`, borderRadius:8, marginBottom:5 }}>
      <div style={{ fontSize:10, color:"#666666", width:16, flexShrink:0 }}>{i+1}</div>
      <div style={{ flex:1, display:"flex", gap:3, flexWrap:"wrap" }}>
        {r.answer.split("").map((ch,ci) => {
          const hl = highlights.includes(ci);
          return <div key={ci} style={{ width:20, height:20, borderRadius:3, border:`1px solid ${hl?"#c4941f":"#cccccc"}`, background:hl?"#c4941f":"#ffffff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:700, color:hl?"#000000":r.solved?"#2e7d32":"#555555", fontFamily:"'Courier New',monospace" }}>{ch}</div>;
        })}
      </div>
      <div style={{ fontSize:10, color:r.solved?"#2e7d32":"#c62828", flexShrink:0 }}>{r.solved?"✓":"✗"}</div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function FiveToNine() {
  const [puzzle]    = useState(() => getDailyPuzzle());
  const [roundIdx,  setRoundIdx]  = useState(0);
  const [done,      setDone]      = useState([]);
  const [attempts,  setAttempts]  = useState([]);
  const [animating, setAnimating] = useState(false);
  const [input,     setInput]     = useState("");
  const [revealed,  setRevealed]  = useState({});
  const [shake,     setShake]     = useState(false);
  const [phase,     setPhase]     = useState("landing");
  const [anShake,   setAnShake]   = useState(false);
  const [anWrong,   setAnWrong]   = useState(false);
  const [anSlots,   setAnSlots]   = useState([]);
  const [anUsed,    setAnUsed]    = useState([]);
  const [timeLeft,  setTimeLeft]  = useState(TOTAL_SECONDS);
  const [penalty,   setPenalty]   = useState(null);
  const [shared,    setShared]    = useState(false);
  const [anagramSolved, setAnagramSolved] = useState(false);
  const [started,   setStarted]   = useState(false);
  const [streak,    setStreak]    = useState(() => getStreak());
  const [showAnswers,  setShowAnswers]  = useState(false);
  const [showScoring,  setShowScoring]  = useState(false);
  const [alreadyPlayed, setAlreadyPlayed] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get("date")) return false;
      const data = JSON.parse(localStorage.getItem("ftn_streak") || "{}");
      const today = new Date();
      const key = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
      return data.lastPlayed === key;
    } catch(e) { return false; }
  });

  const round    = puzzle.rounds[roundIdx];
  const alen     = round?.answer.length ?? 0;
  const canInput = phase === "playing" && !animating;
  const freeCount = Array.from({length:alen},(_,i)=>i).filter(i=>!revealed[i]).length;

  useEffect(() => {
    if (!started || phase==="win" || phase==="timeout" || phase==="landing") return;
    if (timeLeft <= 0) { saveStreak(false); setStreak(getStreak()); setPhase("timeout"); return; }
    const id = setTimeout(()=>setTimeLeft(t=>t-1), 1000);
    return () => clearTimeout(id);
  }, [timeLeft, phase, started]);

  const timerColor = timeLeft<=30?"#c62828":timeLeft<=60?"#e65100":"#c4941f";

  const takeHint = () => {
    if (!canInput) return;
    const unrevealed = [];
    for (let i=0; i<alen; i++) { if (!revealed[i]) unrevealed.push(i); }
    if (!unrevealed.length) return;
    const idx = unrevealed[Math.floor(Math.random()*unrevealed.length)];
    setRevealed(prev=>({ ...prev, [idx]:round.answer[idx] }));
    setInput(""); setTimeLeft(t=>Math.max(0,t-HINT_PENALTY));
    setPenalty("-10s"); setTimeout(()=>setPenalty(null),1200);
  };

  const buildGuess = useCallback(() => {
    let result="", freeIdx=0;
    for (let i=0; i<alen; i++) {
      if (revealed[i]) result += revealed[i];
      else { result += (input[freeIdx]||" "); freeIdx++; }
    }
    return result.toUpperCase();
  }, [alen, revealed, input]);

  const stateRef = useRef({});
  stateRef.current = { round, roundIdx, done, puzzle };
  const revealFired = useRef(false);

  const submit = useCallback(() => {
    if (!canInput) return;
    const guess = buildGuess();
    if (guess.includes(" ")) { setShake(true); setTimeout(()=>setShake(false),500); return; }
    const correct = guess === round.answer;
    setAttempts(prev=>[...prev, { word:guess, correct }]);
    setInput(""); setAnimating(true); revealFired.current = false;
  }, [canInput, buildGuess, round]);

  const onRevealDone = useCallback(() => {
    if (revealFired.current) return;
    revealFired.current = true;
    const { round, roundIdx, done, puzzle } = stateRef.current;
    setAttempts(prev => {
      const latest = prev[prev.length-1];
      if (!latest) return prev;
      if (latest.correct) {
        setTimeout(() => {
          const completedRound = { ...round, solved:true, revealIdx:round.revealIdx };
          setDone(d=>[...d, completedRound]);
          setAttempts([]); setInput(""); setRevealed({});
          setAnimating(false); revealFired.current = false;
          if (roundIdx >= puzzle.rounds.length-1) setPhase("anagram");
          else setRoundIdx(r=>r+1);
        }, 700);
      } else {
        setAnimating(false);
        setTimeout(()=>setInput(""), 100);
      }
      return prev;
    });
  }, []);

  useEffect(() => {
    const onDown = (e) => {
      if (!canInput) return;
      if (["Backspace"," "].includes(e.key)||/^[a-zA-Z]$/.test(e.key)) e.preventDefault();
      const k=e.key.toUpperCase();
      if (k==="BACKSPACE") setInput(s=>s.slice(0,-1));
      else if (/^[A-Z]$/.test(k)&&input.length<freeCount) setInput(s=>s+k);
    };
    const onUp = (e) => { if (e.key!=="Enter") return; e.preventDefault(); if (canInput) submit(); };
    window.addEventListener("keydown",onDown); window.addEventListener("keyup",onUp);
    return ()=>{ window.removeEventListener("keydown",onDown); window.removeEventListener("keyup",onUp); };
  }, [canInput, input, freeCount, submit]);

  const pressKey = (k) => {
    if (!canInput) return;
    if (k==="ENTER") submit();
    else if (k==="DEL") setInput(s=>s.slice(0,-1));
    else if (input.length<freeCount) setInput(s=>s+k);
  };

  const tapAnagramLetter = (letter, tileIdx) => {
    if (anUsed.includes(tileIdx)||anSlots.length>=puzzle.anagram.answer.length) return;
    setAnSlots(prev=>[...prev,letter]); setAnUsed(prev=>[...prev,tileIdx]);
  };
  const clearAnagramSlot = (slotIdx) => {
    setAnSlots(prev=>prev.filter((_,i)=>i!==slotIdx));
    setAnUsed(prev=>prev.filter((_,i)=>i!==slotIdx));
  };
  const clearAllAnagram = () => { setAnSlots([]); setAnUsed([]); setAnWrong(false); };

  const submitAnagram = () => {
    const guess = anSlots.join("").toUpperCase();
    if (guess===puzzle.anagram.answer) {
      setAnagramSolved(true);
      const newStreak = saveStreak(true); setStreak(newStreak);
      setTimeout(()=>setPhase("win"),800);
    } else {
      setAnWrong(true); setAnShake(true);
      setTimeout(()=>{ setAnShake(false); setAnWrong(false); },700);
    }
  };

  const handleShare = () => {
    const mins=Math.floor(timeLeft/60), secs=timeLeft%60;
    const today = new Date().toLocaleDateString("en-GB",{day:"numeric",month:"short"});
    const boxes = done.map(r=>r.solved?"✅":"❌").join(" ");
    const anBox = anagramSolved?"🔤✅":"🔤❌";
    const title = getTitle(timeLeft).title;
    const streakLine = streak&&streak.current>0?`\n👑 ${streak.current} day streak`:"";
    const text = `5 TO 9 · ${today}\n🎓 ${title}\n${boxes} ${anBox}\n⏱ ${mins}m ${secs}s remaining${streakLine}\n5to9daily.com`;
    if (navigator.share) {
      navigator.share({ title:"5 TO 9", text }).catch(()=>{});
    } else {
      navigator.clipboard.writeText(text).then(()=>{ setShared(true); setTimeout(()=>setShared(false),2500); });
    }
  };

  const ShareButton = () => (
    <button onClick={handleShare} style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:10, width:"100%", height:56, background:shared?"rgba(37,211,102,0.2)":"#25D366", border:"none", borderRadius:10, color:"#000", fontSize:14, fontWeight:800, letterSpacing:2, cursor:"pointer", fontFamily:"'Courier New',monospace", boxSizing:"border-box" }}>
      <span style={{ fontSize:20 }}>{shared?"✓":"📤"}</span>
      <span>{shared?"COPIED!":"SHARE"}</span>
    </button>
  );

  const QuoteDisplay = () => (
    <div style={{ maxWidth:440, border:"1px solid #e0e0e0", borderRadius:10, padding:"22px 26px", animation:"fadeUp 0.8s ease", textAlign:"left", marginBottom:16, width:"100%", background:"#ffffff" }}>
      <div style={{ fontSize:13, letterSpacing:3, color:"#c4941f", marginBottom:14, fontWeight:700 }}>BEFORE YOU GO...</div>
      <p style={{ fontSize:17, lineHeight:2.0, color:"#000000", fontStyle:"italic", fontWeight:800, fontFamily:"'Nunito',sans-serif", margin:0, whiteSpace:"pre-wrap" }}>
        {puzzle.quote.split(puzzle.anagram.answer).map((part,i,arr) => {
          const urlRegex = /(https?:\/\/[^\s]+)/g;
          const withLinks = part.split(urlRegex).map((chunk,j) =>
            urlRegex.test(chunk)
              ? <a key={j} href={chunk} target="_blank" rel="noopener noreferrer" style={{ color:"#c4941f", fontStyle:"normal", wordBreak:"break-all" }}>{chunk}</a>
              : chunk
          );
          return <span key={i}>{withLinks}{i<arr.length-1&&<span style={{ color:"#c4941f", fontWeight:"bold", fontStyle:"normal", letterSpacing:1 }}>{puzzle.anagram.answer}</span>}</span>;
        })}
      </p>
    </div>
  );

  const ReviewAnswers = () => (
    <div style={{ width:"100%", maxWidth:440, marginTop:8, marginBottom:8 }}>
      <button onClick={()=>setShowAnswers(s=>!s)} style={{ width:"100%", background:"transparent", border:"1px solid #e0e0e0", borderRadius:8, padding:"10px", fontSize:11, color:"#666666", letterSpacing:2, cursor:"pointer", fontFamily:"'Courier New',monospace" }}>
        {showAnswers?"▲ HIDE ANSWERS":"▼ REVIEW TODAY'S ANSWERS"}
      </button>
      {showAnswers && (
        <div style={{ marginTop:8 }}>
          {puzzle.rounds.map((r,i) => {
            const highlights = Array.isArray(r.revealIdx)?r.revealIdx:[r.revealIdx];
            const solved = done[i]?.solved;
            return (
              <div key={i} style={{ padding:"10px 14px", background:"rgba(0,0,0,0.02)", border:"1px solid #e0e0e0", borderRadius:8, marginBottom:6 }}>
                <div style={{ fontSize:12, color:"#444444", marginBottom:6 }}>{r.clue}</div>
                <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
                  {r.answer.split("").map((ch,ci) => {
                    const hl = highlights.includes(ci);
                    return <div key={ci} style={{ width:26, height:26, borderRadius:3, border:`1px solid ${hl?"#c4941f":"#cccccc"}`, background:hl?"#c4941f":"#ffffff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, color:hl?"#000000":solved?"#2e7d32":"#888888", fontFamily:"'Courier New',monospace" }}>{ch}</div>;
                  })}
                </div>
              </div>
            );
          })}
          <div style={{ padding:"10px 14px", background:"rgba(196,148,31,0.05)", border:"1px solid rgba(196,148,31,0.2)", borderRadius:8 }}>
            <div style={{ fontSize:10, color:"#c4941f", marginBottom:6 }}>ANAGRAM · {puzzle.anagram.clue}</div>
            <div style={{ fontSize:18, letterSpacing:6, fontWeight:700, color:"#2e7d32", fontFamily:"'Courier New',monospace" }}>{puzzle.anagram.answer}</div>
          </div>
        </div>
      )}
    </div>
  );

  const ScoringGuide = () => (
    <div style={{ width:"100%", maxWidth:440, marginBottom:8 }}>
      <button onClick={()=>setShowScoring(s=>!s)} style={{ width:"100%", background:"transparent", border:"1px solid #e0e0e0", borderRadius:8, padding:"10px", fontSize:11, color:"#666666", letterSpacing:2, cursor:"pointer", fontFamily:"'Courier New',monospace" }}>
        {showScoring?"▲ HIDE SCORING GUIDE":"▼ SCORING GUIDE"}
      </button>
      {showScoring && (
        <div style={{ marginTop:6 }}>
          {[
            { title:"CEO",      time:"2:00+", color:"#c4941f" },
            { title:"DIRECTOR", time:"1:30+", color:"#888888" },
            { title:"MANAGER",  time:"1:00+", color:"#cd7f32" },
            { title:"INTERN",   time:"0:30+", color:"#5b8db8" },
            { title:"MAILROOM", time:"0:00+", color:"#aaaaaa" },
          ].map(({ title, time, color }) => {
            const isCurrent = getTitle(timeLeft).title===title;
            return (
              <div key={title} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"7px 14px", borderRadius:6, background:isCurrent?"rgba(0,0,0,0.03)":"transparent", border:isCurrent?`1px solid ${color}`:"1px solid transparent", marginBottom:3 }}>
                <span style={{ fontSize:13, fontWeight:isCurrent?800:400, color:isCurrent?color:"#666666", letterSpacing:1, fontFamily:"'Bebas Neue',sans-serif" }}>{isCurrent?"★ ":""}{title}</span>
                <span style={{ fontSize:11, color:isCurrent?color:"#888888" }}>{time}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  // ── ALREADY PLAYED ────────────────────────────────────────────────────────
  if (phase === "landing" && alreadyPlayed) return (
    <div style={{ minHeight:"100vh", background:"#fafaf8", fontFamily:"'Courier New',monospace", color:"#111111", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"24px 20px", textAlign:"center" }}>
      <style>{CSS}</style>
      <h1 style={{ fontSize:72, letterSpacing:12, color:"#c4941f", fontFamily:"'Bebas Neue',sans-serif", animation:"flicker 8s infinite", lineHeight:1, marginBottom:4 }}>5 TO 9</h1>
      <p style={{ fontSize:15, letterSpacing:2, color:"#c4941f", marginBottom:40, fontWeight:700 }}>
        {new Date().toLocaleDateString("en-GB", { weekday:"long", day:"numeric", month:"long", year:"numeric" })}
      </p>
      <div style={{ fontSize:48, marginBottom:16 }}>👑</div>
      <h2 style={{ fontSize:28, color:"#333333", marginBottom:12, fontFamily:"'Bebas Neue',sans-serif", letterSpacing:4 }}>YOU'VE PLAYED TODAY!</h2>
      <p style={{ fontSize:14, color:"#666666", marginBottom:8, lineHeight:1.6 }}>Come back tomorrow for a new puzzle</p>
      {streak.current > 0 && (
        <div style={{ display:"flex", alignItems:"center", gap:8, margin:"20px 0" }}>
          <span style={{ fontSize:24 }}>👑</span>
          <span style={{ fontSize:22, fontWeight:800, color:"#c4941f", fontFamily:"'Bebas Neue',sans-serif", letterSpacing:2 }}>{streak.current} DAY STREAK</span>
          {streak.best > 1 && <span style={{ fontSize:11, color:"#888888" }}>BEST: {streak.best}</span>}
        </div>
      )}
      <div style={{ width:"100%", maxWidth:440, marginTop:8 }}><ShareButton /></div>
      <button onClick={()=>setAlreadyPlayed(false)} style={{ background:"transparent", border:"none", color:"#cccccc", fontSize:11, marginTop:24, cursor:"pointer", fontFamily:"'Courier New',monospace", letterSpacing:2 }}>
        play again
      </button>
      <Analytics />
    </div>
  );

  // ── LANDING ───────────────────────────────────────────────────────────────
  if (phase === "landing") return (
    <div style={{ minHeight:"100vh", background:"#fafaf8", fontFamily:"'Courier New',monospace", color:"#111111", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"24px 20px" }}>
      <style>{CSS}</style>
      <h1 style={{ fontSize:72, letterSpacing:12, color:"#c4941f", fontFamily:"'Bebas Neue',sans-serif", animation:"flicker 8s infinite", lineHeight:1, marginBottom:4 }}>5 TO 9</h1>
      <p style={{ fontSize:15, letterSpacing:4, color:"#555555", marginBottom:4, textTransform:"uppercase", fontWeight:700 }}>Daily Quiz</p>
      <p style={{ fontSize:15, letterSpacing:2, color:"#c4941f", marginBottom:40, fontWeight:700 }}>
        {new Date().toLocaleDateString("en-GB", { weekday:"long", day:"numeric", month:"long", year:"numeric" })}
      </p>
      <div style={{ width:"100%", maxWidth:480, border:"1px solid #e0e0e0", borderRadius:12, padding:"20px 24px", marginBottom:16, background:"#ffffff" }}>
        <div style={{ fontSize:16, letterSpacing:3, color:"#c4941f", marginBottom:18, fontWeight:900, fontFamily:"'Nunito',sans-serif" }}>HOW TO PLAY</div>
        {[
          ["🧠","5 questions — answers grow from 5 to 9 letters"],
          ["💡","Stuck? Use the HINT button — it reveals a letter, but costs 10 seconds"],
          ["🔤","Spot the gold letters · Crack the ANAGRAM · See what's waiting Before You Go..."],
          ["⏱️","3 minutes on the clock — good luck!"],
        ].map(([icon,text],i) => (
          <div key={i} style={{ display:"flex", gap:12, alignItems:"flex-start", marginBottom:14 }}>
            <span style={{ fontSize:18, flexShrink:0 }}>{icon}</span>
            <span style={{ fontSize:16, color:"#000000", lineHeight:1.7, fontWeight:800, fontFamily:"'Nunito',sans-serif" }}>{text}</span>
          </div>
        ))}
      </div>
      <div style={{ width:"100%", maxWidth:480, border:"1px solid #e0e0e0", borderRadius:12, padding:"20px 24px", marginBottom:28, background:"#ffffff" }}>
        <div style={{ fontSize:16, letterSpacing:3, color:"#c4941f", marginBottom:16, fontWeight:900, fontFamily:"'Nunito',sans-serif" }}>LETTER COLOURS</div>
        {[
          { color:"#2e7d32", bg:"rgba(46,125,50,0.08)", border:"rgba(46,125,50,0.4)", label:"Correct letter, correct position" },
          { color:"#1565c0", bg:"rgba(21,101,192,0.08)", border:"rgba(21,101,192,0.4)", label:"Correct letter, wrong position" },
          { color:"#c62828", bg:"rgba(198,40,40,0.08)", border:"rgba(198,40,40,0.4)", label:"Letter not in the answer" },
        ].map(({ color, bg, border, label },i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:14, marginBottom:12 }}>
            <div style={{ width:28, height:28, borderRadius:4, background:bg, border:`2px solid ${border}`, flexShrink:0 }} />
            <span style={{ fontSize:16, color:"#000000", fontWeight:800, fontFamily:"'Nunito',sans-serif" }}>{label}</span>
          </div>
        ))}
      </div>
      {streak.current > 0 && (
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:20 }}>
          <span style={{ fontSize:24 }}>👑</span>
          <span style={{ fontSize:20, fontWeight:800, color:"#c4941f", fontFamily:"'Bebas Neue',sans-serif", letterSpacing:2 }}>{streak.current} DAY STREAK</span>
          {streak.best>1&&<span style={{ fontSize:11, color:"#888888" }}>BEST: {streak.best}</span>}
        </div>
      )}
      <button onClick={()=>{ setStarted(true); setPhase("playing"); }} style={{ width:"100%", maxWidth:480, padding:"18px", background:"linear-gradient(135deg,#b8860b,#c4941f)", border:"none", borderRadius:10, color:"#ffffff", fontSize:16, fontWeight:800, letterSpacing:3, cursor:"pointer", fontFamily:"'Courier New',monospace", boxShadow:"0 4px 16px rgba(196,148,31,0.4)" }}>
        START THE CLOCK
      </button>
      {!streak.current&&<p style={{ color:"#888888", marginTop:20, fontSize:10, letterSpacing:2 }}>NEW PUZZLE EVERY DAY</p>}
      <Analytics />
    </div>
  );

  // ── TIMEOUT ───────────────────────────────────────────────────────────────
  if (phase === "timeout") return (
    <div style={{ minHeight:"100vh", background:"#fafaf8", fontFamily:"'Courier New',monospace", color:"#111111", display:"flex", flexDirection:"column", alignItems:"center", padding:"0 16px 48px" }}>
      <style>{CSS}</style>
      <div style={{ width:"100%", maxWidth:580, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"18px 0 14px", borderBottom:"1px solid #e0e0e0", marginBottom:20 }}>
        <div style={{ fontSize:10, letterSpacing:3, color:"#888888" }}>TIME UP</div>
        <h1 style={{ fontSize:40, letterSpacing:8, color:"#c4941f", fontFamily:"'Bebas Neue',sans-serif" }}>5 TO 9</h1>
        <div style={{ fontSize:10, color:"#888888" }}>0:00</div>
      </div>
      <div style={{ textAlign:"center", marginBottom:20, padding:"0 20px" }}>
        <p style={{ fontSize:18, color:"#333333", lineHeight:1.7, fontStyle:"italic" }}>"The questions just didn't suit you today"</p>
        {streak.current===0&&streak.best>0&&(
          <div style={{ marginTop:12 }}>
            <div style={{ fontSize:18, color:"#c62828", fontFamily:"'Bebas Neue',sans-serif", letterSpacing:2 }}>STREAK LOST</div>
            <div style={{ fontSize:10, color:"#888888", letterSpacing:2, marginTop:4 }}>YOUR BEST WAS {streak.best} DAYS</div>
          </div>
        )}
      </div>
      <QuoteDisplay />
      <div style={{ width:"100%", maxWidth:440, marginBottom:16 }}><ShareButton /></div>
      <ReviewAnswers />
      <p style={{ color:"#888888", marginTop:16, fontSize:10, letterSpacing:3, textAlign:"center" }}>COME BACK TOMORROW FOR A NEW PUZZLE</p>
      <Analytics />
    </div>
  );

  // ── WIN ───────────────────────────────────────────────────────────────────
  if (phase === "win") {
    const t = getTitle(timeLeft);
    return (
      <div style={{ minHeight:"100vh", background:"#fafaf8", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", fontFamily:"'Courier New',monospace", color:"#111111", padding:"24px 20px", textAlign:"center" }}>
        <style>{CSS}</style>
        <div style={{ fontSize:56, animation:"float 2s ease-in-out infinite" }}>🏆</div>
        <h2 style={{ fontSize:52, letterSpacing:6, color:t.color, fontFamily:"'Bebas Neue',sans-serif", margin:"16px 0 4px", textShadow:`0 0 20px ${t.color}` }}>{t.title}</h2>
        <p style={{ color:"#888888", fontSize:11, letterSpacing:2, marginBottom:4 }}>⏱ {Math.floor(timeLeft/60)}m {timeLeft%60}s remaining</p>
        {streak.current>0&&(
          <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:12 }}>
            <span style={{ fontSize:16 }}>👑</span>
            <span style={{ fontSize:14, color:"#c4941f", fontFamily:"'Bebas Neue',sans-serif", letterSpacing:2 }}>{streak.current} DAY STREAK {streak.current===streak.best&&streak.current>1?"🏆":""}</span>
          </div>
        )}
        <div style={{ fontSize:26, letterSpacing:10, fontWeight:700, color:"#2e7d32", border:"1px solid rgba(46,125,50,0.4)", borderRadius:6, padding:"14px 28px", marginBottom:16, fontFamily:"'Courier New',monospace", background:"#ffffff" }}>{puzzle.anagram.answer}</div>
        <QuoteDisplay />
        <div style={{ width:"100%", maxWidth:440, marginBottom:8 }}><ShareButton /></div>
        <ScoringGuide />
        <ReviewAnswers />
        <p style={{ color:"#888888", fontSize:9, letterSpacing:3, marginTop:8 }}>COME BACK TOMORROW FOR A NEW PUZZLE</p>
        <Analytics />
      </div>
    );
  }

  // ── ANAGRAM ───────────────────────────────────────────────────────────────
  if (phase === "anagram") {
    const ansLen = puzzle.anagram.answer.length;
    const count  = puzzle.anagram.letters.length;
    const tileSz = Math.min(52, Math.floor((Math.min(window.innerWidth-48,500)-(count-1)*8)/count));
    const tileFs = Math.max(13, Math.floor(tileSz*0.44));
    const slotSz = Math.min(52, Math.floor((Math.min(window.innerWidth-48,500)-(ansLen-1)*8)/ansLen));
    const slotFs = Math.max(13, Math.floor(slotSz*0.44));
    const isComplete = anSlots.length===ansLen;
    return (
      <div style={{ minHeight:"100vh", background:"#fafaf8", fontFamily:"'Courier New',monospace", color:"#111111", display:"flex", flexDirection:"column", alignItems:"center", padding:"0 16px 48px" }}>
        <style>{CSS}</style>
        <div style={{ width:"100%", maxWidth:580, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 0 12px", borderBottom:"1px solid #e0e0e0", marginBottom:14 }}>
          <div style={{ fontSize:20, letterSpacing:1, color:"#666666", minWidth:60, fontWeight:800 }}>FINAL</div>
          <h1 style={{ fontSize:40, letterSpacing:8, color:"#c4941f", fontFamily:"'Bebas Neue',sans-serif", animation:"flicker 8s infinite", lineHeight:1 }}>5 TO 9</h1>
          <div style={{ fontSize:20, fontWeight:700, fontFamily:"'Courier New',monospace", color:timerColor, minWidth:60, textAlign:"right", animation:timeLeft<=10?"blink 0.5s step-end infinite":"none", transition:"color 0.5s" }}>{formatTime(timeLeft)}</div>
        </div>
        <div style={{ width:"100%", maxWidth:580, marginBottom:16 }}>{done.map((r,i)=><RoundSummary key={i} r={r} i={i}/>)}</div>
        <div style={{ fontSize:18, letterSpacing:4, color:"#c4941f", marginBottom:6, textAlign:"center", fontWeight:700 }}>ANAGRAM</div>
        <div style={{ fontSize:18, color:"#000000", fontStyle:"italic", marginBottom:16, textAlign:"center", maxWidth:400, lineHeight:1.6, fontWeight:800, fontFamily:"'Nunito',sans-serif" }}>{puzzle.anagram.clue}</div>
        <div style={{ fontSize:11, color:"#c4941f", letterSpacing:2, marginBottom:16, textAlign:"center", fontWeight:700 }}>↓ TAP A LETTER TO PLACE IT</div>
        <div style={{ display:"flex", gap:8, justifyContent:"center", marginBottom:8, flexWrap:"nowrap", width:"100%", maxWidth:500 }}>
          {puzzle.anagram.letters.map((l,i) => {
            const used = anUsed.includes(i);
            return (
              <div key={i} onClick={()=>tapAnagramLetter(l,i)} style={{ width:tileSz, height:tileSz, border:`2px solid ${used?"#dddddd":"#c4941f"}`, borderRadius:6, display:"flex", alignItems:"center", justifyContent:"center", fontSize:tileFs, fontWeight:700, color:used?"#cccccc":"#c4941f", fontFamily:"'Courier New',monospace", background:used?"#f0f0f0":"#fffbf0", cursor:used?"default":"pointer", transition:"all 0.15s", flexShrink:0, animation:used?"":`tileGlow 2s ease-in-out ${i*0.15}s infinite` }}>
                {used?"":l}
              </div>
            );
          })}
        </div>
        <div style={{ fontSize:11, color:"#888888", letterSpacing:2, marginBottom:8, textAlign:"center" }}>↑ TAP A FILLED SLOT TO REMOVE IT</div>
        <div style={{ animation:anShake?"shake 0.4s ease":"none", marginBottom:16 }}>
          <div style={{ display:"flex", gap:8, justifyContent:"center", flexWrap:"nowrap" }}>
            {Array(ansLen).fill(0).map((_,i) => {
              const letter=anSlots[i]||""; const filled=!!letter;
              return (
                <div key={i} onClick={()=>filled&&clearAnagramSlot(i)} style={{ width:slotSz, height:slotSz, border:`2px solid ${anWrong?"#c62828":filled?"#c4941f":"#cccccc"}`, borderRadius:6, display:"flex", alignItems:"center", justifyContent:"center", fontSize:slotFs, fontWeight:700, color:filled?"#c4941f":"transparent", fontFamily:"'Courier New',monospace", background:"#ffffff", cursor:filled?"pointer":"default", transition:"all 0.15s", flexShrink:0 }}>
                  {filled?letter:""}
                </div>
              );
            })}
          </div>
          {anWrong&&<div style={{ color:"#c62828", fontSize:11, letterSpacing:1, textAlign:"center", marginTop:10 }}>NOT QUITE — TAP A LETTER TO REMOVE IT</div>}
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <button onClick={clearAllAnagram} style={{ background:"transparent", border:"1px solid #cccccc", color:"#888888", borderRadius:6, padding:"10px 20px", fontSize:11, fontWeight:700, letterSpacing:2, cursor:"pointer", fontFamily:"'Courier New',monospace" }}>CLEAR</button>
          <button onClick={submitAnagram} disabled={!isComplete} style={{ background:isComplete?"rgba(196,148,31,0.15)":"transparent", border:`2px solid ${isComplete?"#c4941f":"#cccccc"}`, color:isComplete?"#c4941f":"#888888", borderRadius:6, padding:"10px 28px", fontSize:11, fontWeight:700, letterSpacing:3, cursor:isComplete?"pointer":"default", fontFamily:"'Courier New',monospace", transition:"all 0.2s" }}>CONFIRM</button>
        </div>
        <Analytics />
      </div>
    );
  }

  // ── PLAYING ───────────────────────────────────────────────────────────────
  const latestIdx = attempts.length-1;
  return (
    <div style={{ minHeight:"100vh", background:"#fafaf8", fontFamily:"'Courier New',monospace", color:"#111111", display:"flex", flexDirection:"column", alignItems:"center", padding:"0 16px 40px", overflowX:"hidden" }}>
      <style>{CSS}</style>
      <div style={{ width:"100%", maxWidth:580, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 0 12px", borderBottom:"1px solid #e0e0e0", marginBottom:14 }}>
        <div style={{ fontSize:20, letterSpacing:1, color:"#666666", minWidth:60, fontWeight:800 }}>Q{roundIdx+1}/5</div>
        <h1 style={{ fontSize:40, letterSpacing:8, color:"#c4941f", fontFamily:"'Bebas Neue',sans-serif", animation:"flicker 8s infinite", lineHeight:1 }}>5 TO 9</h1>
        <div style={{ minWidth:60 }}></div>
      </div>

      <div style={{ display:"flex", gap:6, marginBottom:16, alignItems:"center" }}>
        {puzzle.rounds.map((_,i)=><div key={i} style={{ height:3, borderRadius:2, transition:"all 0.4s ease", width:i<roundIdx?32:i===roundIdx?24:16, background:i<roundIdx?"#2e7d32":i===roundIdx?"#c4941f":"#e0e0e0" }} />)}
      </div>

      <div style={{ width:"100%", maxWidth:580 }}>
        {done.length>0&&<div style={{ marginBottom:12 }}>{done.map((r,i)=><RoundSummary key={i} r={r} i={i}/>)}</div>}

        <div style={{ border:"1px solid #e0e0e0", borderRadius:8, padding:"14px 18px", marginBottom:16, background:"#ffffff" }}>
          <div style={{ fontSize:15, letterSpacing:2, color:"#c4941f", marginBottom:10, fontWeight:900, fontFamily:"'Nunito',sans-serif" }}>QUESTION {roundIdx+1} · {alen} LETTERS</div>
          <div style={{ fontSize:22, color:"#000000", lineHeight:1.5, fontWeight:900, fontFamily:"'Nunito',sans-serif" }}>{round.clue}</div>
        </div>

        <div style={{ marginBottom:8 }}>
          {attempts.map((a,i)=>(
            <TypewriterRow key={`r${roundIdx}-a${i}`} word={a.word} answer={round.answer} correct={a.correct} animate={i===latestIdx&&animating} onDone={i===latestIdx?onRevealDone:undefined} />
          ))}
        </div>

        {canInput&&<div style={{ marginBottom:12 }}><AnswerDisplay length={alen} revealed={revealed} input={input} shake={shake} /></div>}

        <div style={{ display:"flex", justifyContent:"center", marginBottom:20, gap:24, alignItems:"center" }}>
          <button onClick={takeHint} disabled={!canInput} style={{ background:canInput?"rgba(196,148,31,0.1)":"transparent", border:`2px solid ${canInput?"#c4941f":"#e0e0e0"}`, color:canInput?"#c4941f":"#cccccc", borderRadius:6, padding:"10px 24px", fontSize:11, fontWeight:700, letterSpacing:2, cursor:canInput?"pointer":"default", fontFamily:"'Courier New',monospace", position:"relative" }}>
            HINT −{HINT_PENALTY}s
            {penalty&&<span style={{ position:"absolute", top:-20, left:"50%", transform:"translateX(-50%)", fontSize:13, color:"#c62828", fontWeight:700, animation:"penalty 1.2s ease forwards", whiteSpace:"nowrap" }}>{penalty}</span>}
          </button>
          <div style={{ fontSize:22, fontWeight:800, fontFamily:"'Courier New',monospace", color:timerColor, animation:timeLeft<=10?"blink 0.5s step-end infinite":"none", transition:"color 0.5s", minWidth:60 }}>
            {formatTime(timeLeft)}
          </div>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:5, alignItems:"center" }}>
          {["QWERTYUIOP","ASDFGHJKL","ZXCVBNM"].map((row,ri)=>(
            <div key={ri} style={{ display:"flex", gap:4, width:"100%", justifyContent:"center" }}>
              {ri===2&&<button onClick={submit} style={{ flex:"0 0 auto", minWidth:68, height:50, border:"2px solid #9a7000", borderRadius:8, background:"#b8860b", color:"#ffffff", fontSize:12, fontWeight:800, letterSpacing:1, cursor:"pointer", fontFamily:"'Courier New',monospace", touchAction:"manipulation", boxShadow:"0 4px 16px rgba(184,134,11,0.5)" }}>ENTER</button>}
              {row.split("").map(k=>(
                <button key={k} onClick={()=>pressKey(k)} style={{ flex:"1 1 0", maxWidth:38, minWidth:28, height:50, borderRadius:6, border:"2px solid #c0b896", background:"#e8e2d6", color:"#000000", fontSize:16, fontWeight:900, cursor:"pointer", fontFamily:"'Courier New',monospace", touchAction:"manipulation" }}>{k}</button>
              ))}
              {ri===2&&<button onClick={()=>pressKey("DEL")} style={{ flex:"0 0 auto", minWidth:68, height:50, border:"2px solid #c0b896", borderRadius:8, background:"#e8e2d6", color:"#000000", fontSize:18, cursor:"pointer", touchAction:"manipulation" }}>⌫</button>}
            </div>
          ))}
        </div>
      </div>
      <Analytics />
    </div>
  );
}
