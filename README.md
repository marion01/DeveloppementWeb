# Binôme
- Marion BERTONI
- Mathilde HENRY

# InstaZZ front
Instazz est une application dont le but est d'imiter le comportement d'Instagram.
Ce repository contient la partie Backend.
Le repository correspondant au Frontend se trouve ici : https://github.com/marion01/DeveloppementWebFront.git

Afin de faire fonctionner l'application, il est nécessaire de lancer les deux parties à l'aide des commandes npm install et npm start.

Le Projet a été déployé sur Heroku :
- l'API se trouve à l'adresse : https://instazz-api.herokuapp.com/api/v1/login
- L'application se trouve elle à l'adresse : https://instazz-app.herokuapp.com/
Il est donc possible d'utiliser l'application directement sur Internet.

Ce projet a été réalisé par une équipe de 2 dans le cadre d'un cours de développement web.
Cours de la matière : https://quentinchap.github.io/f2-2018/react1/#/

## Description

Ce back expose une API permettant au front d'effectuer des action tels que :
- la récupération de post
- l'ajout d'un nouveau post
- l'enregistrement d'une image sur le server
- ...

Il est en lien avec une base mongodb (grâce à Mlab) permettant d’enregistrer les données d'utilisations de l'application.
