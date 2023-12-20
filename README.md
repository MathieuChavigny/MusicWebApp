# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Installation

La composante **AudioProvider** doit être insérée judicieusement dans l'application afin de rendre accessible ses fonctionnalités accessibles aux composantes.

# Différents hooks
Les différentes fonctionnalités de la librarie ont été séparées sur plusieurs hooks afin d'en faire une utilisation plus précise et éviter des rendus inutiles pour des composantes n'utilisant qu'un échantillon limité de ces fonctions et méthodes.


## useAudio

Ce hook est utilisé pour les contrôles de base de l'API Html5 Audio. C'est à l'aide de celui-ci que l'on déclare l'url du fichier audio à jouer, qu'on lance la lecture, qu'on peut mettre la lecture en pause...

    const {changeSource, isReady, play, pause, stop, isPaused, togglePause, duration, volume, changeVolume} = useAudio();

### Propriétés et méthodes du hook useAudio

- **changeSource(url, autoplay = true)**: Permet de faire jouer un fichier audio à partir d'un _url_. Si _autoplay_ est true (par défaut), la lecture sera lancée dès que le fichier sera suffisament chargé. C'est cette méthode qu'on doit appeler à nouveau si on désire faire jouer une chanson différente.
- **isReady**: Booléen indiquant si le fichier audio a été suffisament chargé pour le faire jouer. Tant que sa valeur est false, il ne sera pas possible d'utiliser les autres fonctionnalités du lecteur.
- **play()**: Permet de faire jouer le fichier audio s'il est suffisament chargé (_voir isReady_). C'est aussi la fonction à appeler pour continuer la lecture après avoir fait pause précédemment.
- **pause()**: Permet de mettre la lecture d'un fichier audio en pause. Pause ne réinitialisera pas la progression de la chanson.
- **stop()**: Interrompt la lecture de la chanson en remettant la progression de la chanson à 0.
- **isPaused**: Booléen indiquant si la lecture a été interrompue (par _pause_ ou _stop_). Il ne faut pas tenir compte de cette valeur si un fichier audio n'est pas encore chargé (voir _isReady_).
- **togglePause()**: Permet d'alterner entre _play_ et _pause_ sans vérifier l'état de _isPaused_.
- **duration**: Indique la durée en secondes de la chanson courante.
- **volume**: Valeur décimale entre 0 et 1 (a un effet sur l'intensité des valeurs utilisées pour visualiser la lecture audio, voir _animations rythmiques_ du devis).
- **changeVolume(valeur)**: Change le volume de la lecture audio. La _valeur_ passée en paramètre doit être une valeur décimale en 0 et 1.

useAudio peut être utilisé à plusieurs endroit à travers l'application pour contrôler la lecture de la même chanson. L'utilisation de la fonction _changeSource_ changera la chanson pour toutes les composantes utilisant useAudio dans le même Provider.

Un paramètre booléen peut être passé à useAudio (*const {play} = useAudio(true)*) afin de faire en sorte que la lecture du fichier audio soit automatiquement interrompue si on quitte la composante qui a appelé useAudio.


## useAudioEnded
Ce hook permet d'exécuter une fonction lorsque la lecture de la chanson est terminée.

    useAudioEnded(() => {
        // exécuté lorsque la chanson en cours est terminée
    });

## useAudioProgress
Permet d'avoir un aperçu et un contrôle sur la progression de la lecture du fichier audio. L'utilisation de ce hook entraîne plusieurs rendus par seconde. Il est idéal de l'utiliser dans une composante qui ne contient pas trop d'enfants pour éviter de nuire aux performances de l'application.

### Propriétés et méthodes du hook useAudioProgress

- **progress**: Valeur décimale (entre 0 et 1) indiquant la progression de la lecture de la chanson.
- **changeProgress(valeur)**: Change la position de la _tête de lecture_ de la chanson. On lui passe en paramètre la _valeur_ décimale (entre 0 et 1) correspondant à la progression désirée.


## useAudioVisual ##
Permet d'obtenir des données sur l'intensité de la chanson en cours de lecture afin de générer une composante pour visualiser la chanson (voir _animations rythmiques_ du devis).

    const data = useAudioVisual();

Les données obtenues sont retournées sous forme de tableau de 128 valeurs qui varient de 0 à 360 en fonction de l'intensité de la chanson. Par défaut, les données sont mises à jour à chaque 30 milisecondes, mais la valeur par défaut peut être modifiée.

    const data = useAudioVisual(50); // mis à jour à chaque 30 milisecondes

Comme pour _useAudioProgress_, l'utilisation de ce hook entraîne plusieurs rendus par seconde. Il est idéal de l'utiliser dans une composante qui ne contient pas trop d'enfants pour éviter de nuire aux performances de l'application.

## Support ##
S'il s'avérait que certaines fonctionnalités sont erronées ou inefficace ou que d'autres fonctions / propriétés soient nécessaires, n'hésitez pas à m'en faire part. De nouvelles versions pourraient être déployées au besoin.