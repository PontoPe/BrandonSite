# Images go here

This folder is served at the site root: a file saved as `public/brandon-desk.jpg`
is requested by the page as `/brandon-desk.jpg`.

Four slots are wired up and waiting. Save the images with these exact names —
lowercase, `.jpg` — and they appear on the next page load. No code change and no
restart needed in dev.

| Save as | Where it appears | What suits it |
| --- | --- | --- |
| `brandon-desk.jpg` | The jacket panel on `/`, beside his name | The dark studio shot. It is lit to the same ground as the panel, so photograph and panel share a surface and it needs no frame. Landscape. |
| `brandon-portrait.jpg` | Beside "Who he is" on `/` | A warmer seated portrait. Cropped to 4:5, so portrait orientation works best. |
| `weekly-update-thumb.jpg` | Lead card on `/` and on `/blog` | The current weekly-update thumbnail. 16:9. |
| `weekly-update-2.jpg` | Second weekly post on `/blog` | Any older update thumbnail. 16:9. |

Until a file is present its slot renders a pencil block-in captioned with the
filename it is waiting for, rather than a broken image or a grey box — the same
convention the chart uses for a world nobody has drawn yet. So an empty folder
is a valid state, and you can fill it one image at a time.

`.png` works too, but then update the `src` in `src/app/page.tsx` and
`src/app/blog/page.tsx` to match the extension.
