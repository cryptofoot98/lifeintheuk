// Study materials — structured content for all 5 handbook chapters.
// Each block type gets a distinct visual treatment in MaterialRenderer.

export type Block =
  | { type: "text"; text: string }
  | { type: "heading"; text: string }
  | { type: "keyFact"; emoji: string; title: string; body: string }
  | { type: "list"; items: string[] }
  | { type: "person"; name: string; dates: string; emoji: string; facts: string[] }
  | { type: "timeline"; items: { year: string; event: string }[] }
  | { type: "callout"; variant: "remember" | "tip" | "warning"; text: string }
  | { type: "numbers"; items: { value: string; label: string; emoji: string }[] }
  | { type: "twoCol"; left: { heading: string; items: string[] }; right: { heading: string; items: string[] } };

export type Section = {
  id: string;
  title: string;
  blocks: Block[];
};

export type ChapterMaterial = {
  chapter: number;
  title: string;
  emoji: string;
  color: string;
  intro: string;
  readTime: number;
  sections: Section[];
};

// ─── Chapter 1 ──────────────────────────────────────────────────────────────

const chapter1: ChapterMaterial = {
  chapter: 1,
  title: "The Values and Principles of the UK",
  emoji: "🏛️",
  color: "primary",
  intro: "Understanding what it means to live in Britain — the values, freedoms, and responsibilities that define life in the UK.",
  readTime: 5,
  sections: [
    {
      id: "british-values",
      title: "British Values",
      blocks: [
        {
          type: "text",
          text: "Britain is described as **a modern, thriving society with a long and illustrious history**. Migrants have always come to Britain, and British society is founded on certain shared values and principles that everyone is expected to respect and uphold.",
        },
        {
          type: "keyFact",
          emoji: "🗳️",
          title: "The Five Core Values",
          body: "Democracy · The rule of law · Individual liberty · Tolerance of those with different faiths and beliefs · Participation in community life.",
        },
        {
          type: "callout",
          variant: "remember",
          text: "These five values appear directly in the citizenship pledge: 'I will give my loyalty to the United Kingdom and respect its rights and freedoms. I will uphold its democratic values.'",
        },
        {
          type: "heading",
          text: "What Each Value Means",
        },
        {
          type: "list",
          items: [
            "**Democracy** — the adult population chooses who governs the country by voting in free elections",
            "**The rule of law** — everyone, including the government, must obey the law; courts are independent",
            "**Individual liberty** — people are free to act however they choose as long as they don't break the law",
            "**Tolerance** — Britain has people of many faiths and backgrounds; everyone must respect others' rights to hold different views",
            "**Participation** — people are encouraged to get involved in their local community and support others",
          ],
        },
      ],
    },
    {
      id: "responsibilities-freedoms",
      title: "Responsibilities and Freedoms",
      blocks: [
        {
          type: "text",
          text: "Living in the UK comes with both **responsibilities** (things you must do) and **freedoms** (rights you enjoy). Understanding both is essential to being a good citizen.",
        },
        {
          type: "twoCol",
          left: {
            heading: "Your Responsibilities",
            items: [
              "Respect and obey the law",
              "Respect others' rights and opinions",
              "Treat others fairly regardless of background",
              "Look after yourself and your family",
              "Care for your local area and environment",
              "Carry out jury service if called",
            ],
          },
          right: {
            heading: "Your Freedoms",
            items: [
              "Freedom of belief and religion",
              "Freedom of speech and expression",
              "Freedom from discrimination",
              "Right to a fair trial",
              "Right to vote in elections",
              "Right to own property",
            ],
          },
        },
        {
          type: "callout",
          variant: "tip",
          text: "The test covers both the values list and what they mean in practice. Know that 'rule of law' means courts are independent and EVERYONE must obey the law — including the government.",
        },
      ],
    },
    {
      id: "permanent-residence",
      title: "Becoming a Permanent Resident",
      blocks: [
        {
          type: "text",
          text: "To apply for permanent residence or citizenship, you must be able to **speak and read English** and pass the **Life in the UK test**.",
        },
        {
          type: "keyFact",
          emoji: "📝",
          title: "The Life in the UK Test",
          body: "The test has **24 questions** from all areas of the handbook. It is taken at registered test centres across the UK. You book online at gov.uk/life-in-the-uk-test. A pass mark of **75%** (18 out of 24) is required.",
        },
        {
          type: "callout",
          variant: "remember",
          text: "Applying for permanent residence is 'an important decision and commitment' — not just a test of knowledge, but an agreement to live by British values.",
        },
      ],
    },
  ],
};

// ─── Chapter 2 ──────────────────────────────────────────────────────────────

const chapter2: ChapterMaterial = {
  chapter: 2,
  title: "What is the UK?",
  emoji: "🗺️",
  color: "secondary",
  intro: "The geography, nations, languages, symbols, and identity of the United Kingdom — the essential facts every citizen should know.",
  readTime: 10,
  sections: [
    {
      id: "nations-capitals",
      title: "The Nations and Capitals",
      blocks: [
        {
          type: "keyFact",
          emoji: "🇬🇧",
          title: "The Full Official Name",
          body: "The United Kingdom of Great Britain and Northern Ireland. 'Great Britain' refers only to England, Scotland and Wales — NOT Northern Ireland.",
        },
        {
          type: "text",
          text: "The UK is governed by the **Parliament sitting in Westminster** (London). Scotland, Wales and Northern Ireland also have their own parliaments or assemblies with devolved powers.",
        },
        {
          type: "numbers",
          items: [
            { value: "England", label: "Capital: London", emoji: "🌹" },
            { value: "Scotland", label: "Capital: Edinburgh", emoji: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" },
            { value: "Wales", label: "Capital: Cardiff", emoji: "🐉" },
            { value: "N. Ireland", label: "Capital: Belfast", emoji: "☘️" },
          ],
        },
        {
          type: "callout",
          variant: "remember",
          text: "The rest of Ireland (south) is an independent country — NOT part of the UK. The Channel Islands and Isle of Man are Crown dependencies — closely linked but NOT part of the UK.",
        },
      ],
    },
    {
      id: "geography-population",
      title: "Geography and Population",
      blocks: [
        {
          type: "numbers",
          items: [
            { value: "243,610", label: "Area (sq km)", emoji: "📐" },
            { value: "66 million+", label: "Population (2017)", emoji: "👥" },
            { value: "870 miles", label: "John O'Groats to Land's End", emoji: "📏" },
            { value: "~84%", label: "Population in England", emoji: "🏙️" },
          ],
        },
        {
          type: "keyFact",
          emoji: "📊",
          title: "Population Milestones",
          body: "1600: ~4 million · 1801: 8 million · 1901: 40 million · 1951: 50 million · 2017: over 66 million. The UK has an ageing population — record numbers aged 85+.",
        },
        {
          type: "heading",
          text: "Major Cities",
        },
        {
          type: "twoCol",
          left: {
            heading: "England",
            items: ["London", "Birmingham", "Manchester", "Leeds", "Sheffield", "Bristol", "Liverpool", "Newcastle", "Southampton", "Norwich", "Plymouth"],
          },
          right: {
            heading: "Devolved Nations",
            items: ["Cardiff (Wales)", "Swansea (Wales)", "Edinburgh (Scotland)", "Glasgow (Scotland)", "Aberdeen (Scotland)", "Belfast (N. Ireland)"],
          },
        },
      ],
    },
    {
      id: "currency-languages",
      title: "Currency and Languages",
      blocks: [
        {
          type: "keyFact",
          emoji: "💷",
          title: "Currency: Pound Sterling (£)",
          body: "100 pence = £1. Coins: 1p, 2p, 5p, 10p, 20p, 50p, £1, £2. Notes: £5, £10, £20, £50. The UK does NOT use the Euro.",
        },
        {
          type: "list",
          items: [
            "**English** — spoken throughout the UK",
            "**Welsh (Cymraeg)** — spoken in Wales; taught in schools and universities",
            "**Scottish Gaelic** — spoken in the Scottish Highlands and Islands",
            "**Irish Gaelic** — spoken in parts of Northern Ireland",
          ],
        },
      ],
    },
    {
      id: "patron-saints",
      title: "Patron Saints and National Flowers",
      blocks: [
        {
          type: "keyFact",
          emoji: "🗓️",
          title: "Patron Saints' Days — Know All Four!",
          body: "1 March: St David's Day (Wales) · 17 March: St Patrick's Day (Northern Ireland) · 23 April: St George's Day (England) · 30 November: St Andrew's Day (Scotland)",
        },
        {
          type: "numbers",
          items: [
            { value: "🌹 Rose", label: "England", emoji: "🌹" },
            { value: "🌷 Daffodil", label: "Wales", emoji: "🌷" },
            { value: "🌿 Thistle", label: "Scotland", emoji: "🌿" },
            { value: "☘️ Shamrock", label: "N. Ireland", emoji: "☘️" },
          ],
        },
        {
          type: "callout",
          variant: "remember",
          text: "The Union Flag (Union Jack) combines: St George's Cross (red cross, white ground — England), St Andrew's Cross (white diagonal, blue ground — Scotland), St Patrick's Cross (red diagonal, white ground — Ireland). Wales is NOT represented because Wales was already united with England when the flag was created.",
        },
      ],
    },
  ],
};

// ─── Chapter 3 ──────────────────────────────────────────────────────────────

const chapter3: ChapterMaterial = {
  chapter: 3,
  title: "A Long and Illustrious History",
  emoji: "📜",
  color: "primary",
  intro: "From Stone Age settlers to the modern Commonwealth — the remarkable history of Britain and its people.",
  readTime: 35,
  sections: [
    {
      id: "early-britain",
      title: "Early Britain",
      blocks: [
        {
          type: "timeline",
          items: [
            { year: "~10,000 BC", event: "Britain separated from continental Europe; hunter-gatherers inhabited the land" },
            { year: "~6,000 BC", event: "First farmers arrived from south-east Europe" },
            { year: "~3,000 BC", event: "Stonehenge built — used as a seasonal gathering place; Skara Brae (Orkney) built — best-preserved prehistoric village in northern Europe" },
            { year: "Bronze Age", event: "People lived in roundhouses; made objects from bronze and gold" },
            { year: "Iron Age", event: "Celts spoke languages that are the basis of Welsh, Irish, Scottish Gaelic; hill forts built (e.g. Maiden Castle); first British coins minted" },
          ],
        },
        {
          type: "callout",
          variant: "tip",
          text: "Skara Brae on Orkney is the best-preserved prehistoric village in northern Europe — a favourite exam fact.",
        },
      ],
    },
    {
      id: "roman-britain",
      title: "The Romans",
      blocks: [
        {
          type: "timeline",
          items: [
            { year: "55 BC", event: "Julius Caesar first invaded Britain — unsuccessful" },
            { year: "AD 43", event: "Emperor Claudius successfully invaded; Romans occupied most of Britain for ~400 years" },
            { year: "AD 43", event: "Boudicca (queen of the Iceni) led a fierce revolt against the Romans" },
            { year: "AD 122", event: "Hadrian's Wall built across northern England to keep out the Picts (northern tribes)" },
            { year: "3rd–4th c.", event: "Romans introduced Christianity to Britain" },
            { year: "AD 410", event: "Roman army left Britain; Angles, Saxons, and Jutes invaded from northern Europe" },
          ],
        },
        {
          type: "keyFact",
          emoji: "🧱",
          title: "Roman Legacy",
          body: "Romans built roads, public buildings (baths, temples), and introduced a legal system and early Christianity. Their language (Latin) influenced English.",
        },
      ],
    },
    {
      id: "anglo-saxons-vikings",
      title: "Anglo-Saxons and Vikings",
      blocks: [
        {
          type: "text",
          text: "After the Romans left, the **Angles, Saxons and Jutes** invaded from Germany and Denmark. Their language became the basis of **modern English**. By around AD 600, Anglo-Saxon kingdoms covered most of England.",
        },
        {
          type: "list",
          items: [
            "**St Augustine** — sent by the Pope; became the first Archbishop of Canterbury; re-introduced Christianity to England",
            "**St Columba** — Irish monk; founded monastery on the island of Iona, Scotland",
            "**St Patrick** — missionary; patron saint of Ireland",
          ],
        },
        {
          type: "timeline",
          items: [
            { year: "AD 789", event: "First Viking raids on Britain" },
            { year: "AD 793", event: "Vikings sacked Lindisfarne monastery — major raid" },
            { year: "9th c.", event: "King Alfred the Great of Wessex defeated the Vikings and made a peace agreement (Danelaw)" },
            { year: "9th c.", event: "Kenneth MacAlpin — became first King of Scotland, uniting the Scots and Picts" },
          ],
        },
        {
          type: "callout",
          variant: "remember",
          text: "King Alfred the Great defeated the Vikings. Kenneth MacAlpin became the first King of Scotland.",
        },
      ],
    },
    {
      id: "norman-conquest",
      title: "The Norman Conquest (1066)",
      blocks: [
        {
          type: "keyFact",
          emoji: "⚔️",
          title: "1066 — The Last Successful Foreign Invasion",
          body: "William, Duke of Normandy defeated King Harold at the **Battle of Hastings**. William became King William I ('William the Conqueror'). The Norman Conquest was the LAST successful foreign invasion of England.",
        },
        {
          type: "list",
          items: [
            "**Domesday Book** (1086) — William ordered a survey of all land and resources in England; it was a record of who owned what",
            "Norman French influenced English — thousands of French words entered the language",
            "William built castles to control the country (e.g. Tower of London, Windsor Castle)",
          ],
        },
      ],
    },
    {
      id: "middle-ages",
      title: "The Middle Ages",
      blocks: [
        {
          type: "timeline",
          items: [
            { year: "1215", event: "Magna Carta — King John forced to sign; established that the king must obey the law; basis of English law" },
            { year: "1284", event: "Statute of Rhuddlan — English conquered Wales; castles built at Conwy, Caernarvon, Harlech" },
            { year: "1314", event: "Battle of Bannockburn — Robert the Bruce defeated the English; Scotland remained independent" },
            { year: "1337–1453", event: "Hundred Years War with France (lasted 116 years)" },
            { year: "1348", event: "Black Death arrived in Britain — killed about one-third of the population" },
            { year: "1415", event: "Battle of Agincourt — Henry V won famous victory against France" },
            { year: "1455–1485", event: "Wars of the Roses — civil war between House of Lancaster (red rose) and House of York (white rose)" },
            { year: "1485", event: "Battle of Bosworth Field — Henry Tudor (Henry VII) defeated Richard III; House of Tudor established" },
          ],
        },
        {
          type: "keyFact",
          emoji: "📜",
          title: "Magna Carta (1215)",
          body: "Signed by King John. Established that the king must obey the law — no one is above it. The foundation of English law and democracy. Parliament grew from the king's council of advisers.",
        },
        {
          type: "person",
          name: "Geoffrey Chaucer",
          dates: "c. 1343–1400",
          emoji: "📖",
          facts: [
            "Wrote 'The Canterbury Tales' — one of the first works of literature in English",
            "Written in Middle English; printed by William Caxton on England's first printing press",
          ],
        },
        {
          type: "callout",
          variant: "remember",
          text: "The Black Death (1348) killed roughly 1/3 of the UK population. It led to labour shortages, higher wages, and migration to towns — changing British society forever.",
        },
      ],
    },
    {
      id: "tudors",
      title: "The Tudors (1485–1603)",
      blocks: [
        {
          type: "person",
          name: "Henry VIII",
          dates: "1491–1547",
          emoji: "👑",
          facts: [
            "Famous for having **six wives**: Catherine of Aragon, Anne Boleyn (executed), Jane Seymour, Anne of Cleves, Catherine Howard (executed), Catherine Parr",
            "Broke from the **Church of Rome** to divorce Catherine of Aragon — established the **Church of England** (Anglican Church) with the monarch as its head",
            "Formally united Wales with England (Laws in Wales Acts)",
          ],
        },
        {
          type: "person",
          name: "Elizabeth I",
          dates: "1533–1603",
          emoji: "👸",
          facts: [
            "Re-established the Church of England after her Catholic half-sister Mary's reign",
            "Defeated the **Spanish Armada in 1588** — a key moment in English history",
            "Her reign saw the flourishing of English theatre and exploration",
            "Never married; called the 'Virgin Queen'",
          ],
        },
        {
          type: "person",
          name: "William Shakespeare",
          dates: "1564–1616",
          emoji: "🎭",
          facts: [
            "Born in **Stratford-upon-Avon**",
            "Wrote famous plays: Hamlet, Macbeth, A Midsummer Night's Dream, Romeo and Juliet, Othello",
            "Invented hundreds of words and phrases still used today",
            "The Globe Theatre in London is a modern copy of his original theatre",
          ],
        },
        {
          type: "person",
          name: "Sir Francis Drake",
          dates: "c. 1540–1596",
          emoji: "⛵",
          facts: [
            "Naval commander who circumnavigated the globe on the Golden Hind (1577–1580)",
            "Second person in history to sail around the world",
            "Key figure in defeating the Spanish Armada",
          ],
        },
        {
          type: "callout",
          variant: "remember",
          text: "Mary, Queen of Scots (Mary Stuart) was Catholic. She fled to England after being forced to abdicate and was imprisoned for 20 years by Elizabeth I before being executed in 1587 for plotting.",
        },
      ],
    },
    {
      id: "stuarts-civil-war",
      title: "The Stuarts and Civil War",
      blocks: [
        {
          type: "timeline",
          items: [
            { year: "1603", event: "James VI of Scotland became James I of England — uniting the crowns (Scotland remained separate)" },
            { year: "1611", event: "King James Bible (Authorised Version) commissioned — still widely used today" },
            { year: "1642", event: "English Civil War began — Royalists ('Cavaliers') vs. Parliamentarians ('Roundheads')" },
            { year: "1649", event: "King Charles I executed — England became a republic (Commonwealth)" },
            { year: "1653", event: "Oliver Cromwell became Lord Protector" },
            { year: "1660", event: "Restoration — Charles II invited back; monarchy restored" },
            { year: "1665", event: "Great Plague outbreak in London" },
            { year: "1666", event: "Great Fire of London — destroyed much of the city; St Paul's Cathedral rebuilt by Christopher Wren" },
            { year: "1679", event: "Habeas Corpus Act — no one can be held in prison unlawfully" },
            { year: "1688", event: "Glorious Revolution — William of Orange (William III) invited to take the throne" },
            { year: "1689", event: "Bill of Rights — confirmed Parliament's rights; limited the power of the monarchy" },
          ],
        },
        {
          type: "person",
          name: "Isaac Newton",
          dates: "1643–1727",
          emoji: "🍎",
          facts: [
            "Studied at Cambridge University",
            "Discovered **gravity** and the laws of motion",
            "Published 'Mathematical Principles of Natural Philosophy'",
            "Discovered that white light is made up of the colours of the rainbow",
          ],
        },
        {
          type: "keyFact",
          emoji: "🏴",
          title: "The Glorious Revolution (1688)",
          body: "William of Orange — a Protestant Dutch prince married to James II's daughter Mary — was invited by Parliament to take the throne. James II fled. No fighting in England. William ruled as William III alongside Mary II. The 1689 Bill of Rights confirmed Parliament's supremacy over the monarchy.",
        },
      ],
    },
    {
      id: "global-power",
      title: "A Global Power (18th Century)",
      blocks: [
        {
          type: "timeline",
          items: [
            { year: "1707", event: "Act of Union — Scotland united with England and Wales to form Kingdom of Great Britain" },
            { year: "1714", event: "George I became king — first of the Hanoverian dynasty (German, nearest Protestant relative)" },
            { year: "1721", event: "Sir Robert Walpole became the first 'Prime Minister'" },
            { year: "1745", event: "Bonnie Prince Charlie (Charles Edward Stuart) tried to reclaim the throne; defeated at Battle of Culloden (1746)" },
            { year: "1746", event: "Battle of Culloden — last pitched battle on British soil" },
            { year: "1776", event: "American Declaration of Independence (13 British colonies declared independence)" },
            { year: "1783", event: "Britain recognised American independence" },
            { year: "1800", event: "Act of Union with Ireland — created United Kingdom of Great Britain and Ireland" },
            { year: "1805", event: "Battle of Trafalgar — Admiral Nelson's naval victory against France/Spain; Nelson killed" },
            { year: "1815", event: "Battle of Waterloo — Duke of Wellington defeated Napoleon" },
          ],
        },
        {
          type: "person",
          name: "Robert Burns",
          dates: "1759–1796",
          emoji: "🎶",
          facts: [
            "Scottish poet, known as 'The Bard'",
            "Wrote 'Auld Lang Syne' — sung at New Year around the world",
            "Burns Night (25 January) is celebrated across Scotland and by Scots worldwide",
          ],
        },
        {
          type: "keyFact",
          emoji: "⚓",
          title: "The Union Flag",
          body: "Created in 1801 when Ireland joined. Combines: St George's Cross (England) + St Andrew's Cross (Scotland) + St Patrick's Cross (Ireland). The **Welsh Dragon does NOT appear** — Wales was already united with England when the flag was first designed.",
        },
        {
          type: "twoCol",
          left: {
            heading: "Enlightenment Thinkers",
            items: [
              "Adam Smith — economics (The Wealth of Nations)",
              "David Hume — philosopher",
              "James Watt — improved steam engine",
            ],
          },
          right: {
            heading: "Slave Trade",
            items: [
              "Quakers: first formal anti-slavery groups (late 1700s)",
              "William Wilberforce MP: changed public opinion",
              "1807: illegal to trade slaves on British ships",
              "1833: Slavery abolished throughout British Empire",
            ],
          },
        },
      ],
    },
    {
      id: "industrial-revolution",
      title: "The Industrial Revolution",
      blocks: [
        {
          type: "text",
          text: "Britain led the world in industrialisation during the 18th and 19th centuries. Steam power, coal mining, manufacturing, railways, and shipbuilding transformed the country — and the world.",
        },
        {
          type: "list",
          items: [
            "**Richard Arkwright (1732–92)** — improved the carding machine; developed large spinning mills",
            "**George and Robert Stephenson** — pioneered the railway engine",
            "**Isambard Kingdom Brunel (1806–59)** — built the Great Western Railway, Clifton Suspension Bridge, and SS Great Britain (first iron-hulled ocean-going steamship)",
            "**Bessemer process** — allowed mass production of steel",
          ],
        },
        {
          type: "keyFact",
          emoji: "🏭",
          title: "The Great Exhibition (1851)",
          body: "Held in the Crystal Palace, Hyde Park, London. Showcased Britain's industrial achievement. At the time, Britain produced more than half the world's iron, coal, and cotton cloth.",
        },
        {
          type: "person",
          name: "Sake Dean Mahomet",
          dates: "1759–1851",
          emoji: "🍛",
          facts: [
            "Born in India; came to Britain",
            "Opened the **first curry house** in Britain in 1810 (in London)",
            "Introduced 'shampooing' (Indian head massage) to Britain",
            "Appointed 'Shampooing Surgeon' to King George IV and King William IV",
          ],
        },
      ],
    },
    {
      id: "victorian-era",
      title: "The Victorian Era",
      blocks: [
        {
          type: "person",
          name: "Queen Victoria",
          dates: "1819–1901",
          emoji: "👑",
          facts: [
            "Became queen aged **18** in **1837**; reigned for **64 years** until 1901",
            "Her reign coincided with huge growth of the British Empire and Industrial Revolution",
            "The British Empire covered India, Australia, and large parts of Africa",
            "The empire contained over 400 million people — the largest empire in history",
          ],
        },
        {
          type: "person",
          name: "Florence Nightingale",
          dates: "1820–1910",
          emoji: "🏥",
          facts: [
            "Born in Italy to English parents",
            "Trained as a nurse in Germany",
            "Went to Turkey in 1854 to work in military hospitals during the Crimean War",
            "Dramatically improved conditions and reduced mortality rates",
            "Established the **Nightingale Training School for Nurses** at St Thomas' Hospital in 1860",
            "Known as 'the Lady with the Lamp'",
          ],
        },
        {
          type: "timeline",
          items: [
            { year: "1832", event: "Great Reform Act — greatly increased the number of voters; abolished pocket boroughs" },
            { year: "1847", event: "Ten Hours Act — limited working day for women and children to 10 hours" },
            { year: "1853–1856", event: "Crimean War — Britain and France fought Russia; Florence Nightingale served" },
            { year: "1867", event: "Second Reform Act — more men in towns and cities given the vote" },
            { year: "1870", event: "Married Women's Property Act — women allowed to keep their own earnings" },
            { year: "1899–1902", event: "Boer War in South Africa" },
          ],
        },
        {
          type: "callout",
          variant: "tip",
          text: "The 1851 Great Exhibition took place in the Crystal Palace in Hyde Park, London — designed by Joseph Paxton.",
        },
      ],
    },
    {
      id: "votes-for-women",
      title: "The Suffragettes and Women's Suffrage",
      blocks: [
        {
          type: "person",
          name: "Emmeline Pankhurst",
          dates: "1858–1928",
          emoji: "✊",
          facts: [
            "Born in Manchester",
            "Founded the **Women's Franchise League** in 1889",
            "In **1903**, helped found the **Women's Social and Political Union (WSPU)** — the first group called 'suffragettes'",
            "Used civil disobedience and went on hunger strike when imprisoned",
            "Her campaigning helped win women the right to vote",
          ],
        },
        {
          type: "timeline",
          items: [
            { year: "1918", event: "Women over 30 given the right to vote (and to stand for Parliament)" },
            { year: "1928", event: "Women given the vote on the same terms as men (age 21+)" },
            { year: "1969", event: "Voting age reduced to 18 for men and women" },
          ],
        },
        {
          type: "callout",
          variant: "remember",
          text: "1918: women over 30 got the vote. 1928: equal voting rights at 21. 1969: voting age reduced to 18.",
        },
      ],
    },
    {
      id: "world-wars",
      title: "The World Wars",
      blocks: [
        {
          type: "timeline",
          items: [
            { year: "1914", event: "First World War began; Britain joined Allied Powers (France, Russia, Japan, USA)" },
            { year: "July 1916", event: "Battle of the Somme — approximately 60,000 British casualties on the first day alone" },
            { year: "11 Nov 1918", event: "First World War ended at 11:00 am — over 2 million British casualties" },
            { year: "1921", event: "Ireland partitioned: 26 counties became Irish Free State; 6 counties remained as Northern Ireland" },
            { year: "1922", event: "Irish Free State formally established (became Republic of Ireland in 1949)" },
            { year: "1929", event: "The Great Depression — mass unemployment in many British towns" },
            { year: "1933", event: "Adolf Hitler came to power in Germany" },
            { year: "Sep 1939", event: "Second World War began — Hitler invaded Poland; Britain and France declared war" },
            { year: "May 1940", event: "Winston Churchill became Prime Minister" },
            { year: "Jun 1940", event: "Dunkirk evacuation — over 300,000 Allied troops rescued by civilian boats" },
            { year: "Summer 1940", event: "Battle of Britain — RAF victory against Luftwaffe; Spitfires and Hurricanes crucial" },
            { year: "1940–41", event: "The Blitz — German night-time bombing of London and other British cities" },
            { year: "Jun 1944", event: "D-Day — Allied forces landed in Normandy, France" },
            { year: "May 1945", event: "Germany defeated (VE Day)" },
            { year: "Aug 1945", event: "USA dropped atomic bombs on Hiroshima and Nagasaki; war ended" },
          ],
        },
        {
          type: "person",
          name: "Winston Churchill",
          dates: "1874–1965",
          emoji: "✌️",
          facts: [
            "Soldier, journalist, Conservative MP from 1900",
            "Became Prime Minister in **May 1940**",
            "Refused to surrender to the Nazis — rallied the nation with famous speeches",
            "Famous phrases: 'blood, toil, tears and sweat'; 'We shall fight on the beaches'",
            "Lost the 1945 election; returned as PM in 1951",
            "Received a state funeral in 1965",
            "Voted **greatest Briton of all time** in a 2002 BBC poll",
          ],
        },
        {
          type: "person",
          name: "Alexander Fleming",
          dates: "1881–1955",
          emoji: "🔬",
          facts: [
            "Born in Scotland; became a doctor",
            "**Discovered penicillin in 1928** — accidentally, while researching influenza",
            "Howard Florey and Ernst Chain developed it into a usable drug",
            "Mass production began in the 1940s — saved millions of lives",
            "Won the **Nobel Prize in Medicine in 1945**",
          ],
        },
      ],
    },
    {
      id: "post-war",
      title: "Britain Since 1945",
      blocks: [
        {
          type: "person",
          name: "Clement Attlee",
          dates: "1883–1967",
          emoji: "🏥",
          facts: [
            "Labour Prime Minister 1945–1951",
            "Deputy PM under Churchill during the war",
            "Established the **National Health Service (NHS) in 1948** (with Aneurin Bevan as Health Minister)",
            "Nationalised railways, coal mines, gas, water, and electricity",
            "Granted independence to India and Pakistan (1947)",
          ],
        },
        {
          type: "person",
          name: "William Beveridge",
          dates: "1879–1963",
          emoji: "📋",
          facts: [
            "Economist and reformer",
            "**1942 Beveridge Report** — proposed the modern welfare state",
            "Identified five 'Giant Evils' to be overcome: Want, Disease, Ignorance, Squalor, Idleness",
            "His proposals became the basis for the modern welfare state",
          ],
        },
        {
          type: "keyFact",
          emoji: "🏥",
          title: "NHS Founded in 1948",
          body: "Aneurin (Nye) Bevan, Minister for Health, established the **National Health Service** in 1948. It guarantees minimum healthcare free at the point of use — a cornerstone of British life.",
        },
        {
          type: "timeline",
          items: [
            { year: "1947", event: "Independence granted to India and Pakistan; 9 countries in total that year" },
            { year: "1948", event: "NHS established; West Indian workers invited to help with labour shortages (Empire Windrush)" },
            { year: "1960s", event: "'Swinging Sixties' — The Beatles, Rolling Stones; social liberalisation; space race" },
            { year: "1969", event: "Voting age lowered to 18" },
            { year: "1972", event: "Northern Ireland Parliament suspended; direct rule from Westminster" },
            { year: "1979", event: "Margaret Thatcher became first female Prime Minister" },
            { year: "1982", event: "Argentina invaded Falkland Islands; UK task force recovered them" },
            { year: "1997", event: "Tony Blair led Labour to power; Scottish Parliament and Welsh Assembly established" },
            { year: "1998", event: "Good Friday Agreement — peace settlement for Northern Ireland" },
            { year: "1999", event: "Scottish Parliament and Welsh Assembly (Senedd) established" },
            { year: "2012", event: "London hosted the Olympic and Paralympic Games; Team GB finished 3rd in medals" },
            { year: "2016", event: "EU referendum: 51.9% voted to Leave; 48.1% voted to Remain" },
            { year: "2020", event: "UK formally left the European Union (31 January)" },
          ],
        },
        {
          type: "person",
          name: "Margaret Thatcher",
          dates: "1925–2013",
          emoji: "👩‍💼",
          facts: [
            "Daughter of a grocer; trained as a chemist, then a lawyer",
            "Conservative MP from 1959; Conservative Party Leader from 1975",
            "**First female Prime Minister** (1979)",
            "**Longest-serving 20th century Prime Minister** — in office until 1990",
            "Privatised nationalised industries and reduced trade union powers",
            "Worked closely with US President Reagan; contributed to end of Cold War",
          ],
        },
        {
          type: "keyFact",
          emoji: "💻",
          title: "Key 20th Century British Inventions",
          body: "World Wide Web (Tim Berners-Lee, 1990) · Television (John Logie Baird, 1920s) · Radar (Robert Watson-Watt, 1935) · Penicillin (Fleming, 1928) · Jet engine (Frank Whittle) · Hovercraft (Christopher Cockerell) · ATM/cashpoint (James Goodfellow, 1967) · IVF (Robert Edwards, 1978) · Cloning (Dolly the sheep, 1996)",
        },
      ],
    },
  ],
};

// ─── Chapter 4 ──────────────────────────────────────────────────────────────

const chapter4: ChapterMaterial = {
  chapter: 4,
  title: "A Modern, Thriving Society",
  emoji: "🎭",
  color: "primary",
  intro: "Religion, traditions, sports, arts, culture, and everyday life in contemporary Britain.",
  readTime: 25,
  sections: [
    {
      id: "religion",
      title: "Religion in the UK",
      blocks: [
        {
          type: "keyFact",
          emoji: "✝️",
          title: "2011 Census: Religious Breakdown",
          body: "Christian: 59% · Muslim: 4.8% · Hindu: 1.5% · Sikh: 0.8% · Jewish: under 0.5% · Buddhist: under 0.5% · No religion: 25%",
        },
        {
          type: "twoCol",
          left: {
            heading: "Church of England",
            items: [
              "Established church in England",
              "Protestant / Anglican",
              "Founded in the 1530s by Henry VIII",
              "Monarch is Supreme Governor",
              "Head: Archbishop of Canterbury",
            ],
          },
          right: {
            heading: "Church of Scotland",
            items: [
              "National church in Scotland",
              "Presbyterian (no bishops)",
              "Governed by ministers and elders",
              "Led by an elected Moderator",
              "No established church in Wales or N. Ireland",
            ],
          },
        },
        {
          type: "callout",
          variant: "remember",
          text: "The Church of England is Protestant and has the monarch as its head. The Church of Scotland is Presbyterian — no bishops, governed by ministers and elders.",
        },
      ],
    },
    {
      id: "customs-traditions",
      title: "Customs and Traditions",
      blocks: [
        {
          type: "heading",
          text: "Christian Festivals",
        },
        {
          type: "list",
          items: [
            "**Christmas (25 December)** — celebrates the birth of Jesus; roast turkey, Christmas pudding, gift-giving, Father Christmas",
            "**Boxing Day (26 December)** — public holiday",
            "**Easter (March/April)** — Good Friday (crucifixion) and Easter Sunday (resurrection); chocolate Easter eggs",
            "**Shrove Tuesday (Pancake Day)** — day before Lent begins; traditional pancake eating",
          ],
        },
        {
          type: "heading",
          text: "Other Religious Festivals",
        },
        {
          type: "list",
          items: [
            "**Diwali** (October/November) — Hindu and Sikh festival of light; celebrates good over evil",
            "**Hanukkah** (November/December) — Jewish; 8-day festival of lights; menorah candles lit",
            "**Eid al-Fitr** — Muslim; celebrates end of Ramadan fasting",
            "**Eid ul Adha** — Muslim; remembers Ibrahim's willingness to sacrifice his son",
            "**Vaisakhi/Baisakhi (14 April)** — Sikh; celebrates founding of the Khalsa; parades and celebrations",
          ],
        },
        {
          type: "heading",
          text: "Other Important Dates",
        },
        {
          type: "list",
          items: [
            "**14 February — Valentine's Day**: lovers exchange cards and gifts",
            "**1 April — April Fool's Day**: pranks played until midday",
            "**31 October — Hallowe'en**: ancient pagan festival; trick or treat; pumpkin lanterns",
            "**5 November — Bonfire Night (Guy Fawkes Night)**: fireworks commemorate 1605 Gunpowder Plot to kill James I",
            "**11 November — Remembrance Day**: honours WWI/WWII dead; red poppies worn; 2-minute silence at 11:00 am",
            "**Hogmanay (31 December)** — Scottish New Year celebration; 2 January is also a Scottish bank holiday",
          ],
        },
        {
          type: "callout",
          variant: "remember",
          text: "Bonfire Night (5 November) commemorates the Gunpowder Plot of 1605 — Guy Fawkes and others tried to blow up Parliament and kill King James I. They were caught.",
        },
      ],
    },
    {
      id: "sport",
      title: "Sport",
      blocks: [
        {
          type: "keyFact",
          emoji: "🏆",
          title: "The UK and the Olympics",
          body: "The UK hosted the Olympics in **1908**, **1948**, and **2012** (Stratford, east London). In 2012, Team GB finished **third** in the medal table. The Paralympic Games also originated in the UK — from Dr Sir Ludwig Guttmann's work at Stoke Mandeville hospital.",
        },
        {
          type: "heading",
          text: "Key Sports Facts",
        },
        {
          type: "list",
          items: [
            "**Football** — UK's most popular sport; England's only international tournament win was the **1966 World Cup**, held in England",
            "**Cricket** — originated in England; famous competition is **The Ashes** (England vs. Australia)",
            "**Rugby** — originated in England in the early 19th century; two types: union and league",
            "**Six Nations** — annual rugby tournament: England, Ireland, Scotland, Wales, France, Italy",
            "**Horse Racing** — associated with royalty; **Grand National** at Aintree, Liverpool; **Royal Ascot** in Berkshire",
            "**Golf** — modern game traces to 15th century Scotland; **St Andrews** is 'home of golf'",
            "**Tennis** — first club at Leamington Spa (1872); **Wimbledon** is the oldest Grand Slam tournament",
            "**Formula 1** — UK world leader in motor sport technology; British champions include Damon Hill, Lewis Hamilton, Jenson Button",
          ],
        },
        {
          type: "heading",
          text: "Notable British Sporting Champions",
        },
        {
          type: "list",
          items: [
            "**Sir Roger Bannister** (1929–2018) — first person to run a mile in under 4 minutes (1954)",
            "**Sir Jackie Stewart** (1939–) — Scottish; 3× Formula 1 World Champion",
            "**Bobby Moore** (1941–93) — captained England's 1966 World Cup-winning team",
            "**Sir Steve Redgrave** (1962–) — gold medals at **5 consecutive Olympics** in rowing",
            "**Dame Kelly Holmes** (1970–) — 2 Olympic gold medals in running (Athens 2004)",
            "**Sir Chris Hoy** (1976–) — Scottish cyclist; 6 gold medals at Olympics",
            "**Sir Mo Farah** (1983–) — 2012 and 2016 Olympic gold in 5,000m and 10,000m",
            "**Sir Andy Murray** (1987–) — Scottish; won US Open (2012), Wimbledon (2013, 2016), Olympic gold",
            "**Dame Jessica Ennis-Hill** (1986–) — 2012 Olympic gold in heptathlon",
          ],
        },
      ],
    },
    {
      id: "arts-culture",
      title: "Arts and Culture",
      blocks: [
        {
          type: "heading",
          text: "Classical Music Composers",
        },
        {
          type: "list",
          items: [
            "**Henry Purcell (1659–95)** — developed a distinctly British style; church music and operas",
            "**George Frederic Handel (1685–1759)** — German-born; became British 1727; wrote Water Music, Messiah",
            "**Sir Edward Elgar (1857–1934)** — Pomp and Circumstance Marches; 'Land of Hope and Glory'",
            "**Gustav Holst (1874–1934)** — The Planets suite; 'Jupiter' adapted as a hymn",
            "**Benjamin Britten (1913–76)** — operas Peter Grimes, Billy Budd; A Young Person's Guide to the Orchestra; founded Aldeburgh Festival",
          ],
        },
        {
          type: "keyFact",
          emoji: "🎸",
          title: "British Popular Music",
          body: "The Beatles and The Rolling Stones led the global music revolution from the 1960s. Major festivals: Glastonbury, Isle of Wight Festival, Creamfields. The Proms — 8-week orchestral season at the Royal Albert Hall, organised by the BBC since 1927.",
        },
        {
          type: "heading",
          text: "Theatre",
        },
        {
          type: "list",
          items: [
            "**West End** (London) — 'Theatreland'; world-renowned",
            "**The Mousetrap** (Agatha Christie) — has been running since 1952; longest initial run in history",
            "**Gilbert and Sullivan** — 19th century; HMS Pinafore, Pirates of Penzance, The Mikado",
            "**Andrew Lloyd Webber** — Jesus Christ Superstar, Evita, Cats, The Phantom of the Opera",
            "**Edinburgh Festival** — annual summer arts festival; Fringe is largest in the world",
            "**Pantomime** — Christmas tradition; includes a Dame (man dressed as woman)",
          ],
        },
        {
          type: "heading",
          text: "Great British Authors",
        },
        {
          type: "list",
          items: [
            "**Jane Austen (1775–1817)** — Pride and Prejudice, Sense and Sensibility",
            "**Charles Dickens (1812–70)** — Oliver Twist, Great Expectations",
            "**Robert Louis Stevenson (1850–94)** — Treasure Island, Kidnapped, Dr Jekyll and Mr Hyde",
            "**Arthur Conan Doyle (1859–1930)** — Sherlock Holmes (first fictional detective)",
            "**Agatha Christie** — detective stories; 'The Mousetrap'",
            "**JRR Tolkien** — The Lord of the Rings (voted nation's best-loved novel in 2003)",
            "**JK Rowling (1965–)** — Harry Potter series; huge international success",
          ],
        },
        {
          type: "heading",
          text: "Notable Artists and Architects",
        },
        {
          type: "list",
          items: [
            "**Thomas Gainsborough (1727–88)** — portrait painter",
            "**Joseph Turner (1775–1851)** — famous landscape painter; raised the status of landscape art",
            "**John Constable (1776–1837)** — landscape painter; Dedham Vale scenes",
            "**David Hockney (1937–)** — pop art; continues influential work",
            "**Sir Christopher Wren** — rebuilt St Paul's Cathedral after Great Fire of 1666",
            "**Inigo Jones** — Queen's House Greenwich, Banqueting House Whitehall",
            "**Robert Adam** — Scottish architect; influenced by classical style; inspired Royal Crescent, Bath",
          ],
        },
      ],
    },
    {
      id: "leisure-media",
      title: "Leisure, Media and Daily Life",
      blocks: [
        {
          type: "keyFact",
          emoji: "📺",
          title: "The BBC",
          body: "The BBC (British Broadcasting Corporation) is the world's largest public service broadcaster. It is funded by the **TV licence fee** — required of all households watching live TV. The BBC is independent of the government and carries no commercial advertising.",
        },
        {
          type: "list",
          items: [
            "**TV Licence** — required for ALL TV equipment in a home; over-75s get it free; blind people get 50% discount; fine up to £1,000 for not having one",
            "**Pubs** — public houses; central to British social life; legal age to buy alcohol is **18**",
            "**National Lottery** — weekly draws; under-18s cannot play",
            "**Gambling** — age 18+ for betting shops and casinos",
            "**Driving** — minimum age 17 (cars); MOT required annually for vehicles over 3 years old",
          ],
        },
        {
          type: "heading",
          text: "Traditional Food",
        },
        {
          type: "list",
          items: [
            "**England** — Roast beef and Yorkshire pudding; fish and chips",
            "**Wales** — Welsh cakes (flour, dried fruit, spices)",
            "**Scotland** — Haggis (sheep's offal, oatmeal, onion, cooked in sheep's stomach)",
            "**Northern Ireland** — Ulster fry (bacon, eggs, sausage, black pudding, soda bread, potato bread)",
          ],
        },
        {
          type: "keyFact",
          emoji: "🎨",
          title: "Key Annual Awards",
          body: "**BAFTA** — British Academy Film and Television Arts (the British 'Oscars'). **Turner Prize** — contemporary art award at Tate Britain (established 1984). **Man Booker Prize** — annual best fiction award (since 1968). **Mercury Music Prize** — best UK/Ireland album. **Brit Awards** — British music.",
        },
      ],
    },
  ],
};

// ─── Chapter 5 ──────────────────────────────────────────────────────────────

const chapter5: ChapterMaterial = {
  chapter: 5,
  title: "The UK Government, the Law and Your Role",
  emoji: "⚖️",
  color: "secondary",
  intro: "Parliament, elections, devolution, the legal system, and how to play your part as a citizen.",
  readTime: 20,
  sections: [
    {
      id: "democracy",
      title: "The Development of British Democracy",
      blocks: [
        {
          type: "timeline",
          items: [
            { year: "Early 19th c.", event: "Only property-owning men over 21 could vote" },
            { year: "1830s–40s", event: "The Chartists campaigned for workers to get the vote; most demands eventually adopted" },
            { year: "1918", event: "Women over 30 and all men over 21 given the vote" },
            { year: "1928", event: "Women given the vote on the same terms as men (age 21)" },
            { year: "1969", event: "Voting age lowered to 18 for everyone" },
          ],
        },
        {
          type: "keyFact",
          emoji: "📜",
          title: "The British Constitution",
          body: "Britain has an **unwritten constitution** — there is no single document. It is made up of institutions, laws, and conventions that have developed over centuries. Key institutions: the Monarchy, Parliament, the Prime Minister, Cabinet, judiciary, police, civil service, and local government.",
        },
      ],
    },
    {
      id: "monarchy-parliament",
      title: "The Monarchy and Parliament",
      blocks: [
        {
          type: "keyFact",
          emoji: "👑",
          title: "The Monarchy",
          body: "King Charles III is the head of state (reigned since September 2022). Britain is a **constitutional monarchy** — the monarch acts on the advice of the democratically-elected government. The National Anthem is 'God Save the King'.",
        },
        {
          type: "twoCol",
          left: {
            heading: "House of Commons",
            items: [
              "650 elected Members of Parliament (MPs)",
              "Each MP represents a constituency",
              "Creates and amends laws",
              "Scrutinises government",
              "Debates national issues",
              "Passes the government's budget",
            ],
          },
          right: {
            heading: "House of Lords",
            items: [
              "Members (peers) are NOT elected",
              "Life peers appointed by PM (since 1958)",
              "Hereditary peers lost automatic rights (1999)",
              "Senior Church of England bishops sit",
              "Suggests amendments to laws",
              "Acts as a check on the Commons",
            ],
          },
        },
        {
          type: "keyFact",
          emoji: "🔨",
          title: "The Speaker",
          body: "The Speaker is the chief officer of the House of Commons. They maintain order during debates and ensure opposition parties get proper debate time. The Speaker must be politically **neutral** and is chosen by MPs in a secret ballot.",
        },
      ],
    },
    {
      id: "elections-government",
      title: "Elections and Government",
      blocks: [
        {
          type: "keyFact",
          emoji: "🗳️",
          title: "First Past the Post",
          body: "The UK uses the **'first past the post'** electoral system: the candidate with the most votes wins the constituency, even without an overall majority. The party that wins the most constituencies forms the government.",
        },
        {
          type: "list",
          items: [
            "**General Elections** — held at least every **5 years**",
            "**By-elections** — held when an MP dies or resigns mid-term",
            "To vote, you must register on the **electoral register** (anyone resident in the UK)",
            "**British citizens, Irish citizens, and eligible Commonwealth citizens** can vote in UK elections",
            "EU citizens can vote in local elections but NOT in general elections (post-Brexit)",
          ],
        },
        {
          type: "twoCol",
          left: {
            heading: "The Prime Minister",
            items: [
              "Leader of the party with most MPs",
              "Official residence: 10 Downing Street",
              "Country house: Chequers",
              "Appoints/dismisses Cabinet ministers",
              "Can be changed by party MPs",
            ],
          },
          right: {
            heading: "The Cabinet",
            items: [
              "About 20 senior MPs",
              "Meet weekly to set policy",
              "Chancellor of Exchequer — finance",
              "Home Secretary — law and order",
              "Foreign Secretary — foreign affairs",
            ],
          },
        },
      ],
    },
    {
      id: "devolution",
      title: "Devolved Administrations",
      blocks: [
        {
          type: "text",
          text: "Since 1997-1999, Scotland, Wales, and Northern Ireland have had their own elected bodies with powers over certain issues — a process called **devolution**.",
        },
        {
          type: "list",
          items: [
            "**Scottish Parliament** (Edinburgh) — 129 members (MSPs); uses proportional representation; controls civil/criminal law, health, education, planning, some taxation",
            "**Welsh Government / Senedd** (Cardiff) — 60 members; controls education, health, housing, local government; bilingual Welsh/English",
            "**Northern Ireland Assembly** (Stormont) — 90 members (MLAs); power-sharing agreement; controls education, agriculture, environment, health",
          ],
        },
        {
          type: "callout",
          variant: "remember",
          text: "The Scottish Parliament was established in 1999 and has powers over taxation. The Welsh Assembly (now called the Senedd) was also established in 1999 but has fewer powers. The Northern Ireland Assembly was established under the 1998 Good Friday Agreement.",
        },
      ],
    },
    {
      id: "international",
      title: "International Institutions",
      blocks: [
        {
          type: "numbers",
          items: [
            { value: "The Commonwealth", label: "56 member states; King is head", emoji: "🌍" },
            { value: "The UN", label: "190+ members; UK is permanent Security Council member", emoji: "🕊️" },
            { value: "NATO", label: "European & N. American mutual defence pact", emoji: "🛡️" },
            { value: "Council of Europe", label: "47 countries; promotes human rights", emoji: "⚖️" },
          ],
        },
      ],
    },
    {
      id: "legal-system",
      title: "The Legal System",
      blocks: [
        {
          type: "twoCol",
          left: {
            heading: "Criminal Law",
            items: [
              "Carrying weapons (guns, knives)",
              "Drug trafficking",
              "Racial hate crimes",
              "Selling tobacco/alcohol to under-18s",
              "Smoking in enclosed public places",
              "Drink driving",
            ],
          },
          right: {
            heading: "Civil Law",
            items: [
              "Housing disputes",
              "Consumer rights",
              "Employment disputes",
              "Debt cases",
              "Divorce proceedings",
              "Libel and defamation",
            ],
          },
        },
        {
          type: "keyFact",
          emoji: "🏛️",
          title: "Court Structure",
          body: "Minor criminal cases: **Magistrates' Courts** (England/Wales) or **Justice of the Peace Courts** (Scotland). Serious criminal cases: **Crown Courts** (England/Wales/NI) or **Sheriff Courts** (Scotland). Youth Courts deal with ages 10–17. Civil disputes: **County Courts** (or **Small Claims** for under £10,000 in England/Wales).",
        },
        {
          type: "keyFact",
          emoji: "👥",
          title: "Juries",
          body: "Juries in England, Wales and Northern Ireland have **12 members**. Scotland has **15 members**. Scotland also has three verdict options: guilty, not guilty, and **'not proven'** (unique to Scotland). Jurors are selected randomly from the electoral register.",
        },
        {
          type: "callout",
          variant: "remember",
          text: "Key laws protecting individuals: Habeas Corpus (no unlawful imprisonment, 1679); Bill of Rights (1689); Human Rights Act (incorporates European Convention on Human Rights into UK law).",
        },
      ],
    },
    {
      id: "your-role",
      title: "Your Role as a Citizen",
      blocks: [
        {
          type: "heading",
          text: "Ways to Get Involved",
        },
        {
          type: "list",
          items: [
            "**Vote in elections** — it's your democratic right and responsibility",
            "**Jury service** — if selected from the electoral register (ages 18–70 in England/Wales)",
            "**School governor** — help set school strategy and hold headteachers to account (18+, no upper age limit)",
            "**Special constable** — volunteer police officer with full police powers",
            "**Magistrate** — volunteer judge in Magistrates' Courts",
            "**Volunteering** — with hospitals, charities, youth groups, food banks, environmental projects",
            "**Blood donation** — takes about 1 hour; can save lives",
            "**Organ donation** — register on the NHS Organ Donor Register",
            "**National Citizen Service (NCS)** — programme for 16–17 year olds",
          ],
        },
        {
          type: "keyFact",
          emoji: "💰",
          title: "Taxation",
          body: "**Income tax** is paid on wages, self-employment profits, and pensions. Most employees pay through **PAYE** (Pay As You Earn). **National Insurance** (NI) is paid by workers and employers; it funds the NHS and state benefits. You need a **National Insurance number** to work legally in the UK.",
        },
        {
          type: "callout",
          variant: "tip",
          text: "To stand as an MP, councillor, or to vote in general elections, you must be a British citizen, Irish citizen, or eligible Commonwealth citizen. EU citizens can vote in local elections but NOT in general elections.",
        },
      ],
    },
  ],
};

export const CHAPTERS: ChapterMaterial[] = [chapter1, chapter2, chapter3, chapter4, chapter5];

export function getChapter(num: number): ChapterMaterial | undefined {
  return CHAPTERS.find((c) => c.chapter === num);
}
