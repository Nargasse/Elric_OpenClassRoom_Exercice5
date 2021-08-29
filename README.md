# Développement d'une API sécurisé

A l'aide de express et de MangoDB, le but de cette exercice de mon parcours Open Class Room était de créer une API sécurisé recevant les données depuis un Front déjà en place pour les traités et renvoyer correctement les données lors des demandes au serveur.

Après avoir mis en place la configuration du serveur, j'ai travaillé sur les différentes routes en fonction des spécifications fournies par le client.

Deux routines permettent de gérer l'authentification de l'utilisateur. Une première reçois les information d'enregistrement puis sauvegarde dans la base de données un hash correspondant au mot de passe ainsi que le mail de l'utilisateur.
Une seconde fonction permet de récupérer ces informations, on récupère à l'aide du mail la bonne personne et on compare le mot de passe au Hash enregistré pour vérifié qu'il correspond bien.
Les communications avec le serveur sont sécurisés avec Helmet et un token et on renvoie au front l'ID du client ainsi qu'un token unique et temporaire qui permet de renforcer la sécurité de la connexion en limitant les chances d'un vol de session.

Une route permet d'enregistrer une sauce via un formulaire reçu du front. On stock l'utilisateur ayant créer la sauce, les données correspondants à la sauce, ainsi qu'un chemin vers l'image qui a été posté avec. L'image est quant à elle enregistré sur le serveur. Des routines Get permettent ensuite de récupéré ces données.
Les données enregistrés sont préalablement vérifiés et comparés à un modèle standard pour s'assurer que les données correspondent bien à nos attentes. En cas de problème, un message d'erreur est renvoyé au front pour éviter d'éventuels tentative d'injection ou des insertion de mauvaises données qui pourraient plus tard posées problème.

La route PUT demande une vérification supplémentaire, car le front n'envoie pas le même type de donnée selon que l'image est été envoyé ou non. Il faut donc au préalable vérifié le type de données reçues.
La route DELETE se charge non seulement de supprimer les informations liés à la sauce, mais aussi l'image qui y était éventuellement associé.

La dernière route permet de noter les likes reçus par la sauce. On compte le nombre de like et on note qui sont les personnes qui ont déjà likés, ou pas, la sauce, ce qui permet de vérifier qu'une même personne ne puisse pas liké deux fois. Selon le nombre reçu du front, on va soit enlever la personne de la liste des likes, soit la rajouter et mettre à jour le compteur en fonction.
