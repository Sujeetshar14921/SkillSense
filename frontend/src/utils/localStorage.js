export const saveImprovedResume = (resumeText) => {
try {
const saved = JSON.parse(localStorage.getItem('improvedResumes') || '[]');
saved.unshift({ id: Date.now(), text: resumeText });
localStorage.setItem('improvedResumes', JSON.stringify(saved.slice(0, 20)));
} catch (e) { console.error(e); }
};


export const loadImprovedResumes = () => {
try {
return JSON.parse(localStorage.getItem('improvedResumes') || '[]');
} catch (e) { console.error(e); return []; }
};