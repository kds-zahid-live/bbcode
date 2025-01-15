import React, { useState, useEffect } from 'react';
import './App.css';

import Tools from './Tools';  // Import Tools component

function BacklinkGenerator() {
  const [keywords, setKeywords] = useState('');
  const [backlinks, setBacklinks] = useState('');
  const [generatedLinks, setGeneratedLinks] = useState([]);
  const [error, setError] = useState('');
  const [showGoTopBtn, setShowGoTopBtn] = useState(false);
  const [isLowerCase, setIsLowerCase] = useState(true); // Toggle for lowercase

  const handleGenerate = () => {
    const keywordArray = keywords.split('\n').map((kw) => kw.trim());
    const backlinkArray = backlinks.split('\n').map((bl) => bl.trim());

    if (keywordArray.length !== backlinkArray.length || keywordArray.length === 0) {
      setError('The number of keywords and backlinks must match, and neither field can be empty!');
      return;
    }

    setError('');
    const links = keywordArray.map((keyword, index) => {
      const link = backlinkArray[index].replace(/\/+$/, ''); // Remove trailing slashes
      const finalKeyword = isLowerCase ? keyword.toLowerCase() : keyword;
      const bbcodeLink = `[url=${link}]${finalKeyword}[/url]`;
      const bbcodeImage = `[url=${link}][img]  paste_img_link_here  [/img][/url]`;
      return { bbcodeLink, bbcodeImage, renderedLink: bbcodeLink };
    });
    setGeneratedLinks(links);
  };

  // const copyLinks = () => {
  //   const linksToCopy = generatedLinks.map((item) => item.bbcodeLink).join('\n');
  //   navigator.clipboard
  //     .writeText(linksToCopy)
  //     .then(() => alert('BBCode links copied to clipboard!'))
  //     .catch((err) => alert(`Failed to copy links: ${err}`));
  // };

  const copyLinks = () => {
    const linksToCopy = generatedLinks
      .map(
        (item) => `${item.bbcodeLink}\t${item.bbcodeImage}` // Concatenate both BBCode and Image BBCode
      )
      .join('\n'); // Separate each pair by a blank line for better readability
    
    navigator.clipboard
      .writeText(linksToCopy)
      .then(() => alert('Copied to clipboard!'))
      .catch((err) => alert(`Failed to copy links: ${err}`));
  };
  

  const clearAll = () => {
    setKeywords('');
    setBacklinks('');
    setGeneratedLinks([]);
    setError('');
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowGoTopBtn(true);
      } else {
        setShowGoTopBtn(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h1>BBCode Generator</h1>
        <p>Generate BBCode.</p>
      </div>

      <div className="form-container">
        <label htmlFor="keywords">Keywords:</label>
        <textarea
          id="keywords"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="Keyword 1&#10;Keyword 2&#10;..."
        />

        <label htmlFor="backlinks">Links:</label>
        <textarea
          id="backlinks"
          value={backlinks}
          onChange={(e) => setBacklinks(e.target.value)}
          placeholder="link 1&#10;link 2&#10;..."
        />

        <div className="toggle-container">
          <label htmlFor="toggleCase">Lowercase keywords:</label>
          <input
            type="checkbox"
            id="toggleCase"
            checked={isLowerCase}
            onChange={() => setIsLowerCase((prev) => !prev)}
          />
          <br />
          <br />
        </div>

        <button onClick={handleGenerate}>Generate BBCode</button>
        {error && <p className="error">{error}</p>}
      </div>

      {generatedLinks.length > 0 && (
        <>
          <h2>Generated BBCode</h2>
          <table>
            <thead>
              <tr>
                <th>BBCode</th>
                <th>Image BBCode</th>
              </tr>
            </thead>
            <tbody>
              {generatedLinks.map((item, index) => (
                <tr key={index}>
                  <td>{item.bbcodeLink}</td>
                  <td>{item.bbcodeImage}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <br />
          <button id="copyBtn" onClick={copyLinks}>
            Copy
          </button>
          <button id="clearBtn" onClick={clearAll}>
            Clear
          </button>
        </>
      )}

      <footer>
        <p>
          <span className="copyright">©</span> {new Date().getFullYear()} BBCode Generator - Created with ❤️ by Zahid Hasan
        </p>
      </footer>
      <Tools />

      {/* Floating Buttons */}
      <div className="scroll-button-container">
        <button id="goBottomBtn" className="scroll-button" onClick={scrollToBottom}>
          ↓
        </button>
        {showGoTopBtn && (
          <button id="goTopBtn" className="scroll-button" onClick={scrollToTop}>
            ↑
          </button>
        )}
      </div>
    </div>
  );
}

export default BacklinkGenerator;
