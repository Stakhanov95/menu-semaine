# Menu de la semaine

Petit logiciel pour planifier les repas de la semaine et obtenir la liste de courses.

## Ouvrir le logiciel

- **Site web du foyer** : https://stakhanov95.github.io/menu-semaine/
  Le bouton **👪 Partager avec le foyer** donne un lien secret (et un QR code) : toute personne qui l'ouvre voit le menu et coche la liste de courses en direct, **sans compte**, et peut installer l'appli sur l'écran d'accueil de son téléphone (menu du navigateur → *Ajouter à l'écran d'accueil*). La liste reste utilisable sans réseau au magasin. Gardez ce lien pour le foyer : toute personne qui l'a peut voir et modifier la liste.
- **En local** : double-cliquez sur **`index.html`**. Tout reste alors dans le navigateur de cet ordinateur, sans partage.
- Une ancienne version existe aussi sur claude.ai (réservée aux comptes Claude), avec sa propre base : https://claude.ai/artifact/FetKMCwcYR44J5jHn6e2N7

Mise en ligne et mises à jour du site : voir **[GUIDE-MISE-EN-LIGNE.md](GUIDE-MISE-EN-LIGNE.md)**.

## Ce qu'il fait

- **Génère un menu** pour la semaine avec des recettes **de saison** (la saison est détectée selon la date).
- **Les vraies dates** : la semaine prévue commence le lundi (celui de la semaine en cours si vous préparez du lundi au jeudi, le suivant si vous préparez en fin de semaine). Le jour même est signalé « Aujourd'hui ».
- **Équilibre** les protéines : ~2 à 4 repas de poisson, viande rouge limitée, beaucoup de repas végétariens, des légumes à chaque repas. Au maximum 1 plat « plaisir » (gratin, burger, pizza…), et seulement le week-end.
- **De la variété** : les plats des 2 dernières semaines de l'historique ne sont pas reproposés, tant que la règle d'équilibre et le temps en semaine le permettent.
- **Recettes simples** : en semaine (lundi–jeudi), uniquement des recettes de 30 min max (réglable). Les plats plus longs (mijotés) tombent le week-end.
- **🔄** sur un repas : propose une autre recette du même type.
- **Cliquer sur le nom** d'un plat : affiche la recette avec les quantités pour votre nombre de personnes.
- **Liste de courses** regroupée par rayon, avec cases à cocher, compteur d'articles restants et option *Masquer les articles cochés*. Le bouton « Copier » la met dans le presse-papiers.
- **📝 Autres articles** : en haut de la liste de courses, ajoutez ce qui n'est pas dans les recettes (lait, pain, café…, plusieurs à la fois séparés par des virgules). Ils sont partagés avec le foyer ; à la nouvelle semaine, ceux déjà achetés disparaissent et les autres restent.
- **Sur téléphone**, deux onglets en bas de l'écran : **📅 Menu** et **🛒 Courses** (avec le nombre d'articles restant à acheter).
- **Imprimer** : imprime le menu, la liste de courses et toutes les recettes de la semaine.
- **Réglages** : nombre de personnes, repas à prévoir (déjeuner/dîner pour chaque jour), régime alimentaire, batch cooking…
- La page suit le thème clair ou sombre de l'appareil.

## ↔️ Réorganiser les repas

Chaque repas a une poignée **⠿** à gauche de « Déjeuner » / « Dîner » :
- **Glisser** la poignée sur un autre repas : les deux repas sont **échangés**.
- **Glisser** sur un créneau « non prévu » (pointillés) : le repas y est **déplacé**, le créneau d'arrivée est ajouté à la semaine et celui de départ retiré. Exemple : passer un plat batch du dîner au déjeuner.
- Sur téléphone, on peut aussi **toucher** la poignée d'un repas, puis la poignée d'un autre repas (ou un créneau non prévu).

Les plats batch suivent le déplacement (la numérotation « Batch 1/2, 2/2 » se met à jour), et la liste de courses ne change pas.

## 🧺 Mes ingrédients

Le panneau **🧺 Mes ingrédients** contient trois listes (des suggestions apparaissent pendant la saisie ; plusieurs ingrédients peuvent être séparés par des virgules) :
- **🏠 J'ai déjà à la maison** : les recettes qui les utilisent passent en priorité, chaque ingrédient étant réparti sur des plats différents. Dans la liste de courses, ils sont regroupés en tête sous « Déjà à la maison (vérifier la quantité) ». Chaque plat concerné affiche « 🏠 Utilise : … ».
- **🙅 Pas envie cette semaine** : exclus pendant 7 jours, puis ils reviennent tout seuls.
- **🚫 On n'aime pas** : toujours exclus. On peut écrire un ingrédient (« champignons », « chou » exclut aussi chou-fleur, chou rouge…) ou « poisson » / « viande ».

Le panneau indique combien de recettes restent possibles. Les plats déjà au menu qui contiennent un ingrédient exclu sont signalés « ⚠️ » : cliquez sur 🔄 pour les changer, ou sur **Refaire la semaine avec ces choix**.

## 📚 Historique des semaines

La semaine en cours est enregistrée automatiquement. Quand vous générez une nouvelle semaine, l'ancienne est rangée dans **📚 Mes semaines** (12 dernières semaines, avec leurs dates), d'où vous pouvez la **rouvrir** (elle est alors replanifiée pour la semaine à venir) ou la supprimer. Avec le lien du foyer, l'historique est partagé entre tous vos appareils.

## 🍱 Batch cooking

Dans **Réglages → Batch cooking**, choisissez 1 ou 2 plats à cuisiner le dimanche, pour 2 ou 3 repas chacun. Les plats batch sont placés en semaine (un repas par jour, le soir de préférence) et affichés « 🍱 Batch 1/3, 2/3… ». Un bandeau indique ce qu'il faut cuisiner le dimanche.

Seuls les plats qui se réchauffent bien (currys, chilis, dahl, couscous, gratins de légumineuses…) **et** qui forment un **repas complet** sont proposés : le logiciel vérifie qu'ils contiennent des protéines, des féculents et au moins 150 g de légumes par personne, et l'affiche dans la recette. Les quantités de la recette et de la liste de courses tiennent compte de tous les repas. Conservation : 3 jours au réfrigérateur ; les portions prévues plus tard sont à congeler.

Pour rendre une de vos recettes disponible en batch, ajoutez `batch: true` dans `recettes.js`.

## Mode végétarien

Dans **Réglages → Régime alimentaire**, choisissez **🌱 Végétarien** : le menu est régénéré uniquement avec des plats végétariens (plus de 60 recettes au total). Chaque plat indique sa source de protéines — 🫘 légumineuses (lentilles, pois chiches, haricots, tofu), 🥚 œufs ou 🧀 fromage — et le logiciel évite d'enchaîner deux fois la même source à la suite, avec environ un repas sur deux à base de légumineuses.

## Ajouter vos propres recettes

Ouvrez **`recettes.js`** avec le Bloc-notes, copiez une recette existante à la fin de la liste et modifiez-la. Les instructions sont en haut du fichier. Si un nouvel ingrédient n'est pas dans la liste des rayons, il apparaîtra dans « Divers ».

Le site en ligne ne voit vos modifications qu'une fois le fichier redéposé sur GitHub (voir le guide). Évitez pour l'instant de **renommer** une recette existante : les semaines enregistrées la retrouvent par son nom.
