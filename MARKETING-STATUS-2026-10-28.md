# Negotiators on Demand — marketing status, 2026-10-28

DRAFT STATUS NOTE. Prepared for Dan's review; nothing here is approved to
send. Caution: this repository is public. If Dan does not want this file
public, move it to the private NOD-ify repo instead of merging it here.

## Where marketing stands

- Practice Lab is the current offer being prepared for outreach. Documented
  prices (re-verify against the live page before quoting anywhere): $350
  open seat, $150 community seat, $3,500 private cohort up to 12 seats +
  $250 per extra seat.
- Proved evidence so far: one real four-hour session, nine attendees, one
  paid $350 seat. No other attendee, revenue, or result claim may be made.
- Draft inventory (Spark Batch 02, Wonder-swept 2026-10-26, approved as
  drafts only): five LinkedIn angles (rehearsal gap, discount reflex, L&D
  budgets, procurement mirror, quiet win) and four email skeletons (HR/L&D,
  sales leader, warm follow-up, breakup). Exact copy still needs Dan's
  approval per send.

## P0 gates before any outreach volume (all still open)

1. Practice Lab landing + one-pager live at a final URL (not present in this
   repo as of 2026-10-28).
2. One real, dated open session to point to, with a working registration path.
3. Resend sending domain verified (SPF/DKIM captured).
4. Checkout + invoice path tested end-to-end with a test transaction.
5. Lead alert re-fired and logged as a TEST submission.

Until all five close, the correct marketing action is preparation only:
no sends, no scheduled posts, no paid amplification.

## Weekly actuals discipline

Fill `NOD-WEEKLY-ACTUALS.csv` (StudioWork) every Monday from primary systems
only: Supabase `lead_submissions`, calendar/CRM, Stripe, provider bills,
session roster, inbox timestamps. Blank means not checked; zero means
checked and zero. Never backfill from memory or from a dashboard screenshot.

## Rules that do not change

- Dan approves exact public copy before it sends.
- No invented testimonials, metrics, logos, or results.
- Sender identity, unsubscribe, and physical address on bulk email come from
  Dan/Legal before the first send.
- NOD-ify `main` deploys to production: PR only, required checks green,
  Dan merges.
