import React from 'react';
import { EMAIL, RESUME_URL } from '../../data/contact';

/**
 * Links out to the resume, or renders disabled when no link is set yet, so a
 * missing resume never ships as a button that goes nowhere.
 */
export const ResumeButton: React.FC = () =>
  RESUME_URL ? (
    <a className="btn" href={RESUME_URL} target="_blank" rel="noopener noreferrer">
      Resume (PDF)
    </a>
  ) : (
    <span className="btn pending" aria-disabled="true" title="Resume link coming soon">
      Resume (PDF)
    </span>
  );

export const EmailButton: React.FC = () => (
  <a className="btn" href={`mailto:${EMAIL}`}>
    Email
  </a>
);

/** The resume and email pair, used in the hero and the footer. */
const ContactButtons: React.FC = () => (
  <>
    <ResumeButton />
    <EmailButton />
  </>
);

export default ContactButtons;
