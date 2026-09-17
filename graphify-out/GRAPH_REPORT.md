# Graph Report - codsec  (2026-09-17)

## Corpus Check
- 3 files · ~316,710 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 87 nodes · 90 edges · 20 communities (9 shown, 11 thin omitted)
- Extraction: 63% EXTRACTED · 37% INFERRED · 0% AMBIGUOUS · INFERRED: 33 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `424d2212`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- script.js
- Projects List Section
- requestActiveNav
- Admin Analytics Dashboard Screenshot
- Cart Checkout Screenshot
- Menu Item Card Grid
- Hero Screenshot Image
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
1. `Admin Analytics Dashboard Screenshot` - 6 edges
2. `Projects List Section` - 5 edges
3. `Restaurant Ordering Platform Detail Page` - 5 edges
4. `Todo Kanban Task Manager Detail Page` - 5 edges
5. `Cart Checkout Screenshot` - 5 edges
6. `Menu Item Card Grid` - 5 edges
7. `Services Section` - 4 edges
8. `Restaurant Cart Checkout View` - 4 edges
9. `Hero Screenshot Image` - 4 edges
10. `Codsec Brand Logo` - 4 edges

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
- **Menu Card Purchase Pattern** — assets_menu_menu_card_grid, assets_menu_purchase_actions, assets_menu_availability_system [EXTRACTED 1.00]
- **Homepage to detail bidirectional navigation loop** — index_project_restaurant_card, project_restaurant_page, project_todo_page [EXTRACTED 1.00]
- **Dashboard Sales Performance Insight Flow** — assets_analytics_revenue_per_day_chart, assets_analytics_orders_vs_delivered_chart, assets_analytics_top_selling_items_panel [INFERRED 0.85]
- **Cart Checkout Flow** — assets_cart_cart_checkout_view, assets_cart_cart_line_item, assets_cart_order_summary_actions [INFERRED 0.85]
- **Restaurant Landing Hero Composition** — assets_hero_navbar, assets_hero_hero_banner, assets_hero_cta_view_menu [INFERRED 0.85]
- **Code Plus Security Brand Mark** — assets_mylogo_logo, assets_mylogo_shield_motif, assets_mylogo_code_motif [INFERRED 0.85]
- **Shared live GitHub README fetch with cache and fallback** — project_restaurant_live_readme, project_todo_live_readme, project_restaurant_github_repo, project_todo_github_repo [INFERRED 0.85]

## Communities (20 total, 11 thin omitted)

### Community 0 - "script.js"
Cohesion: 0.09
Nodes (16): canvas, counters, heroContent, iconClose, iconOpen, menuToggle, mobileMenu, navLinks (+8 more)

### Community 1 - "Projects List Section"
Cohesion: 0.29
Nodes (11): Hero Section - Build Strong Build Smart, Portfolio Homepage, Restaurant Website Project Card, Todo Task Manager Project Card, Projects List Section, Full-Stack Web Development Service, UI/UX Design Service, Services Section (+3 more)

### Community 3 - "Admin Analytics Dashboard Screenshot"
Cohesion: 0.36
Nodes (8): Dark Theme Dashboard Layout, Delicious Staff Admin Dashboard, Orders By Status All Time Panel, Orders Vs Delivered Per Day Chart, Revenue Per Day Last 14 Days Chart, Admin Analytics Dashboard Screenshot, Sidebar Navigation Menu, Top Selling Items Panel

### Community 4 - "Cart Checkout Screenshot"
Cohesion: 0.48
Nodes (7): Restaurant Cart Checkout View, Cart Line Item Row, Dark Theme Card Design, Navigation Header with Cart Badge, Order Summary and Actions, Quantity Stepper Control, Cart Checkout Screenshot

### Community 5 - "Menu Item Card Grid"
Cohesion: 0.38
Nodes (7): Availability and Rating Badges, Dark Theme with Red Accent Design, Restaurant Menu Browsing Purpose, Menu Item Card Grid, Top Navigation Bar, Add to Cart and Order Now Actions, Delicious Menu Page Screenshot

### Community 7 - "Hero Screenshot Image"
Cohesion: 0.47
Nodes (6): Delicious Brand Identity Header, View Menu Call To Action Button, Pizza Food Photography Background Design, Welcome to Delicious Restaurant Hero Banner, Hero Screenshot Image, Top Navigation Bar with Home Menu Track Contact Cart Language and Theme Toggle

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
- **36 isolated node(s):** `menuToggle`, `mobileMenu`, `iconOpen`, `iconClose`, `panels` (+31 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 43 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Services Section` connect `Projects List Section` to `Secure Backend and API Engineering Service`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **Why does `Secure Backend and API Engineering Service` connect `Secure Backend and API Engineering Service` to `Projects List Section`?**
  _High betweenness centrality (0.009) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Restaurant Ordering Platform Detail Page` (e.g. with `Portfolio Homepage` and `Full-Stack Web Development Service`) actually correct?**
  _`Restaurant Ordering Platform Detail Page` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `Todo Kanban Task Manager Detail Page` (e.g. with `Portfolio Homepage` and `Full-Stack Web Development Service`) actually correct?**
  _`Todo Kanban Task Manager Detail Page` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `menuToggle`, `mobileMenu`, `iconOpen` to the rest of the system?**
  _36 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `script.js` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._