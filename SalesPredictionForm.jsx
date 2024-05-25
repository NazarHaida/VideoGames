import React, { useState } from 'react';
import './SalesPredictionForm.css';
import { Link } from 'react-router-dom';

const GlobalPredictionPage = () => {
  const initialGameData = {
    yearOfRelease: 2005,
    yearOfPred: 2016,
    platform: 'PS4',
    genre: 'Action',
    publisher: 'Nintendo',
    // naSales: 1.5,
    // jpSales: 0.5,
    // otherSales: 0.3,
    criticScore: 85,
    criticCount: 23,
    userScore: 70,
    userCount: 1500,
    developer: 'Naughty Dog',
    naSalesPerc: 30,
    euSalesPerc: 40,
    jpSalesPerc: 10,
    otherSalesPerc: 20,
    developerRank: 1,
    total_EU_Sales:40,
    gameCount: 5,
    rankNaDeveloper: 1,
    rankEuDeveloper: 40,
    rankJpDeveloper: 3,
    rankOtherDeveloper: 4,
    rating: 'E',
    currency:'uah',
    steamId:220200,

  };
  // State hooks for form data
  const [name, setName] = useState('');
  // const [naSales, setNaSales] = useState(initialGameData.naSales.toString());
  // const [jpSales, setJpSales] = useState(initialGameData.jpSales.toString());
  // const [otherSales, setOtherSales] = useState(initialGameData.otherSales.toString());
  const [naSalesPerc, setNaSalesPerc] = useState(initialGameData.naSalesPerc.toString());
  const [euSalesPerc, setEuSalesPerc] = useState(initialGameData.euSalesPerc.toString());
  const [jpSalesPerc, setJpSalesPerc] = useState(initialGameData.jpSalesPerc.toString());
  const [otherSalesPerc, setOtherSalesPerc] = useState(initialGameData.otherSalesPerc.toString());
  const [yearOfRelease, setYearOfRelease] = useState(initialGameData.yearOfRelease.toString());
  const [yearOfPred, setYearOfPred] = useState(initialGameData.yearOfPred.toString());
  const [criticScore, setCriticScore] = useState(initialGameData.criticScore.toString());
  const [criticCount, setCriticCount] = useState(initialGameData.criticCount.toString());
  const [userScore, setUserScore] = useState(initialGameData.userScore.toString());
  const [userCount, setUserCount] = useState(initialGameData.userCount.toString());
  const [platform, setPlatform] = useState(initialGameData.platform);
  const [publisher, setPublisher] = useState(initialGameData.publisher);
  const [developer, setDeveloper] = useState(initialGameData.developer);
  const [rating, setRating] = useState(initialGameData.rating === 'E'); // Boolean for checkbox
  const [gameCount, setGameCount] = useState(initialGameData.gameCount.toString());
  const [rankNaDeveloper, setRankNaDeveloper] = useState(initialGameData.rankNaDeveloper.toString());
  const [rankEuDeveloper, setRankEuDeveloper] = useState(initialGameData.rankEuDeveloper.toString());
  const [rankJpDeveloper, setRankJpDeveloper] = useState(initialGameData.rankJpDeveloper.toString());
  const [rankOtherDeveloper, setRankOtherDeveloper] = useState(initialGameData.rankOtherDeveloper.toString());
  const [developerRank, setDeveloperRank] = useState(initialGameData.developerRank.toString());
  const [steamId, setSteamId] = useState(initialGameData.steamId.toString());
  const [currency, setCurrency] = useState(initialGameData.currency.toString());
  const [genre, setGenre] = useState(initialGameData.genre.toString());
  const [predictionResult, setPredictionResult] = useState(null);
const handleCheckboxChange = (e) => {
    setRating(e.target.checked);
  };
  const [publishers] = useState([
'Nintendo', 'Take-Two Interactive', 'Sony Computer Entertainment', 'Activision', 'Microsoft Game Studios', 'Ubisoft', 'Bethesda Softworks', 'Electronic Arts', 'SquareSoft', 'GT Interactive', 'Konami Digital Entertainment', 'Square Enix', 'Sony Computer Entertainment Europe', 'Virgin Interactive', 'LucasArts', '505 Games', 'Capcom', 'Universal Interactive', 'Eidos Interactive', 'RedOctane', 'Atari', 'Namco Bandai Games', 'Vivendi Games', 'MTV Games', 'THQ', 'Disney Interactive Studios', 'Sega', 'Acclaim Entertainment', 'Midway Games', 'Red Orb', 'Deep Silver', 'NCSoft', 'Tecmo Koei', 'Valve Software', 'Infogrames', 'Mindscape', 'Valve', 'Global Star', 'Gotham Games', 'Crave Entertainment', 'Codemasters', 'Zoo Games', 'Sony Online Entertainment', 'RTL', 'D3Publisher', 'Black Label Games', 'SouthPeak Games', 'City Interactive', 'Empire Interactive', 'Russel', 'Atlus', 'Slightly Mad Studios', 'Play It', 'Tomy Corporation', 'Focus Home Interactive', 'Unknown', 'Game Factory', 'Titus', 'Marvelous Entertainment', 'Genki', 'TalonSoft', 'Square Enix ', 'SCi', 'Rage Software', 'Rising Star Games', 'Scholastic Inc.', 'Enix Corporation', 'Level 5', 'Koch Media', 'Square EA', 'Hudson Soft', 'Touchstone', 'Spike', 'Nippon Ichi Software', 'Sony Computer Entertainment America', 'Jester Interactive', 'Majesco Entertainment', 'Illusion Softworks', 'Interplay', 'Metro 3D', 'Rondomedia', 'Ghostlight', 'Trion Worlds', 'Xseed Games', 'Kadokawa Shoten', 'Natsume', 'Square', 'Gamebridge', 'ASCII Entertainment', 'Rebellion', 'Ignition Entertainment', 'Harmonix Music Systems', 'Activision Blizzard', 'Xplosiv', 'System 3 Arcade Software', 'Wanadoo', 'NovaLogic', 'BAM! Entertainment', 'Tetris Online', 'Psygnosis', 'Screenlife', 'Knowledge Adventure', 'GungHo', '3DO', 'Takara Tomy', 'Sammy Corporation', 'Oxygen Interactive', 'PopCap Games', 'Gathering of Developers', 'Marvelous Interactive', 'Kalypso Media', 'Home Entertainment Suppliers', 'Arc System Works', 'Mud Duck Productions', 'Wargaming.net', 'Destineer', 'Mumbo Jumbo', 'Indie Games', 'Liquid Games', 'FuRyu', 'Nihon Falcom Corporation', 'DTP Entertainment', 'Falcom Corporation', 'Kemco', 'Milestone S.r.l.', 'AQ Interactive', 'Avanquest', 'XS Games', 'Activision Value', 'Telltale Games', 'Zushi Games', 'CCP', 'Rebellion Developments', 'Aspyr', 'Compile Heart', 'Mad Catz', 'Gust', 'TDK Core', 'Nordcurrent', 'bitComposer Games', 'JoWood Productions', 'Brash Entertainment', 'Funcom', 'Jaleco', 'Playlogic Game Factory', 'Game Life', 'Fox Interactive', 'System 3', 'Vatical Entertainment', 'Nordic Games', 'White Park Bay Software', 'Daedalic', 'The Adventure Company', 'EA Games', 'Acquire', 'Paradox Interactive', 'Banpresto', 'Yacht Club Games', 'Swing! Entertainment', 'Hip Interactive', 'Tripwire Interactive', 'SCS Software', 'Havas Interactive', 'Sting', 'Idea Factory', 'Destination Software, Inc', 'Tru Blu Entertainment', 'Crytek', 'Telegames', 'Moss', 'From Software', 'NDA Productions', 'Foreign Media Games', 'Bigben Interactive', 'Idea Factory International', 'O-Games', 'Gameloft', 'Taito', 'Storm City Games', 'Bohemia Interactive', 'Reef Entertainment', 'Ackkstudios', 'HMH Interactive', 'inXile Entertainment', 'Cave', 'Microids', 'Evolved Games', 'O3 Entertainment', 'Nobilis', 'Sunsoft', 'Little Orbit', 'Hudson Entertainment', 'Popcorn Arcade', 'Insomniac Games', 'Milestone', 'Aksys Games', 'Irem Software Engineering', 'Myelin Media', 'Success', 'Daedalic Entertainment', 'SNK Playmore', 'SNK', 'Avalon Interactive', 'Revolution Software', 'Gamecock', 'Mattel Interactive', 'ArtDink', 'Mercury Games', 'Ascaron Entertainment GmbH', 'Mastiff', 'Ertain', 'Phantagram', 'Dusenberry Martin Racing', 'Conspiracy Entertainment', 'ESP', 'Starfish', 'Team17 Software', 'Milestone S.r.l', 'Monte Christo Multimedia', '5pb', 'Legacy Interactive', 'Cloud Imperium Games Corporation', 'DSI Games', 'DHM Interactive', 'Essential Games', 'Flashpoint Games', 'Ivolgamus', 'MC2 Entertainment', 'Kando Games', 'Gearbox Software', 'LSP Games', 'Global A Entertainment', 'Just Flight', 'UFO Interactive', 'Introversion Software', 'Sold Out', 'Sunflowers', 'id Software', 'Maxis', 'Pinnacle', 'Devolver Digital', 'Xicat Interactive', "Yuke's", 'Strategy First', 'Lexicon Entertainment', 'JVC', 'Stainless Games', '10TACLE Studios', 'FuRyu Corporation', 'Visco', 'Crimson Cow', 'Mamba Games', 'Arika', 'Lighthouse Interactive', 'CDV Software Entertainment', 'Encore', 'Blue Byte', 'Paradox Development', 'NewKidCo']);

  const [developers] = useState(['Nintendo', 'Rockstar North', 'Polyphony Digital', 'Infinity Ward, Sledgehammer Games', 'Treyarch', 'Infinity Ward', 'DMA Design', 'Game Arts', 'Bungie Software, Bungie', 'Ubisoft', 'Bungie', 'SquareSoft', '343 Industries', 'Hudson Soft', 'Bethesda Game Studios', 'EA Sports', 'Bungie Software', 'Nd Cube', 'Hudson', 'Electronic Arts', 'The Sims Studio', 'Game Freak', 'Rockstar Leeds', 'Sledgehammer Games', 'EA Sports, EA Vancouver', 'Nintendo EAD Tokyo', 'EA DICE', 'EA Black Box', 'Ubisoft Paris', 'Namco', 'Naughty Dog', 'HAL Labs', 'EA Canada', 'EA LA', 'Epic Games', 'Rockstar San Diego', 'Retro Studios', 'Blizzard Entertainment', 'Reflections Interactive', 'Rare Ltd.', 'KCEJ', 'Kojima Productions', 'Square Enix', 'SCE/WWS, Media Molecule', 'Capcom', 'Level 5', "Traveller's Tales", 'Taito Corporation', 'Ubisoft Montreal', 'Turn 10', 'Intelligent Systems', 'Core Design Ltd.', 'Harmonix Music Systems', 'Lionhead Studios', 'Neversoft Entertainment', 'SCE Santa Monica', 'TT Fusion', 'Stormfront Studios', 'Bluepoint Games', 'Vicarious Visions', 'Next Level Games', 'EA Tiburon', 'Konami', 'Bethesda Softworks', 'Ubisoft Paris, Ubisoft Montpellier', 'Insomniac Games', 'Mass Media', 'Rocksteady Studios', 'Ready at Dawn', 'Valve Software', 'Obsidian Entertainment', 'Cat Daddy Games', 'Digital Eclipse', 'CD Projekt Red Studio', 'Ubisoft, Ubisoft Montreal', 'Visual Concepts', 'Evolution Studios', 'KCET', 'Massive Entertainment', 'Maxis', 'Argonaut Games', 'TOSE', 'Zipper Interactive', 'Pandemic Studios', 'Fox Interactive', 'EA Redwood Shores', 'Gearbox Software', 'Kojima Productions, Moby Dick Studio', 'Media Molecule', 'Eurocom Entertainment Software', 'Ubisoft Quebec', 'Double Helix Games', 'Rockstar Toronto', 'EA Games', 'Luxoflux, Inc.', 'Shiny Entertainment', 'Team Bondi', 'Indies Zero', '4J Studios', 'BioWare', 'Dimps Corporation', 'Quantic Dream', 'Volition Inc.', 'Guerrilla', 'Junction Point', 'Spike, Namco Bandai Games', 'Sonic Team', 'Io Interactive', 'Respawn Entertainment', 'Sucker Punch', 'Sumo Digital', 'Clap Hanz', 'Spark Unlimited', 'Irrational Games, 2K Marin', 'NuFX', 'Criterion Games', 'Toys for Bob', 'Edge of Reality', 'LucasArts', 'Artoon', 'Namco Bandai Games', 'Dreamworks Interactive', 'Ubisoft Shanghai', 'Slightly Mad Studios', 'Team Fusion', 'Angel Studios', 'Ensemble Studios', 'Dice, Danger Close', 'syn Sophia', "Yuke's", 'Genius Sonority Inc.', 'Acclaim Studios Cheltenham', 'Headstrong Games', 'CAProduction', 'Raven Software', 'Midway', 'From Software', 'Black Rock Studio', 'Cyan Worlds', 'THQ', 'Rainbow Studios', 'Black Box', 'Techland', 'Heavy Iron Studios', 'Pipeworks Software, Inc.', 'Frontier Developments', 'ArenaNet', 'Backbone Entertainment', 'Sega', '2K Marin', 'Amaze Entertainment', 'Bizarre Creations', 'Omega Force', 'Visceral Games', 'Matrix Software', 'Full Fat', 'Helixe', 'EA Vancouver', 'Ubisoft Montpellier', 'ChunSoft', 'Midway Studios - San Diego', 'Acquire', 'h.a.n.d. Inc.', 'Ghost Games', 'Aki Corp.', 'Exakt', 'Irrational Games', 'Nintendo, Nd Cube', 'NanaOn-Sha', 'Factor 5', 'Papaya Studios', 'SCEI', 'Krome Studios', 'Avalanche Studios', 'Jupiter Corporation', 'Rockstar Studios', 'Altron', 'Creative Assembly', 'Sega AM2', 'Hangar 13', 'Tango Gameworks', 'SCEE London Studio', 'Genuine Games', 'Team Ninja', 'Camelot Software Planning', 'Red Storm Entertainment', 'VIS Entertainment', 'Monolith Soft', 'Terminal Reality', 'Ready at Dawn, SCE Santa Monica', 'SCE Japan Studio', 'ArtePiazza', 'Ubisoft Reflections, Ivory Tower', 'Tri-Ace', 'Arkane Studios', '3d6 Games', 'Artefacts Studio', 'Griptonite Games', 'Webfoot Technologies', 'Firaxis Games', 'Bandai Namco Games', 'Rebellion', 'Shaba Games', 'Paradigm Entertainment', 'EA Chicago', 'SuperMassive Games', 'HB Studios Multimedia', 'EA Sports Big', 'Spike', 'Ninja Theory', 'EA Montreal', 'id Software', 'Capcom Vancouver', 'Pivotal Games', 'MachineGames', '2K Czech', 'Cavia Inc.', 'The Code Monkeys', 'Amusement Vision', 'Sports Interactive', 'Genki', 'Blue Castle Games', 'Kush Games', 'Nihilistic', 'Kaos Studios', 'Avalanche Software', 'Planet Moon Studios', 'Blue Byte, Related Designs', 'EA Bright Light', 'Sand Grain Studios', 'PlatinumGames', 'Danger Close', 'Incognito Inc.', 'Codemasters', 'Playground Games', 'Crytek', 'Crystal Dynamics', 'Sega, Sonic Team', 'Z-Axis, Ltd.', 'Now Production', 'Eidos Montreal', 'Pitbull Syndicate', 'Codemasters Birmingham', 'Remedy Entertainment', 'Acclaim', 'Radical Entertainment', 'SCEA', 'Namco Bandai Games America, Namco Bandai Games', 'Creatures Inc.', 'M2', 'Melbourne House', 'Ubisoft Sofia', 'ZeniMax Media', 'Snowblind Studios', 'CyberConnect2', '3G Studios', 'Tamsoft', 'Virtuos', 'Nixxes Software', 'Slant Six', 'Chris Sawyer', '49Games', 'Oddworld Inhabitants', 'High Voltage Software', 'Blitz Games', 'Savage Entertainment', 'Nex Entertainment', 'Surreal Software', 'Climax Group', 'Locomotive Games', 'Nintendo, Nintendo Software Technology', 'Light Weight', 'City Interactive', 'Vingt-et-un Systems', 'K2 LLC', 'Ambrella', 'Konami Computer Entertainment Hawaii', 'Day 1 Studios', 'United Front Games', 'BudCat', 'Ryu ga Gotoku Studios', 'Atlus', 'Mercury Steam', 'TT Games', 'Sony Online Entertainment', 'PopCap', 'Electronic Arts, Rebellion', 'SCEE', 'Page 44 Studios', 'FreeStyleGames', 'Mad Doc Software, Rockstar Vancouver', 'Blizzard North', 'Arika', 'Barnhouse Effect', 'Vigil Games', 'n-Space', 'Black Lantern Studios', 'Microsoft Game Studios', 'Tecmo', '8ing/Raizing', 'Splash Damage', 'Studio Liverpool', 'Red Storm Entertainment, Ubisoft Paris', 'Crystal Dynamics, Nixxes Software', 'Bigbig Studios', 'EA Salt Lake', 'Longtail Studios', 'Epic Games, People Can Fly', 'Koei', 'Project Aces', 'Team Ninja, Tecmo', 'Razorworks Studios', '989 Sports', 'UBlart Montpellier', 'Free Radical Design', 'DreamFactory', 'Incinerator Games', 'Rockstar London', 'Ubisoft Toronto', 'Double Fine Productions', 'Turtle Rock Studios', 'Giants Software', 'Blue Tongue Entertainment', 'Overworks', 'Monster Games Inc.', 'Coresoft', 'Ubisoft Reflections', 'Alfa System', 'Buzz Monkey', 'SCEA San Diego Studios', 'Neko Entertainment', 'Activision', 'UDS', 'KCE Studios', 'Titus Software', 'Black Ops Entertainment', 'Tantalus Interactive', 'Mistwalker, Artoon', 'Marvelous AQL', 'Xpec', 'Mistwalker', 'Magic Pockets', 'Blitz Games Studios', 'KCEK', 'Sony Bend', 'RED Entertainment', 'FASA Studio', 'Runecraft', 'Big Huge Games', 'SCi', 'Cooking Mama Limited', 'Disney Interactive Studios', 'Red Fly Studio', 'Rage Software', 'Team 17', 'Dimps Corporation, Namco Bandai Games', 'Asobo Studio', 'Eutechnyx', 'Visual Impact', 'Gearbox Software, 3D Realms', 'Artificial Mind and Movement', 'Digital Anvil', 'Marvelous Entertainment', 'EA Seattle', 'Big Blue Bubble Inc.', 'Indie Built', 'Atlus Co.', 'Capcom, Pipeworks Software, Inc.', 'Monkey Bar Games', 'Guerilla Cambridge', 'Marvelous', 'Deibus Studios', 'Square Enix, Tri-Ace', 'Novarama', 'Silicon Knights', 'Digital Illusions', '5TH Cell', 'Kush Games, Visual Concepts', 'iNiS', 'EA Canada, Nihilistic', 'Eden Studios', 'David A. Palmer Productions', 'Acclaim Studios Austin', 'Tetris Online, Inc', 'Piranha Games', 'Exient Entertainment', 'Game Republic', 'Project Soul', 'Propaganda Games', 'JGI Entertainment', 'Digital Extremes', 'Brownie Brown', 'Natsume', 'Arc System Works', 'CyberConnect2, Racjin', 'Paradox Development', '2K Australia', 'Bandai', 'Jester Interactive', 'Pacific Coast Power & Light', 'Koei, Omega Force', 'Reality Pump', 'Virtucraft', 'Illusion Softworks', 'Kalypso', 'Midway Studios - Los Angeles', 'Ubisoft Milan', 'Fuse Games Limited', 'Pyramid', 'Black Isle Studios', 'Gaijin Entertainment', 'Sanzaru Games', 'Tomy Corporation', 'Secret Level', 'Nerve Software', 'Trion Worlds', 'Engine Software', 'Cunning Developments', 'Starbreeze', 'Delphine Software International', 'Shift, Bandai Namco Games', 'Suzak', 'Iron Galaxy Studios', 'GenePool', 'Ubisoft Casablanca', 'Epicenter Studios', 'KCEA', 'Adrenium', 'Juice Games', 'id Software, Raven Software', 'SEGA Racing Studio', 'Monolith Productions', 'Clover Studio', 'EA Sports, EA Canada', 'Paon Corporation', 'Lab Rats Games', 'High Impact Games', 'Skyworks Technologies', 'Robomodo', 'Ascaron Entertainment GmbH, Ascaron Entertainment', '2K Sports', 'Appaloosa Interactive', 'Vanillaware', 'Gameloft', 'Atomic Planet Entertainment', 'Coldwood Interactive', 'Valuewave Co.,Ltd.', 'Pam Development', 'Beenox', 'Ubisoft Romania', 'Spicy Horse', 'Overkill Software', 'Midway Studios - Austin', 'Nippon Ichi Software', 'Neverland', 'Silicon Studio', 'Vanilla Ware', 'Etranges Libellules', 'Relic', 'Anchor', 'Racjin', 'Magenta Software', 'Pipe Dream Interactive', 'Bullets', 'Grasshopper Manufacture', 'Aspect', 'Inti', 'THQ Digital Studio Phoenix', 'Brain Toys', 'Hothouse Creations', 'Yager', 'Omega Force, Koei Tecmo Games', '4A Games', 'Cing', 'WXP', 'Inevitable Entertainment', 'Destineer', 'Eighting', 'SCEA Sports Studio', 'Storm City Games', 'Q-Games', 'Vivarium', 'VU Games', 'MTO', 'Machatin, Inc.', 'Point of View', 'City Interactive, Deck 13', 'T&E Soft', 'Climax Group, Climax Studios', 'WBIE', 'AWE Games', 'Eugen Systems', 'Kuusou Kagaku', '7 Studios', 'WayForward', 'Zoe Mode', 'Totally Games', 'Bullfrog Productions', 'Ratbag', 'SCEJ', 'Razorworks', 'Farsight Studios', 'Beyond Games', 'Teyon', "Shin'en", 'ImaginEngine', 'Creations', 'Crave', 'Treasure', 'Eighting/Raizing', 'Studio Gigante', 'High Moon Studios', 'Wideload Games Inc.', 'Farsight Studios, Crave', 'Computer Artworks', 'Saffire', 'Team 17, Two Tribes', 'Q Entertainment', 'Tri-Crescendo', 'Pocketeers', 'LucasArts, Krome Studios', 'Idea Factory, Compile Heart', 'Ubisoft, Sensory Sweep', 'War Drum Studios', 'TOYBOX', 'Gust', 'Ritual Entertainment, Avalanche Software', 'Psygnosis', 'Atari', 'RedLynx', 'Spike Chunsoft', 'Red Storm Entertainment, Ubisoft Montreal', 'Saber Interactive', 'Idol Minds', 'Knowledge Adventure Inc.', 'Harmonix Music Systems, Demiurge Studios', 'Triumph Studios', 'DONTNOD Entertainment', 'Kuju Entertainment', 'Zen Studios', 'Prope', 'Wow Entertainment', 'Sega Studios San Francisco', 'Ganbarion', 'Milestone S.r.l', 'Amuze', 'Bugbear', 'Cyberlore Studios', 'Firebrand Games', '3DO', 'Noise Inc.', '2K Games', 'Psyonix', 'Takara Tomy', 'KCEO', 'Zombie Studios', 'GRIN', 'Bandai Namco Games, Artdink', 'Cattle Call', 'Inland Productions', 'ITL', 'Sandlot', 'Hypnotix', 'Airtight Games', 'Take-Two Interactive', 'Deep Silver Dambuster Studios', 'Pocket Studios', 'High Voltage Software, Backbone Entertainment', 'Nadeo', 'Sennari Interactive', 'Gas Powered Games', 'Tantatus', '1st Playable Productions', 'EA Canada, EA Vancouver', 'Inti Creates', 'Shift', 'Ion Storm', 'SNK Playmore', 'Smart Bomb Interactive', 'SunSoft', 'Terminal Reality, 4mm Games', 'AI', 'Eidos Interactive', 'Victor Interactive Software', 'Polygon Magic', 'Hijinx Studios', 'Opus', 'Venom Games', 'Phantagram', 'Mercury Steam, Alchemic Productions', 'Access Games', 'Image Epoch, Imageepoch', 'Blue Byte', 'Haemimont', 'MumboJumbo', 'Sidhe Interactive', 'Mucky Foot Productions', 'Humagade', 'Disney Interactive', 'Artdink', 'SCE Studio Cambridge', 'Graphic State', 'Banpresto', 'Mistic Software', 'IR Gurus', 'Akella', 'Vicious Cycle', 'Circus Freak', 'Infinite Interactive', 'Wargaming.net', 'Creat Studios', 'Cave', 'Warthog', 'Volatile Games', 'Media Vision', 'Ignition Entertainment', 'Presto Studios', 'Zoe Mode, HB Studios Multimedia', 'Arcade Moon', 'Attention To Detail', 'Crawfish Interactive', 'HotGen', 'Amble', 'Mac Play, MacPlay', 'Ubisoft Vancouver', 'TimeGate Studios', 'Human Head Studios', 'Smilebit', 'Blue Shift', 'Human Soft', 'Rovio Mobile, Rovio Entertainment', 'Metro', 'Treyarch, Shaba Games', 'DC Studios', 'Left Field Productions', 'Gorilla Systems', 'Mitchell', 'Activision Value', 'Cyanide, Cyanide Studios', 'FuRyu', 'Sony Interactive Entertainment', 'InXile Entertainment', 'ZootFly', 'Empire Interactive', 'Bec', 'Falcom', 'Keen Games', 'Cerasus Media', 'Nautilus', 'Frogwares', 'Oxygen Interactive', 'Revolution Software', 'Larian Studios', 'Evolution Games', 'Compile Heart', 'Gratuitous Games', 'Blue Tongue', 'K2', 'Bits Studios', 'Piranha Bytes', 'FUN Labs', 'Tecmo, Ntreev Soft', 'Monumental Games', 'Climax Entertainment', 'Data Design Interactive', 'GungHo', 'Fall Line Studio', 'Career Soft', 'AQ Interactive', 'Stealth Studios', 'Art', 'Pseudo Interactive', 'iWin', 'Backbone Vancouver', 'Kodiak Interactive', 'Swordfish Studios', 'Telltale Games', '2XL Games', 'Jellyvision, Iron Galaxy Studios', 'Bongfish', 'Cranky Pants Games', 'Alpha Unit', 'Takara', 'Powerhead Games', 'CCP', 'Hitmaker', 'Behaviour Interactive', 'Pyro Studios', 'WideScreen Games', 'Gaming Minds Studios', 'Torus Games', 'Aspyr', 'Big Sky Software', 'Cauldron Ltd.', 'Jet Black Games', 'Mad Catz', 'Vivendi Games', 'RFX Interactive', 'FeelPlus', 'Spiders', 'Nordcurrent', 'Artech Studios', 'Phoenix Games Studio', 'Zono Inc.', 'Full-Fat', 'Activision, FreeStyleGames', 'Software Creations', 'Santa Cruz Games', 'Seta Corporation', 'BottleRocket Entertainment', 'Irem', 'Games Farm', 'Spellbound', 'Buena Vista Games', 'D3Publisher', 'Coyote Developments', 'Majesco Games, Majesco', '5pb', 'Hydravision', 'Brash Entertainment', 'Marvelous Inc.', 'Big Ant Studios', 'Backbone Emeryville', 'Lost Toys', 'Koei Tecmo Games', 'Sensory Sweep', 'SimBin', "Swingin' Ape", 'Funcom', 'Impulse Games', 'Jaleco Entertainment', 'Deep Silver', 'Playlogic, The Game Factory', 'Experience Inc.', 'Kylotonn', 'Renegade Kid', 'Game Life', 'Cyanide', 'WinkySoft', 'SScholastic Media', 'Hudson Entertainment', 'SuperVillain Studios', 'System 3', 'Examu', 'Bam Entertainment', 'Broadsword Interactive', 'Magellan Interactive', 'Croteam', 'THQ Australia', 'Interchannel', 'Daedalic Entertainment', 'Her Interactive', 'Ubisoft Bulgaria', 'Re-Logic', 'Two Tribes', 'Firehazard Studio', 'Zerodiv', 'Liquid Entertainment', 'Sting', 'Mix Max', 'Microvision', 'Million', 'Epics', 'Westwood Studios', 'Studio 33', 'Bohemia Interactive', 'Colossal Order', 'Flight-Plan', 'Yacht Club Games', 'Seven45 Studios', 'TopWare Interactive', 'The Fun Pimps Entertainment LLC', 'Gaijin Games', 'Tripwire Interactive', 'Top Heavy Studios', 'Panic Button', 'Taniko', 'Atari, Atari SA', 'SCS Software', 'Deck 13', 'Outrage Games', 'Platinum Egg', 'Humongous Entertainment', 'Super X Studios', 'Deep Fried Entertainment', 'Stormregion', 'Kung Fu Factory', 'Infogrames', 'Acclaim Studios Manchester', 'Prope, Kadokawa', 'Cosmigo', 'Moss', 'Razorback Developments', 'Empire Oxford', 'Most Wanted Entertainment', 'Funatics Software, Funatics', 'Black Hole Games', 'Darkworks', 'Halfbrick Studios', 'Red Tribe', 'Trickstar Games', 'FireFly Studios', 'Gusto Games', 'Digital Embryo', 'Micro Cabin', 'Guildford Studio', 'Amanita Design', 'BeeWorks', 'Beyond Reality', 'Happy Happening', 'Zed Two Limited', 'Immersion Software & Graphics', 'Gameinvest', 'Idea Factory', 'KING Art', 'SNK', 'Microids', 'Koei/Inis', 'Petroglyph', 'Raylight Studios', 'Digital Mayhem', 'Dreamcatcher', 'Jellyvision', 'Frima Studio', 'Global A', 'Clockwork Games', 'Hoplite Research', '505 Games', 'Kemco', 'Starsphere Interactive', 'Other Ocean Interactive', 'Ivory Tower', 'Kadokawa', 'Milestone', 'Loose Cannon Studios', 'Atomic Motion', 'The Game Factory', 'Black Ship Games', 'The Behemoth', 'Stainless Games', 'Deadline Games', 'Silicon Dreams', 'Isopod Labs', 'Spark Unlimited, comcept', 'Neverland, Idea Factory', 'Hit Maker', 'Blue Omega', 'Hellbent Games', 'Smack Down Productions', 'S-Neo', 'Collision Studios', 'Wizarbox', 'NATSUME ATARI Inc.', 'OneNine Studios', 'Noise Factory', 'Kando Games', 'Namco Bandai Games, Monkey Bar Games', 'Digital Fiction', 'Egosoft', 'Velez & Dubail', 'Milestone, Milestone S.r.l', 'MileStone Inc.', 'Spike Chunsoft, Chime', 'Blade Interactive', 'Fatshark AB', 'ValuSoft', 'Paradox Development Studio', '5000ft', 'Success', 'G-Artists', 'Coyote Console', 'Jack of All Games', 'Starfish', 'Climax Studios', 'Metanet Software Inc., SilverBirch Studios', 'Zoo Games', 'Interplay', 'Little Orbit', 'Monte Cristo Multimedia', 'Klein Computer Entertainment', 'Kunos Simulazioni', 'Extra Mile Studios', 'Sonic Powered', 'Whitebear', 'Nordic Games Publishing', 'Pendulo Studios', '10tacle Studios, Fusionsphere Systems', 'Arkedo Studio', 'GSC Game World', 'Quicksilver Software', 'WorkJam', 'Blue Fang Games', 'Andamiro U.S.A. Corp.', 'KnowWonder', 'Orbital Media, Inc.', 'Eutechnyx, Deep Silver', 'Red Tribe, Brash Entertainment', 'Fluid Studios', 'CI Games', 'Icon Games', 'UGA', '1C: Maddox Games', 'Lexis Numerique', 'Doki Denki', 'Game Sauce', 'Iridon Interactive AB', 'Taito Corporation, 505 Games', 'Big John Games', 'PuzzleKings', 'Dusenberry Martin Racing', 'VSTEP', 'SouthPeak Games', 'Rising Star Games', 'EKO Software', 'Capcom, QLOC', 'Conspiracy Entertainment', 'Ascaron Entertainment GmbH', 'PopTop Software', 'Best Way', 'Naps Team', 'Mad Doc Software', 'Tilted Mill', 'Ivolgamus', 'CiRCLE', 'Frozenbyte, Inc.', 'LSP', 'FrontLine Studios', 'Introversion, Double Eleven', 'Viva Media, Viva Media, LLC', 'Black Sea Studios', 'Aqua Pacific, In2Games', 'Ironclad Games', 'Nitro Games', 'Legacy Interactive', 'Twelve Games', 'Mobius Entertainment', 'Activision, Behaviour Interactive', 'Neon Studios, Kaiko', 'Autumn Moon', '1C, 1C Company', 'Namco Bandai Games America', 'DTP Entertainment', 'Playstos Entertainment', 'SkyRiver Studios', '1C:Ino-Co', 'Planet Interactive', 'Supersonic Software', 'Babylon Software', 'Tate Interactive', '1C, Ino-Co, 1C Company', 'Paradox Interactive', 'King of the Jungle', 'Pronto Games', 'Destination Software']);

  const [genres] = useState(['Sports', 'Racing', 'Platform', 'Misc', 'Action', 'Puzzle', 'Shooter',
 'Fighting', 'Simulation', 'Role-Playing', 'Adventure', 'Strategy']
);
  const [platforms] = useState(['3DS', 'DC', 'DS', 'GBA', 'GC', 'PC', 'PS', 'PS2', 'PS3', 'PS4', 'PSP', 'PSV', 'Wii','WiiU', 'X360', 'XB', 'XOne']);
const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name,
      // naSales,
      // jpSales,
      // otherSales,
      yearOfRelease,
      yearOfPred,
      criticScore,
      criticCount,
      userScore,
      userCount,
      platform,
      publisher,
      developer,
      rating,
      gameCount,
      rankEuDeveloper,
      rankNaDeveloper,
      rankOtherDeveloper,
      rankJpDeveloper,
      developerRank,
      currency,
      steamId,
      genre,
      euSalesPerc,
      naSalesPerc,
      otherSalesPerc,
      jpSalesPerc
    };

    fetch('http://127.0.0.1:5000/game/add/eu', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setPredictionResult(data);
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className="transparent-background">
      <div className="top-panel">
        <Link to="/home">Home</Link>
        <Link to="/LoginForm">Login</Link>
        <Link to="/RegisterForm">Register</Link>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="header">
          <div className="title-container">
            <h1 className="title">GLOBAL VIDEO GAMES SALES PREDICTION</h1>
            {/*<h1 className="title"></h1>*/}
          </div>
        </div>
        <div className="form-row">
          <label>Name:</label>
          <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        </div>
        {/*<div className="form-row">*/}
        {/*  <label>NA Sales:</label>*/}
        {/*  <input type="text" placeholder="NA Sales" value={naSales} onChange={e => setNaSales(e.target.value)} />*/}
        {/*</div>*/}
        {/*<div className="form-row">*/}
        {/*  <label>JP Sales:</label>*/}
        {/*  <input type="text" placeholder="JP Sales" value={jpSales} onChange={e => setJpSales(e.target.value)} />*/}
        {/*</div>*/}
        {/*<div className="form-row">*/}
        {/*  <label>Other Sales:</label>*/}
        {/*  <input type="text" placeholder="Other Sales" value={otherSales} onChange={e => setOtherSales(e.target.value)} />*/}
        {/*</div>*/}
         <div className="form-row">
          <label>EU Sales Percent:</label>
          <input type="text" placeholder="EU Sales Percent" value={euSalesPerc} onChange={e => setEuSalesPerc(e.target.value)} />
        </div>
        <div className="form-row">
          <label>NA Sales Percent:</label>
          <input type="text" placeholder="NA Sales Percent" value={naSalesPerc} onChange={e => setNaSalesPerc(e.target.value)} />
        </div>
        <div className="form-row">
          <label>Other Sales Percent:</label>
          <input type="text" placeholder="Other Sales Percent" value={otherSalesPerc} onChange={e => setOtherSalesPerc(e.target.value)} />
        </div>
        <div className="form-row">
          <label>JP Sales Percent:</label>
          <input type="text" placeholder="JP Sales Percent" value={jpSalesPerc} onChange={e => setJpSalesPerc(e.target.value)} />
        </div>
        <div className="form-row">
          <label>Year of Release:</label>
          <input type="text" placeholder="Year of Release" value={yearOfRelease} onChange={e => setYearOfRelease(e.target.value)} />
        </div>
        <div className="form-row">
          <label>For Year:</label>
          <input type="text" placeholder="For Year" value={yearOfPred} onChange={e => setYearOfPred(e.target.value)} />
        </div>
        <div className="form-row">
          <label>Critic Score:</label>
          <input type="text" placeholder="Critic Score" value={criticScore} onChange={e => setCriticScore(e.target.value)} />
        </div>
        <div className="form-row">
          <label>Critic Count:</label>
          <input type="text" placeholder="Critic Count" value={criticCount} onChange={e => setCriticCount(e.target.value)} />
        </div>
        <div className="form-row">
          <label>User Score:</label>
          <input type="text" placeholder="User Score" value={userScore} onChange={e => setUserScore(e.target.value)} />
        </div>
        <div className="form-row">
          <label>User Count:</label>
          <input type="text" placeholder="User Count" value={userCount} onChange={e => setUserCount(e.target.value)} />
        </div>
        <div className="form-row">
          <label>Platform:</label>
          <select value={platform} onChange={e => setPlatform(e.target.value)}>
            <option value="">Select Platform</option>
            {platforms.map(plat => (
              <option value={plat} key={plat}>{plat}</option>
            ))}
          </select>
        </div>
        <div className="form-row">
          <label>Publisher:</label>
          <select value={publisher} onChange={e => setPublisher(e.target.value)}>
            <option value="">Select Publisher</option>
            {publishers.map(p => (
              <option value={p} key={p}>{p}</option>
            ))}
          </select>
        </div>
        <div className="form-row">
          <label>Developer:</label>
          <select value={developer} onChange={e => setDeveloper(e.target.value)}>
            <option value="">Select Developer</option>
            {developers.map(dev => (
              <option value={dev} key={dev}>{dev}</option>
            ))}
          </select>
        </div>
        <div className="form-row">
          <label>Genre:</label>
          <select value={genre} onChange={e => setGenre(e.target.value)}>
            <option value="">Select Genre</option>
            {genres.map(gen => (
              <option value={gen} key={gen}>{gen}</option>
            ))}
          </select>
        </div>
        <div className="form-row">
          <label>Game Count:</label>
          <input type="number" placeholder="Game Count" value={gameCount} onChange={e => setGameCount(e.target.value)} />
        </div>
        {/*<div className="form-row">*/}
        {/*  <label>Developer Rank:</label>*/}
        {/*  <input type="number" placeholder="Developer Rank" value={developerRank} onChange={e => setDeveloperRank(e.target.value)} />*/}
        {/*</div>*/}
        <div className="form-row">
          <label>Amount of games sold by Developer in EU:</label>
          <input type="number" placeholder="Amount of games sold by Developer" value={rankEuDeveloper} onChange={e => setRankEuDeveloper(e.target.value)} />
        </div>
        <div className="form-row">
          <label>Amount of games sold by Developer in NA:</label>
          <input type="number" placeholder="Amount of games sold by Developer" value={rankNaDeveloper} onChange={e => setRankNaDeveloper(e.target.value)} />
        </div>
        <div className="form-row">
          <label>Amount of games sold by Developer in JP:</label>
          <input type="number" placeholder="Amount of games sold by Developer" value={rankJpDeveloper} onChange={e => setRankJpDeveloper(e.target.value)} />
        </div>
        <div className="form-row">
          <label>Amount of games sold by Developer in Other Regions:</label>
          <input type="number" placeholder="Amount of games sold by Developer" value={rankOtherDeveloper} onChange={e => setRankOtherDeveloper(e.target.value)} />
        </div>
        <div className="form-row">
          <label>Steam ID:</label>
          <input type="text" placeholder="Steam ID" value={steamId} onChange={e => setSteamId(e.target.value)} />
        </div>
        <div className="form-row">
          <label>Currency:</label>
          <input type="text" placeholder="Currency" value={currency} onChange={e => setCurrency(e.target.value)} />
        </div>
        <div className="form-row">
          <label>Available for Everyone:</label>
          <input type="checkbox" checked={rating} onChange={handleCheckboxChange} />
        </div>
        <button type="submit" className="apply-button">Apply</button>
      </form>
      {predictionResult && (
        <div className="results">
          <h3>Prediction Results:</h3>
          <p>Predicted Global Sales: {predictionResult.predicted_global_sales}</p>
          <p>Calculated Price: {predictionResult.calculated_price}</p>
        </div>
      )}
    </div>
  );
};

export default GlobalPredictionPage;


//   const [publishers] = useState([
// 'Nintendo', 'Take-Two Interactive', 'Sony Computer Entertainment', 'Activision', 'Microsoft Game Studios', 'Ubisoft', 'Bethesda Softworks', 'Electronic Arts', 'SquareSoft', 'GT Interactive', 'Konami Digital Entertainment', 'Square Enix', 'Sony Computer Entertainment Europe', 'Virgin Interactive', 'LucasArts', '505 Games', 'Capcom', 'Universal Interactive', 'Eidos Interactive', 'RedOctane', 'Atari', 'Namco Bandai Games', 'Vivendi Games', 'MTV Games', 'THQ', 'Disney Interactive Studios', 'Sega', 'Acclaim Entertainment', 'Midway Games', 'Red Orb', 'Deep Silver', 'NCSoft', 'Tecmo Koei', 'Valve Software', 'Infogrames', 'Mindscape', 'Valve', 'Global Star', 'Gotham Games', 'Crave Entertainment', 'Codemasters', 'Zoo Games', 'Sony Online Entertainment', 'RTL', 'D3Publisher', 'Black Label Games', 'SouthPeak Games', 'City Interactive', 'Empire Interactive', 'Russel', 'Atlus', 'Slightly Mad Studios', 'Play It', 'Tomy Corporation', 'Focus Home Interactive', 'Unknown', 'Game Factory', 'Titus', 'Marvelous Entertainment', 'Genki', 'TalonSoft', 'Square Enix ', 'SCi', 'Rage Software', 'Rising Star Games', 'Scholastic Inc.', 'Enix Corporation', 'Level 5', 'Koch Media', 'Square EA', 'Hudson Soft', 'Touchstone', 'Spike', 'Nippon Ichi Software', 'Sony Computer Entertainment America', 'Jester Interactive', 'Majesco Entertainment', 'Illusion Softworks', 'Interplay', 'Metro 3D', 'Rondomedia', 'Ghostlight', 'Trion Worlds', 'Xseed Games', 'Kadokawa Shoten', 'Natsume', 'Square', 'Gamebridge', 'ASCII Entertainment', 'Rebellion', 'Ignition Entertainment', 'Harmonix Music Systems', 'Activision Blizzard', 'Xplosiv', 'System 3 Arcade Software', 'Wanadoo', 'NovaLogic', 'BAM! Entertainment', 'Tetris Online', 'Psygnosis', 'Screenlife', 'Knowledge Adventure', 'GungHo', '3DO', 'Takara Tomy', 'Sammy Corporation', 'Oxygen Interactive', 'PopCap Games', 'Gathering of Developers', 'Marvelous Interactive', 'Kalypso Media', 'Home Entertainment Suppliers', 'Arc System Works', 'Mud Duck Productions', 'Wargaming.net', 'Destineer', 'Mumbo Jumbo', 'Indie Games', 'Liquid Games', 'FuRyu', 'Nihon Falcom Corporation', 'DTP Entertainment', 'Falcom Corporation', 'Kemco', 'Milestone S.r.l.', 'AQ Interactive', 'Avanquest', 'XS Games', 'Activision Value', 'Telltale Games', 'Zushi Games', 'CCP', 'Rebellion Developments', 'Aspyr', 'Compile Heart', 'Mad Catz', 'Gust', 'TDK Core', 'Nordcurrent', 'bitComposer Games', 'JoWood Productions', 'Brash Entertainment', 'Funcom', 'Jaleco', 'Playlogic Game Factory', 'Game Life', 'Fox Interactive', 'System 3', 'Vatical Entertainment', 'Nordic Games', 'White Park Bay Software', 'Daedalic', 'The Adventure Company', 'EA Games', 'Acquire', 'Paradox Interactive', 'Banpresto', 'Yacht Club Games', 'Swing! Entertainment', 'Hip Interactive', 'Tripwire Interactive', 'SCS Software', 'Havas Interactive', 'Sting', 'Idea Factory', 'Destination Software, Inc', 'Tru Blu Entertainment', 'Crytek', 'Telegames', 'Moss', 'From Software', 'NDA Productions', 'Foreign Media Games', 'Bigben Interactive', 'Idea Factory International', 'O-Games', 'Gameloft', 'Taito', 'Storm City Games', 'Bohemia Interactive', 'Reef Entertainment', 'Ackkstudios', 'HMH Interactive', 'inXile Entertainment', 'Cave', 'Microids', 'Evolved Games', 'O3 Entertainment', 'Nobilis', 'Sunsoft', 'Little Orbit', 'Hudson Entertainment', 'Popcorn Arcade', 'Insomniac Games', 'Milestone', 'Aksys Games', 'Irem Software Engineering', 'Myelin Media', 'Success', 'Daedalic Entertainment', 'SNK Playmore', 'SNK', 'Avalon Interactive', 'Revolution Software', 'Gamecock', 'Mattel Interactive', 'ArtDink', 'Mercury Games', 'Ascaron Entertainment GmbH', 'Mastiff', 'Ertain', 'Phantagram', 'Dusenberry Martin Racing', 'Conspiracy Entertainment', 'ESP', 'Starfish', 'Team17 Software', 'Milestone S.r.l', 'Monte Christo Multimedia', '5pb', 'Legacy Interactive', 'Cloud Imperium Games Corporation', 'DSI Games', 'DHM Interactive', 'Essential Games', 'Flashpoint Games', 'Ivolgamus', 'MC2 Entertainment', 'Kando Games', 'Gearbox Software', 'LSP Games', 'Global A Entertainment', 'Just Flight', 'UFO Interactive', 'Introversion Software', 'Sold Out', 'Sunflowers', 'id Software', 'Maxis', 'Pinnacle', 'Devolver Digital', 'Xicat Interactive', "Yuke's", 'Strategy First', 'Lexicon Entertainment', 'JVC', 'Stainless Games', '10TACLE Studios', 'FuRyu Corporation', 'Visco', 'Crimson Cow', 'Mamba Games', 'Arika', 'Lighthouse Interactive', 'CDV Software Entertainment', 'Encore', 'Blue Byte', 'Paradox Development', 'NewKidCo']);
//
//   const [developers] = useState(['Nintendo', 'Rockstar North', 'Polyphony Digital', 'Infinity Ward, Sledgehammer Games', 'Treyarch', 'Infinity Ward', 'DMA Design', 'Game Arts', 'Bungie Software, Bungie', 'Ubisoft', 'Bungie', 'SquareSoft', '343 Industries', 'Hudson Soft', 'Bethesda Game Studios', 'EA Sports', 'Bungie Software', 'Nd Cube', 'Hudson', 'Electronic Arts', 'The Sims Studio', 'Game Freak', 'Rockstar Leeds', 'Sledgehammer Games', 'EA Sports, EA Vancouver', 'Nintendo EAD Tokyo', 'EA DICE', 'EA Black Box', 'Ubisoft Paris', 'Namco', 'Naughty Dog', 'HAL Labs', 'EA Canada', 'EA LA', 'Epic Games', 'Rockstar San Diego', 'Retro Studios', 'Blizzard Entertainment', 'Reflections Interactive', 'Rare Ltd.', 'KCEJ', 'Kojima Productions', 'Square Enix', 'SCE/WWS, Media Molecule', 'Capcom', 'Level 5', "Traveller's Tales", 'Taito Corporation', 'Ubisoft Montreal', 'Turn 10', 'Intelligent Systems', 'Core Design Ltd.', 'Harmonix Music Systems', 'Lionhead Studios', 'Neversoft Entertainment', 'SCE Santa Monica', 'TT Fusion', 'Stormfront Studios', 'Bluepoint Games', 'Vicarious Visions', 'Next Level Games', 'EA Tiburon', 'Konami', 'Bethesda Softworks', 'Ubisoft Paris, Ubisoft Montpellier', 'Insomniac Games', 'Mass Media', 'Rocksteady Studios', 'Ready at Dawn', 'Valve Software', 'Obsidian Entertainment', 'Cat Daddy Games', 'Digital Eclipse', 'CD Projekt Red Studio', 'Ubisoft, Ubisoft Montreal', 'Visual Concepts', 'Evolution Studios', 'KCET', 'Massive Entertainment', 'Maxis', 'Argonaut Games', 'TOSE', 'Zipper Interactive', 'Pandemic Studios', 'Fox Interactive', 'EA Redwood Shores', 'Gearbox Software', 'Kojima Productions, Moby Dick Studio', 'Media Molecule', 'Eurocom Entertainment Software', 'Ubisoft Quebec', 'Double Helix Games', 'Rockstar Toronto', 'EA Games', 'Luxoflux, Inc.', 'Shiny Entertainment', 'Team Bondi', 'Indies Zero', '4J Studios', 'BioWare', 'Dimps Corporation', 'Quantic Dream', 'Volition Inc.', 'Guerrilla', 'Junction Point', 'Spike, Namco Bandai Games', 'Sonic Team', 'Io Interactive', 'Respawn Entertainment', 'Sucker Punch', 'Sumo Digital', 'Clap Hanz', 'Spark Unlimited', 'Irrational Games, 2K Marin', 'NuFX', 'Criterion Games', 'Toys for Bob', 'Edge of Reality', 'LucasArts', 'Artoon', 'Namco Bandai Games', 'Dreamworks Interactive', 'Ubisoft Shanghai', 'Slightly Mad Studios', 'Team Fusion', 'Angel Studios', 'Ensemble Studios', 'Dice, Danger Close', 'syn Sophia', "Yuke's", 'Genius Sonority Inc.', 'Acclaim Studios Cheltenham', 'Headstrong Games', 'CAProduction', 'Raven Software', 'Midway', 'From Software', 'Black Rock Studio', 'Cyan Worlds', 'THQ', 'Rainbow Studios', 'Black Box', 'Techland', 'Heavy Iron Studios', 'Pipeworks Software, Inc.', 'Frontier Developments', 'ArenaNet', 'Backbone Entertainment', 'Sega', '2K Marin', 'Amaze Entertainment', 'Bizarre Creations', 'Omega Force', 'Visceral Games', 'Matrix Software', 'Full Fat', 'Helixe', 'EA Vancouver', 'Ubisoft Montpellier', 'ChunSoft', 'Midway Studios - San Diego', 'Acquire', 'h.a.n.d. Inc.', 'Ghost Games', 'Aki Corp.', 'Exakt', 'Irrational Games', 'Nintendo, Nd Cube', 'NanaOn-Sha', 'Factor 5', 'Papaya Studios', 'SCEI', 'Krome Studios', 'Avalanche Studios', 'Jupiter Corporation', 'Rockstar Studios', 'Altron', 'Creative Assembly', 'Sega AM2', 'Hangar 13', 'Tango Gameworks', 'SCEE London Studio', 'Genuine Games', 'Team Ninja', 'Camelot Software Planning', 'Red Storm Entertainment', 'VIS Entertainment', 'Monolith Soft', 'Terminal Reality', 'Ready at Dawn, SCE Santa Monica', 'SCE Japan Studio', 'ArtePiazza', 'Ubisoft Reflections, Ivory Tower', 'Tri-Ace', 'Arkane Studios', '3d6 Games', 'Artefacts Studio', 'Griptonite Games', 'Webfoot Technologies', 'Firaxis Games', 'Bandai Namco Games', 'Rebellion', 'Shaba Games', 'Paradigm Entertainment', 'EA Chicago', 'SuperMassive Games', 'HB Studios Multimedia', 'EA Sports Big', 'Spike', 'Ninja Theory', 'EA Montreal', 'id Software', 'Capcom Vancouver', 'Pivotal Games', 'MachineGames', '2K Czech', 'Cavia Inc.', 'The Code Monkeys', 'Amusement Vision', 'Sports Interactive', 'Genki', 'Blue Castle Games', 'Kush Games', 'Nihilistic', 'Kaos Studios', 'Avalanche Software', 'Planet Moon Studios', 'Blue Byte, Related Designs', 'EA Bright Light', 'Sand Grain Studios', 'PlatinumGames', 'Danger Close', 'Incognito Inc.', 'Codemasters', 'Playground Games', 'Crytek', 'Crystal Dynamics', 'Sega, Sonic Team', 'Z-Axis, Ltd.', 'Now Production', 'Eidos Montreal', 'Pitbull Syndicate', 'Codemasters Birmingham', 'Remedy Entertainment', 'Acclaim', 'Radical Entertainment', 'SCEA', 'Namco Bandai Games America, Namco Bandai Games', 'Creatures Inc.', 'M2', 'Melbourne House', 'Ubisoft Sofia', 'ZeniMax Media', 'Snowblind Studios', 'CyberConnect2', '3G Studios', 'Tamsoft', 'Virtuos', 'Nixxes Software', 'Slant Six', 'Chris Sawyer', '49Games', 'Oddworld Inhabitants', 'High Voltage Software', 'Blitz Games', 'Savage Entertainment', 'Nex Entertainment', 'Surreal Software', 'Climax Group', 'Locomotive Games', 'Nintendo, Nintendo Software Technology', 'Light Weight', 'City Interactive', 'Vingt-et-un Systems', 'K2 LLC', 'Ambrella', 'Konami Computer Entertainment Hawaii', 'Day 1 Studios', 'United Front Games', 'BudCat', 'Ryu ga Gotoku Studios', 'Atlus', 'Mercury Steam', 'TT Games', 'Sony Online Entertainment', 'PopCap', 'Electronic Arts, Rebellion', 'SCEE', 'Page 44 Studios', 'FreeStyleGames', 'Mad Doc Software, Rockstar Vancouver', 'Blizzard North', 'Arika', 'Barnhouse Effect', 'Vigil Games', 'n-Space', 'Black Lantern Studios', 'Microsoft Game Studios', 'Tecmo', '8ing/Raizing', 'Splash Damage', 'Studio Liverpool', 'Red Storm Entertainment, Ubisoft Paris', 'Crystal Dynamics, Nixxes Software', 'Bigbig Studios', 'EA Salt Lake', 'Longtail Studios', 'Epic Games, People Can Fly', 'Koei', 'Project Aces', 'Team Ninja, Tecmo', 'Razorworks Studios', '989 Sports', 'UBlart Montpellier', 'Free Radical Design', 'DreamFactory', 'Incinerator Games', 'Rockstar London', 'Ubisoft Toronto', 'Double Fine Productions', 'Turtle Rock Studios', 'Giants Software', 'Blue Tongue Entertainment', 'Overworks', 'Monster Games Inc.', 'Coresoft', 'Ubisoft Reflections', 'Alfa System', 'Buzz Monkey', 'SCEA San Diego Studios', 'Neko Entertainment', 'Activision', 'UDS', 'KCE Studios', 'Titus Software', 'Black Ops Entertainment', 'Tantalus Interactive', 'Mistwalker, Artoon', 'Marvelous AQL', 'Xpec', 'Mistwalker', 'Magic Pockets', 'Blitz Games Studios', 'KCEK', 'Sony Bend', 'RED Entertainment', 'FASA Studio', 'Runecraft', 'Big Huge Games', 'SCi', 'Cooking Mama Limited', 'Disney Interactive Studios', 'Red Fly Studio', 'Rage Software', 'Team 17', 'Dimps Corporation, Namco Bandai Games', 'Asobo Studio', 'Eutechnyx', 'Visual Impact', 'Gearbox Software, 3D Realms', 'Artificial Mind and Movement', 'Digital Anvil', 'Marvelous Entertainment', 'EA Seattle', 'Big Blue Bubble Inc.', 'Indie Built', 'Atlus Co.', 'Capcom, Pipeworks Software, Inc.', 'Monkey Bar Games', 'Guerilla Cambridge', 'Marvelous', 'Deibus Studios', 'Square Enix, Tri-Ace', 'Novarama', 'Silicon Knights', 'Digital Illusions', '5TH Cell', 'Kush Games, Visual Concepts', 'iNiS', 'EA Canada, Nihilistic', 'Eden Studios', 'David A. Palmer Productions', 'Acclaim Studios Austin', 'Tetris Online, Inc', 'Piranha Games', 'Exient Entertainment', 'Game Republic', 'Project Soul', 'Propaganda Games', 'JGI Entertainment', 'Digital Extremes', 'Brownie Brown', 'Natsume', 'Arc System Works', 'CyberConnect2, Racjin', 'Paradox Development', '2K Australia', 'Bandai', 'Jester Interactive', 'Pacific Coast Power & Light', 'Koei, Omega Force', 'Reality Pump', 'Virtucraft', 'Illusion Softworks', 'Kalypso', 'Midway Studios - Los Angeles', 'Ubisoft Milan', 'Fuse Games Limited', 'Pyramid', 'Black Isle Studios', 'Gaijin Entertainment', 'Sanzaru Games', 'Tomy Corporation', 'Secret Level', 'Nerve Software', 'Trion Worlds', 'Engine Software', 'Cunning Developments', 'Starbreeze', 'Delphine Software International', 'Shift, Bandai Namco Games', 'Suzak', 'Iron Galaxy Studios', 'GenePool', 'Ubisoft Casablanca', 'Epicenter Studios', 'KCEA', 'Adrenium', 'Juice Games', 'id Software, Raven Software', 'SEGA Racing Studio', 'Monolith Productions', 'Clover Studio', 'EA Sports, EA Canada', 'Paon Corporation', 'Lab Rats Games', 'High Impact Games', 'Skyworks Technologies', 'Robomodo', 'Ascaron Entertainment GmbH, Ascaron Entertainment', '2K Sports', 'Appaloosa Interactive', 'Vanillaware', 'Gameloft', 'Atomic Planet Entertainment', 'Coldwood Interactive', 'Valuewave Co.,Ltd.', 'Pam Development', 'Beenox', 'Ubisoft Romania', 'Spicy Horse', 'Overkill Software', 'Midway Studios - Austin', 'Nippon Ichi Software', 'Neverland', 'Silicon Studio', 'Vanilla Ware', 'Etranges Libellules', 'Relic', 'Anchor', 'Racjin', 'Magenta Software', 'Pipe Dream Interactive', 'Bullets', 'Grasshopper Manufacture', 'Aspect', 'Inti', 'THQ Digital Studio Phoenix', 'Brain Toys', 'Hothouse Creations', 'Yager', 'Omega Force, Koei Tecmo Games', '4A Games', 'Cing', 'WXP', 'Inevitable Entertainment', 'Destineer', 'Eighting', 'SCEA Sports Studio', 'Storm City Games', 'Q-Games', 'Vivarium', 'VU Games', 'MTO', 'Machatin, Inc.', 'Point of View', 'City Interactive, Deck 13', 'T&E Soft', 'Climax Group, Climax Studios', 'WBIE', 'AWE Games', 'Eugen Systems', 'Kuusou Kagaku', '7 Studios', 'WayForward', 'Zoe Mode', 'Totally Games', 'Bullfrog Productions', 'Ratbag', 'SCEJ', 'Razorworks', 'Farsight Studios', 'Beyond Games', 'Teyon', "Shin'en", 'ImaginEngine', 'Creations', 'Crave', 'Treasure', 'Eighting/Raizing', 'Studio Gigante', 'High Moon Studios', 'Wideload Games Inc.', 'Farsight Studios, Crave', 'Computer Artworks', 'Saffire', 'Team 17, Two Tribes', 'Q Entertainment', 'Tri-Crescendo', 'Pocketeers', 'LucasArts, Krome Studios', 'Idea Factory, Compile Heart', 'Ubisoft, Sensory Sweep', 'War Drum Studios', 'TOYBOX', 'Gust', 'Ritual Entertainment, Avalanche Software', 'Psygnosis', 'Atari', 'RedLynx', 'Spike Chunsoft', 'Red Storm Entertainment, Ubisoft Montreal', 'Saber Interactive', 'Idol Minds', 'Knowledge Adventure Inc.', 'Harmonix Music Systems, Demiurge Studios', 'Triumph Studios', 'DONTNOD Entertainment', 'Kuju Entertainment', 'Zen Studios', 'Prope', 'Wow Entertainment', 'Sega Studios San Francisco', 'Ganbarion', 'Milestone S.r.l', 'Amuze', 'Bugbear', 'Cyberlore Studios', 'Firebrand Games', '3DO', 'Noise Inc.', '2K Games', 'Psyonix', 'Takara Tomy', 'KCEO', 'Zombie Studios', 'GRIN', 'Bandai Namco Games, Artdink', 'Cattle Call', 'Inland Productions', 'ITL', 'Sandlot', 'Hypnotix', 'Airtight Games', 'Take-Two Interactive', 'Deep Silver Dambuster Studios', 'Pocket Studios', 'High Voltage Software, Backbone Entertainment', 'Nadeo', 'Sennari Interactive', 'Gas Powered Games', 'Tantatus', '1st Playable Productions', 'EA Canada, EA Vancouver', 'Inti Creates', 'Shift', 'Ion Storm', 'SNK Playmore', 'Smart Bomb Interactive', 'SunSoft', 'Terminal Reality, 4mm Games', 'AI', 'Eidos Interactive', 'Victor Interactive Software', 'Polygon Magic', 'Hijinx Studios', 'Opus', 'Venom Games', 'Phantagram', 'Mercury Steam, Alchemic Productions', 'Access Games', 'Image Epoch, Imageepoch', 'Blue Byte', 'Haemimont', 'MumboJumbo', 'Sidhe Interactive', 'Mucky Foot Productions', 'Humagade', 'Disney Interactive', 'Artdink', 'SCE Studio Cambridge', 'Graphic State', 'Banpresto', 'Mistic Software', 'IR Gurus', 'Akella', 'Vicious Cycle', 'Circus Freak', 'Infinite Interactive', 'Wargaming.net', 'Creat Studios', 'Cave', 'Warthog', 'Volatile Games', 'Media Vision', 'Ignition Entertainment', 'Presto Studios', 'Zoe Mode, HB Studios Multimedia', 'Arcade Moon', 'Attention To Detail', 'Crawfish Interactive', 'HotGen', 'Amble', 'Mac Play, MacPlay', 'Ubisoft Vancouver', 'TimeGate Studios', 'Human Head Studios', 'Smilebit', 'Blue Shift', 'Human Soft', 'Rovio Mobile, Rovio Entertainment', 'Metro', 'Treyarch, Shaba Games', 'DC Studios', 'Left Field Productions', 'Gorilla Systems', 'Mitchell', 'Activision Value', 'Cyanide, Cyanide Studios', 'FuRyu', 'Sony Interactive Entertainment', 'InXile Entertainment', 'ZootFly', 'Empire Interactive', 'Bec', 'Falcom', 'Keen Games', 'Cerasus Media', 'Nautilus', 'Frogwares', 'Oxygen Interactive', 'Revolution Software', 'Larian Studios', 'Evolution Games', 'Compile Heart', 'Gratuitous Games', 'Blue Tongue', 'K2', 'Bits Studios', 'Piranha Bytes', 'FUN Labs', 'Tecmo, Ntreev Soft', 'Monumental Games', 'Climax Entertainment', 'Data Design Interactive', 'GungHo', 'Fall Line Studio', 'Career Soft', 'AQ Interactive', 'Stealth Studios', 'Art', 'Pseudo Interactive', 'iWin', 'Backbone Vancouver', 'Kodiak Interactive', 'Swordfish Studios', 'Telltale Games', '2XL Games', 'Jellyvision, Iron Galaxy Studios', 'Bongfish', 'Cranky Pants Games', 'Alpha Unit', 'Takara', 'Powerhead Games', 'CCP', 'Hitmaker', 'Behaviour Interactive', 'Pyro Studios', 'WideScreen Games', 'Gaming Minds Studios', 'Torus Games', 'Aspyr', 'Big Sky Software', 'Cauldron Ltd.', 'Jet Black Games', 'Mad Catz', 'Vivendi Games', 'RFX Interactive', 'FeelPlus', 'Spiders', 'Nordcurrent', 'Artech Studios', 'Phoenix Games Studio', 'Zono Inc.', 'Full-Fat', 'Activision, FreeStyleGames', 'Software Creations', 'Santa Cruz Games', 'Seta Corporation', 'BottleRocket Entertainment', 'Irem', 'Games Farm', 'Spellbound', 'Buena Vista Games', 'D3Publisher', 'Coyote Developments', 'Majesco Games, Majesco', '5pb', 'Hydravision', 'Brash Entertainment', 'Marvelous Inc.', 'Big Ant Studios', 'Backbone Emeryville', 'Lost Toys', 'Koei Tecmo Games', 'Sensory Sweep', 'SimBin', "Swingin' Ape", 'Funcom', 'Impulse Games', 'Jaleco Entertainment', 'Deep Silver', 'Playlogic, The Game Factory', 'Experience Inc.', 'Kylotonn', 'Renegade Kid', 'Game Life', 'Cyanide', 'WinkySoft', 'SScholastic Media', 'Hudson Entertainment', 'SuperVillain Studios', 'System 3', 'Examu', 'Bam Entertainment', 'Broadsword Interactive', 'Magellan Interactive', 'Croteam', 'THQ Australia', 'Interchannel', 'Daedalic Entertainment', 'Her Interactive', 'Ubisoft Bulgaria', 'Re-Logic', 'Two Tribes', 'Firehazard Studio', 'Zerodiv', 'Liquid Entertainment', 'Sting', 'Mix Max', 'Microvision', 'Million', 'Epics', 'Westwood Studios', 'Studio 33', 'Bohemia Interactive', 'Colossal Order', 'Flight-Plan', 'Yacht Club Games', 'Seven45 Studios', 'TopWare Interactive', 'The Fun Pimps Entertainment LLC', 'Gaijin Games', 'Tripwire Interactive', 'Top Heavy Studios', 'Panic Button', 'Taniko', 'Atari, Atari SA', 'SCS Software', 'Deck 13', 'Outrage Games', 'Platinum Egg', 'Humongous Entertainment', 'Super X Studios', 'Deep Fried Entertainment', 'Stormregion', 'Kung Fu Factory', 'Infogrames', 'Acclaim Studios Manchester', 'Prope, Kadokawa', 'Cosmigo', 'Moss', 'Razorback Developments', 'Empire Oxford', 'Most Wanted Entertainment', 'Funatics Software, Funatics', 'Black Hole Games', 'Darkworks', 'Halfbrick Studios', 'Red Tribe', 'Trickstar Games', 'FireFly Studios', 'Gusto Games', 'Digital Embryo', 'Micro Cabin', 'Guildford Studio', 'Amanita Design', 'BeeWorks', 'Beyond Reality', 'Happy Happening', 'Zed Two Limited', 'Immersion Software & Graphics', 'Gameinvest', 'Idea Factory', 'KING Art', 'SNK', 'Microids', 'Koei/Inis', 'Petroglyph', 'Raylight Studios', 'Digital Mayhem', 'Dreamcatcher', 'Jellyvision', 'Frima Studio', 'Global A', 'Clockwork Games', 'Hoplite Research', '505 Games', 'Kemco', 'Starsphere Interactive', 'Other Ocean Interactive', 'Ivory Tower', 'Kadokawa', 'Milestone', 'Loose Cannon Studios', 'Atomic Motion', 'The Game Factory', 'Black Ship Games', 'The Behemoth', 'Stainless Games', 'Deadline Games', 'Silicon Dreams', 'Isopod Labs', 'Spark Unlimited, comcept', 'Neverland, Idea Factory', 'Hit Maker', 'Blue Omega', 'Hellbent Games', 'Smack Down Productions', 'S-Neo', 'Collision Studios', 'Wizarbox', 'NATSUME ATARI Inc.', 'OneNine Studios', 'Noise Factory', 'Kando Games', 'Namco Bandai Games, Monkey Bar Games', 'Digital Fiction', 'Egosoft', 'Velez & Dubail', 'Milestone, Milestone S.r.l', 'MileStone Inc.', 'Spike Chunsoft, Chime', 'Blade Interactive', 'Fatshark AB', 'ValuSoft', 'Paradox Development Studio', '5000ft', 'Success', 'G-Artists', 'Coyote Console', 'Jack of All Games', 'Starfish', 'Climax Studios', 'Metanet Software Inc., SilverBirch Studios', 'Zoo Games', 'Interplay', 'Little Orbit', 'Monte Cristo Multimedia', 'Klein Computer Entertainment', 'Kunos Simulazioni', 'Extra Mile Studios', 'Sonic Powered', 'Whitebear', 'Nordic Games Publishing', 'Pendulo Studios', '10tacle Studios, Fusionsphere Systems', 'Arkedo Studio', 'GSC Game World', 'Quicksilver Software', 'WorkJam', 'Blue Fang Games', 'Andamiro U.S.A. Corp.', 'KnowWonder', 'Orbital Media, Inc.', 'Eutechnyx, Deep Silver', 'Red Tribe, Brash Entertainment', 'Fluid Studios', 'CI Games', 'Icon Games', 'UGA', '1C: Maddox Games', 'Lexis Numerique', 'Doki Denki', 'Game Sauce', 'Iridon Interactive AB', 'Taito Corporation, 505 Games', 'Big John Games', 'PuzzleKings', 'Dusenberry Martin Racing', 'VSTEP', 'SouthPeak Games', 'Rising Star Games', 'EKO Software', 'Capcom, QLOC', 'Conspiracy Entertainment', 'Ascaron Entertainment GmbH', 'PopTop Software', 'Best Way', 'Naps Team', 'Mad Doc Software', 'Tilted Mill', 'Ivolgamus', 'CiRCLE', 'Frozenbyte, Inc.', 'LSP', 'FrontLine Studios', 'Introversion, Double Eleven', 'Viva Media, Viva Media, LLC', 'Black Sea Studios', 'Aqua Pacific, In2Games', 'Ironclad Games', 'Nitro Games', 'Legacy Interactive', 'Twelve Games', 'Mobius Entertainment', 'Activision, Behaviour Interactive', 'Neon Studios, Kaiko', 'Autumn Moon', '1C, 1C Company', 'Namco Bandai Games America', 'DTP Entertainment', 'Playstos Entertainment', 'SkyRiver Studios', '1C:Ino-Co', 'Planet Interactive', 'Supersonic Software', 'Babylon Software', 'Tate Interactive', '1C, Ino-Co, 1C Company', 'Paradox Interactive', 'King of the Jungle', 'Pronto Games', 'Destination Software']);
//
//   const [ratings] = useState(['E', 'M', 'T', 'E10+', 'K-A', 'AO', 'EC', 'RP']);
