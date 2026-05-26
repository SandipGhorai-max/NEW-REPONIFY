import React from 'react'

const Icons = {
  Windows: ({className}) => <svg className={className} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="8" height="8"/><rect x="13" y="3" width="8" height="8"/><rect x="3" y="13" width="8" height="8"/><rect x="13" y="13" width="8" height="8"/></svg>,
  macOS: ({className}) => <svg className={className} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15.5 11c0-1.8 1.3-2.9 1.5-3-1.2-1.8-3.1-2-3.8-2-.9-.1-1.9.5-2.5.5-.6 0-1.4-.5-2.2-.5-1.1 0-2.2.6-2.8 1.6-1.3 2.2-.3 5.4 1 7.2.6.9 1.3 1.8 2.3 1.8 1 0 1.4-.6 2.5-.6 1.1 0 1.5.6 2.5.6 1 .0 1.6-.9 2.2-1.8.5-.7 1-1.8 1.3-2.9-.1-.1-1.8-.7-1.8-2.7z"/><path d="M11.5 5.5c.3-1.1 1-2.1 1.9-2.5-.2 1.2-.8 2.2-1.7 2.8-.2-.3-.2-.3-.2-.3z"/></svg>,
  Linux: ({className}) => <svg className={className} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 13A4 4 0 1 0 15 13"/><path d="M12 4C9 4 7 7 7 10c0 1.5.5 3 1 4-1.5 2-2 4.5-2 6 0 1.5 1 2 2 2h8c1 0 2-.5 2-2 0-1.5-.5-4-2-6 .5-1 1-2.5 1-4 0-3-2-6-5-6z"/><path d="M10 9h.01"/><path d="M14 9h.01"/><path d="M8 19s2 1 4 1 4-1 4-1"/></svg>,
  beginner: ({className}) => <svg className={className} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V12"/><path d="M12 12C12 7 8 4 4 4c0 4 3 8 8 8z"/><path d="M12 14c0-4 3-7 7-7 0 4-3 7-7 7z"/></svg>,
  intermediate: ({className}) => <svg className={className} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  advanced: ({className}) => <svg className={className} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>,
  Settings: ({className}) => <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  Edit: ({className}) => <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
};

const osOptions = [
  { id: 'Windows', label: 'Windows', icon: 'Windows' },
  { id: 'macOS', label: 'macOS', icon: 'macOS' },
  { id: 'Linux', label: 'Linux', icon: 'Linux' }
];

const expOptions = [
  { id: 'beginner', label: 'Complete Beginner', desc: 'Never run a GitHub project before', icon: 'beginner' },
  { id: 'intermediate', label: 'Intermediate', desc: 'Ran a few projects, know the basics', icon: 'intermediate' },
  { id: 'advanced', label: 'Advanced', desc: 'Just give me the commands', icon: 'advanced' }
];

export { Icons, osOptions, expOptions }
