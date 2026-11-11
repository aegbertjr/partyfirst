# PartyFirst™ — The Future of Agency Management*

A satirical SaaS marketing site for PartyFirst™, "agency management software" whose real product is the party. It has everything a serious B2B site needs: a platform overview, a security page, a roadmap, pricing, a developer hub, thought-leadership blog posts (*Why Open Bars Are the New API*), and a drink menu.

\*PartyFirst is not a real product. This is satire.

## Deployment

This site is deployed on **[Vercel](https://vercel.com)**.

- Vercel is connected to this GitHub repo through the Vercel GitHub App.
- Every push to `master` triggers a production deploy.
- Pull requests and other branches get their own preview deployments.
- There's no build step: Vercel serves `index.html`, `styles.css`, `app.js`, and `assets/` as static files.

## How it works

It's a single-page site with a small hash-based router in `app.js`. Each "page" is a `<section id="page-…">` in `index.html`, shown or hidden based on the URL hash:

| Hash                                  | Page                                     |
|---------------------------------------|------------------------------------------|
| `#home` (or none)                     | Home: Platform, Security, Roadmap, Pricing, RSVP |
| `#about`                              | About ("Our True North")                 |
| `#product`                            | The PartyFirst Platform                  |
| `#developers`                         | Developer Hub (tabbed docs)              |
| `#blog`                               | PartyFirst Insights                      |
| `#blog/open-bars-new-api`             | Why Open Bars Are the New API            |
| `#blog/10-reasons-dj`                 | 10 Reasons Your Agency Management Software Should Have a DJ |
| `#blog/47-conferences-zero-features`  | We Attended 47 Conferences This Year and Shipped Zero Features |
| `#drink-menu`                         | Drink Menu                               |

`#platform`, `#security`, `#roadmap`, `#pricing` and `#rsvp` scroll to sections of the home page.

To add a page, add a `<section id="page-your-page" class="page">` to `index.html` and a `'your-page': 'your-page'` entry to `HASH_TO_PAGE` in `app.js`.

The RSVP and newsletter forms are front-end only. They show a success message and don't send data anywhere.

## Project structure

| Path         | What it does                                            |
|--------------|---------------------------------------------------------|
| `index.html` | All pages, as sections                                  |
| `app.js`     | Router, mobile nav, forms, scroll-reveal animations     |
| `styles.css` | Styling                                                 |
| `assets/`    | Images, headshots, and favicon                          |

## Running locally

No dependencies. Open `index.html` in a browser, or serve the folder:

```sh
npx serve .
```
