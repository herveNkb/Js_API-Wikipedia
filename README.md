# Coder une recherche Wikipédia

### Fonctionnalités JavaScript

1. Gestion de l'entrée de la recherche grâce au formulaire et à l'input.
2. Utilisation l'API de Wikipédia afin d'obtenir les résultats de cette recherche.<br>
  

Endpoint(URL) :

https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}

3. Utilisation de l'api à l'aide de la méthode fetch() en y incluant le contenu de la recherche, ici : ${searchInput}.

4. Ajout d'un "loader" pendant le chargement.
5. Affichage des résultats en dessous de l'input.
6. Possibilité d'effectuer autant de recherches que l'on souhaite.
7. Gestion des erreurs possibles avec la méthode fetch()


Projet initial créé et suivi par [Enzo Ustariz](https://www.ecole-du-web.net/) et réalisé par moi-même : [AirV](https://github.com/herveNkb) 