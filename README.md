# Blessing Chukwuemeka — Portfolio

An independent static portfolio, adapted from Blessing's supplied saved pages. No LandingHero account, runtime, build service, or subscription is required. The contact form uses Formspree.

## Preview

Run `python3 -m http.server 8000` from this folder, then open http://localhost:8000.

## Pages and editing

- `index.html`: introduction, project cards, tools, contact.
- `about.html`: biography, testimonials, personal photos, résumé link.
- `otega.html`, `trubooker.html`, `monielock.html`, `earth-broadband.html`, `movewise.html`, and `makemoneydrop.html`: six case-study pages.
- `assets/base.css`: preserved design styles.
- `assets/site.css`: responsive navigation and accessibility improvements.
- `assets/site.js`: mobile menu, project and résumé dialogs, contact-form submission.
- `assets/`: local images and font definitions.
- `assets/illustrations/`: optimized copies of Blessing's artwork used by the About-page hover/tap preview. Replace or reorder the images in `about.html` to update the sequence.

Edit text directly in the HTML. Each project card on the homepage links to its case-study page.

The contact form submits to Blessing's Formspree endpoint and shows success or error feedback without taking visitors away from the portfolio. Formspree must be configured to notify `bchukwuemekab@gmail.com`; the direct email link remains available as a fallback. The résumé is stored at `assets/blessing-chukwuemeka-resume.pdf`; its two rendered pages open in a scrollable in-page viewer, with a PDF download option. External project and social links are preserved.

## Publish / back up

Upload the eight HTML files and the assets folder to a static web host. No build command is needed. Keep a ZIP or Git backup of the folder so the site can be moved between hosts. This project has not been deployed.

Google Fonts URLs are used by assets/fonts.css with local system fallbacks. All portfolio images and layout CSS are local, so a font provider outage will not prevent the site from working.
