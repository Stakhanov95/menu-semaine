// =====================================================================
//  BASE DE RECETTES
// =====================================================================
//  Les quantités sont données POUR 1 PERSONNE : l'application les
//  multiplie automatiquement par le nombre de personnes.
//
//  Pour ajouter une recette : copiez un bloc { ... }, collez-le à la
//  fin de la liste et adaptez-le. Champs :
//    nom         : nom affiché
//    saisons     : "printemps", "ete", "automne", "hiver" (ou TOUTES)
//    proteine    : "poisson", "volaille", "viande" ou "vegetarien"
//    temps       : temps total en minutes
//    plaisir     : true pour un plat plus riche (1 max par semaine)
//    batch       : true si le plat se prépare à l'avance et se réchauffe
//                  bien (batch cooking). Il doit aussi être un repas complet :
//                  l'application vérifie qu'il contient protéines, féculents
//                  et légumes avant de le proposer.
//    ingredients : [quantité, unité, nom]
//                  unité "" = à la pièce ; quantité 0 = à avoir au placard
//    etapes      : la recette, étape par étape
// =====================================================================

const TOUTES = ["printemps", "ete", "automne", "hiver"];

// Rayon du magasin de chaque ingrédient (pour trier la liste de courses).
// Un ingrédient absent de cette liste ira dans « Divers ».
const RAYONS = {
  "Fruits & légumes": [
    "potimarron", "butternut", "oignon", "oignon rouge", "échalote", "ail", "carotte", "poireau",
    "champignons de Paris", "épinards frais", "brocoli", "chou-fleur", "panais", "patate douce",
    "pommes de terre", "pommes de terre nouvelles", "pomme", "poire", "céleri-rave", "endive",
    "mâche", "salade verte", "chou vert", "choux de Bruxelles", "fenouil", "betterave cuite",
    "asperges vertes", "petits pois frais", "radis", "fèves", "carottes nouvelles", "oignon nouveau",
    "tomate", "tomates cerises", "courgette", "aubergine", "poivron", "haricots verts", "concombre",
    "citron", "basilic", "persil", "coriandre", "menthe", "gingembre", "roquette", "noix",
    "chou chinois", "avocat", "sauge", "ciboulette", "navet", "chou rouge", "citron vert"
  ],
  "Boucherie & volaille": [
    "blanc de poulet", "cuisses de poulet", "bœuf haché", "bœuf à braiser", "filet mignon de porc",
    "jambon blanc", "lardons", "steak de bœuf", "chair à saucisse", "escalope de dinde"
  ],
  "Poissonnerie": [
    "pavé de saumon", "dos de cabillaud", "filet de truite", "filet de colin", "filet de dorade",
    "crevettes décortiquées"
  ],
  "Crèmerie & œufs": [
    "œuf", "beurre", "crème fraîche", "lait", "parmesan", "emmental râpé", "fromage de chèvre",
    "feta", "mozzarella", "yaourt nature", "reblochon", "pâte brisée", "pâte à pizza", "lait de coco",
    "ricotta", "halloumi", "tofu ferme", "tofu fumé", "pâte feuilletée", "gnocchis", "raclette (tranches)"
  ],
  "Boulangerie": ["pain de campagne", "pain à burger", "galettes de sarrasin"],
  "Épicerie": [
    "riz", "riz arborio", "pâtes", "semoule", "quinoa", "boulgour", "lentilles corail",
    "lentilles vertes", "pois chiches (bocal)", "haricots rouges (bocal)", "tomates concassées (boîte)",
    "thon au naturel (boîte)", "olives noires", "nouilles chinoises", "pignons de pin", "houmous",
    "maïs (boîte)", "graines de courge", "pois cassés", "haricots noirs (bocal)", "haricots blancs (bocal)",
    "orge perlé", "polenta", "tortillas", "pesto", "tahini", "feuilles de lasagne", "noix de cajou",
    "pâte de curry vert", "chapelure", "lentilles beluga"
  ],
  "Surgelés": ["petits pois surgelés", "épinards surgelés"],
  "Placard (à vérifier)": [
    "sel & poivre", "huile d'olive", "bouillon cube", "curry en poudre", "cumin", "paprika",
    "herbes de Provence", "sauce soja", "moutarde", "vinaigre", "farine", "muscade", "vin blanc",
    "thym & laurier", "piment d'Espelette", "miel", "concentré de tomate", "garam masala", "ras el hanout", "graines de sésame",
    "fécule de maïs"
  ]
};

// Produits de saison (affichés à titre indicatif dans l'application)
const PRODUITS_SAISON = {
  printemps: "asperges, petits pois, fèves, radis, épinards, carottes nouvelles, artichaut, oignons nouveaux, fraises, rhubarbe",
  ete: "tomates, courgettes, aubergines, poivrons, haricots verts, concombre, maïs, basilic, melon, pêches, abricots",
  automne: "potimarron, butternut, champignons, poireaux, brocoli, chou-fleur, panais, patate douce, pommes, poires, raisin",
  hiver: "poireaux, chou, choux de Bruxelles, endives, mâche, céleri-rave, carottes, panais, oranges, clémentines, kiwis"
};

const RECETTES = [
  // ---------------------------------------------------------- AUTOMNE / HIVER
  {
    nom: "Velouté de potimarron aux lentilles corail & tartines de chèvre",
    saisons: ["automne", "hiver"], proteine: "vegetarien", temps: 30,
    ingredients: [[300, "g", "potimarron"], [0.5, "", "oignon"], [40, "g", "lentilles corail"],
      [40, "g", "fromage de chèvre"], [2, "tranche", "pain de campagne"], [0, "", "bouillon cube"],
      [0, "", "huile d'olive"], [0, "", "sel & poivre"]],
    etapes: ["Laver le potimarron (pas besoin de l'éplucher), le couper en cubes. Émincer l'oignon.",
      "Faire revenir l'oignon 2 min dans un filet d'huile, ajouter potimarron et lentilles rincées.",
      "Couvrir d'eau à hauteur + 1 bouillon cube, cuire 20 min puis mixer.",
      "Pendant ce temps, griller les tartines et les garnir de chèvre (2 min sous le grill)."]
  },
  {
    nom: "Poulet, butternut rôtie & riz",
    saisons: ["automne"], proteine: "volaille", temps: 35,
    ingredients: [[130, "g", "blanc de poulet"], [250, "g", "butternut"], [0.5, "", "oignon rouge"],
      [70, "g", "riz"], [0, "", "paprika"], [0, "", "huile d'olive"], [0, "", "sel & poivre"]],
    etapes: ["Préchauffer le four à 200 °C. Éplucher la butternut et la couper en cubes, l'oignon en quartiers.",
      "Mettre sur une plaque avec huile, paprika, sel, poivre. Enfourner 25 min.",
      "Cuire le riz. Couper le poulet en morceaux et le dorer 8 min à la poêle.",
      "Servir le poulet sur le riz avec les légumes rôtis."]
  },
  {
    nom: "Saumon au four, poireaux fondants & pommes de terre",
    saisons: ["automne", "hiver"], proteine: "poisson", temps: 35,
    ingredients: [[130, "g", "pavé de saumon"], [1, "", "poireau"], [200, "g", "pommes de terre"],
      [20, "ml", "crème fraîche"], [0.25, "", "citron"], [0, "", "beurre"], [0, "", "sel & poivre"]],
    etapes: ["Cuire les pommes de terre à l'eau (20 min) ou à la vapeur.",
      "Émincer les poireaux, les faire fondre 15 min à couvert avec une noisette de beurre, ajouter la crème.",
      "Cuire le saumon 12 min au four à 180 °C avec un filet de citron.",
      "Servir le saumon sur les poireaux, avec les pommes de terre."]
  },
  {
    nom: "Dahl de lentilles corail aux épinards & riz", batch: true,
    saisons: TOUTES, proteine: "vegetarien", temps: 30,
    ingredients: [[70, "g", "lentilles corail"], [100, "g", "épinards surgelés"], [0.5, "", "oignon"],
      [1, "gousse", "ail"], [100, "ml", "lait de coco"], [100, "g", "tomates concassées (boîte)"],
      [60, "g", "riz"], [0, "", "curry en poudre"], [0, "", "huile d'olive"]],
    etapes: ["Faire revenir oignon et ail émincés avec 1 c. à café de curry.",
      "Ajouter lentilles rincées, tomates, lait de coco et 1 verre d'eau. Cuire 15 min.",
      "Ajouter les épinards 5 min avant la fin. Pendant ce temps, cuire le riz.",
      "Rectifier l'assaisonnement et servir."]
  },
  {
    nom: "Risotto aux champignons",
    saisons: ["automne"], proteine: "vegetarien", temps: 35,
    ingredients: [[80, "g", "riz arborio"], [150, "g", "champignons de Paris"], [1, "", "échalote"],
      [25, "g", "parmesan"], [40, "g", "salade verte"], [0, "", "bouillon cube"], [0, "", "vin blanc"],
      [0, "", "huile d'olive"]],
    etapes: ["Préparer 1 litre de bouillon chaud (pour 2). Émincer échalote et champignons.",
      "Faire revenir l'échalote, ajouter le riz, le nacrer 1 min, déglacer avec un trait de vin blanc.",
      "Ajouter le bouillon louche par louche en remuant (18 min). Poêler les champignons à part.",
      "Hors du feu, ajouter champignons et parmesan. Servir avec une salade verte."]
  },
  {
    nom: "Tarte aux poireaux & salade",
    saisons: ["automne", "hiver"], proteine: "vegetarien", temps: 45,
    ingredients: [[0.33, "", "pâte brisée"], [1.5, "", "poireau"], [1, "", "œuf"], [30, "ml", "crème fraîche"],
      [25, "g", "emmental râpé"], [50, "g", "salade verte"], [0, "", "muscade"], [0, "", "beurre"]],
    etapes: ["Préchauffer le four à 200 °C. Émincer les poireaux, les faire fondre 10 min au beurre.",
      "Battre œufs, crème, emmental, sel, poivre, muscade.",
      "Étaler la pâte dans un moule, ajouter poireaux puis l'appareil. Cuire 30 min.",
      "Servir avec la salade."]
  },
  {
    nom: "Hachis parmentier",
    saisons: ["automne", "hiver"], proteine: "viande", temps: 50, plaisir: true,
    ingredients: [[120, "g", "bœuf haché"], [300, "g", "pommes de terre"], [100, "g", "carotte"],
      [0.5, "", "oignon"], [60, "ml", "lait"], [20, "g", "emmental râpé"], [50, "g", "salade verte"],
      [0, "", "beurre"], [0, "", "sel & poivre"]],
    etapes: ["Cuire les pommes de terre 20 min à l'eau, les écraser avec lait et beurre.",
      "Faire revenir oignon et carotte râpée, ajouter la viande et cuire 5 min.",
      "Dans un plat : viande, puis purée, emmental par-dessus.",
      "Gratiner 20 min à 200 °C. Servir avec la salade."]
  },
  {
    nom: "Chili sin carne & riz", batch: true,
    saisons: ["automne", "hiver"], proteine: "vegetarien", temps: 30,
    ingredients: [[120, "g", "haricots rouges (bocal)"], [0.5, "", "poivron"], [0.5, "", "oignon"],
      [50, "g", "maïs (boîte)"], [150, "g", "tomates concassées (boîte)"], [60, "g", "riz"],
      [0, "", "cumin"], [0, "", "paprika"], [0, "", "huile d'olive"]],
    etapes: ["Faire revenir oignon et poivron en dés 5 min.",
      "Ajouter cumin, paprika, tomates, haricots rincés et maïs. Mijoter 15 min.",
      "Cuire le riz en parallèle.",
      "Servir (un peu de yaourt ou de coriandre par-dessus, si vous aimez)."]
  },
  {
    nom: "Cabillaud & purée de carottes au cumin",
    saisons: ["automne", "hiver", "printemps"], proteine: "poisson", temps: 30,
    ingredients: [[140, "g", "dos de cabillaud"], [250, "g", "carotte"], [100, "g", "pommes de terre"],
      [0.25, "", "citron"], [0, "", "cumin"], [0, "", "beurre"], [0, "", "sel & poivre"]],
    etapes: ["Éplucher carottes et pommes de terre, les cuire 20 min à l'eau.",
      "Les mixer avec une noisette de beurre et une pincée de cumin.",
      "Cuire le cabillaud 4 min de chaque côté à la poêle, ou 12 min au four à 180 °C.",
      "Servir avec un filet de citron."]
  },
  {
    nom: "Bœuf-carottes mijoté", batch: true,
    saisons: ["automne", "hiver"], proteine: "viande", temps: 120,
    ingredients: [[150, "g", "bœuf à braiser"], [250, "g", "carotte"], [0.5, "", "oignon"],
      [150, "g", "pommes de terre"], [0, "", "thym & laurier"], [0, "", "vin blanc"], [0, "", "farine"],
      [0, "", "huile d'olive"]],
    etapes: ["Couper la viande en cubes, la dorer dans une cocotte, saupoudrer d'une c. à soupe de farine.",
      "Ajouter oignon, carottes en rondelles, thym, laurier, un verre de vin blanc et de l'eau à hauteur.",
      "Laisser mijoter 1 h 30 à couvert, à feu doux (ça se fait tout seul).",
      "Ajouter les pommes de terre 30 min avant la fin."]
  },
  {
    nom: "Pâtes au brocoli, ail & parmesan",
    saisons: ["automne", "hiver"], proteine: "vegetarien", temps: 20,
    ingredients: [[90, "g", "pâtes"], [200, "g", "brocoli"], [1, "gousse", "ail"], [25, "g", "parmesan"],
      [10, "g", "pignons de pin"], [0, "", "huile d'olive"], [0, "", "sel & poivre"]],
    etapes: ["Cuire les pâtes avec les fleurettes de brocoli dans la même eau.",
      "Faire dorer l'ail émincé et les pignons dans l'huile d'olive.",
      "Égoutter (garder une louche d'eau), mélanger le tout avec le parmesan."]
  },
  {
    nom: "Curry de pois chiches & chou-fleur", batch: true,
    saisons: ["automne", "hiver"], proteine: "vegetarien", temps: 30,
    ingredients: [[120, "g", "pois chiches (bocal)"], [200, "g", "chou-fleur"], [0.5, "", "oignon"],
      [100, "ml", "lait de coco"], [60, "g", "riz"], [0, "", "curry en poudre"], [0, "", "huile d'olive"]],
    etapes: ["Faire revenir l'oignon avec le curry.",
      "Ajouter le chou-fleur en petits bouquets, les pois chiches rincés et le lait de coco.",
      "Couvrir et cuire 15 min. Cuire le riz en parallèle."]
  },
  {
    nom: "Omelette aux champignons & salade",
    saisons: ["automne", "printemps"], proteine: "vegetarien", temps: 15,
    ingredients: [[3, "", "œuf"], [120, "g", "champignons de Paris"], [60, "g", "salade verte"],
      [1, "tranche", "pain de campagne"], [0, "", "persil"], [0, "", "beurre"]],
    etapes: ["Émincer les champignons et les poêler 5 min.",
      "Battre les œufs, verser sur les champignons, cuire à feu doux.",
      "Parsemer de persil, servir avec la salade et le pain."]
  },
  {
    nom: "Gratin de chou-fleur au jambon",
    saisons: ["automne", "hiver"], proteine: "viande", temps: 45, plaisir: true,
    ingredients: [[300, "g", "chou-fleur"], [1, "tranche", "jambon blanc"], [150, "ml", "lait"],
      [30, "g", "emmental râpé"], [0, "", "farine"], [0, "", "beurre"], [0, "", "muscade"]],
    etapes: ["Cuire le chou-fleur 10 min à l'eau bouillante salée.",
      "Béchamel : 20 g de beurre + 20 g de farine, puis le lait en fouettant, muscade.",
      "Dans un plat : chou-fleur, jambon en morceaux, béchamel, emmental.",
      "Gratiner 20 min à 200 °C."]
  },
  {
    nom: "Cuisses de poulet rôties, panais & carottes", batch: true,
    saisons: ["automne", "hiver"], proteine: "volaille", temps: 50,
    ingredients: [[1, "", "cuisses de poulet"], [150, "g", "panais"], [150, "g", "carotte"],
      [100, "g", "pommes de terre"], [2, "gousse", "ail"], [0, "", "thym & laurier"], [0, "", "huile d'olive"]],
    etapes: ["Préchauffer le four à 200 °C.",
      "Couper les légumes en bâtonnets, les mettre dans un plat avec l'ail en chemise, huile et thym.",
      "Poser le poulet dessus, saler, poivrer. Enfourner 45 min (presque rien à faire)."]
  },
  {
    nom: "Endives au jambon",
    saisons: ["hiver"], proteine: "viande", temps: 45, plaisir: true,
    ingredients: [[2, "", "endive"], [2, "tranche", "jambon blanc"], [150, "ml", "lait"],
      [30, "g", "emmental râpé"], [0, "", "farine"], [0, "", "beurre"], [0, "", "muscade"]],
    etapes: ["Cuire les endives 15 min à la vapeur, bien les égoutter.",
      "Préparer une béchamel (beurre, farine, lait, muscade).",
      "Rouler chaque endive dans une tranche de jambon, napper de béchamel et d'emmental.",
      "Gratiner 20 min à 200 °C."]
  },
  {
    nom: "Salade tiède de lentilles, endives, pomme & noix",
    saisons: ["hiver"], proteine: "vegetarien", temps: 25,
    ingredients: [[70, "g", "lentilles vertes"], [1, "", "endive"], [0.5, "", "pomme"], [15, "g", "noix"],
      [30, "g", "fromage de chèvre"], [0, "", "moutarde"], [0, "", "vinaigre"], [0, "", "huile d'olive"]],
    etapes: ["Cuire les lentilles 20 min dans l'eau non salée.",
      "Émincer endive et pomme, concasser les noix.",
      "Vinaigrette : moutarde, vinaigre, huile. Mélanger avec les lentilles tièdes, émietter le chèvre."]
  },
  {
    nom: "Tartiflette & salade verte",
    saisons: ["hiver"], proteine: "viande", temps: 50, plaisir: true,
    ingredients: [[300, "g", "pommes de terre"], [50, "g", "lardons"], [0.5, "", "oignon"],
      [0.25, "", "reblochon"], [60, "g", "salade verte"], [0, "", "vin blanc"]],
    etapes: ["Cuire les pommes de terre 15 min à l'eau, les couper en rondelles.",
      "Faire revenir oignon et lardons, déglacer d'un trait de vin blanc.",
      "Mélanger dans un plat, poser le reblochon coupé en deux dans l'épaisseur.",
      "Cuire 25 min à 200 °C. Servir avec une grande salade."]
  },
  {
    nom: "Colin, choux de Bruxelles rôtis & quinoa",
    saisons: ["hiver"], proteine: "poisson", temps: 30,
    ingredients: [[140, "g", "filet de colin"], [200, "g", "choux de Bruxelles"], [60, "g", "quinoa"],
      [0.25, "", "citron"], [0, "", "huile d'olive"], [0, "", "sel & poivre"]],
    etapes: ["Couper les choux en deux, les rôtir 25 min à 200 °C avec huile, sel, poivre.",
      "Cuire le quinoa 12 min.",
      "Cuire le colin 3–4 min par face à la poêle. Servir avec un filet de citron."]
  },
  {
    nom: "Galettes de sarrasin œuf, épinards & chèvre",
    saisons: ["hiver", "printemps"], proteine: "vegetarien", temps: 20,
    ingredients: [[2, "", "galettes de sarrasin"], [2, "", "œuf"], [150, "g", "épinards surgelés"],
      [30, "g", "fromage de chèvre"], [40, "g", "salade verte"], [0, "", "beurre"]],
    etapes: ["Réchauffer les épinards à la poêle, bien égoutter.",
      "Chauffer une galette dans une poêle beurrée, casser un œuf au centre.",
      "Ajouter épinards et chèvre autour, replier les bords quand le blanc est cuit.",
      "Servir avec la salade."]
  },
  {
    nom: "Filet mignon de porc aux pommes & purée de céleri",
    saisons: ["automne", "hiver"], proteine: "viande", temps: 40,
    ingredients: [[130, "g", "filet mignon de porc"], [1, "", "pomme"], [200, "g", "céleri-rave"],
      [100, "g", "pommes de terre"], [20, "ml", "crème fraîche"], [0, "", "beurre"], [0, "", "sel & poivre"]],
    etapes: ["Cuire céleri et pommes de terre en cubes 20 min à l'eau, mixer avec la crème.",
      "Couper le filet mignon en médaillons, les dorer 4 min par face.",
      "Ajouter la pomme en quartiers dans la poêle, cuire 8 min à couvert."]
  },
  {
    nom: "Truite en papillote, fenouil & riz",
    saisons: ["hiver", "printemps"], proteine: "poisson", temps: 30,
    ingredients: [[140, "g", "filet de truite"], [0.5, "", "fenouil"], [0.25, "", "citron"], [60, "g", "riz"],
      [0, "", "huile d'olive"], [0, "", "sel & poivre"]],
    etapes: ["Préchauffer le four à 200 °C. Émincer finement le fenouil.",
      "Sur du papier cuisson : fenouil, truite, rondelles de citron, huile, sel, poivre. Fermer.",
      "Cuire 20 min. Pendant ce temps, cuire le riz."]
  },
  {
    nom: "Curry de patate douce & lentilles", batch: true,
    saisons: ["automne", "hiver"], proteine: "vegetarien", temps: 35,
    ingredients: [[200, "g", "patate douce"], [50, "g", "lentilles corail"], [0.5, "", "oignon"],
      [100, "ml", "lait de coco"], [150, "g", "épinards surgelés"], [1, "tranche", "pain de campagne"],
      [0, "", "garam masala"], [0, "", "gingembre"], [0, "", "huile d'olive"]],
    etapes: ["Faire revenir oignon, gingembre râpé et garam masala.",
      "Ajouter patate douce en cubes, lentilles, lait de coco et 1 verre d'eau.",
      "Cuire 20 min, ajouter les épinards 5 min avant la fin. Servir avec du pain (ou du riz)."]
  },

  // ---------------------------------------------------------- PRINTEMPS
  {
    nom: "Asperges vertes, œufs mollets & pommes de terre nouvelles",
    saisons: ["printemps"], proteine: "vegetarien", temps: 25,
    ingredients: [[250, "g", "asperges vertes"], [2, "", "œuf"], [200, "g", "pommes de terre nouvelles"],
      [15, "g", "parmesan"], [0, "", "huile d'olive"], [0, "", "sel & poivre"]],
    etapes: ["Cuire les pommes de terre 15 min à l'eau.",
      "Cuire les asperges 6–8 min à la vapeur ou à la poêle.",
      "Œufs mollets : 6 min dans l'eau bouillante puis eau froide, écaler.",
      "Servir avec copeaux de parmesan et filet d'huile d'olive."]
  },
  {
    nom: "Risotto petits pois & menthe",
    saisons: ["printemps"], proteine: "vegetarien", temps: 30,
    ingredients: [[80, "g", "riz arborio"], [120, "g", "petits pois frais"], [1, "", "oignon nouveau"],
      [25, "g", "parmesan"], [0, "", "menthe"], [0, "", "bouillon cube"], [0, "", "huile d'olive"]],
    etapes: ["Faire revenir l'oignon nouveau, ajouter le riz et le nacrer 1 min.",
      "Ajouter le bouillon chaud louche par louche en remuant (18 min).",
      "Ajouter les petits pois à mi-cuisson.",
      "Hors du feu : parmesan et menthe ciselée."]
  },
  {
    nom: "Saumon, asperges vertes & quinoa citronné",
    saisons: ["printemps"], proteine: "poisson", temps: 25,
    ingredients: [[130, "g", "pavé de saumon"], [200, "g", "asperges vertes"], [60, "g", "quinoa"],
      [0.5, "", "citron"], [0, "", "huile d'olive"], [0, "", "sel & poivre"]],
    etapes: ["Cuire le quinoa 12 min, l'assaisonner de jus de citron et d'huile.",
      "Poêler les asperges 8 min.",
      "Cuire le saumon côté peau 6 min puis 2 min de l'autre côté."]
  },
  {
    nom: "Poulet aux carottes nouvelles & petits pois", batch: true,
    saisons: ["printemps"], proteine: "volaille", temps: 35,
    ingredients: [[130, "g", "blanc de poulet"], [150, "g", "carottes nouvelles"], [100, "g", "petits pois frais"],
      [1, "", "oignon nouveau"], [60, "g", "boulgour"], [0, "", "bouillon cube"], [0, "", "huile d'olive"]],
    etapes: ["Dorer le poulet en morceaux avec l'oignon nouveau.",
      "Ajouter carottes en rondelles, petits pois, 1 verre de bouillon. Couvrir 20 min.",
      "Cuire le boulgour 10 min et servir ensemble."]
  },
  {
    nom: "Salade de pâtes printanière (radis, fèves, feta)",
    saisons: ["printemps"], proteine: "vegetarien", temps: 20,
    ingredients: [[80, "g", "pâtes"], [5, "", "radis"], [100, "g", "fèves"], [50, "g", "feta"],
      [0, "", "menthe"], [0, "", "citron"], [0, "", "huile d'olive"]],
    etapes: ["Cuire les pâtes, les rafraîchir.",
      "Écosser les fèves, les plonger 2 min dans l'eau bouillante puis retirer la peau.",
      "Mélanger pâtes, radis en rondelles, fèves, feta, menthe, citron et huile."]
  },
  {
    nom: "Boulettes de bœuf, épinards & semoule", batch: true,
    saisons: ["printemps", "automne"], proteine: "viande", temps: 30,
    ingredients: [[120, "g", "bœuf haché"], [200, "g", "épinards frais"], [70, "g", "semoule"],
      [1, "gousse", "ail"], [100, "g", "tomates concassées (boîte)"], [0, "", "cumin"], [0, "", "huile d'olive"]],
    etapes: ["Former des boulettes avec la viande, sel, poivre, cumin. Les dorer 8 min.",
      "Ajouter les tomates, mijoter 10 min.",
      "Faire tomber les épinards à l'ail 3 min. Préparer la semoule (eau bouillante, 5 min)."]
  },
  {
    nom: "Frittata aux asperges & petits pois",
    saisons: ["printemps"], proteine: "vegetarien", temps: 25,
    ingredients: [[3, "", "œuf"], [150, "g", "asperges vertes"], [60, "g", "petits pois frais"],
      [20, "g", "parmesan"], [60, "g", "salade verte"], [1, "tranche", "pain de campagne"], [0, "", "huile d'olive"]],
    etapes: ["Couper les asperges en tronçons, les poêler 5 min avec les petits pois.",
      "Verser les œufs battus avec le parmesan, cuire à feu doux 8 min à couvert.",
      "Servir en parts avec la salade."]
  },
  {
    nom: "Escalope de dinde, purée de petits pois & carottes nouvelles",
    saisons: ["printemps"], proteine: "volaille", temps: 25,
    ingredients: [[130, "g", "escalope de dinde"], [150, "g", "petits pois frais"], [150, "g", "carottes nouvelles"],
      [100, "g", "pommes de terre nouvelles"], [0, "", "menthe"], [0, "", "beurre"]],
    etapes: ["Cuire petits pois et pommes de terre 15 min, mixer avec un peu de beurre et de menthe.",
      "Cuire les carottes nouvelles à la vapeur 12 min.",
      "Poêler l'escalope 3 min de chaque côté."]
  },

  // ---------------------------------------------------------- ÉTÉ
  {
    nom: "Ratatouille express & œufs au plat",
    saisons: ["ete"], proteine: "vegetarien", temps: 35,
    ingredients: [[1, "", "courgette"], [0.5, "", "aubergine"], [0.5, "", "poivron"], [1, "", "tomate"],
      [0.5, "", "oignon"], [2, "", "œuf"], [1, "tranche", "pain de campagne"], [0, "", "herbes de Provence"],
      [0, "", "huile d'olive"]],
    etapes: ["Couper tous les légumes en dés.",
      "Faire revenir oignon et poivron, ajouter aubergine, courgette, tomate, herbes. Cuire 25 min.",
      "Faire des puits dans la ratatouille, y casser les œufs, couvrir 5 min."]
  },
  {
    nom: "Taboulé aux herbes & poulet grillé", batch: true,
    saisons: ["ete"], proteine: "volaille", temps: 25,
    ingredients: [[130, "g", "blanc de poulet"], [60, "g", "boulgour"], [1, "", "tomate"], [0.5, "", "concombre"],
      [0, "", "persil"], [0, "", "menthe"], [0.5, "", "citron"], [0, "", "huile d'olive"]],
    etapes: ["Cuire le boulgour, le laisser refroidir.",
      "Ajouter tomate et concombre en dés, beaucoup de persil et menthe, citron, huile.",
      "Griller le poulet 5 min par face et le servir tranché sur le taboulé."]
  },
  {
    nom: "Salade niçoise",
    saisons: ["ete"], proteine: "poisson", temps: 25,
    ingredients: [[80, "g", "thon au naturel (boîte)"], [1, "", "œuf"], [1, "", "tomate"], [100, "g", "haricots verts"],
      [150, "g", "pommes de terre"], [15, "g", "olives noires"], [50, "g", "salade verte"], [0, "", "huile d'olive"],
      [0, "", "vinaigre"]],
    etapes: ["Cuire pommes de terre (15 min), haricots verts (8 min) et œufs durs (10 min).",
      "Disposer salade, tomates en quartiers, légumes, thon, olives, œuf.",
      "Arroser de vinaigrette."]
  },
  {
    nom: "Courgettes farcies & riz", batch: true,
    saisons: ["ete"], proteine: "viande", temps: 45,
    ingredients: [[1, "", "courgette"], [100, "g", "chair à saucisse"], [0.5, "", "oignon"], [60, "g", "riz"],
      [100, "g", "tomates concassées (boîte)"], [0, "", "herbes de Provence"]],
    etapes: ["Couper les courgettes en deux, les évider. Hacher la chair retirée.",
      "Mélanger chair à saucisse, chair de courgette, oignon, herbes. Farcir.",
      "Disposer dans un plat avec les tomates, cuire 35 min à 190 °C. Cuire le riz."]
  },
  {
    nom: "Pâtes à la tomate fraîche, basilic & mozzarella",
    saisons: ["ete"], proteine: "vegetarien", temps: 20,
    ingredients: [[90, "g", "pâtes"], [2, "", "tomate"], [60, "g", "mozzarella"], [1, "gousse", "ail"],
      [0, "", "basilic"], [0, "", "huile d'olive"]],
    etapes: ["Couper les tomates en dés, mélanger avec ail, basilic, huile, sel.",
      "Cuire les pâtes, les égoutter.",
      "Mélanger aux tomates et ajouter la mozzarella en morceaux."]
  },
  {
    nom: "Brochettes de poulet, poivrons & semoule",
    saisons: ["ete"], proteine: "volaille", temps: 30,
    ingredients: [[130, "g", "blanc de poulet"], [1, "", "poivron"], [0.5, "", "oignon rouge"], [70, "g", "semoule"],
      [60, "g", "yaourt nature"], [0, "", "paprika"], [0, "", "huile d'olive"]],
    etapes: ["Couper poulet et poivrons en cubes, mariner 10 min avec huile et paprika.",
      "Monter les brochettes, cuire 12 min au grill ou à la plancha.",
      "Préparer la semoule. Servir avec le yaourt citronné."]
  },
  {
    nom: "Cabillaud en papillote tomate-courgette & riz",
    saisons: ["ete"], proteine: "poisson", temps: 30,
    ingredients: [[140, "g", "dos de cabillaud"], [1, "", "courgette"], [1, "", "tomate"], [60, "g", "riz"],
      [0, "", "basilic"], [0.25, "", "citron"], [0, "", "huile d'olive"]],
    etapes: ["Préchauffer le four à 200 °C.",
      "Sur du papier cuisson : courgette en fines rondelles, tomate, cabillaud, basilic, citron, huile. Fermer.",
      "Cuire 20 min. Cuire le riz en parallèle."]
  },
  {
    nom: "Aubergines rôties, pois chiches & sauce yaourt", batch: true,
    saisons: ["ete", "automne"], proteine: "vegetarien", temps: 35,
    ingredients: [[1, "", "aubergine"], [120, "g", "pois chiches (bocal)"], [80, "g", "yaourt nature"],
      [50, "g", "boulgour"], [0, "", "cumin"], [0, "", "menthe"], [0, "", "huile d'olive"]],
    etapes: ["Couper les aubergines en cubes, rôtir 25 min à 200 °C avec huile et cumin.",
      "Ajouter les pois chiches les 10 dernières minutes.",
      "Cuire le boulgour. Servir avec le yaourt mélangé à la menthe."]
  },
  {
    nom: "Burger maison & crudités",
    saisons: TOUTES, proteine: "viande", temps: 25, plaisir: true,
    ingredients: [[1, "", "pain à burger"], [130, "g", "bœuf haché"], [0.5, "", "tomate"], [20, "g", "salade verte"],
      [0.25, "", "oignon rouge"], [20, "g", "emmental râpé"], [100, "g", "carotte"], [0, "", "moutarde"]],
    etapes: ["Former les steaks, les cuire 3 min de chaque côté, ajouter le fromage à la fin.",
      "Toaster les pains.",
      "Monter : pain, salade, steak, tomate, oignon. Servir avec carottes râpées."]
  },
  {
    nom: "Steak, haricots verts & pommes de terre sautées",
    saisons: ["ete"], proteine: "viande", temps: 30,
    ingredients: [[130, "g", "steak de bœuf"], [200, "g", "haricots verts"], [200, "g", "pommes de terre"],
      [1, "gousse", "ail"], [0, "", "persil"], [0, "", "huile d'olive"]],
    etapes: ["Cuire les haricots verts 8 min à l'eau salée.",
      "Poêler les pommes de terre en cubes 20 min.",
      "Cuire le steak à votre goût, ajouter ail et persil sur les haricots."]
  },
  {
    nom: "Chakchouka (œufs pochés aux poivrons & tomates)",
    saisons: ["ete", "automne"], proteine: "vegetarien", temps: 30,
    ingredients: [[1, "", "poivron"], [2, "", "tomate"], [0.5, "", "oignon"], [2, "", "œuf"],
      [1, "tranche", "pain de campagne"], [0, "", "cumin"], [0, "", "paprika"], [0, "", "huile d'olive"]],
    etapes: ["Faire revenir oignon et poivrons en lanières 10 min.",
      "Ajouter tomates en dés, cumin, paprika. Mijoter 10 min.",
      "Casser les œufs dessus, couvrir 5–6 min. Servir avec le pain."]
  },
  {
    nom: "Poulet basquaise & riz", batch: true,
    saisons: ["ete", "automne"], proteine: "volaille", temps: 40,
    ingredients: [[1, "", "cuisses de poulet"], [1, "", "poivron"], [1, "", "tomate"], [0.5, "", "oignon"],
      [60, "g", "riz"], [1, "gousse", "ail"], [0, "", "piment d'Espelette"], [0, "", "huile d'olive"]],
    etapes: ["Dorer le poulet dans une cocotte, réserver.",
      "Faire revenir oignon, ail, poivrons, ajouter tomates et piment.",
      "Remettre le poulet, couvrir et mijoter 30 min. Cuire le riz."]
  },
  {
    nom: "Salade de quinoa, avocat, maïs & crevettes",
    saisons: ["ete"], proteine: "poisson", temps: 20,
    ingredients: [[60, "g", "quinoa"], [0.5, "", "avocat"], [50, "g", "maïs (boîte)"], [100, "g", "crevettes décortiquées"],
      [0.5, "", "concombre"], [0.5, "", "citron"], [0, "", "coriandre"], [0, "", "huile d'olive"]],
    etapes: ["Cuire le quinoa 12 min, le laisser refroidir.",
      "Couper avocat et concombre en dés.",
      "Mélanger le tout avec crevettes, maïs, citron, huile et coriandre."]
  },

  // ---------------------------------------------------------- TOUTE L'ANNÉE
  {
    nom: "Pizza maison aux légumes",
    saisons: TOUTES, proteine: "vegetarien", temps: 30, plaisir: true,
    ingredients: [[0.5, "", "pâte à pizza"], [80, "g", "tomates concassées (boîte)"], [60, "g", "mozzarella"],
      [80, "g", "champignons de Paris"], [0.5, "", "poivron"], [30, "g", "roquette"], [0, "", "huile d'olive"]],
    etapes: ["Préchauffer le four à 240 °C.",
      "Étaler la pâte, la garnir de tomates, légumes émincés, mozzarella.",
      "Cuire 12–15 min. Ajouter la roquette en sortie de four."]
  },
  {
    nom: "Wok de poulet aux légumes & nouilles",
    saisons: TOUTES, proteine: "volaille", temps: 25,
    ingredients: [[120, "g", "blanc de poulet"], [70, "g", "nouilles chinoises"], [100, "g", "carotte"],
      [150, "g", "chou chinois"], [1, "gousse", "ail"], [0, "", "gingembre"], [0, "", "sauce soja"],
      [0, "", "huile d'olive"]],
    etapes: ["Cuire les nouilles selon le paquet.",
      "Saisir le poulet en lamelles à feu vif 5 min, réserver.",
      "Sauter les légumes émincés avec ail et gingembre 5 min.",
      "Remettre poulet et nouilles, ajouter la sauce soja, mélanger 1 min."]
  },
  {
    nom: "Pâtes au thon, tomate & olives",
    saisons: TOUTES, proteine: "poisson", temps: 20,
    ingredients: [[90, "g", "pâtes"], [70, "g", "thon au naturel (boîte)"], [150, "g", "tomates concassées (boîte)"],
      [10, "g", "olives noires"], [0.5, "", "oignon"], [50, "g", "roquette"], [0, "", "huile d'olive"]],
    etapes: ["Faire revenir l'oignon, ajouter tomates et olives, mijoter 10 min.",
      "Ajouter le thon émietté hors du feu.",
      "Mélanger avec les pâtes cuites, servir avec la roquette."]
  },
  {
    nom: "Salade tiède de lentilles, carottes & œuf mollet",
    saisons: ["automne", "hiver", "printemps"], proteine: "vegetarien", temps: 25,
    ingredients: [[70, "g", "lentilles vertes"], [100, "g", "carotte"], [1, "", "œuf"], [0.5, "", "échalote"],
      [40, "g", "mâche"], [0, "", "moutarde"], [0, "", "vinaigre"], [0, "", "huile d'olive"]],
    etapes: ["Cuire les lentilles 20 min avec la carotte en dés.",
      "Œuf mollet : 6 min dans l'eau bouillante.",
      "Mélanger lentilles tièdes, échalote, vinaigrette moutardée, servir sur la mâche avec l'œuf."]
  },
  {
    nom: "Soupe de légumes d'hiver & croque au fromage",
    saisons: ["hiver"], proteine: "vegetarien", temps: 35,
    ingredients: [[1, "", "poireau"], [100, "g", "carotte"], [100, "g", "céleri-rave"], [100, "g", "pommes de terre"],
      [2, "tranche", "pain de campagne"], [30, "g", "emmental râpé"], [0, "", "bouillon cube"]],
    etapes: ["Couper tous les légumes, les couvrir d'eau + bouillon cube, cuire 25 min puis mixer.",
      "Garnir le pain d'emmental, gratiner 5 min au four."]
  },

  // ==================================================================
  //  RECETTES VÉGÉTARIENNES SUPPLÉMENTAIRES
  //  Chaque plat associe une source de protéines (légumineuses, tofu,
  //  œufs ou fromage) à une céréale et beaucoup de légumes.
  // ==================================================================

  // ---------------------------------------------------------- AUTOMNE (végé)
  {
    nom: "Gnocchis poêlés, butternut, sauge & noix",
    saisons: ["automne"], proteine: "vegetarien", temps: 25,
    ingredients: [[150, "g", "gnocchis"], [200, "g", "butternut"], [25, "g", "parmesan"], [15, "g", "noix"],
      [60, "g", "roquette"], [0, "", "sauge"], [0, "", "beurre"]],
    etapes: ["Couper la butternut en petits cubes, la cuire 12 min à la poêle avec un peu d'huile, à couvert.",
      "Ajouter les gnocchis et une noisette de beurre, faire dorer 6 min.",
      "Ajouter quelques feuilles de sauge et les noix 1 min.",
      "Servir avec le parmesan et la roquette."]
  },
  {
    nom: "Tofu sauté aux champignons, brocoli & riz",
    saisons: ["automne", "hiver"], proteine: "vegetarien", temps: 25,
    ingredients: [[120, "g", "tofu ferme"], [100, "g", "champignons de Paris"], [150, "g", "brocoli"],
      [70, "g", "riz"], [1, "gousse", "ail"], [0, "", "gingembre"], [0, "", "sauce soja"],
      [0, "", "graines de sésame"], [0, "", "fécule de maïs"]],
    etapes: ["Cuire le riz. Couper le tofu en dés, l'enrober d'1 c. à café de fécule.",
      "Dorer le tofu 6 min à feu vif, réserver.",
      "Sauter brocoli en petits bouquets et champignons avec ail et gingembre 6 min.",
      "Remettre le tofu, 2 c. à soupe de sauce soja, parsemer de sésame."]
  },
  {
    nom: "Soupe de pois cassés, carottes & croûtons", batch: true,
    saisons: ["automne", "hiver"], proteine: "vegetarien", temps: 50,
    ingredients: [[70, "g", "pois cassés"], [100, "g", "carotte"], [0.5, "", "oignon"], [0.5, "", "poireau"],
      [2, "tranche", "pain de campagne"], [20, "ml", "crème fraîche"], [0, "", "bouillon cube"],
      [0, "", "thym & laurier"]],
    etapes: ["Rincer les pois cassés. Émincer oignon, poireau et carottes.",
      "Faire revenir les légumes, ajouter pois cassés, thym, laurier, bouillon et 4 fois leur volume d'eau.",
      "Cuire 40 min à couvert (sans surveiller), puis mixer avec la crème.",
      "Servir avec le pain grillé coupé en croûtons."]
  },
  {
    nom: "Burger végé aux haricots rouges & frites de patate douce",
    saisons: ["automne", "hiver"], proteine: "vegetarien", temps: 40, plaisir: true,
    ingredients: [[1, "", "pain à burger"], [100, "g", "haricots rouges (bocal)"], [20, "g", "chapelure"],
      [200, "g", "patate douce"], [1, "", "œuf"], [20, "g", "emmental râpé"], [20, "g", "salade verte"],
      [0.5, "", "tomate"], [0, "", "cumin"], [0, "", "paprika"], [0, "", "huile d'olive"]],
    etapes: ["Préchauffer le four à 220 °C. Couper la patate douce en frites, huile + paprika, enfourner 25 min.",
      "Écraser les haricots à la fourchette avec l'œuf, la chapelure, le cumin, sel, poivre.",
      "Former des galettes, les dorer 4 min de chaque côté, ajouter le fromage à la fin.",
      "Monter les burgers avec salade et tomate."]
  },
  {
    nom: "Lentilles vertes, carottes rôties au cumin & feta", batch: true,
    saisons: ["automne", "hiver"], proteine: "vegetarien", temps: 30,
    ingredients: [[70, "g", "lentilles vertes"], [200, "g", "carotte"], [40, "g", "feta"], [0.25, "", "oignon rouge"],
      [0, "", "persil"], [0, "", "cumin"], [0, "", "huile d'olive"], [0, "", "vinaigre"]],
    etapes: ["Cuire les lentilles 20 min dans l'eau non salée.",
      "Couper les carottes en bâtonnets, les rôtir 25 min à 200 °C avec huile et cumin.",
      "Mélanger lentilles, oignon rouge émincé, huile et vinaigre.",
      "Servir avec les carottes, la feta émiettée et le persil."]
  },
  {
    nom: "Polenta crémeuse, champignons & œuf poché",
    saisons: ["automne"], proteine: "vegetarien", temps: 25,
    ingredients: [[60, "g", "polenta"], [200, "g", "champignons de Paris"], [1, "", "œuf"], [25, "g", "parmesan"],
      [200, "ml", "lait"], [1, "gousse", "ail"], [60, "g", "salade verte"], [0, "", "persil"], [0, "", "beurre"]],
    etapes: ["Porter le lait + autant d'eau à frémissement, verser la polenta en pluie, cuire 5 min en remuant, ajouter le parmesan.",
      "Poêler les champignons émincés avec l'ail 8 min, ajouter le persil.",
      "Pocher les œufs 3 min dans l'eau frémissante vinaigrée.",
      "Servir polenta, champignons, œuf par-dessus et salade à côté."]
  },
  {
    nom: "Couscous végétarien aux pois chiches", batch: true,
    saisons: ["automne", "hiver"], proteine: "vegetarien", temps: 50,
    ingredients: [[70, "g", "semoule"], [120, "g", "pois chiches (bocal)"], [150, "g", "carotte"], [100, "g", "navet"],
      [0.5, "", "courgette"], [0.5, "", "oignon"], [100, "g", "tomates concassées (boîte)"],
      [0, "", "ras el hanout"], [0, "", "huile d'olive"]],
    etapes: ["Faire revenir l'oignon avec 1 c. à soupe de ras el hanout.",
      "Ajouter carottes et navets en gros morceaux, les tomates et 1 litre d'eau (pour 2). Cuire 25 min.",
      "Ajouter la courgette et les pois chiches, cuire encore 15 min.",
      "Préparer la semoule (eau bouillante, 5 min) et servir avec le bouillon de légumes."]
  },
  {
    nom: "Velouté de champignons & tartines houmous-œuf",
    saisons: ["automne"], proteine: "vegetarien", temps: 25,
    ingredients: [[250, "g", "champignons de Paris"], [100, "g", "pommes de terre"], [0.5, "", "oignon"],
      [20, "ml", "crème fraîche"], [2, "tranche", "pain de campagne"], [40, "g", "houmous"], [1, "", "œuf"],
      [0, "", "bouillon cube"]],
    etapes: ["Faire revenir oignon et champignons émincés 5 min, ajouter pommes de terre en dés.",
      "Couvrir d'eau + bouillon, cuire 15 min, mixer avec la crème.",
      "Cuire les œufs durs (10 min), les trancher.",
      "Tartiner le pain grillé de houmous, poser l'œuf dessus."]
  },
  {
    nom: "Gratin de macaronis au brocoli & fromage",
    saisons: ["automne", "hiver"], proteine: "vegetarien", temps: 40, plaisir: true,
    ingredients: [[80, "g", "pâtes"], [200, "g", "brocoli"], [150, "ml", "lait"], [40, "g", "emmental râpé"],
      [0, "", "farine"], [0, "", "beurre"], [0, "", "muscade"]],
    etapes: ["Cuire les pâtes avec les bouquets de brocoli 2 min de moins que sur le paquet.",
      "Béchamel : 20 g de beurre + 20 g de farine, puis le lait en fouettant, muscade.",
      "Mélanger pâtes, brocoli, béchamel et la moitié du fromage dans un plat, parsemer du reste.",
      "Gratiner 20 min à 200 °C."]
  },
  {
    nom: "Patate douce rôtie, haricots noirs & yaourt citron vert",
    saisons: ["automne", "hiver"], proteine: "vegetarien", temps: 35,
    ingredients: [[250, "g", "patate douce"], [120, "g", "haricots noirs (bocal)"], [80, "g", "yaourt nature"],
      [0.5, "", "citron vert"], [0.5, "", "avocat"], [0, "", "coriandre"], [0, "", "paprika"], [0, "", "huile d'olive"]],
    etapes: ["Couper la patate douce en deux dans la longueur, huile + paprika, rôtir 30 min à 200 °C.",
      "Réchauffer les haricots noirs rincés avec un peu de cumin ou de paprika.",
      "Mélanger yaourt, jus de citron vert, sel.",
      "Garnir la patate douce de haricots, avocat en dés, yaourt et coriandre."]
  },

  // ---------------------------------------------------------- HIVER (végé)
  {
    nom: "Parmentier de lentilles & purée de potimarron", batch: true,
    saisons: ["hiver", "automne"], proteine: "vegetarien", temps: 50,
    ingredients: [[70, "g", "lentilles vertes"], [100, "g", "carotte"], [0.5, "", "oignon"], [200, "g", "potimarron"],
      [150, "g", "pommes de terre"], [30, "g", "emmental râpé"], [100, "g", "tomates concassées (boîte)"],
      [0, "", "thym & laurier"], [0, "", "beurre"]],
    etapes: ["Cuire les lentilles 20 min avec carotte en dés, oignon et thym. Égoutter, ajouter les tomates.",
      "En même temps, cuire potimarron et pommes de terre 20 min à l'eau, écraser en purée avec du beurre.",
      "Dans un plat : lentilles, puis purée, puis fromage.",
      "Gratiner 20 min à 200 °C."]
  },
  {
    nom: "Poêlée de choux de Bruxelles, pommes de terre & œufs au plat",
    saisons: ["hiver"], proteine: "vegetarien", temps: 30,
    ingredients: [[200, "g", "choux de Bruxelles"], [200, "g", "pommes de terre"], [2, "", "œuf"],
      [0.5, "", "oignon"], [20, "g", "parmesan"], [0, "", "huile d'olive"], [0, "", "sel & poivre"]],
    etapes: ["Couper pommes de terre et choux en deux, les précuire 8 min à l'eau bouillante.",
      "Les faire dorer 12 min à la poêle avec l'oignon émincé.",
      "Faire des puits, casser les œufs, couvrir 4 min. Parsemer de parmesan."]
  },
  {
    nom: "Tartiflette végétarienne aux champignons",
    saisons: ["hiver"], proteine: "vegetarien", temps: 50, plaisir: true,
    ingredients: [[300, "g", "pommes de terre"], [150, "g", "champignons de Paris"], [0.5, "", "oignon"],
      [0.25, "", "reblochon"], [60, "g", "salade verte"], [0, "", "vin blanc"]],
    etapes: ["Cuire les pommes de terre 15 min, les couper en rondelles.",
      "Faire revenir oignon et champignons émincés, déglacer d'un trait de vin blanc.",
      "Mélanger dans un plat, poser le reblochon coupé dans l'épaisseur.",
      "Cuire 25 min à 200 °C. Servir avec une grande salade."]
  },
  {
    nom: "Chili de haricots noirs & patate douce", batch: true,
    saisons: ["hiver", "automne"], proteine: "vegetarien", temps: 35,
    ingredients: [[120, "g", "haricots noirs (bocal)"], [150, "g", "patate douce"], [0.5, "", "oignon"],
      [150, "g", "tomates concassées (boîte)"], [60, "g", "riz"], [40, "g", "yaourt nature"],
      [0, "", "cumin"], [0, "", "paprika"], [0, "", "huile d'olive"]],
    etapes: ["Faire revenir l'oignon avec cumin et paprika.",
      "Ajouter la patate douce en petits dés, les tomates et un demi-verre d'eau. Cuire 15 min.",
      "Ajouter les haricots rincés, 10 min encore. Cuire le riz en parallèle.",
      "Servir avec une cuillère de yaourt."]
  },
  {
    nom: "Risotto d'orge perlé aux poireaux & parmesan",
    saisons: ["hiver"], proteine: "vegetarien", temps: 40,
    ingredients: [[80, "g", "orge perlé"], [1, "", "poireau"], [30, "g", "parmesan"], [60, "g", "petits pois surgelés"],
      [0, "", "bouillon cube"], [0, "", "vin blanc"], [0, "", "beurre"]],
    etapes: ["Faire fondre le poireau émincé au beurre 5 min.",
      "Ajouter l'orge, un trait de vin blanc, puis le bouillon chaud petit à petit (30 min, en remuant de temps en temps).",
      "Ajouter les petits pois 5 min avant la fin.",
      "Hors du feu, incorporer le parmesan."]
  },
  {
    nom: "Œufs cocotte aux poireaux & mouillettes",
    saisons: ["hiver", "automne"], proteine: "vegetarien", temps: 25,
    ingredients: [[2, "", "œuf"], [1, "", "poireau"], [30, "ml", "crème fraîche"], [20, "g", "emmental râpé"],
      [2, "tranche", "pain de campagne"], [60, "g", "mâche"], [0, "", "beurre"]],
    etapes: ["Préchauffer le four à 180 °C. Faire fondre le poireau émincé au beurre 10 min.",
      "Répartir dans des ramequins, casser les œufs dessus, ajouter crème et fromage.",
      "Cuire 10–12 min au bain-marie dans le four (le jaune doit rester coulant).",
      "Servir avec le pain grillé en mouillettes et la mâche."]
  },
  {
    nom: "Salade d'hiver : mâche, betterave, pois chiches rôtis & chèvre",
    saisons: ["hiver"], proteine: "vegetarien", temps: 25,
    ingredients: [[60, "g", "mâche"], [1, "", "betterave cuite"], [120, "g", "pois chiches (bocal)"],
      [40, "g", "fromage de chèvre"], [15, "g", "noix"], [1, "tranche", "pain de campagne"],
      [0, "", "cumin"], [0, "", "huile d'olive"], [0, "", "vinaigre"], [0, "", "moutarde"]],
    etapes: ["Égoutter et sécher les pois chiches, les rôtir 20 min à 200 °C avec huile et cumin.",
      "Couper la betterave en dés.",
      "Assembler mâche, betterave, pois chiches, chèvre et noix, arroser de vinaigrette moutardée."]
  },
  {
    nom: "Minestrone d'hiver aux haricots blancs", batch: true,
    saisons: ["hiver"], proteine: "vegetarien", temps: 35,
    ingredients: [[120, "g", "haricots blancs (bocal)"], [100, "g", "carotte"], [0.5, "", "poireau"],
      [100, "g", "chou vert"], [40, "g", "pâtes"], [100, "g", "tomates concassées (boîte)"], [20, "g", "parmesan"],
      [0, "", "bouillon cube"], [0, "", "huile d'olive"]],
    etapes: ["Faire revenir carottes et poireau en dés 5 min.",
      "Ajouter chou émincé, tomates, bouillon et eau (1 litre pour 2). Cuire 15 min.",
      "Ajouter les petites pâtes et les haricots, cuire 10 min.",
      "Servir avec le parmesan râpé."]
  },
  {
    nom: "Gratin d'endives au chèvre & noix",
    saisons: ["hiver"], proteine: "vegetarien", temps: 40,
    ingredients: [[2, "", "endive"], [50, "g", "fromage de chèvre"], [1, "", "œuf"], [50, "ml", "crème fraîche"],
      [15, "g", "noix"], [150, "g", "pommes de terre"], [0, "", "beurre"]],
    etapes: ["Couper les endives en deux, les poêler 10 min au beurre à couvert. Cuire les pommes de terre à la vapeur.",
      "Les disposer dans un plat avec le chèvre en rondelles et les noix.",
      "Battre œuf + crème, verser par-dessus.",
      "Gratiner 20 min à 200 °C."]
  },
  {
    nom: "Curry de tofu, chou-fleur & épinards", batch: true,
    saisons: ["hiver", "automne"], proteine: "vegetarien", temps: 30,
    ingredients: [[120, "g", "tofu ferme"], [200, "g", "chou-fleur"], [80, "g", "épinards surgelés"],
      [100, "ml", "lait de coco"], [60, "g", "riz"], [0.5, "", "oignon"], [0, "", "curry en poudre"],
      [0, "", "huile d'olive"]],
    etapes: ["Dorer le tofu en dés, réserver.",
      "Faire revenir l'oignon avec le curry, ajouter chou-fleur en petits bouquets et lait de coco. Couvrir 12 min.",
      "Ajouter épinards et tofu, 5 min encore. Servir avec le riz."]
  },

  // ---------------------------------------------------------- PRINTEMPS (végé)
  {
    nom: "Tarte fine aux asperges & ricotta",
    saisons: ["printemps"], proteine: "vegetarien", temps: 35,
    ingredients: [[0.33, "", "pâte feuilletée"], [200, "g", "asperges vertes"], [70, "g", "ricotta"], [1, "", "œuf"],
      [15, "g", "parmesan"], [60, "g", "salade verte"], [0.25, "", "citron"], [0, "", "huile d'olive"]],
    etapes: ["Préchauffer le four à 200 °C. Mélanger ricotta, œuf, parmesan, zeste de citron.",
      "Étaler sur la pâte en laissant un bord, poser les asperges, un filet d'huile.",
      "Cuire 25 min. Servir avec la salade."]
  },
  {
    nom: "Curry vert de légumes de printemps & tofu", batch: true,
    saisons: ["printemps"], proteine: "vegetarien", temps: 25,
    ingredients: [[120, "g", "tofu ferme"], [100, "g", "asperges vertes"], [80, "g", "petits pois frais"],
      [80, "g", "épinards frais"], [120, "ml", "lait de coco"], [60, "g", "riz"], [0, "", "pâte de curry vert"],
      [0, "", "citron vert"], [0, "", "coriandre"]],
    etapes: ["Cuire le riz. Faire revenir 1 c. à café de pâte de curry, ajouter le lait de coco.",
      "Ajouter tofu en dés, asperges en tronçons et petits pois. Cuire 8 min.",
      "Ajouter les épinards 2 min. Finir avec citron vert et coriandre."]
  },
  {
    nom: "Salade de lentilles, radis, oignon nouveau & œuf", batch: true,
    saisons: ["printemps"], proteine: "vegetarien", temps: 25,
    ingredients: [[70, "g", "lentilles vertes"], [5, "", "radis"], [1, "", "oignon nouveau"], [1, "", "œuf"],
      [100, "g", "carottes nouvelles"], [50, "g", "salade verte"], [0, "", "ciboulette"], [0, "", "moutarde"],
      [0, "", "vinaigre"], [0, "", "huile d'olive"]],
    etapes: ["Cuire les lentilles 20 min et les œufs durs 10 min.",
      "Émincer radis et oignon nouveau, râper les carottes, ciseler la ciboulette.",
      "Mélanger le tout avec une vinaigrette moutardée, servir sur la salade avec l'œuf en quartiers."]
  },
  {
    nom: "Pâtes aux fèves, petits pois & ricotta citronnée",
    saisons: ["printemps"], proteine: "vegetarien", temps: 20,
    ingredients: [[90, "g", "pâtes"], [100, "g", "fèves"], [80, "g", "petits pois frais"], [60, "g", "ricotta"],
      [15, "g", "parmesan"], [0.25, "", "citron"], [0, "", "menthe"], [0, "", "huile d'olive"]],
    etapes: ["Cuire les pâtes, ajouter fèves et petits pois 4 min avant la fin.",
      "Mélanger ricotta, zeste et jus de citron, parmesan.",
      "Égoutter en gardant un peu d'eau, mélanger avec la ricotta, ajouter la menthe."]
  },
  {
    nom: "Chakchouka verte (épinards, poireau & œufs)",
    saisons: ["printemps", "hiver"], proteine: "vegetarien", temps: 25,
    ingredients: [[200, "g", "épinards frais"], [0.5, "", "poireau"], [2, "", "œuf"], [30, "g", "feta"],
      [1, "tranche", "pain de campagne"], [1, "gousse", "ail"], [0, "", "cumin"], [0, "", "huile d'olive"]],
    etapes: ["Faire fondre poireau émincé et ail 8 min, ajouter le cumin.",
      "Ajouter les épinards, laisser tomber 3 min.",
      "Faire des puits, casser les œufs, couvrir 5 min. Parsemer de feta, servir avec le pain."]
  },
  {
    nom: "Bowl de quinoa, pois chiches & carottes nouvelles rôties", batch: true,
    saisons: ["printemps"], proteine: "vegetarien", temps: 30,
    ingredients: [[60, "g", "quinoa"], [120, "g", "pois chiches (bocal)"], [200, "g", "carottes nouvelles"],
      [60, "g", "yaourt nature"], [40, "g", "épinards frais"], [0, "", "tahini"], [0, "", "citron"],
      [0, "", "cumin"], [0, "", "huile d'olive"]],
    etapes: ["Rôtir carottes et pois chiches 25 min à 200 °C avec huile et cumin.",
      "Cuire le quinoa 12 min.",
      "Sauce : yaourt + 1 c. à café de tahini + citron.",
      "Assembler dans des bols sur les jeunes pousses d'épinards."]
  },
  {
    nom: "Omelette aux herbes, pommes de terre nouvelles & salade",
    saisons: ["printemps", "ete"], proteine: "vegetarien", temps: 20,
    ingredients: [[3, "", "œuf"], [200, "g", "pommes de terre nouvelles"], [60, "g", "salade verte"],
      [20, "g", "fromage de chèvre"], [0, "", "ciboulette"], [0, "", "persil"], [0, "", "beurre"]],
    etapes: ["Cuire les pommes de terre 15 min à l'eau, puis les dorer à la poêle.",
      "Battre les œufs avec les herbes ciselées, cuire l'omelette baveuse, ajouter le chèvre.",
      "Servir avec les pommes de terre et la salade."]
  },
  {
    nom: "Gnocchis aux épinards, petits pois & citron",
    saisons: ["printemps"], proteine: "vegetarien", temps: 20,
    ingredients: [[150, "g", "gnocchis"], [100, "g", "épinards frais"], [80, "g", "petits pois frais"],
      [30, "ml", "crème fraîche"], [25, "g", "parmesan"], [0.25, "", "citron"], [0, "", "beurre"]],
    etapes: ["Cuire les petits pois 5 min à l'eau.",
      "Dorer les gnocchis au beurre 6 min.",
      "Ajouter épinards, petits pois, crème et zeste de citron, 2 min.",
      "Servir avec le parmesan."]
  },
  {
    nom: "Velouté de petits pois à la menthe & tartines chèvre-radis",
    saisons: ["printemps"], proteine: "vegetarien", temps: 25,
    ingredients: [[200, "g", "petits pois frais"], [100, "g", "pommes de terre nouvelles"], [1, "", "oignon nouveau"],
      [2, "tranche", "pain de campagne"], [50, "g", "fromage de chèvre"], [3, "", "radis"], [0, "", "menthe"],
      [0, "", "bouillon cube"]],
    etapes: ["Faire revenir l'oignon, ajouter pommes de terre en dés et petits pois.",
      "Couvrir d'eau + bouillon, cuire 15 min, mixer avec la menthe.",
      "Tartiner le pain de chèvre frais, ajouter les radis en fines rondelles."]
  },
  {
    nom: "Wok de tofu, asperges & nouilles",
    saisons: ["printemps"], proteine: "vegetarien", temps: 25,
    ingredients: [[120, "g", "tofu fumé"], [70, "g", "nouilles chinoises"], [150, "g", "asperges vertes"],
      [100, "g", "carottes nouvelles"], [1, "", "oignon nouveau"], [0, "", "gingembre"], [0, "", "sauce soja"],
      [0, "", "graines de sésame"]],
    etapes: ["Cuire les nouilles selon le paquet.",
      "Saisir le tofu en dés 5 min, réserver.",
      "Sauter asperges en tronçons, carottes en fins bâtonnets, oignon et gingembre 6 min.",
      "Ajouter nouilles, tofu, sauce soja et sésame, mélanger 1 min."]
  },
  {
    nom: "Galettes de sarrasin aux asperges, œuf & fromage",
    saisons: ["printemps"], proteine: "vegetarien", temps: 20,
    ingredients: [[2, "", "galettes de sarrasin"], [2, "", "œuf"], [150, "g", "asperges vertes"],
      [30, "g", "emmental râpé"], [50, "g", "salade verte"], [0, "", "beurre"]],
    etapes: ["Poêler les asperges en tronçons 6 min.",
      "Chauffer une galette beurrée, casser un œuf au centre, ajouter fromage et asperges autour.",
      "Replier les bords quand le blanc est cuit. Servir avec la salade."]
  },

  // ---------------------------------------------------------- ÉTÉ (végé)
  {
    nom: "Buddha bowl : quinoa, pois chiches, concombre, tomate & feta", batch: true,
    saisons: ["ete"], proteine: "vegetarien", temps: 20,
    ingredients: [[60, "g", "quinoa"], [120, "g", "pois chiches (bocal)"], [0.5, "", "concombre"], [1, "", "tomate"],
      [40, "g", "feta"], [0.5, "", "avocat"], [0, "", "menthe"], [0, "", "citron"], [0, "", "huile d'olive"]],
    etapes: ["Cuire le quinoa 12 min, le rafraîchir.",
      "Couper concombre, tomate et avocat en dés.",
      "Assembler avec les pois chiches rincés, la feta, la menthe, citron et huile d'olive."]
  },
  {
    nom: "Tian de légumes provençal & semoule aux pois chiches", batch: true,
    saisons: ["ete"], proteine: "vegetarien", temps: 55,
    ingredients: [[1, "", "courgette"], [0.5, "", "aubergine"], [2, "", "tomate"], [0.5, "", "oignon"],
      [60, "g", "semoule"], [100, "g", "pois chiches (bocal)"], [20, "g", "parmesan"],
      [0, "", "herbes de Provence"], [0, "", "huile d'olive"]],
    etapes: ["Préchauffer le four à 190 °C. Couper tous les légumes en fines rondelles.",
      "Les disposer en alternance debout dans un plat sur l'oignon émincé, huile et herbes.",
      "Cuire 45 min, parsemer de parmesan les 10 dernières minutes.",
      "Servir avec la semoule mélangée aux pois chiches."]
  },
  {
    nom: "Halloumi grillé, boulgour, tomates & concombre",
    saisons: ["ete"], proteine: "vegetarien", temps: 20,
    ingredients: [[80, "g", "halloumi"], [60, "g", "boulgour"], [1, "", "tomate"], [0.5, "", "concombre"],
      [0.25, "", "oignon rouge"], [0, "", "menthe"], [0, "", "citron"], [0, "", "huile d'olive"]],
    etapes: ["Cuire le boulgour 10 min.",
      "Couper tomate, concombre et oignon rouge en dés, mélanger au boulgour avec menthe, citron, huile.",
      "Griller le halloumi en tranches 2 min de chaque côté à la poêle sèche."]
  },
  {
    nom: "Gaspacho & tartines houmous, œuf dur",
    saisons: ["ete"], proteine: "vegetarien", temps: 20,
    ingredients: [[3, "", "tomate"], [0.5, "", "concombre"], [0.5, "", "poivron"], [1, "gousse", "ail"],
      [2, "tranche", "pain de campagne"], [50, "g", "houmous"], [1, "", "œuf"], [0, "", "huile d'olive"],
      [0, "", "vinaigre"]],
    etapes: ["Mixer tomates, concombre, poivron, ail avec huile, vinaigre, sel. Mettre au frais.",
      "Cuire les œufs durs 10 min.",
      "Tartiner le pain de houmous, poser l'œuf en rondelles."]
  },
  {
    nom: "Lasagnes de courgettes à la ricotta", batch: true,
    saisons: ["ete"], proteine: "vegetarien", temps: 55,
    ingredients: [[1.5, "", "courgette"], [80, "g", "ricotta"], [60, "g", "feuilles de lasagne"],
      [150, "g", "tomates concassées (boîte)"], [40, "g", "mozzarella"], [20, "g", "parmesan"],
      [0, "", "basilic"], [0, "", "huile d'olive"]],
    etapes: ["Préchauffer le four à 190 °C. Couper les courgettes en fines tranches, les poêler 5 min.",
      "Mélanger ricotta, parmesan, basilic.",
      "Alterner dans un plat : tomates, lasagnes, courgettes, ricotta. Finir par tomates et mozzarella.",
      "Cuire 35 min."]
  },
  {
    nom: "Curry de pois chiches, aubergine & tomates", batch: true,
    saisons: ["ete"], proteine: "vegetarien", temps: 30,
    ingredients: [[120, "g", "pois chiches (bocal)"], [0.5, "", "aubergine"], [2, "", "tomate"], [0.5, "", "oignon"],
      [60, "ml", "lait de coco"], [60, "g", "riz"], [0, "", "garam masala"], [0, "", "coriandre"], [0, "", "huile d'olive"]],
    etapes: ["Cuire le riz. Faire revenir oignon et aubergine en dés 8 min avec le garam masala.",
      "Ajouter tomates en dés et lait de coco, cuire 10 min.",
      "Ajouter les pois chiches 5 min, finir avec la coriandre."]
  },
  {
    nom: "Tortilla espagnole aux poivrons & salade de tomates",
    saisons: ["ete"], proteine: "vegetarien", temps: 40,
    ingredients: [[3, "", "œuf"], [200, "g", "pommes de terre"], [0.5, "", "poivron"], [0.5, "", "oignon"],
      [1, "", "tomate"], [0, "", "basilic"], [0, "", "huile d'olive"]],
    etapes: ["Couper pommes de terre en fines lamelles, les cuire 15 min à la poêle avec oignon et poivron.",
      "Battre les œufs, y verser les légumes, remettre dans la poêle.",
      "Cuire 8 min à feu doux à couvert, retourner à l'aide d'une assiette, 3 min encore.",
      "Servir avec les tomates en tranches et le basilic."]
  },
  {
    nom: "Salade de haricots blancs, tomates, roquette & mozzarella",
    saisons: ["ete"], proteine: "vegetarien", temps: 15,
    ingredients: [[120, "g", "haricots blancs (bocal)"], [1, "", "tomate"], [50, "g", "roquette"], [60, "g", "mozzarella"],
      [0.25, "", "oignon rouge"], [1, "tranche", "pain de campagne"], [0, "", "basilic"], [0, "", "huile d'olive"],
      [0, "", "vinaigre"]],
    etapes: ["Rincer les haricots. Couper tomates et mozzarella en morceaux, émincer l'oignon.",
      "Mélanger le tout avec la roquette, le basilic, huile et vinaigre.",
      "Servir avec le pain grillé."]
  },
  {
    nom: "Poivrons farcis au riz, lentilles & feta", batch: true,
    saisons: ["ete"], proteine: "vegetarien", temps: 50,
    ingredients: [[1, "", "poivron"], [40, "g", "riz"], [40, "g", "lentilles corail"], [40, "g", "feta"],
      [100, "g", "tomates concassées (boîte)"], [0, "", "herbes de Provence"], [0, "", "huile d'olive"]],
    etapes: ["Préchauffer le four à 190 °C. Cuire riz et lentilles ensemble 12 min.",
      "Mélanger avec la moitié des tomates, la feta émiettée et les herbes.",
      "Couper le haut des poivrons, les vider, les farcir. Mettre le reste de tomates dans le plat.",
      "Cuire 35 min."]
  },
  {
    nom: "Pâtes au pesto, haricots verts & pommes de terre",
    saisons: ["ete"], proteine: "vegetarien", temps: 25,
    ingredients: [[80, "g", "pâtes"], [100, "g", "haricots verts"], [100, "g", "pommes de terre"], [30, "g", "pesto"],
      [20, "g", "parmesan"], [15, "g", "pignons de pin"]],
    etapes: ["Cuire les pommes de terre en petits dés 5 min, ajouter pâtes et haricots verts coupés dans la même eau.",
      "Égoutter en gardant un peu d'eau de cuisson.",
      "Mélanger avec le pesto, le parmesan et les pignons grillés."]
  },
  {
    nom: "Bowl de tofu grillé, maïs, courgette & riz",
    saisons: ["ete"], proteine: "vegetarien", temps: 25,
    ingredients: [[120, "g", "tofu ferme"], [60, "g", "riz"], [1, "", "courgette"], [60, "g", "maïs (boîte)"],
      [0.5, "", "avocat"], [0, "", "sauce soja"], [0, "", "citron vert"], [0, "", "graines de sésame"]],
    etapes: ["Cuire le riz. Couper le tofu en tranches, le mariner 5 min dans la sauce soja.",
      "Griller le tofu et la courgette en rondelles 4 min de chaque côté.",
      "Assembler riz, tofu, courgette, maïs, avocat, citron vert et sésame."]
  },
  {
    nom: "Quesadillas aux haricots rouges, maïs & poivron",
    saisons: ["ete", "automne"], proteine: "vegetarien", temps: 20,
    ingredients: [[2, "", "tortillas"], [100, "g", "haricots rouges (bocal)"], [40, "g", "maïs (boîte)"],
      [0.5, "", "poivron"], [40, "g", "emmental râpé"], [60, "g", "salade verte"], [0, "", "cumin"]],
    etapes: ["Écraser grossièrement les haricots avec le cumin, ajouter maïs et poivron en petits dés.",
      "Étaler sur une tortilla, parsemer de fromage, couvrir d'une autre tortilla.",
      "Dorer 3 min de chaque côté à la poêle. Couper en parts, servir avec la salade."]
  },

  // ---------------------------------------------------------- TOUTE L'ANNÉE (végé)
  {
    nom: "Pasta e ceci (pâtes aux pois chiches & épinards)", batch: true,
    saisons: TOUTES, proteine: "vegetarien", temps: 25,
    ingredients: [[70, "g", "pâtes"], [120, "g", "pois chiches (bocal)"], [100, "g", "épinards surgelés"],
      [100, "g", "tomates concassées (boîte)"], [1, "gousse", "ail"], [20, "g", "parmesan"],
      [0, "", "bouillon cube"], [0, "", "huile d'olive"]],
    etapes: ["Faire revenir l'ail, ajouter tomates, pois chiches et 2 verres de bouillon.",
      "Écraser un tiers des pois chiches pour épaissir, ajouter les petites pâtes.",
      "Cuire 10 min en ajoutant un peu d'eau si besoin, ajouter les épinards à la fin.",
      "Servir avec le parmesan et un filet d'huile."]
  },
  {
    nom: "Nouilles sautées au tofu, chou rouge & noix de cajou",
    saisons: ["automne", "hiver"], proteine: "vegetarien", temps: 25,
    ingredients: [[70, "g", "nouilles chinoises"], [120, "g", "tofu fumé"], [150, "g", "chou rouge"],
      [100, "g", "carotte"], [15, "g", "noix de cajou"], [0, "", "gingembre"], [0, "", "sauce soja"],
      [0, "", "citron vert"]],
    etapes: ["Cuire les nouilles selon le paquet.",
      "Dorer le tofu en dés 5 min, réserver.",
      "Sauter le chou émincé et les carottes râpées 5 min avec le gingembre.",
      "Ajouter nouilles, tofu, sauce soja, citron vert, parsemer de noix de cajou concassées."]
  }
];
