# EcoAware - Carbon Credit Assistant (Challenge 3)

## Chosen Vertical
**Carbon Footprint Tracking & Ecosystem Assistant**
This project focuses on building a dynamic, real-time tracking assistant that helps users understand and actively manage their carbon footprint through practical actions and visual ecosystem feedback.

## Approach & Logic
The core logic relies on a custom `carbonEngine` that translates abstract carbon emission metrics (kg CO2e) into relatable equivalents (e.g., "smartphone charges" or "home electricity days").
- **Dynamic Contextual Nudges:** Based on user input, the application generates real-time nudges suggesting greener alternatives. 
- **Positive & Negative Impacts:** To make the application practically useful, we introduced "Positive Actions" (like planting trees or recycling) which subtract from the user's carbon footprint.
- **Ecosystem Visualization:** The UI is reactive. As the carbon footprint changes, the state of the digital ecosystem dynamically shifts between "Flourishing", "Stable", "Degraded", and "Critical" using a professional, modern visual aesthetic.

## How the Solution Works
1. **Activity Input:** Users log daily activities (like short flights, taking the metro, or eating a vegetarian meal) or positive actions (like planting a tree).
2. **Contextual Processing:** The `carbonEngine` calculates the net carbon change and generates a contextual nudge (e.g., "Eating meat once produces 6x more carbon than a plant-based meal").
3. **Reactive UI:** The `EcosystemDisplay` recalculates the environment state. If the net footprint is low, the UI is green and sunny; if high, it turns degraded or critical. The changes are deeply memoized using React hooks (`useMemo`, `React.memo`) for peak efficiency.
4. **Leaderboard:** Users can compare their footprint against mock teams to encourage friendly, sustainable competition.

## Focus Areas Addressed
- **Code Quality:** Strong component separation, full prop validation via JSDoc, heavily memoized rendering.
- **Security:** Pure React implementation with no raw DOM manipulation (protecting against XSS).
- **Efficiency:** Leveraged `React.memo` and `useMemo` hooks specifically to prevent unnecessary re-renders of the ecosystem graphics.
- **Testing:** Implemented automated unit and component tests via `vitest` and `@testing-library/react`.
- **Accessibility:** Included deep ARIA integration (`aria-label`, `aria-live`, structural semantic roles, and tab navigability) for screen reader support.

## Assumptions Made
- The values for carbon cost per activity are approximated averages meant for educational translation.
- The leaderboard is currently populated with static mock teams.
- "Flourishing" vs "Critical" ecosystem states are scaled linearly for demonstration purposes within a standard weekly budget.
