import React from 'react';
import CodeGameLayout, { GameLinks, GameVideo, SummaryItem, GameLink } from './CodeGameLayout';

const LINKS: GameLink[] = [{ label: 'GitHub repo', href: 'https://github.com/engamy/lightemall' }];

const summary: SummaryItem[] = [
  { icon: 'i-columns', label: 'Timeline', value: 'Spring 2024, Fundamentals of Computer Science II' },
  { icon: 'i-code', label: 'Stack', value: 'Java, the course’s javalib world library, Tester library' },
  { icon: 'i-modules', label: 'Algorithms', value: 'Kruskal’s algorithm, depth-first search' },
  { icon: 'i-target', label: 'Outcome', value: 'Randomly generated puzzle boards that can always be solved' },
];

// ---------- Kruskal diagram ----------
// A 3x3 board as a graph: nodes are tiles, edges join neighbouring tiles.
// Weights are an example; the game draws a random 1-99 for every edge.

type EdgeSpec = { a: number; b: number; w: number };

const EDGES: EdgeSpec[] = [
  { a: 0, b: 1, w: 12 }, { a: 1, b: 2, w: 47 },
  { a: 3, b: 4, w: 8 }, { a: 4, b: 5, w: 33 },
  { a: 6, b: 7, w: 61 }, { a: 7, b: 8, w: 5 },
  { a: 0, b: 3, w: 27 }, { a: 1, b: 4, w: 71 }, { a: 2, b: 5, w: 19 },
  { a: 3, b: 6, w: 44 }, { a: 4, b: 7, w: 52 }, { a: 5, b: 8, w: 90 },
];

// Kruskal's on the weights above: take edges cheapest first, skipping any
// that would join two tiles already in the same tree.
const MST = new Set(['7-8', '3-4', '0-1', '2-5', '0-3', '4-5', '3-6', '4-7']);
const key = (e: EdgeSpec) => `${e.a}-${e.b}`;

const GAP = 80;
const PAD = 30;
const pos = (n: number) => ({ x: PAD + (n % 3) * GAP, y: PAD + Math.floor(n / 3) * GAP });

const KruskalGraph: React.FC = () => (
  <svg className="cg-svg" viewBox="0 0 220 220" aria-hidden="true">
    {EDGES.map(e => {
      const p = pos(e.a);
      const q = pos(e.b);
      const inTree = MST.has(key(e));
      const mx = (p.x + q.x) / 2;
      const my = (p.y + q.y) / 2;
      return (
        <g key={key(e)}>
          <line
            x1={p.x} y1={p.y} x2={q.x} y2={q.y}
            className={inTree ? 'le-edge le-edge--tree' : 'le-edge le-edge--skip'}
          />
          <rect x={mx - 11} y={my - 8} width={22} height={16} rx={4} className="le-weight-bg" />
          <text x={mx} y={my + 4} textAnchor="middle" className="le-weight">{e.w}</text>
        </g>
      );
    })}
    {Array.from({ length: 9 }).map((_, n) => {
      const p = pos(n);
      return <circle key={n} cx={p.x} cy={p.y} r={9} className="le-node" />;
    })}
  </svg>
);

// ---------- Board diagram ----------
// The same tree drawn as tiles: each tile has a wire towards every tile it
// is joined to. `broken` rotates one tile to show the lighting stop.

type Dir = 'top' | 'right' | 'bottom' | 'left';

const wiresFromTree = (): Dir[][] => {
  const wires: Dir[][] = Array.from({ length: 9 }, () => []);
  EDGES.filter(e => MST.has(key(e))).forEach(({ a, b }) => {
    if (b === a + 1) {
      wires[a].push('right');
      wires[b].push('left');
    } else {
      wires[a].push('bottom');
      wires[b].push('top');
    }
  });
  return wires;
};

const TILE = 70;
const STATION = 4;

const Board: React.FC<{ broken?: boolean }> = ({ broken }) => {
  const wires = wiresFromTree();
  // Rotating tile 5 a quarter turn: its left wire becomes a top wire, so it
  // no longer meets the tile to its left, and the two tiles past it go dark.
  if (broken) wires[5] = ['top', 'right'];
  const unlit = broken ? new Set([2, 5]) : new Set<number>();
  return (
    <svg className="cg-svg" viewBox={`0 0 ${TILE * 3} ${TILE * 3}`} aria-hidden="true">
      {wires.map((dirs, n) => {
        const x = (n % 3) * TILE;
        const y = Math.floor(n / 3) * TILE;
        const cx = x + TILE / 2;
        const cy = y + TILE / 2;
        const lit = !unlit.has(n);
        const end: Record<Dir, [number, number]> = {
          top: [cx, y], bottom: [cx, y + TILE], left: [x, cy], right: [x + TILE, cy],
        };
        return (
          <g key={n}>
            <rect x={x} y={y} width={TILE} height={TILE} className="le-tile" />
            {dirs.map(d => (
              <line
                key={d}
                x1={cx} y1={cy} x2={end[d][0]} y2={end[d][1]}
                className={lit ? 'le-wire le-wire--lit' : 'le-wire'}
              />
            ))}
            <rect x={cx - 5} y={cy - 5} width={10} height={10} className={lit ? 'le-hub le-hub--lit' : 'le-hub'} />
            {n === STATION && <circle cx={cx} cy={cy} r={11} className="le-station" />}
            {broken && n === 5 && <rect x={x + 2} y={y + 2} width={TILE - 4} height={TILE - 4} className="le-rotated" />}
          </g>
        );
      })}
    </svg>
  );
};

export default function CodeLightEmAllCasestudy() {
  return (
    <CodeGameLayout
      modifier="cg--lightemall"
      title="LightEmAll: Generating Solvable Puzzles with Kruskal's Algorithm"
      summary={summary}
      links={LINKS}
    >
      <section className="cg-section">
        <h2>Overview</h2>
        <div className="cg-split">
          <div className="cg-prose">
            <p>
              LightEmAll is a puzzle game on a grid of wire tiles. One tile holds a{' '}
              <strong>power station</strong>, and power flows out of it along any wires that line
              up with their neighbours. Lit wires turn yellow.
            </p>
            <p>
              <strong>Clicking</strong> a tile rotates it a quarter turn.{' '}
              <strong>Arrow keys</strong> move the power station, but only along a wire that
              connects both tiles. You win when every tile on the board is lit.
            </p>
            <p>
              The interesting part is the board itself: it is generated randomly every game, and
              it is always possible to connect.
            </p>
          </div>
          <GameVideo file="lightemall.mp4" caption="Gameplay demo" />
        </div>
      </section>

      <section className="cg-section">
        <h2>Building the Board with Kruskal&rsquo;s Algorithm</h2>
        <div className="cg-prose">
          <p>
            The game treats the board as a <strong>graph</strong>: every tile is a node, and every
            pair of neighbouring tiles is joined by an edge with a random weight from 1 to 99.
            Kruskal&rsquo;s algorithm then builds a <strong>minimum spanning tree</strong>. It
            sorts the edges from cheapest to most expensive, keeps an edge only if it joins two
            tiles that aren&rsquo;t already connected, and skips any edge that would close a loop.
          </p>
          <p>
            A spanning tree reaches every tile with no loops, so drawing a wire along each kept
            edge gives a board where every tile has a path to every other. Because the weights are
            random, the tree, and so the puzzle, is different every game.
          </p>
        </div>
        <figure className="cg-diagram cg-after">
          <div className="cg-diagram-pair">
            <div>
              <h4>1. Weighted edges</h4>
              <KruskalGraph />
              <p className="cg-note">
                Solid edges are kept, cheapest first. Dashed edges are skipped because both ends
                are already connected.
              </p>
            </div>
            <div>
              <h4>2. The board it becomes</h4>
              <Board />
              <p className="cg-note">
                A wire runs along each kept edge. The circle marks the power station.
              </p>
            </div>
          </div>
        </figure>
        <p className="cg-note">Example weights for a 3 &times; 3 board.</p>
      </section>

      <section className="cg-section">
        <h2>Lighting the Wires with Depth-First Search</h2>
        <div className="cg-split">
          <div className="cg-prose">
            <p>
              After every click or key press, the game clears all the power, then lights the board
              again from the power station. Each lit tile checks its four sides. Where it has a
              wire and the neighbour has a matching wire facing back, the neighbour lights up and
              runs the same check on <strong>its</strong> neighbours.
            </p>
            <p>
              This is a recursive <strong>depth-first search</strong>: it follows one connected
              path as far as it goes before backing up to try the next. A tile that is already lit
              isn&rsquo;t visited again, so the search ends once every reachable tile is lit.
            </p>
            <p>
              The win check is simple: after each move, if every tile is lit, the game shows
              &ldquo;you won!&rdquo;.
            </p>
          </div>
          <figure className="cg-diagram">
            <h4>One tile rotated out of place</h4>
            <Board broken />
            <p className="cg-note">
              The outlined tile no longer has a wire facing the station&rsquo;s side, so the search
              can&rsquo;t reach it or the tile beyond it, and both stay grey.
            </p>
          </figure>
        </div>
      </section>

      <section className="cg-section">
        <div className="cg-split">
          <div>
            <h2>Code and Testing</h2>
            <div className="cg-prose">
              <p>
                The code is four classes: <code>LightEmAllWorld</code> runs the game, handles
                clicks and keys, and builds the board; <code>GamePiece</code> is one tile, with a
                wire flag for each side; <code>Edge</code> joins two tiles with a weight; and{' '}
                <code>ExamplesLightEmAll</code> holds the tests.
              </p>
              <p>
                Random weights are hard to test, so the board-building methods have test-only
                twins that use fixed weights instead. That made it possible to check the edge
                list, the sorting and Kruskal&rsquo;s result exactly. The examples class has 25
                test methods covering these, the lighting, rotation, clicks, key presses and the
                win check.
              </p>
            </div>
          </div>
          <div>
            <h2>Links</h2>
            <GameLinks links={LINKS} />
          </div>
        </div>
      </section>
    </CodeGameLayout>
  );
}
