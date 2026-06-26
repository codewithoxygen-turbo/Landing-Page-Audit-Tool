# ScopeConnect Practice - Landing Page Audit Tool

A browser-based landing page audit tool for small and growing businesses. The app evaluates landing page readiness across six categories, then generates a conversion score, radar chart, and actionable audit summary.

## Key Features

- Business information capture (name, industry, audience, goal, URL)
- Checklist-based audit categories:
  - Attention
  - Trust
  - Clarity
  - CTA strength
  - Friction
  - Proof
- Weighted conversion readiness score
- Radar chart visualization of category performance
- Executive summary, critical issues, quick wins, and recommendations
- Print/export report via browser print dialog
- Report persistence using `localStorage`

## Files

- `index.html` — Main UI and audit form structure
- `styles.css` — Responsive styles, cards, form layout, and radar chart design
- `app.js` — Audit logic, score calculations, radar rendering, and storage handling

## Getting Started

1. Open `index.html` in a browser.
2. Enter business details and landing page information.
3. Select the checklist items that apply to the page.
4. Click `Generate Audit Report` to view scores and insights.
5. Click `Export PDF` to print or save the report.

## Notes

- This is a fully client-side project and does not require a backend.
- Use a modern browser with SVG support for best results.
- The audit is designed as a high-level landing page readiness tool, not a replacement for a full UX review.
