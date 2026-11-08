import React from 'react';
import CodeGameLayout, { CODE, GameLinks, GameVideo, SummaryItem, GameLink } from './CodeGameLayout';
import ImageLightbox from '../page-components/ImageLightbox';
import { useSingleImageLightbox } from '../../hooks/useLightbox';
import { getAssetPath } from '../../utils/assetUtils';

const SHOTS = `${CODE}/coopalytics`;

const LINKS: GameLink[] = [
  { label: 'Video demo and walkthrough', href: 'https://www.youtube.com/watch?v=rf_tmN-ASdk' },
  { label: 'GitHub repo', href: 'https://github.com/kanghosaeyo/Coopalytics' },
];

const summary: SummaryItem[] = [
  { icon: 'i-columns', label: 'Timeline', value: 'Summer 2025, CS 3200 Database Design, team project' },
  { icon: 'i-code', label: 'Stack', value: 'Python, Streamlit, Flask REST API, MySQL, Docker Compose' },
  {
    icon: 'i-person',
    label: 'My part',
    value: 'Analytics pages for students, advisors and admins, and the API routes and SQL behind them',
  },
  {
    icon: 'i-target',
    label: 'Outcome',
    value: 'A co-op platform with tailored portals for students, advisors, employers and admins',
  },
];

// ---------- Diagrams ----------

const TIERS = [
  { name: 'Streamlit app', detail: 'Python pages for each role', port: 'web-app · port 8501' },
  { name: 'Flask REST API', detail: 'Routes grouped by table', port: 'web-api · port 4000' },
  { name: 'MySQL database', detail: '13 tables, seeded with sample data', port: 'coopalytics-db · port 3306' },
];

const Architecture: React.FC = () => (
  <figure className="cg-diagram coop-arch">
    <div className="coop-tiers">
      {TIERS.map((tier, i) => (
        <React.Fragment key={tier.name}>
          {i > 0 && (
            <div className="coop-link" aria-hidden="true">
              <span>{i === 1 ? 'HTTP requests' : 'SQL queries'}</span>
            </div>
          )}
          <div className="coop-tier">
            <strong>{tier.name}</strong>
            <span>{tier.detail}</span>
            <code>{tier.port}</code>
          </div>
        </React.Fragment>
      ))}
    </div>
    <p className="cg-note">Each tier runs in its own Docker container, started together with Docker Compose.</p>
  </figure>
);

// Relationship tables join the two main entities, users and co-op
// positions, and carry the data about that relationship.
const RELATIONS: { left: string; table: string; carries: string; right: string }[] = [
  { left: 'Student', table: 'workedAtPos', carries: 'dates, company rating', right: 'Co-op position' },
  { left: 'Student', table: 'viewsPos', carries: 'saved preference', right: 'Co-op position' },
  { left: 'Employer', table: 'createsPos', carries: 'who posted it', right: 'Co-op position' },
  { left: 'Student', table: 'appliesToApp', carries: 'links a student to an application', right: 'Application' },
  { left: 'Employer', table: 'reviewsApp', carries: 'review flag', right: 'Application' },
  { left: 'Student', table: 'advisor_advisee', carries: 'advisor flag', right: 'Advisor' },
  { left: 'Student', table: 'skillDetails', carries: 'proficiency level', right: 'Skill' },
];

const DataModel: React.FC = () => (
  <figure className="cg-diagram">
    <h4>How the tables connect</h4>
    <div className="coop-rel-list">
      {RELATIONS.map(r => (
        <div key={r.table} className="coop-rel">
          <span className="coop-entity">{r.left}</span>
          <span className="coop-bridge">
            <code>{r.table}</code>
            <small>{r.carries}</small>
          </span>
          <span className="coop-entity">{r.right}</span>
        </div>
      ))}
    </div>
    <p className="cg-note">
      Students, advisors and employers all live in one <code>users</code> table. Employers link to a{' '}
      <code>companyProfiles</code> row, and each user can have a <code>demographics</code> row.
    </p>
  </figure>
);

// A query drawn as the tables it reads, in join order, then what it returns.
const QueryFlow: React.FC<{ route: string; steps: string[]; result: string }> = ({ route, steps, result }) => (
  <figure className="coop-query-wrap">
  <figcaption className="coop-query-label">
    How the <code>{route}</code> query works: the tables it joins, in order, and what it returns
  </figcaption>
  <div className="coop-query">
    {steps.map((s, i) => (
      <React.Fragment key={s}>
        {i > 0 && <span className="coop-join" aria-hidden="true">join</span>}
        <code className="coop-qtable">{s}</code>
      </React.Fragment>
    ))}
    <span className="coop-join coop-join--result" aria-hidden="true">group by</span>
    <span className="coop-qresult">{result}</span>
  </div>
  </figure>
);

export default function CodeCoopalyticsCasestudy() {
  const lightbox = useSingleImageLightbox();

  const shot = (file: string, alt: string, caption: string) => (
    <figure
      className="cg-figure coop-shot"
      {...lightbox.trigger(getAssetPath(`${SHOTS}/${file}`), alt, caption)}
    >
      <img src={getAssetPath(`${SHOTS}/${file}`)} alt={alt} width={1000} height={548} loading="lazy" decoding="async" />
      <figcaption>{caption}</figcaption>
    </figure>
  );

  return (
    <CodeGameLayout
      modifier="cg--coopalytics"
      title="Coopalytics: Building Data-Driven Analytics for a Co-op Platform"
      summary={summary}
      links={LINKS}
    >
      <section className="cg-section">
        <h2>Overview</h2>
        <div className="cg-split">
          <div className="cg-prose">
            <p>
              Coopalytics is a co-op management platform for Northeastern, built by our team for
              CS 3200 Database Design. It covers the co-op process from posting a position to
              applying, reviewing and placing students.
            </p>
            <p>
              The app has a portal for each of four roles. <strong>Students</strong> browse and
              apply to positions and track their applications. <strong>Advisors</strong> follow
              their advisees&rsquo; progress and placement trends. <strong>Employers</strong> post
              positions and review applicants. <strong>Admins</strong> moderate postings, manage
              accounts and look at diversity and platform metrics.
            </p>
            <p>
              My part was the <strong>analytics</strong>: the pages that turn the database into
              numbers people can act on, and the Flask routes and SQL queries that feed them.
            </p>
          </div>
          <GameVideo file="coopalytics.mp4" caption="Demo of the four portals" />
        </div>
      </section>

      <section className="cg-section">
        <h2>Architecture</h2>
        <div className="cg-split">
          <div className="cg-prose">
            <p>
              The app is split into three tiers. The <strong>Streamlit</strong> front end is a set
              of Python pages, one group per role. It never touches the database directly: every
              page calls the <strong>Flask</strong> REST API, which runs the SQL against{' '}
              <strong>MySQL</strong> and returns JSON.
            </p>
            <p>
              The API is organised into one blueprint per area, such as co-op positions,
              applications, users, company profiles and past co-ops, so each page&rsquo;s data
              comes from a small set of named routes.
            </p>
          </div>
          <Architecture />
        </div>
      </section>

      <section className="cg-section">
        <h2>Data Model</h2>
        <div className="cg-split">
          <div className="cg-prose">
            <p>
              The schema has <strong>13 tables</strong>. A handful hold the main things in the
              system: users, company profiles, co-op positions, applications and skills. The rest
              are <strong>relationship tables</strong> that join two of those and store facts
              about the relationship itself.
            </p>
            <p>
              That&rsquo;s where most of the analytics come from. A past co-op, for example, is a
              row in <code>workedAtPos</code> joining a student to a position, and it holds the
              dates and the rating the student gave the company afterwards.
            </p>
          </div>
          <DataModel />
        </div>
      </section>

      <section className="cg-section">
        <h2>What I Built</h2>

        <div className="coop-feature">
          <div className="cg-split">
            <div className="cg-prose">
              <h3>Student Analytics: past co-op wages</h3>
              <p>
                Students can compare pay before they apply. I wrote the{' '}
                <code>/workedatpos/wagedata</code> route, which goes from each company to the
                employers who work there, the positions they posted and the students who have held
                them. For every company and position title it returns the lowest, highest and
                average hourly pay and how many students have worked it, sorted by average pay.
              </p>
              <p>
                The page shows summary numbers (positions, average pay, highest pay, previous
                co-ops), the full table, and bar charts of the top positions and companies by
                average pay.
              </p>
            </div>
            {shot('coop-student-analytics.jpg', 'Student Analytics page with summary metrics and the wage data table', 'Student Analytics')}
          </div>
          <QueryFlow
            route="/workedatpos/wagedata"
            steps={['companyProfiles', 'users', 'createsPos', 'coopPositions', 'workedAtPos']}
            result="min, max and average pay, number of past co-ops"
          />
        </div>

        <div className="coop-feature cg-after">
          <div className="cg-split">
            <div className="cg-prose">
              <h3>Advisor Company Partnerships: student ratings</h3>
              <p>
                Advisors see which companies students rated best. The{' '}
                <code>/workedatpos/company-ratings</code> query takes every past co-op with a
                rating, joins it through its position to company profiles, and returns each
                company&rsquo;s average, lowest and highest rating and how many ratings it has,
                highest first.
              </p>
              <p>
                I built the page on top of it: the number of rated companies, the overall average
                and the top-rated company, then a ranked table where each average is coloured by
                band.
              </p>
            </div>
            {shot('coop-company-partnerships.jpg', 'Company Partnerships page ranking companies by average student rating', 'Company Partnerships')}
          </div>
          <QueryFlow
            route="/workedatpos/company-ratings"
            steps={['workedAtPos', 'coopPositions', 'companyProfiles']}
            result="average, min and max rating, number of ratings"
          />
        </div>

        <div className="coop-feature cg-after">
          <div className="cg-split">
            <div className="cg-prose">
              <h3>Advisor Student Management</h3>
              <p>
                An advisor&rsquo;s list of advisees, searchable by name or major and filterable by
                graduation year. Each student shows their major, college and graduation year next
                to a count of applications under review, submitted and rejected, and a button to
                flag students who need support.
              </p>
            </div>
            {shot('coop-student-management.jpg', 'Student Management page listing an advisor’s advisees with application counts', 'Student Management')}
          </div>
        </div>

        <div className="coop-feature cg-after">
          <div className="cg-split">
            <div className="cg-prose">
              <h3>Admin Analytics</h3>
              <p>
                A dashboard of platform users by role. I added count routes for students,
                advisors, employers and all users, and the page that shows them with a system
                summary. I also wrote the routes that let an employer create and update their
                company profile.
              </p>
            </div>
            {shot('coop-admin-analytics.jpg', 'Admin Analytics dashboard with user counts by role', 'Admin Analytics')}
          </div>
        </div>
      </section>

      <section className="cg-section">
        <h2>Links</h2>
        <GameLinks links={LINKS} />
      </section>

      <ImageLightbox isOpen={lightbox.isOpen} currentImage={lightbox.currentImage} onClose={lightbox.close} />
    </CodeGameLayout>
  );
}
