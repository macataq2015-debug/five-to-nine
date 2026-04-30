import { useState, useEffect, useCallback, useRef } from "react";

const ROUNDS = [
  { question: "What is the capital city of France?",              answer: "PARIS",     revealIdx: 0 },
  { question: "Which is the largest country in South America?",   answer: "BRAZIL",    revealIdx: 1 },
  { question: "What country has Vienna as its capital city?",     answer: "AUSTRIA",   revealIdx: 0 },
  { question: "Which country is Edinburgh the capital of?",       answer: "SCOTLAND",  revealIdx: 3 },
  { question: "Which city hosted the 1992 Summer Olympic Games?", answer: "BARCELONA", revealIdx: 4 },
];

const ANAGRAM = {
  letters: ["E","T","A","P","R"],
  answer:  "TAPER",
  clue:    "verb: to gradually become narrower, or reduce in intensity",
  quote:   `"Success is not final, failure is not fatal - it is the courage to continue that counts." - Winston Churchill`,
};

const MAX_GUESSES   = 3;
const TOTAL_SECONDS = 5 * 60;

function evaluate(guess, answer) {
  const result = Array(answer.length).fill("absent");
  const used   = Array(answer.length).fill(false);
  for (let i = 0; i < answer.length; i++) {
    if (guess[i] === answer[i]) { result[i] = "correct"; used[i] = true; }
  }
  for (let i = 0; i < answer.length; i++) {
    if (result[i] === "correct") continue;
    for (let j = 0; j < answer.length; j++) {
      if (!used[j] && guess[i] === answer[j]) { result[i] = "present"; used[j] = true; break; }
    }
  }
  return result;
}

function formatTime(s) {
  return `${Math.floor(s/60)}:${(s%60).toString().padStart(2,"0")}`;
}

function TypewriterRow({ word, evaluation, animate, onDone }) {
  const [count,   setCount]   = useState(animate ? 0 : word.length);
  const [flipped, setFlipped] = useState(!animate);

  useEffect(() => {
    if (!animate) return;
    if (count < word.length) {
      const t = setTimeout(() => setCount(c => c+1), 110);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => { setFlipped(true); onDone?.(); }, 350);
      return () => clearTimeout(t);
    }
  }, [count, word.length, animate, onDone]);

  return (
    <div style={{ display:"flex", gap:6, justifyContent:"center", marginBottom:8 }}>
      {word.split("").map((ch, i) => {
        const shown = i < count;
        const st = evaluation[i];
        let color="#eee", border="#888", content=shown?ch:"";
        if (flipped) {
          if (st==="correct")      { color="#00ff88"; border="#00ff88"; content=ch; }
          else if (st==="present") { color="#ffaa00"; border="#ffaa00"; content=ch; }
          else                     { color="#333";    border="#2a2a2a"; content="--"; }
        } else if (!shown) { border="#1a1a1a"; color="transparent"; }
        return (
          <div key={i} style={{ width:44, height:44, border:`2px solid ${border}`, borderRadius:4, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, fontWeight:700, color, fontFamily:"'Courier New',monospace", transition:flipped?`border-color 0.2s ${i*0.05}s, color 0.2s ${i*0.05}s`:"none", position:"relative" }}>
            {content}
            {animate && !flipped && i===count && (
              <div style={{ position:"absolute", right:4, top:8, bottom:8, width:2, background:"#d4a843", animation:"blink 0.6s step-end infinite" }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function InputRow({ value, length, shake }) {
  return (
    <div style={{ display:"flex", gap:6, justifyContent:"center", marginBottom:8, animation:shake?"shake 0.4s ease":"none" }}>
      {Array(length).fill(0).map((_,i) => {
        const ch = value[i]||"";
        return (
          <div key={i} style={{ width:44, height:44, border:`2px solid ${ch?"#888":"#2a2a2a"}`, borderRadius:4, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, fontWeight:700, color:"#eee", fontFamily:"'Courier New',monospace", transform:ch?"scale(1.06)":"scale(1)", transition:"transform 0.06s, border-color 0.1s", position:"relative" }}>
            {ch}
            {i===value.length && <div style={{ position:"absolute", right:4, top:8, bottom:8, width:2, background:"#d4a843", animation:"blink 0.6s step-end infinite" }} />}
          </div>
        );
      })}
    </div>
  );
}

function EmptyRow({ length }) {
  return (
    <div style={{ display:"flex", gap:6, justifyContent:"center", marginBottom:8 }}>
      {Array(length).fill(0).map((_,i) => <div key={i} style={{ width:44, height:44, border:"2px solid #111", borderRadius:4 }} />)}
    </div>
  );
}

function RoundSummary({ r, i }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 14px", background:r.solved?"rgba(0,255,136,0.04)":"rgba(255,60,60,0.04)", border:`1px solid ${r.solved?"rgba(0,255,136,0.15)":"rgba(255,60,60,0.12)"}`, borderRadius:8, marginBottom:6 }}>
      <div style={{ fontSize:10, color:"#444", width:16, flexShrink:0 }}>{i+1}</div>
      <div style={{ flex:1, display:"flex", gap:4, flexWrap:"wrap" }}>
        {r.answer.split("").map((ch,ci) => {
          const hl = ci===r.revealIdx;
          return <div key={ci} style={{ width:22, height:22, borderRadius:3, border:`1px solid ${hl?"#d4a843":r.solved?"rgba(0,255,136,0.25)":"rgba(255,255,255,0.08)"}`, background:hl?"rgba(212,168,67,0.15)":"transparent", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:700, color:hl?"#d4a843":r.solved?"#00ff88":"#555", boxShadow:hl?"0 0 8px rgba(212,168,67,0.4)":"none", fontFamily:"'Courier New',monospace" }}>{ch}</div>;
        })}
      </div>
      <div style={{ fontSize:10, color:r.solved?"#00ff88":"#ff4444", flexShrink:0 }}>{r.solved?`OK ${r.guesses.length}/${MAX_GUESSES}`:"X"}</div>
    </div>
  );
}

function RevealAll({ done, onReset }) {
  const all = [...done, ...ROUNDS.slice(done.length).map(r => ({...r, solved:false, guesses:[]}))];
  return (
    <div style={{ minHeight:"100vh", background:"#080808", fontFamily:"'Courier New',monospace", color:"#fff", display:"flex", flexDirection:"column", alignItems:"center", padding:"0 16px 48px" }}>
      <style>{CSS}</style>
      <div style={{ width:"100%", maxWidth:580, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"18px 0 14px", borderBottom:"1px solid #1e1e1e", marginBottom:20 }}>
        <div style={{ fontSize:10, letterSpacing:3, color:"#ff4444" }}>TIME'S UP</div>
        <h1 style={{ fontSize:42, letterSpacing:8, color:"#d4a843", fontFamily:"'Bebas Neue',sans-serif" }}>5 TO 9</h1>
        <div style={{ fontSize:10, color:"#444" }}>0:00</div>
      </div>
      <div style={{ width:"100%", maxWidth:580, marginBottom:24 }}>
        <div style={{ fontSize:9, letterSpacing:3, color:"#555", marginBottom:12 }}>TODAY'S ANSWERS</div>
        {all.map((r,i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 14px", background:"rgba(255,255,255,0.02)", border:"1px solid #1a1a1a", borderRadius:8, marginBottom:6 }}>
            <div style={{ fontSize:10, color:"#444", width:16 }}>{i+1}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:10, color:"#444", marginBottom:4 }}>{r.question}</div>
              <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
                {r.answer.split("").map((ch,ci) => {
                  const hl=ci===r.revealIdx;
                  return <div key={ci} style={{ width:24, height:24, borderRadius:3, border:`1px solid ${hl?"#d4a843":"#2a2a2a"}`, background:hl?"rgba(212,168,67,0.15)":"transparent", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color:hl?"#d4a843":r.solved?"#00ff88":"#666", fontFamily:"'Courier New',monospace" }}>{ch}</div>;
                })}
              </div>
            </div>
            <div style={{ fontSize:10, color:r.solved?"#00ff88":"#333" }}>{r.solved?"OK":"X"}</div>
          </div>
        ))}
      </div>
      <div style={{ width:"100%", maxWidth:580, border:"1px solid rgba(212,168,67,0.2)", borderRadius:10, padding:"18px 20px", marginBottom:24 }}>
        <div style={{ fontSize:9, letterSpacing:3, color:"#d4a843", marginBottom:12 }}>TODAY'S ANAGRAM</div>
        <div style={{ display:"flex", gap:8, marginBottom:12 }}>{ANAGRAM.letters.map((l,i) => <div key={i} style={{ width:44, height:44, border:"2px solid #d4a843", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, fontWeight:700, color:"#d4a843", borderRadius:4, fontFamily:"'Courier New',monospace" }}>{l}</div>)}</div>
        <div style={{ fontSize:11, color:"#555", marginBottom:12, fontStyle:"italic" }}>{ANAGRAM.clue}</div>
        <div style={{ fontSize:26, letterSpacing:8, fontWeight:700, color:"#00ff88", fontFamily:"'Courier New',monospace" }}>{ANAGRAM.answer}</div>
      </div>
      <div style={{ width:"100%", maxWidth:580, border:"1px solid #1a1a1a", borderRadius:10, padding:"18px 22px", marginBottom:28 }}>
        <div style={{ fontSize:9, letterSpacing:3, color:"#555", marginBottom:12 }}>TODAY'S QUOTE</div>
        <p style={{ fontSize:13, lineHeight:1.8, color:"#888", fontStyle:"italic", margin:0 }}>{ANAGRAM.quote}</p>
      </div>
      <button onClick={onReset} style={{ background:"transparent", border:"1px solid #333", color:"#666", borderRadius:4, padding:"11px 28px", fontSize:11, letterSpacing:3, cursor:"pointer", fontFamily:"'Courier New',monospace" }}>TRY AGAIN</button>
    </div>
  );
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
  *{box-sizing:border-box;margin:0;padding:0}
  button:active{opacity:0.7}
`;

export default function FiveToNine() {
  const [roundIdx,  setRoundIdx]  = useState(0);
  const [done,      setDone]      = useState([]);
  const [guesses,   setGuesses]   = useState([]);
  const [animating, setAnimating] = useState(false);
  const [input,     setInput]     = useState("");
  const [shake,     setShake]     = useState(false);
  const [phase,     setPhase]     = useState("playing");
  const [anInput,   setAnInput]   = useState("");
  const [anShake,   setAnShake]   = useState(false);
  const [anWrong,   setAnWrong]   = useState(false);
  const [timeLeft,  setTimeLeft]  = useState(TOTAL_SECONDS);

  const round    = ROUNDS[roundIdx];
  const alen     = round?.answer.length ?? 0;
  const canInput = phase === "playing" && !animating;

  useEffect(() => {
    if (phase === "win" || phase === "timeout") return;
    if (timeLeft <= 0) { setPhase("timeout"); return; }
    const id = setTimeout(() => setTimeLeft(t => t-1), 1000);
    return () => clearTimeout(id);
  }, [timeLeft, phase]);

  const timerColor = timeLeft<=30?"#ff4444":timeLeft<=60?"#ffaa00":"#d4a843";

  const submit = useCallback(() => {
    if (!canInput) return;
    const word = input.toUpperCase();
    if (word.length !== alen) { setShake(true); setTimeout(()=>setShake(false),500); return; }
    const ev = evaluate(word, round.answer);
    setGuesses(prev => [...prev, { word, eval: ev }]);
    setInput("");
    setAnimating(true);
  }, [canInput, input, alen, round]);

  // Use a ref so onRevealDone always sees fresh state - no stale closures
  const stateRef = useRef({});
  const revealFired = useRef(false);
  stateRef.current = { round, roundIdx, guesses, done };

  const onRevealDone = useCallback(() => {
    if (revealFired.current) return;
    revealFired.current = true;
    const { round, roundIdx, guesses, done } = stateRef.current;
    const latest  = guesses[guesses.length - 1];
    if (!latest) return;
    const correct = latest.word === round.answer;
    const over    = guesses.length >= MAX_GUESSES;

    if (correct || over) {
      const completedRound = { ...round, guesses, solved: correct };
      setTimeout(() => {
        setDone(d => [...d, completedRound]);
        setGuesses([]);
        setInput("");
        setAnimating(false);
        if (roundIdx >= ROUNDS.length - 1) {
          revealFired.current = false;
        setPhase("anagram");
        } else {
          revealFired.current = false;
        setRoundIdx(r => r + 1);
        }
      }, 600);
    } else {
      revealFired.current = false;
      setAnimating(false);
    }
  }, []);

  // Letters on keydown, Enter on keyup to prevent Enter carrying into next round
  useEffect(() => {
    const onDown = (e) => {
      if (!canInput) return;
      if (["Enter","Backspace"," "].includes(e.key) || /^[a-zA-Z]$/.test(e.key)) e.preventDefault();
      const k = e.key.toUpperCase();
      if (k === "BACKSPACE") setInput(s => s.slice(0,-1));
      else if (/^[A-Z]$/.test(k) && input.length < alen) setInput(s => s + k);
    };
    const onUp = (e) => {
      if (e.key !== "Enter") return;
      e.preventDefault();
      if (canInput) submit();  // only fires during playing phase
    };
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
    };
  }, [canInput, input, alen, submit]);

  const pressKey = (k) => {
    if (!canInput) return;
    if (k === "ENTER") submit();
    else if (k === "DEL") setInput(s => s.slice(0,-1));
    else if (input.length < alen) setInput(s => s + k);
  };

  const keyColors = {};
  guesses.forEach(({ word, eval: ev }) => {
    word.split("").forEach((ch,i) => {
      const cur=keyColors[ch], nxt=ev[i];
      if (cur==="correct") return;
      if (nxt==="correct") { keyColors[ch]="correct"; return; }
      if (cur==="present") return;
      if (nxt==="present") { keyColors[ch]="present"; return; }
      if (!cur) keyColors[ch]="absent";
    });
  });

  const submitAnagram = () => {
    if (anInput.toUpperCase().trim()===ANAGRAM.answer) { setPhase("win"); }
    else { setAnWrong(true); setAnShake(true); setTimeout(()=>{setAnShake(false);setAnWrong(false);},700); }
  };

  const resetGame = () => {
    setRoundIdx(0); setDone([]); setGuesses([]); setInput("");
    setPhase("playing"); setAnInput(""); setTimeLeft(TOTAL_SECONDS); setAnimating(false);
  };

  const Header = ({ label }) => (
    <div style={{ width:"100%", maxWidth:580, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"18px 0 14px", borderBottom:"1px solid #1a1a1a", marginBottom:16 }}>
      <div style={{ fontSize:9, letterSpacing:3, color:"#444", fontFamily:"'Courier New',monospace", minWidth:52 }}>{label}</div>
      <h1 style={{ fontSize:42, letterSpacing:8, color:"#d4a843", fontFamily:"'Bebas Neue',sans-serif", animation:"flicker 8s infinite", lineHeight:1 }}>5 TO 9</h1>
      <div style={{ fontSize:20, fontWeight:700, fontFamily:"'Courier New',monospace", color:timerColor, minWidth:52, textAlign:"right", animation:timeLeft<=10?"blink 0.5s step-end infinite":"none", transition:"color 0.5s" }}>{formatTime(timeLeft)}</div>
    </div>
  );

  if (phase==="timeout") return <RevealAll done={done} onReset={resetGame} />;

  if (phase==="win") {
    const taken=TOTAL_SECONDS-timeLeft;
    return (
      <div style={{ minHeight:"100vh", background:"#080808", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", fontFamily:"'Courier New',monospace", color:"#fff", padding:"24px 20px", textAlign:"center" }}>
        <style>{CSS}</style>
        <div style={{ fontSize:56, animation:"float 2s ease-in-out infinite" }}>trophy</div>
        <h2 style={{ fontSize:56, letterSpacing:8, color:"#d4a843", fontFamily:"'Bebas Neue',sans-serif", margin:"16px 0 4px", animation:"glow 2s ease-in-out infinite" }}>BRILLIANT</h2>
        <p style={{ color:"#444", fontSize:11, letterSpacing:2, marginBottom:28 }}>{Math.floor(taken/60)}m {taken%60}s</p>
        <div style={{ fontSize:28, letterSpacing:10, fontWeight:700, color:"#00ff88", border:"1px solid rgba(0,255,136,0.25)", borderRadius:6, padding:"14px 28px", marginBottom:32, fontFamily:"'Courier New',monospace" }}>{ANAGRAM.answer}</div>
        <div style={{ maxWidth:440, border:"1px solid #1a1a1a", borderRadius:10, padding:"22px 26px", animation:"fadeUp 0.8s ease", textAlign:"left" }}>
          <div style={{ fontSize:9, letterSpacing:3, color:"#d4a843", marginBottom:14 }}>TODAY'S QUOTE</div>
          <p style={{ fontSize:13, lineHeight:1.8, color:"#888", fontStyle:"italic", margin:0 }}>{ANAGRAM.quote}</p>
        </div>
        <p style={{ color:"#222", marginTop:32, fontSize:9, letterSpacing:3 }}>COME BACK TOMORROW</p>
      </div>
    );
  }

  if (phase==="anagram") return (
    <div style={{ minHeight:"100vh", background:"#080808", fontFamily:"'Courier New',monospace", color:"#fff", display:"flex", flexDirection:"column", alignItems:"center", padding:"0 16px 48px" }}>
      <style>{CSS}</style>
      <Header label="FINAL" />
      <div style={{ width:"100%", maxWidth:580, marginBottom:20 }}>{done.map((r,i)=><RoundSummary key={i} r={r} i={i}/>)}</div>
      <div style={{ fontSize:9, letterSpacing:3, color:"#555", marginBottom:18, textAlign:"center" }}>UNSCRAMBLE THE LETTERS</div>
      <div style={{ display:"flex", gap:10, justifyContent:"center", marginBottom:14 }}>
        {ANAGRAM.letters.map((l,i)=><div key={i} style={{ width:52, height:52, border:"2px solid #d4a843", borderRadius:4, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, fontWeight:700, color:"#d4a843", fontFamily:"'Courier New',monospace", animation:`tileGlow 2s ease-in-out ${i*0.2}s infinite` }}>{l}</div>)}
      </div>
      <div style={{ fontSize:11, color:"#555", fontStyle:"italic", marginBottom:22, textAlign:"center", maxWidth:320, lineHeight:1.6 }}>{ANAGRAM.clue}</div>
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:12, animation:anShake?"shake 0.4s ease":"none" }}>
        <input autoFocus value={anInput} onChange={e=>setAnInput(e.target.value.replace(/[^a-zA-Z]/g,"").toUpperCase().slice(0,ANAGRAM.answer.length))} onKeyDown={e=>e.key==="Enter"&&submitAnagram()} placeholder={"_ ".repeat(ANAGRAM.answer.length).trim()} style={{ background:"transparent", border:`1px solid ${anWrong?"#ff4444":"#d4a843"}`, padding:"12px 20px", fontSize:22, color:"#d4a843", textAlign:"center", letterSpacing:8, fontFamily:"'Courier New',monospace", fontWeight:700, width:240, outline:"none", textTransform:"uppercase", borderRadius:4 }} />
        <button onClick={submitAnagram} style={{ background:"transparent", border:"1px solid #d4a843", color:"#d4a843", borderRadius:4, padding:"10px 32px", fontSize:11, fontWeight:700, letterSpacing:3, cursor:"pointer", fontFamily:"'Courier New',monospace" }}>SOLVE</button>
        {anWrong&&<div style={{ color:"#ff4444", fontSize:10, letterSpacing:2 }}>NOT QUITE - TRY AGAIN</div>}
      </div>
    </div>
  );

  const latestIdx = guesses.length - 1;

  return (
    <div style={{ minHeight:"100vh", background:"#080808", fontFamily:"'Courier New',monospace", color:"#fff", display:"flex", flexDirection:"column", alignItems:"center", padding:"0 16px 40px" }}>
      <style>{CSS}</style>
      <div style={{ position:"fixed", inset:0, backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.04) 2px,rgba(0,0,0,0.04) 4px)", pointerEvents:"none", zIndex:10 }} />
      <Header label={`Q${roundIdx+1}/5`} />
      <div style={{ display:"flex", gap:6, marginBottom:18, alignItems:"center" }}>
        {ROUNDS.map((_,i)=><div key={i} style={{ height:3, borderRadius:2, transition:"all 0.4s ease", width:i<roundIdx?32:i===roundIdx?24:16, background:i<roundIdx?"#00ff88":i===roundIdx?"#d4a843":"#1a1a1a" }} />)}
        <div style={{ width:12, height:3, background:"#0d0d2e", border:"1px solid #1a1a3a", borderRadius:2, marginLeft:4 }} />
      </div>
      <div style={{ width:"100%", maxWidth:580 }}>
        {done.length>0&&<div style={{ marginBottom:14 }}>{done.map((r,i)=><RoundSummary key={i} r={r} i={i}/>)}</div>}
        <div style={{ border:"1px solid #1a1a1a", borderRadius:8, padding:"16px 20px", marginBottom:20 }}>
          <div style={{ fontSize:9, letterSpacing:3, color:"#d4a843", marginBottom:10, textTransform:"uppercase" }}>
            Question {roundIdx+1} of 5  |  {alen} letters  |  {MAX_GUESSES-guesses.length} guess{MAX_GUESSES-guesses.length!==1?"es":""} left
          </div>
          <div style={{ fontSize:16, color:"#ddd", lineHeight:1.5 }}>{round.question}</div>
        </div>
        <div style={{ marginBottom:20 }}>
          {guesses.map((g,i)=>(
            <TypewriterRow key={`r${roundIdx}-g${i}`} word={g.word} evaluation={g.eval} animate={i===latestIdx&&animating} onDone={i===latestIdx?onRevealDone:undefined} />
          ))}
          {canInput&&guesses.length<MAX_GUESSES&&<InputRow value={input} length={alen} shake={shake} />}
          {Array(Math.max(0,MAX_GUESSES-guesses.length-(canInput?1:0))).fill(0).map((_,i)=><EmptyRow key={i} length={alen} />)}
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:6, alignItems:"center" }}>
          {["QWERTYUIOP","ASDFGHJKL","ZXCVBNM"].map((row,ri)=>(
            <div key={ri} style={{ display:"flex", gap:4 }}>
              {ri===2&&<button onClick={()=>pressKey("ENTER")} style={{ minWidth:48, height:44, border:"1px solid #222", borderRadius:4, background:"transparent", color:"#777", fontSize:9, fontWeight:700, letterSpacing:1, cursor:"pointer", fontFamily:"'Courier New',monospace" }}>ENTER</button>}
              {row.split("").map(k=>{
                const st=keyColors[k];
                return <button key={k} onClick={()=>pressKey(k)} style={{ width:30, height:44, borderRadius:4, border:`1px solid ${st==="correct"?"#00ff88":st==="present"?"#ffaa00":st==="absent"?"#111":"#222"}`, background:"transparent", color:st==="correct"?"#00ff88":st==="present"?"#ffaa00":st==="absent"?"#333":"#ccc", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"'Courier New',monospace", transition:"all 0.25s" }}>{k}</button>;
              })}
              {ri===2&&<button onClick={()=>pressKey("DEL")} style={{ minWidth:48, height:44, border:"1px solid #222", borderRadius:4, background:"transparent", color:"#777", fontSize:16, cursor:"pointer" }}>&#9003;</button>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
