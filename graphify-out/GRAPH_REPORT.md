# Graph Report - wwwboldr  (2026-11-16)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 117 nodes · 145 edges · 13 communities (11 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `27ba3584`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 5
- Community 6
- Community 8
- Community 9
- Community 10
- Community 11
- Community 12

## God Nodes (most connected - your core abstractions)
1. `steps` - 5 edges
2. `scripts` - 4 edges
3. `astro` - 4 edges
4. `@astrojs/sitemap` - 3 edges
5. `update-graph` - 3 edges
6. `push` - 3 edges
7. `require` - 3 edges
8. `astro@^7.4.4` - 2 edges
9. `@astrojs/sitemap@^3.7.4` - 2 edges
10. `@fontsource-variable/dm-sans@^5.3.0` - 2 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (13 total, 2 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.13
Nodes (15): dependencies, astro@^7.4.4, @astrojs/sitemap@^3.7.4, @fontsource-variable/dm-sans@^5.3.0, name, private, scripts, build (+7 more)

### Community 1 - "Community 1"
Cohesion: 0.12
Nodes (16): jobs, update-graph, name, on, push, permissions, contents, branches (+8 more)

### Community 2 - "Community 2"
Cohesion: 0.14
Nodes (5): canonical, liens, organisation, Props, profils

### Community 3 - "Community 3"
Cohesion: 0.24
Nodes (5): segments, Props, lignes, cas, cibles

### Community 4 - "Community 4"
Cohesion: 0.22
Nodes (8): config, vendor-dir, description, name, require, php, phpmailer/phpmailer, type

### Community 5 - "Community 5"
Cohesion: 0.38
Nodes (3): articles, Props, services

### Community 6 - "Community 6"
Cohesion: 0.29
Nodes (4): Props, lignes, cas, services

### Community 9 - "Community 9"
Cohesion: 0.33
Nodes (5): articles, cas, cible, collections, services

### Community 10 - "Community 10"
Cohesion: 0.40
Nodes (4): astro/tsconfigs/strict, exclude, extends, include

### Community 11 - "Community 11"
Cohesion: 0.40
Nodes (3): Props, cas, services

### Community 12 - "Community 12"
Cohesion: 0.40
Nodes (3): form, menu, stage

## Knowledge Gaps
- **1 isolated node(s):** `astro/tsconfigs/strict`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 70 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `astro` connect `Community 0` to `Community 9`?**
  _High betweenness centrality (0.155) - this node is a cross-community bridge._
- **What connects `astro/tsconfigs/strict` to the rest of the system?**
  _1 weakly-connected nodes found - possible missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.1286549707602339 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._