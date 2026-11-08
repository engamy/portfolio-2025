import React from 'react';
import CodeGameLayout, { GameLinks, GameVideo, SummaryItem, GameLink } from './CodeGameLayout';

const LINKS: GameLink[] = [{ label: 'GitHub repo', href: 'https://github.com/engamy/pipe-fantasy' }];

const summary: SummaryItem[] = [
  {
    icon: 'i-columns',
    label: 'Timeline',
    value: 'Fall 2023, Fundamentals of Computer Science I, built with my lab partner',
  },
  { icon: 'i-code', label: 'Stack', value: 'Racket (Intermediate Student Language with lambda), 2htdp/image and 2htdp/universe' },
  { icon: 'i-modules', label: 'Techniques', value: 'Data design, recursion on lists, higher-order functions' },
  { icon: 'i-target', label: 'Outcome', value: 'A timed pipe-laying game with a live score, covered by 68 check-expect tests' },
];

// ---------- Pipe diagrams ----------
// A Pipe is four booleans: an opening on the top, bottom, left and right.

type Open = { t: boolean; b: boolean; l: boolean; r: boolean };

const PIPES: { name: string; open: Open }[] = [
  { name: 'Top-bottom', open: { t: true, b: true, l: false, r: false } },
  { name: 'Left-right', open: { t: false, b: false, l: true, r: true } },
  { name: 'Top-left', open: { t: true, b: false, l: true, r: false } },
  { name: 'Top-right', open: { t: true, b: false, l: false, r: true } },
  { name: 'Bottom-left', open: { t: false, b: true, l: true, r: false } },
  { name: 'Bottom-right', open: { t: false, b: true, l: false, r: true } },
  { name: 'Cross', open: { t: true, b: true, l: true, r: true } },
];

const S = 60;

type Side = 't' | 'b' | 'l' | 'r';

// One tile: a grey pipe, with green goo along the sides listed in `goo`.
// A cross pipe the goo went straight through only fills one direction.
const PipeTile: React.FC<{ open: Open; goo?: Side[]; x?: number; y?: number; mark?: string }> = ({
  open, goo = [], x = 0, y = 0, mark,
}) => {
  const c = S / 2;
  const end: Record<Side, [number, number]> = { t: [c, 0], b: [c, S], l: [0, c], r: [S, c] };
  const sides = (Object.keys(end) as Side[]).filter(side => open[side]);
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={S} height={S} className={`pf-tile${mark ? ` pf-tile--${mark}` : ''}`} />
      {sides.map(side => (
        <line key={side} x1={c} y1={c} x2={end[side][0]} y2={end[side][1]} className="pf-pipe" />
      ))}
      <rect x={c - 10} y={c - 10} width={20} height={20} className="pf-pipe-hub" />
      {goo.map(side => (
        <line key={`g${side}`} x1={c} y1={c} x2={end[side][0]} y2={end[side][1]} className="pf-goo" />
      ))}
      {goo.length > 0 && <rect x={c - 4} y={c - 4} width={8} height={8} className="pf-goo-hub" />}
    </g>
  );
};

// The starting pipe, three pipes the goo has filled (it turns down at the
// bend and goes straight through the cross pipe), a bend it reaches next,
// and a pipe beside that bend with no opening facing it.
const FLOW: { col: number; row: number; open: Open; goo?: Side[]; mark?: string }[] = [
  { col: 0, row: 0, open: { t: false, b: false, l: false, r: true }, goo: ['r'], mark: 'start' },
  { col: 1, row: 0, open: { t: false, b: false, l: true, r: true }, goo: ['l', 'r'] },
  { col: 2, row: 0, open: { t: false, b: true, l: true, r: false }, goo: ['l', 'b'] },
  { col: 2, row: 1, open: { t: true, b: true, l: true, r: true }, goo: ['t', 'b'] },
  { col: 2, row: 2, open: { t: true, b: false, l: false, r: true } },
  { col: 3, row: 2, open: { t: true, b: true, l: false, r: false }, mark: 'blocked' },
];

const FlowDiagram: React.FC = () => (
  <svg className="cg-svg" viewBox={`0 0 ${S * 4} ${S * 3}`} aria-hidden="true">
    {Array.from({ length: 12 }).map((_, i) => (
      <rect key={i} x={(i % 4) * S} y={Math.floor(i / 4) * S} width={S} height={S} className="pf-empty" />
    ))}
    {FLOW.map(p => (
      <PipeTile key={`${p.col}-${p.row}`} open={p.open} goo={p.goo} x={p.col * S} y={p.row * S} mark={p.mark} />
    ))}
  </svg>
);

export default function CodePipeFantasyCasestudy() {
  return (
    <CodeGameLayout
      modifier="cg--pipefantasy"
      title="Pipe Fantasy: Implementing a Timed Puzzle Game in Racket"
      summary={summary}
      links={LINKS}
    >
      <section className="cg-section">
        <h2>Overview</h2>
        <div className="cg-split">
          <div className="cg-prose">
            <p>
              My lab partner and I implemented Pipe Fantasy for Fundamentals of Computer Science I,
              in one of Racket&rsquo;s teaching languages.
            </p>
            <p>
              The board starts with one <strong>starting pipe</strong> already full of goo. Below
              the grid is a queue of incoming pipes, and clicking a tile places the next one there.
              After a short delay the goo starts flowing, one tile at a time, through whatever
              pipes it meets. The goal is to lay a path that keeps it flowing as long as possible.
            </p>
            <p>
              The round ends when the goo reaches the edge of the board or a pipe it can&rsquo;t
              enter.
            </p>
          </div>
          <GameVideo file="pipefantasy_1.mp4" caption="Gameplay demo" />
        </div>
      </section>

      <section className="cg-section">
        <h2>Data Design</h2>
        <div className="cg-prose">
          <p>
            Every pipe is a <code>Pipe</code> structure of <strong>four booleans</strong>, one per
            side, where <code>#true</code> means there&rsquo;s an opening. That one definition
            covers the seven pipes you can place and the four starting pipes, which open on a
            single side.
          </p>
          <p>
            A placed pipe becomes a <code>GPipe</code>: the pipe plus its row and column, whether
            it has goo, the direction the goo entered, and whether a cross pipe can still take goo
            a second time. The <code>Grid</code> holds the list of placed pipes and how many have
            been replaced, a <code>GooFlow</code> holds the path the goo has taken and its
            current direction, and a <code>GameState</code> ties them together with the tick
            counter and the incoming queue.
          </p>
        </div>
        <figure className="cg-diagram cg-after pf-centered">
          <svg className="cg-svg pf-types" viewBox={`0 0 ${PIPES.length * (S + 16)} ${S + 30}`} aria-hidden="true">
            {PIPES.map((p, i) => (
              <g key={p.name}>
                <PipeTile open={p.open} x={i * (S + 16) + 8} y={0} />
                <text x={i * (S + 16) + 8 + S / 2} y={S + 20} textAnchor="middle" className="pf-label">
                  {p.name}
                </text>
              </g>
            ))}
          </svg>
          <p className="cg-note">The seven pipes a player can place.</p>
        </figure>
      </section>

      <section className="cg-section">
        <h2>How the Goo Propagates</h2>
        <div className="cg-split">
          <div className="cg-prose">
            <p>
              The game counts down <strong>140 ticks</strong> before the goo moves, then moves it
              one tile every <strong>28 ticks</strong>. Each move looks at the tile the goo is
              heading into. The goo enters only if there is a pipe there with an opening facing
              back at it. Once inside, it carries straight on if the pipe allows, and otherwise
              turns the way the pipe bends.
            </p>
            <p>
              A <strong>cross pipe</strong> always passes goo straight through, and it can be
              filled a second time when the path crosses itself.
            </p>
            <p>
              The game stops when moving the goo forward would leave it where it is: there is no
              pipe ahead, or the pipe ahead doesn&rsquo;t open toward it.
            </p>
          </div>
          <figure className="cg-diagram">
            <h4 className="pf-center-title">Goo propagating through placed pipes</h4>
            <FlowDiagram />
            <p className="cg-note">
              Goo leaves the starting pipe (top left), turns down at the bend and goes straight
              through the cross pipe. It can enter the bend below next, but the pipe to that
              bend&rsquo;s right has no opening on its left side, so propagation would stop there.
            </p>
          </figure>
        </div>
      </section>

      <section className="cg-section">
        <h2>Placing Pipes and Scoring</h2>
        <div className="cg-terms">
          <div className="cg-term">
            <h4>Placing</h4>
            <p>
              A click places the first pipe in the queue on the clicked tile and removes it from
              the queue. Clicks do nothing on a tile with goo in it, on the starting pipe, outside
              the grid, or once the queue is empty. The next three pipes are always shown under
              the board.
            </p>
          </div>
          <div className="cg-term">
            <h4>Scoring</h4>
            <p>
              Each pipe the goo fills is worth <strong>50 points</strong>, not counting the
              starting pipe. Placing a pipe over one that hasn&rsquo;t been filled yet replaces it
              and costs 50, so the score can drop below zero.
            </p>
          </div>
        </div>
      </section>

      <section className="cg-section">
        <div className="cg-split">
          <div>
            <h2>Code and Testing</h2>
            <div className="cg-prose">
              <p>
                The whole game is one Racket file built around <code>big-bang</code>: one function
                draws the game state, one advances it on each tick, one handles mouse clicks, and
                one decides when to stop. Functions come with signatures and purpose statements, and
                most are written as recursion over lists or with <code>filter</code>,{' '}
                <code>ormap</code> and <code>andmap</code>.
              </p>
              <p>
                The file has <strong>68 <code>check-expect</code> tests</strong>, covering placing
                and replacing pipes, the goo moving and turning, the stop condition, the tick
                handler and the score. Functions that depend on randomness or that only draw were
                left untested, as noted in the code.
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
