# Flexy - Antrenorul Tău Personal bazat pe AI

![Flexy Hero Image](link_catre_un_screenshot_cu_pagina_principala.png)  <!-- Opțional: adaugă un screenshot principal aici -->

Acesta este un proiect [Next.js](https://nextjs.org) care demonstrează construirea unei aplicații web full-stack, moderne, ce acționează ca un antrenor de fitness inteligent și conversațional. Misiunea sa este de a elimina "paralizia decizională", generând instantaneu planuri de antrenament personalizate.

Proiectul a fost realizat în cadrul stagiului de practică la Devidevs.

## ✨ Funcționalități Cheie

*   **Generare Personalizată de Planuri:** Colectează datele utilizatorului (obiective, experiență, echipament) pentru a crea un plan de antrenament unic.
*   **Interfață Conversațională (Chatbot):** Permite o interacțiune naturală cu AI-ul pentru a primi planul și a cere ajustări în timp real.
*   **API Routes în Next.js:** Demonstrează crearea de endpoint-uri backend pentru a comunica cu servicii externe (precum un API de AI).
*   **Ghid Vizual pentru Exerciții:** Fiecare exercițiu include instrucțiuni și o demonstrație vizuală (GIF) pentru o execuție corectă.
*   **Urmărirea Progresului:** Un calendar simplu, bazat pe `localStorage`, care marchează zilele de antrenament finalizate.
*   **Design Modern și Responsiv:** Interfață curată, construită cu **Tailwind CSS**, și un font modern, [Geist](https://vercel.com/font), optimizat automat cu `next/font`.

## 🛠️ Stack Tehnologic Utilizat

*   **Framework:** [Next.js](https://nextjs.org) (App Router)
*   **Limbaj:** [TypeScript](https://www.typescriptlang.org/)
*   **UI:** [React](https://react.dev/)
*   **Stilizare:** [Tailwind CSS](https://tailwindcss.com/)
*   **Serviciu AI:** [Google Gemini API](https://ai.google.dev/) (sau altul similar)

## Getting Started: Cum se Rulează Proiectul Local

Pentru a rula acest proiect pe mașina ta locală, urmează pașii de mai jos.

### Prerechizite
Asigură-te că ai instalată o versiune recentă de [Node.js](https://nodejs.org/en/) (18.x sau mai nouă).

### Pași de Instalare

1.  **Clonează repository-ul:**
    ```bash
    git clone https://github.com/AlinaDumitru084/Flexy.git
    cd Flexy
    ```

2.  **Instalează dependențele:**
    ```bash
    npm install
    ```

3.  **Configurează variabilele de mediu:**
    *   Creează un fișier nou în rădăcina proiectului numit `.env.local`.
    *   Adaugă cheia ta de API pentru serviciul AI în acest fișier.
    ```
    GEMINI_API_KEY=CHEIA_TA_SECRETA_DE_API_AICI
    ```

4.  **Pornește serverul de dezvoltare:**
    ```bash
    npm run dev
    ```

Acum deschide [http://localhost:3000](http://localhost:3000) în browserul tău pentru a vedea aplicația. Poți începe să editezi codul, de exemplu, modificând `app/page.tsx`, iar pagina se va actualiza automat.

## Learn More

Pentru a învăța mai multe despre tehnologiile folosite, poți consulta următoarele resurse:

- [Next.js Documentation](https://nextjs.org/docs) - învață despre feature-urile Next.js și API.
- [Learn Next.js](https://nextjs.org/learn) - un tutorial interactiv.
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - pentru a explora toate clasele utility.

## Deploy on Vercel

Cea mai simplă metodă de a publica această aplicație este folosind [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) de la creatorii Next.js.

Consultă [documentația de deployment pentru Next.js](https://nextjs.org/docs/app/building-your-application/deploying) pentru mai multe detalii.
