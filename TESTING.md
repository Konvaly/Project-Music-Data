# TESTING.md

This document describes how the Music Data project was tested against the project rubric.

---

## User Dropdown (4 users)

- The page contains a labelled user dropdown.
- The dropdown lists **four users** (User 1–4).

Verified manually by opening the site and checking the `<select>` options.

**Result:** Passed

---

## User Selection Updates Results

- Selecting a user clears the previous results and shows answers for the selected user.
- Selecting a different user updates the results accordingly.

Verified manually by selecting User 1 → User 2 → User 3 and confirming results change (no stacking).

**Result:** Passed

---

## User 4 (No Data) Empty State

- User 4 has no listening events.
- No questions apply to User 4.
- An intelligible message is shown (e.g. “This user didn’t listen to any songs.”).

Verified manually by selecting **User 4**.

**Result:** Passed

---

## Hide Non-Applicable Questions (Rubric Trap)

- If a question doesn’t apply, the UI hides the entire question + answer section.
- Specifically: User 3 has **no Friday-night listens**, so Friday-night questions must not be displayed.

Verified manually by selecting **User 3** and confirming:

- No “Friday night song (count)” section appears.
- No “Friday night song (time)” section appears.

**Result:** Passed

---

## Top Genres Label (Rubric Trap)

- If fewer than 3 (but more than 0) genres were listened to, the label must not say “Top 3 genres”.
- User 2 listens to only one genre in the expected output (“Pop”), so the label must adapt (e.g. “Top genre”).

Verified manually by selecting **User 2** and confirming the label matches the number of genres shown.

**Result:** Passed

---

## Expected Output Spot Checks

Compared outputs against the provided “Expected output data” table:

- **User 1**
  - Most listened song (count): The Swell Season – When Your Mind’s Made Up
  - Most listened song (time): Faithless – Insomnia
  - Most listened artist (count): Frank Turner
- **User 2**
  - Most listened song (count/time): Frank Turner – I Still Believe
  - Friday night song (time): Frank Turner – Photosynthesis
- **User 3**
  - No Friday-night sections displayed
  - No “Every day songs” section displayed

Verified manually by selecting each user in the UI and comparing values.

**Result:** Passed

---

## Unit Tests (Non-trivial)

Unit tests are located in `analytics.test.mjs`.

**Tested:**

- User 4 “no data” behaviour returns `null` (supports hiding all questions)
- Friday-night functions return `null` when no Friday-night listens exist (User 3)
- Longest streak logic (high risk of off-by-one bugs)
- Deterministic tie-breaking behaviour (stable results)

**Run tests with:**

```bash
npm install
npm test

```

All tests pass.

**Result:** Passed  
(Unit tests located in `analytics.test.mjs`)

---

## Accessibility (Lighthouse Snapshot)

Ran Lighthouse in **Snapshot** mode on multiple views:

- no user selected
- User 1 selected
- User 2 selected
- User 3 selected
- User 4 selected

Accessibility score: **100%** on each view tested.

**Result:** Passed

## Code Cleanup

- Removed placeholder/demo behaviour and ensured no dead/unused code remains.
- Confirmed no console errors in DevTools.

**Result:** Passed

---

## Final Status

All rubric requirements tested and passed.
