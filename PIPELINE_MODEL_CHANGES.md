# Pipeline and Model Changes

This document summarizes the latest updates to data pipelines, test models, and slide interactions.

## 1) Universal MCQ module added to all classes (`src/data/ClassData.jsx`)

- Added a reusable module: `MCQ Test Arena`.
- Injected this module into every class (`1` to `8`) so you can launch tests anywhere.
- Module config now uses:
  - `generator: "mcqTest"`
  - `config.testId` for selecting which test object to render.

## 2) New MCQ test data object format (`src/data/mcqTests.js`)

- Created dedicated test data storage in the `data` folder.
- Added sample test object with this structure:
  - `id`, `title`, `description`
  - `timer.totalSeconds`, `timer.warningAtSeconds`
  - `subjects[]`
  - each subject has `id`, `label`, `questions[]`
  - each question has `id`, `question`, `options` (A/B/C/D object), and `correctOption`
- This is the format to copy for all future tests.

## 3) New MCQ slide generator pipeline (`src/utility/slideGenerator.js`)

- Added generator mapping:
  - `mcqTest: generateMcqTestSlides`
- Generator now reads test objects from `mcqTests` by `testId`.
- On valid `testId`: creates an `mcqTest` slide payload.
- On invalid `testId`: safely falls back with an error slide.

## 4) Full MCQ test engine UI (`src/components/slides/McqTestSlide.jsx`)

Implemented full professional test mechanics:

- One-question-at-a-time test view
- Subject tabs (multi-subject support)
- Right-side question navigator with status colors
  - current
  - visited/attempted
  - answered
- Option selection with answer storage
- Auto-updating timer with warning state
- Submit test action
- Final result dashboard with circular score graph
- Result stats: correct, wrong, unattempted
- Restart test support

## 5) Universal answer/session storage (`src/context/TestSessionContext.jsx`)

- Added Context API based session store for tests.
- Stores answers, visited map, and remaining time by `sessionId`.
- Enables reusable test state architecture across modules/classes.

## 6) Fullscreen mode in slide player (`src/components/slides/Slides.jsx`)

- Added fullscreen icon button in slide viewer.
- Supports enter/exit fullscreen using browser fullscreen API.
- Works for normal slides and MCQ test slides.

## 7) App wiring updates

- Added `TestSessionProvider` in `src/main.jsx` to enable global test session state.
- Added new slide component mapping for `mcqTest` in `Slides.jsx`.

## Validation

- `npm run lint` passes.
- Production build passes (`npm run build`).
