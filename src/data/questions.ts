export type Question = {
  id: number;
  chapter: 1 | 2 | 3 | 4 | 5;
  topic: string;
  question: string;
  options: string[];
  correctAnswers: number[]; // indices into options[]
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
};

export const CHAPTERS: Record<number, string> = {
  1: "The Values and Principles of the UK",
  2: "What is the UK?",
  3: "A Long and Illustrious History",
  4: "A Modern, Thriving Society",
  5: "The UK Government, the Law and Your Role",
};

export const questions: Question[] = [
  // ─── CHAPTER 1: Values & Principles ───────────────────────────────────────
  {
    id: 1,
    chapter: 1,
    topic: "British Values",
    question: "Which of the following are fundamental principles of British life?",
    options: [
      "Democracy and the rule of law",
      "Individual liberty",
      "Mutual respect and tolerance",
      "All of the above",
    ],
    correctAnswers: [3],
    explanation:
      "The fundamental principles of British life include democracy, the rule of law, individual liberty, and mutual respect for and tolerance of those with different faiths and beliefs.",
    difficulty: "easy",
  },
  {
    id: 2,
    chapter: 1,
    topic: "British Values",
    question: "What does the Magna Carta (1215) primarily represent?",
    options: [
      "The establishment of the Church of England",
      "The principle that everyone, including the king, is subject to the law",
      "The right of women to vote",
      "The founding of Parliament",
    ],
    correctAnswers: [1],
    explanation:
      "Magna Carta (1215) established the principle that everyone, including the king, must obey the law. It is one of the earliest documents establishing the rule of law.",
    difficulty: "medium",
  },
  {
    id: 3,
    chapter: 1,
    topic: "British Values",
    question: "Which statement about the English language is correct?",
    options: [
      "Welsh is the official language of the UK",
      "English is the main language of the UK",
      "Gaelic is compulsory in Scottish schools",
      "There is no official language in the UK",
    ],
    correctAnswers: [1],
    explanation:
      "English is the main language spoken in the UK. There are also other languages spoken in various parts of the UK, including Welsh, Scottish Gaelic, and Irish.",
    difficulty: "easy",
  },
  {
    id: 4,
    chapter: 1,
    topic: "Rights and Responsibilities",
    question: "Which of the following is NOT listed as a responsibility of people living in the UK?",
    options: [
      "Obeying and upholding the law",
      "Looking after yourself and your family",
      "Voting in all elections",
      "Treating others with fairness",
    ],
    correctAnswers: [2],
    explanation:
      "While voting is an important right in the UK, it is not a compulsory legal responsibility. Responsibilities include obeying the law, looking after yourself and family, and treating others fairly.",
    difficulty: "medium",
  },
  {
    id: 5,
    chapter: 1,
    topic: "British Values",
    question: "What year did women over 30 first get the right to vote in the UK?",
    options: ["1902", "1918", "1928", "1945"],
    correctAnswers: [1],
    explanation:
      "In 1918, women over 30 who met certain property requirements were granted the right to vote. Equal voting rights for men and women came in 1928.",
    difficulty: "medium",
  },

  // ─── CHAPTER 2: What is the UK? ───────────────────────────────────────────
  {
    id: 6,
    chapter: 2,
    topic: "UK Geography",
    question: "Which countries make up the United Kingdom?",
    options: [
      "England, Scotland, Wales, and Northern Ireland",
      "England, Scotland, Wales, and Republic of Ireland",
      "England, Scotland, and Wales",
      "England, Scotland, Wales, Northern Ireland, and Channel Islands",
    ],
    correctAnswers: [0],
    explanation:
      "The United Kingdom consists of England, Scotland, Wales, and Northern Ireland. The Republic of Ireland is a separate country.",
    difficulty: "easy",
  },
  {
    id: 7,
    chapter: 2,
    topic: "UK Geography",
    question: "What is the capital city of Wales?",
    options: ["Swansea", "Newport", "Cardiff", "Aberystwyth"],
    correctAnswers: [2],
    explanation:
      "Cardiff (Caerdydd in Welsh) is the capital city and largest city of Wales. It became the capital in 1955.",
    difficulty: "easy",
  },
  {
    id: 8,
    chapter: 2,
    topic: "UK Geography",
    question: "What is the capital city of Scotland?",
    options: ["Glasgow", "Edinburgh", "Aberdeen", "Dundee"],
    correctAnswers: [1],
    explanation:
      "Edinburgh is the capital city of Scotland, though Glasgow is the largest city. Edinburgh is home to the Scottish Parliament.",
    difficulty: "easy",
  },
  {
    id: 9,
    chapter: 2,
    topic: "UK Geography",
    question: "What is the capital city of Northern Ireland?",
    options: ["Londonderry", "Armagh", "Belfast", "Lisburn"],
    correctAnswers: [2],
    explanation:
      "Belfast is the capital and largest city of Northern Ireland. It is home to the Northern Ireland Assembly.",
    difficulty: "easy",
  },
  {
    id: 10,
    chapter: 2,
    topic: "UK Geography",
    question: "Which is the longest river in the UK?",
    options: ["River Thames", "River Severn", "River Trent", "River Clyde"],
    correctAnswers: [1],
    explanation:
      "The River Severn is the longest river in the UK at about 354 km (220 miles). It flows through Wales and England.",
    difficulty: "medium",
  },
  {
    id: 11,
    chapter: 2,
    topic: "UK Geography",
    question: "What is Ben Nevis?",
    options: [
      "The longest river in Scotland",
      "The highest mountain in the UK",
      "A famous Scottish lake",
      "The largest island off the Scottish coast",
    ],
    correctAnswers: [1],
    explanation:
      "Ben Nevis, located in Scotland, is the highest mountain in the UK at 1,345 metres (4,411 feet) above sea level.",
    difficulty: "easy",
  },
  {
    id: 12,
    chapter: 2,
    topic: "Patron Saints",
    question: "Who is the patron saint of England?",
    options: ["St Andrew", "St David", "St George", "St Patrick"],
    correctAnswers: [2],
    explanation:
      "St George is the patron saint of England. St George's Day is celebrated on 23 April. The flag of England features the Cross of St George.",
    difficulty: "easy",
  },
  {
    id: 13,
    chapter: 2,
    topic: "Patron Saints",
    question: "On what date is St Patrick's Day celebrated?",
    options: ["1 March", "17 March", "23 April", "30 November"],
    correctAnswers: [1],
    explanation:
      "St Patrick's Day is celebrated on 17 March. St Patrick is the patron saint of Ireland (both Northern Ireland and the Republic).",
    difficulty: "easy",
  },
  {
    id: 14,
    chapter: 2,
    topic: "National Symbols",
    question: "What do the three lions on the England football shirt represent?",
    options: [
      "The three kingdoms united under England",
      "The Royal Standard of England",
      "The original English counties",
      "Lions introduced to England by the Romans",
    ],
    correctAnswers: [1],
    explanation:
      "The three lions (passant guardant) are part of the Royal Standard of England and have been associated with English royalty since the 12th century.",
    difficulty: "hard",
  },
  {
    id: 15,
    chapter: 2,
    topic: "UK Geography",
    question: "What is the currency of the United Kingdom?",
    options: ["Euro", "Pound Sterling", "British Dollar", "Crown"],
    correctAnswers: [1],
    explanation:
      "The currency of the United Kingdom is the Pound Sterling (£). The UK did not join the Eurozone and retains the pound.",
    difficulty: "easy",
  },

  // ─── CHAPTER 3: History ────────────────────────────────────────────────────
  {
    id: 16,
    chapter: 3,
    topic: "Early Britain",
    question: "When did Britain become permanently separated from continental Europe by the English Channel?",
    options: ["Around 50,000 years ago", "Around 10,000 years ago", "Around 5,000 years ago", "Around 2,000 years ago"],
    correctAnswers: [1],
    explanation:
      "Britain became permanently separated from the continent by the English Channel (La Manche) around 10,000 years ago, at the end of the last Ice Age.",
    difficulty: "medium",
  },
  {
    id: 17,
    chapter: 3,
    topic: "Early Britain",
    question: "The first people to inhabit Britain were known as what?",
    options: ["Farmers", "Hunter-gatherers", "Iron Age warriors", "Bronze Age traders"],
    correctAnswers: [1],
    explanation:
      "The first people to live in Britain were hunter-gatherers, living in what we call the Stone Age. They hunted animals and gathered plants for food.",
    difficulty: "easy",
  },
  {
    id: 18,
    chapter: 3,
    topic: "Early Britain",
    question: "Stonehenge was built during which period?",
    options: ["The Stone Age", "The Bronze Age", "The Iron Age", "The Roman period"],
    correctAnswers: [1],
    explanation:
      "Stonehenge was built during the Bronze Age. It was constructed in stages, with the main stone circle erected around 2500 BC.",
    difficulty: "medium",
  },
  {
    id: 19,
    chapter: 3,
    topic: "Roman Britain",
    question: "Julius Caesar first came to Britain in which year?",
    options: ["55 BC", "43 AD", "410 AD", "1066 AD"],
    correctAnswers: [0],
    explanation:
      "Julius Caesar first came to Britain in 55 BC. The Roman conquest began properly in 43 AD under Emperor Claudius.",
    difficulty: "medium",
  },
  {
    id: 20,
    chapter: 3,
    topic: "Roman Britain",
    question: "What did the Romans call the northern part of Britain beyond Hadrian's Wall?",
    options: ["Albion", "Caledonia", "Hibernia", "Britannia"],
    correctAnswers: [1],
    explanation:
      "The Romans called the northern part of Britain (roughly modern Scotland) Caledonia. Hadrian's Wall was built to defend against raids from the Caledonians.",
    difficulty: "hard",
  },
  {
    id: 21,
    chapter: 3,
    topic: "Roman Britain",
    question: "Hadrian's Wall was built across northern England to mark which boundary?",
    options: [
      "The border between England and Wales",
      "The northern frontier of the Roman Empire",
      "The boundary between English and Scottish kingdoms",
      "The line between Norman and Saxon territory",
    ],
    correctAnswers: [1],
    explanation:
      "Hadrian's Wall was built in 122 AD by Emperor Hadrian as the northern frontier of the Roman Empire. It stretches 73 miles across northern England.",
    difficulty: "easy",
  },
  {
    id: 22,
    chapter: 3,
    topic: "Anglo-Saxons",
    question: "Which people invaded Britain after the Romans left in 410 AD?",
    options: [
      "The Vikings",
      "The Normans",
      "The Anglo-Saxons (Angles, Saxons, and Jutes)",
      "The Danes",
    ],
    correctAnswers: [2],
    explanation:
      "After the Romans left in 410 AD, the Anglo-Saxons (Angles, Saxons, and Jutes from northern Europe) invaded and settled in Britain.",
    difficulty: "easy",
  },
  {
    id: 23,
    chapter: 3,
    topic: "Anglo-Saxons",
    question: "Who was King Alfred the Great?",
    options: [
      "The first Norman king of England",
      "The King of Wessex who defeated the Vikings",
      "The last Anglo-Saxon king of England",
      "The king who signed Magna Carta",
    ],
    correctAnswers: [1],
    explanation:
      "Alfred the Great was the King of Wessex (871–899). He united the Anglo-Saxons against the Vikings and is known for establishing the English language as the language of government.",
    difficulty: "medium",
  },
  {
    id: 24,
    chapter: 3,
    topic: "Norman Conquest",
    question: "In which year did William the Conqueror win the Battle of Hastings?",
    options: ["1016", "1066", "1215", "1314"],
    correctAnswers: [1],
    explanation:
      "William the Conqueror defeated King Harold at the Battle of Hastings in 1066. This marked the beginning of Norman rule in England.",
    difficulty: "easy",
  },
  {
    id: 25,
    chapter: 3,
    topic: "Norman Conquest",
    question: "What is the Domesday Book?",
    options: [
      "A medieval religious text",
      "A survey of England and Wales commissioned by William the Conqueror in 1086",
      "The first English legal code",
      "A record of the Norman invasion",
    ],
    correctAnswers: [1],
    explanation:
      "The Domesday Book was a great survey of England and Wales completed in 1086, commissioned by William the Conqueror. It recorded land ownership and property values for taxation purposes.",
    difficulty: "medium",
  },
  {
    id: 26,
    chapter: 3,
    topic: "Medieval History",
    question: "The Magna Carta was signed in which year?",
    options: ["1066", "1215", "1314", "1415"],
    correctAnswers: [1],
    explanation:
      "Magna Carta (Great Charter) was signed by King John in 1215. It established for the first time that the king was subject to the rule of law.",
    difficulty: "easy",
  },
  {
    id: 27,
    chapter: 3,
    topic: "Medieval History",
    question: "The Black Death killed approximately what proportion of England's population in the 14th century?",
    options: ["One tenth", "One fifth", "One third", "Half"],
    correctAnswers: [2],
    explanation:
      "The Black Death (bubonic plague) arrived in England in 1348 and killed approximately one third of the entire population.",
    difficulty: "medium",
  },
  {
    id: 28,
    chapter: 3,
    topic: "Tudor Period",
    question: "Which Tudor monarch broke with the Catholic Church and established the Church of England?",
    options: ["Henry VII", "Henry VIII", "Edward VI", "Mary I"],
    correctAnswers: [1],
    explanation:
      "Henry VIII broke with the Catholic Church in Rome when the Pope refused to annul his marriage to Catherine of Aragon. He established the Church of England with himself as its head.",
    difficulty: "easy",
  },
  {
    id: 29,
    chapter: 3,
    topic: "Tudor Period",
    question: "In which year did the Spanish Armada attempt to invade England?",
    options: ["1564", "1588", "1605", "1642"],
    correctAnswers: [1],
    explanation:
      "The Spanish Armada attempted to invade England in 1588 during the reign of Queen Elizabeth I. The English fleet defeated the Armada.",
    difficulty: "medium",
  },
  {
    id: 30,
    chapter: 3,
    topic: "Tudor Period",
    question: "William Shakespeare lived during which period?",
    options: ["The Medieval period", "The Tudor and early Stuart periods", "The Georgian period", "The Victorian era"],
    correctAnswers: [1],
    explanation:
      "William Shakespeare (1564–1616) lived during the Tudor and early Stuart periods. He is widely regarded as the greatest writer in the English language.",
    difficulty: "medium",
  },
  {
    id: 31,
    chapter: 3,
    topic: "Stuart Period",
    question: "What was the Gunpowder Plot of 1605?",
    options: [
      "A plot to assassinate Queen Elizabeth I",
      "A failed attempt by Catholic conspirators to blow up Parliament",
      "A plan to import gunpowder from Spain",
      "An attempt to overthrow Cromwell",
    ],
    correctAnswers: [1],
    explanation:
      "The Gunpowder Plot of 1605 was a failed attempt by Catholic conspirators, led by Robert Catesby and including Guy Fawkes, to blow up the Houses of Parliament and kill King James I.",
    difficulty: "easy",
  },
  {
    id: 32,
    chapter: 3,
    topic: "Stuart Period",
    question: "The English Civil War was fought between which two sides?",
    options: [
      "Royalists (Cavaliers) vs Parliamentarians (Roundheads)",
      "Protestants vs Catholics",
      "England vs Scotland",
      "Normans vs Anglo-Saxons",
    ],
    correctAnswers: [0],
    explanation:
      "The English Civil War (1642–1651) was fought between the Royalists (Cavaliers), supporting King Charles I, and the Parliamentarians (Roundheads), led by Oliver Cromwell.",
    difficulty: "easy",
  },
  {
    id: 33,
    chapter: 3,
    topic: "Stuart Period",
    question: "The Glorious Revolution of 1688 resulted in which major constitutional change?",
    options: [
      "The abolition of the monarchy",
      "Parliament's authority over the monarchy being confirmed",
      "Scotland joining the union with England",
      "The establishment of the House of Lords",
    ],
    correctAnswers: [1],
    explanation:
      "The Glorious Revolution of 1688 established the principle of parliamentary sovereignty — that Parliament, not the monarch, held supreme authority. This led to the Bill of Rights (1689).",
    difficulty: "medium",
  },
  {
    id: 34,
    chapter: 3,
    topic: "18th-19th Century",
    question: "The Acts of Union in 1707 united which two countries?",
    options: [
      "England and Wales",
      "England and Ireland",
      "England/Wales and Scotland",
      "Great Britain and Ireland",
    ],
    correctAnswers: [2],
    explanation:
      "The Acts of Union 1707 united the Kingdom of England (which included Wales) and the Kingdom of Scotland to create the Kingdom of Great Britain.",
    difficulty: "medium",
  },
  {
    id: 35,
    chapter: 3,
    topic: "18th-19th Century",
    question: "The Battle of Waterloo in 1815 ended the power of which leader?",
    options: ["King Louis XVI of France", "Napoleon Bonaparte", "Kaiser Wilhelm I", "Frederick the Great"],
    correctAnswers: [1],
    explanation:
      "The Battle of Waterloo (18 June 1815) ended Napoleon Bonaparte's rule. The Duke of Wellington led the allied forces that defeated Napoleon.",
    difficulty: "easy",
  },
  {
    id: 36,
    chapter: 3,
    topic: "18th-19th Century",
    question: "Who led the movement to abolish the slave trade in Britain?",
    options: ["William Wilberforce", "Oliver Cromwell", "Robert Walpole", "Duke of Wellington"],
    correctAnswers: [0],
    explanation:
      "William Wilberforce was the leading politician in the movement to abolish the slave trade. The Slave Trade Act was passed in 1807, and slavery was abolished throughout the British Empire in 1833.",
    difficulty: "medium",
  },
  {
    id: 37,
    chapter: 3,
    topic: "20th Century",
    question: "In which year did the First World War begin?",
    options: ["1912", "1914", "1916", "1918"],
    correctAnswers: [1],
    explanation:
      "The First World War began in 1914, following the assassination of Archduke Franz Ferdinand of Austria. Britain entered the war on 4 August 1914.",
    difficulty: "easy",
  },
  {
    id: 38,
    chapter: 3,
    topic: "20th Century",
    question: "Who was the British Prime Minister during most of the Second World War?",
    options: ["Neville Chamberlain", "Winston Churchill", "Clement Attlee", "Anthony Eden"],
    correctAnswers: [1],
    explanation:
      "Winston Churchill became Prime Minister in May 1940 and led Britain through most of the Second World War. His speeches helped inspire the nation during the darkest times.",
    difficulty: "easy",
  },
  {
    id: 39,
    chapter: 3,
    topic: "20th Century",
    question: "What was the Suffragette movement?",
    options: [
      "A campaign for workers' rights",
      "A campaign by women to win the right to vote",
      "A movement against the slave trade",
      "A campaign for Irish independence",
    ],
    correctAnswers: [1],
    explanation:
      "The Suffragettes were members of a women's organisation that campaigned for women's right to vote. Key figures included Emmeline Pankhurst and her daughters.",
    difficulty: "easy",
  },
  {
    id: 40,
    chapter: 3,
    topic: "20th Century",
    question: "What was the National Health Service (NHS) established in?",
    options: ["1945", "1948", "1951", "1960"],
    correctAnswers: [1],
    explanation:
      "The National Health Service (NHS) was established in 1948 by the post-war Labour government under Prime Minister Clement Attlee. It provides free healthcare to all UK residents.",
    difficulty: "easy",
  },

  // ─── CHAPTER 4: Modern Society ────────────────────────────────────────────
  {
    id: 41,
    chapter: 4,
    topic: "UK Population",
    question: "Approximately what is the population of the United Kingdom?",
    options: ["45 million", "56 million", "67 million", "75 million"],
    correctAnswers: [2],
    explanation:
      "The UK has a population of approximately 67 million people. England is by far the most populous nation within the UK.",
    difficulty: "easy",
  },
  {
    id: 42,
    chapter: 4,
    topic: "Religion",
    question: "What is the official religion of England?",
    options: ["Roman Catholicism", "Church of England (Anglican)", "Methodism", "There is no official religion"],
    correctAnswers: [1],
    explanation:
      "The Church of England (Anglican) is the official religion of England. The monarch is the Supreme Governor of the Church of England.",
    difficulty: "easy",
  },
  {
    id: 43,
    chapter: 4,
    topic: "Religion",
    question: "What percentage of the UK population identifies as Christian, according to the 2011 census?",
    options: ["33%", "49%", "59%", "70%"],
    correctAnswers: [2],
    explanation:
      "According to the 2011 census, 59% of people in the UK identified as Christian. This was the largest religious group, though the proportion has been declining.",
    difficulty: "hard",
  },
  {
    id: 44,
    chapter: 4,
    topic: "Education",
    question: "At what age is full-time education compulsory in England?",
    options: ["Until 14", "Until 16", "Until 18", "Until 21"],
    correctAnswers: [1],
    explanation:
      "Full-time education is compulsory in England for all children aged 5 to 16. Since 2013, young people must also be in some form of education or training until age 18.",
    difficulty: "medium",
  },
  {
    id: 45,
    chapter: 4,
    topic: "Education",
    question: "Which is the oldest university in the English-speaking world?",
    options: ["Cambridge", "Oxford", "Durham", "St Andrews"],
    correctAnswers: [1],
    explanation:
      "Oxford University is the oldest university in the English-speaking world, with teaching dating back to 1096. Cambridge was founded in 1209.",
    difficulty: "medium",
  },
  {
    id: 46,
    chapter: 4,
    topic: "Culture and Sport",
    question: "Which sport is considered England's national sport?",
    options: ["Football", "Cricket", "Rugby", "Tennis"],
    correctAnswers: [1],
    explanation:
      "Cricket is considered England's national sport, though football is the most popular spectator sport. England is where both cricket and football were codified.",
    difficulty: "medium",
  },
  {
    id: 47,
    chapter: 4,
    topic: "Culture and Sport",
    question: "Where is the annual Wimbledon tennis tournament held?",
    options: ["Nottingham", "London", "Bristol", "Oxford"],
    correctAnswers: [1],
    explanation:
      "The Wimbledon Championships are held at the All England Lawn Tennis and Croquet Club in Wimbledon, London. It is the oldest tennis tournament in the world.",
    difficulty: "easy",
  },
  {
    id: 48,
    chapter: 4,
    topic: "Culture and Sport",
    question: "Who wrote the Harry Potter series of books?",
    options: ["Roald Dahl", "J.K. Rowling", "Terry Pratchett", "Philip Pullman"],
    correctAnswers: [1],
    explanation:
      "J.K. Rowling wrote the Harry Potter series, which became one of the best-selling book series in history. The books were published between 1997 and 2007.",
    difficulty: "easy",
  },
  {
    id: 49,
    chapter: 4,
    topic: "Arts and Culture",
    question: "Who painted The Fighting Temeraire, voted the greatest painting in Britain?",
    options: ["John Constable", "J.M.W. Turner", "Thomas Gainsborough", "William Hogarth"],
    correctAnswers: [1],
    explanation:
      "J.M.W. Turner painted The Fighting Temeraire (1839), which was voted the greatest painting in Britain in a 2005 public poll. Turner is known for his atmospheric landscapes and seascapes.",
    difficulty: "hard",
  },
  {
    id: 50,
    chapter: 4,
    topic: "Arts and Culture",
    question: "The BBC is funded primarily by what?",
    options: [
      "Government grants",
      "Commercial advertising",
      "The licence fee",
      "Subscriptions",
    ],
    correctAnswers: [2],
    explanation:
      "The BBC (British Broadcasting Corporation) is primarily funded by the television licence fee, paid by UK households that watch live TV or use the iPlayer.",
    difficulty: "easy",
  },
  {
    id: 51,
    chapter: 4,
    topic: "Traditions",
    question: "What is Bonfire Night (Guy Fawkes Night) celebrated on?",
    options: ["31 October", "5 November", "11 November", "25 December"],
    correctAnswers: [1],
    explanation:
      "Bonfire Night (Guy Fawkes Night) is celebrated on 5 November, commemorating the failure of the Gunpowder Plot of 1605 when Guy Fawkes and conspirators tried to blow up Parliament.",
    difficulty: "easy",
  },
  {
    id: 52,
    chapter: 4,
    topic: "Traditions",
    question: "What happens on Remembrance Day (11 November)?",
    options: [
      "The anniversary of the Queen's coronation is celebrated",
      "People remember those who died in wars, especially the two World Wars",
      "New citizens are sworn in",
      "Parliament opens for a new year",
    ],
    correctAnswers: [1],
    explanation:
      "Remembrance Day (11 November) commemorates the armistice that ended World War I in 1918. People observe a two-minute silence at 11am to remember those who died in wars.",
    difficulty: "easy",
  },
  {
    id: 53,
    chapter: 4,
    topic: "Food and Drink",
    question: "Which of the following is a traditional British food?",
    options: ["Haggis", "Paella", "Moussaka", "Tiramisu"],
    correctAnswers: [0],
    explanation:
      "Haggis is a traditional Scottish dish made from sheep's offal mixed with oatmeal, onions, and spices, traditionally cooked in a sheep's stomach. It is the national dish of Scotland.",
    difficulty: "easy",
  },
  {
    id: 54,
    chapter: 4,
    topic: "Social Issues",
    question: "What does the Equality Act 2010 protect people against?",
    options: [
      "Only racial discrimination",
      "Discrimination based on protected characteristics including age, sex, race, disability, and sexual orientation",
      "Discrimination only in the workplace",
      "Religious discrimination only",
    ],
    correctAnswers: [1],
    explanation:
      "The Equality Act 2010 protects people from discrimination based on 'protected characteristics' including age, disability, gender reassignment, marriage, pregnancy, race, religion, sex, and sexual orientation.",
    difficulty: "medium",
  },
  {
    id: 55,
    chapter: 4,
    topic: "Music",
    question: "Which British band is known as 'The Fab Four'?",
    options: ["The Rolling Stones", "The Beatles", "Led Zeppelin", "Pink Floyd"],
    correctAnswers: [1],
    explanation:
      "The Beatles, from Liverpool, are known as 'The Fab Four'. They are widely regarded as the most influential music group in history and were central to the 'British Invasion' of the US in the 1960s.",
    difficulty: "easy",
  },
  {
    id: 56,
    chapter: 4,
    topic: "Architecture",
    question: "Who designed St Paul's Cathedral in London?",
    options: ["Inigo Jones", "Christopher Wren", "John Nash", "Nicholas Hawksmoor"],
    correctAnswers: [1],
    explanation:
      "St Paul's Cathedral was designed by Sir Christopher Wren and built between 1675 and 1710 after the Great Fire of London destroyed the previous cathedral.",
    difficulty: "medium",
  },
  {
    id: 57,
    chapter: 4,
    topic: "Science and Technology",
    question: "Who developed the theory of evolution by natural selection?",
    options: ["Isaac Newton", "Charles Darwin", "Michael Faraday", "James Watt"],
    correctAnswers: [1],
    explanation:
      "Charles Darwin published On the Origin of Species in 1859, which described the theory of evolution by natural selection. Darwin is one of the most influential scientists in history.",
    difficulty: "easy",
  },
  {
    id: 58,
    chapter: 4,
    topic: "Science and Technology",
    question: "Who invented the World Wide Web?",
    options: ["Bill Gates", "Steve Jobs", "Tim Berners-Lee", "Alan Turing"],
    correctAnswers: [2],
    explanation:
      "Sir Tim Berners-Lee, a British scientist, invented the World Wide Web in 1989 while working at CERN. He proposed a system for sharing information over the internet.",
    difficulty: "easy",
  },
  {
    id: 59,
    chapter: 4,
    topic: "Science and Technology",
    question: "What is Alan Turing known for?",
    options: [
      "Inventing the telephone",
      "Pioneering work in computing and breaking the Enigma code in WWII",
      "Discovering penicillin",
      "Developing the theory of relativity",
    ],
    correctAnswers: [1],
    explanation:
      "Alan Turing was a mathematician and computer scientist who played a crucial role in breaking the German Enigma code during WWII. He is also considered the father of theoretical computer science.",
    difficulty: "medium",
  },
  {
    id: 60,
    chapter: 4,
    topic: "NHS and Welfare",
    question: "What year was the welfare state established in the UK?",
    options: ["1939", "1945", "1948", "1955"],
    correctAnswers: [2],
    explanation:
      "The modern welfare state was established in 1948, following the Beveridge Report recommendations. The NHS and the National Insurance system were both introduced that year.",
    difficulty: "medium",
  },

  // ─── CHAPTER 5: Government, Law and Citizenship ───────────────────────────
  {
    id: 61,
    chapter: 5,
    topic: "Parliament",
    question: "Which two Houses make up the UK Parliament?",
    options: [
      "The House of Lords and the House of Representatives",
      "The House of Commons and the Senate",
      "The House of Commons and the House of Lords",
      "The Upper House and the Chamber of Deputies",
    ],
    correctAnswers: [2],
    explanation:
      "The UK Parliament consists of the House of Commons (elected MPs) and the House of Lords (appointed and hereditary peers). Together they make and scrutinise laws.",
    difficulty: "easy",
  },
  {
    id: 62,
    chapter: 5,
    topic: "Parliament",
    question: "How are Members of Parliament (MPs) elected?",
    options: [
      "Proportional representation",
      "First past the post",
      "Single transferable vote",
      "Appointed by the Prime Minister",
    ],
    correctAnswers: [1],
    explanation:
      "MPs are elected using the 'First Past the Post' system. The candidate with the most votes in each constituency wins the seat, even if they don't have a majority.",
    difficulty: "medium",
  },
  {
    id: 63,
    chapter: 5,
    topic: "Parliament",
    question: "How often must a general election be held in the UK?",
    options: ["Every 3 years", "Every 4 years", "Every 5 years", "Every 6 years"],
    correctAnswers: [2],
    explanation:
      "Under the Fixed-term Parliaments Act 2011, general elections must be held every five years. However, the Prime Minister can call an early election under certain circumstances.",
    difficulty: "medium",
  },
  {
    id: 64,
    chapter: 5,
    topic: "The Monarchy",
    question: "What is the role of the monarch in the UK today?",
    options: [
      "The monarch governs the country and appoints all ministers",
      "The monarch is largely ceremonial but has important constitutional duties",
      "The monarch has no role at all in government",
      "The monarch controls the armed forces exclusively",
    ],
    correctAnswers: [1],
    explanation:
      "The UK monarch has a largely ceremonial role today but retains important constitutional duties, including opening Parliament, appointing the Prime Minister, and granting Royal Assent to laws.",
    difficulty: "medium",
  },
  {
    id: 65,
    chapter: 5,
    topic: "The Monarchy",
    question: "Who became King of the United Kingdom in September 2022?",
    options: ["Prince William", "King Charles III", "Prince Harry", "Prince Andrew"],
    correctAnswers: [1],
    explanation:
      "King Charles III became the monarch of the United Kingdom on 8 September 2022, following the death of Queen Elizabeth II. He had been Prince of Wales for over 50 years.",
    difficulty: "easy",
  },
  {
    id: 66,
    chapter: 5,
    topic: "Devolution",
    question: "The Scottish Parliament was established in which year?",
    options: ["1997", "1999", "2001", "2003"],
    correctAnswers: [1],
    explanation:
      "The Scottish Parliament was established in 1999 following a referendum in 1997. It has devolved powers over matters such as health, education, and justice in Scotland.",
    difficulty: "medium",
  },
  {
    id: 67,
    chapter: 5,
    topic: "Devolution",
    question: "Which body is responsible for making laws in Wales?",
    options: [
      "The Welsh Assembly (now Senedd Cymru)",
      "The Westminster Parliament",
      "The Welsh Office",
      "The House of Lords",
    ],
    correctAnswers: [0],
    explanation:
      "The Senedd Cymru (Welsh Parliament), previously known as the National Assembly for Wales, is responsible for making laws in Wales on devolved matters. It was established in 1999.",
    difficulty: "medium",
  },
  {
    id: 68,
    chapter: 5,
    topic: "The Law",
    question: "What is the presumption of innocence in UK law?",
    options: [
      "That anyone accused of a crime is assumed guilty",
      "That everyone is assumed innocent until proven guilty",
      "That the police can detain anyone for any reason",
      "That confessions are always considered true",
    ],
    correctAnswers: [1],
    explanation:
      "In UK law, everyone is presumed innocent until proven guilty. The burden of proof lies with the prosecution to prove guilt 'beyond reasonable doubt'.",
    difficulty: "easy",
  },
  {
    id: 69,
    chapter: 5,
    topic: "The Law",
    question: "What is the purpose of a jury in a Crown Court trial?",
    options: [
      "To set the sentence for the convicted",
      "To decide whether the defendant is guilty or not guilty",
      "To advise the judge on points of law",
      "To question the witnesses",
    ],
    correctAnswers: [1],
    explanation:
      "A jury in a Crown Court consists of 12 members of the public, who listen to evidence and decide whether the defendant is guilty or not guilty. The judge then sets the sentence if guilty.",
    difficulty: "easy",
  },
  {
    id: 70,
    chapter: 5,
    topic: "Voting",
    question: "At what age can people vote in a UK general election?",
    options: ["16", "17", "18", "21"],
    correctAnswers: [2],
    explanation:
      "You must be 18 years old to vote in a UK general election. In Scotland and Wales, the voting age for devolved elections is 16.",
    difficulty: "easy",
  },
  {
    id: 71,
    chapter: 5,
    topic: "Voting",
    question: "To vote in a UK election, what must you do first?",
    options: [
      "Apply for a National Insurance number",
      "Register on the electoral roll",
      "Obtain a driving licence",
      "Have lived in the UK for 5 years",
    ],
    correctAnswers: [1],
    explanation:
      "To vote in UK elections, you must first register to vote (register on the electoral roll). You can register online, by post, or in person.",
    difficulty: "easy",
  },
  {
    id: 72,
    chapter: 5,
    topic: "The Courts",
    question: "What is the highest court in the UK?",
    options: [
      "The Court of Appeal",
      "The Crown Court",
      "The Supreme Court",
      "The High Court",
    ],
    correctAnswers: [2],
    explanation:
      "The Supreme Court of the United Kingdom is the highest court in the land for all civil and criminal cases. It was established in 2009, replacing the Appellate Committee of the House of Lords.",
    difficulty: "medium",
  },
  {
    id: 73,
    chapter: 5,
    topic: "Human Rights",
    question: "The Human Rights Act 1998 incorporated which international agreement into UK law?",
    options: [
      "The Universal Declaration of Human Rights",
      "The European Convention on Human Rights",
      "The Geneva Convention",
      "The UN Convention on the Rights of the Child",
    ],
    correctAnswers: [1],
    explanation:
      "The Human Rights Act 1998 incorporated the European Convention on Human Rights into UK law, giving people the right to enforce Convention rights in UK courts.",
    difficulty: "medium",
  },
  {
    id: 74,
    chapter: 5,
    topic: "Local Government",
    question: "What is the main role of local councils in the UK?",
    options: [
      "To make national laws",
      "To control foreign policy",
      "To provide local services like education, waste collection, and planning",
      "To manage the NHS",
    ],
    correctAnswers: [2],
    explanation:
      "Local councils provide a wide range of local services including education, waste collection, local planning, parks and leisure facilities, and social care.",
    difficulty: "easy",
  },
  {
    id: 75,
    chapter: 5,
    topic: "Citizenship",
    question: "What ceremony must applicants attend to become a British citizen?",
    options: [
      "A Parliamentary ceremony",
      "A citizenship ceremony",
      "A church ceremony",
      "An oath at a police station",
    ],
    correctAnswers: [1],
    explanation:
      "Applicants for British citizenship must attend a citizenship ceremony, where they make a pledge of loyalty to the UK and receive their certificate of naturalisation.",
    difficulty: "easy",
  },
  {
    id: 76,
    chapter: 5,
    topic: "Citizenship",
    question: "Which test must applicants pass before being granted British citizenship?",
    options: [
      "The British Values Test",
      "The Life in the UK Test",
      "The English Language Proficiency Test",
      "The Civic Integration Exam",
    ],
    correctAnswers: [1],
    explanation:
      "Applicants for British citizenship must pass the Life in the UK Test. The test covers British history, culture, and values as described in the official handbook.",
    difficulty: "easy",
  },
  {
    id: 77,
    chapter: 5,
    topic: "Parliament",
    question: "What is the role of the Speaker in the House of Commons?",
    options: [
      "To present the government's legislative programme",
      "To chair debates and maintain order in the House",
      "To advise the Prime Minister on legislation",
      "To represent the UK in international negotiations",
    ],
    correctAnswers: [1],
    explanation:
      "The Speaker of the House of Commons chairs debates and maintains order during proceedings. The Speaker is elected by other MPs and is expected to be impartial.",
    difficulty: "medium",
  },
  {
    id: 78,
    chapter: 5,
    topic: "The Prime Minister",
    question: "How does someone become Prime Minister in the UK?",
    options: [
      "They are directly elected by the public",
      "They are appointed by the monarch as leader of the party that can command a Commons majority",
      "They are chosen by the House of Lords",
      "They are appointed by the outgoing Prime Minister",
    ],
    correctAnswers: [1],
    explanation:
      "The Prime Minister is appointed by the monarch and is usually the leader of the political party that has the majority of seats in the House of Commons.",
    difficulty: "medium",
  },
  {
    id: 79,
    chapter: 5,
    topic: "The Law",
    question: "What does the term 'small claims court' refer to?",
    options: [
      "A court for minor criminal offences",
      "A civil court for resolving disputes involving small sums of money",
      "A court for juvenile offenders",
      "A court that handles parking fines",
    ],
    correctAnswers: [1],
    explanation:
      "The small claims court is part of the civil court system and is designed to resolve disputes involving small sums of money (usually under £10,000 in England and Wales) without expensive legal proceedings.",
    difficulty: "medium",
  },
  {
    id: 80,
    chapter: 5,
    topic: "Taxation",
    question: "What is National Insurance (NI)?",
    options: [
      "A private health insurance scheme",
      "Contributions to the state that fund benefits like the State Pension and NHS",
      "A savings scheme for retirement",
      "A government fund for natural disasters",
    ],
    correctAnswers: [1],
    explanation:
      "National Insurance (NI) contributions are payments made by employees and employers that fund government benefits including the State Pension, NHS, and unemployment benefits.",
    difficulty: "medium",
  },

  // Extra mixed-chapter questions
  {
    id: 81,
    chapter: 3,
    topic: "Medieval History",
    question: "Which king signed the Magna Carta under pressure from barons?",
    options: ["King John", "King Henry II", "King Richard I", "King Edward I"],
    correctAnswers: [0],
    explanation:
      "King John signed the Magna Carta at Runnymede in 1215, under pressure from rebellious barons. The document limited royal power and laid the groundwork for constitutional monarchy.",
    difficulty: "easy",
  },
  {
    id: 82,
    chapter: 3,
    topic: "Tudor Period",
    question: "How many wives did Henry VIII have?",
    options: ["Two", "Four", "Six", "Eight"],
    correctAnswers: [2],
    explanation:
      "Henry VIII had six wives: Catherine of Aragon, Anne Boleyn, Jane Seymour, Anne of Cleves, Catherine Howard, and Catherine Parr.",
    difficulty: "easy",
  },
  {
    id: 83,
    chapter: 4,
    topic: "Culture and Sport",
    question: "What sport was invented in Britain and has its most famous championship at Wimbledon?",
    options: ["Squash", "Badminton", "Lawn Tennis", "Table Tennis"],
    correctAnswers: [2],
    explanation:
      "Lawn tennis was invented in Britain in the 1860s. The Wimbledon Championships, held annually in London, is the world's oldest and most prestigious tennis tournament.",
    difficulty: "easy",
  },
  {
    id: 84,
    chapter: 5,
    topic: "Devolution",
    question: "Northern Ireland's devolved legislature is called what?",
    options: [
      "The Northern Ireland Assembly",
      "The Dáil",
      "The Stormont Parliament",
      "The Northern Ireland Senate",
    ],
    correctAnswers: [0],
    explanation:
      "The Northern Ireland Assembly is the devolved legislature of Northern Ireland. It was established by the Belfast (Good Friday) Agreement in 1998.",
    difficulty: "medium",
  },
  {
    id: 85,
    chapter: 3,
    topic: "20th Century",
    question: "The Good Friday Agreement of 1998 was an agreement about peace in which part of the UK?",
    options: ["Scotland", "Wales", "Northern Ireland", "Channel Islands"],
    correctAnswers: [2],
    explanation:
      "The Good Friday Agreement (Belfast Agreement) of 1998 was a major political development that helped end the period of conflict known as 'the Troubles' in Northern Ireland.",
    difficulty: "easy",
  },
  {
    id: 86,
    chapter: 4,
    topic: "Arts and Culture",
    question: "Which British playwright wrote A Midsummer Night's Dream and Hamlet?",
    options: ["Christopher Marlowe", "William Shakespeare", "Ben Jonson", "John Milton"],
    correctAnswers: [1],
    explanation:
      "William Shakespeare wrote both A Midsummer Night's Dream and Hamlet, along with many other famous plays and sonnets. He is widely considered the greatest writer in the English language.",
    difficulty: "easy",
  },
  {
    id: 87,
    chapter: 5,
    topic: "The Law",
    question: "What is the role of the police in the UK?",
    options: [
      "To make laws and enforce them",
      "To protect life and property, prevent crime, and keep the peace",
      "Only to deal with serious crimes",
      "To prosecute criminals in court",
    ],
    correctAnswers: [1],
    explanation:
      "The police in the UK have a duty to protect life and property, prevent crime, and keep the peace. There are separate police forces for England and Wales, Scotland, and Northern Ireland.",
    difficulty: "easy",
  },
  {
    id: 88,
    chapter: 4,
    topic: "NHS and Welfare",
    question: "Which service do you call for a life-threatening emergency in the UK?",
    options: ["111", "999", "101", "112"],
    correctAnswers: [1],
    explanation:
      "999 is the emergency telephone number in the UK for police, fire, and ambulance services. 111 is for urgent medical advice that is not a life-threatening emergency.",
    difficulty: "easy",
  },
  {
    id: 89,
    chapter: 3,
    topic: "20th Century",
    question: "In which year did the Berlin Wall fall, marking the end of the Cold War?",
    options: ["1985", "1987", "1989", "1991"],
    correctAnswers: [2],
    explanation:
      "The Berlin Wall fell on 9 November 1989, symbolising the end of the Cold War division of Europe. The Soviet Union itself was dissolved in 1991.",
    difficulty: "medium",
  },
  {
    id: 90,
    chapter: 2,
    topic: "UK Geography",
    question: "Which island is closest to the coast of Scotland?",
    options: ["The Isle of Man", "Jersey", "Guernsey", "The Isle of Wight"],
    correctAnswers: [0],
    explanation:
      "The Isle of Man is located in the Irish Sea, midway between Great Britain and Ireland. It is a Crown dependency, not part of the UK, but the British monarch is Lord of Mann.",
    difficulty: "medium",
  },
  {
    id: 91,
    chapter: 4,
    topic: "Science and Technology",
    question: "Alexander Fleming discovered which antibiotic?",
    options: ["Aspirin", "Penicillin", "Streptomycin", "Quinine"],
    correctAnswers: [1],
    explanation:
      "Alexander Fleming, a Scottish biologist, discovered penicillin in 1928. This discovery revolutionised medicine and led to the development of antibiotics.",
    difficulty: "easy",
  },
  {
    id: 92,
    chapter: 3,
    topic: "Industrial Revolution",
    question: "The Industrial Revolution began in which country?",
    options: ["France", "Germany", "The United States", "Britain"],
    correctAnswers: [3],
    explanation:
      "The Industrial Revolution began in Britain in the mid-18th century. Key developments included steam power, factory production, and the railway network.",
    difficulty: "easy",
  },
  {
    id: 93,
    chapter: 5,
    topic: "Parliament",
    question: "What is a 'constituency' in UK politics?",
    options: [
      "A political party headquarters",
      "A geographical area represented by one MP in the House of Commons",
      "A committee in the House of Lords",
      "A local council area",
    ],
    correctAnswers: [1],
    explanation:
      "A constituency is a geographical area that elects one Member of Parliament (MP) to the House of Commons. There are 650 constituencies in the UK.",
    difficulty: "medium",
  },
  {
    id: 94,
    chapter: 4,
    topic: "Culture and Sport",
    question: "The Grand National is a famous race for which sport?",
    options: ["Motor racing", "Greyhound racing", "Horse racing", "Cycling"],
    correctAnswers: [2],
    explanation:
      "The Grand National is a famous horse race held annually at Aintree Racecourse in Liverpool. It is the most watched horse race in the UK.",
    difficulty: "easy",
  },
  {
    id: 95,
    chapter: 3,
    topic: "Victorian Era",
    question: "Queen Victoria reigned for how many years?",
    options: ["33 years", "44 years", "63 years", "71 years"],
    correctAnswers: [2],
    explanation:
      "Queen Victoria reigned from 1837 to 1901, a period of 63 years. Her reign saw the growth of the British Empire and the Industrial Revolution.",
    difficulty: "medium",
  },
  {
    id: 96,
    chapter: 5,
    topic: "Human Rights",
    question: "Which Act protects people's personal information held by organisations?",
    options: [
      "The Freedom of Information Act",
      "The Human Rights Act",
      "The Data Protection Act",
      "The Privacy and Electronic Communications Act",
    ],
    correctAnswers: [2],
    explanation:
      "The Data Protection Act (updated in 2018 to incorporate GDPR) protects personal information held by organisations. It gives individuals rights over how their data is used.",
    difficulty: "medium",
  },
  {
    id: 97,
    chapter: 4,
    topic: "Education",
    question: "What are GCSEs?",
    options: [
      "A university entrance exam",
      "Qualifications taken by 15–16 year olds at the end of compulsory secondary education",
      "Post-graduate research qualifications",
      "Vocational training certificates",
    ],
    correctAnswers: [1],
    explanation:
      "GCSEs (General Certificate of Secondary Education) are qualifications taken by students in England, Wales, and Northern Ireland, typically at age 15–16 at the end of Key Stage 4.",
    difficulty: "easy",
  },
  {
    id: 98,
    chapter: 3,
    topic: "Post-War Britain",
    question: "Who was the first leader of the Labour Party to win a general election after WWII?",
    options: ["Ramsay MacDonald", "Clement Attlee", "Harold Wilson", "James Callaghan"],
    correctAnswers: [1],
    explanation:
      "Clement Attlee led the Labour Party to a landslide victory in the 1945 general election, defeating Winston Churchill. His government created the NHS and the modern welfare state.",
    difficulty: "medium",
  },
  {
    id: 99,
    chapter: 2,
    topic: "Patron Saints",
    question: "What is the patron saint of Scotland and on what date is their day celebrated?",
    options: [
      "St George, 23 April",
      "St Andrew, 30 November",
      "St David, 1 March",
      "St Patrick, 17 March",
    ],
    correctAnswers: [1],
    explanation:
      "St Andrew is the patron saint of Scotland. St Andrew's Day is celebrated on 30 November. The flag of Scotland (the Saltire) features the cross of St Andrew.",
    difficulty: "easy",
  },
  {
    id: 100,
    chapter: 4,
    topic: "Traditions",
    question: "What is celebrated on 25 January in Scotland?",
    options: ["St Andrew's Day", "Burns Night", "Hogmanay", "Beltane"],
    correctAnswers: [1],
    explanation:
      "Burns Night is celebrated on 25 January in Scotland to honour the poet Robert Burns (born 25 January 1759). Celebrations include eating haggis and reciting Burns' poems.",
    difficulty: "medium",
  },
  {
    id: 101,
    chapter: 5,
    topic: "Parliament",
    question: "What is Prime Minister's Questions (PMQs)?",
    options: [
      "A weekly TV programme about politics",
      "A regular session where the PM answers questions from MPs in the Commons",
      "A form where citizens can submit questions to the PM",
      "A House of Lords debate",
    ],
    correctAnswers: [1],
    explanation:
      "Prime Minister's Questions (PMQs) is held every Wednesday when Parliament is sitting. MPs can question the Prime Minister directly, and it is broadcast live.",
    difficulty: "medium",
  },
  {
    id: 102,
    chapter: 3,
    topic: "Tudor Period",
    question: "Who was the first monarch of the House of Tudor?",
    options: ["Henry VII", "Henry VIII", "Edward IV", "Richard III"],
    correctAnswers: [0],
    explanation:
      "Henry VII became the first Tudor monarch in 1485 after defeating Richard III at the Battle of Bosworth Field. He established the Tudor dynasty that lasted until 1603.",
    difficulty: "medium",
  },
  {
    id: 103,
    chapter: 3,
    topic: "Early History",
    question: "Who were the Celts?",
    options: [
      "The first Romans to settle in Britain",
      "Iron Age peoples who settled in Britain from central Europe",
      "Viking raiders who came from Scandinavia",
      "Anglo-Saxon tribes from northern Germany",
    ],
    correctAnswers: [1],
    explanation:
      "The Celts were Iron Age peoples who settled in Britain from central Europe around 750 BC. They are ancestors of many of today's Welsh, Scottish, and Irish people.",
    difficulty: "medium",
  },
  {
    id: 104,
    chapter: 4,
    topic: "Sport",
    question: "Where is the home of English football, and which tournament does England most famously host?",
    options: [
      "Old Trafford, the Premier League",
      "Wembley Stadium, the FA Cup Final",
      "Anfield, the Champions League",
      "Stamford Bridge, the World Cup",
    ],
    correctAnswers: [1],
    explanation:
      "Wembley Stadium in London is the national stadium of England and hosts the FA Cup Final, England home internationals, and other major events.",
    difficulty: "medium",
  },
  {
    id: 105,
    chapter: 5,
    topic: "The Law",
    question: "In England, Wales, and Northern Ireland, what is the age of criminal responsibility?",
    options: ["8 years old", "10 years old", "12 years old", "14 years old"],
    correctAnswers: [1],
    explanation:
      "The age of criminal responsibility in England, Wales, and Northern Ireland is 10 years old. In Scotland it is 12 years old.",
    difficulty: "hard",
  },
];

export function getQuestionsByChapter(chapter: number): Question[] {
  return questions.filter((q) => q.chapter === chapter);
}

export function getRandomQuestions(count: number, chapterFilter?: number): Question[] {
  const pool = chapterFilter ? getQuestionsByChapter(chapterFilter) : questions;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function getTestQuestions(testNumber: number): Question[] {
  const seed = testNumber * 7;
  const shuffled = [...questions].sort((a, b) => {
    const ha = Math.sin(seed + a.id) * 10000;
    const hb = Math.sin(seed + b.id) * 10000;
    return (ha - Math.floor(ha)) - (hb - Math.floor(hb));
  });
  return shuffled.slice(0, 24);
}
