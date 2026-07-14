import { useState, useEffect, useCallback, useRef } from "react";

// ─── DAILY PUZZLES ────────────────────────────────────────────────────────────
const PUZZLES = {
  "2026-05-05": {
    rounds: [
      { clue: "A group of Lions",                              answer: "PRIDE" },
      { clue: "Austrian capital",                              answer: "VIENNA" },
      { clue: "Which metal is liquid at room temperature?",    answer: "MERCURY" },
      { clue: "Which organ produces insulin?",                 answer: "PANCREAS" },
      { clue: "When an animal sleeps for the winter they..",   answer: "HIBERNATE" },
    ],
    anagram: { letters:["A","Y","R","V","E","R","B"], answer:"BRAVERY", clue:"noun · great courage in the face of danger or difficulty" },
    quote: `Van Diemen's land is a hell for a man
To end out his whole life in slavery
Where the climate is raw and the gun makes the law
Neither wind nor rain care for BRAVERY

Oh, oh, I wish I was back home in Derry
— Bobby Sands
🎬 https://youtu.be/c5_wZmTHfo8?si=7Q1lzn9HKFDJ26cD`,
  },
  "2026-05-17": {
    rounds: [
      { clue: "Long, deep inlet with steep sides formed by glacial erosion", answer: "FJORD", connection: "Norway has over 1,000 fjords — the longest stretches 204km inland" },
      { clue: "Title of a famous expressionist painting by Munch is 'The ......'", answer: "SCREAM", connection: "Edvard Munch was Norwegian — The Scream is one of the most recognised paintings ever" },
      { clue: "Surname of a modern Norwegian world chess champion",          answer: "CARLSEN",     connection: "Magnus Carlsen from Norway became world chess champion aged just 22" },
      { clue: "Word that comes before 'lights' in a famous sky display",     answer: "NORTHERN",     connection: "The Northern Lights are best seen in Norway — a natural wonder" },
      { clue: "Natural resource refined into fuels and plastics",            answer: "PETROLEUM",     connection: "Norway is one of the world's largest oil exporters" },
    ],
    anagram: { letters:["D","R","M","E","E","F","O"], answer:"FREEDOM", clue:"noun · the power to act, speak or think without restraint" },
    quote: `"Norway's Constitution was signed at Eidsvoll on May 17th 1814 — today is Syttende Mai, Norway's national day, when a great nation can celebrate its independence and FREEDOM. 🇳🇴

🔗 https://geographyworlds.com/blog/facts-about-norway/"`,
  },
  "2026-05-16": {
    rounds: [
      { clue: "What word comes after 'Palm' and before 'Body'?",       answer: "BEACH",    connection: "The Beach Boys — named after the California beach culture they embodied" },
      { clue: "What is the volleyball called in the movie Cast Away?", answer: "WILSON",connection: "Brian Wilson — the genius who wrote and produced Pet Sounds" },
      { clue: "Male family member",                                    answer: "BROTHER",    connection: "Brother Records — the label the Beach Boys founded in 1966, the same year as Pet Sounds" },
      { clue: "Vocal music performed without instruments is called a...?", answer: "CAPPELLA", connection: "The Beach Boys were famous for their extraordinary a cappella harmonies" },
      { clue: "Long buoyant fiberglass craft ridden on ocean waves",   answer: "SURFBOARD",    connection: "Surfing was the heart of the early Beach Boys sound and image" },
    ],
    anagram: { letters:["A","N","W","S","E","R"], answer:"ANSWER", clue:"noun · a response given in reaction to a question or problem" },
    quote: `"I Know There's An ANSWER — but I have to find it myself."

'I Know There's An Answer' is a song from The Beach Boys' Pet Sounds, released on this day, May 16th 1966 🏄
Widely considered one of the greatest albums ever made.
🎬 https://youtu.be/nSAoEf1Ib58?si=zDfLMU9tqCFKVWM3`,
  },
  "2026-05-15": {
    rounds: [
      { clue: "Belief held without proof",                               answer: "FAITH", connection: "A recurring theme throughout Dickinson's poetry" },
      { clue: "The physical world and its living things",                answer: "NATURE",   connection: "Dickinson found God and deep meaning in the natural world" },
      { clue: "Achievement of a desired aim",                            answer: "SUCCESS",       connection: '"Success is counted sweetest" — one of her most famous poems' },
      { clue: "The state of being alone",                                answer: "SOLITUDE",       connection: "Dickinson lived as a recluse, rarely leaving her home" },
      { clue: "Something that is mysterious, puzzling, or difficult to understand", answer: "ENIGMATIC", connection: "Her life and poetry remain deeply mysterious to this day" },
    ],
    anagram: { letters:["H","E","T","F","E","A","R","S"], answer:"FEATHERS", clue:"Soft, lightweight structures forming the outer covering of birds" },
    quote: `On This Day, Emily Dickinson died, May 15th 1886 🕊️

"Hope" is the thing with FEATHERS —
That perches in the soul —
And sings the tune without the words —
And never stops — at all —

— Emily Dickinson
🔗 https://www.poetryfoundation.org/poems/42889/hope-is-the-thing-with-feathers-314`,
  },
  "2026-05-14": {
    rounds: [
      { clue: "Largest species of cat",                               answer: "TIGER" },
      { clue: "To go after or come behind something or someone",      answer: "FOLLOW" },
      { clue: "Which ship sank in 1912?",                             answer: "TITANIC" },
      { clue: "First female UK Prime Minister, surname",              answer: "THATCHER" },
      { clue: "A person who travels to space",                        answer: "ASTRONAUT" },
    ],
    anagram: { letters:["H","I","L","L","R","T"], answer:"THRILL", clue:"To cause someone to feel delight or exhilaration" },
    quote: `"The THRILL is gone, baby
The thrill is gone away
Someday I know I'll be over it all, baby
Just like I know a man should"

— The Thrill is Gone, BB King
BB King died on this day, May 14th 2015 🎸
🎬 https://youtu.be/SgXSomPE_FY?si=M5h9_Xft4mzkXzZC`,
  },
  "2026-05-13": {
    rounds: [
      { clue: "What word comes after 'Bruce' and before 'Rooney'?",       answer: "WAYNE" },
      { clue: "What you get when you mix red and blue",                   answer: "PURPLE" },
      { clue: "Dickens, Orwell and Hemingway's job title",               answer: "NOVELIST" },
      { clue: "A perfect example or embodiment of a quality or type",    answer: "EPITOME" },
      { clue: "A flash of bright light from an electrical storm",        answer: "LIGHTNING" },
    ],
    anagram: { letters:["N","I","T","I","G","W","R"], answer:"WRITING", clue:"noun · the activity of putting words on paper" },
    quote: `"Very superstitious, WRITING's on the wall
Very superstitious, ladders 'bout to fall"

— Superstition, Stevie Wonder
Stevie Wonder was born on this day, May 13th 1950 🎹
🎬 https://youtu.be/97hwNY3ni10?si=VUBjC0fQkZfZbedD`,
  },
  "2026-05-12": {
    rounds: [
      { clue: "US President before Trump",                               answer: "OBAMA" },
      { clue: "A narrow water passage connecting two seas",              answer: "STRAIT" },
      { clue: "A person who travels for pleasure",                       answer: "TOURIST" },
      { clue: "Not joined or touching; to move apart",                   answer: "SEPARATE" },
      { clue: "Which gland regulates hormone production?",               answer: "PITUITARY" },
    ],
    anagram: { letters:["S","R","I","M","Y","E"], answer:"MISERY", clue:"noun · a state of great distress or discomfort" },
    quote: `"Am I happy or in MISERY?
Whatever it is, that girl put a spell on me"

— Purple Haze, Jimi Hendrix
"Are You Experienced" was released on this day in 1967 🎸
🎬 https://youtu.be/cJunCsrhJjg?si=TBhRrwnVOdv0QQgi`,
  },
  "2026-05-11": {
    rounds: [
      { clue: "What is the surname of Walter in Breaking Bad?",          answer: "WHITE" },
      { clue: "What is the capital of Albania?",                         answer: "TIRANA" },
      { clue: "Which scientist discovered penicillin?",                  answer: "FLEMING" },
      { clue: "Which Norwegian explorer reached the South Pole first?",  answer: "AMUNDSEN" },
      { clue: "To cause someone to feel awkward or self-conscious",      answer: "EMBARRASS" },
    ],
    anagram: { letters:["N","W","R","I","N","E"], answer:"WINNER", clue:"Not a loser" },
    quote: `"When I meet you around the corner
You make me feel like a sweepstake WINNER"

— Satisfy My Soul, Bob Marley
Bob Marley died on this day, May 11th 1981. Gone but never forgotten. 🌿
🎬 https://youtu.be/2NUd5yrb3cM?si=sjZBqHAItnoBD0qM`,
  },
  "2026-05-10": {
    rounds: [
      { clue: "A space under the roof of a house",                      answer: "ATTIC" },
      { clue: "Secret → _ _ _ _ _ _ ← Gnome",                          answer: "GARDEN" },
      { clue: "Iraq's capital",                                          answer: "BAGHDAD" },
      { clue: "Who discovered America in 1492?",                         answer: "COLUMBUS" },
      { clue: "Which gland regulates hormone production?",               answer: "PITUITARY" },
    ],
    anagram: { letters:["T","A","U","D","T","E","T","I"], answer:"ATTITUDE", clue:"noun · a settled way of thinking or feeling about something" },
    quote: `"Everything can be taken from a man but one thing: the last of the human freedoms — to choose one's ATTITUDE in any given set of circumstances." — Viktor Frankl, Man's Search for Meaning`,
  },
  "2026-05-09": {
    rounds: [
      { clue: "A fruit for cider",                                       answer: "APPLE" },
      { clue: "A large area filled with trees",                          answer: "FOREST" },
      { clue: "Lithuania's capital",                                     answer: "VILNIUS" },
      { clue: "First name of the singer who sang Happy",                 answer: "PHARRELL" },
      { clue: "London Hotspurs",                                         answer: "TOTTENHAM" },
    ],
    anagram: { letters:["R","S","E","U","F","E"], answer:"REFUSE", clue:"verb · to indicate you are not willing to do something" },
    quote: `"But maybe that's just the price you pay for the chains you REFUSE

— Bees Wing, Richard Thompson
🎬 https://youtu.be/unu79PP2Klo?si=k-wVZNKo2j0kSPQL`,
  },
  "2026-05-08": {
    rounds: [
      { clue: "Which organ pumps blood around the body?",               answer: "HEART" },
      { clue: "What is the capital of Cuba?",                            answer: "HAVANA" },
      { clue: "Tennessee → _ _ _ _ _ _ _ ← in the jar",                answer: "WHISKEY" },
      { clue: "What is the study of heredity?",                          answer: "GENETICS" },
      { clue: "Aware of and responding to one's surroundings",           answer: "CONSCIOUS" },
    ],
    anagram: { letters:["V","O","T","Y","R","I","C"], answer:"VICTORY", clue:"noun · success in a struggle or contest" },
    quote: `"VICTORY in Europe Day celebrates the formal surrender of Nazi Germany on 8 May 1945 — 80 years ago today. The day the world breathed again.

🔗 https://en.wikipedia.org/wiki/Victory_in_Europe_Day`,
  },
  "2026-05-07": {
    rounds: [
      { clue: "What city are last year's Champions League winners from?", answer: "PARIS" },
      { clue: "Which planet has the most visible rings?",                answer: "SATURN" },
      { clue: "Silent Chaplin",                                          answer: "CHARLIE" },
      { clue: "Proud, insolent, overbearing, disdainful",               answer: "ARROGANT" },
      { clue: "What is the capital of Iceland?",                         answer: "REYKJAVIK" },
    ],
    anagram: { letters:["R","O","A","E","C","G","U"], answer:"COURAGE", clue:"noun · the ability to do something that frightens you" },
    quote: `"Courage doesn't always roar. Sometimes COURAGE is the little voice at the end of the day that says I'll try again tomorrow." — Mary Anne Radmacher`,
  },
  "2026-05-06": {
    rounds: [
      { clue: "What is the name for molten rock?",                      answer: "MAGMA" },
      { clue: "What's a group of geese called?",                        answer: "GAGGLE" },
      { clue: "China's capital?",                                        answer: "BEIJING" },
      { clue: "What is the main gas in Earth's atmosphere?",            answer: "NITROGEN" },
      { clue: "Group combined to promote a common interest",            answer: "SYNDICATE" },
    ],
    anagram: { letters:["I","S","R","A","N","T","E","N","B"], answer:"BANNISTER", clue:"First sub four minute miler" },
    quote: `"The man who can drive himself further once the effort gets painful is the man who will win." — Roger BANNISTER

🔗 https://www.guinnessworldrecords.com/records/hall-of-fame/first-sub-four-minute-mile`,
  },

  "2026-05-18": {
    rounds: [
      { clue: "A vegetable made of layers, often used in cooking",      answer: "ONION",    connection: "Shrek famously says ogres are like onions — they have layers" },
      { clue: "A hoofed animal known for its braying call",             answer: "DONKEY",        connection: "Donkey is Shrek's fast-talking, loveable companion" },
      { clue: "Surname of the director who made Titanic",               answer: "CAMERON",connection: "Cameron Diaz voiced Princess Fiona in Shrek" },
      { clue: "A royal title for the daughter of a king or queen",      answer: "PRINCESS",    connection: "Princess Fiona — the film's feisty heroine" },
      { clue: "Technique creating movement from drawn or digital images",answer: "ANIMATION",   connection: "Shrek was a landmark in computer animation history" },
    ],
    anagram: { letters:["A","O","R","N","C","M","E"], answer:"ROMANCE", clue:"A love story — at the heart of every fairytale" },
    quote: `"Behind the onions, dragons and donkeys lies a story of ROMANCE.

Shrek premiered at the Cannes Film Festival on this day in 2001 🧅
🎬 https://youtu.be/CwXOrWvPBPk?si=_cu4W5-Wryfir7JD`,
  },
  "2026-05-19": {
    rounds: [
      { clue: "Holy city in Saudi Arabia that Muslims face during prayer", answer: "MECCA",  connection: "His transformative Hajj pilgrimage to Mecca changed his worldview" },
      { clue: "What word comes after 'Stuart' and before 'League'?",    answer: "LITTLE",    connection: "Little was his birth surname — before he replaced it with X" },
      { clue: "Concept of fair treatment and lawful judgment",           answer: "JUSTICE",    connection: "Justice for Black Americans was his life's mission" },
      { clue: "US state and title of a Bruce Springsteen album",         answer: "NEBRASKA",        connection: "Malcolm X was born in Omaha, Nebraska in 1925" },
      { clue: "Killers who target prominent figures for political reasons",answer: "ASSASSINS",   connection: "He was shot by assassins at the Audubon Ballroom in 1965" },
    ],
    anagram: { letters:["T","I","R","C","S","C","I"], answer:"CRITICS", clue:"Those who judge or find fault" },
    quote: `"If you have no CRITICS you'll likely have no success."

— Malcolm X
Malcolm X was born on this day, May 19th 1925 ✊
🔗 https://www.malcolmx.com/quotes/`,
  },
  "2026-05-20": {
    rounds: [
      { clue: "Facial hair grown on the chin and cheeks",               answer: "BEARD",        connection: "Letterman's trademark beard after he retired from the Late Show" },
      { clue: "Surname of the Ace Ventura actor",                       answer: "CARREY",        connection: "Jim Carrey made memorable appearances on Letterman's show" },
      { clue: "What word comes after 'Eerie' and before 'Jones'?",      answer: "INDIANA",    connection: "Letterman was born and raised in Indiana" },
      { clue: "1997 mega hit by Foo Fighters",                          answer: "EVERLONG",        connection: "Foo Fighters played Everlong on his final Late Show — an iconic moment" },
      { clue: "Performers who specialise in making people laugh",        answer: "COMEDIANS",    connection: "Letterman launched and supported countless comedy careers" },
    ],
    anagram: { letters:["O","I","N","Y","R"], answer:"IRONY", clue:"A situation where the outcome is the opposite of what is expected" },
    quote: `"David Letterman — who redefined American talk shows with his unconventional humour, IRONY and innovative segments — stepped down as host of the Late Show on this day, May 20th 2015. 📺

🎬 https://youtu.be/ss8OsSzdgiE?si=WH8OEsmb19mIwG9w`,
  },
  "2026-05-21": {
    rounds: [
      { clue: "A common male name given to French kings",                answer: "LOUIS",  connection: "The Spirit of St Louis was the name of Lindbergh's plane" },
      { clue: "To take someone away illegally",                         answer: "KIDNAP",        connection: "The Lindbergh baby kidnapping in 1932 shocked the world" },
      { clue: "The study of past events",                               answer: "HISTORY",        connection: "His solo Atlantic flight became aviation history" },
      { clue: "Ocean separating Europe from the Americas",              answer: "ATLANTIC",    connection: "He was the first to fly solo nonstop across the Atlantic" },
      { clue: "A person who introduces new ideas or methods",           answer: "INNOVATOR",    connection: "He was a pioneer in early aviation and later became a writer" },
    ],
    anagram: { letters:["I","O","P","T","L"], answer:"PILOT", clue:"A person who flies an aircraft" },
    quote: `"Charles Lindbergh — PILOT, adventurer, legend — completed the first nonstop solo transatlantic flight on this day, May 21st 1927. ✈️

New York to Paris. 33 hours. Alone.
🎬 https://youtu.be/7hMBJyNbpBs?si=ivAX40_UiJ_e_kTg`,
  },
  "2026-05-22": {
    rounds: [
      { clue: "A craftsperson who shapes metal by heating, hammering, and forging it into tools, objects, or art", answer: "SMITH",  connection: "The Smiths — the iconic Manchester band Morrissey fronted" },
      { clue: "Instantly recognisable and widely celebrated",           answer: "ICONIC",  connection: "Morrissey became one of Britain's most iconic and controversial figures" },
      { clue: "Ireland's patron saint",                                 answer: "PATRICK",    connection: "Steven Patrick Morrissey — Patrick is his middle name!" },
      { clue: "Pleasant or attractive in manner",                       answer: "CHARMING",    connection: "This Charming Man — one of The Smiths' most beloved songs" },
      { clue: "Very unhappy or uncomfortable",                          answer: "MISERABLE",    connection: "Heaven Knows I'm Miserable Now — a classic Smiths anthem" },
    ],
    anagram: { letters:["A","N","T","G","S"], answer:"ANGST", clue:"A deep, anxious feeling of dread or worry, often about life, identity, or the future" },
    quote: `"You shut your mouth, how can you say
I go about things the wrong way?
I am human and I need to be loved
Just like everybody else does"

— How Soon Is Now?, The Smiths
The music of The Smiths was filled with ANGST, longing and dark humour. Morrissey was born on this day, May 22nd 1959 🌹
🎬 https://youtu.be/hnpILIIo9ek?si=jAn0oSWuqRNKrDyO`,
  },
  "2026-05-23": {
    rounds: [
      { clue: "US state known for oil and cowboy culture",              answer: "TEXAS",  connection: "Bonnie and Clyde carried out many of their robberies across Texas" },
      { clue: "A network of interconnected tunnels built by rabbits",    answer: "WARREN",        connection: "Warren Beatty played Clyde Barrow in the classic 1967 film" },
      { clue: "Rebels or rule-breakers who reject authority",           answer: "OUTLAWS",    connection: "Bonnie and Clyde were America's most notorious outlaws" },
      { clue: "Well known for a bad reason",                            answer: "INFAMOUS",    connection: "Their violent robberies made them infamous across the nation" },
      { clue: "What word comes after 'Queen' and before 'Hurley'?",  answer: "ELIZABETH",    connection: "Bonnie Elizabeth Parker was Bonnie's full name" },
    ],
    anagram: { letters:["A","S","S","W","L","L","E"], answer:"LAWLESS", clue:"Operating without regard for the law" },
    quote: `"They're young, they're in love, and they kill people."

Bonnie Parker and Clyde Barrow — America's most LAWLESS couple — were ambushed and killed on this day, May 23rd 1934 🔫
🔗 https://en.wikipedia.org/wiki/Bonnie_and_Clyde`,
  },
  "2026-05-24": {
    rounds: [
      { clue: "Mailman from Cheers, or a steep face of rock",            answer: "CLIFF",    connection: "Cliff Richard finished second for the UK with Congratulations" },
      { clue: "Scandinavian nation famous for IKEA",                    answer: "SWEDEN",        connection: "Sweden has won Eurovision more times than any other country" },
      { clue: "Virgin Mary or Vogue pop star?",                         answer: "MADONNA",    connection: "Madonna performed at the Tel Aviv Eurovision in 2019" },
      { clue: "Which battle ended Napoleon's rule?",                    answer: "WATERLOO",        connection: "Waterloo launched ABBA to global superstardom" },
      { clue: "Highly detailed and intricate in design",                answer: "ELABORATE",       connection: "Eurovision is famous for its elaborate costumes and staging" },
    ],
    anagram: { letters:["D","B","A","L","L","A"], answer:"BALLAD", clue:"A narrative poem or song that tells a story in simple, rhythmic language" },
    quote: `"The first Eurovision Song Contest was held in Lugano, Switzerland in 1956. It became the world's most watched live event — a spectacular celebration of music, drama and BALLAD. 🎤

Making stars out of ABBA in 1974.
🎬 https://youtu.be/Sj_9CiNkkn4`,
  },
  "2026-05-25": {
    rounds: [
      { clue: "A small rabbit",                                         answer: "BUNNY",        connection: "Bunny is the kidnapped trophy wife at the centre of the plot" },
      { clue: "Seize and carry off a person by force",                  answer: "KIDNAP",        connection: "The Dude gets entangled in a fake kidnapping scheme" },
      { clue: "What word comes after 'Jeff' and before 'Of Madison County'?", answer: "BRIDGES", connection: "Jeff Bridges plays Jeffrey Lebowski — The Dude" },
      { clue: "A person who rejects all moral principles",              answer: "NIHILIST",        connection: "The Nihilists are three absurd, fake-kidnapper crooks — Uli, Dieter, and Franz — who 'believe in nothing'" },
      { clue: "Person of European or broadly white ethnic background",  answer: "CAUCASIAN",        connection: "The White Russian is the same cocktail as a Caucasian — The Dude's drink of choice" },
    ],
    anagram: { letters:["A","D","E","S","B","I"], answer:"ABIDES", clue:"Endures, continues, or remains in place or in a state." },
    quote: `"Smokey, this is not Vietnam. This is bowling. There are rules."

The Big Lebowski was released on this day in 1998 🎳
The Dude ABIDES.
🎬 https://youtu.be/cd-go0oBF4Y?si=9fcUXJiV6mveTase`,
  },
  "2026-05-26": {
    rounds: [
      { clue: "What word comes after 'Jazz' and before 'Free'?",        answer: "HANDS",    connection: "Jazz Hands — a playful nod to his extraordinary improvisational style" },
      { clue: "Surname of bebop saxophonist nicknamed Bird",            answer: "PARKER",    connection: "Charlie Parker was Miles Davis's collaborator and bebop pioneer" },
      { clue: "Brass instrument played with three valves",              answer: "TRUMPET",    connection: "The trumpet was Miles Davis's signature instrument" },
      { clue: "Bogotá is the capital of this country",                  answer: "COLUMBIA",    connection: "Columbia Records released many of his landmark albums" },
      { clue: "Prestigious performing arts conservatory in New York",   answer: "JUILLIARD",    connection: "He briefly attended Juilliard before joining the jazz scene" },
    ],
    anagram: { letters:["M","O","L","D","A"], answer:"MODAL", clue:"A type of auxiliary verb used to express ability, possibility, permission, obligation, or necessity" },
    quote: `"I'm always thinking about creating. My future starts when I wake up every morning."

Miles Dewey Davis III — trumpeter, bandleader, MODAL jazz pioneer — born on this day, May 26th 1926 🎺
🎬 https://youtu.be/zqNTltOGh5c?si=1GYES5e4LofrBnGh`,
  },
  "2026-05-27": {
    rounds: [
      { clue: "Weather condition with low visibility",                   answer: "FOGGY",    connection: "The bridge is famously shrouded in fog — a breathtaking sight" },
      { clue: "Colour between red and yellow",                          answer: "ORANGE",    connection: "Its official colour is International Orange — chosen to be visible in the fog" },
      { clue: "The flow of vehicles on a road",                         answer: "TRAFFIC",    connection: "The bridge carries over 100,000 vehicles every single day" },
      { clue: "Island prison in San Francisco Bay",                     answer: "ALCATRAZ",    connection: "Alcatraz is clearly visible from the bridge" },
      { clue: "The edge where land meets the sea",                      answer: "COASTLINE",connection: "The Golden Gate frames coastal cliffs, ocean mouth, shoreline views and tidal waters" },
    ],
    anagram: { letters:["I","C","N","I","O","C"], answer:"ICONIC", clue:"Instantly recognisable and widely admired" },
    quote: `"The Golden Gate Bridge opened on this day, May 27th 1937 — one of the most ICONIC structures ever built. 🌉
🔗 https://en.wikipedia.org/wiki/Golden_Gate_Bridge`,
  },
  "2026-05-28": {
    rounds: [
      { clue: "Confined or kept in",                                    answer: "CAGED",        connection: "I Know Why the Caged Bird Sings — her most famous autobiography" },
      { clue: "Word that comes after 'Paperback' and before 'in residence'",                             answer: "WRITER",        connection: "She was one of America's greatest writers and poets" },
      { clue: "Caribbean music style with rhythmic vocals",             answer: "CALYPSO",        connection: "She recorded a calypso album early in her extraordinary career" },
      { clue: "A person who campaigns for social change",               answer: "ACTIVIST",        connection: "She marched alongside Martin Luther King and Malcolm X" },
      { clue: "Someone who is unable to sleep",                         answer: "INSOMNIAC",        connection: "She often wrote through the night — her best work done in silence" },
    ],
    anagram: { letters:["M","I","O","S","W","D"], answer:"WISDOM", clue:"The quality of having good judgement gained through experience" },
    quote: `"You may write me down in history
With your bitter, twisted lies,
You may tread me in the very dirt
But still, like dust, I'll rise."

Still I Rise — Maya Angelou
A poet of WISDOM, courage and grace — died on this day, May 28th 2014 ✊
🔗 https://www.poetryfoundation.org/poems/46446/still-i-rise`,
  },
  "2026-05-29": {
    rounds: [
      { clue: "To move upward using hands and feet",                    answer: "CLIMB",    connection: "The first successful climb of Everest — May 29th 1953" },
      { clue: "What word comes after 'Boy' and before 'Best'?",        answer: "GEORGE",        connection: "Mount Everest is named after Sir George Everest, a British geographer" },
      { clue: "Bill Clinton's wife, first name",                        answer: "HILLARY",    connection: "Edmund Hillary — the New Zealander who first reached the summit" },
      { clue: "Range feature found in amount in disarray",           answer: "MOUNTAIN",    connection: "At 8,849 metres, Everest is Earth's highest mountain" },
      { clue: "Mountain range containing the world's highest peaks",    answer: "HIMALAYAS",        connection: "The Himalayas span five countries including Nepal and Tibet" },
    ],
    anagram: { letters:["M","M","T","I","S","U"], answer:"SUMMIT", clue:"The top or peak of something" },
    quote: `"We did not climb Everest to prove anything. We climbed it because it was there."
Edmund Hillary and Tenzing Norgay reached the summit of Mount Everest on this day, May 29th 1953 🏔️
🔗 https://en.wikipedia.org/wiki/Edmund_Hillary`,
  },
  "2026-05-30": {
    rounds: [
      { clue: "What the S stands for in PSG",                             answer: "SAINT",           connection: "Joan of Arc was canonised as a saint in 1920" },
      { clue: "What word comes after 'Pardon My' and before 'Fries'?", answer: "FRENCH",         connection: "Joan of Arc was French — a peasant girl who became a national hero" },
      { clue: "French city whose name comes after ‘New’ across the Atlantic", answer: "ORLEANS",  connection: "The Siege of Orleans was her greatest military victory" },
      { clue: "Adherent of the church led by the Pope",                 answer: "CATHOLIC",    connection: "Her deep Catholic faith drove everything she did" },
      { clue: "Carrying out a death sentence",                          answer: "EXECUTION",    connection: "She was burned at the stake in Rouen on May 30th 1431" },
    ],
    anagram: { letters:["E","H","N","I","R","E","O"], answer:"HEROINE", clue:"A woman admired for her courage and noble qualities" },
    quote: `"I am not afraid. I was born to do this."

Joan of Arc — the ultimate HEROINE — was executed in Rouen on this day, May 30th 1431. ⚔️
A patron saint of France, honored as a defender of the French nation.
🔗 https://en.wikipedia.org/wiki/Joan_of_Arc`,
  },
  "2026-05-31": {
    rounds: [
      { clue: "Not clean",                                              answer: "DIRTY",    connection: "Dirty Harry — one of Eastwood's most iconic roles" },
      { clue: "Basic unit of currency in Australia",                    answer: "DOLLAR",        connection: "A Fistful of Dollars — his breakthrough Spaghetti Western" },
      { clue: "Characters in the post",                                 answer: "LETTERS",        connection: "Letters from Iwo Jima — a film he directed" },
      { clue: "Someone who rejects tradition and acts independently, often in a rebellious way", answer: "RENEGADE", connection: "Unforgiven — his Oscar-winning Western about outlaws and renegades" },
      { clue: "Life or existence beyond death",                         answer: "HEREAFTER",  connection: "Hereafter — another film he directed" },
    ],
    anagram: { letters:["I","F","R","T","E","O","R","N"], answer:"FRONTIER", clue:"The wild, lawless edge of civilisation" },
    quote: `"There's a rebel lying deep in my soul. Anytime anybody tells me the trend is such and such, I go the opposite direction."

— Clint Eastwood, born on this day, May 31st 1930 🤠
Hollywood's greatest FRONTIER man.
🎬 https://youtu.be/WCN5JJY_wiA?si=kkcOzLIpyWZDT48M`,
  },

  "2026-06-01": {
    rounds: [
      { clue: "Sweet crystalline substance",                            answer: "SUGAR",      connection: "SUGAR — Her character in Some Like It Hot" },
      { clue: "Light-coloured hair",                                    answer: "BLONDE",     connection: "BLONDE — Her signature look" },
      { clue: "Black mixture used for paving roads",                    answer: "ASPHALT",    connection: "ASPHALT — Early film appearance in The Asphalt Jungle (1950)" },
      { clue: "Surname of Legendary New York Yankees center fielder",              answer: "DIMAGGIO",   connection: "DIMAGGIO — Her husband" },
      { clue: "Polite term for males — perhaps on a toilet door",       answer: "GENTLEMEN",  connection: "GENTLEMEN — Gentlemen Prefer Blondes" },
    ],
    anagram: { letters:["G","A","M","L","O","R","U"], answer:"GLAMOUR", clue:"An attractive, captivating quality that makes someone seem fascinating or alluring" },
    quote: `Marilyn Monroe, born in 1926, became a symbol of Hollywood GLAMOUR and later the superstar of Some Like It Hot 🌟
🎬 https://youtu.be/97TYs2YXbJw?si=q9LHBs_1kLr6nSjB`,
  },

  "2026-06-02": {
    rounds: [
      { clue: "Informal term for someone who pries",                    answer: "SNOOP",      connection: "SNOOP — Character in the series" },
      { clue: "Small in size",                                          answer: "LITTLE",     connection: "LITTLE — Omar Little" },
      { clue: "Popular Irish whiskey brand",                            answer: "JAMESON",    connection: "JAMESON — McNulty\'s drink" },
      { clue: "Widespread outbreak of disease",                         answer: "PANDEMIC",   connection: "PANDEMIC — Codename for the drugs they were selling on the street" },
      { clue: "Major city in Maryland, home of the Ravens",             answer: "BALTIMORE",  connection: "BALTIMORE — Setting of the series" },
    ],
    anagram: { letters:["D","I","R","S","L","E","O"], answer:"SOLDIER", clue:"A person who serves in an army" },
    quote: `The Wire debuted on this day in 2002, introducing Omar Little — a street SOLDIER whose warning, "You come at the king, you best not miss," became one of television\'s most iconic lines. 📺
🎬 https://youtu.be/w7gGsZNQRyQ?si=eo9KQYNK6Fgb2AQz`,
  },

  "2026-06-03": {
    rounds: [
      { clue: "Major world religion",                                   answer: "ISLAM",      connection: "ISLAM — His faith" },
      { clue: "Loud, deep, continuous sound",                           answer: "RUMBLE",     connection: "RUMBLE — His legendary fight" },
      { clue: "Person in charge of a building work crew",               answer: "FOREMAN",    connection: "FOREMAN — His opponent in Zaire" },
      { clue: "U.S. state known for horse racing",                      answer: "KENTUCKY",   connection: "KENTUCKY — His birthplace" },
      { clue: "Delicate, brightly coloured insect",                     answer: "BUTTERFLY",  connection: "BUTTERFLY — Ali\'s famous quote: Float Like a Butterfly, Sting Like a Bee" },
    ],
    anagram: { letters:["T","O","A","F","L"], answer:"FLOAT", clue:"To move lightly on air or water without sinking" },
    quote: `Muhammad Ali died on this day in 2016. "Float like a butterfly, sting like a bee." 🥊
🎬 https://youtu.be/V2EfL1j4KYE?si=mLghfIFPCIG7IseM`,
  },

  "2026-06-04": {
    rounds: [
      { clue: "Word that comes after Magnificent and before Dwarfs",    answer: "SEVEN",      connection: "SEVEN — His championship streak" },
      { clue: "Practitioner of magic",                                  answer: "WIZARD",     connection: "WIZARD — His nickname" },
      { clue: "Structure with triangular sides",                        answer: "PYRAMID",    connection: "PYRAMID — His coaching philosophy" },
      { clue: "Starting point or reference line used in comparisons",   answer: "BASELINE",   connection: "BASELINE — Basketball term" },
      { clue: "Distinctive moral qualities",                            answer: "CHARACTER",  connection: "CHARACTER — His core teaching" },
    ],
    anagram: { letters:["T","P","A","N","E","I","E","C"], answer:"PATIENCE", clue:"The ability to wait calmly without becoming frustrated" },
    quote: `John Wooden died on this day, remembered for his PATIENCE and wisdom: "Be more concerned with your character than your reputation, because your character is what you really are." 🏀
🔗 https://en.wikipedia.org/wiki/John_Wooden`,
  },

  "2026-06-05": {
    rounds: [
      { clue: "A Danish term describing a feeling of cosy comfort and contentment", answer: "HYGGE",    connection: "HYGGE — Danish cultural idea" },
      { clue: "Cofounder of Metallica — Lars what?",                    answer: "ULRICH",     connection: "ULRICH — Danish born Metal Legend" },
      { clue: "Mythical sea creature",                                  answer: "MERMAID",    connection: "MERMAID — Copenhagen statue" },
      { clue: "Surname of the writer behind The Snow Queen and The Ugly Duckling", answer: "ANDERSEN", connection: "ANDERSEN — Hans Christian Andersen, Danish author" },
      { clue: "The biggest landmass classified as both an island and a country", answer: "GREENLAND", connection: "GREENLAND — Part of the Danish realm" },
    ],
    anagram: { letters:["S","N","D","G","E","I"], answer:"DESIGN", clue:"To plan or create something with purpose and intention" },
    quote: `"In Denmark, DESIGN isn\'t decoration — it\'s a quiet way of living that turns simplicity into beauty." 🇩🇰

🗓️ On This Day — June 5th is Denmark\'s Constitution Day (Grundlovsdag), celebrating the signing of the Danish constitution in 1849. 🇩🇰
🔗 https://www.visitdenmark.com/denmark/things-to-do/traditions-lifestyle/fun-facts`,
  },

  "2026-06-06": {
    rounds: [
      { clue: "U.S. city whose name is also shared with a famous poker variant", answer: "OMAHA",     connection: "OMAHA — One of the Allied landing beaches on D-Day" },
      { clue: "A large fleet of ships assembled for a single purpose",  answer: "ARMADA",     connection: "ARMADA — The naval force that crossed the Channel for the invasion" },
      { clue: "Word after King\'s and before Zone",                      answer: "LANDING",    connection: "LANDING — The central action of the Normandy assault" },
      { clue: "Describes something lifted or moving through the atmosphere", answer: "AIRBORNE",  connection: "AIRBORNE — Troops deployed behind enemy lines before the beach assaults" },
      { clue: "The practice of misleading someone through trickery",    answer: "DECEPTION",  connection: "DECEPTION — The strategic misdirection that protected the invasion plan" },
    ],
    anagram: { letters:["G","M","E","A","N","R"], answer:"GERMAN", clue:"Relating to the country bordering France to the east" },
    quote: `On this day in 1944, the Normandy landings began — the largest seaborne invasion in history. 🎖️
🔗 https://en.wikipedia.org/wiki/Normandy_landings`,
  },

  "2026-06-07": {
    rounds: [
      { clue: "Describes something stylishly unconventional",           answer: "FUNKY",      connection: "FUNKY — A signature element of Prince\'s bold musical identity" },
      { clue: "Word that can follow Deep and precede Haze",             answer: "PURPLE",     connection: "PURPLE — Forever tied to his most iconic creative era" },
      { clue: "A performer known for flair and dramatic presentation",  answer: "SHOWMAN",    connection: "SHOWMAN — Captures his electrifying presence on every stage" },
      { clue: "A musician with exceptional technical mastery",          answer: "VIRTUOSO",   connection: "VIRTUOSO — Reflects his mastery of countless instruments" },
      { clue: "U.S. state known for its many lakes",                    answer: "MINNESOTA",  connection: "MINNESOTA — The state that shaped his early life" },
    ],
    anagram: { letters:["E","L","S","F","R","A","E","S"], answer:"FEARLESS", clue:"Unmoved by threat or danger" },
    quote: `Prince, born on this day in Minneapolis in 1958, became a FEARLESS innovator whose sound, style, and stage presence reshaped modern music. 🎸
🎬 https://youtu.be/TvnYmWpD_T8`,
  },

  "2026-06-08": {
    rounds: [
      { clue: "Opposite of lies",                                       answer: "TRUTH",      connection: "TRUTH — Central to the novel\'s warning about manipulated reality" },
      { clue: "Word after Boy and before Harrison",                                    answer: "GEORGE",     connection: "GEORGE — The author whose vision shaped modern dystopia" },
      { clue: "Something that alerts of danger",                        answer: "WARNING",    connection: "WARNING — Reflects the book\'s caution about authoritarian control" },
      { clue: "Government department responsible for a specific area of public policy",         answer: "MINISTRY",   connection: "MINISTRY — One of the powerful institutions enforcing state doctrine" },
      { clue: "Relating to an oppressive future society",               answer: "DYSTOPIAN",  connection: "DYSTOPIAN — Defines the bleak world the story portrays" },
    ],
    anagram: { letters:["M","E","R","I","E","G"], answer:"REGIME", clue:"A system of rule or governance" },
    quote: `In the book 1984, Winston Smith struggles under a totalitarian REGIME that controls truth, memory, and even thought itself. 📖

🗓️ On This Day — George Orwell\'s Nineteen Eighty-Four was first published on June 8th, 1949.
🔗 https://en.wikipedia.org/wiki/Nineteen_Eighty-Four`,
  },

  "2026-06-09": {
    rounds: [
      { clue: "Word that comes after Down and before Armour",           answer: "UNDER",      connection: "UNDER — Appears in playful musical phrasing he often used" },
      { clue: "Dark, malty beer known for its roasted flavour",         answer: "PORTER",     connection: "PORTER — The celebrated songwriter behind timeless standards" },
      { clue: "Reign of another place",                                 answer: "FOREIGN",    connection: "FOREIGN — Reflects the worldly flair found in his lyrics" },
      { clue: "A thing any way you like",                               answer: "ANYTHING",   connection: "ANYTHING — From the classic musical that defined his style" },
      { clue: "Global symbol of the movie business",                    answer: "HOLLYWOOD",  connection: "HOLLYWOOD — A place where his music found lasting success" },
    ],
    anagram: { letters:["E","M","Y","L","D","O"], answer:"MELODY", clue:"A musical tune formed by a sequence of notes that create a recognisable line" },
    quote: `Cole Porter crafted MELODY with such effortless charm that even his simplest tunes felt like polished jewels. 🎹

🗓️ On This Day — Cole Porter was born on June 9th, 1891. 🎂
🔗 https://en.wikipedia.org/wiki/Cole_Porter`,
  },

  "2026-06-10": {
    rounds: [
      { clue: "Number of guiding principles",                           answer: "STEPS",      connection: "STEPS — Represents the structured path members follow" },
      { clue: "Truthful and sincere",                                   answer: "HONEST",     connection: "HONEST — A core value essential to personal recovery" },
      { clue: "Help offered to someone in need",                        answer: "SUPPORT",    connection: "SUPPORT — The foundation of the group\'s shared mission" },
      { clue: "Quality of being humble",                                answer: "HUMILITY",   connection: "HUMILITY — Encouraged as part of meaningful self reflection" },
      { clue: "Remaining unnamed",                                      answer: "ANONYMOUS",  connection: "ANONYMOUS — Protects the privacy of every participant" },
    ],
    anagram: { letters:["O","B","R","S","E"], answer:"SOBER", clue:"Not under the influence of alcohol" },
    quote: `"God, grant me the serenity to accept the things I cannot change, the courage to change the things I can, and the wisdom to know the difference."
AA offers a community where people work together to remain SOBER one day at a time. 🙏

🗓️ On This Day — Alcoholics Anonymous was founded on June 10th, 1935.
🔗 https://en.wikipedia.org/wiki/Alcoholics_Anonymous`,
  },

  "2026-06-11": {
    rounds: [
      { clue: "What word comes after Katy and before Mason",            answer: "PERRY",      connection: "PERRY — Katy Perry is performing at the opening ceremony of the World Cup" },
      { clue: "Country known for tequila, tacos and mariachi traditions", answer: "MEXICO",   connection: "MEXICO — Co-hosts playing South Africa today" },
      { clue: "The beginning or first part of something",               answer: "OPENING",    connection: "OPENING — Marks the beginning of global football celebration" },
      { clue: "Soccer, elsewhere",                                      answer: "FOOTBALL",   connection: "FOOTBALL — The sport that unites nations every four years" },
      { clue: "What city sits just north of the US border opposite Washington State", answer: "VANCOUVER", connection: "VANCOUVER — A key host city" },
    ],
    anagram: { letters:["E","E","F","E","R","R","E"], answer:"REFEREE", clue:"An official who enforces the rules of a sport" },
    quote: `The 2026 FIFA World Cup opens today — the first ever co-hosted by three nations. Let the football begin! ⚽
🔗 https://www.bbc.com/sport/football/63337456`,
  },

  "2026-06-12": {
    rounds: [
      { clue: "Straight talker, by name",                               answer: "FRANK",      connection: "FRANK — The name that became a symbol of resilience" },
      { clue: "Out of sight by design",                                 answer: "HIDING",     connection: "HIDING — Describes the years she spent in secrecy" },
      { clue: "Age stop — for the secret police",                       answer: "GESTAPO",    connection: "GESTAPO — The secret police force that hunted her relentlessly" },
      { clue: "Tall unit with multiple shelves for storage",            answer: "BOOKCASE",   connection: "BOOKCASE — The disguised doorway that protected her family" },
      { clue: "Capital of the Netherlands",                             answer: "AMSTERDAM",  connection: "AMSTERDAM — The city forever linked to her story" },
    ],
    anagram: { letters:["I","S","S","E","R","T"], answer:"SISTER", clue:"A female relation" },
    quote: `Anne Frank, born June 12th, hid in the Secret Annex with her older SISTER Margot during the Nazi occupation of Amsterdam. 📔
🔗 https://en.wikipedia.org/wiki/Anne_Frank`,
  },

  "2026-06-13": {
    rounds: [
      { clue: "Residence of a monastic brotherhood or sisterhood",      answer: "ABBEY",      connection: "ABBEY — The theatre he helped establish for Irish culture" },
      { clue: "Seen at a legislative assembly",                         answer: "SENATE",     connection: "SENATE — Reflects his role in shaping national identity" },
      { clue: "Widely admired people or narratives of great renown",    answer: "LEGENDS",    connection: "LEGENDS — Draws on the deep Celtic mythology he cherished" },
      { clue: "Rider seen in the Book of Revelation",                  answer: "HORSEMAN",   connection: "\'Cast a cold Eye On Life, on Death. Horseman, pass by\' — Yeats\'s famous epitaph" },
      { clue: "Supporter of innovation over tradition",                 answer: "MODERNIST",  connection: "MODERNIST — Captures his influence on twentieth century literature" },
    ],
    anagram: { letters:["M","D","E","R","S","A"], answer:"DREAMS", clue:"Personal visions of what one wishes to achieve" },
    quote: `"Tread softly because you tread on my DREAMS." — W.B. Yeats 🍀

🗓️ On This Day — W.B. Yeats was born on June 13th, 1865. 🎂
His epitaph reads: "Cast a cold Eye On Life, on Death. Horseman, pass by."
🔗 https://en.wikipedia.org/wiki/W._B._Yeats`,
  },

  "2026-06-14": {
    rounds: [
      { clue: "Elevated structure for observation or defence",          answer: "TOWER",      connection: "TOWER — A landmark structure tied to his business identity" },
      { clue: "Ran geo with this hue",                                  answer: "ORANGE",     connection: "ORANGE — A widely referenced aspect of his public image" },
      { clue: "Legislative building in Washington",                     answer: "CAPITOL",    connection: "CAPITOL — The central arena of American political power" },
      { clue: "Widespread global health crisis",                        answer: "PANDEMIC",   connection: "PANDEMIC — A defining global event during his leadership" },
      { clue: "Elected head of a republic",                             answer: "PRESIDENT",  connection: "PRESIDENT — The highest office he occupied in the nation" },
    ],
    anagram: { letters:["N","E","T","L","E","C","O","I"], answer:"ELECTION", clue:"A formal process in which people vote to choose leaders" },
    quote: `Donald Trump — tower builder, ELECTION winner, 45th and 47th President of the United States. 🇺🇸

🗓️ On This Day — Donald Trump was born on June 14th, 1946. 🎂
🔗 https://en.wikipedia.org/wiki/Donald_Trump`,
  },

  "2026-06-15": {
    rounds: [
      { clue: "Opposite of north",                                      answer: "SOUTH",      connection: "SOUTH — Reflects the regional roots of his early career" },
      { clue: "Word in the week after Good or before The 13th",         answer: "FRIDAY",     connection: "FRIDAY — The title of his breakout comedy film" },
      { clue: "Lamar or Michael or Samuel L",                           answer: "JACKSON",    connection: "JACKSON — Shared by collaborators in entertainment history" },
      { clue: "General outlook or disposition",                         answer: "ATTITUDE",   connection: "ATTITUDE — Captures the bold persona he brought to music" },
      { clue: "Power to shape someone\'s behaviour or decisions",        answer: "INFLUENCE",  connection: "Ice Cube\'s INFLUENCE reshaped West Coast hip-hop" },
    ],
    anagram: { letters:["N","E","A","R","T","C","L"], answer:"CENTRAL", clue:"Located in the middle or most important position" },
    quote: `"Today was a good day." — Ice Cube 🎤

🗓️ On This Day — Ice Cube was born on June 15th, 1969. 🎂
🎬 https://youtu.be/h4UqMyldS7Q`,
  },

  "2026-06-16": {
    rounds: [
      { clue: "Word that comes after Henry and before Van Der Beek",    answer: "JAMES",      connection: "JAMES — Joyce, the writer whose work inspired the celebration" },
      { clue: "City in Ireland and Ohio",                               answer: "DUBLIN",     connection: "DUBLIN — The city where the novel is set" },
      { clue: "Hero of a famous James Joyce novel",                                      answer: "ULYSSES",    connection: "ULYSSES — The wandering hero central to the entire story" },
      { clue: "Artistic representation of a person, usually the face",  answer: "PORTRAIT",   connection: "PORTRAIT — A reference to A Portrait of an Artist as a Young Man" },
      { clue: "Single speaker speech",                                  answer: "MONOLOGUE",  connection: "MONOLOGUE — Echoes the famous closing passage of the book" },
    ],
    anagram: { letters:["P","L","O","L","E","D","O"], answer:"LEOPOLD", clue:"A name of Germanic origin meaning bold leader or name of Bloom in Joyce classic" },
    quote: `"Yes I said yes I will yes." — James Joyce, Ulysses 📚
Bloomsday is celebrated every June 16th in LEOPOLD Bloom\'s honour.
🔗 https://en.wikipedia.org/wiki/Bloomsday`,
  },
  "2026-06-17": {
    rounds: [
      { clue: "Liquid squeezed from fruit",                             answer: "JUICE",      connection: "JUICE — The nickname that followed him throughout his career" },
      { clue: "Wild horse of the American West",                                   answer: "BRONCO",     connection: "BRONCO — The vehicle central to a historic televised pursuit" },
      { clue: "NFL city known for its Bills",                           answer: "BUFFALO",    connection: "BUFFALO — The NFL team he represented during his prime" },
      { clue: "Legal decision (American Spelling)",                      answer: "JUDGMENT",   connection: "JUDGMENT — The legal outcome that shaped public debate" },
      { clue: "Found not guilty",                                       answer: "ACQUITTED",  connection: "ACQUITTED — The verdict that defined the trial's conclusion" },
    ],
    anagram: { letters:["R","D","E","C","I","V","T"], answer:"VERDICT", clue:"The decision reached by a jury at the end of a trial" },
    quote: `"If it does not fit, you must acquit." — The trial that gripped the world. ⚖️

🗓️ On This Day — O.J. Simpson was arrested on June 17th, 1994, following the now-infamous slow-speed Bronco chase broadcast live on television.
🎬 https://www.youtube.com/watch?v=YLmDE_JYUNU`,
  },

  "2026-06-18": {
    rounds: [
      { clue: "Feathered limbs for flying",                             answer: "WINGS",      connection: "WINGS — The group he formed to continue his musical evolution" },
      { clue: "6 stringed instrument",                                   answer: "GUITAR",     connection: "GUITAR — One of the many instruments he mastered" },
      { clue: "Beef burger german port city",    answer: "HAMBURG",    connection: "HAMBURG — The gritty city where the Beatles found their sound" },
      { clue: "Firearm that chambers rounds in a rotating cylinder",                   answer: "REVOLVER",   connection: "REVOLVER — A groundbreaking album that marked a new direction" },
      { clue: "Melodious thrush found in gardens",               answer: "BLACKBIRD",  connection: "BLACKBIRD — A timeless acoustic song he composed" },
    ],
    anagram: { letters:["D","Y","O","L","M","E"], answer:"MELODY", clue:"A sequence of musical notes that forms a recognisable tune" },
    quote: `"Maybe I'm amazed at the way you love me all the time." — Born on this day in 1942 - Paul McCartney 🎸
🎬 https://youtu.be/GBSu_ltDu1w?si=bwdSeWweMfL9b_DS`,
  },

  "2026-06-19": {
    rounds: [
      { clue: "Large four‑legged riding animal",                                       answer: "HORSE",      connection: "HORSE — Lou Gehrig AKA The Iron Horse" },
      { clue: "First name of German composer van Beethoven",        answer: "LUDWIG",     connection: "LUDWIG — his middle name" },
      { clue: "Name once used for New England colonists and now famous New Yor Team",                                   answer: "YANKEES",    connection: "YANKEES — His team that he played 2130 consecutive games for" },
      { clue: "Having the greatest good fortune",                      answer: "LUCKIEST",   connection: "LUCKIEST — His speech where he said HE WAS The luckiest man on the face of the Earth" },
      { clue: "Condition leaving one unable to move",                answer: "PARALYSIS",  connection: "PARALYSIS — Debilitating effect of the illness named for a famous first baseman" },
    ],
    anagram: { letters:["R","K","B","A","A","P","L","L"], answer:"BALLPARK", clue:"Rough estimate or approximate figure" },
    quote: `"When you look around, wouldn't you consider it a privilege to associate yourself with such fine-looking men as are standing in uniform in this ballpark today" Lou Gehrig -American Baseball legend died on this day 1941. 🏆
🔗 https://en.wikipedia.org/wiki/Lou_Gehrig`,
  },

  "2026-06-20": {
    rounds: [
      { clue: "Ocean's most feared predator",                           answer: "SHARK",      connection: "SHARK — The terrifying creature that drives the entire plot" },
      { clue: "Word after Ricky and before Scorsese",                answer: "MARTIN",     connection: "MARTIN — Chief Brody, who battles fear and responsibility" },
      { clue: "Sandy shores or Bette Midler movie",            answer: "BEACHES",    connection: "BEACHES — The peaceful setting disrupted by danger" },
      { clue: "Feeling of dread and nail-biting tension",               answer: "SUSPENSE",   connection: "SUSPENSE — The defining tone that made the film iconic" },
      { clue: "Director of ET",                    answer: "SPIELBERG",  connection: "SPIELBERG — The visionary director behind the masterpiece" },
    ],
    anagram: { letters:["L","I","E","L","H","R","T","R"], answer:"THRILLER", clue:"A story or film designed to keep you on the edge of your seat" },
    quote: `"You're gonna need a bigger boat." — Jaws, the film that invented the summer blockbuster. 🦈
🎬 https://youtu.be/WKuZJjPSLXQ?si=ofVRSWUbDsMRNndH`,
  },

  "2026-06-21": {
    rounds: [
      { clue: "State of being forced to live away from one's home or country", answer: "EXILE",      connection: "EXILE — The status he assumed after leaving the country" },
      { clue: "To expose something hidden from the public",             answer: "REVEAL",     connection: "REVEAL — Describes his decision to expose classified activity" },
      { clue: "Home of the CIA in Virginia",                            answer: "LANGLEY",    connection: "LANGLEY — Whose actions sparked global debate on privacy" },
      { clue: "Word that comes after Grand and before Anthem",          answer: "NATIONAL",   connection: "NATIONAL — Relates to the security issues he highlighted" },
      { clue: "Official papers or files",                               answer: "DOCUMENTS",  connection: "DOCUMENTS — The files that reshaped public understanding" },
    ],
    anagram: { letters:["C","E","E","S","S","T","R"], answer:"SECRETS", clue:"Things deliberately kept hidden from others" },
    quote: `"Privacy is not a privilege — it's a human right." Edward Snowden went public with government SECRETS on this day in 2013. 🔐
🔗 https://en.wikipedia.org/wiki/Edward_Snowden`,
  },

  "2026-06-22": {
    rounds: [
      { clue: "What comes afte San and before Maradona", answer: "DIEGO",   connection: "DIEGO — The legendary player who scored the infamous goal" },
      { clue: "Country that is not Scotland, Wales or Northern Ireland in GB",          answer: "ENGLAND",    connection: "ENGLAND — The team stunned by the controversial moment" },
      { clue: "Official who enforces the rules of a match",             answer: "REFEREE",    connection: "REFEREE — The official who famously missed the blatant handball" },
      { clue: "Meaningful or deeply representative",                    answer: "SYMBOLIC",   connection: "SYMBOLIC — Represents national pride and lasting rivalry" },
      { clue: "South Atlantic islands under British rule that saw conflict in 1982",     answer: "FALKLANDS",  connection: "FALKLANDS — The war that intensified the sporting emotions" },
    ],
    anagram: { letters:["A","S","O","I","N","M","F","U"], answer:"INFAMOUS", clue:"Well known for the wrong reasons" },
    quote: `"A little with the head of Maradona and a little with the hand of God." The most INFAMOUS goal in football history scored on this day 1986. ✋⚽
🎬 https://youtu.be/ZN3jcfJSJMY?si=GUqKGCWlsLn0H0a9`,
  },

  "2026-06-23": {
    rounds: [
      { clue: "Groups of families sharing a common Scottish ancestry",                                answer: "CLANS",      connection: "CLANS — Once the Scottish clans united at the Battle of Bannockburn, they were formidable" },
      { clue: "Downey Jr, De Niro or Redford",                                         answer: "ROBERT",     connection: "ROBERT — The name carried by the nation's great leader" },
      { clue: " Scottish hero with surname of Wallace",                        answer: "WILLIAM",    connection: "WILLIAM — The warrior whose legacy inspired generations" },
      { clue: "Place at the top in Scotland",                answer: "HIGHLAND",   connection: "Many of Bruce’s forces at Bannockburn came from the Highlands" },
      { clue: "Brung Hide for this capital city",                       answer: "EDINBURGH",  connection: "EDINBURGH — The historic capital tied to the struggle" },
    ],
    anagram: { letters:["F","O","E","R","E","D","M"], answer:"FREEDOM", clue:"The power to live without control or oppression" },
    quote: `"FREEDOM!" The Battle of Bannockburn, June 23rd 1314 — Scotland's greatest military victory. ⚔️
🔗 https://en.wikipedia.org/wiki/Battle_of_Bannockburn`,
  },

  "2026-06-24": {
    rounds: [
      { clue: "Florida city famous for its heat and nightlife",                 answer: "MIAMI",      connection: "MIAMI — The club that welcomed him to the US" },
      { clue: "First name of singer of 'Three Times a Lady', Hello & All Night Long",                                         answer: "LIONEL",     connection: "LIONEL — The name of football's global icon" },
      { clue: "A chemical messenger produced by glands that travels through the bloodstream to regulate body functions",      answer: "HORMONE",    connection: "HORMONE — Messi needed hormone injections to help his growth" },
      { clue: "Objects awarded for winning",     answer: "TROPHIES",    connection: "TROPHIES — He has a record number of trophies won for Barcelona" },
      { clue: "Crab Alone in this Spanish place",                  answer: "BARCELONA",  connection: "BARCELONA — The club where he spent most of his career" },
    ],
    anagram: { letters:["G","E","T","R","A","S","E","T"], answer:"GREATEST", clue:"Better than all others — the very best" },
    quote: `"The GREATEST of all time." Lionel Messi — born June 24th 1987. 🐐
🎬 https://youtu.be/nA8wHQvHPJU?si=w52n5P6vszCp794Y`,
  },

  "2026-06-25": {
    rounds: [
      { clue: "Korean type of soul",                                      answer: "SEOUL",      connection: "SEOUL — Capital of South Korea" },
      { clue: "Former USSR citizen",                           answer: "SOVIET",     connection: "SOVIET — The powerful ally supporting the northern forces" },
      { clue: "World’s countries, collectively",                 answer: "NATIONS",    connection: "NATIONS — The United Nations that authorised the response" },
      { clue: "Side‑by‑side and never meeting",     answer: "PARALLEL",   connection: "PARALLEL — The 38th parallel—  dividing line that shaped the conflict" },
      { clue: "Marxist believer",  answer: "COMMUNIST",  connection: "COMMUNIST — The ideology driving the northern leadership" },
    ],
    anagram: { letters:["V","I","D","E","D","I","D"], answer:"DIVIDED", clue:"Split into opposing sides that cannot agree" },
    quote: `"The Forgotten War." The Korean War began on this day in 1950 — a peninsula still DIVIDED to this day. 🌏
🔗 https://en.wikipedia.org/wiki/Korean_War`,
  },

  "2026-06-26": {
    rounds: [
      { clue: "Capital city of Ecuador",                                answer: "QUITO",      connection: "QUITO — The region central to his expedition" },
      { clue: "Sum of money demanded for someone's release",            answer: "RANSOM",     connection: "RANSOM — The enormous payment demanded from Atahualpa" },
      { clue: "To carry out a death sentence",                          answer: "EXECUTE",    connection: "EXECUTE — The grim fate that ended the Inca emperor's life" },
      { clue: "The military campaign to seize a new territory",        answer: "CONQUEST",   connection: "CONQUEST — The campaign that reshaped an entire empire" },
      { clue: "Word after San and before Franco",                   answer: "FRANCISCO",  connection: "FRANCISCO — The conquistador whose actions changed history" },
    ],
    anagram: { letters:["E","M","E","I","R","P"], answer:"EMPIRE", clue:"A group of nations or peoples under a single ruler" },
    quote: `Francisco Pizarro conqueror of the Inca EMPIRE died on this day. ⚔️
🔗 https://en.wikipedia.org/wiki/Francisco_Pizarro`,
  },

  "2026-06-27": {
    rounds: [
      { clue: "Recorded footage that can be watched on a screen",       answer: "VIDEO",      connection: "VIDEO — His groundbreaking game series transformed skate culture" },
      { clue: "Power that enables movement, heat, or activity in physical systems",        answer: "ENERGY",     connection: "ENERGY — Reflects the intensity he brought to extreme sports" },
      { clue: "Foolish or stupid person or a male donkey",        answer: "JACKASS",    connection: "JACKASS — The stunt-driven series he frequently appeared in" },
      { clue: "Perfectly upright — straight up and down",               answer: "VERTICAL",   connection: "VERTICAL — The discipline where he landed the iconic 900" },
      { clue: "Man made abode for a flying creature",            answer: "BIRDHOUSE",  connection: "BIRDHOUSE — The skateboard company he built into a powerhouse" },
    ],
    anagram: { letters:["I","L","A","E","H","P","F","P"], answer:"HALFPIPE", clue:"“A U‑shaped ramp used in sports like skateboarding and snowboarding for performing aerial tricks" },
    quote: `"The Birdman lands the 900." Tony Hawk — the greatest Skateboarder who ever lived. 🛹
🎬 https://youtu.be/390gYuwFwqo?si=1tZbUKQZiuptkcLu`,
  },

  "2026-06-28": {
    rounds: [
      { clue: "Word that comes after Grace and before Osbourne",                 answer: "KELLY",      connection: "KELLY — The outlaw whose legend endures in Australian history" },
      { clue: "Protective metal covering worn in battle",               answer: "ARMOUR",     connection: "ARMOUR — The homemade suit he wore in his final stand" },
      { clue: "Uncontrolled by authority",                              answer: "LAWLESS",    connection: "LAWLESS — Describes the rebellious life he famously embraced" },
      { clue: "The wild edge of settled civilisation",                  answer: "FRONTIER",   connection: "FRONTIER — The rugged landscape that shaped his story" },
      { clue: "A written declaration of beliefs or intentions",         answer: "MANIFESTO",  connection: "MANIFESTO — The Jerilderie Letter revealed his defiant beliefs" },
    ],
    anagram: { letters:["W","T","O","L","U","A"], answer:"OUTLAW", clue:"Someone who lives outside the law and is wanted by authorities" },
    quote: `"Such is life." — Ned Kelly, Australia's most famous OUTLAW, executed June 28th 1880. 🪖
🔗 https://en.wikipedia.org/wiki/Ned_Kelly`,
  },

  "2026-06-29": {
    rounds: [
      { clue: "The decisive last match of a tournament",                answer: "FINAL",      connection: "FINAL — The match that crowned a new football dynasty" },
      { clue: "South American nation in yellow and green",              answer: "BRAZIL",     connection: "BRAZIL — The nation that lifted its first World Cup" },
      { clue: "Not back",                      answer: "FORWARD",    connection: "FORWARD — The position where their teenage star shone brightest" },
      { clue: "You gents are the lowest",              answer: "YOUNGEST",   connection: "YOUNGEST — At 17, he was the youngest World Cup winner ever" },
      { clue: "Swedish capital city",        answer: "STOCKHOLM",  connection: "STOCKHOLM — The city that hosted the historic final" },
    ],
    anagram: { letters:["E","E","N","D","L","G"], answer:"LEGEND", clue:"A person whose fame and achievements live on long after they are gone" },
    quote: `"The birth of a LEGEND." Pelé, aged 17, scored twice in the 1958 World Cup Final in Stockholm. ⚽
🎬 https://youtu.be/TYNsrKtV6Mc?si=jTygbLYXFSGVzAb6`,
  },

  "2026-06-30": {
    rounds: [
      { clue: "A violent political cleansing",                 answer: "PURGE",      connection: "PURGE — The violent action that reshaped Nazi leadership" },
      { clue: "A formal agreement between nations",                     answer: "TREATY",     connection: "TREATY — Symbolises the alliances broken during the upheaval" },
      { clue: "The Nazi secret police",                                 answer: "GESTAPO",    connection: "GESTAPO — The brutal enforcement arm carrying out arrests" },
      { clue: "Detained by force without warning",                      answer: "ARRESTED",   connection: "ARRESTED — Describes the many rivals seized overnight" },
      { clue: "Im an elite mixed up gives something you might remove entirely",                   answer: "ELIMINATE",  connection: "ELIMINATE — The ultimate goal of the orchestrated purge" },
    ],
    anagram: { letters:["O","R","W","E","P"], answer:"POWER", clue:"Control and authority over others" },
    quote: `The Night of the Long Knives — June 30th 1934. Hitler seized total POWER by eliminating his own allies. 🔱
🔗 https://en.wikipedia.org/wiki/Night_of_the_Long_Knives`,
  },

  "2026-07-01": {
    rounds: [
      { clue: "Me Pal the tree", answer: "MAPLE", connection: "MAPLE - Symbol of Canada" },
      { clue: "Capital city of Canada", answer: "OTTAWA", connection: "OTTAWA — Canada’s capital city" },
      { clue: "Famous falls on the U.S.–Canada border", answer: "NIAGARA", connection: "NIAGARA-  Iconic Canada–U.S. waterfall" },
      { clue: "Retriever bred in Newfoundland", answer: "LABRADOR", connection: "LABRADOR- region in Newfoundland" },
      { clue: "Border formed by sea and land", answer: "COASTLINE", connection: "COASTLINE-Canada has the longest coastline in the world" },
    ],
    anagram: { letters:["M","R","F","T","O","A","O","N","I"], answer:"FORMATION", clue:"Arrangement or structure" },
    quote: `Canada Day is the national holiday of Canada, celebrated on July 1st
🔗 https://en.wikipedia.org/wiki/Canada_Day`,
  },

  "2026-07-02": {
    rounds: [
      { clue: "State of inner calm", answer: "PEACE", connection: "PEACE — A central ideal in Hesse’s writing." },
      { clue: "Empty space or void", answer: "VACUUM", connection: "VACUUM — His characters often confront an inner void before growth." },
      { clue: "Traveller on a quest for meaning", answer: "PILGRIM", connection: "PILGRIM — Suggests the searching characters in his stories" },
      { clue: "Throbbing pain of the mind or skull", answer: "HEADACHE", connection: "HEADACHE — Hesse suffered migraines for all of his life; his characters face mental strain." },
      { clue: "Concerned with inner meaning or higher purpose", answer: "SPIRITUAL", connection: "SPIRITUAL — His novels explore spiritual development and self‑discovery." },
    ],
    anagram: { letters:["U","A","H","D","D","B"], answer:"BUDDHA", clue:"Founder of a major Eastern philosophy" },
    quote: `Within you there is a stillness and a sanctuary to which you can retreat at any time. — Hermann Hesse born on this day 1877
🔗 https://en.wikipedia.org/wiki/Hermann_Hesse`,
  },

  "2026-07-03": {
    rounds: [
      { clue: "Word for a bright blaze", answer: "LIGHT", connection: "LIGHT — Echoes “Light My Fire”, one of The Doors’ most famous songs." },
      { clue: "Reptile often found sunning on warm rocks", answer: "LIZARD", connection: "LIZARD — Jim Morrison called himself “The Lizard King”" },
      { clue: "Reel Hat type of clothing material", answer: "LEATHER", connection: "LEATHER — Iconic image of Morrison in leather trousers and jackets on stage" },
      { clue: "Male voice range between bass and tenor", answer: "BARITONE", connection: "BARITONE — Refers to Morrison’s deep, baritone singing voice." },
      { clue: "Physical material or essential quality of something", answer: "SUBSTANCE", connection: "SUBSTANCE — Alludes to the alcohol and drugs that surrounded his life and death." },
    ],
    anagram: { letters:["L","R","I","S","C","I","Y","T"], answer:"LYRICIST", clue:"Writer of words for a song" },
    quote: `Expose yourself to your deepest fear; after that, fear has no power, and the fear of freedom shrinks and vanishes. You are free. -Jim Morrison died on this day 1971
🔗 https://youtu.be/BgQg3J7xU1k?si=7Zd7uZoq_BMy8sz0`,
  },

  "2026-07-04": {
    rounds: [
      { clue: "Word after 'Patch' and before 'Family'", answer: "ADAMS", connection: "ADAMS — John Adams, a key figure in American independence and the second U.S. president." },
      { clue: "Outside of the medals", answer: "FOURTH", connection: "FOURTH — Independence Day is celebrated on the Fourth of July." },
      { clue: "Relating to a system of shared national and regional government", answer: "FEDERAL", connection: "FEDERAL — The United States formed a new federal system after independence." },
      { clue: "Unlucky for some", answer: "THIRTEEN", connection: "THIRTEEN — The original thirteen colonies that declared independence." },
      { clue: "Explosive devices used for colourful displays", answer: "FIREWORKS", connection: "FIREWORKS — Traditional displays used to celebrate Independence Day." },
    ],
    anagram: { letters:["E","C","B","R","U","E","A","B"], answer:"BARBECUE", clue:"Outdoor meal cooked over an open grill" },
    quote: `“Life, liberty, and the pursuit of happiness — America celebrates Independence Day on the Fourth of July
🔗 https://youtu.be/sjzZh6-h9fM?si=4xRIuJ9pLeFygtfA`,
  },

  "2026-07-05": {
    rounds: [
      { clue: "Wide and pleasing view of a landscape", answer: "VISTA", connection: "VISTA — Cape Verde is known for its dramatic coastal vistas and volcanic landscapes" },
      { clue: "Language formed from the blending of different tongues", answer: "CREOLE", connection: "CREOLE — Cape Verdean Creole is the country’s widely spoken language" },
      { clue: "Land masses completely surrounded by water", answer: "ISLANDS", connection: "ISLANDS — Cape Verde is an archipelago made up of ten main islands" },
      { clue: "Go Saint for this very common city name", answer: "SANTIAGO", connection: "SANTIAGO — The largest and most populated island in Cape Verde" },
      { clue: "System of government in which power rests with the people", answer: "DEMOCRACY", connection: "DEMOCRACY — Cape Verde is recognised as one of Africa’s strongest democracies" },
    ],
    anagram: { letters:["O","U","G","A","P","T","R","L"], answer:"PORTUGAL", clue:"Lisbon is the Capital" },
    quote: `On July 5th, Cape Verde marks the day it stepped forward as a free nation, charting its own course across the Atlantic
🔗 https://en.wikipedia.org/wiki/Cape_Verde`,
  },

  "2026-07-06": {
    rounds: [
      { clue: "Capital of Tibet", answer: "LHASA", connection: "LHASA — Traditional spiritual and political centre of Tibetan Buddhism" },
      { clue: "Large geographic area distinguished by shared features", answer: "REGION", connection: "REGION — Tibet is recognised as a distinct cultural and historical region" },
      { clue: "Process of being born again or renewed", answer: "REBIRTH", connection: "REBIRTH — The Dalai Lama is believed to be the reincarnation of previous Lamas" },
      { clue: "Quality of being sacred or spiritually pure", answer: "HOLINESS", connection: "HOLINESS — The Dalai Lama is formally addressed as His Holiness" },
      { clue: "Concerned with the soul or inner life", answer: "SPIRITUAL", connection: "SPIRITUAL — Known worldwide as a spiritual leader advocating peace and compassion" },
    ],
    anagram: { letters:["H","B","A","D","U","D"], answer:"BUDDHA", clue:"Enlightened figure who founded a major spiritual tradition" },
    quote: `On July 6th 1935, the 14th Dalai Lama was born — a life devoted to compassion and wisdom.
🔗 https://en.wikipedia.org/wiki/Dalai_Lama`,
  },

  "2026-07-07": {
    rounds: [
      { clue: "Assist or attend to somebody’s needs.", answer: "SERVE", connection: "SERVE — Becker was famous for his explosive, attacking serve as a teenager" },
      { clue: "Shot hit before the ball touches the ground", answer: "VOLLEY", connection: "VOLLEY — His fearless diving volleys became his trademark on Centre Court" },
      { clue: "Person trained for physical competition", answer: "ATHLETE", connection: "ATHLETE — At just 17, he became the youngest men’s singles champion in Wimbledon history" },
      { clue: "Legally declared unable to pay debts", answer: "BANKRUPT", connection: "BANKRUPT — Later in life, Becker faced well‑publicised financial and legal troubles" },
      { clue: "Prestigious summer sporting event held in London on grass surface", answer: "WIMBLEDON", connection: "WIMBLEDON — The tournament where he made history on July 7th, 1985" },
    ],
    anagram: { letters:["U","E","Y","N","S","O","G","T"], answer:"YOUNGEST", clue:"The one born most recently." },
    quote: `On July 7th, 1985, Boris Becker stunned the tennis world by winning Wimbledon at 17 — still the youngest men’s champion in the tournament’s history.
🔗 https://youtu.be/Y5M1aR5pCgA?si=im64f77VtCD8qPZN`,
  },

  "2026-07-08": {
    rounds: [
      { clue: "Lacking refinement or good manners.", answer: "CRUDE", connection: "CRUDE - His vast fortune began with crude oil" },
      { clue: "Deeply committed to religious belief or practice.", answer: "DEVOUT", connection: "DEVOUT — He was raised in a deeply religious household and remained devout throughout his life" },
      { clue: "Net Four for this large amount of wealth", answer: "FORTUNE", connection: "FORTUNE — His business success created one of the largest personal fortunes in modern history" },
      { clue: "Widely accepted model or level of quality", answer: "STANDARD", connection: "STANDARD — Founder of Standard Oil, the company that dominated the American petroleum industry" },
      { clue: "Theory of evolution by natural selection.", answer: "DARWINISM", connection: "DARWINISM — His era’s business world embraced “survival of the fittest,” a philosophy often linked to his monopolistic rise" },
    ],
    anagram: { letters:["N","R","Y","I","R","E","E","F"], answer:"REFINERY", clue:"Place where something is purified or improved through careful processing" },
    quote: `On July 8th, 1839, John D. Rockefeller was born — a man whose ambition, industry, and philanthropy reshaped American business and left a legacy that still defines modern capitalism
🔗 https://en.wikipedia.org/wiki/John_D._Rockefeller`,
  },

  "2026-07-09": {
    rounds: [
      { clue: "Decisive match that determines a champion", answer: "FINAL", connection: "FINAL — The match was the World Cup Final, deciding the 2006 champions" },
      { clue: "European capital known for its historic wall and reunification.", answer: "BERLIN", connection: "BERLIN — The Olympiastadion in Berlin hosted the dramatic showdown" },
      { clue: "Kick awarded after an infringement, taken from a marked spot", answer: "PENALTY", connection: "PENALTY — Italy won the trophy after a tense penalty shootout" },
      { clue: "Forceful strike delivered with the forehead.", answer: "HEADBUTT", connection: "HEADBUTT — Zidane’s infamous headbutt on Materazzi became the defining moment of the match" },
      { clue: "Formal removal of a participant from a contest or event", answer: "EXPULSION", connection: "EXPULSION — Zidane was expelled with a red card in extra time, his last act in professional football" },
    ],
    anagram: { letters:["D","T","I","N","E","N","I","C"], answer:"INCIDENT", clue:"Notable event or occurrence, often unexpected" },
    quote: `On July 9th, 2006, Italy and France met in a World Cup Final remembered as much for its drama as its football — a night of penalties, passion, and one unforgettable moment that changed the match forever.
🔗 https://youtu.be/Nlsm0RlC8zI?si=H1ayxjX8JMFFn6FR`,
  },

  "2026-07-10": {
    rounds: [
      { clue: "Territory or domain under a particular authority", answer: "REALM", connection: "REALM — After independence, the Bahamas became a sovereign realm within the Commonwealth" },
      { clue: "Capital city of the Bahamas, also the name of a common golf wager", answer: "NASSAU", connection: "NASSAU — Nassau is the capital city where the independence ceremonies were held" },
      { clue: "Land masses completely surrounded by water.", answer: "ISLANDS", connection: "ISLANDS — The Bahamas is an archipelago of hundreds of islands gaining self‑governance" },
      { clue: "Situated away from the coast", answer: "OFFSHORE", connection: "OFFSHORE — The nation later became known for offshore finance and international services" },
      { clue: "Region of tropical seas and island nations near Florida", answer: "CARIBBEAN", connection: "CARIBBEAN — The Bahamas joined the community of independent Caribbean nations" },
    ],
    anagram: { letters:["U","S","Q","R","E","T","O","I","U"], answer:"TURQUOISE", clue:"Colour often associated with clear tropical waters" },
    quote: `On July 10th, 1973, the Bahamas became an independent nation — a new chapter of identity, culture, and Caribbean pride.
🔗 https://en.wikipedia.org/wiki/Bahamas`,
  },

  "2026-07-11": {
    rounds: [
      { clue: "Person who searches for new talent or information", answer: "SCOUT", connection: "SCOUT: Central child narrator of To Kill a Mockingbird, through whose eyes the story unfolds." },
      { clue: "Professional who represents clients in legal matters", answer: "LAWYER", connection: "LAWYER: Atticus Finch, a small‑town lawyer, defends an innocent man against grave accusations." },
      { clue: "U.S. state with Montgomery as its capital", answer: "ALABAMA", connection: "ALABAMA: The novel is set in the fictional town of Maycomb, located in Alabama." },
      { clue: "Surname associated with a major prize for achievements in journalism and literature", answer: "PULITZER", connection: "PULITZER: To Kill a Mockingbird was awarded the Pulitzer Prize for Fiction in 1961." },
      { clue: "Unfair opinion or judgement formed without proper knowledge", answer: "PREJUDICE", connection: "PREJUDICE: The book explores racial prejudice and social injustice in the American South." },
    ],
    anagram: { letters:["U","J","I","T","C","S","N","E","I"], answer:"INJUSTICE", clue:"Word for unfair treatment or violation of rights" },
    quote: `“Courage is not a man with a gun in his hand.” On July 11, 1960 To Kill a Mockingbird released
🔗 https://en.wikipedia.org/wiki/To_Kill_a_Mockingbird`,
  },

  "2026-07-12": {
    rounds: [
      { clue: "Something beyond the usual or expected", answer: "EXTRA", connection: "EXTRA — E.T. is literally an “extra‑terrestrial,” the central being of the film." },
      { clue: "A dense area filled with trees and wildlife", answer: "FOREST", connection: "FOREST — E.T. is discovered in the forest where the alien ship lands." },
      { clue: "A genre involving magical or imaginative elements", answer: "FANTASY", connection: "FANTASY — The film blends science fiction with fantasy elements and childlike wonder." },
      { clue: "To rise or float as if defying gravity", answer: "LEVITATE", connection: "LEVITATE — E.T. uses telekinetic powers, including levitation, during key scenes." },
      { clue: "A celebration involving costumes, pumpkins, and spooky themes", answer: "HALLOWEEN", connection: "HALLOWEEN — The iconic Halloween sequence features E.T. disguised and exploring the neighbourhood." },
    ],
    anagram: { letters:["E","H","N","O","P"], answer:"PHONE", clue:"Portable tool that lets you speak with someone far away" },
    quote: `On 12 July 1982, E.T. the Extra-Terrestrial topped the U.S. box office, becoming the highest-grossing film of its time
🔗 https://youtu.be/qYAETtIIClk?si=TVpwSovC8bkssost`,
  },

  "2026-07-13": {
    rounds: [
      { clue: "Female Royal", answer: "QUEEN", connection: "QUEEN — Delivered one of the most iconic Live Aid performances at Wembley." },
      { clue: "Severe shortage of food causing widespread hunger", answer: "FAMINE", connection: "FAMINE — The concert was organised to raise funds for famine relief in Ethiopia." },
      { clue: "Large outdoor venue designed for sports or major events", answer: "STADIUM", connection: "STADIUM — Live Aid took place simultaneously in Wembley Stadium and JFK Stadium." },
      { clue: "Supersonic passenger aircraft", answer: "CONCORDE", connection: "CONCORDE — Phil Collins used the Concorde to perform at both Live Aid venues on the same day." },
      { clue: "To transmit audio or visual content to a wide audience.", answer: "BROADCAST", connection: "BROADCAST — The event was broadcast worldwide, reaching an estimated 1.9 billion viewers." },
    ],
    anagram: { letters:["A","H","E","P","O","T","I","I"], answer:"ETHIOPIA", clue:"Addis Ababa is in which country" },
    quote: `On 13 July 1985, Live Aid united musicians and millions of viewers in a global effort to support famine relief in Ethiopia.
🔗 https://youtu.be/FP808MiJUcM?si=kzjOT8SwBqw3YC08`,
  },

  "2026-07-14": {
    rounds: [
      { clue: "A state of being joined together for a common purpose", answer: "UNITY", connection: "UNITY — The French Revolution emphasised unity among citizens against oppression" },
      { clue: "Like toast in a certain breakfast dish", answer: "FRENCH", connection: "FRENCH — Bastille Day marks a defining moment in French history" },
      { clue: "A legally recognised member of a nation", answer: "CITIZEN", connection: "CITIZEN — The storming of the Bastille was carried out by Parisian citizens demanding rights" },
      { clue: "A sudden attempt to take something by force", answer: "STORMING", connection: "STORMING — The storming of the Bastille fortress on July 14, 1789, sparked the French Revolution" },
      { clue: "A social system based on land ownership and obligations", answer: "FEUDALISM", connection: "FEUDALISM — The revolution sought to dismantle feudal structures and privileges" },
    ],
    anagram: { letters:["D","S","B","G","E","E","I","E"], answer:"BESIEGED", clue:"Condition of being surrounded or under attack" },
    quote: `Bastille Day commemorates the storming of the Bastille on 14 July 1789, a turning point that ignited the French Revolution.
🔗 https://en.wikipedia.org/wiki/Bastille_Day`,
  },

  "2026-07-15": {
    rounds: [
      { clue: "Brief chirping noise from a songbird", answer: "TWEET", connection: "TWEET — The core feature of Twitter, allowing users to post short messages" },
      { clue: "Relating to interaction within online communities", answer: "SOCIAL", connection: "SOCIAL — Twitter is a major social networking service" },
      { clue: "At a fast pace or without delay", answer: "QUICKLY", connection: "QUICKLY — Tweets spread rapidly, making Twitter known for real‑time updates" },
      { clue: "Long, level surface where commuters stand before boarding", answer: "PLATFORM", connection: "PLATFORM — Twitter is an online platform used globally for communication and news" },
      { clue: "Exchanging information through written or spoken communication", answer: "MESSAGING", connection: "MESSAGING — Direct messaging is a key feature of Twitter's user interaction" },
    ],
    anagram: { letters:["U","S","M","Y","K"], answer:"MUSKY", clue:"Possessing a heavy, lingering smell" },
    quote: `On 15 July 2006, Twitter launched publicly, introducing a new era of fast, real‑time communication.
🔗 https://en.wikipedia.org/wiki/Twitter`,
  },

  "2026-07-16": {
    rounds: [
      { clue: "Visible mass of condensed water vapour in the sky", answer: "CLOUD", connection: "CLOUD — The Trinity detonation produced the first nuclear mushroom cloud in history" },
      { clue: "Relating to the energy released from splitting or fusing nuclei", answer: "ATOMIC", connection: "ATOMIC — Trinity was the world's first successful atomic bomb test" },
      { clue: "Group of three closely connected things", answer: "TRINITY", connection: "TRINITY — The codename for the test conducted on 16 July 1945" },
      { clue: "A notable site or feature with historical or cultural significance", answer: "LANDMARK", connection: "LANDMARK — The event is considered a landmark moment in scientific and military history" },
      { clue: "Cocktail made with whiskey, vermouth, and bitters", answer: "MANHATTAN", connection: "MANHATTAN — The Trinity test was part of the Manhattan Project" },
    ],
    anagram: { letters:["A","C","N","E","U","R","L"], answer:"NUCLEAR", clue:"Involving processes at the core of atomic structure" },
    quote: `On 16 July 1945, the Trinity test marked the world's first detonation of an atomic device, ushering in the nuclear age.
🔗 https://en.wikipedia.org/wiki/Trinity_(nuclear_test)`,
  },

  "2026-07-17": {
    rounds: [
      { clue: "Ability to influence or control people or events", answer: "POWER", connection: "POWER — The conflict began with a military attempt to seize power from the elected government" },
      { clue: "Yellow songbird often kept as a pet", answer: "CANARY", connection: "CANARY — The uprising started in the Canary Islands before spreading to mainland Spain" },
      { clue: "Country in North Africa known for its Atlantic coastline", answer: "MOROCCO", connection: "MOROCCO — Spanish Morocco was a key base for the initial military revolt" },
      { clue: "Tele coin to choose a leader", answer: "ELECTION", connection: "ELECTION — Tensions followed the 1936 election, which brought the Popular Front to power" },
      { clue: "Punishments carried out in response to wrongdoing", answer: "REPRISALS", connection: "REPRISALS — Both sides carried out reprisals during the early stages of the conflict" },
    ],
    anagram: { letters:["G","R","U","I","S","P","I","N"], answer:"UPRISING", clue:"Word for a revolt or rising against authority" },
    quote: `On 17 July 1936, a military revolt began in Spanish Morocco and the Canary Islands, igniting the Spanish Civil War.
🔗 https://en.wikipedia.org/wiki/Spanish_Civil_War`,
  },

  "2026-07-18": {
    rounds: [
      { clue: "Harmony or absence of conflict", answer: "PEACE", connection: "PEACE — Mandela advocated reconciliation and peaceful transition after apartheid" },
      { clue: "Admiral with a big column", answer: "NELSON", connection: "NELSON — His first name" },
      { clue: "State of being able to act or live without restraint", answer: "FREEDOM", connection: "FREEDOM — Mandela became a global symbol of the struggle for freedom" },
      { clue: "Large formal meeting or assembly", answer: "CONGRESS", connection: "CONGRESS — The African National Congress (ANC) was his political home" },
      { clue: "Hide apart in racial segregation", answer: "APARTHEID", connection: "APARTHEID — Mandela fought against apartheid throughout his life" },
    ],
    anagram: { letters:["O","P","I","R","N","S"], answer:"PRISON", clue:"Facility used to confine offenders" },
    quote: `I learned that courage was not the absence of fear, but the triumph over it. The brave man is not he who does not feel afraid, but he who conquers that fear. Nelson Mandela born on this day 1918
🔗 https://en.wikipedia.org/wiki/Nelson_Mandela`,
  },

  "2026-07-19": {
    rounds: [
      { clue: "What you do when something delights you", answer: "SMILE", connection: "SMILE — Brian May's band before Queen" },
      { clue: "Long academic paper written to earn a degree", answer: "THESIS", connection: "THESIS — He completed a PhD thesis in astrophysics" },
      { clue: "Planet closest to the Sun", answer: "MERCURY", connection: "MERCURY — Freddie Mercury, his bandmate" },
      { clue: "Relating to an unconventional or artistic lifestyle", answer: "BOHEMIAN", connection: "BOHEMIAN — \"Bohemian Rhapsody,\" Queen's iconic song" },
      { clue: "Musician who plays a 6 stringed instrument", answer: "GUITARIST", connection: "GUITARIST — Brian May's role in Queen" },
    ],
    anagram: { letters:["U","E","Q","N","E"], answer:"QUEEN", clue:"Female royal" },
    quote: `Brian May, born on 19 July 1947, became one of rock's most distinctive guitarists and later earned a PhD in astrophysics.
🔗 https://en.wikipedia.org/wiki/Brian_May`,
  },

  "2026-07-20": {
    rounds: [
      { clue: "In aid of this South Asia country", answer: "INDIA", connection: "INDIA — Often cited as the birthplace of chess" },
      { clue: "Member of the clergy", answer: "BISHOP", connection: "BISHOP — A chess piece" },
      { clue: "Take control of something by force", answer: "CAPTURE", connection: "CAPTURE — A core action in chess" },
      { clue: "A plan of action designed to achieve a long-term or overall aim", answer: "STRATEGY", connection: "STRATEGY — Essential to chess" },
      { clue: "Move that leaves an opponent with no further options", answer: "CHECKMATE", connection: "CHECKMATE — The winning move" },
    ],
    anagram: { letters:["L","C","S","A","E","T"], answer:"CASTLE", clue:"Fortified building or stronghold" },
    quote: `Today is international Chess day. Choose your move carefully, in chess as in life
🔗 https://en.wikipedia.org/wiki/Chess`,
  },

  "2026-07-21": {
    rounds: [
      { clue: "", answer: "", connection: "" },
      { clue: "", answer: "", connection: "" },
      { clue: "", answer: "", connection: "" },
      { clue: "", answer: "", connection: "" },
      { clue: "", answer: "", connection: "" },
    ],
    anagram: { letters:[], answer:"", clue:"" },
    quote: ``,
  },

  "2026-07-22": {
    rounds: [
      { clue: "", answer: "", connection: "" },
      { clue: "", answer: "", connection: "" },
      { clue: "", answer: "", connection: "" },
      { clue: "", answer: "", connection: "" },
      { clue: "", answer: "", connection: "" },
    ],
    anagram: { letters:[], answer:"", clue:"" },
    quote: ``,
  },

  "2026-07-23": {
    rounds: [
      { clue: "", answer: "", connection: "" },
      { clue: "", answer: "", connection: "" },
      { clue: "", answer: "", connection: "" },
      { clue: "", answer: "", connection: "" },
      { clue: "", answer: "", connection: "" },
    ],
    anagram: { letters:[], answer:"", clue:"" },
    quote: ``,
  },

  "2026-07-24": {
    rounds: [
      { clue: "", answer: "", connection: "" },
      { clue: "", answer: "", connection: "" },
      { clue: "", answer: "", connection: "" },
      { clue: "", answer: "", connection: "" },
      { clue: "", answer: "", connection: "" },
    ],
    anagram: { letters:[], answer:"", clue:"" },
    quote: ``,
  },

  "2026-07-25": {
    rounds: [
      { clue: "", answer: "", connection: "" },
      { clue: "", answer: "", connection: "" },
      { clue: "", answer: "", connection: "" },
      { clue: "", answer: "", connection: "" },
      { clue: "", answer: "", connection: "" },
    ],
    anagram: { letters:[], answer:"", clue:"" },
    quote: ``,
  },

  "2026-07-26": {
    rounds: [
      { clue: "", answer: "", connection: "" },
      { clue: "", answer: "", connection: "" },
      { clue: "", answer: "", connection: "" },
      { clue: "", answer: "", connection: "" },
      { clue: "", answer: "", connection: "" },
    ],
    anagram: { letters:[], answer:"", clue:"" },
    quote: ``,
  },

  "2026-07-27": {
    rounds: [
      { clue: "", answer: "", connection: "" },
      { clue: "", answer: "", connection: "" },
      { clue: "", answer: "", connection: "" },
      { clue: "", answer: "", connection: "" },
      { clue: "", answer: "", connection: "" },
    ],
    anagram: { letters:[], answer:"", clue:"" },
    quote: ``,
  },

  "2026-07-28": {
    rounds: [
      { clue: "", answer: "", connection: "" },
      { clue: "", answer: "", connection: "" },
      { clue: "", answer: "", connection: "" },
      { clue: "", answer: "", connection: "" },
      { clue: "", answer: "", connection: "" },
    ],
    anagram: { letters:[], answer:"", clue:"" },
    quote: ``,
  },

  "2026-07-29": {
    rounds: [
      { clue: "", answer: "", connection: "" },
      { clue: "", answer: "", connection: "" },
      { clue: "", answer: "", connection: "" },
      { clue: "", answer: "", connection: "" },
      { clue: "", answer: "", connection: "" },
    ],
    anagram: { letters:[], answer:"", clue:"" },
    quote: ``,
  },

  "2026-07-30": {
    rounds: [
      { clue: "", answer: "", connection: "" },
      { clue: "", answer: "", connection: "" },
      { clue: "", answer: "", connection: "" },
      { clue: "", answer: "", connection: "" },
      { clue: "", answer: "", connection: "" },
    ],
    anagram: { letters:[], answer:"", clue:"" },
    quote: ``,
  },

  "2026-07-31": {
    rounds: [
      { clue: "", answer: "", connection: "" },
      { clue: "", answer: "", connection: "" },
      { clue: "", answer: "", connection: "" },
      { clue: "", answer: "", connection: "" },
      { clue: "", answer: "", connection: "" },
    ],
    anagram: { letters:[], answer:"", clue:"" },
    quote: ``,
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
  if (timeLeft >= 240) return { title:"CEO",      color:"#c4941f" };
  if (timeLeft >= 180) return { title:"DIRECTOR", color:"#888888" };
  if (timeLeft >= 120) return { title:"MANAGER",  color:"#cd7f32" };
  if (timeLeft >= 60)  return { title:"INTERN",   color:"#5b8db8" };
  return                      { title:"MAILROOM", color:"#aaaaaa" };
}

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const HINT_PENALTY  = 15;
const TOTAL_SECONDS = 5 * 60;

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
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;
  const doneFired = useRef(false);
  useEffect(() => {
    if (!animate) return;
    if (count < word.length) { const t=setTimeout(()=>setCount(c=>c+1),100); return ()=>clearTimeout(t); }
    else { const t=setTimeout(()=>{ setFlipped(true); if (!doneFired.current) { doneFired.current=true; onDoneRef.current?.(); } },300); return ()=>clearTimeout(t); }
  }, [count, word.length, animate]);
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
  return (
    <div style={{ display:"flex", alignItems:"center", gap:10, padding:"7px 12px", background:r.solved?"rgba(46,125,50,0.06)":"rgba(198,40,40,0.04)", border:`1px solid ${r.solved?"rgba(46,125,50,0.3)":"rgba(198,40,40,0.2)"}`, borderRadius:8, marginBottom:5 }}>
      <div style={{ fontSize:10, color:"#666666", width:16, flexShrink:0 }}>{i+1}</div>
      <div style={{ flex:1, display:"flex", gap:3, flexWrap:"wrap" }}>
        {r.answer.split("").map((ch,ci) => (
          <div key={ci} style={{ width:20, height:20, borderRadius:3, border:"1px solid #cccccc", background:"#ffffff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:700, color:r.solved?"#2e7d32":"#555555", fontFamily:"'Courier New',monospace" }}>{ch}</div>
        ))}
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
    setPenalty(`-${HINT_PENALTY}s`); setTimeout(()=>setPenalty(null),1200);
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
  stateRef.current = { round, roundIdx, done, puzzle, attempts };
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
    const { round, roundIdx, puzzle, attempts } = stateRef.current;
    const latest = attempts[attempts.length - 1];
    if (!latest) return;
    if (latest.correct) {
      setTimeout(() => {
        const completedRound = { ...round, solved:true };
        setDone(d=>[...d, completedRound]);
        setAttempts([]); setInput(""); setRevealed({});
        setAnimating(false);
        if (roundIdx >= puzzle.rounds.length-1) setPhase("anagram");
        else setRoundIdx(r=>r+1);
      }, 700);
    } else {
      setAnimating(false);
      setTimeout(()=>setInput(""), 100);
    }
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
      <div style={{ fontSize:13, letterSpacing:3, color:"#c4941f", marginBottom:14, fontWeight:700 }}>ON THIS DAY...</div>
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

  const ReviewAnswers = () => {
    const hasConnections = puzzle.rounds.some(r => r.connection);
    return (
    <div style={{ width:"100%", maxWidth:440, marginTop:8, marginBottom:8 }}>
      <button onClick={()=>setShowAnswers(s=>!s)} style={{ width:"100%", background:hasConnections?"#c4941f":"transparent", border:`2px solid ${hasConnections?"#c4941f":"#e0e0e0"}`, borderRadius:8, padding:"14px", fontSize:13, color:hasConnections?"#ffffff":"#666666", letterSpacing:2, cursor:"pointer", fontFamily:"'Courier New',monospace", fontWeight:800, boxShadow:hasConnections?"0 4px 12px rgba(196,148,31,0.4)":"none" }}>
        {showAnswers?"▲ HIDE":`▼ ${hasConnections?"SPOT THE CONNECTION?":"REVIEW TODAY'S ANSWERS"}`}
      </button>
      {showAnswers && (
        <div style={{ marginTop:8 }}>
          {puzzle.rounds.map((r,i) => {
            const solved = done[i]?.solved;
            return (
              <div key={i} style={{ padding:"10px 14px", background:"rgba(0,0,0,0.02)", border:"1px solid #e0e0e0", borderRadius:8, marginBottom:6 }}>
                <div style={{ fontSize:12, color:"#444444", marginBottom:6 }}>{r.clue}</div>
                <div style={{ display:"flex", gap:4, flexWrap:"wrap", marginBottom:r.connection?8:0 }}>
                  {r.answer.split("").map((ch,ci) => (
                    <div key={ci} style={{ width:26, height:26, borderRadius:3, border:"1px solid #cccccc", background:"#ffffff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, color:solved?"#2e7d32":"#888888", fontFamily:"'Courier New',monospace" }}>{ch}</div>
                  ))}
                </div>
                {r.connection && <div style={{ fontSize:14, color:"#000000", fontStyle:"italic", fontWeight:700 }}>🔗 {r.connection}</div>}
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
  };

  const ScoringGuide = () => (
    <div style={{ width:"100%", maxWidth:440, marginBottom:8 }}>
      <button onClick={()=>setShowScoring(s=>!s)} style={{ width:"100%", background:"transparent", border:"1px solid #e0e0e0", borderRadius:8, padding:"10px", fontSize:11, color:"#666666", letterSpacing:2, cursor:"pointer", fontFamily:"'Courier New',monospace" }}>
        {showScoring?"▲ HIDE SCORING GUIDE":"▼ SCORING GUIDE"}
      </button>
      {showScoring && (
        <div style={{ marginTop:6 }}>
          {[
            { title:"CEO",      time:"4:00+", color:"#c4941f" },
            { title:"DIRECTOR", time:"3:00+", color:"#888888" },
            { title:"MANAGER",  time:"2:00+", color:"#cd7f32" },
            { title:"INTERN",   time:"1:00+", color:"#5b8db8" },
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
      <div style={{ width:"100%", maxWidth:440, marginTop:8, marginBottom:8 }}><ShareButton /></div>
      <ReviewAnswers />

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
          ["🧠","5 questions in 5 minutes — answers grow from 5 to 9 letters and are all somehow connected. Crack the ANAGRAM to reveal the On This Day..."],
          ["💡","Stuck? Use the HINT button — it reveals a letter, but costs 15 seconds"],
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
        <ReviewAnswers />
        <div style={{ width:"100%", maxWidth:440, marginBottom:8 }}><ShareButton /></div>
        <ScoringGuide />
        <p style={{ color:"#888888", fontSize:9, letterSpacing:3, marginTop:8 }}>COME BACK TOMORROW FOR A NEW PUZZLE</p>
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
          <button onClick={takeHint} disabled={!canInput} style={{ background:canInput?"#c4941f":"#e0e0e0", border:`2px solid ${canInput?"#9a7000":"#cccccc"}`, color:canInput?"#ffffff":"#aaaaaa", borderRadius:8, padding:"12px 28px", fontSize:13, fontWeight:800, letterSpacing:2, cursor:canInput?"pointer":"default", fontFamily:"'Courier New',monospace", position:"relative", boxShadow:canInput?"0 4px 12px rgba(196,148,31,0.4)":"none" }}>
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
    </div>
  );
}
