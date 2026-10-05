const playlist = {
  title: 'Evening Transit Mix',
  description:
    'A running set of songs for commutes and late-night listening, with quick context and prompts for deeper note-taking.',
  curator: 'Your Name',
  updated: '2026-10-05',
  songs: [
    {
      title: 'Signal Fade',
      artist: 'Northbound Lights',
      albumOrYear: 'Night Platforms (2024)',
      tags: ['ambient', 'commute', 'synth'],
      notes: {
        context: 'Queue this near sunset. Slow build makes it a good opener for focused listening.',
        lyricsOrObservations:
          'Add a short lyric fragment or describe the repeating synth motif and how the drum entrance shifts the mood.',
        personal:
          'Reminder: note how this track feels on headphones vs. speakers and whether the pacing works for your route.',
      },
    },
    {
      title: 'Paper Skylines',
      artist: 'The Harbor Lines',
      albumOrYear: 'Single (2023)',
      tags: ['indie', 'guitar', 'upbeat'],
      notes: {
        context: 'Good transition from mellow tracks to higher energy in the middle of the playlist.',
        lyricsOrObservations:
          'Prompt: capture one non-copyrighted phrase theme and mention the bright guitar rhythm in the chorus.',
        personal: 'Track if this still feels fresh after repeat listens during the week.',
      },
    },
    {
      title: 'Quiet Polaroids',
      artist: 'Mira Vale',
      albumOrYear: 'Afterimage (2021)',
      tags: ['vocal', 'reflective'],
      notes: {
        context: 'Use when you want space between denser songs.',
        lyricsOrObservations:
          'Prompt: summarize vocal tone and harmony changes without reproducing full lyrics.',
        personal: 'Could pair well before the final song; test different ordering.',
      },
    },
    {
      title: 'Blue Platform',
      artist: 'Cinder Arcade',
      albumOrYear: 'Arc Light EP (2022)',
      tags: ['electronic', 'late-night', 'groove'],
      notes: {
        context: 'Works as a late playlist anchor with consistent momentum.',
        lyricsOrObservations:
          'Prompt: describe bass movement and any standout production textures.',
        personal: 'Rate energy level from 1-5 and compare with similar tracks.',
      },
    },
  ],
};

const byId = (id) => document.getElementById(id);
const songsContainer = byId('songs');
const template = byId('song-template');
const searchInput = byId('song-search');
const tagFilterRoot = byId('tag-filters');
const resultCount = byId('result-count');
let activeTag = '';

function setPlaylistMeta() {
  byId('playlist-title').textContent = playlist.title;
  byId('playlist-description').textContent = playlist.description;
  byId('playlist-curator').textContent = playlist.curator;
  byId('playlist-updated').textContent = playlist.updated;
}

function songSearchText(song) {
  return [
    song.title,
    song.artist,
    song.albumOrYear,
    ...(song.tags || []),
    song.notes?.context,
    song.notes?.lyricsOrObservations,
    song.notes?.personal,
  ]
    .join(' ')
    .toLowerCase();
}

function matches(song, query, tag) {
  const queryMatch = !query || songSearchText(song).includes(query);
  const tagMatch = !tag || (song.tags || []).includes(tag);
  return queryMatch && tagMatch;
}

function renderSongs() {
  const query = searchInput.value.trim().toLowerCase();
  const shown = [];
  songsContainer.innerHTML = '';

  playlist.songs.forEach((song) => {
    if (!matches(song, query, activeTag)) return;
    shown.push(song);

    const node = template.content.firstElementChild.cloneNode(true);
    node.querySelector('.song-title').textContent = song.title;
    node.querySelector('.song-meta').textContent = `${song.artist} • ${song.albumOrYear}`;
    node.querySelector('.song-extra').textContent = `Artist: ${song.artist}`;
    node.querySelector('.song-context').textContent = song.notes?.context || '';
    node.querySelector('.song-lyrics').textContent = song.notes?.lyricsOrObservations || '';
    node.querySelector('.song-personal').textContent = song.notes?.personal || '';

    const tags = node.querySelector('.song-tags');
    (song.tags || []).forEach((tag) => {
      const li = document.createElement('li');
      li.textContent = tag;
      tags.appendChild(li);
    });

    songsContainer.appendChild(node);
  });

  byId('playlist-count').textContent = String(playlist.songs.length);
  resultCount.textContent =
    shown.length === playlist.songs.length
      ? `Showing all ${shown.length} songs`
      : `Showing ${shown.length} of ${playlist.songs.length} songs`;
}

function renderTagFilters() {
  const tags = [...new Set(playlist.songs.flatMap((song) => song.tags || []))].sort();
  tagFilterRoot.innerHTML = '';

  const allButton = document.createElement('button');
  allButton.type = 'button';
  allButton.className = 'tag-button';
  allButton.textContent = 'All tags';
  allButton.setAttribute('aria-pressed', String(activeTag === ''));
  allButton.addEventListener('click', () => {
    activeTag = '';
    renderTagFilters();
    renderSongs();
  });
  tagFilterRoot.appendChild(allButton);

  tags.forEach((tag) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'tag-button';
    button.textContent = tag;
    button.setAttribute('aria-pressed', String(activeTag === tag));
    button.addEventListener('click', () => {
      activeTag = activeTag === tag ? '' : tag;
      renderTagFilters();
      renderSongs();
    });
    tagFilterRoot.appendChild(button);
  });
}

setPlaylistMeta();
renderTagFilters();
renderSongs();
searchInput.addEventListener('input', renderSongs);
