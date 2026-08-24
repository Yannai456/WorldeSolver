import { useState, useCallback, useEffect, useRef } from "react";

// ─── Fallback word list ────────────────────────────────────────────────────────
const FALLBACK_WORDS = [
  "crane","slate","trace","crate","raise","arise","snare","alter","atone","arose",
  "irate","bread","stone","stare","share","spine","spare","shore","score","store",
  "black","blank","blend","blood","brown","brake","brave","blaze","bleat","bland",
  "chair","charm","chase","cheap","cheat","cheek","chess","chest","chief","child",
  "civil","claim","clash","class","clean","clear","clerk","click","cliff","climb",
  "cling","clock","close","cloth","cloud","clown","cluck","clump","coach","coast",
  "comet","comic","coral","count","court","cover","crack","craft","crash","crawl",
  "cream","creed","creek","creep","crime","crisp","cross","crowd","crown","cruel",
  "crush","crust","cycle","daily","dance","decay","delta","depth","derby","devil",
  "diary","digit","ditch","doubt","dough","draft","drain","drama","drank","drawl",
  "dread","dream","dress","drift","drill","drink","drive","drove","drunk","dryer",
  "eager","eagle","early","earth","eight","elder","elite","ember","emote","empty",
  "enemy","enjoy","enter","entry","equal","error","essay","evade","event","every",
  "exact","exile","extra","fable","facet","faith","falls","false","fancy","fatal",
  "fault","feast","fence","feral","fetch","fever","fewer","field","fiery","fifth",
  "fifty","fight","finch","first","fixed","flame","flank","flare","flash","flask",
  "flair","flesh","flies","fling","flint","float","flock","flood","floor","flour",
  "flown","flute","focus","force","forge","forth","forum","found","frame","freed",
  "fresh","front","frost","froze","fruit","fully","funny","giant","girth","given",
  "gland","glare","glean","glide","glint","gloat","globe","gloom","glory","gloss",
  "glove","gnome","grace","grade","grain","grand","grant","grasp","grass","grave",
  "great","greed","green","greet","grief","grind","groan","groin","groom","grope",
  "gross","group","grove","growl","grown","guard","guide","guild","guise","gusto",
  "haiku","halve","handy","harsh","hasty","haunt","haven","havoc","hazel","heart",
  "heavy","hence","heron","hoist","holly","honey","honor","horse","hotel","hound",
  "house","hover","human","humor","hurry","hyena","ideal","image","impel","inept",
  "infer","inlay","inner","input","inter","intro","irony","ivory","jazzy","jewel",
  "joint","joust","juice","juicy","jumpy","kebab","knack","knave","kneel","knife",
  "knock","known","label","lance","large","laser","latch","later","laugh","layer",
  "leaky","learn","leave","ledge","legal","level","light","linen","liner","liver",
  "lodge","logic","loose","lover","lower","lucky","lunar","lying","magic","major",
  "maker","manor","march","marry","match","mayor","media","merge","merit","metal",
  "might","minor","minus","mirth","mixed","model","month","moral","motif","motor",
  "mound","mount","mourn","mouse","mouth","mover","movie","murky","music","named",
  "naval","nerve","never","night","noble","noise","north","noted","novel","nurse",
  "nymph","occur","ocean","offer","olive","onset","opera","orbit","order","other",
  "ought","ovule","owner","oxide","ozone","paint","panel","paper","party","pasta",
  "patch","pause","peace","peach","pearl","pedal","penny","perch","peril","perky",
  "petal","phase","phone","photo","piano","pilot","pixel","pizza","place","plague",
  "plain","plait","plank","plant","plaza","plead","pleat","plonk","plumb","plume",
  "point","polar","polio","poppy","porch","posed","pouch","power","press","price",
  "pride","prime","print","prism","prize","probe","prone","proof","prose","proud",
  "prove","prowl","pulse","punch","purge","pygmy","quack","qualm","queen","query",
  "quest","queue","quick","quiet","quota","quote","rabbi","radar","rainy","rally",
  "ramen","ranch","range","rapid","raven","reach","react","realm","regal","reign",
  "relay","relic","remix","repay","repel","resin","reuse","revel","rider","ridge",
  "rifle","right","rigid","rigor","risky","rival","river","rivet","robot","rocky",
  "rogue","rouge","rough","round","route","rowdy","royal","rugby","ruler","rumor",
  "rural","rusty","sadly","saint","salad","salve","sandy","sauce","savvy","scald",
  "scalp","scamp","scant","scary","scene","scone","scoop","scope","scorn","scour",
  "scout","scram","scrap","scrub","seize","sense","serum","serve","setup","seven",
  "sever","shack","shade","shaft","shake","shall","shame","shank","sharp","shawl",
  "shear","sheep","sheet","shelf","shell","shift","shine","shiny","shirt","shock",
  "shoot","short","shout","shove","shown","shrub","sight","sigma","silky","silly",
  "since","sixth","sixty","sized","skill","skimp","slack","slain","slang","slash",
  "sleet","slept","slice","slide","slime","sloth","slump","slung","slurp","small",
  "smart","smell","smelt","smile","smirk","smite","smoke","snack","snail","snake",
  "sniff","snore","solar","solid","solve","sonic","sorry","south","space","spark",
  "speak","spear","speed","spell","spend","spice","spill","spire","spite","splat",
  "split","spoke","sport","spout","spray","spree","sprig","spunk","squad","squat",
  "squid","stack","staff","stage","stain","stale","stalk","stamp","stand","stark",
  "start","state","stays","steam","steel","steep","steer","stern","stiff","still",
  "sting","stock","stoic","stomp","stony","storm","story","stout","stove","straw",
  "stray","strep","strip","strum","strut","stuck","study","stump","stung","stunk",
  "stunt","style","sugar","suite","sulky","sunny","super","surge","swamp","swear",
  "sweat","sweep","sweet","swept","swift","swill","swipe","swirl","swoop","sword",
  "swore","sworn","swung","synod","taboo","tacit","taffy","tango","tangy","tapir",
  "tardy","taunt","tawny","teach","tease","terse","thank","theft","their","theme",
  "there","these","thick","thief","thing","think","third","thorn","those","three",
  "threw","throw","thrum","thumb","thump","tidal","tiger","tight","timer","tired",
  "title","today","token","topic","torch","total","touch","tough","towel","toxic",
  "trace","track","trade","trail","train","trait","tramp","trash","trawl","tread",
  "treat","trend","trial","tribe","trice","trick","tried","tripe","trite","troll",
  "tromp","troop","troth","trout","trove","truce","truck","truly","trump","trunk",
  "tryst","tulip","tumor","tuner","tuple","twice","twill","twine","twist","tying",
  "ultra","uncle","under","unify","unite","unity","unlit","until","unzip","upper",
  "upset","urban","usage","usher","usual","utter","valid","valor","value","valve",
  "vapor","vault","vaunt","vicar","vigil","vigor","viola","viper","viral","virus",
  "visor","vista","vital","vivid","vogue","voice","voter","vouch","vowel","wager",
  "waltz","warty","watch","water","weary","weave","wedge","weedy","weigh","weird",
  "whack","wharf","wheat","wheel","where","which","while","whiff","whirl","whisk",
  "white","whole","whose","wield","wince","winch","witty","world","wormy","worry",
  "worse","worst","worth","would","wound","wrath","wrist","wrong","yacht","yearn",
  "yield","young","youth","zappy","zesty","zilch","zippy","zones",
].filter(w => w.length === 5);

// ─── Pattern matching ─────────────────────────────────────────────────────────
function getPattern(guess, answer) {
  const result = [0, 0, 0, 0, 0];
  const answerArr = answer.split("");
  const guessArr = guess.split("");
  const used = [false, false, false, false, false];
  for (let i = 0; i < 5; i++) {
    if (guessArr[i] === answerArr[i]) { result[i] = 2; used[i] = true; }
  }
  for (let i = 0; i < 5; i++) {
    if (result[i] === 2) continue;
    for (let j = 0; j < 5; j++) {
      if (!used[j] && guessArr[i] === answerArr[j]) { result[i] = 1; used[j] = true; break; }
    }
  }
  return result.join("");
}

function filterWords(words, guess, pattern) {
  return words.filter(w => getPattern(guess, w) === pattern);
}

// ─── Entropy solver ───────────────────────────────────────────────────────────
function calcEntropy(guess, candidates) {
  const counts = {};
  for (const w of candidates) {
    const p = getPattern(guess, w);
    counts[p] = (counts[p] || 0) + 1;
  }
  const total = candidates.length;
  let h = 0;
  for (const c of Object.values(counts)) {
    const p = c / total;
    h -= p * Math.log2(p);
  }
  return h;
}

function getBestEntropy(candidates) {
  if (candidates.length <= 2) return { word: candidates[0], stats: {} };
  let best = null, bestScore = -Infinity;
  const scores = {};
  for (const w of candidates) {
    const s = calcEntropy(w, candidates);
    scores[w] = s;
    if (s > bestScore) { bestScore = s; best = w; }
  }
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]).slice(0, 5);
  return {
    word: best,
    stats: {
      infoBits: bestScore.toFixed(2),
      topCandidates: sorted.map(([w, s]) => ({ word: w, score: s.toFixed(2) })),
      worstCase: Math.ceil(Math.log2(candidates.length)),
      avgReduction: ((1 - 1 / Math.pow(2, bestScore)) * 100).toFixed(0) + "%",
    }
  };
}

// ─── Lookahead solver ─────────────────────────────────────────────────────────
function lookaheadScore(guess, candidates, discount = 0.5) {
  const counts = {};
  for (const w of candidates) {
    const p = getPattern(guess, w);
    counts[p] = (counts[p] || 0) + 1;
  }
  const total = candidates.length;
  let h = 0;
  for (const [pattern, count] of Object.entries(counts)) {
    const p = count / total;
    h -= p * Math.log2(p);
    if (count > 1) {
      const next = filterWords(candidates, guess, pattern);
      if (next.length > 1) {
        const sample = next.slice(0, 20);
        let bestNextH = 0;
        for (const ng of sample) {
          const nh = calcEntropy(ng, next);
          if (nh > bestNextH) bestNextH = nh;
        }
        h += p * discount * bestNextH;
      }
    }
  }
  return h;
}

function getBestLookahead(candidates) {
  if (candidates.length <= 2) return { word: candidates[0], stats: {} };
  let best = null, bestScore = -Infinity;
  const scores = {};
  const sample = candidates.slice(0, 80);
  for (const w of sample) {
    const s = lookaheadScore(w, candidates);
    scores[w] = s;
    if (s > bestScore) { bestScore = s; best = w; }
  }
  const baseEntropy = calcEntropy(best, candidates);
  const futureBonus = (bestScore - baseEntropy).toFixed(2);
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]).slice(0, 5);
  return {
    word: best,
    stats: {
      combinedScore: bestScore.toFixed(2),
      baseEntropy: baseEntropy.toFixed(2),
      futureBonus: futureBonus > 0 ? `+${futureBonus}` : futureBonus,
      topCandidates: sorted.map(([w, s]) => ({ word: w, score: s.toFixed(2) })),
      planningDepth: "1 step ahead (×0.5 discount)",
    }
  };
}

// ─── Markov chain solver ──────────────────────────────────────────────────────
function buildBigrams(words) {
  const bigrams = {};
  for (const word of words) {
    for (let i = 0; i < word.length - 1; i++) {
      const key = word[i] + word[i + 1];
      bigrams[key] = (bigrams[key] || 0) + 1;
    }
  }
  return bigrams;
}

function buildPositionFreq(words) {
  const freq = Array.from({ length: 5 }, () => ({}));
  for (const word of words) {
    for (let i = 0; i < 5; i++) {
      freq[i][word[i]] = (freq[i][word[i]] || 0) + 1;
    }
  }
  return freq;
}

function markovScore(word, bigrams, posFreq, total) {
  let score = 0;
  // Bigram transition probability (log)
  for (let i = 0; i < word.length - 1; i++) {
    const key = word[i] + word[i + 1];
    const count = bigrams[key] || 0.1;
    score += Math.log(count / total);
  }
  // Positional frequency bonus
  for (let i = 0; i < 5; i++) {
    const posCount = posFreq[i][word[i]] || 0.1;
    score += Math.log(posCount / total) * 0.5;
  }
  return score;
}

function getBestMarkov(candidates, masterWords) {
  if (candidates.length <= 2) return { word: candidates[0], stats: {} };
  // Build Markov model from ALL master words for stable transitions
  const bigrams = buildBigrams(masterWords);
  const posFreq = buildPositionFreq(candidates); // positional from remaining candidates
  const total = masterWords.length;

  let best = null, bestScore = -Infinity;
  const scores = {};
  for (const w of candidates) {
    const s = markovScore(w, bigrams, posFreq, total);
    scores[w] = s;
    if (s > bestScore) { bestScore = s; best = w; }
  }

  // Compute top bigrams used in best word
  const topBigrams = [];
  for (let i = 0; i < best.length - 1; i++) {
    const key = best[i] + best[i + 1];
    topBigrams.push({ bigram: key.toUpperCase(), freq: bigrams[key] || 0 });
  }
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]).slice(0, 5);

  // Top bigrams in the whole candidate set
  const allBigrams = Object.entries(bigrams)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([b, c]) => ({ bigram: b.toUpperCase(), freq: c }));

  return {
    word: best,
    stats: {
      markovScore: bestScore.toFixed(2),
      wordBigrams: topBigrams,
      topBigrams: allBigrams,
      topCandidates: sorted.map(([w, s]) => ({ word: w, score: s.toFixed(2) })),
      model: "Bigram transitions + positional frequency",
    }
  };
}

// ─── Colors ───────────────────────────────────────────────────────────────────
const C = {
  green:   "#538d4e",
  yellow:  "#b59f3b",
  gray:    "#3a3a3c",
  empty:   "#121213",
  border:  "#3a3a3c",
  bg:      "#121213",
  surface: "#1a1a1b",
  text:    "#ffffff",
  muted:   "#818384",
  red:     "#e57373",
  blue:    "#5b8dd9",
  purple:  "#9b59b6",
};

const MODES = [
  { id: "entropy",   label: "📊 Entropy",   color: C.green  },
  { id: "lookahead", label: "🔭 Lookahead",  color: C.blue   },
  { id: "markov",    label: "🔗 Markov",     color: C.purple },
];

const patternBg = v => v === "2" ? C.green : v === "1" ? C.yellow : C.gray;

// ─── Component ────────────────────────────────────────────────────────────────
export default function WordleSolver() {
  const [masterWords, setMasterWords]   = useState([...new Set(FALLBACK_WORDS)]);
  const [wordListName, setWordListName] = useState(null);
  const [fileHandle, setFileHandle]     = useState(null); // File System Access API handle
  const [candidates, setCandidates]     = useState([...new Set(FALLBACK_WORDS)]);
  const [guesses, setGuesses]           = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [currentPattern, setCurrentPattern] = useState("00000");
  const [mode, setMode]                 = useState("entropy");
  const [result, setResult]             = useState(null); // { word, stats }
  const [thinking, setThinking]         = useState(false);
  const [fileError, setFileError]       = useState(null);
  const [bannedCount, setBannedCount]   = useState(0);
  const fileInputRef = useRef(null);

  // ── Recompute suggestion whenever candidates/mode changes ──────────────────
  useEffect(() => {
    setThinking(true);
    const t = setTimeout(() => {
      if (candidates.length === 0) { setResult(null); setThinking(false); return; }
      let r;
      if (mode === "entropy")   r = getBestEntropy(candidates);
      if (mode === "lookahead") r = getBestLookahead(candidates);
      if (mode === "markov")    r = getBestMarkov(candidates, masterWords);
      setResult(r);
      setThinking(false);
    }, 50);
    return () => clearTimeout(t);
  }, [candidates, mode, masterWords]);

  // ── File upload (fallback input) ──────────────────────────────────────────
  const handleFileInput = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileError(null);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const words = parseWordList(ev.target.result);
      if (!words.length) { setFileError("No valid 5-letter words found."); return; }
      setMasterWords(words);
      setCandidates(words);
      setGuesses([]);
      setCurrentGuess("");
      setCurrentPattern("00000");
      setBannedCount(0);
      setWordListName(`${file.name} (${words.length.toLocaleString()} words)`);
      setFileHandle(null); // plain FileReader — no write access
    };
    reader.onerror = () => setFileError("Failed to read file.");
    reader.readAsText(file);
  }, []);

  // ── File System Access API (for write-back on ban) ─────────────────────────
  const handleOpenWithFSA = useCallback(async () => {
    try {
      const [handle] = await window.showOpenFilePicker({
        types: [{ description: "Text files", accept: { "text/plain": [".txt"] } }],
      });
      const file = await handle.getFile();
      const text = await file.text();
      const words = parseWordList(text);
      if (!words.length) { setFileError("No valid 5-letter words found."); return; }
      setMasterWords(words);
      setCandidates(words);
      setGuesses([]);
      setCurrentGuess("");
      setCurrentPattern("00000");
      setBannedCount(0);
      setFileHandle(handle);
      setWordListName(`${file.name} (${words.length.toLocaleString()} words) ✏️`);
      setFileError(null);
    } catch (err) {
      if (err.name !== "AbortError") setFileError("Could not open file.");
    }
  }, []);

  function parseWordList(text) {
    return [...new Set(
      text.split(/\r?\n/).map(w => w.trim().toLowerCase()).filter(w => /^[a-z]{5}$/.test(w))
    )];
  }

  // ── Write banned word back to file ────────────────────────────────────────
  const writeBackFile = useCallback(async (newWords) => {
    if (!fileHandle) return;
    try {
      const writable = await fileHandle.createWritable();
      await writable.write(newWords.join("\n") + "\n");
      await writable.close();
    } catch (err) {
      console.warn("File write-back failed:", err);
    }
  }, [fileHandle]);

  // ── Ban suggestion ────────────────────────────────────────────────────────
  const banSuggestion = useCallback(async () => {
    if (!result?.word) return;
    const banned = result.word;
    const newMaster = masterWords.filter(w => w !== banned);
    const newCandidates = candidates.filter(w => w !== banned);
    setMasterWords(newMaster);
    setCandidates(newCandidates);
    setBannedCount(n => n + 1);
    if (fileHandle) await writeBackFile(newMaster);
  }, [result, masterWords, candidates, fileHandle, writeBackFile]);

  const useSuggestion = () => {
    if (result?.word) setCurrentGuess(result.word.toUpperCase());
  };

  // ── Submit guess ──────────────────────────────────────────────────────────
  const handleSubmit = useCallback(() => {
    if (!currentGuess || currentGuess.length !== 5) return;
    const word = currentGuess.toLowerCase();
    setGuesses(g => [...g, { word, pattern: currentPattern }]);
    setCandidates(c => filterWords(c, word, currentPattern));
    setCurrentGuess("");
    setCurrentPattern("00000");
  }, [currentGuess, currentPattern]);

  const handlePatternClick = (pos) => {
    setCurrentPattern(p => {
      const a = p.split("");
      a[pos] = String((parseInt(a[pos]) + 1) % 3);
      return a.join("");
    });
  };

  const handleReset = () => {
    setCandidates(masterWords);
    setGuesses([]);
    setCurrentGuess("");
    setCurrentPattern("00000");
    setBannedCount(0);
  };

  const solved = guesses.length > 0 && guesses[guesses.length - 1].pattern === "22222";
  const fsaSupported = typeof window !== "undefined" && "showOpenFilePicker" in window;

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div style={{
      minHeight: "100vh", background: C.bg, color: C.text,
      fontFamily: "'Clear Sans','Helvetica Neue',Arial,sans-serif",
      display: "flex", flexDirection: "column", alignItems: "center",
      padding: "24px 16px",
    }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 11, letterSpacing: 4, color: C.muted, marginBottom: 4 }}>WORDLE</div>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: 2 }}>SOLVER</h1>
        <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>Three AI strategies, one interface</div>
      </div>

      {/* Mode tabs */}
      <div style={{
        display: "flex", gap: 6, marginBottom: 20,
        background: C.surface, borderRadius: 10, padding: 4,
        border: `1px solid ${C.border}`
      }}>
        {MODES.map(m => (
          <button key={m.id} onClick={() => setMode(m.id)} style={{
            padding: "7px 14px", borderRadius: 7, border: "none",
            background: mode === m.id ? m.color : "transparent",
            color: mode === m.id ? "#fff" : C.muted,
            fontSize: 12, fontWeight: 700, letterSpacing: 0.5,
            cursor: "pointer", transition: "all 0.15s", whiteSpace: "nowrap",
          }}>
            {m.label}
          </button>
        ))}
      </div>

      {/* File upload panel */}
      <div style={{
        width: "100%", maxWidth: 380, marginBottom: 16,
        background: C.surface, border: `1px solid ${wordListName ? C.green : C.border}`,
        borderRadius: 10, padding: "12px 16px",
      }}>
        <div style={{ fontSize: 10, letterSpacing: 2, color: C.muted, marginBottom: 8 }}>WORD LIST</div>
        {wordListName ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
            <span style={{ fontSize: 12, color: C.green, fontWeight: 600, flex: 1 }}>
              ✅ {wordListName}
            </span>
            <button onClick={fsaSupported ? handleOpenWithFSA : () => fileInputRef.current?.click()} style={{
              fontSize: 11, color: C.muted, background: "none",
              border: `1px solid ${C.border}`, borderRadius: 4,
              padding: "3px 8px", cursor: "pointer", whiteSpace: "nowrap",
            }}>
              Change
            </button>
          </div>
        ) : (
          <div>
            <p style={{ margin: "0 0 8px", fontSize: 12, color: C.muted, lineHeight: 1.5 }}>
              Upload a <code style={{ color: C.text }}>.txt</code> file — one 5-letter word per line.
              {fsaSupported && <span style={{ color: C.blue }}> Use the button below for edit access so banned words are saved back to the file.</span>}
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              {fsaSupported && (
                <button onClick={handleOpenWithFSA} style={{
                  flex: 1, padding: "9px 0", background: C.blue, border: "none",
                  color: "#fff", borderRadius: 6, cursor: "pointer",
                  fontSize: 12, fontWeight: 700, letterSpacing: 0.5,
                }}>
                  📂 Open with edit access
                </button>
              )}
              <button onClick={() => fileInputRef.current?.click()} style={{
                flex: 1, padding: "9px 0", background: "transparent",
                border: `1px dashed ${C.border}`, color: C.text,
                borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: 600,
              }}>
                {fsaSupported ? "Read-only upload" : "📂 Upload word list"}
              </button>
            </div>
          </div>
        )}
        {fileError && <div style={{ marginTop: 8, fontSize: 11, color: C.red }}>⚠️ {fileError}</div>}
        {bannedCount > 0 && (
          <div style={{ marginTop: 8, fontSize: 11, color: C.muted }}>
            🚫 {bannedCount} word{bannedCount > 1 ? "s" : ""} banned
            {fileHandle ? " — saved to file ✅" : " (open with edit access to save to file)"}
          </div>
        )}
        <input ref={fileInputRef} type="file" accept=".txt,text/plain"
          onChange={handleFileInput} style={{ display: "none" }} />
      </div>

      {/* Stats bar */}
      <div style={{
        display: "flex", gap: 20, marginBottom: 20,
        background: C.surface, borderRadius: 8, padding: "12px 20px",
        border: `1px solid ${C.border}`, fontSize: 13,
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ color: C.muted, fontSize: 10, letterSpacing: 1 }}>CANDIDATES</div>
          <div style={{ fontWeight: 700, fontSize: 20, color: candidates.length < 10 ? C.green : C.text }}>
            {candidates.length}
          </div>
        </div>
        <div style={{ width: 1, background: C.border }} />
        <div style={{ textAlign: "center" }}>
          <div style={{ color: C.muted, fontSize: 10, letterSpacing: 1 }}>GUESSES</div>
          <div style={{ fontWeight: 700, fontSize: 20 }}>{guesses.length}/6</div>
        </div>
        <div style={{ width: 1, background: C.border }} />
        <div style={{ textAlign: "center" }}>
          <div style={{ color: C.muted, fontSize: 10, letterSpacing: 1 }}>STRATEGY</div>
          <div style={{ fontWeight: 700, fontSize: 13, color: MODES.find(m => m.id === mode)?.color }}>
            {MODES.find(m => m.id === mode)?.label}
          </div>
        </div>
      </div>

      {/* Guess history */}
      {guesses.length > 0 && (
        <div style={{ marginBottom: 20, display: "flex", flexDirection: "column", gap: 6 }}>
          {guesses.map((g, i) => (
            <div key={i} style={{ display: "flex", gap: 6 }}>
              {g.word.split("").map((letter, j) => (
                <div key={j} style={{
                  width: 48, height: 48, background: patternBg(g.pattern[j]),
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 20, fontWeight: 700, borderRadius: 4,
                  boxShadow: g.pattern[j] !== "0" ? `0 0 12px ${patternBg(g.pattern[j])}44` : "none"
                }}>
                  {letter.toUpperCase()}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Solved */}
      {solved && (
        <div style={{
          padding: "12px 24px", background: C.green, borderRadius: 8,
          fontWeight: 700, fontSize: 16, letterSpacing: 2, marginBottom: 20
        }}>
          🎉 SOLVED IN {guesses.length} GUESSES
        </div>
      )}

      {/* Suggestion + stats */}
      {!solved && (
        <div style={{
          background: C.surface, border: `1px solid ${C.border}`,
          borderRadius: 12, padding: "16px 20px", marginBottom: 16,
          width: "100%", maxWidth: 380,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 2, color: C.muted, marginBottom: 8 }}>
            {mode.toUpperCase()} SUGGESTION
          </div>

          {thinking ? (
            <div style={{ color: C.muted, fontSize: 14, textAlign: "center", padding: "12px 0" }}>
              Thinking...
            </div>
          ) : result?.word ? (
            <>
              {/* Word */}
              <div style={{
                fontSize: 36, fontWeight: 700, letterSpacing: 10,
                color: MODES.find(m => m.id === mode)?.color,
                textAlign: "center", marginBottom: 12,
              }}>
                {result.word.toUpperCase()}
              </div>

              {/* Action buttons */}
              <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 16 }}>
                <button onClick={useSuggestion} style={{
                  padding: "8px 20px", background: C.green, border: "none",
                  color: "#fff", borderRadius: 6, cursor: "pointer",
                  fontSize: 12, fontWeight: 700, letterSpacing: 1,
                }}>
                  USE THIS WORD
                </button>
                <button onClick={banSuggestion} style={{
                  padding: "8px 14px", background: "transparent",
                  border: `1px solid ${C.red}`, color: C.red,
                  borderRadius: 6, cursor: "pointer",
                  fontSize: 12, fontWeight: 700, letterSpacing: 1,
                }}>
                  NOT IN LIST
                </button>
              </div>

              {/* Per-solver stats */}
              <div style={{
                background: C.bg, borderRadius: 8, padding: "12px 14px",
                border: `1px solid ${C.border}`,
              }}>
                <div style={{ fontSize: 10, letterSpacing: 2, color: C.muted, marginBottom: 10 }}>
                  DECISION STATS
                </div>

                {mode === "entropy" && result.stats && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <StatRow label="Info bits (entropy)" value={result.stats.infoBits} color={C.green} />
                    <StatRow label="Avg candidate reduction" value={result.stats.avgReduction} color={C.green} />
                    <StatRow label="Worst-case guesses left" value={result.stats.worstCase} color={C.muted} />
                    <TopWords words={result.stats.topCandidates} label="Top candidates by entropy" color={C.green} />
                  </div>
                )}

                {mode === "lookahead" && result.stats && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <StatRow label="Combined score" value={result.stats.combinedScore} color={C.blue} />
                    <StatRow label="Base entropy" value={result.stats.baseEntropy} color={C.green} />
                    <StatRow label="Future bonus" value={result.stats.futureBonus} color={C.blue} />
                    <StatRow label="Planning" value={result.stats.planningDepth} color={C.muted} small />
                    <TopWords words={result.stats.topCandidates} label="Top candidates by combined score" color={C.blue} />
                  </div>
                )}

                {mode === "markov" && result.stats && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <StatRow label="Markov score (log-prob)" value={result.stats.markovScore} color={C.purple} />
                    <StatRow label="Model" value={result.stats.model} color={C.muted} small />
                    {result.stats.wordBigrams?.length > 0 && (
                      <div>
                        <div style={{ fontSize: 10, color: C.muted, marginBottom: 4 }}>BIGRAMS IN THIS WORD</div>
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                          {result.stats.wordBigrams.map(({ bigram, freq }) => (
                            <span key={bigram} style={{
                              padding: "3px 8px", background: C.surface,
                              border: `1px solid ${C.purple}`, borderRadius: 4,
                              fontSize: 12, fontWeight: 700, color: C.purple,
                            }}>
                              {bigram} <span style={{ color: C.muted, fontWeight: 400 }}>×{freq}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {result.stats.topBigrams?.length > 0 && (
                      <div>
                        <div style={{ fontSize: 10, color: C.muted, marginBottom: 4 }}>TOP BIGRAMS IN LIST</div>
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                          {result.stats.topBigrams.map(({ bigram, freq }) => (
                            <span key={bigram} style={{
                              padding: "3px 8px", background: C.surface,
                              border: `1px solid ${C.border}`, borderRadius: 4,
                              fontSize: 12, fontWeight: 600, color: C.text,
                            }}>
                              {bigram} <span style={{ color: C.muted, fontWeight: 400 }}>×{freq}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    <TopWords words={result.stats.topCandidates} label="Top candidates by Markov score" color={C.purple} />
                  </div>
                )}
              </div>
            </>
          ) : (
            <div style={{ color: C.muted, textAlign: "center" }}>No candidates left</div>
          )}
        </div>
      )}

      {/* Input area */}
      {!solved && guesses.length < 6 && (
        <div style={{
          background: C.surface, border: `1px solid ${C.border}`,
          borderRadius: 12, padding: 20, marginBottom: 16,
          width: "100%", maxWidth: 380,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 2, color: C.muted, marginBottom: 12 }}>ENTER YOUR GUESS</div>
          <input
            value={currentGuess}
            onChange={e => setCurrentGuess(e.target.value.toUpperCase().slice(0, 5))}
            onKeyDown={e => e.key === "Enter" && handleSubmit()}
            placeholder="WORD"
            style={{
              width: "100%", background: C.bg, border: `2px solid ${C.border}`,
              color: C.text, fontSize: 22, fontWeight: 700, letterSpacing: 6,
              textAlign: "center", borderRadius: 8, padding: "10px 0",
              outline: "none", boxSizing: "border-box", marginBottom: 16,
              fontFamily: "inherit",
            }}
          />
          <div style={{ fontSize: 10, letterSpacing: 2, color: C.muted, marginBottom: 8 }}>
            CLICK TILES TO SET COLORS
          </div>
          <div style={{ display: "flex", gap: 6, marginBottom: 10, justifyContent: "center" }}>
            {currentPattern.split("").map((val, i) => (
              <button key={i} onClick={() => handlePatternClick(i)} style={{
                width: 48, height: 48, background: patternBg(val),
                border: `2px solid ${patternBg(val)}`, color: "#fff",
                fontSize: 18, fontWeight: 700, borderRadius: 4, cursor: "pointer",
                boxShadow: val !== "0" ? `0 0 10px ${patternBg(val)}66` : "none",
              }}>
                {currentGuess[i] || "?"}
              </button>
            ))}
          </div>
          <div style={{ fontSize: 10, color: C.muted, marginBottom: 14, textAlign: "center" }}>
            ⬜ Gray → 🟨 Yellow → 🟩 Green
          </div>
          <button onClick={handleSubmit} style={{
            width: "100%", padding: "12px 0", background: C.green,
            border: "none", color: "#fff", borderRadius: 8, cursor: "pointer",
            fontSize: 14, fontWeight: 700, letterSpacing: 2,
            opacity: currentGuess.length === 5 ? 1 : 0.4,
            transition: "opacity 0.15s",
          }}>
            SUBMIT GUESS
          </button>
        </div>
      )}

      {/* Remaining candidates */}
      {candidates.length <= 20 && candidates.length > 0 && !solved && (
        <div style={{
          background: C.surface, border: `1px solid ${C.border}`,
          borderRadius: 12, padding: 16, marginBottom: 16,
          width: "100%", maxWidth: 380,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 2, color: C.muted, marginBottom: 10 }}>
            REMAINING CANDIDATES
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {candidates.map(w => (
              <span key={w} onClick={() => setCurrentGuess(w.toUpperCase())} style={{
                padding: "4px 10px", background: C.bg,
                border: `1px solid ${C.border}`, borderRadius: 6,
                fontSize: 13, fontWeight: 600, letterSpacing: 1, cursor: "pointer",
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = C.green}
                onMouseLeave={e => e.currentTarget.style.borderColor = C.border}
              >
                {w.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Reset */}
      <button onClick={handleReset} style={{
        padding: "10px 28px", background: "transparent",
        border: `1px solid ${C.border}`, color: C.muted,
        borderRadius: 8, cursor: "pointer", fontSize: 12,
        letterSpacing: 2, fontWeight: 600,
      }}>
        RESET
      </button>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function StatRow({ label, value, color, small }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ fontSize: 11, color: C.muted }}>{label}</span>
      <span style={{ fontSize: small ? 11 : 14, fontWeight: 700, color, maxWidth: 180, textAlign: "right" }}>
        {value}
      </span>
    </div>
  );
}

function TopWords({ words, label, color }) {
  if (!words?.length) return null;
  return (
    <div>
      <div style={{ fontSize: 10, color: C.muted, marginBottom: 6 }}>{label.toUpperCase()}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {words.map(({ word, score }, i) => (
          <div key={word} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 10, color: C.muted, width: 14 }}>{i + 1}.</span>
              <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: 2 }}>{word.toUpperCase()}</span>
            </div>
            <span style={{ fontSize: 12, color, fontWeight: 600 }}>{score}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
