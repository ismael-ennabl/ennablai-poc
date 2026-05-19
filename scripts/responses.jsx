/* Canned assistant responses for the prototype's fake streaming. */

const CANNED_RESPONSES = [
  {
    match: ['hospitality', 'hotel'],
    text:
`Here's what's moving in **hospitality property** appetite right now, based on the carriers in your panel:

## Carrier appetite snapshot
- **Open and growing**: Berkley Hospitality, Liberty Mutual, AmTrust, RSUI (excess)
- **Selective**: Travelers (prefers post-1990 construction), Chubb, Zurich
- **Pulled back**: Markel and a handful of E&S markets are non-renewing coastal limited-service hotels

## Active news (last 30 days)
- Berkley announced **expanded appetite for limited-service hotels under 4 stories** — sprinklered properties with central station alarms now eligible up to $50M TIV
- Travelers tightened underwriting on properties **built before 1990**; expect a roof inspection requirement on anything 20+ years old
- Lloyd's syndicates added \`$200M of net capacity\` for resort/full-service in 1/1 reinsurance treaties

## What this means for your renewals
Lead with updated **COPE data** (especially roof age and electrical updates), include any recent capex, and pre-empt the loss control conversation. Properties with a clean 5-year loss run should see flat-to-down 5% rates.

Want me to pull the carrier-by-carrier appetite grid for a specific property?`,
  },
  {
    match: ['rate change', 'commercial property', 'rates', 'commercial'],
    text:
`Three forces are converging on **commercial property** rates in Q2 2026:

1. **Reinsurance softening** at the 1/1 renewals is finally feeding into primary pricing. Cat-exposed risks are seeing rate decreases of **5–15%** on renewal.
2. **Loss development** from the 2017–2022 storm seasons continues to weigh on carriers' loss picks — meaning carriers with cleaner books are pushing harder for new business.
3. **Inflation guard adjustments**: most carriers reduced auto-bumps from **8% to 4–6%**, easing TIV creep that was inflating premiums even on flat schedules.

## Net effect by segment
- **Non-cat, well-protected risks**: flat to down 5%
- **Cat-exposed (named storm, wildfire)**: still increasing, but at **5–10% vs. 25%+ a year ago**
- **Habitational and frame construction**: still hard — limit reductions and percentage deductibles common

The biggest renewal lever right now is **carrier rotation**. Roughly 40% of your in-force placements are with carriers who've widened appetite this quarter — worth re-marketing on early renewals.`,
  },
  {
    match: ['renewal recap', 'one-pager', 'one pager', 'recap'],
    text:
`Here's a **renewal recap one-pager** template ready for client review. Replace the bracketed fields with the client's data:

## [Client Name] — 2026 Renewal Recap
*Effective [Date] · Prepared by Ismael Viejo · ennabl*

### Program at a glance
- Total premium: **$[X]** (vs. $[Y] prior year, **[±%]**)
- Carriers placed: [list]
- Limits: maintained / increased / reduced per line

### What changed this year
- [Coverage enhancement #1]
- [Coverage enhancement #2]
- [Carrier rotation or new market]

### Wins
- Net **[$X]** in premium savings vs. expiring
- Negotiated [coverage win or deductible improvement]
- Locked **multi-year** terms on [line]

### Open items / next steps
- [Pending inspection or COPE update]
- [Mid-term review checkpoint]

Want me to fill this in for a specific client? Drop a policy or schedule into the Library and I'll pre-populate every field.`,
  },
  {
    match: ['cyber'],
    text:
`Cyber is finally entering a **softening cycle** after three hard years. Here's the state of the market:

## Capacity
New entrants (Resilience, At-Bay, Coalition) have pushed available capacity north of **$2B** in primary and lead excess layers. Towers of $25M–$100M are easy to build for clean risks.

## Rate
- **Primary**: down **4–9% YTD** on flat exposure
- **Excess** layers seeing the steepest cuts — some attachments down 15–20%
- Mid-market accounts (revenue $50M–$500M) are the sweet spot for renewal wins

## Coverage trends
- **MFA non-compliance carve-outs** of $250K–$1M now included by default with most lead carriers
- **Widespread event** sublimits relaxed for risks with documented BCP/DR plans
- **Pay-on-behalf** wording back in standard forms (had been replaced with reimbursement during the hard market)

## Risk to watch
**AI-driven social engineering** claims are up **38% YoY**. Expect every renewal questionnaire to add AI-policy and deepfake-detection training questions by Q3. Start coaching clients now.`,
  },
];

const GENERIC_RESPONSE =
`Happy to help with that. To give you a useful answer, a bit more context would help:

- Is this for a specific client or general market intel?
- What lines of business and geographies should I focus on?
- Any timing constraints — a renewal date or stewardship meeting?

You can also drop relevant policies, loss runs, or schedules into the **Library** and I'll reference them in my answer.`;

function pickResponse(userText) {
  const lower = userText.toLowerCase();
  for (const r of CANNED_RESPONSES) {
    if (r.match.some((k) => lower.includes(k))) return r.text;
  }
  return GENERIC_RESPONSE;
}

Object.assign(window, { CANNED_RESPONSES, GENERIC_RESPONSE, pickResponse });
