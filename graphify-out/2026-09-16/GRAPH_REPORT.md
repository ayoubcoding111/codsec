# Graph Report - portfolio - Copy  (2026-09-16)

## Corpus Check
- 2 files · ~10,348 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 23 nodes · 23 edges · 2 communities (1 shown, 1 thin omitted)
- Extraction: 83% EXTRACTED · 17% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9fe1e982`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- script.js
- requestActiveNav

## God Nodes (most connected - your core abstractions)
1. `updateActiveNav()` - 2 edges
2. `requestActiveNav()` - 2 edges
3. `menuToggle` - 1 edges
4. `mobileMenu` - 1 edges
5. `iconOpen` - 1 edges
6. `iconClose` - 1 edges
7. `panels` - 1 edges
8. `heroContent` - 1 edges
9. `scrollHint` - 1 edges
10. `navLinks` - 1 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (2 total, 1 thin omitted)

### Community 0 - "script.js"
Cohesion: 0.10
Nodes (15): canvas, counters, heroContent, iconClose, iconOpen, menuToggle, mobileMenu, navLinks (+7 more)

## Knowledge Gaps
- **15 isolated node(s):** `menuToggle`, `mobileMenu`, `iconOpen`, `iconClose`, `panels` (+10 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 20 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Are the 2 inferred relationships involving `requestActiveNav()` (e.g. with `script.js` and `updateActiveNav()`) actually correct?**
  _`requestActiveNav()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `menuToggle`, `mobileMenu`, `iconOpen` to the rest of the system?**
  _15 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `script.js` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._