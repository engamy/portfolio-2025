import React from 'react';
import './about-style.css';
import { usePageDarkMode } from '../../hooks/usePageDarkMode';
import { useScrollVisibility } from '../../hooks/useScrollVisibility';
import { useScrollDarkMode } from '../../hooks/useScrollDarkMode';
import { getAssetPath } from '../../utils/assetUtils';


export default function About() {
  // Set darkMode to false for the about page
  usePageDarkMode(true);
  
  // Enable scroll-based dark mode for this page
  useScrollDarkMode(true);
  
  // Use scroll visibility hook for the h1 tag
  const isH1Visible = useScrollVisibility(20);

  return (
    <main
      className="about-container"
      style={{
        backgroundImage: `url(${getAssetPath('/pictures/portfolio-content_spring2026/05_ABOUT/background.jpg')})`
      }}
    >
      <div className="about-intro">
        <img 
          src={getAssetPath('/pictures/portfolio-content_spring2026/05_ABOUT/greece2024_pfp.jpg')} 
          alt="Amy Eng profile" 
          className="about-profile-image"
        />
        <h1 style={{ opacity: isH1Visible ? 1 : 0 }}>Hello, I'm Amy!</h1>
        <p>I'm a <span style={{fontWeight: 'bold'}}>Computer Science and Interaction Design</span> major at <span style={{fontWeight: 'bold'}}>Northeastern University</span>, currently based in <span style={{fontWeight: 'bold'}}>Boston</span>. I grew up in New Jersey with my family (and our cat, Ellie!).
          <br></br><br></br>
          I've been coding since middle school, using languages like <span style={{fontWeight: 'bold'}}>Java, Python, HTML/CSS, JavaScript, TypeScript, SQL</span>, and tools like <span style={{fontWeight: 'bold'}}>VS Code, IntelliJ, Cursor, Eclipse, and Git</span>. I'm passionate about <span style={{fontWeight: 'bold'}}>UI/UX design and full-stack development</span>.
          <br></br><br></br>
          As a lifelong artist, I have strong skills in both <span style={{fontWeight: 'bold'}}>traditional and digital media</span>, and I enjoy solving problems through <span style={{fontWeight: 'bold'}}>creative, user-focused design</span>.
          <br></br><br></br>
          Thanks for visiting — feel free to reach out!</p>

        <div className="about-contacticon">
          <a href="https://www.linkedin.com/in/amyeng895/" target="_blank" rel="noopener noreferrer">
            <img src={getAssetPath('/pictures/portfolio-content_spring2026/06_ICONS/linkedin.png')} alt="LinkedIn" />
          </a>
          <a href="https://www.instagram.com/yifeng.art/" target="_blank" rel="noopener noreferrer">
            <img src={getAssetPath('/pictures/portfolio-content_spring2026/06_ICONS/instagram.png')} alt="Instagram" />
          </a>
          <a href="https://github.com/engamy" target="_blank" rel="noopener noreferrer">
            <img src={getAssetPath('/pictures/portfolio-content_spring2026/06_ICONS/github.png')} alt="GitHub" />
          </a>
          <a href="https://www.youtube.com/@yifengart" target="_blank" rel="noopener noreferrer">
            <img src={getAssetPath('/pictures/portfolio-content_spring2026/06_ICONS/youtube.png')} alt="YouTube" />
          </a>
        </div>

        {/* <div className="resumes">
          <p>Download my Design Resume <a href="" target="_blank">here</a>!</p>
          <p>Download my CS Resume <a href={`${process.env.PUBLIC_URL}/pictures/portfolio-content_spring2026/05_ABOUT/EngAmy_CSResume_09292025.pdf`} target="_blank">here</a>!</p>
        </div> */}
      </div>

      <div className="about-inner-container">
        <div className="experience-container">
          <div className="experience-title">
            <h2>Experience</h2>
          </div>
          <div className="experience-inner-container">

            <div className="experience">
              <div className="experience-details">
                <h3>Engine Red Design Agency</h3>
                <p>Content Designer</p>
              </div>
              <div className="experience-time-place">
                <p>Boston, MA</p>
                <p>May 2025 - Present</p>
              </div>
            </div>

            <div className="experience">
              <div className="experience-details">
                <h3>Northeastern University Political Review (NUPR)</h3>
                <p>Layout Designer</p>
              </div>
              <div className="experience-time-place">
                <p>Boston, MA</p>
                <p>September 2024 - Present</p>
              </div>
            </div>

            <div className="experience">
              <div className="experience-details">
                <h3>Burning Rose YDSA</h3>
                <p>Graphic Designer, Illustrator, and Layout Designer</p>
              </div>
              <div className="experience-time-place">
                <p>Boston, MA</p>
                <p>September 2024 - Present</p>
              </div>
            </div>

            <div className="experience">
              <div className="experience-details">
                <h3>Community Built Association (CBA)</h3>
                <p>Website Designer</p>
              </div>
              <div className="experience-time-place">
                <p>Remote</p>
                <p>May 2024 - Present</p>
              </div>
            </div>

            <div className="experience">
              <div className="experience-details">
                <h3>The TJX Companies, Inc. | Marshalls</h3>
                <p>Graphic Design Co-op/Intern</p>
              </div>
              <div className="experience-time-place">
                <p>Framingham, MA</p>
                <p>January 2025 - June 2025</p>
              </div>
            </div>

            <div className="experience">
              <div className="experience-details">
                <h3>Scout (A Northeastern Student-led Design Agency)</h3>
                <p>Studio Team - Developer</p>
                <p>Playground Team - Designer</p>
              </div>
              <div className="experience-time-place">
                <p>Boston, MA</p>
                <p>January 2025 - April 2025</p>
                <p>October 2025 - Dec 2025</p>
              </div>
            </div>

            <div className="experience">
              <div className="experience-details">
                <h3>Outlier AI</h3>
                <p>AI Writing Evaluator</p>
              </div>
              <div className="experience-time-place">
                <p>Remote</p>
                <p>May 2024 - September 2024</p>
              </div>
            </div>

            <div className="experience">
              <div className="experience-details">
                <h3>Kumon Learning Center</h3>
                <p>Teaching Assistant</p>
              </div>
              <div className="experience-time-place">
                <p>New Jersey</p>
                <p>August 2019 - August 2023</p>
              </div>
            </div>

            <div className="experience">
              <div className="experience-details">
                <h3>NJHEART (Helping Educate Anti-Racist Teachers)</h3>
                <p>Website Manager</p>
              </div>
              <div className="experience-time-place">
                <p>New Jersey</p>
                <p>January 2022 - June 2023</p>
              </div>
            </div>

            <div className="experience">
              <div className="experience-details">
                <h3>Steel City Codes</h3>
                <p>Project-based Java Summer Camp Volunteer Instructor</p>
              </div>
              <div className="experience-time-place">
                <p>New Jersey</p>
                <p>June 2022</p>
              </div>
            </div>

          </div>
        </div>

        <div className="experience-container">
          <div className="experience-title">
            <h2>Education</h2>
          </div>
          <div className="experience-inner-container">

            <div className="experience">
              <div className="experience-details">
                <h3>Northeastern University</h3>
                <p>Computer Science and Interaction Design</p>
                <p><span>GPA: 3.84/4.00</span></p>
              </div>
              <div className="experience-time-place">
                <p>Boston, MA</p>
                <p>September 2023 - May 2027</p>
              </div>
            </div>

            <div className="experience">
              <div className="experience-details">
                <h3>Hunterdon Central Regional High School</h3>
                <p><span>GPA: 3.90/4.00</span></p>
              </div>
              <div className="experience-time-place">
                <p>New Jersey</p>
                <p>September 2019 - June 2023</p>
              </div>
            </div>
          </div>
        </div>

        <div className="experience-container">
          <div className="experience-title">
            <h2>Testimonies</h2>
          </div>
          <div className="testimonies-container">

            <div className="testimony-1">
              <div className="testimony-quote">
                <p>
                  It has been wonderful having Amy on our team. 
                  She is a <span>hard worker</span>, a resourceful 
                  <span> problem solver</span>, and a 
                  <span> skilled designer</span>... 
                  She has been a <span>go-getter</span> since day 
                  one and we have loved having her.
                </p>
              </div>
              <div className="testimony-name">
                <p>-Marshalls Creative Team</p>
              </div>
            </div>

            <div className="testimony-2">
              <div className="testimony-quote">
                <p>
                [Amy’s] work really shined, was executed at a very 
                professional level, and was refined, clean, and 
                solid.... She also demonstrated that <span>her work can 
                stand up against an established designer</span> on the team, 
                <span> even surpassing at times.</span>
                </p>
              </div>
              <div className="testimony-name">
                <p>-Marshalls Creative Manager</p>
              </div>
            </div>

          </div>
        </div>
      </div>

    </main>
  );
} 