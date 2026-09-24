# Veda Electronics — React (Vite) Project

## Setup

```bash
npm i
npm run dev
```

Dev server khulega `http://localhost:5173` par.

## Build (production)

```bash
npm run build
npm run preview
```

## Booking backend

Start both Vite and the Node API together:

```bash
npm run dev
```

Bookings are stored in `server/data/bookings.json`. Open `http://localhost:5173/admin` and use the `ADMIN_KEY` value to manage them. The development default is `dev-admin-key`; set a strong key in production.

To send real confirmation email with Resend, create a `.env` file before starting the server:

```env
PORT=4000
ADMIN_KEY=replace-with-a-strong-admin-key
RESEND_API_KEY=re_your_resend_api_key
RESEND_FROM=Veda Electronics <onboarding@resend.dev>
```

For production, verify your sending domain in Resend and set `RESEND_FROM` to an address on that domain. Without `RESEND_API_KEY`, the server saves the booking and prints an email preview in the API terminal. For a single-process production deployment, run `npm run build` followed by `npm start`.

If the API returns `401 Unauthorized` from Resend, the API key is invalid or revoked. Create a new Resend key and replace `RESEND_API_KEY` in `.env`. The `onboarding@resend.dev` sender is for testing and cannot send arbitrary customer mail; use a verified domain sender for real bookings.

## Structure

```
src/
  main.jsx              # entry point
  App.jsx                # root component
  index.css              # all styles
  components/
    Header.jsx
    Hero.jsx
    Typewriter.jsx       # typing animation (original inline <script> se converted)
    ServicesCarousel.jsx # Swiper carousel (swiper/react se banaya, CDN swiper.js hataya)
```
