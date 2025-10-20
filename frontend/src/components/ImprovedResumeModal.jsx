import React from 'react';
import { saveAs } from 'file-saver';


const ImprovedResumeModal = ({ improvedText, onClose }) => {
if (!improvedText) return null;


const download = () => {
const blob = new Blob([improvedText], { type: 'text/plain;charset=utf-8' });
saveAs(blob, 'Improved_Resume.txt');
};


return (
<div className="fixed inset-0 bg-black/40 flex items-center justify-center">
<div className="bg-white rounded-lg w-11/12 md:w-3/4 p-4">
<div className="flex justify-between items-center">
<h3 className="text-lg font-semibold">AI Improved Resume</h3>
<div className="flex gap-2">
<button onClick={download} className="px-3 py-1 bg-indigo-600 text-white rounded">Download</button>
<button onClick={onClose} className="px-3 py-1 border rounded">Close</button>
</div>
</div>
<pre className="mt-3 max-h-96 overflow-auto text-sm bg-gray-50 p-3 rounded">{improvedText}</pre>
</div>
</div>
);
};


export default ImprovedResumeModal;