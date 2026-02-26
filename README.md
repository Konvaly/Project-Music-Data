# Project: Music Data

A small **HTML + JavaScript** app that processes supplied music listening data and presents answers to the rubric questions for a selected user.

This project prioritizes **data processing correctness** and **accessibility**, not UI styling.

---

## Live site

- Deployed URL: **https://cyf-project-music-data.netlify.app/**

> The deployed site must update automatically when changes are merged to `main` (per project requirements).

---

## What the app does

1. Shows a **drop-down with 4 users** (from `getUserIDs()`).
2. When you select a user, it computes answers **from scratch** using the supplied data functions:
   - Most listened song (by listens)
   - Most listened song (by listening time)
   - Most listened artist (by listens)
   - Most listened artist (by listening time)
   - Friday-night song (by listens) _(Fri 17:00 → Sat 03:59)_
   - Friday-night song (by listening time) _(Fri 17:00 → Sat 03:59)_
   - Longest streak song (most consecutive listens)
   - Every-day songs (songs listened to on every day the user listened)
   - Top genres (up to 3, label adapts to actual count)

### Rubric behavior (important)

- If a question **does not apply**, it is **not rendered at all** (no empty sections).
- **User 4** has no listening data → the app shows an intelligible message (e.g. “This user didn’t listen to any songs.”).
- Views should score **100% Accessibility** in Lighthouse Snapshot.

---

## Tech notes

- Uses **ES modules** (`.mjs`) in the browser.
- Pure data logic lives in `analytics.mjs` + `utils.mjs`.
- UI logic lives in `script.mjs`.

### Integration contract (how UI + analytics work together)

Analytics functions return either:

- `{ label, value }` when the answer applies, or
- `null` when it does not apply (UI must hide the section)

---

## Run locally

Because this uses ES modules in the browser, you must serve the folder over HTTP (opening `index.html` with `file://` will not work).

1. Install dependencies:

```bash
npm install

```

2. Start a local server:

```bash
npx http-server

```

3. Open the URL shown in the terminal (for example http://127.0.0.1:8080).

## Testing

- Rubric verification steps are documented in `TESTING.md`.
- Unit tests are in `analytics.test.mjs` and cover non-trivial logic (edge cases and rubric traps).

Run tests

```bash
npm test

```

---

## Accessibility

- Semantic headings and labelled form controls
- Results update in a live region
- Lighthouse Snapshot accessibility score target: **100%**

---

## Workflow

- Feature branches with pull requests
- Pure logic separated into `utils.mjs` and `analytics.mjs`
- UI wiring in `script.mjs`
- Automatic deployment on merge to `main`

---

## Status

Project completed according to rubric requirements, including:

- Correct per-user analytics answers
- Hidden non-applicable questions
- Non-trivial unit tests
- Lighthouse Snapshot accessibility compliance
- Deployed public website

## Author

[Mariia Serhiienko](https://github.com/Konvaly)
