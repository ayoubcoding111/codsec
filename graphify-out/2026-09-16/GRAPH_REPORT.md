# Graph Report - portfolio - Copy  (2026-09-16)

## Corpus Check
- 14 files · ~312,752 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 109 nodes · 120 edges · 22 communities (12 shown, 10 thin omitted)
- Extraction: 62% EXTRACTED · 38% INFERRED · 0% AMBIGUOUS · INFERRED: 45 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Site JavaScript
- Homepage Structure
- Todo Login Screens
- Restaurant Analytics
- Restaurant Cart
- Restaurant Menu
- Todo User Board
- Restaurant Hero
- Brand Logo
- Todo Admin Board
- Security Theme
- Live README Pattern
- Admin Dashboards
- About Section
- Contact Footer
- Process Timeline
- Tech Marquee
- Video Background
- Order Tracking
- Ordering Cart
- Craft API Details
- Kanban Board

## God Nodes (most connected - your core abstractions)
1. `Admin Analytics Dashboard Screenshot` - 6 edges
2. `Login Dark Screenshot` - 6 edges
3. `Projects List Section` - 5 edges
4. `Restaurant Ordering Platform Detail Page` - 5 edges
5. `Todo Kanban Task Manager Detail Page` - 5 edges
6. `Cart Checkout Screenshot` - 5 edges
7. `Menu Item Card Grid` - 5 edges
8. `TodoList Login Light Mode Screenshot` - 5 edges
9. `TodoList User Dashboard Screenshot` - 5 edges
10. `Services Section` - 4 edges

## Surprising Connections (you probably didn't know these)
- `Live Kitchen Feed and Admin Portal` --semantically_similar_to--> `Admin Oversight Dashboard`  [INFERRED] [semantically similar]
  project-restaurant.html → project-todo.html
- `Hardened Auth and Trilingual RTL Polish` --semantically_similar_to--> `Secure Login and Dark Mode Experience`  [INFERRED] [semantically similar]
  project-restaurant.html → project-todo.html
- `Live GitHub README Section Restaurant` --semantically_similar_to--> `Live GitHub README Section Todo`  [INFERRED] [semantically similar]
  project-restaurant.html → project-todo.html
- `Portfolio Homepage` --shares_data_with--> `Restaurant Ordering Platform Detail Page`  [INFERRED]
  index.html → project-restaurant.html
- `Portfolio Homepage` --shares_data_with--> `Todo Kanban Task Manager Detail Page`  [INFERRED]
  index.html → project-todo.html

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Homepage to detail bidirectional navigation loop** — index_project_restaurant_card, project_restaurant_page, project_todo_page [EXTRACTED 1.00]
- **Shared live GitHub README fetch with cache and fallback** — project_restaurant_live_readme, project_todo_live_readme, project_restaurant_github_repo, project_todo_github_repo [INFERRED 0.85]
- **Dashboard Sales Performance Insight Flow** — assets_analytics_revenue_per_day_chart, assets_analytics_orders_vs_delivered_chart, assets_analytics_top_selling_items_panel [INFERRED 0.85]
- **Cart Checkout Flow** — assets_cart_cart_checkout_view, assets_cart_cart_line_item, assets_cart_order_summary_actions [INFERRED 0.85]
- **Restaurant Landing Hero Composition** — assets_hero_navbar, assets_hero_hero_banner, assets_hero_cta_view_menu [INFERRED 0.85]
- **Menu Card Purchase Pattern** — assets_menu_menu_card_grid, assets_menu_purchase_actions, assets_menu_availability_system [EXTRACTED 1.00]
- **Code Plus Security Brand Mark** — assets_mylogo_logo, assets_mylogo_shield_motif, assets_mylogo_code_motif [INFERRED 0.85]
- **Admin Kanban Task Workflow** — todo_pic_admin_dashboard_image, todo_pic_admin_dashboard_kanban_board, todo_pic_admin_dashboard_sidebar_stats [INFERRED 0.85]
- **Admin Oversight Dashboard Pattern** — todo_pic_admin_dashboard_admin_view, todo_pic_admin_dashboard_kanban_board, todo_pic_admin_dashboard_sidebar_stats [INFERRED 0.75]
- **Dark Mode Auth Experience** — todo_pic_login_dark_screenshot, todo_pic_login_dark_login_card, todo_pic_login_dark_dark_mode, todo_pic_login_dark_theme_toggle [INFERRED 0.85]
- **TodoList Authentication Flow** — todo_pic_login_dark_login_card, todo_pic_login_dark_auth_tabs, todo_pic_login_dark_login_form [INFERRED 0.85]
- **Light Mode Login Authentication Experience** — todo_pic_login_light_login_card, todo_pic_login_dark_auth_tabs, todo_pic_login_dark_login_form [INFERRED 0.85]
- **Kanban Task Workflow** — todo_pic_user_dashboard_kanban_board, todo_pic_user_dashboard_task_card, todo_pic_user_dashboard_drag_drop_interaction [INFERRED 0.85]

## Communities (22 total, 10 thin omitted)

### Community 0 - "Site JavaScript"
Cohesion: 0.09
Nodes (17): canvas, counters, heroContent, iconClose, iconOpen, menuToggle, mobileMenu, navLinks (+9 more)

### Community 1 - "Homepage Structure"
Cohesion: 0.29
Nodes (11): Hero Section - Build Strong Build Smart, Portfolio Homepage, Restaurant Website Project Card, Todo Task Manager Project Card, Projects List Section, Full-Stack Web Development Service, UI/UX Design Service, Services Section (+3 more)

### Community 2 - "Todo Login Screens"
Cohesion: 0.31
Nodes (11): Log In Sign Up Tab Switcher, Dark Mode Theme Design, Centered Login Card Layout, Email Password Login Form, Login Dark Screenshot, Theme Toggle Button, TodoList Portfolio Project, Light Mode Minimal Design System (+3 more)

### Community 3 - "Restaurant Analytics"
Cohesion: 0.36
Nodes (8): Dark Theme Dashboard Layout, Delicious Staff Admin Dashboard, Orders By Status All Time Panel, Orders Vs Delivered Per Day Chart, Revenue Per Day Last 14 Days Chart, Admin Analytics Dashboard Screenshot, Sidebar Navigation Menu, Top Selling Items Panel

### Community 4 - "Restaurant Cart"
Cohesion: 0.48
Nodes (7): Restaurant Cart Checkout View, Cart Line Item Row, Dark Theme Card Design, Navigation Header with Cart Badge, Order Summary and Actions, Quantity Stepper Control, Cart Checkout Screenshot

### Community 5 - "Restaurant Menu"
Cohesion: 0.38
Nodes (7): Availability and Rating Badges, Dark Theme with Red Accent Design, Restaurant Menu Browsing Purpose, Menu Item Card Grid, Top Navigation Bar, Add to Cart and Order Now Actions, Delicious Menu Page Screenshot

### Community 6 - "Todo User Board"
Cohesion: 0.38
Nodes (7): Dark Theme Design Decision, Drag and Drop Status Update Interaction, App Header with Auth Controls, Kanban Board with Status Columns, TodoList User Dashboard Screenshot, Task Card GYM Example, Task Creation Form

### Community 7 - "Restaurant Hero"
Cohesion: 0.47
Nodes (6): Delicious Brand Identity Header, View Menu Call To Action Button, Pizza Food Photography Background Design, Welcome to Delicious Restaurant Hero Banner, Hero Screenshot Image, Top Navigation Bar with Home Menu Track Contact Cart Language and Theme Toggle

### Community 8 - "Brand Logo"
Cohesion: 0.50
Nodes (5): Codsec Agency Brand Identity, Code Bracket and Slash Motif for Development, Codsec Brand Logo, Shield Motif for Security, Monochrome Minimalist Visual Style

### Community 9 - "Todo Admin Board"
Cohesion: 0.60
Nodes (5): Admin User Management View, Dark Mode Dashboard UI Design, Admin Dashboard Screenshot, Four-Column Kanban Board, Sidebar Stats and User List

### Community 10 - "Security Theme"
Cohesion: 0.67
Nodes (4): Secure Backend and API Engineering Service, Secure by default design principle, Hardened Auth and Trilingual RTL Polish, Secure Login and Dark Mode Experience

### Community 11 - "Live README Pattern"
Cohesion: 0.67
Nodes (4): GitHub Repo ayoubcoding111 restaurent, Live GitHub README Section Restaurant, GitHub Repo ayoubcoding111 firstapp, Live GitHub README Section Todo

## Knowledge Gaps
- **39 isolated node(s):** `menuToggle`, `mobileMenu`, `iconOpen`, `iconClose`, `panels` (+34 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 46 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Services Section` connect `Homepage Structure` to `Security Theme`?**
  _High betweenness centrality (0.009) - this node is a cross-community bridge._
- **Why does `Secure Backend and API Engineering Service` connect `Security Theme` to `Homepage Structure`?**
  _High betweenness centrality (0.006) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Restaurant Ordering Platform Detail Page` (e.g. with `Portfolio Homepage` and `Full-Stack Web Development Service`) actually correct?**
  _`Restaurant Ordering Platform Detail Page` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `Todo Kanban Task Manager Detail Page` (e.g. with `Portfolio Homepage` and `Full-Stack Web Development Service`) actually correct?**
  _`Todo Kanban Task Manager Detail Page` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `menuToggle`, `mobileMenu`, `iconOpen` to the rest of the system?**
  _39 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Site JavaScript` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._