# Graph Report - portfolio  (2026-09-16)

## Corpus Check
- 2 files · ~8,857 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 16 nodes · 15 edges · 1 communities
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7aa4582b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- script.js

## God Nodes (most connected - your core abstractions)
1. `menuToggle` - 1 edges
2. `mobileMenu` - 1 edges
3. `iconOpen` - 1 edges
4. `iconClose` - 1 edges
5. `panels` - 1 edges
6. `heroContent` - 1 edges
7. `scrollHint` - 1 edges
8. `navLinks` - 1 edges
9. `skillsTrack` - 1 edges
10. `video` - 1 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (1 total, 0 thin omitted)

### Community 0 - "script.js"
Cohesion: 0.12
Nodes (11): canvas, heroContent, iconClose, iconOpen, menuToggle, mobileMenu, navLinks, panels (+3 more)

## Knowledge Gaps
- **11 isolated node(s):** `menuToggle`, `mobileMenu`, `iconOpen`, `iconClose`, `panels` (+6 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 15 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What connects `menuToggle`, `mobileMenu`, `iconOpen` to the rest of the system?**
  _11 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `script.js` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._