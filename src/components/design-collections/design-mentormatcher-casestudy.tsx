import React, { useEffect } from 'react';
import '../mainpages/design-style.css';
import './design-mentormatcher-casestudy.css';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { getAssetPath } from '../../utils/assetUtils';
import ImageLightbox from '../page-components/ImageLightbox';
import { usePageMode } from '../../hooks/usePageMode';
import CaseStudyHero from '../page-components/CaseStudyHero';
import { useSingleImageLightbox } from '../../hooks/useLightbox';
import { Icon } from '../page-components/IconSprite';

const MM = '/pictures/portfolio-content_spring2026/02_DESIGN/05_MENTORMATCHER';

const summary = [
  { icon: 'i-columns', label: 'Timeline', value: 'About two weeks, January 2026', wide: true },
  { icon: 'i-person', label: 'Role', value: 'UX Designer and Frontend Engineer on a five-person NExT Consulting team' },
  { icon: 'i-store', label: 'Client', value: 'Khoury Staff Council, Northeastern University' },
  { icon: 'i-code', label: 'Tools', value: 'Figma, TypeScript, React, Material UI (MUI)' },
  {
    icon: 'i-target',
    label: 'Outcome',
    value: 'Mentor Matcher v2.0, with mentor capacity and match reasoning shown to mentors, mentees and admins',
  },
];

// Each screen went through two rounds of wireframes. Widths and heights are
// the exported files', so the images reserve their space before loading.
const rounds = {
  mentee: [
    { file: 'mm-mentee-round1.jpg', w: 1600, h: 1034, label: 'Round 1' },
    { file: 'mm-mentee-round2.jpg', w: 1600, h: 1034, label: 'Round 2' },
  ],
  admin: [
    { file: 'mm-admin-round1.jpg', w: 1600, h: 1580, label: 'Round 1' },
    { file: 'mm-admin-round2.jpg', w: 1600, h: 1580, label: 'Round 2' },
  ],
};

// ---------- Matching algorithm diagram ----------
// Three mentors and four mentees with made-up scores, drawn once per stage:
// which pairs are pruned, how similar the rest are, and which pairs the
// assignment picks. The middle mentor takes two mentees to show capacity.

const MENTORS = [34, 84, 134];
const MENTEES = [22, 62, 106, 146];
const NODE_X = { mentor: 44, mentee: 296 };

const SCORES: Record<string, number> = {
  '0-0': 0.52, '0-1': 0.89, '0-2': 0.41,
  '1-0': 0.82, '1-1': 0.35, '1-3': 0.74,
  '2-1': 0.48, '2-2': 0.77, '2-3': 0.3,
};
const PRUNED = ['0-3', '1-2', '2-0'];
// Where along each pruned line its mark sits, so the three marks don't stack
// up where the lines cross in the middle.
const CUT_AT: Record<string, number> = { '0-3': 0.25, '1-2': 0.75, '2-0': 0.5 };
const MATCHED = ['0-1', '1-0', '1-3', '2-2'];

type Stage = 'prune' | 'score' | 'match';

const stages: { id: Stage; title: string; text: string }[] = [
  { id: 'prune', title: '1. Prune', text: 'Pairs that can’t work are removed first.' },
  {
    id: 'score',
    title: '2. Score',
    text: 'Every remaining pair is scored from survey answers. Thicker lines mean more similar answers.',
  },
  {
    id: 'match',
    title: '3. Assign',
    text: 'The Hungarian algorithm picks the best set of pairs, repeating until mentors reach capacity.',
  },
];

const edgePath = (key: string) => {
  const [m, e] = key.split('-').map(Number);
  return { x1: NODE_X.mentor + 12, y1: MENTORS[m], x2: NODE_X.mentee - 12, y2: MENTEES[e] };
};

const StageGraph: React.FC<{ stage: Stage }> = ({ stage }) => {
  const live = Object.keys(SCORES);
  return (
    <svg className="mm-algo-graph" viewBox="0 0 340 168" aria-hidden="true">
      {stage === 'prune' &&
        [...live, ...PRUNED].map(key => {
          const p = edgePath(key);
          const cut = PRUNED.includes(key);
          const t = CUT_AT[key] ?? 0.5;
          const mx = p.x1 + (p.x2 - p.x1) * t;
          const my = p.y1 + (p.y2 - p.y1) * t;
          return (
            <g key={key}>
              <line {...p} className={cut ? 'mm-edge mm-edge--cut' : 'mm-edge'} />
              {cut && (
                <path
                  className="mm-edge-x"
                  d={`M${mx - 6} ${my - 6} L${mx + 6} ${my + 6} M${mx + 6} ${my - 6} L${mx - 6} ${my + 6}`}
                />
              )}
            </g>
          );
        })}
      {stage === 'score' &&
        live.map(key => (
          <line
            key={key}
            {...edgePath(key)}
            className="mm-edge mm-edge--score"
            style={{ strokeWidth: 1 + SCORES[key] * 5, opacity: 0.25 + SCORES[key] * 0.75 }}
          />
        ))}
      {stage === 'match' &&
        live.map(key => (
          <line
            key={key}
            {...edgePath(key)}
            className={MATCHED.includes(key) ? 'mm-edge mm-edge--match' : 'mm-edge mm-edge--faint'}
          />
        ))}
      {MENTORS.map((y, i) => (
        <g key={`m${i}`}>
          <circle cx={NODE_X.mentor} cy={y} r={11} className="mm-node mm-node--mentor" />
          {stage === 'match' && (
            <text x={NODE_X.mentor - 20} y={y + 4} className="mm-node-cap" textAnchor="end">
              {i === 1 ? '2/2' : '1/1'}
            </text>
          )}
        </g>
      ))}
      {MENTEES.map((y, i) => (
        <circle key={`e${i}`} cx={NODE_X.mentee} cy={y} r={11} className="mm-node mm-node--mentee" />
      ))}
    </svg>
  );
};

const AlgorithmDiagram: React.FC = () => (
  <figure className="mm-algo">
    <div className="mm-algo-legend" aria-hidden="true">
      <span><i className="mm-dot mm-dot--mentor" />Mentors</span>
      <span><i className="mm-dot mm-dot--mentee" />Mentees</span>
    </div>
    {stages.map(stage => (
      <div key={stage.id} className="mm-algo-stage">
        <StageGraph stage={stage.id} />
        <div className="mm-algo-copy">
          <h4>{stage.title}</h4>
          <p>{stage.text}</p>
        </div>
      </div>
    ))}
    <figcaption>Illustrative example with made-up scores</figcaption>
  </figure>
);

export default function DesignMentorMatcherCasestudy() {
  usePageMode({ initial: true });
  const { setDarkMode } = useDarkMode();

  // Light navbar over the hero, dark once the cream content reaches the top.
  useEffect(() => {
    const handleScroll = () => {
      const content = document.querySelector('.mm-content');
      if (!content) return;
      setDarkMode(content.getBoundingClientRect().top > 0);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setDarkMode]);

  const lightbox = useSingleImageLightbox();

  const figure = (file: string, w: number, h: number, alt: string, caption: string) => (
    <figure className="mm-figure" {...lightbox.trigger(getAssetPath(`${MM}/${file}`), alt, caption)}>
      <figcaption>{caption}</figcaption>
      <img
        src={getAssetPath(`${MM}/${file}`)}
        alt={alt}
        width={w}
        height={h}
        loading="lazy"
        decoding="async"
      />
    </figure>
  );

  return (
    <main className="design-container mm-casestudy">
      <CaseStudyHero variant="mm" title="Mentor Matcher: Designing and Building Transparent, Capacity-Aware Matching">
        <div className="mm-snapshot">
          <h2 className="mm-snapshot-title">Quick Summary</h2>
          <div className="mm-cards">
            {summary.map(item => (
              <div key={item.label} className={`mm-card${item.wide ? ' mm-card--wide' : ''}`}>
                <h3>
                  <Icon id={item.icon} className="mm-card-icon" />
                  {item.label}
                </h3>
                <p>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </CaseStudyHero>

      <div className="mm-content">
        <section className="mm-section">
          <h2>Overview</h2>
          <div className="mm-prose mm-prose--columns">
            <p>
              Mentor Matcher is a platform NExT Consulting built for the{' '}
              <strong>Khoury Staff Council</strong>. It runs the council's mentorship program,
              which pairs mentors with <strong>early-career Khoury staff</strong> for a semester
              to a year. The program used to run on Qooper.
            </p>
            <p>
              An earlier NExT team built <strong>v1.0</strong>, which generated matches with the
              Hungarian algorithm and let admins adjust them. Our five-person team picked it up for{' '}
              <strong>v2.0</strong>, with three goals from our kickoff with the client: account for{' '}
              <strong>mentor capacity</strong>, allow more <strong>configuration</strong>, and make
              the matches more <strong>transparent</strong> to the people in them.
            </p>
            <p>
              I designed the match screens for mentees, mentors and admins in{' '}
              <strong>Figma</strong>, then built them in <strong>React and Material UI</strong>.
              The wireframes went through two rounds, and the second round is what shipped, nearly
              unchanged.
            </p>
          </div>
        </section>

        <section className="mm-section">
          <h2>The Match Screen</h2>
          <div className="mm-prose">
            <p>
              This is the screen a mentee or mentor sees once they have a match. In the{' '}
              <strong>first round</strong>, I grouped compatibility into categories (skills,
              personality and communication style), each with a score and tags, plus a button to
              request a new match.
            </p>
            <p>
              In the <strong>second round</strong>, the screen shows the overall compatibility
              score and the <strong>three survey questions</strong> where the pair's answers were
              most similar, each with its own score. The matching algorithm scores every survey
              question, so these come straight from the data behind the match.
            </p>
          </div>
          <div className="mm-pair mm-after">
            {rounds.mentee.map(r =>
              figure(
                r.file,
                r.w,
                r.h,
                `Mentee match screen, wireframe ${r.label.toLowerCase()}`,
                `${r.label}: mentee view`
              )
            )}
          </div>
        </section>

        <section className="mm-section">
          <div className="mm-split">
            <div className="mm-prose">
              <h3>Mentors with more than one mentee</h3>
              <p>
                Version 2.0 lets a mentor take on <strong>several mentees</strong> across
                matching rounds, and lets one person be a mentor in one pairing and a mentee in
                another. The mentor view stacks one match per row, each with its own score and
                top questions, and labels which side of the pairing the viewer is on.
              </p>
              <p>
                I built the match reasoning on this screen: the circular score, the question
                cards with their progress bars, and the layout for multiple matches and dual
                roles.
              </p>
            </div>
            {figure(
              'mm-mentor-round2.jpg',
              1600,
              2196,
              'Mentor match screen with three stacked matches, each labeled mentor or mentee',
              'Round 2: mentor view with several matches'
            )}
          </div>
        </section>

        <section className="mm-section">
          <h2>The Admin Matching Portal</h2>
          <div className="mm-prose">
            <p>
              Admins run the algorithm, then approve or reject each proposed pair before matches
              are released. The <strong>second round</strong> adds a{' '}
              <strong>capacity indicator</strong> beside every mentor, showing how many mentees
              they have against their maximum, and shows an approved pair as a single joined row.
            </p>
            <p>
              In the build, I added the capacity indicators, switched the mentor and mentee columns,
              fixed a bug when mentors changed their own maximum, and added a warning
              that tells admins when some people couldn't be matched and how many.
            </p>
          </div>
          <div className="mm-pair mm-after">
            {rounds.admin.map(r =>
              figure(
                r.file,
                r.w,
                r.h,
                `Admin matching portal, wireframe ${r.label.toLowerCase()}`,
                `${r.label}: admin matching portal`
              )
            )}
          </div>
        </section>

        <section className="mm-section">
          <h2>How It Was Built</h2>
          <div className="mm-split mm-split--built">
          <div className="mm-prose">
            <p>
              The frontend is <strong>React with TypeScript and Material UI</strong>, using
              TanStack Query for data and Zustand for state. The backend is{' '}
              <strong>Django REST Framework</strong> on PostgreSQL, deployed on AWS.
            </p>
            <p>
              Matching runs in three stages: it removes pairs that can't work, scores every
              remaining mentor and mentee from their survey answers, then assigns pairs with the
              Hungarian algorithm. In v2.0 that last step repeats until no more matches can be
              made, which is how mentors end up with more than one mentee.
            </p>
          </div>
          <AlgorithmDiagram />
          </div>
        </section>
      </div>

      <ImageLightbox isOpen={lightbox.isOpen} currentImage={lightbox.currentImage} onClose={lightbox.close} />
    </main>
  );
}
