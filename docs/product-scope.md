# Product scope — CiclePark

## Goal

Help the user answer quickly: **“Can I park my bike here safely?”**

The app prioritises **speed**, **visual clarity**, and **easy contribution** (photos and votes).

## Target user

- Urban cyclists, daily or occasional use.
- On the street, often **one-handed** and short on time.
- Low tolerance for a steep learning curve.

## UX principles (reminder)

- Zero friction; aim for a decision in **under ~3 seconds** when possible.
- **Photos before text** to build trust.
- Encourage **contribution** without complicating consumption.

## MVP — In scope

- **Home / map:** nearby parking spots with markers by state (no data / positive / negative).
- **Spot detail:** gallery, simple score, 👍 / 👎 votes, add photo.
- **Add parking:** confirm location on map, photo (required or strongly recommended per business rules), save.

## Out of scope (explicit MVP)

- User profiles, social, long comments, gamification.
- Complex navigation or many sections.

## Glossary

| Term | Operational definition |
|------|-------------------------|
| **Spot** | Parking point on the map (main entity). |
| **Vote** | Binary indication of perceived safety (for / against). |
| **Marker state** | Derived from vote aggregates and/or missing data (see [business-rules.md](./business-rules.md)). |
| **Contribution** | Create spot and/or upload photo and/or vote. |

## Success metrics (draft)

> **TODO:** Define KPIs (e.g. time to first decision, contribution rate, retention).

---

### Change history (this file)

| Date | Change |
|------|--------|
| 2026-03-23 | Initial version. |
| 2026-03-24 | Translated to English. |
