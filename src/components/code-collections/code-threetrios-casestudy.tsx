import React, { useEffect } from 'react';
import '../mainpages/design-style.css';
import './code-threetrios-casestudy.css';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { getAssetPath } from '../../utils/assetUtils';
import ImageLightbox from '../page-components/ImageLightbox';
import { usePageMode } from '../../hooks/usePageMode';
import CaseStudyHero from '../page-components/CaseStudyHero';
import { useSingleImageLightbox } from '../../hooks/useLightbox';
import { Icon } from '../page-components/IconSprite';
import ExternalLink from '../page-components/ExternalLink';

const CODE = '/pictures/portfolio-content_spring2026/03_CODE';
const TT = `${CODE}/three-trios`;

const LINKS = [
  { label: 'Video code walkthrough', href: 'https://www.youtube.com/watch?v=vz4FiUyOoak' },
  { label: 'GitHub repo', href: 'https://github.com/engamy/three-trios' },
  { label: 'GitHub repo (adapter pattern)', href: 'https://github.com/engamy/three-trios-adapter' },
];

const summary = [
  { icon: 'i-columns', label: 'Timeline', value: 'Fall 2024, Object-Oriented Design, built with a partner' },
  { icon: 'i-code', label: 'Stack', value: 'Java 11, Java Swing, JUnit 4' },
  {
    icon: 'i-modules',
    label: 'Patterns',
    value: 'Model-View-Controller, Strategy, Adapter, listener interfaces for events',
  },
  {
    icon: 'i-target',
    label: 'Outcome',
    value: 'A playable game for human or AI players on configurable boards, covered by 98 JUnit tests',
  },
];

// ---------- Card and battle diagrams ----------

type Side = 'n' | 'e' | 's' | 'w';
type CardSpec = { n: string; e: string; s: string; w: string; owner: 'red' | 'blue'; hot?: Side[] };

const MiniCard: React.FC<{ card: CardSpec; label?: string }> = ({ card, label }) => (
  <div className={`tt-card tt-card--${card.owner}`} aria-label={label}>
    {(['n', 'w', 'e', 's'] as Side[]).map(side => (
      <span key={side} className={`tt-card-v tt-card-v--${side}${card.hot?.includes(side) ? ' is-hot' : ''}`}>
        {card[side]}
      </span>
    ))}
  </div>
);

// One row of three cells: the card Red plays, then two Blue cards to its east.
const battleSteps: { title: string; text: string; cells: CardSpec[] }[] = [
  {
    title: '1. Place',
    text: 'Red plays a card next to Blue. Its east value (7) faces Blue’s west value (4).',
    cells: [
      { n: '3', e: '7', s: '2', w: '5', owner: 'red', hot: ['e'] },
      { n: '2', e: '8', s: '6', w: '4', owner: 'blue', hot: ['w'] },
      { n: '5', e: '2', s: '4', w: '3', owner: 'blue' },
    ],
  },
  {
    title: '2. Flip',
    text: '7 beats 4, so the Blue card turns Red.',
    cells: [
      { n: '3', e: '7', s: '2', w: '5', owner: 'red' },
      { n: '2', e: '8', s: '6', w: '4', owner: 'red', hot: ['e'] },
      { n: '5', e: '2', s: '4', w: '3', owner: 'blue', hot: ['w'] },
    ],
  },
  {
    title: '3. Combo',
    text: 'The flipped card battles its own neighbours. 8 beats 3, so the chain keeps going.',
    cells: [
      { n: '3', e: '7', s: '2', w: '5', owner: 'red' },
      { n: '2', e: '8', s: '6', w: '4', owner: 'red' },
      { n: '5', e: '2', s: '4', w: '3', owner: 'red' },
    ],
  },
];

// ---------- Strategy diagrams ----------

// Flip strategy on a 3x3 board: how many cards one hand card would flip in
// each empty cell. X is a hole, R and B are cards already on the board.
const flipBoard: (string | number)[][] = [
  [1, 'B', 0],
  ['X', 2, 'B'],
  [0, 'R', 2],
];

export default function CodeThreeTriosCasestudy() {
  usePageMode({ initial: true });
  const { setDarkMode } = useDarkMode();

  // Light navbar over the hero, dark once the cream content reaches the top.
  useEffect(() => {
    const handleScroll = () => {
      const content = document.querySelector('.tt-content');
      if (!content) return;
      setDarkMode(content.getBoundingClientRect().top > 0);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setDarkMode]);

  const lightbox = useSingleImageLightbox();

  const figure = (file: string, w: number, h: number, alt: string, caption: string) => (
    <figure className="tt-figure" {...lightbox.trigger(getAssetPath(`${TT}/${file}`), alt, caption)}>
      <figcaption>{caption}</figcaption>
      <img src={getAssetPath(`${TT}/${file}`)} alt={alt} width={w} height={h} loading="lazy" decoding="async" />
    </figure>
  );

  return (
    <main className="design-container tt-casestudy">
      <CaseStudyHero
        variant="tt"
        title="Three Trios: Architecting a Two-Player Card Game with AI Opponents"
      >
        <div className="tt-snapshot">
          <h2 className="tt-snapshot-title">Quick Summary</h2>
          <div className="tt-cards">
            {summary.map(item => (
              <div key={item.label} className="tt-sum-card">
                <h3>
                  <Icon id={item.icon} className="tt-card-icon" />
                  {item.label}
                </h3>
                <p>{item.value}</p>
              </div>
            ))}
            <div className="tt-sum-card tt-sum-card--wide">
              <h3>
                <Icon id="i-github" className="tt-card-icon" />
                Links
              </h3>
              <ul className="tt-hero-links">
                {LINKS.map(link => (
                  <li key={link.href}>
                    <ExternalLink href={link.href}>{link.label}</ExternalLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </CaseStudyHero>

      <div className="tt-content">
        {/* Overview */}
        <section className="tt-section">
          <h2>Overview</h2>
          <div className="tt-split tt-split--top">
            <div className="tt-prose">
              <p>
                My partner and I built Three Trios in Java for our Object-Oriented Design course.
                It is a two-player game, <strong>Red vs. Blue</strong>, played on a grid.
                It is a variation of an older card game, Triple Triad. Each player holds a hand of
                cards, and every card has a value from <strong>1 to A (10)</strong> on each of its
                four sides.
              </p>
              <p>
                On your turn you place a card on the grid, and it battles every adjacent opposing
                card. If your value is higher on the sides that face each other, the opposing card
                flips to your color. Whoever owns the most cards once the grid is full wins.
              </p>
              <p>
                Boards and decks are read from <strong>configuration files</strong>, so the same
                game runs on boards with holes, boards split into disconnected groups, or plain
                rectangles. Each player gets their own window, and either seat can be a human or
                one of two AI strategies.
              </p>
            </div>
            <figure className="tt-figure tt-figure--video">
              <video
                src={getAssetPath(`${CODE}/threetrios.mp4`)}
                controls
                muted
                playsInline
                preload="metadata"
              />
              <figcaption>Gameplay demo</figcaption>
            </figure>
          </div>
        </section>

        {/* Rules as a diagram */}
        <section className="tt-section">
          <h2>How a Battle Works</h2>
          <div className="tt-prose">
            <p>
              A card only ever compares the two values that face each other: its east side against
              a neighbour&rsquo;s west side, its north side against a neighbour&rsquo;s south side,
              and so on. When a card flips, it immediately battles <strong>its</strong> neighbours
              too, so one move can set off a chain. In the model this is a recursive call: after
              each flip, the battle runs again from the flipped card&rsquo;s position.
            </p>
          </div>
          <div className="tt-battle tt-after">
            {battleSteps.map(step => (
              <div key={step.title} className="tt-battle-step">
                <div className="tt-battle-row">
                  {step.cells.map((card, i) => (
                    <MiniCard key={i} card={card} />
                  ))}
                </div>
                <h4>{step.title}</h4>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
          <p className="tt-diagram-note">Highlighted values are the two sides being compared.</p>
        </section>

        {/* Architecture */}
        <section className="tt-section">
          <h2>Architecture: Model, View, Controller</h2>
          <div className="tt-split tt-split--top">
            <div className="tt-prose">
              <p>
                The <strong>model</strong> (<code>ThreeTriosModel</code>) owns the rules: the grid,
                both hands, whose turn it is, battles and scoring. Views only ever see it through{' '}
                <code>ReadonlyThreeTriosModel</code>, an interface with the observer methods and
                none of the ones that change state.
              </p>
              <p>
                Each player gets their own <strong>Swing view</strong> and their own{' '}
                <strong>controller</strong>. The controller holds a <code>Player</code>, which is
                either a <code>HumanPlayer</code> or an <code>AIPlayer</code> carrying a strategy,
                so the same controller code runs both. The main method builds the players from
                command-line arguments: <code>human</code>, <code>strategy1</code> or{' '}
                <code>strategy2</code> for each seat.
              </p>
              <p>
                Events travel through two small interfaces. The view calls the controller through{' '}
                <code>ViewFeatures</code> when a player selects or plays a card. The model calls the
                controller back through <code>ModelFeatures</code> when a turn ends or the game is
                over, which is also what lets two AI players run a whole game against each other.
              </p>
              <p>
                Reading the board and deck files moved out of the model and into a{' '}
                <code>ConfigureGame</code> class in the controller package. The model never needed
                file paths, and keeping setup there meant tests could build models without opening
                a Swing window for every one.
              </p>
            </div>

            <figure className="tt-arch" aria-label="Diagram of the model, two controllers and two views">
              <div className="tt-arch-row tt-arch-row--views">
                <div className="tt-node tt-node--red">
                  <strong>Red&rsquo;s window</strong>
                  <span>TTSwingView</span>
                </div>
                <div className="tt-node tt-node--blue">
                  <strong>Blue&rsquo;s window</strong>
                  <span>TTSwingView</span>
                </div>
              </div>
              {/* Each view calls down to its own controller. */}
              <div className="tt-arch-conn" aria-hidden="true">
                <span className="tt-arr-pair"><i className="tt-arr tt-arr--down" /></span>
                <span className="tt-arch-label">ViewFeatures</span>
                <span className="tt-arr-pair"><i className="tt-arr tt-arr--down" /></span>
              </div>
              <div className="tt-arch-row">
                <div className="tt-node">
                  <strong>TTController</strong>
                  <span>Red: human or AI</span>
                </div>
                <div className="tt-node">
                  <strong>TTController</strong>
                  <span>Blue: human or AI</span>
                </div>
              </div>
              {/* Moves go down to the model; ModelFeatures callbacks come back up. */}
              <div className="tt-arch-conn" aria-hidden="true">
                <span className="tt-arr-pair">
                  <i className="tt-arr tt-arr--down" />
                  <i className="tt-arr tt-arr--up" />
                </span>
                <span className="tt-arch-label">
                  Moves down,
                  <br />
                  ModelFeatures up
                </span>
                <span className="tt-arr-pair">
                  <i className="tt-arr tt-arr--down" />
                  <i className="tt-arr tt-arr--up" />
                </span>
              </div>
              <div className="tt-arch-row tt-arch-row--one">
                <div className="tt-node tt-node--model">
                  <strong>ThreeTriosModel</strong>
                  <span>Grid, hands, turns, battles, scoring</span>
                </div>
              </div>
              <div className="tt-arch-side">
                <div className="tt-node tt-node--small">
                  <strong>Player</strong>
                  <span>HumanPlayer or AIPlayer</span>
                </div>
                <div className="tt-node tt-node--small">
                  <strong>ConfigureGame</strong>
                  <span>Reads board and deck files</span>
                </div>
              </div>
            </figure>
          </div>
        </section>

        {/* Strategies */}
        <section className="tt-section">
          <h2>AI Strategies</h2>
          <div className="tt-prose">
            <p>
              Both AI players implement one <code>Strategies</code> interface with a single method,{' '}
              <code>strategize()</code>, which returns a move: a card from the hand and a row and
              column. The controller doesn&rsquo;t know which strategy it holds, so adding a third
              means writing one class.
            </p>
          </div>
          <div className="tt-strats tt-after">
            <div className="tt-strat">
              <h3>Strategy 1: Flip the most cards</h3>
              <p>
                Tries <strong>every card in the hand in every empty cell</strong> and asks the model
                how many cards that move would flip. It keeps the moves with the highest count, then
                breaks ties by taking the one closest to the top-left corner, then the upper row,
                then the lowest card in the hand.
              </p>
              <div className="tt-board" aria-label="Three by three board with flip counts in each empty cell">
                {flipBoard.flat().map((cell, i) => {
                  const kind =
                    cell === 'X' ? 'hole' : cell === 'R' ? 'red' : cell === 'B' ? 'blue' : 'empty';
                  const best = i === 4;
                  return (
                    <div key={i} className={`tt-bcell tt-bcell--${kind}${best ? ' is-best' : ''}`}>
                      {kind === 'empty' ? cell : ''}
                    </div>
                  );
                })}
              </div>
              <p className="tt-diagram-note">
                Numbers are flips for one card. Two cells tie at 2; the middle one is closer to the
                top-left, so it wins.
              </p>
            </div>

            <div className="tt-strat">
              <h3>Strategy 2: Take the corners</h3>
              <p>
                A card in a corner exposes only <strong>two sides</strong> instead of four, so
                it&rsquo;s harder to flip. This strategy tries each card in each free corner and
                scores it by adding the two values that would face the board. It plays the highest
                total, and falls back to Strategy 1 once every corner is taken.
              </p>
              <div className="tt-corner" aria-label="A card in the top-left corner with its east and south values highlighted">
                <div className="tt-board tt-board--corner">
                  <div className="tt-bcell tt-bcell--card">
                    <MiniCard card={{ n: '2', e: '9', s: 'A', w: '3', owner: 'red', hot: ['e', 's'] }} />
                  </div>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="tt-bcell tt-bcell--empty" />
                  ))}
                </div>
                <p className="tt-corner-sum">
                  East 9 + South A (10) = <strong>19</strong>
                </p>
              </div>
              <p className="tt-diagram-note">
                In the top-left corner only the east and south sides can be attacked.
              </p>
            </div>
          </div>
          <div className="tt-prose tt-after">
            <p>
              To prove the strategies look at every cell they should, we tested them against a{' '}
              <strong>mock model</strong> that writes down each hand index, row and column it is
              asked about. The test reads that transcript back and checks it.
            </p>
          </div>
        </section>

        {/* Screens */}
        <section className="tt-section">
          <h2>The Game Window</h2>
          <div className="tt-prose">
            <p>
              The Swing view paints each hand down the side and the grid in the middle: yellow
              cells are open, grey cells are holes, and played cards take their owner&rsquo;s
              color. The selected card gets a heavy outline. The controller shows a message if a
              player clicks in the other player&rsquo;s window or clicks the grid before choosing
              a card, and a dialog announces the winner and both scores at the end.
            </p>
          </div>
          <div className="tt-pair tt-after">
            {figure('tt-midgame.jpg', 1600, 1060, 'Three Trios mid-game, Red with a card selected', 'Mid-game, with a Red card selected')}
            {figure('tt-endgame.jpg', 1600, 1010, 'Both player windows at the end of a game with the winner dialog', 'End of a game, Red wins 12 to 7')}
          </div>
        </section>

        {/* Adapter */}
        <section className="tt-section">
          <h2>The Adapter Pattern: Running Another Team&rsquo;s View</h2>
          <div className="tt-prose tt-prose--columns">
            <p>
              For the last part of the project, teams traded code. We sent our view to another
              team, and received a <strong>provider</strong> team&rsquo;s view to run on top of our
              own model and controller. Their view expected their own interfaces: a{' '}
              <code>Model</code>, a <code>ThreeTriosController</code>, <code>GameCard</code>s with{' '}
              <code>AttackValue</code>s and <code>PlayerColor</code>s. None of our classes matched.
            </p>
            <p>
              Rather than rewrite either side, we wrote <strong>adapters</strong>: classes that
              implement the provider&rsquo;s interfaces and translate each call into ours. The
              provider&rsquo;s view never knows it is talking to our model. In the finished build,
              Red plays in our window and Blue plays in the provider&rsquo;s, both driven by the
              same game.
            </p>
          </div>

          <figure className="tt-adapter tt-after" aria-label="Diagram of how the adapters connect our code to the provider's view">
            <div className="tt-adapter-col">
              <h4>Our code</h4>
              <div className="tt-node tt-node--model">
                <strong>ThreeTriosModel</strong>
                <span>Our rules and state</span>
              </div>
              <div className="tt-node">
                <strong>TTController</strong>
                <span>Our turn handling and AI</span>
              </div>
            </div>
            <div className="tt-adapter-arrow" aria-hidden="true" />
            <div className="tt-adapter-col tt-adapter-col--mid">
              <h4>Adapters</h4>
              <div className="tt-node tt-node--adapter">
                <strong>ModelAdapter</strong>
                <span>Implements their Model</span>
              </div>
              <div className="tt-node tt-node--adapter">
                <strong>ControllerAdapter</strong>
                <span>Implements their ThreeTriosController</span>
              </div>
              <div className="tt-adapter-small">
                <span>CardAdapter</span>
                <span>CellAdapter</span>
                <span>GridAdapter</span>
                <span>PlayerAdapter</span>
                <span>CardNumberAdapter</span>
                <span>CardColorAdapter</span>
              </div>
            </div>
            <div className="tt-adapter-arrow" aria-hidden="true" />
            <div className="tt-adapter-col">
              <h4>Provider&rsquo;s code</h4>
              <div className="tt-node tt-node--blue">
                <strong>TripleTriadView</strong>
                <span>Their Swing view, Blue&rsquo;s window</span>
              </div>
            </div>
          </figure>

          <div className="tt-terms tt-after">
            <div className="tt-term">
              <h4>ModelAdapter</h4>
              <p>
                Wraps our model and answers the provider&rsquo;s questions: whose turn it is, the
                game state, each hand, each cell and the scores. Their view expected the model to
                load its own board, so it takes the board and deck file paths and starts the game
                through our <code>ConfigureGame</code>.
              </p>
            </div>
            <div className="tt-term">
              <h4>ControllerAdapter</h4>
              <p>
                Receives clicks from the provider&rsquo;s view and passes them to our controller,
                including the check that a player is clicking in their own window.
              </p>
            </div>
            <div className="tt-term">
              <h4>Card, cell, grid and player adapters</h4>
              <p>
                Present our cards, cells and grid in the provider&rsquo;s shapes.{' '}
                <code>CardAdapter</code> extends our <code>PlayingCard</code> and implements their{' '}
                <code>GameCard</code>, so one object works on both sides.
              </p>
            </div>
            <div className="tt-term">
              <h4>Value and color enums</h4>
              <p>
                <code>CardNumberAdapter</code> maps our <code>CardValue</code> to their{' '}
                <code>AttackValue</code>, and <code>CardColorAdapter</code> maps our R and B to
                their Red and Blue.
              </p>
            </div>
          </div>

          <div className="tt-prose tt-after">
            <p>
              Not everything lined up. The provider&rsquo;s view only asked for new data when
              someone clicked, so it fell behind after the AI moved. Our README documents the fix:
              a loop in the main method that refreshes both views until the game ends.
            </p>
          </div>
        </section>

        {/* Testing */}
        <section className="tt-section">
          <div className="tt-split tt-split--top">
            <div>
              <h2>Testing</h2>
              <div className="tt-prose">
                <p>
                  The project has <strong>98 JUnit 4 tests</strong> across five test classes: the
                  model&rsquo;s rules and input checks, the text view, the controller, and the AI
                  strategies.
                </p>
                <p>
                  Dedicated board and deck files exist only for tests, such as a board that is one
                  move from the end, a board with an invalid number of holes, and a deck of very
                  weak and very strong cards for checking the strategies.
                </p>
              </div>
            </div>
            <div>
              <h2>Links</h2>
              <ul className="tt-links">
                {LINKS.map(link => (
                  <li key={link.href}>
                    <ExternalLink href={link.href} className="btn">
                      {link.label}
                    </ExternalLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>

      <ImageLightbox isOpen={lightbox.isOpen} currentImage={lightbox.currentImage} onClose={lightbox.close} />
    </main>
  );
}
