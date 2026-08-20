import React from 'react';

// Engineering projects listed on the code page. Descriptions are JSX so the
// line breaks inside each write-up stay exactly as written.

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  title: string;
  /** Course and term, or just the term. */
  meta: string;
  description: React.ReactNode;
  tags: string[];
  links?: ProjectLink[];
  /** Filename inside the 03_CODE asset folder. */
  video: string;
}

export const projects: Project[] = [
  {
    title: 'Coopalytics',
    meta: 'Introduction to Databases | Summer 2025',
    video: 'coopalytics.mp4',
    description: (
      <>
        Coopalytics is a data-driven co-op matching platform that makes the
        co-op/internshipsearch smarter and more transparent. Using advanced
        analytics, it connects students with positions that fit their skills and
        goals while offering clear insights into placement trends, salary ranges,
        and company ratings—saving time and removing the guesswork from blind
        applications.
        <br />
        <br />
        Designed for students, employers, advisors, and administrators,
        Coopalytics streamlines the process with three core features: an
        intelligent matching system, a progress tracker, and historical
        analytics. By combining transparency with efficiency, it transforms the
        co-op search into a strategic, data-informed experience.
      </>
    ),
    links: [
      {
        label: 'Video Demo & Walkthrough',
        href: 'https://www.youtube.com/watch?v=rf_tmN-ASdk'
      },
      { label: 'Github Repo', href: 'https://github.com/kanghosaeyo/Coopalytics' }
    ],
    tags: [
      'Python',
      'Flask REST API',
      'Streamlit',
      'SQL',
      'Relational Database Design',
      'Database Normalization',
      'DataGrip',
      'Docker',
      'Containerization',
      'Multi-Tier Architecture',
      'API Development',
      'Data Visualization',
      'System Design'
    ]
  },
  {
    title: 'Djoda Website',
    meta: 'Spring 2025',
    video: 'djoda.mp4',
    description: (
      <>
        As a full-stack developer at Scout, Northeastern's student-run design
        agency, I collaborated with a client to build a React.js/Three.js website
        featuring a fully interactive 3D spine model, a pre-order system, a blog
        with a connected database, and customer testimonials. Working from Figma
        wireframes, I translated design concepts into functional, engaging web
        features that balanced creativity with usability.
        <br />
        <br />
        This project emphasized teamwork and client collaboration, with weekly
        meetings to refine requirements, review progress, and incorporate
        feedback. By applying Git version control and iterative development
        practices, I ensured smooth integration across the team while delivering
        a polished, production-ready platform tailored to client needs.
      </>
    ),
    tags: [
      'React.js',
      'Three.js',
      'Figma',
      'Wireframes',
      'JavaScript (ES6+)',
      '3D Web Development',
      'Frontend Development',
      'Full-Stack Development',
      'Database Integration',
      'RESTful APIs',
      'Git',
      'Agile/Iterative Development',
      'UI/UX Implementation',
      'Client-Facing Development'
    ]
  },
  {
    title: 'Three Trios',
    meta: 'Object-Oriented Design | Fall 2024',
    video: 'threetrios.mp4',
    description: (
      <>
        Three Trios is a two-player (Red vs. Blue) game played on a grid and is a
        variation of an older card game called Triple Triad. Each player has a
        hand of cards shown on the left and right sides of the screen. Each card
        has numbers 1 to A(10) in the four cardinal directions.
        <br />
        When it's your turn, place a card to the grid. A number battle first
        occurs against all adjacent opposing cards to the newly placed card.
        During battle, your card compares number values in the directions the
        opposing card's number values face each other. If your card value is
        greater than the opposing card value, you flip the opposing card's color
        to your color.
        <br />
        Fill and flip the most cards with your color before you and your opponent
        run out of cards in your hand to win!
      </>
    ),
    links: [
      {
        label: 'Video Code Walkthrough',
        href: 'https://www.youtube.com/watch?v=vz4FiUyOoak'
      },
      { label: 'Github Repo', href: 'https://github.com/engamy/three-trios' },
      {
        label: 'Github Repo (Adapter Pattern)',
        href: 'https://github.com/engamy/three-trios-adapter'
      }
    ],
    tags: [
      'Java SE 11',
      'Java Swing Library',
      'Model-View-Controller Design Pattern',
      'Factory Design Pattern',
      'Strategy Design Pattern',
      'Dynamic Dispatch',
      'Adapter Pattern',
      'Inheritance',
      'Composition',
      'Encapsulation',
      'JUnit4 Testing',
      'Human vs. Human',
      'Human vs. AI Strategies',
      'Polymorphism',
      'Method Overloading',
      'Method Overriding'
    ]
  },
  {
    title: 'Minesweeper',
    meta: 'Fundamentals of CS II | Fall 2024',
    video: 'minesweeper.mp4',
    description: (
      <>
        Based on the classic game of Minesweeper!
        <br />
        <br />
        In this game, you start with a blank grid of cells. Each cell is either
        safe or a mine. Left-clicking on a mine will result in a game over. To
        win, left-click safe cells and right-click all of the mines to flag them
        (represented by a triangle). To help, clicking a safe cell will flood to
        cells that are adjacent to a mine, and the adjacent cells will reveal a
        number representing the number of mines directly adjacent to it. This
        version does not have a time limit, so think before you click!
        <br />
        <br />
        Due to academic integrity guidelines, this Github repo is only available
        on request (email).
      </>
    ),
    tags: ['Java SE 11', 'Eclipse IDE', 'Java Funworld Library']
  },
  {
    title: 'LightEmAll',
    meta: 'Fundamentals of CS II | Spring 2024',
    video: 'lightemall.mp4',
    description: (
      <>
        Click on the wires to rotate them, and use your arrow keys to move the
        power station along wires. Win by lighting every wire up!
        <br />
        This game uses a depth-first-search algorithm to light up connecting
        wires, as well as Kruskal's algorithm to generate random boards under the
        condition that all the wires can connect.
        <br />
        <br />
        Due to academic integrity guidelines, this Github repo is only available
        on request (email).
      </>
    ),
    tags: [
      'Java SE 11',
      'Eclipse IDE',
      'Java Funworld Library',
      'Depth-first Search',
      "Kruskal's Algorithm"
    ]
  },
  {
    title: 'ZType',
    meta: 'Fundamentals of CS II | Spring 2024',
    video: 'ztype.mp4',
    description: (
      <>
        Random combinations of letters will fall from the top of the screen. Type
        them as fast as you can before they hit the bottom of the screen! When
        one of them hits the bottom of the screen, you lose!
        <br />
        <br />
        Due to academic integrity guidelines, this Github repo is only available
        on request (email).
      </>
    ),
    tags: [
      'Java SE 11',
      'Eclipse IDE',
      'Java Funworld Library',
      'Randomness',
      'Polymorphism',
      'JUnit4 Testing'
    ]
  },
  {
    title: 'Anime Boston Redesign',
    meta: 'Spring 2024',
    video: 'aniBos.mp4',
    description: (
      <>
        I improved the existing Anime Boston website by addressing its lack of
        clear information hierarchy, repetitive or obsolete content, and
        mismatched aesthetics. My redesigned prototype of the homepage emphasizes
        what makes Anime Boston unique: the people. By using the public archive
        of professional photos from every past convention and simplifying a lot
        of the information on the current homepage, I emphasize the importance
        the people who make Anime Boston special.
      </>
    ),
    tags: [
      'HTML',
      'CSS',
      'JavaScript',
      'Bootstrap v5.3.3',
      'Information Hierarchy',
      'Web Design',
      'User Experience Design',
      'User Interface Design'
    ]
  },
  {
    title: '3DMFA',
    meta: 'Spring 2024',
    video: '3dmfa_2.mp4',
    description: (
      <>
        Can't see the 3D artifacts at the Boston Museum of Fine Arts? Now you
        can!
        <br />
        <br />
        The existing online MFA collection has documentation of almost every
        artifact in every collection at the museum, but they are only 2D photos.
        As a result, the 3D artifacts lose their depth online. This prototype
        website is an example of what a couple of artifacts at the MFA would look
        like in a fully-developed 3D archive.
      </>
    ),
    tags: [
      'HTML',
      'CSS',
      'JavaScript',
      '3D Models',
      'aframe.io',
      'Information Hierarchy',
      'Web Design',
      'User Experience Design',
      'User Interface Design'
    ]
  },
  {
    title: 'Pipe Fantasy',
    meta: 'Fundamentals of CS I | Fall 2023',
    video: 'pipefantasy_1.mp4',
    description: (
      <>
        Observe the starting pipe, and the list of incoming pipes. Click on cells
        to place the left-most pipe in the list. The goal is to create a path
        that will allow for the longest goo-flow, resulting in a higher score!
        The round ends when the pipe hits the edge of the screen or hits a
        non-connective pipe.
        <br />
        <br />
        Due to academic integrity guidelines, this Github repo is only available
        on request (email).
      </>
    ),
    tags: [
      'DrRacket BSL',
      'Recursion',
      'Lists',
      'Strings',
      'Conditionals',
      'Loops',
      'Graphics'
    ]
  }
];
