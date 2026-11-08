import React from 'react';
import CodeGameLayout, { GameLinks, GameVideo, SummaryItem, GameLink } from './CodeGameLayout';

const LINKS: GameLink[] = [{ label: 'GitHub repo', href: 'https://github.com/engamy/minesweeper' }];

const summary: SummaryItem[] = [
  { icon: 'i-columns', label: 'Timeline', value: 'Fall 2024, Fundamentals of Computer Science II' },
  { icon: 'i-code', label: 'Stack', value: 'Java, the course’s javalib world library, Tester library' },
  { icon: 'i-modules', label: 'Techniques', value: 'Recursive flood fill, neighbour lists, randomness' },
  { icon: 'i-target', label: 'Outcome', value: 'A playable Minesweeper with flagging, flood fill and win and loss screens' },
];

// ---------- Diagrams ----------
// A 5x5 example board. M is a mine; numbers are adjacent-mine counts.
// `open` marks the cells one click on the top-left corner uncovers.

const BOARD: (number | 'M')[][] = [
  [0, 0, 0, 1, 'M'],
  [0, 0, 1, 2, 2],
  [0, 0, 1, 'M', 1],
  [1, 1, 2, 1, 1],
  [1, 'M', 1, 0, 0],
];

const OPEN = new Set([
  '0-0', '0-1', '0-2', '0-3',
  '1-0', '1-1', '1-2', '1-3',
  '2-0', '2-1', '2-2',
  '3-0', '3-1', '3-2',
]);

// The game's own number colours (Cell.tileNum).
const NUM_CLASS: Record<number, string> = { 1: 'ms-n1', 2: 'ms-n2', 3: 'ms-n3' };

const FloodBoard: React.FC<{ after: boolean }> = ({ after }) => (
  <div className="cg-board ms-board" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
    {BOARD.flatMap((row, r) =>
      row.map((cell, c) => {
        const open = after && OPEN.has(`${r}-${c}`);
        const clicked = r === 0 && c === 0;
        return (
          <div
            key={`${r}-${c}`}
            className={`cg-tile ms-tile${open ? ' is-open' : ''}${clicked ? ' is-clicked' : ''}`}
          >
            {open && cell !== 0 && cell !== 'M' ? <span className={NUM_CLASS[cell] ?? 'ms-n4'}>{cell}</span> : ''}
          </div>
        );
      })
    )}
  </div>
);

const NeighbourBoard: React.FC = () => (
  <div className="cg-board ms-board" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
    {Array.from({ length: 25 }).map((_, i) => {
      const r = Math.floor(i / 5);
      const c = i % 5;
      const centre = r === 2 && c === 2;
      const near = !centre && Math.abs(r - 2) <= 1 && Math.abs(c - 2) <= 1;
      return (
        <div key={i} className={`cg-tile ms-tile${near ? ' is-near' : ''}${centre ? ' is-centre' : ''}`} />
      );
    })}
  </div>
);

export default function CodeMinesweeperCasestudy() {
  return (
    <CodeGameLayout
      modifier="cg--minesweeper"
      title="Minesweeper: Rebuilding a Classic with a Recursive Flood Fill"
      summary={summary}
      links={LINKS}
    >
      <section className="cg-section">
        <h2>Overview</h2>
        <div className="cg-split">
          <div className="cg-prose">
            <p>
              A version of the classic Minesweeper, built in Java. The board starts fully covered,
              and every cell is either safe or a mine.
            </p>
            <p>
              <strong>Left-click</strong> uncovers a cell. A safe cell shows how many of the eight
              cells around it are mines, and a cell with no mines nearby opens up the area around
              it automatically. <strong>Right-click</strong> places or removes a flag, drawn as an
              orange triangle, on a cell you think is a mine.
            </p>
            <p>
              Uncovering a mine ends the game with &ldquo;YOU LOST&rdquo;. Uncovering every safe
              cell ends it with &ldquo;YOU WON&rdquo;. There is no time limit.
            </p>
          </div>
          <GameVideo file="minesweeper.mp4" caption="Gameplay demo" />
        </div>
      </section>

      <section className="cg-section">
        <h2>Neighbours and Mine Counts</h2>
        <div className="cg-split">
          <div className="cg-prose">
            <p>
              Each <code>Cell</code> decides whether it is a mine when it&rsquo;s created, with a{' '}
              <strong>20% chance</strong>, so the number of mines varies from game to game.
            </p>
            <p>
              Once the grid exists, the game walks it once and gives every cell a list of its{' '}
              <strong>neighbours</strong>: up to eight, fewer along the edges and in the corners.
              After that, a cell never needs the grid again. Its number is just a count of the
              mines in its own neighbour list.
            </p>
            <p>
              Numbers use the colours from the code: 1 is blue, 2 is green, 3 is red and anything
              higher is magenta.
            </p>
          </div>
          <figure className="cg-diagram cg-diagram--fit">
            <h4>A cell and its eight neighbours</h4>
            <NeighbourBoard />
            <p className="cg-note">
              Every cell stores direct links to the cells around it.
            </p>
          </figure>
        </div>
      </section>

      <section className="cg-section">
        <h2>The Flood Fill</h2>
        <div className="cg-prose">
          <p>
            Clicking a cell calls <code>floodFill()</code> on it. If the cell is covered and not
            flagged, it uncovers itself. Then, if none of its neighbours are mines, it calls{' '}
            <code>floodFill()</code> on every neighbour, and each of those does the same.
          </p>
          <p>
            The recursion spreads through the connected empty area and stops at the numbered cells
            on its border, which uncover but don&rsquo;t spread further. Cells that are already
            uncovered stop it too, so no cell is visited twice. Flagged cells are left alone.
          </p>
        </div>
        <figure className="cg-diagram cg-after">
          <div className="cg-diagram-pair">
            <div>
              <h4>Before: one click on the top-left corner</h4>
              <FloodBoard after={false} />
            </div>
            <div>
              <h4>After: the empty area opens to its numbered edge</h4>
              <FloodBoard after />
            </div>
          </div>
          <p className="cg-note">
            Example 5 &times; 5 board with three mines. The empty cells in the bottom-right corner
            stay covered because the fill can&rsquo;t reach them through a numbered cell.
          </p>
        </figure>
      </section>

      <section className="cg-section">
        <div className="cg-split">
          <div>
            <h2>Code and Testing</h2>
            <div className="cg-prose">
              <p>
                <code>MinesweeperWorld</code> builds the grid, links the neighbours, handles clicks
                and checks for a win or a loss after each one. <code>Cell</code> holds a
                cell&rsquo;s state (mine, flagged, covered), draws its tile and runs the flood
                fill.
              </p>
              <p>
                The tests in <code>ExamplesMinesweeper</code> cover building the grid and the
                neighbour lists, counting nearby mines, drawing tiles and numbers, and the scene.
                Random mines are tested through a duplicate method that takes a seeded{' '}
                <code>Random</code>, so the result is predictable.
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
