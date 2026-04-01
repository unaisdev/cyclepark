# Business rules — CiclePark

Living document. Rules marked **TODO** or **[TBD]** should be closed before or during development.

---

## 1. Entity: Spot (parking)

| ID | Rule | Status |
|----|------|--------|
| BR-SP-01 | A spot has **coordinates** (lat/lng) and optionally minimal metadata (e.g. approximate address if the backend resolves it). | Active |
| BR-SP-02 | Two spots cannot occupy **exactly** the same coordinates **[TBD merge threshold]** (e.g. < 10 m → same spot or prompt to merge). | Pending |
| BR-SP-03 | Spot creator is recorded on the server if auth exists; if the MVP is anonymous, **[TBD]** abuse policy. | Pending |

---

## 2. Photos

| ID | Rule | Status |
|----|------|--------|
| BR-PH-01 | When creating a spot, the photo is **[TBD: required vs “strongly recommended”]**; if optional, the spot may start without a photo and show an empty state in detail. | Pending |
| BR-PH-02 | A photo belongs to **one** spot; order by upload date (newest first) unless **[TBD]**. | Active (proposal) |
| BR-PH-03 | Limits: max size, format (JPEG/WEBP), and max photos per spot/user **[TBD]**. | Pending |
| BR-PH-04 | Moderation: **[TBD]** manual, reports, automatic filter — MVP may defer to a later “report” iteration. | Pending |

---

## 3. Votes (safe / not safe)

| ID | Rule | Status |
|----|------|--------|
| BR-VT-01 | Vote is **binary**: “Safe” / “Not safe” (equivalent to 👍 / 👎). | Active |
| BR-VT-02 | **One vote per user per spot** **[TBD]** whether opinion can change (recommended: yes, last vote wins). | Pending |
| BR-VT-03 | Aggregation shown in UI: **[TBD]** exact format (`+12 / -3`, percentage, both). | Pending |
| BR-VT-04 | With **zero votes**, the marker is **neutral** (no positive/negative bias). | Active |
| BR-VT-05 | Marker color rule **[TBD]**: e.g. green if `positives - negatives ≥ threshold` and ratio > X; red if the opposite; gray if tie below threshold or no data. | Pending |

---

## 4. Map marker states

| State | Proposed meaning |
|-------|------------------|
| **Neutral** | No votes or tie / below threshold **[TBD]**. |
| **Positive (green)** | Favourable consensus per agreed formula. |
| **Negative (red)** | Unfavourable consensus per agreed formula. |

> **TODO:** Define the formula and whether spots **without a photo** are treated differently on the map (e.g. always neutral until the first photo).

---

## 5. Privacy, legal, and location

| ID | Rule | Status |
|----|------|--------|
| BR-LC-01 | The app requests **location** permission; without permission, the map may default to a city or prompt search **[TBD]**. | Pending |
| BR-LC-02 | Legal copy: Terms, privacy, image use **[TBD]** who drafts and when it is shown (signup vs first contribution). | Pending |

---

## 6. Sync and offline (MVP)

| ID | Rule | Status |
|----|------|--------|
| BR-SY-01 | MVP: **[TBD]** online-only vs offline queue for create spot/vote/photo. | Pending |
| BR-SY-02 | On network error: clear message and retry; do not lose form data when possible. | Active (proposal) |

---

## 7. Supporter purchase (in-app)

| ID | Rule | Status |
|----|------|--------|
| BR-IAP-01 | The app offers **one** non-consumable in-app product (`ciclepark_supporter_unlock`) as a **supporter** / thank-you purchase. Store configuration and technical flow: [in-app-purchases.md](./in-app-purchases.md). | Active |
| BR-IAP-02 | **Entitlement** is evaluated on-device via Apple / Google APIs; there is **no** backend receipt validation in the current client. **[TBD]** if a server should be introduced for fraud or cross-device sync. | Active (as implemented) |
| BR-IAP-03 | Whether **map or list features** are gated behind purchase is a **product decision**; today the paywall is primarily **support** messaging. **[TBD]** if any feature must require entitlement. | Pending |

---

### Change history (this file)

| Date | Change |
|------|--------|
| 2026-03-23 | Initial version with rule IDs and explicit decision gaps. |
| 2026-03-24 | Translated to English (`PENDIENTE` → `TODO`, `[DECIDIR]` → `[TBD]`). |
| 2026-04-01 | §7 Supporter IAP (BR-IAP-01–03) and link to `in-app-purchases.md`. |
