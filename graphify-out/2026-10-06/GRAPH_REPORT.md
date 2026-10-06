# Graph Report - codsec  (2026-10-02)

## Corpus Check
- 4 files · ~767,015 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 83 nodes · 78 edges · 19 communities (8 shown, 11 thin omitted)
- Extraction: 78% EXTRACTED · 22% INFERRED · 0% AMBIGUOUS · INFERRED: 17 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8a40e64d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- script.js
- Projects List Section
- requestActiveNav
- CodSec — Build Strong, Build Smart
- ✨ Site features (everything on this site)
- 💼 Featured work — real builds, no mockups
- Codsec Brand Logo
- Secure Backend and API Engineering Service
- GitHub Repo ayoubcoding111 restaurent
- Live Kitchen Feed and Admin Portal
- About Us Section
- Contact Footer
- Process Timeline From Idea To Launch
- Technologies Marquee Band
- Shared Video Background Component
- Live Order Tracking Feature
- Ordering and Cart Feature
- Craft Details and Documented API
- Drag and Drop Kanban Board

## God Nodes (most connected - your core abstractions)
1. `✨ Site features (everything on this site)` - 12 edges
2. `CodSec — Build Strong, Build Smart` - 10 edges
3. `💼 Featured work — real builds, no mockups` - 5 edges
4. `Projects List Section` - 5 edges
5. `Restaurant Ordering Platform Detail Page` - 5 edges
6. `Todo Kanban Task Manager Detail Page` - 5 edges
7. `Services Section` - 4 edges
8. `Codsec Brand Logo` - 4 edges
9. `Full-Stack Web Development Service` - 3 edges
10. `Portfolio Homepage` - 3 edges

## Surprising Connections (you probably didn't know these)
- `Hardened Auth and Trilingual RTL Polish` --semantically_similar_to--> `Secure Login and Dark Mode Experience`  [INFERRED] [semantically similar]
  project-restaurant.html → project-todo.html
- `Live GitHub README Section Restaurant` --semantically_similar_to--> `Live GitHub README Section Todo`  [INFERRED] [semantically similar]
  project-restaurant.html → project-todo.html
- `Live Kitchen Feed and Admin Portal` --semantically_similar_to--> `Admin Oversight Dashboard`  [INFERRED] [semantically similar]
  project-restaurant.html → project-todo.html
- `Restaurant Website Project Card` --references--> `Restaurant Ordering Platform Detail Page`  [EXTRACTED]
  index.html → project-restaurant.html
- `Todo Task Manager Project Card` --references--> `Todo Kanban Task Manager Detail Page`  [EXTRACTED]
  index.html → project-todo.html

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Homepage to detail bidirectional navigation loop** — index_project_restaurant_card, project_restaurant_page, project_todo_page [EXTRACTED 1.00]
- **Code Plus Security Brand Mark** — assets_mylogo_logo, assets_mylogo_shield_motif, assets_mylogo_code_motif [INFERRED 0.85]
- **Shared live GitHub README fetch with cache and fallback** — project_restaurant_live_readme, project_todo_live_readme, project_restaurant_github_repo, project_todo_github_repo [INFERRED 0.85]

## Communities (19 total, 11 thin omitted)

### Community 0 - "script.js"
Cohesion: 0.10
Nodes (14): counters, heroContent, iconClose, iconOpen, menuToggle, mobileMenu, navLinks, panels (+6 more)

### Community 1 - "Projects List Section"
Cohesion: 0.29
Nodes (11): Hero Section - Build Strong Build Smart, Portfolio Homepage, Restaurant Website Project Card, Todo Task Manager Project Card, Projects List Section, Full-Stack Web Development Service, UI/UX Design Service, Services Section (+3 more)

### Community 3 - "CodSec — Build Strong, Build Smart"
Cohesion: 0.22
Nodes (8): CodSec — Build Strong, Build Smart, 📊 Performance & accessibility choices, 📁 Project structure, 🚀 Quick start, 🗺️ Roadmap, 🧰 Tech stack, 👀 Why recruiters stop here, 🤝 Work with me

### Community 4 - "✨ Site features (everything on this site)"
Cohesion: 0.17
Nodes (12): 🙋 About — "Your unfair advantage online", 🎬 Cinematic hero, 📞 Contact + quote funnel, 🖱️ Custom cursor + buttery scroll, ❓ FAQ accordion, 🧭 Navigation (fixed, accessible), 📈 Process — "From idea to launch", 📄 Project detail pages (the deep dives) (+4 more)

### Community 5 - "💼 Featured work — real builds, no mockups"
Cohesion: 0.40
Nodes (5): 1. 🍕 Delicious Restaurant — full-stack ordering platform, 2. 📝 TodoList — enterprise Kanban task manager, 3. 🦷 Pacific Dental Clinic — bilingual FR/AR clinic site, 4. ☁️ Above the Clouds — cinematic private-jet landing page, 💼 Featured work — real builds, no mockups

### Community 8 - "Codsec Brand Logo"
Cohesion: 0.50
Nodes (5): Codsec Agency Brand Identity, Code Bracket and Slash Motif for Development, Codsec Brand Logo, Shield Motif for Security, Monochrome Minimalist Visual Style

### Community 10 - "Secure Backend and API Engineering Service"
Cohesion: 0.67
Nodes (4): Secure Backend and API Engineering Service, Secure by default design principle, Hardened Auth and Trilingual RTL Polish, Secure Login and Dark Mode Experience

### Community 11 - "GitHub Repo ayoubcoding111 restaurent"
Cohesion: 0.67
Nodes (4): GitHub Repo ayoubcoding111 restaurent, Live GitHub README Section Restaurant, GitHub Repo ayoubcoding111 firstapp, Live GitHub README Section Todo

## Knowledge Gaps
- **50 isolated node(s):** `menuToggle`, `mobileMenu`, `iconOpen`, `iconClose`, `panels` (+45 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 58 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `CodSec — Build Strong, Build Smart` connect `CodSec — Build Strong, Build Smart` to `✨ Site features (everything on this site)`, `💼 Featured work — real builds, no mockups`?**
  _High betweenness centrality (0.067) - this node is a cross-community bridge._
- **Why does `✨ Site features (everything on this site)` connect `✨ Site features (everything on this site)` to `CodSec — Build Strong, Build Smart`?**
  _High betweenness centrality (0.063) - this node is a cross-community bridge._
- **Why does `💼 Featured work — real builds, no mockups` connect `💼 Featured work — real builds, no mockups` to `CodSec — Build Strong, Build Smart`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Restaurant Ordering Platform Detail Page` (e.g. with `Portfolio Homepage` and `Full-Stack Web Development Service`) actually correct?**
  _`Restaurant Ordering Platform Detail Page` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `menuToggle`, `mobileMenu`, `iconOpen` to the rest of the system?**
  _50 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `script.js` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._