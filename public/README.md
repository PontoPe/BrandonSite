# Images go here

This folder is served at the site root: a file saved as `public/brandon-desk.webp`
is requested by the page as `/brandon-desk.webp`.

Four slots are wired up and waiting. Save the images with these exact names —
lowercase — and they appear on the next page load. No code change and no
restart needed in dev.

| Save as | Where it appears | What suits it |
| --- | --- | --- |
| `brandon-desk.jpg` | The jacket panel on `/`, beside his name | The dark studio shot. It is lit to the same ground as the panel, so photograph and panel share a surface and it needs no frame. Landscape. |
| `brandon-portrait.jpg` | Beside "Who he is" on `/` | A warmer seated portrait. Cropped to 4:5, so portrait orientation works best. |
| `weekly-update-thumb.webp` | Lead card on `/` and on `/blog` | The current weekly-update thumbnail. 16:9. |
| `weekly-update-2.jpg` | Second weekly post on `/blog` | Any older update thumbnail. 16:9. |

Until a file is present its slot renders a pencil block-in captioned with the
filename it is waiting for, rather than a broken image or a grey box — the same
convention the chart uses for a world nobody has drawn yet. So an empty folder
is a valid state, and you can fill it one image at a time.

The extension in the table is only a first guess. If the file on disk is a
different format, the slot tries `.webp`, `.jpg`, `.jpeg` and `.png` in turn
before falling back to the block-in — so `brandon-desk.png` is found even though
the page asks for `brandon-desk.jpg`. Get the *stem* right and the format sorts
itself out.
