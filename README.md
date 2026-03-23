# Vestia

Career mentorship platform for early-career women — from first job to VP.

## Repo Structure

```
vestia/
├── site/            Landing page & marketing (deployed to vestia.co)
│   └── index.html
├── app/             MVP platform (future — deployed to app.vestia.co)
├── netlify.toml     Netlify deploy config for the landing page
└── README.md
```

## Deploying the Landing Page

1. Connect this repo to [Netlify](https://app.netlify.com)
2. No build command needed — `netlify.toml` points to `site/` as the publish directory
3. Enable **Form detection** in the Netlify dashboard under Forms
4. Add email notification: Site settings → Forms → Form notifications → Email
5. Set custom domain to `vestia.co` (or your chosen domain)

## Forms

The waitlist form (`vestia-waitlist`) is handled by Netlify Forms. Submissions appear in the Netlify dashboard and can be exported as CSV. Spam protection uses both a honeypot field and Netlify's built-in Akismet filtering.

## Future: MVP App

The `app/` directory is reserved for the Vestia platform (React/Next.js). When ready, it will be deployed as a separate Netlify site at `app.vestia.co`.
