# App Holi
![Logo](./resources/icon.png)

# Guia para publicación

## Pasos Visual Studio Code

### Ejecutar
1. Instalar cordova-res (Si ya está instalado hacer caso omiso)
```bash
$ npm install -g cordova-res
```

2. Se debe contar con una carpeta con la siguiente estructura

>        resources/
>            ├── icon.png
>            └── splash.png
>            └──android/
>            	├── icon-background.png
>            	└── icon-foreground.png

```bash
$ npm run build
$ npx cap add android 
$ cordova-res android --skip-config --copy
$ npx cap open android
```