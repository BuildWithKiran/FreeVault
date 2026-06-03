# FreeVault 💎

**live deomo:** https://freevault-hub.vercel.app/

The ultimate, curated directory of 100% free, legal, public, and open-source resources collected from across the internet. FreeVault is built for developers, designers, and creators to find exactly what they need instantly.

**Zero Paywalls. Zero Accounts. Zero Friction.**

## Features
- **Premium Glassmorphism UI:** Built with modern design principles (React, Framer Motion, Vanilla CSS).
- **Instant Search:** Raycast-style `CMD/CTRL + K` search modal for lightning-fast resource discovery.
- **Dynamic Dataset:** Driven by a single `dataset.md` file that automatically parses into the application.
- **Fully Responsive:** Looks beautiful on desktop, tablet, and mobile devices.
- **Dark Mode Native:** Designed specifically for a premium dark-mode aesthetic.

## Tech Stack
- **Framework:** React + Vite
- **Styling:** Vanilla CSS Custom Properties (No Tailwind)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Routing:** React Router DOM

## Running Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/BuildWithKiran/FreeVault.git
   cd FreeVault
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the dataset parser** (if you update `dataset.md`)
   ```bash
   node parseData.cjs
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` to view it in the browser.

## Contributing
To add a new resource, simply edit the `dataset.md` file and run `node parseData.cjs` to update the application data!
