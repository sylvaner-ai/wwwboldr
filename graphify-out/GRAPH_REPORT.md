# Graph Report - BoldR  (2026-11-16)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 101 nodes · 136 edges · 9 communities (8 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2ace407a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 6
- Community 7
- Community 8

## God Nodes (most connected - your core abstractions)
1. `scripts` - 4 edges
2. `astro` - 4 edges
3. `@astrojs/sitemap` - 3 edges
4. `require` - 3 edges
5. `astro@^7.4.4` - 2 edges
6. `@astrojs/sitemap@^3.7.4` - 2 edges
7. `@fontsource-variable/dm-sans@^5.3.0` - 2 edges
8. `@fontsource-variable/dm-sans` - 2 edges
9. `config` - 2 edges
10. `Props` - 1 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (9 total, 1 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.12
Nodes (7): Props, canonical, liens, organisation, Props, Props, profils

### Community 1 - "Community 1"
Cohesion: 0.13
Nodes (15): dependencies, astro@^7.4.4, @astrojs/sitemap@^3.7.4, @fontsource-variable/dm-sans@^5.3.0, name, private, scripts, build (+7 more)

### Community 2 - "Community 2"
Cohesion: 0.23
Nodes (8): articles, Props, Props, cas, services, cas, services, services

### Community 3 - "Community 3"
Cohesion: 0.17
Nodes (7): lignes, segments, Props, Props, lignes, cas, cibles

### Community 4 - "Community 4"
Cohesion: 0.22
Nodes (8): config, vendor-dir, description, name, require, php, phpmailer/phpmailer, type

### Community 6 - "Community 6"
Cohesion: 0.33
Nodes (5): articles, cas, cible, collections, services

### Community 7 - "Community 7"
Cohesion: 0.40
Nodes (4): astro/tsconfigs/strict, exclude, extends, include

### Community 8 - "Community 8"
Cohesion: 0.40
Nodes (3): form, menu, stage

## Knowledge Gaps
- **1 isolated node(s):** `astro/tsconfigs/strict`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 61 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `astro` connect `Community 1` to `Community 6`?**
  _High betweenness centrality (0.213) - this node is a cross-community bridge._
- **What connects `astro/tsconfigs/strict` to the rest of the system?**
  _1 weakly-connected nodes found - possible missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.11578947368421053 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.1286549707602339 - nodes in this community are weakly interconnected._