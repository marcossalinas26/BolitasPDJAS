# 🎯 BOLITAS - ¡Entrena tu puntería como un pro!

¡Buenas! Bienvenido a **Bolitas**, el entrenador de aim (puntería) que te va a quitar lo "manco" en tus juegos favoritos. Si estás cansado de que te vuelen la cabeza en el Valorant o el CS:GO, has llegado al sitio correcto.

## 🚀 ¿De qué va esto?

Bolitas es una web sencilla pero potente para que calientes antes de tus partidas competitivas. Tenemos dos modos principales inspirados en lo que usan los profesionales:

*   **⚡ Gridshot:** Bolas grandes, mucha velocidad. Ideal para calentar la muñeca y ganar fluidez.
*   **🎯 Sixshot:** Bolas diminutas. Aquí es donde se ve quién tiene precisión de cirujano y quién dispara al aire.

¡Y ojo! Que tenemos un **Ranking Global**. Tus mejores puntuaciones se guardan para que puedas fardar delante de tus amigos (o llorar si vas el último).

## 🛠️ Lo que lleva por dentro (Tech Stack)

Para que esto vuele, hemos usado:
*   **Node.js & Express:** El motor que mueve toda la lógica.
*   **PostgreSQL:** Para que tus puntuaciones no se pierdan en el olvido.
*   **Docker:** Para que no te vuelvas loco instalando cosas. `docker-compose up` y a correr.
*   **Pug:** Para que las pantallas se vean bonitas y modernas.
*   **CSS Puro:** Diseño *Glassmorphism* oscuro, porque los gamers odiamos el modo claro.

## 🏃 Cómo ponerlo a andar

Si quieres montarlo en tu PC, es un paseo:

1.  **Clona el repositorio** (si es que no lo tienes ya).
2.  **Lanza la base de datos:**
    ```bash
    docker-compose up -d
    ```
3.  **Instala las dependencias:**
    ```bash
    npm install
    ```
4.  **Enciende el servidor:**
    ```bash
    npm run dev
    ```
5.  **¡A jugar!** Entra en `http://localhost:3000` y empieza a darle a las bolitas.

## 📝 Notas del autor

Este proyecto ha sido retocado y pulido para que sea ultra-robusto. Hemos arreglado bugs raros de finalización de partida y hemos dejado la pantalla principal niquelada.

¡Dale caña y nos vemos en el Top 1 del ranking! 🤙
