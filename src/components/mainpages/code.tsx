import React from 'react';
import './code-style.css';
import { usePageDarkMode } from '../../hooks/usePageDarkMode';

export default function Code() {
  // Set darkMode to true for the code page
  usePageDarkMode(true);

  return (
    <main className="code-container">
      <div className="section-header">
        <div className="section-header-introtext">
          <h1>Developer</h1>
          <p>I specialize in Java, HTML/CSS/JS, and object-oriented design,
            delivering high-quality solutions across a range of projects.
            <br></br><br></br>
            My technical expertise is complemented by strong problem-solving
            abilities, debugging skills, and proficiency in key soft skills
            such as teamwork, communication, and time management, all of
            which enhance my ability to collaborate and delivery effective results.
          </p>
        </div>
        <div className="header-media">
          <video
            muted
            autoPlay
            loop
            playsInline
            width="100%"
            height="auto"
            onError={(e) => console.error('Video error:', e)}
            onLoadStart={() => console.log('Video loading started')}
            onCanPlay={() => console.log('Video can play')}
            onLoadedData={() => console.log('Video data loaded')}
          >
            <source src="/pictures/portfolio-content_spring2026/03_CODE/minesweeper.mp4"
              type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <div className="project-container">

        <h2>Projects</h2>

        <div className="project">
        <div className="project-text">
            <div className="project-desc">
              <div className="project-title-time">
                <h3>Coopalytics</h3>
                <p>Summer 2025</p>
              </div>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <div className="project-links">
                <a href="" target="_blank"><p>link 1</p></a>
                <a href="" target="_blank"><p>link 2</p></a>
              </div>
            </div>
            <div className="project-tags">
              <p>tag</p>
              <p>tag</p>
              <p>tag</p>
              <p>tag</p>
              <p>tag</p>
              <p>tag</p>
            </div>
          </div>
          <div className="project-preview">
            <video
              muted
              autoPlay
              loop
              playsInline
              width="100%"
              height="auto"
              onError={(e) => console.error('Video error:', e)}
              onLoadStart={() => console.log('Video loading started')}
              onCanPlay={() => console.log('Video can play')}
              onLoadedData={() => console.log('Video data loaded')}
            >
              <source src="/pictures/portfolio-content_spring2026/03_CODE/threetrios.mp4"
                type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        <div className="project">
          <div className="project-text">
            <div className="project-desc">
              <div className="project-title-time">
                <h3>Djoda Website</h3>
                <p>Spring 2025</p>
              </div>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <div className="project-links">
                <a href="" target="_blank"><p>link 1</p></a>
                <a href="" target="_blank"><p>link 2</p></a>
              </div>
            </div>
            <div className="project-tags">
              <p>tag</p>
              <p>tag</p>
              <p>tag</p>
              <p>tag</p>
              <p>tag</p>
              <p>tag</p>
            </div>
          </div>
          <div className="project-preview">
            <video
              muted
              autoPlay
              loop
              playsInline
              width="100%"
              height="auto"
              onError={(e) => console.error('Video error:', e)}
              onLoadStart={() => console.log('Video loading started')}
              onCanPlay={() => console.log('Video can play')}
              onLoadedData={() => console.log('Video data loaded')}
            >
              <source src="/pictures/portfolio-content_spring2026/03_CODE/threetrios.mp4"
                type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        <div className="project">
          <div className="project-text">
            <div className="project-desc">
              <div className="project-title-time">
                <h3>Three Trios</h3>
                <p>Object-Oriented Design | Fall 2024</p>
              </div>
              <p>Three Trios is a two-player (Red vs. Blue) game played on a grid
                and is a variation of an older card game called Triple Triad. Each
                player has a hand of cards shown on the left and right sides of
                the screen. Each card has numbers 1 to A(10) in the four cardinal directions.
                <br></br>
                When it's your turn, place a card to the grid. A number battle first
                occurs against all adjacent opposing cards to the newly placed card.
                During battle, your card compares number values in the directions
                the opposing card's number values face each other. If your card value
                is greater than the opposing card value, you flip the opposing card's
                color to your color.
                <br></br>
                Fill and flip the most cards with your color before you and your opponent
                run out of cards in your hand to win!
              </p>
              <div className="project-links">
                <a href="https://www.youtube.com/watch?v=vz4FiUyOoak" target="_blank"><p>Video Code Walkthrough</p></a>
                <a href="https://github.com/engamy/three-trios" target="_blank"><p>Github Repo</p></a>
                <a href="https://github.com/engamy/three-trios-adapter" target="_blank"><p>Github Repo (Adapter Pattern)</p></a>
              </div>
            </div>
            <div className="project-tags">
              <p>Java SE 11</p>
              <p>Java Swing Library</p>
              <p>Model-View-Controller Design Pattern</p>
              <p>Factory Design Pattern</p>
              <p>Strategy Design Pattern</p>
              <p>Dynamic Dispatch</p>
              <p>Adapter Pattern</p>
              <p>Inheritance</p>
              <p>Composition</p>
              <p>Encapsulation</p>
              <p>JUnit4 Testing</p>
              <p>Human vs. Human</p>
              <p>Human vs. AI Strategies</p>
              <p>Polymorphism</p>
              <p>Method Overloading</p>
              <p>Method Overriding</p>
            </div>
          </div>
          <div className="project-preview">
            <video
              muted
              autoPlay
              loop
              playsInline
              width="100%"
              height="auto"
              onError={(e) => console.error('Video error:', e)}
              onLoadStart={() => console.log('Video loading started')}
              onCanPlay={() => console.log('Video can play')}
              onLoadedData={() => console.log('Video data loaded')}
            >
              <source src="/pictures/portfolio-content_spring2026/03_CODE/threetrios.mp4"
                type="video/mp4" />
              Your browser does not support the video tag.
            </video></div>
        </div>

        <div className="project">
          <div className="project-text">
            <div className="project-desc">
              <div className="project-title-time">
                <h3>Minesweeper</h3>
                <p>Fundamentals of CS II | Fall 2024</p>
              </div>
              <p>Based on the classic game of Minesweeper!
                <br></br><br></br>
                In this game, you start with a blank grid of cells.
                Each cell is either safe or a mine. Left-clicking on
                a mine will result in a game over. To win, left-click
                safe cells and right-click all of the mines to flag
                them (represented by a triangle). To help, clicking
                a safe cell will flood to cells that are adjacent
                to a mine, and the adjacent cells will reveal a
                number representing the number of mines directly
                adjacent to it. This version does not have a time
                limit, so think before you click!
                <br></br><br></br>
                Due to academic integrity guidelines, this Github
                repo is only available on request (email).
              </p>
            </div>
            <div className="project-tags">
              <p>Java SE 11</p>
              <p>Eclipse IDE</p>
              <p>Java Funworld Library</p>
            </div>
          </div>
          <div className="project-preview">
            <video
              muted
              autoPlay
              loop
              playsInline
              width="100%"
              height="auto"
              onError={(e) => console.error('Video error:', e)}
              onLoadStart={() => console.log('Video loading started')}
              onCanPlay={() => console.log('Video can play')}
              onLoadedData={() => console.log('Video data loaded')}
            >
              <source src="/pictures/portfolio-content_spring2026/03_CODE/minesweeper.mp4"
                type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        <div className="project">
          <div className="project-text">
            <div className="project-desc">
              <div className="project-title-time">
                <h3>LightEmAll</h3>
                <p>Fundamentals of CS II | Spring 2024</p>
              </div>
              <p>
                Click on the wires to rotate them, and use your arrow keys
                to move the power station along wires. Win by lighting every
                wire up!
                <br></br>
                This game uses a depth-first-search algorithm to light up
                connecting wires, as well as Kruskal's algorithm to generate
                random boards under the condition that all the wires can connect.
                <br></br><br></br>
                Due to academic integrity guidelines, this Github repo is only
                available on request (email).
              </p>
            </div>
            <div className="project-tags">
              <p>Java SE 11</p>
              <p>Eclipse IDE</p>
              <p>Java Funworld Library</p>
              <p>Depth-first Search</p>
              <p>Kruskal's Algorithm</p>
            </div>
          </div>
          <div className="project-preview">
            <video
              muted
              autoPlay
              loop
              playsInline
              width="100%"
              height="auto"
              onError={(e) => console.error('Video error:', e)}
              onLoadStart={() => console.log('Video loading started')}
              onCanPlay={() => console.log('Video can play')}
              onLoadedData={() => console.log('Video data loaded')}
            >
              <source src="/pictures/portfolio-content_spring2026/03_CODE/lightemall.mp4"
                type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        <div className="project">
          <div className="project-text">
            <div className="project-desc">
              <div className="project-title-time">
                <h3>ZType</h3>
                <p>Fundamentals of CS II | Spring 2024</p>
              </div>
              <p>Random combinations of letters will fall 
                from the top of the screen. Type them as 
                fast as you can before they hit the bottom 
                of the screen! When one of them hits the 
                bottom of the screen, you lose!
                <br></br><br></br>
                Due to academic integrity guidelines, this 
                Github repo is only available on request (email).
              </p>
            </div>
            <div className="project-tags">
              <p>Java SE 11</p>
              <p>Eclipse IDE</p>
              <p>Java Funworld Library</p>
              <p>Randomness</p>
              <p>Polymorphism</p>
              <p>JUnit4 Testing</p>
            </div>
          </div>
          <div className="project-preview">
            <video
              muted
              autoPlay
              loop
              playsInline
              width="100%"
              height="auto"
              onError={(e) => console.error('Video error:', e)}
              onLoadStart={() => console.log('Video loading started')}
              onCanPlay={() => console.log('Video can play')}
              onLoadedData={() => console.log('Video data loaded')}
            >
              <source src="/pictures/portfolio-content_spring2026/03_CODE/ztype.mp4"
                type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        <div className="project">
          <div className="project-text">
            <div className="project-desc">
              <div className="project-title-time">
                <h3>Anime Boston Redesign</h3>
                <p>Spring 2024</p>
              </div>
              <p> I improved the existing Anime Boston website by 
                addressing its lack of clear information hierarchy, 
                repetitive or obsolete content, and mismatched aesthetics. 
                My redesigned prototype of the homepage emphasizes what 
                makes Anime Boston unique: the people. By using the public 
                archive of professional photos from every past convention 
                and simplifying a lot of the information on the current 
                homepage, I emphasize the importance the people who make 
                Anime Boston special.
              </p>
            </div>
            <div className="project-tags">
              <p>HTML</p>
              <p>CSS</p>
              <p>JavaScript</p>
              <p>Bootstrap v5.3.3</p>
              <p>Information Hierarchy</p>
              <p>Web Design</p>
              <p>User Experience Design</p>
              <p>User Interface Design</p>
            </div>
          </div>
          <div className="project-preview">
            <video
              muted
              autoPlay
              loop
              playsInline
              width="100%"
              height="auto"
              onError={(e) => console.error('Video error:', e)}
              onLoadStart={() => console.log('Video loading started')}
              onCanPlay={() => console.log('Video can play')}
              onLoadedData={() => console.log('Video data loaded')}
            >
              <source src="/pictures/portfolio-content_spring2026/03_CODE/aniBos.mp4"
                type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        <div className="project">
          <div className="project-text">
            <div className="project-desc">
              <div className="project-title-time">
                <h3>3DMFA</h3>
                <p>Spring 2024</p>
              </div>
              <p>Can't see the 3D artifacts at the Boston Museum of 
                Fine Arts? Now you can!
                <br></br><br></br>
                The existing online MFA collection has documentation 
                of almost every artifact in every collection at the 
                museum, but they are only 2D photos. As a result, 
                the 3D artifacts lose their depth online. This 
                prototype website is an example of what a couple of 
                artifacts at the MFA would look like in a fully-developed 
                3D archive.
              </p>
            </div>
            <div className="project-tags">
              <p>HTML</p>
              <p>CSS</p>
              <p>JavaScript</p>
              <p>3D Models</p>
              <p>aframe.io</p>
              <p>Information Hierarchy</p>
              <p>Web Design</p>
              <p>User Experience Design</p>
              <p>User Interface Design</p>
            </div>
          </div>
          <div className="project-preview">
            <video
              muted
              autoPlay
              loop
              playsInline
              width="100%"
              height="auto"
              onError={(e) => console.error('Video error:', e)}
              onLoadStart={() => console.log('Video loading started')}
              onCanPlay={() => console.log('Video can play')}
              onLoadedData={() => console.log('Video data loaded')}
            >
              <source src="/pictures/portfolio-content_spring2026/03_CODE/3dmfa_2.mp4"
                type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        <div className="project">
          <div className="project-text">
            <div className="project-desc">
              <div className="project-title-time">
                <h3>Pipe Fantasy</h3>
                <p>Fundamentals of CS I | Fall 2023</p>
              </div>
              <p>Observe the starting pipe, and the list of incoming pipes. 
                Click on cells to place the left-most pipe in the list. 
                The goal is to create a path that will allow for the 
                longest goo-flow, resulting in a higher score! The round 
                ends when the pipe hits the edge of the screen or hits a 
                non-connective pipe.
                <br></br><br></br>
                Due to academic integrity guidelines, this Github repo 
                is only available on request (email).
                </p>
            </div>
            <div className="project-tags">
              <p>DrRacket BSL</p>
              <p>Recursion</p>
              <p>Lists</p>
              <p>Strings</p>
              <p>Conditionals</p>
              <p>Loops</p>
              <p>Graphics</p>
            </div>
          </div>
          <div className="project-preview">
            <video
              muted
              autoPlay
              loop
              playsInline
              width="100%"
              height="auto"
              onError={(e) => console.error('Video error:', e)}
              onLoadStart={() => console.log('Video loading started')}
              onCanPlay={() => console.log('Video can play')}
              onLoadedData={() => console.log('Video data loaded')}
            >
              <source src="/pictures/portfolio-content_spring2026/03_CODE/pipefantasy_1.mp4"
                type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

      </div>
    </main>
  );
} 