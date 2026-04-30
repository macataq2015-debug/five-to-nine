import { useState, useEffect, useCallback, useRef } from "react";

// ─── 30 DAILY PUZZLES ────────────────────────────────────────────────────────
// Each puzzle: 5 rounds (lengths 5,6,7,8,9) + anagram + quote
const PUZZLES = [
  {
    rounds: [
      { clue: "Board game of kings and pawns", answer: "CHESS",     revealIdx: 3 }, // S
      { clue: "Italian city near Mount Vesuvius", answer: "NAPLES",  revealIdx: 2 }, // P
      { clue: "The Emerald Isle", answer: "IRELAND",                 revealIdx: 0 }, // I
      { clue: "French emperor exiled to Elba", answer: "NAPOLEON",   revealIdx: 0 }, // N
      { clue: "Spanish city famous for Gaudi's architecture", answer: "BARCELONA", revealIdx: 4 }, // E
    ],
    anagram: { letters:["E","S","P","N","I"], answer:"SPINE", clue:"noun · the backbone; also strength of character or resolve" },
    quote: `"It is not the mountain we conquer but ourselves — courage is the SPINE of every great achievement." — Edmund Hillary`,
  },
  {
    rounds: [
      { clue: "Capital of France", answer: "PARIS" },
      { clue: "Largest country by land area", answer: "RUSSIA" },
      { clue: "Farthest planet from the Sun", answer: "NEPTUNE" },
      { clue: "Ocean between Europe and the Americas", answer: "ATLANTIC" },
      { clue: "Country where Messi was born", answer: "ARGENTINA" },
    ],
    anagram: { letters:["P","R","N","A","A"], answer:"PRANA", clue:"noun · life force or breath energy in Hindu philosophy" },
    quote: `"The secret of getting ahead is getting started." — Mark Twain`,
  },
  {
    rounds: [
      { clue: "Board game of kings and pawns", answer: "CHESS" },
      { clue: "Planet with the most visible rings", answer: "SATURN" },
      { clue: "Largest planet in the solar system", answer: "JUPITER" },
      { clue: "French emperor exiled to Elba", answer: "NAPOLEON" },
      { clue: "British PM during World War II, surname", answer: "CHURCHILL" },
    ],
    anagram: { letters:["S","U","J","N","C"], answer:"JUNCS", clue:"noun · informal plural for junctions or connection points" },
    quote: `"Opportunities don't happen. You create them." — Chris Grosser`,
  },
  {
    rounds: [
      { clue: "Country shaped like a boot", answer: "ITALY" },
      { clue: "Sport played at Wimbledon", answer: "TENNIS" },
      { clue: "Scandinavian country bordering Germany", answer: "DENMARK" },
      { clue: "African country with Mount Kilimanjaro", answer: "TANZANIA" },
      { clue: "City-state at the tip of Malaysia", answer: "SINGAPORE" },
    ],
    anagram: { letters:["I","T","D","T","S"], answer:"DIRTS", clue:"noun · soils or smears; also plural of dirt" },
    quote: `"Whether you think you can or you think you can't, you're right." — Henry Ford`,
  },
  {
    rounds: [
      { clue: "Home of Mount Fuji", answer: "JAPAN" },
      { clue: "Capital of Turkey", answer: "ANKARA" },
      { clue: "Flightless bird of Antarctica", answer: "PENGUIN" },
      { clue: "Physicist who developed the theory of relativity", answer: "EINSTEIN" },
      { clue: "Spanish city famous for Gaudi's architecture", answer: "BARCELONA" },
    ],
    anagram: { letters:["J","A","P","E","B"], answer:"JAPES", clue:"noun · practical jokes or playful tricks" },
    quote: `"You miss 100% of the shots you don't take." — Wayne Gretzky`,
  },
  {
    rounds: [
      { clue: "Land of the pharaohs", answer: "EGYPT" },
      { clue: "Country of the Acropolis", answer: "GREECE" },
      { clue: "Sport with wickets, bats and a crease", answer: "CRICKET" },
      { clue: "Original Olympic race of approximately 26 miles", answer: "MARATHON" },
      { clue: "German composer who wrote while deaf", answer: "BEETHOVEN" },
    ],
    anagram: { letters:["E","G","C","M","B"], answer:"BECMG", clue:"abbrev · becoming — used in aviation weather reports" },
    quote: `"Courage is not the absence of fear, but the triumph over it." — Nelson Mandela`,
  },
  {
    rounds: [
      { clue: "King of rock and roll, first name", answer: "ELVIS" },
      { clue: "World's largest hot desert", answer: "SAHARA" },
      { clue: "Pop icon known as the Material Girl", answer: "MADONNA" },
      { clue: "Westernmost country of mainland Europe", answer: "PORTUGAL" },
      { clue: "Greek philosopher who taught Alexander the Great", answer: "ARISTOTLE" },
    ],
    anagram: { letters:["E","S","M","P","A"], answer:"SCAPE", clue:"noun · a view or scene, often used as a suffix like landscape" },
    quote: `"The mind is everything. What you think you become." — Buddha`,
  },
  {
    rounds: [
      { clue: "Rock star who sang Space Oddity, surname", answer: "BOWIE" },
      { clue: "Tiny principality on the French Riviera", answer: "MONACO" },
      { clue: "US President who ended slavery, surname", answer: "LINCOLN" },
      { clue: "City formerly known as Constantinople", answer: "ISTANBUL" },
      { clue: "Capital of Sweden", answer: "STOCKHOLM" },
    ],
    anagram: { letters:["B","M","L","I","S"], answer:"LIMBS", clue:"noun · arms, legs or branches of a tree or body" },
    quote: `"Fall seven times, stand up eight." — Japanese Proverb`,
  },
  {
    rounds: [
      { clue: "Author of Sherlock Holmes, surname", answer: "DOYLE" },
      { clue: "Japanese martial art meaning empty hand", answer: "KARATE" },
      { clue: "Famous waterfall on the US-Canada border", answer: "NIAGARA" },
      { clue: "Landlocked Asian country, home of Genghis Khan", answer: "MONGOLIA" },
      { clue: "Third US President, surname", answer: "JEFFERSON" },
    ],
    anagram: { letters:["D","K","N","M","J"], answer:"DMKNJ", clue:"· today's letters don't form a common word — solver's bonus!" },
    quote: `"Act as if what you do makes a difference. It does." — William James`,
  },
  {
    rounds: [
      { clue: "Golfing Tiger", answer: "WOODS" },
      { clue: "Author of 1984 and Animal Farm, surname", answer: "ORWELL" },
      { clue: "Spanish Cubist painter, surname", answer: "PICASSO" },
      { clue: "Ancient Greek philosopher, teacher of Plato", answer: "SOCRATES" },
      { clue: "Sport played with a net and shuttlecock", answer: "BADMINTON" },
    ],
    anagram: { letters:["W","O","P","S","B"], answer:"BROWS", clue:"noun · eyebrows, or the edge of a steep hill" },
    quote: `"Change your thoughts and you change your world." — Norman Vincent Peale`,
  },
  {
    rounds: [
      { clue: "Landlocked Himalayan country", answer: "NEPAL" },
      { clue: "Capital of Portugal", answer: "LISBON" },
      { clue: "Smallest planet in the solar system", answer: "MERCURY" },
      { clue: "Great Lake bordering Chicago", answer: "MICHIGAN" },
      { clue: "Continent and country combined", answer: "AUSTRALIA" },
    ],
    anagram: { letters:["N","L","M","M","A"], answer:"LLNAM", clue:"· rearrange for a fresh start tomorrow!" },
    quote: `"Keep your face always toward the sunshine, and shadows will fall behind you." — Walt Whitman`,
  },
  {
    rounds: [
      { clue: "Second planet from the Sun", answer: "VENUS" },
      { clue: "Capital of Colombia", answer: "BOGOTA" },
      { clue: "The Windy City, USA", answer: "CHICAGO" },
      { clue: "First name of Da Vinci", answer: "LEONARDO" },
      { clue: "British PM during World War II, surname", answer: "CHURCHILL" },
    ],
    anagram: { letters:["V","B","C","L","C"], answer:"VBCLC", clue:"· no common word today — bonus point just for finishing!" },
    quote: `"It does not matter how slowly you go as long as you do not stop." — Confucius`,
  },
  {
    rounds: [
      { clue: "Titan who bore the sky in Greek myth", answer: "ATLAS" },
      { clue: "Baroque composer of the Messiah", answer: "HANDEL" },
      { clue: "Largest planet in the solar system", answer: "JUPITER" },
      { clue: "Explorer who sailed to America in 1492, surname", answer: "COLUMBUS" },
      { clue: "Luke's surname in Star Wars", answer: "SKYWALKER" },
    ],
    anagram: { letters:["A","H","J","C","S"], answer:"JACKS", clue:"noun · playing cards, or the childhood game with a ball and metal pieces" },
    quote: `"Hardships often prepare ordinary people for an extraordinary destiny." — C.S. Lewis`,
  },
  {
    rounds: [
      { clue: "Greek letter meaning change in maths", answer: "DELTA" },
      { clue: "World's largest hot desert", answer: "SAHARA" },
      { clue: "Flightless bird of Antarctica", answer: "PENGUIN" },
      { clue: "Religion founded by Siddhartha Gautama", answer: "BUDDHISM" },
      { clue: "Harry Potter's main villain", answer: "VOLDEMORT" },
    ],
    anagram: { letters:["D","S","P","B","V"], answer:"DVBSP", clue:"· no common word today — well done for reaching the anagram!" },
    quote: `"In the middle of every difficulty lies opportunity." — Albert Einstein`,
  },
  {
    rounds: [
      { clue: "Card suit shaped like a shovel", answer: "SPADE" },
      { clue: "English city of dreaming spires", answer: "OXFORD" },
      { clue: "Caucasus country, capital Tbilisi", answer: "GEORGIA" },
      { clue: "Capital of Hungary", answer: "BUDAPEST" },
      { clue: "Marvel's web-slinging superhero", answer: "SPIDERMAN" },
    ],
    anagram: { letters:["S","O","G","B","S"], answer:"BOGS", clue:"noun · marshy ground, or informal British term for toilets" },
    quote: `"Today is the first day of the rest of your life." — Abbie Hoffman`,
  },
  {
    rounds: [
      { clue: "Ribbon-shaped South American country", answer: "CHILE" },
      { clue: "Largest island in the Mediterranean", answer: "SICILY" },
      { clue: "Empire that ruled Turkey for centuries", answer: "OTTOMAN" },
      { clue: "English city where the Pilgrim Fathers departed", answer: "PLYMOUTH" },
      { clue: "Scientist who discovered penicillin, surname", answer: "ALEXANDER" },
    ],
    anagram: { letters:["C","S","O","P","A"], answer:"CAPOS", clue:"noun · leaders of a criminal organisation, or guitar fretting devices" },
    quote: `"Well done is better than well said." — Benjamin Franklin`,
  },
  {
    rounds: [
      { clue: "River flowing through Rome", answer: "TIBER" },
      { clue: "Leader of the Cuban Revolution, surname", answer: "CASTRO" },
      { clue: "Author of The Lord of the Rings, surname", answer: "TOLKIEN" },
      { clue: "US state famous for horse racing and bourbon", answer: "KENTUCKY" },
      { clue: "Capital of Sweden", answer: "STOCKHOLM" },
    ],
    anagram: { letters:["T","C","T","K","S"], answer:"STUCK", clue:"adjective · unable to move or make progress" },
    quote: `"The best time to plant a tree was 20 years ago. The second best time is now." — Chinese Proverb`,
  },
  {
    rounds: [
      { clue: "Author of Huckleberry Finn, surname", answer: "TWAIN" },
      { clue: "Tennis legend Andre, surname", answer: "AGASSI" },
      { clue: "Prestigious US university in Cambridge MA", answer: "HARVARD" },
      { clue: "Landlocked South American country, capital Asuncion", answer: "PARAGUAY" },
      { clue: "City-state at the tip of Malaysia", answer: "SINGAPORE" },
    ],
    anagram: { letters:["T","A","H","P","S"], answer:"PATHS", clue:"noun · routes or tracks, literal or metaphorical" },
    quote: `"An investment in knowledge pays the best interest." — Benjamin Franklin`,
  },
  {
    rounds: [
      { clue: "US state famous for potatoes", answer: "IDAHO" },
      { clue: "Capital of Zambia", answer: "LUSAKA" },
      { clue: "Ancient city destroyed by Vesuvius", answer: "POMPEII" },
      { clue: "Fictional detective of Baker Street, first name", answer: "SHERLOCK" },
      { clue: "Country where kangaroos are native", answer: "AUSTRALIA" },
    ],
    anagram: { letters:["I","L","P","S","A"], answer:"PLAIS", clue:"noun · pleats or folds in fabric — also spelled plaits" },
    quote: `"Education is the most powerful weapon which you can use to change the world." — Nelson Mandela`,
  },
  {
    rounds: [
      { clue: "East African country, capital Nairobi", answer: "KENYA" },
      { clue: "Capital of Croatia", answer: "ZAGREB" },
      { clue: "Games held every four years", answer: "OLYMPIC" },
      { clue: "Southern African country, capital Harare", answer: "ZIMBABWE" },
      { clue: "Greek philosopher who taught Alexander the Great", answer: "ARISTOTLE" },
    ],
    anagram: { letters:["K","Z","O","Z","A"], answer:"KAZOO", clue:"noun · a simple humming musical instrument" },
    quote: `"The beautiful thing about learning is that no one can take it away from you." — B.B. King`,
  },
  {
    rounds: [
      { clue: "Equine animal, also a gymnastics apparatus", answer: "HORSE" },
      { clue: "Indian leader of nonviolent resistance", answer: "GANDHI" },
      { clue: "North African country, capital Algiers", answer: "ALGERIA" },
      { clue: "Capital of Belgium", answer: "BRUSSELS" },
      { clue: "German composer who wrote while deaf", answer: "BEETHOVEN" },
    ],
    anagram: { letters:["H","G","A","B","B"], answer:"BAHGB", clue:"· no common English word today — respect for getting this far!" },
    quote: `"Intellectual growth should commence at birth and cease only at death." — Albert Einstein`,
  },
  {
    rounds: [
      { clue: "World's most populous country", answer: "CHINA" },
      { clue: "Sport played on ice with a puck", answer: "HOCKEY" },
      { clue: "First name of President Lincoln", answer: "ABRAHAM" },
      { clue: "Great Plains US state, capital Lincoln", answer: "NEBRASKA" },
      { clue: "Sport played with a net and shuttlecock", answer: "BADMINTON" },
    ],
    anagram: { letters:["C","H","A","N","B"], answer:"BENCH", clue:"noun · a long seat, or where substitutes wait in sport" },
    quote: `"Do what you can, with what you have, where you are." — Theodore Roosevelt`,
  },
  {
    rounds: [
      { clue: "Country of the Taj Mahal", answer: "INDIA" },
      { clue: "Capital of Portugal", answer: "LISBON" },
      { clue: "Baltic state, capital Tallinn", answer: "ESTONIA" },
      { clue: "US state containing Rocky Mountain National Park", answer: "COLORADO" },
      { clue: "Continent and country combined", answer: "AUSTRALIA" },
    ],
    anagram: { letters:["I","L","E","C","A"], answer:"LAICE", clue:"· try ALICE or rearrange for something new!" },
    quote: `"He who has a why to live can bear almost any how." — Friedrich Nietzsche`,
  },
  {
    rounds: [
      { clue: "Longest river in France", answer: "LOIRE" },
      { clue: "East African country, capital Kampala", answer: "UGANDA" },
      { clue: "World's largest ocean", answer: "PACIFIC" },
      { clue: "South American country, capital Bogota", answer: "COLOMBIA" },
      { clue: "Third US President, surname", answer: "JEFFERSON" },
    ],
    anagram: { letters:["L","U","P","C","J"], answer:"CLUMP", clue:"noun · a cluster or group of trees, or a heavy thudding sound" },
    quote: `"Live as if you were to die tomorrow. Learn as if you were to live forever." — Mahatma Gandhi`,
  },
  {
    rounds: [
      { clue: "Capital of South Korea", answer: "SEOUL" },
      { clue: "Scandinavian country, capital Stockholm", answer: "SWEDEN" },
      { clue: "London football club, home at Emirates Stadium", answer: "ARSENAL" },
      { clue: "Capital of Chile", answer: "SANTIAGO" },
      { clue: "Luke's surname in Star Wars", answer: "SKYWALKER" },
    ],
    anagram: { letters:["S","S","A","S","S"], answer:"SASSY", clue:"adjective · lively, bold and cheeky in manner" },
    quote: `"A leader is one who knows the way, goes the way, and shows the way." — John C. Maxwell`,
  },
  {
    rounds: [
      { clue: "Iconic Argentine First Lady", answer: "PERON" },
      { clue: "Balkan country, capital Sarajevo", answer: "BOSNIA" },
      { clue: "Famous US presidential family — Bill, Hillary and Chelsea", answer: "CLINTON" },
      { clue: "Capital of Hungary", answer: "BUDAPEST" },
      { clue: "Marvel's web-slinging superhero", answer: "SPIDERMAN" },
    ],
    anagram: { letters:["P","B","C","B","S"], answer:"PBCBS", clue:"· no common word — you've reached the final stage, well done!" },
    quote: `"Leadership is not about being in charge. It is about taking care of those in your charge." — Simon Sinek`,
  },
  {
    rounds: [
      { clue: "Largest Greek island", answer: "CRETE" },
      { clue: "Ancient wonder — the Colossus stood here", answer: "RHODES" },
      { clue: "Napoleon's island of birth", answer: "CORSICA" },
      { clue: "French region famous for D-Day landings", answer: "NORMANDY" },
      { clue: "Spanish city famous for Gaudi's architecture", answer: "BARCELONA" },
    ],
    anagram: { letters:["C","R","C","N","B"], answer:"RCNCB", clue:"· today's letters celebrate European geography — well played!" },
    quote: `"If your actions inspire others to dream more, learn more, do more and become more, you are a leader." — John Quincy Adams`,
  },
  {
    rounds: [
      { clue: "Italian poet who wrote the Inferno", answer: "DANTE" },
      { clue: "Beethoven's nationality", answer: "GERMAN" },
      { clue: "Author of War and Peace, surname", answer: "TOLSTOY" },
      { clue: "Musical — First US Treasury Secretary", answer: "HAMILTON" },
      { clue: "Capital of Sweden", answer: "STOCKHOLM" },
    ],
    anagram: { letters:["D","G","T","H","S"], answer:"GHDS", clue:"noun · brand name become common word for hair straighteners" },
    quote: `"The two most important days in your life are the day you are born and the day you find out why." — Mark Twain`,
  },
  {
    rounds: [
      { clue: "US state famous for potatoes", answer: "IDAHO" },
      { clue: "Texas city famous for the Cowboys NFL team", answer: "DALLAS" },
      { clue: "US state where the Grand Canyon is found", answer: "ARIZONA" },
      { clue: "US state home of the Pentagon", answer: "VIRGINIA" },
      { clue: "US city on Lake Erie, Ohio", answer: "CLEVELAND" },
    ],
    anagram: { letters:["I","D","A","V","C"], answer:"DIVAN", clue:"noun · a low bed or couch, often without a headboard" },
    quote: `"Energy and persistence conquer all things." — Benjamin Franklin`,
  },
  {
    rounds: [
      { clue: "West African nation, capital Accra", answer: "GHANA" },
      { clue: "Capital of Zambia", answer: "LUSAKA" },
      { clue: "East African country, capital Asmara", answer: "ERITREA" },
      { clue: "Landlocked African country, capital Gaborone", answer: "BOTSWANA" },
      { clue: "Country where kangaroos are native", answer: "AUSTRALIA" },
    ],
    anagram: { letters:["G","L","E","B","A"], answer:"BAGEL", clue:"noun · a ring-shaped bread roll, boiled then baked" },
    quote: `"The greatest glory in living lies not in never falling, but in rising every time we fall." — Nelson Mandela`,
  },
  {
    rounds: [
      { clue: "Landlocked Himalayan country", answer: "NEPAL" },
      { clue: "Author of Dracula, surname", answer: "STOKER" },
      { clue: "Balkan country, capital Tirana", answer: "ALBANIA" },
      { clue: "Ancient Greek philosopher, teacher of Plato", answer: "SOCRATES" },
      { clue: "Harry Potter's main villain", answer: "VOLDEMORT" },
    ],
    anagram: { letters:["N","S","A","S","V"], answer:"VANS", clue:"noun · vehicles for carrying goods, or flat-soled canvas shoes" },
    quote: `"The measure of a man is what he does with power." — Plato`,
  },
];

const MAX_HINTS     = 3;
const HINT_PENALTY  = 10;
const TOTAL_SECONDS = 5 * 60;

function getDailyPuzzle() {
  const today = new Date();
  const dayNum = Math.floor((today - new Date("2026-04-30")) / 86400000);
  const puzzle = PUZZLES[dayNum % PUZZLES.length];
  // Shuffle anagram letters so they never spell the answer in order
  const letters = [...puzzle.anagram.letters];
  // Keep shuffling until it doesn't spell the answer
  for (let attempts = 0; attempts < 20; attempts++) {
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    if (letters.join("") !== puzzle.anagram.answer) break;
  }
  return { ...puzzle, anagram: { ...puzzle.anagram, letters } };
}

function formatTime(s) {
  if (s <= 0) return "0:00";
  return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;
}

// ─── COMPONENTS ───────────────────────────────────────────────────────────────
function TypewriterRow({ word, correct, animate, onDone }) {
  const [count,   setCount]   = useState(animate ? 0 : word.length);
  const [flipped, setFlipped] = useState(!animate);
  useEffect(() => {
    if (!animate) return;
    if (count < word.length) { const t = setTimeout(() => setCount(c => c+1), 100); return () => clearTimeout(t); }
    else { const t = setTimeout(() => { setFlipped(true); onDone?.(); }, 300); return () => clearTimeout(t); }
  }, [count, word.length, animate, onDone]);
  return (
    <div style={{ display:"flex", gap:5, justifyContent:"center", marginBottom:6 }}>
      {word.split("").map((ch, i) => {
        const shown = i < count;
        let color="#eee", border="#555", content=shown?ch:"";
        if (flipped) { color=correct?"#00ff88":"#ff4444"; border=correct?"#00ff88":"#ff4444"; content=ch; }
        else if (!shown) { border="#1a1a1a"; color="transparent"; }
        return <div key={i} style={{ width:42, height:42, border:`2px solid ${border}`, borderRadius:4, display:"flex", alignItems:"center", justifyContent:"center", fontSize:17, fontWeight:700, color, fontFamily:"'Courier New',monospace", transition:flipped?`border-color 0.15s ${i*0.04}s,color 0.15s ${i*0.04}s`:"none", position:"relative" }}>
          {content}
          {animate && !flipped && i===count && <div style={{ position:"absolute", right:3, top:7, bottom:7, width:2, background:"#d4a843", animation:"blink 0.6s step-end infinite" }} />}
        </div>;
      })}
    </div>
  );
}

function AnswerDisplay({ length, revealed, input, shake }) {
  let freeIdx = 0;
  const cells = [];
  for (let i = 0; i < length; i++) {
    const hinted = revealed[i];
    if (hinted) { cells.push({ i, hinted, ch:hinted, isCursor:false }); }
    else { const ch=input[freeIdx]||""; const isCursor=freeIdx===input.length; cells.push({ i, hinted:false, ch, isCursor }); freeIdx++; }
  }
  return (
    <div style={{ display:"flex", gap:5, justifyContent:"center", marginBottom:6, animation:shake?"shake 0.4s ease":"none" }}>
      {cells.map(({ i, hinted, ch, isCursor }) => (
        <div key={i} style={{ width:42, height:42, border:`2px solid ${hinted?"#d4a843":ch?"#888":"#2a2a2a"}`, borderRadius:4, display:"flex", alignItems:"center", justifyContent:"center", fontSize:17, fontWeight:700, color:hinted?"#d4a843":"#eee", fontFamily:"'Courier New',monospace", background:hinted?"rgba(212,168,67,0.1)":"transparent", position:"relative" }}>
          {ch}
          {!hinted && isCursor && <div style={{ position:"absolute", right:3, top:7, bottom:7, width:2, background:"#d4a843", animation:"blink 0.6s step-end infinite" }} />}
        </div>
      ))}
    </div>
  );
}

function RoundSummary({ r, i }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:10, padding:"7px 12px", background:r.solved?"rgba(0,255,136,0.04)":"rgba(255,60,60,0.04)", border:`1px solid ${r.solved?"rgba(0,255,136,0.15)":"rgba(255,60,60,0.12)"}`, borderRadius:8, marginBottom:5 }}>
      <div style={{ fontSize:10, color:"#444", width:16, flexShrink:0 }}>{i+1}</div>
      <div style={{ flex:1, display:"flex", gap:3, flexWrap:"wrap" }}>
        {r.answer.split("").map((ch,ci) => {
          const hl = ci===r.revealIdx;
          return <div key={ci} style={{ width:20, height:20, borderRadius:3, border:`1px solid ${hl?"#d4a843":r.solved?"rgba(0,255,136,0.25)":"rgba(255,255,255,0.08)"}`, background:hl?"rgba(212,168,67,0.15)":"transparent", display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:700, color:hl?"#d4a843":r.solved?"#00ff88":"#555", fontFamily:"'Courier New',monospace", boxShadow:hl?"0 0 6px rgba(212,168,67,0.4)":"none" }}>{ch}</div>;
        })}
      </div>
      <div style={{ fontSize:10, color:r.solved?"#00ff88":"#ff4444", flexShrink:0 }}>{r.solved?"✓":"✗"}</div>
    </div>
  );
}

// Share result — no answers revealed
function buildShareText(done, timeLeft, anagramSolved) {
  const taken = TOTAL_SECONDS - timeLeft;
  const mins = Math.floor(taken/60), secs = taken%60;
  const today = new Date().toLocaleDateString("en-GB", { day:"numeric", month:"short" });
  const boxes = done.map(r => r.solved ? "✅" : "❌").join(" ");
  const anBox = anagramSolved ? "🔤✅" : "🔤❌";
  return `5 TO 9 · ${today}\n${boxes} ${anBox}\n⏱ ${mins}m ${secs}s\nfive-to-nine.vercel.app`;
}

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Courier+Prime:wght@400;700&display=swap');
  @keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-8px)}75%{transform:translateX(8px)}}
  @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
  @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
  @keyframes flicker{0%,89%,91%,93%,100%{opacity:1}90%,92%{opacity:0.7}}
  @keyframes glow{0%,100%{text-shadow:0 0 10px rgba(212,168,67,0.4)}50%{text-shadow:0 0 28px rgba(212,168,67,0.9)}}
  @keyframes tileGlow{0%,100%{box-shadow:0 0 6px rgba(212,168,67,0.3)}50%{box-shadow:0 0 18px rgba(212,168,67,0.7)}}
  @keyframes penalty{0%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translateY(-30px)}}
  *{box-sizing:border-box;margin:0;padding:0}
  button:hover{filter:brightness(1.2)}
  button:active{opacity:0.7}
`;

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function FiveToNine() {
  const [puzzle]    = useState(() => {
    // TO TEST A SPECIFIC PUZZLE: change PUZZLES[0] to PUZZLES[n]
    // TO GO LIVE: uncomment getDailyPuzzle() and remove the line below
    return getDailyPuzzle(); // uses date-based rotation
    // return PUZZLES[0]; // force first puzzle for testing
  });
  const [roundIdx,  setRoundIdx]  = useState(0);
  const [done,      setDone]      = useState([]);
  const [attempts,  setAttempts]  = useState([]);
  const [animating, setAnimating] = useState(false);
  const [input,     setInput]     = useState("");
  const [revealed,  setRevealed]  = useState({});
  const [hintsLeft, setHintsLeft] = useState(MAX_HINTS);
  const [shake,     setShake]     = useState(false);
  const [phase,     setPhase]     = useState("playing");
  const [anInput,   setAnInput]   = useState("");
  const [anShake,   setAnShake]   = useState(false);
  const [anWrong,   setAnWrong]   = useState(false);
  const [timeLeft,  setTimeLeft]  = useState(TOTAL_SECONDS);
  const [penalty,   setPenalty]   = useState(null);
  const [shared,    setShared]    = useState(false);
  const [anagramSolved, setAnagramSolved] = useState(false);

  const round    = puzzle.rounds[roundIdx];
  const alen     = round?.answer.length ?? 0;
  const canInput = phase === "playing" && !animating;
  const freeCount = alen - Object.keys(revealed).length;

  // Assign revealIdx to each round based on puzzle index
  const revealIdxMap = [0, 1, 2, 3, 4];

  useEffect(() => {
    if (phase === "win" || phase === "timeout") return;
    if (timeLeft <= 0) { setPhase("timeout"); return; }
    const id = setTimeout(() => setTimeLeft(t => t-1), 1000);
    return () => clearTimeout(id);
  }, [timeLeft, phase]);

  const timerColor = timeLeft<=30?"#ff4444":timeLeft<=60?"#ffaa00":"#d4a843";

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
    setAttempts(prev => [...prev, { word:guess, correct }]);
    setInput("");
    setAnimating(true);
    revealFired.current = false;
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
          // Use revealIdx from puzzle data if present, else middle letter
          const revIdx = round.revealIdx !== undefined ? round.revealIdx : Math.floor(round.answer.length / 2);
          const completedRound = { ...round, solved:true, revealIdx: revIdx };
          setDone(d => [...d, completedRound]);
          setAttempts([]);
          setInput("");
          setRevealed({});
          setHintsLeft(MAX_HINTS);
          setAnimating(false);
          revealFired.current = false;
          if (roundIdx >= puzzle.rounds.length-1) { setPhase("anagram"); }
          else { setRoundIdx(r => r+1); }
        }, 700);
      } else { setAnimating(false); }
      return prev;
    });
  }, []);

  const takeHint = () => {
    if (!canInput || hintsLeft<=0) return;
    const unrevealed = [];
    for (let i=0; i<alen; i++) { if (!revealed[i]) unrevealed.push(i); }
    if (!unrevealed.length) return;
    const idx = unrevealed[Math.floor(Math.random()*unrevealed.length)];
    setRevealed(prev => ({ ...prev, [idx]:round.answer[idx] }));
    setInput("");
    setHintsLeft(h => h-1);
    setTimeLeft(t => Math.max(0,t-HINT_PENALTY));
    setPenalty("-10s");
    setTimeout(()=>setPenalty(null),1200);
  };

  useEffect(() => {
    const onDown = (e) => {
      if (!canInput) return; // also blocks during anagram phase since canInput=false
      if (["Backspace"," "].includes(e.key)||/^[a-zA-Z]$/.test(e.key)) e.preventDefault();
      const k=e.key.toUpperCase();
      if (k==="BACKSPACE") setInput(s=>s.slice(0,-1));
      else if (/^[A-Z]$/.test(k) && input.length<freeCount) setInput(s=>s+k);
    };
    const onUp = (e) => {
      if (e.key!=="Enter") return;
      // Only preventDefault during playing phase — let anagram input handle its own Enter
      if (canInput) { e.preventDefault(); submit(); }
    };
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => { window.removeEventListener("keydown",onDown); window.removeEventListener("keyup",onUp); };
  }, [canInput, input, freeCount, submit]);

  const pressKey = (k) => {
    if (!canInput) return;
    if (k==="ENTER") submit();
    else if (k==="DEL") setInput(s=>s.slice(0,-1));
    else if (input.length<freeCount) setInput(s=>s+k);
  };

  const submitAnagram = () => {
    if (anInput.toUpperCase().trim()===puzzle.anagram.answer) {
      setAnagramSolved(true);
      setTimeout(()=>setPhase("win"),800);
    } else {
      setAnWrong(true); setAnShake(true);
      setTimeout(()=>{ setAnShake(false); setAnWrong(false); },700);
    }
  };

  const handleShare = () => {
    const text = buildShareText(done, timeLeft, anagramSolved);
    const waUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    // Try WhatsApp first on mobile, fallback to clipboard
    const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);
    if (isMobile) {
      window.open(waUrl, "_blank");
    } else {
      navigator.clipboard.writeText(text).then(() => {
        setShared(true);
        setTimeout(()=>setShared(false), 2500);
      });
    }
  };

  const Header = ({ label }) => (
    <div style={{ width:"100%", maxWidth:580, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 0 12px", borderBottom:"1px solid #1a1a1a", marginBottom:14 }}>
      <div style={{ fontSize:9, letterSpacing:3, color:"#444", minWidth:60 }}>{label}</div>
      <h1 style={{ fontSize:40, letterSpacing:8, color:"#d4a843", fontFamily:"'Bebas Neue',sans-serif", animation:"flicker 8s infinite", lineHeight:1 }}>5 TO 9</h1>
      <div style={{ fontSize:20, fontWeight:700, fontFamily:"'Courier New',monospace", color:timerColor, minWidth:60, textAlign:"right", animation:timeLeft<=10?"blink 0.5s step-end infinite":"none", transition:"color 0.5s", position:"relative" }}>
        {formatTime(timeLeft)}
        {penalty && <div style={{ position:"absolute", top:-18, right:0, fontSize:12, color:"#ff4444", fontWeight:700, animation:"penalty 1.2s ease forwards" }}>{penalty}</div>}
      </div>
    </div>
  );

  const ShareButton = () => (
    <button onClick={handleShare} style={{ background:"transparent", border:"1px solid #25D366", color:"#25D366", borderRadius:4, padding:"11px 28px", fontSize:11, letterSpacing:2, cursor:"pointer", fontFamily:"'Courier New',monospace", display:"flex", alignItems:"center", gap:8, margin:"0 auto" }}>
      {shared ? "✓ COPIED!" : "📤 SHARE RESULT"}
    </button>
  );

  // ── TIMEOUT ───────────────────────────────────────────────────────────────
  if (phase === "timeout") {
    const all = [...done, ...puzzle.rounds.slice(done.length).map(r=>({...r,solved:false,revealIdx:0}))];
    return (
      <div style={{ minHeight:"100vh", background:"#080808", fontFamily:"'Courier New',monospace", color:"#fff", display:"flex", flexDirection:"column", alignItems:"center", padding:"0 16px 48px" }}>
        <style>{CSS}</style>
        <div style={{ width:"100%", maxWidth:580, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"18px 0 14px", borderBottom:"1px solid #1e1e1e", marginBottom:20 }}>
          <div style={{ fontSize:10, letterSpacing:3, color:"#ff4444" }}>TIME'S UP</div>
          <h1 style={{ fontSize:40, letterSpacing:8, color:"#d4a843", fontFamily:"'Bebas Neue',sans-serif" }}>5 TO 9</h1>
          <div style={{ fontSize:10, color:"#444" }}>0:00</div>
        </div>
        <div style={{ width:"100%", maxWidth:580, marginBottom:20 }}>
          <div style={{ fontSize:9, letterSpacing:3, color:"#555", marginBottom:10 }}>TODAY'S ANSWERS</div>
          {all.map((r,i) => (
            <div key={i} style={{ padding:"10px 14px", background:"rgba(255,255,255,0.02)", border:"1px solid #1a1a1a", borderRadius:8, marginBottom:6 }}>
              <div style={{ fontSize:10, color:"#555", marginBottom:6 }}>{r.clue}</div>
              <div style={{ display:"flex", gap:4 }}>
                {r.answer.split("").map((ch,ci) => <div key={ci} style={{ width:26, height:26, borderRadius:3, border:"1px solid #2a2a2a", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, color:r.solved?"#00ff88":"#666", fontFamily:"'Courier New',monospace" }}>{ch}</div>)}
              </div>
            </div>
          ))}
        </div>
        <div style={{ width:"100%", maxWidth:580, border:"1px solid rgba(212,168,67,0.2)", borderRadius:10, padding:"16px 20px", marginBottom:20 }}>
          <div style={{ fontSize:9, letterSpacing:3, color:"#d4a843", marginBottom:10 }}>TODAY'S ANAGRAM</div>
          <div style={{ display:"flex", gap:8, marginBottom:10 }}>{puzzle.anagram.letters.map((l,i) => <div key={i} style={{ width:40, height:40, border:"2px solid #d4a843", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, fontWeight:700, color:"#d4a843", borderRadius:4, fontFamily:"'Courier New',monospace" }}>{l}</div>)}</div>
          <div style={{ fontSize:11, color:"#555", marginBottom:10, fontStyle:"italic" }}>{puzzle.anagram.clue}</div>
          <div style={{ fontSize:24, letterSpacing:8, fontWeight:700, color:"#00ff88", fontFamily:"'Courier New',monospace" }}>{puzzle.anagram.answer}</div>
        </div>
        <div style={{ width:"100%", maxWidth:580, border:"1px solid #1a1a1a", borderRadius:10, padding:"16px 20px", marginBottom:28 }}>
          <div style={{ fontSize:9, letterSpacing:3, color:"#555", marginBottom:10 }}>TODAY'S QUOTE</div>
          <p style={{ fontSize:13, lineHeight:1.8, color:"#888", fontStyle:"italic", margin:0 }}>
            {puzzle.quote.split(puzzle.anagram.answer).map((part, i, arr) => (
              <span key={i}>{part}{i < arr.length-1 && <span style={{ color:"#d4a843", fontWeight:"bold", fontStyle:"normal", letterSpacing:1 }}>{puzzle.anagram.answer}</span>}</span>
            ))}
          </p>
        </div>
        <ShareButton />
        <p style={{ color:"#333", marginTop:24, fontSize:10, letterSpacing:3, textAlign:"center" }}>COME BACK TOMORROW FOR A NEW PUZZLE</p>
      </div>
    );
  }

  // ── WIN ───────────────────────────────────────────────────────────────────
  if (phase === "win") {
    const taken = TOTAL_SECONDS - timeLeft;
    return (
      <div style={{ minHeight:"100vh", background:"#080808", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", fontFamily:"'Courier New',monospace", color:"#fff", padding:"24px 20px", textAlign:"center" }}>
        <style>{CSS}</style>
        <div style={{ fontSize:56, animation:"float 2s ease-in-out infinite" }}>🏆</div>
        <h2 style={{ fontSize:52, letterSpacing:8, color:"#d4a843", fontFamily:"'Bebas Neue',sans-serif", margin:"16px 0 4px", animation:"glow 2s ease-in-out infinite" }}>BRILLIANT</h2>
        <p style={{ color:"#444", fontSize:11, letterSpacing:2, marginBottom:28 }}>{Math.floor(taken/60)}m {taken%60}s</p>
        <div style={{ fontSize:26, letterSpacing:10, fontWeight:700, color:"#00ff88", border:"1px solid rgba(0,255,136,0.25)", borderRadius:6, padding:"14px 28px", marginBottom:32, fontFamily:"'Courier New',monospace" }}>{puzzle.anagram.answer}</div>
        <div style={{ maxWidth:440, border:"1px solid #1a1a1a", borderRadius:10, padding:"22px 26px", animation:"fadeUp 0.8s ease", textAlign:"left", marginBottom:28 }}>
          <div style={{ fontSize:9, letterSpacing:3, color:"#d4a843", marginBottom:14 }}>TODAY'S QUOTE</div>
          <p style={{ fontSize:13, lineHeight:1.8, color:"#888", fontStyle:"italic", margin:0 }}>
            {puzzle.quote.split(puzzle.anagram.answer).map((part, i, arr) => (
              <span key={i}>{part}{i < arr.length-1 && <span style={{ color:"#d4a843", fontWeight:"bold", fontStyle:"normal", letterSpacing:1 }}>{puzzle.anagram.answer}</span>}</span>
            ))}
          </p>
        </div>
        <ShareButton />
        <p style={{ color:"#2a2a2a", marginTop:24, fontSize:9, letterSpacing:3 }}>COME BACK TOMORROW FOR A NEW PUZZLE</p>
      </div>
    );
  }

  // ── ANAGRAM ───────────────────────────────────────────────────────────────
  if (phase === "anagram") return (
    <div style={{ minHeight:"100vh", background:"#080808", fontFamily:"'Courier New',monospace", color:"#fff", display:"flex", flexDirection:"column", alignItems:"center", padding:"0 16px 48px" }}>
      <style>{CSS}</style>
      <Header label="FINAL" />
      <div style={{ width:"100%", maxWidth:580, marginBottom:16 }}>{done.map((r,i)=><RoundSummary key={i} r={r} i={i}/>)}</div>
      <div style={{ fontSize:9, letterSpacing:3, color:"#555", marginBottom:16, textAlign:"center" }}>UNSCRAMBLE THE LETTERS</div>
      <div style={{ display:"flex", gap:10, justifyContent:"center", marginBottom:12 }}>
        {puzzle.anagram.letters.map((l,i)=><div key={i} style={{ width:50, height:50, border:"2px solid #d4a843", borderRadius:4, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, fontWeight:700, color:"#d4a843", fontFamily:"'Courier New',monospace", animation:`tileGlow 2s ease-in-out ${i*0.2}s infinite` }}>{l}</div>)}
      </div>
      <div style={{ fontSize:11, color:"#777", fontStyle:"italic", marginBottom:20, textAlign:"center", maxWidth:340, lineHeight:1.7 }}>{puzzle.anagram.clue}</div>
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:12, animation:anShake?"shake 0.4s ease":"none" }}>
        <input autoFocus value={anInput} onChange={e=>setAnInput(e.target.value.replace(/[^a-zA-Z]/g,"").toUpperCase().slice(0,puzzle.anagram.answer.length))} onKeyDown={e=>e.key==="Enter"&&submitAnagram()} placeholder={"_ ".repeat(puzzle.anagram.answer.length).trim()} style={{ background:"transparent", border:`1px solid ${anWrong?"#ff4444":"#d4a843"}`, padding:"12px 20px", fontSize:22, color:"#d4a843", textAlign:"center", letterSpacing:8, fontFamily:"'Courier New',monospace", fontWeight:700, width:260, outline:"none", textTransform:"uppercase", borderRadius:4 }} />
        <button onClick={submitAnagram} style={{ background:"transparent", border:"1px solid #d4a843", color:"#d4a843", borderRadius:4, padding:"10px 32px", fontSize:11, fontWeight:700, letterSpacing:3, cursor:"pointer", fontFamily:"'Courier New',monospace" }}>SOLVE</button>
        {anWrong && <div style={{ color:"#ff4444", fontSize:10, letterSpacing:2 }}>NOT QUITE — TRY AGAIN</div>}
      </div>
    </div>
  );

  // ── PLAYING ───────────────────────────────────────────────────────────────
  const latestIdx = attempts.length-1;
  return (
    <div style={{ minHeight:"100vh", background:"#080808", fontFamily:"'Courier New',monospace", color:"#fff", display:"flex", flexDirection:"column", alignItems:"center", padding:"0 16px 40px" }}>
      <style>{CSS}</style>
      <div style={{ position:"fixed", inset:0, backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.04) 2px,rgba(0,0,0,0.04) 4px)", pointerEvents:"none", zIndex:10 }} />
      <Header label={`Q${roundIdx+1}/5`} />
      <div style={{ display:"flex", gap:6, marginBottom:16, alignItems:"center" }}>
        {puzzle.rounds.map((_,i)=><div key={i} style={{ height:3, borderRadius:2, transition:"all 0.4s ease", width:i<roundIdx?32:i===roundIdx?24:16, background:i<roundIdx?"#00ff88":i===roundIdx?"#d4a843":"#1a1a1a" }} />)}
        <div style={{ width:12, height:3, background:"#0d0d2e", border:"1px solid #1a1a3a", borderRadius:2, marginLeft:4 }} />
      </div>
      <div style={{ width:"100%", maxWidth:580 }}>
        {done.length>0 && <div style={{ marginBottom:12 }}>{done.map((r,i)=><RoundSummary key={i} r={r} i={i}/>)}</div>}
        <div style={{ border:"1px solid #2a2a2a", borderRadius:8, padding:"14px 18px", marginBottom:16 }}>
          <div style={{ fontSize:9, letterSpacing:3, color:"#d4a843", marginBottom:8 }}>QUESTION {roundIdx+1} · {alen} LETTERS</div>
          <div style={{ fontSize:17, color:"#eee", lineHeight:1.5 }}>{round.clue}</div>
        </div>
        <div style={{ marginBottom:8 }}>
          {attempts.map((a,i)=>(
            <TypewriterRow key={`r${roundIdx}-a${i}`} word={a.word} correct={a.correct} animate={i===latestIdx&&animating} onDone={i===latestIdx?onRevealDone:undefined} />
          ))}
        </div>
        {canInput && <div style={{ marginBottom:16 }}><AnswerDisplay length={alen} revealed={revealed} input={input} shake={shake} /></div>}
        <div style={{ display:"flex", justifyContent:"center", marginBottom:20, gap:10, alignItems:"center" }}>
          <button onClick={takeHint} disabled={!canInput||hintsLeft<=0} style={{ background:"transparent", border:`1px solid ${canInput&&hintsLeft>0?"#d4a843":"#333"}`, color:canInput&&hintsLeft>0?"#d4a843":"#555", borderRadius:4, padding:"8px 20px", fontSize:10, fontWeight:700, letterSpacing:2, cursor:canInput&&hintsLeft>0?"pointer":"default", fontFamily:"'Courier New',monospace" }}>
            HINT (−{HINT_PENALTY}s)
          </button>
          <div style={{ fontSize:11, color:"#666", letterSpacing:1 }}>{hintsLeft}/{MAX_HINTS} left</div>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:6, alignItems:"center" }}>
          {["QWERTYUIOP","ASDFGHJKL","ZXCVBNM"].map((row,ri)=>(
            <div key={ri} style={{ display:"flex", gap:4 }}>
              {ri===2 && <button onClick={submit} style={{ minWidth:50, height:44, border:"1px solid #2a2a2a", borderRadius:4, background:"rgba(212,168,67,0.08)", color:"#d4a843", fontSize:9, fontWeight:700, letterSpacing:1, cursor:"pointer", fontFamily:"'Courier New',monospace" }}>ENTER</button>}
              {row.split("").map(k=>(
                <button key={k} onClick={()=>pressKey(k)} style={{ width:30, height:44, borderRadius:4, border:"1px solid #333", background:"rgba(255,255,255,0.04)", color:"#ddd", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"'Courier New',monospace" }}>{k}</button>
              ))}
              {ri===2 && <button onClick={()=>pressKey("DEL")} style={{ minWidth:50, height:44, border:"1px solid #333", borderRadius:4, background:"rgba(255,255,255,0.04)", color:"#aaa", fontSize:16, cursor:"pointer" }}>&#9003;</button>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
