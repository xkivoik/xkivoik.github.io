# Playlist Notes Site

This repository hosts a GitHub Pages-friendly static webpage for playlist notes.

## Files you will edit

- `/home/runner/work/xkivoik.github.io/xkivoik.github.io/script.js`
  - Update the `playlist` object at the top:
    - `title`, `description`, `curator`, `updated`
    - `songs` array (each song supports `title`, `artist`, `albumOrYear`, `tags`, and `notes`)
- `/home/runner/work/xkivoik.github.io/xkivoik.github.io/index.html`
  - Layout/structure for the page
- `/home/runner/work/xkivoik.github.io/xkivoik.github.io/styles.css`
  - Visual styling and responsive behavior

## Song notes format

Each `songs` item in `script.js` should follow this shape:

```js
{
  title: 'Song title',
  artist: 'Artist name',
  albumOrYear: 'Album (Year) or Year',
  tags: ['optional', 'tags'],
  notes: {
    context: 'When/why this song is in the playlist',
    lyricsOrObservations: 'Short prompt, lyric snippet, or musical notes',
    personal: 'Your personal reflection'
  }
}
```

Avoid posting full copyrighted lyrics. Keep lyric references short or use prompts/observations.

## Preview locally

From the repository root:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000/`.

## Deploy on GitHub Pages

This is a static site using relative asset paths (`./styles.css`, `./script.js`) so it works as a project site under `/xkivoik.github.io/`.

To publish:

1. Push changes to the repository default branch.
2. In GitHub: **Settings → Pages**.
3. Set source to deploy from the default branch root (`/`).
4. Visit the published URL once Pages finishes building.