import React, { useEffect } from 'react';

const VismeEmbed = () => {
  useEffect(() => {
    // Create a script element
    const script = document.createElement('script');
    script.src = "https://static-bundles.visme.co/forms/vismeforms-embed.js";
    script.async = true;

    // Append the script to the document body
    document.body.appendChild(script);

    // Clean up the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div className="visme_d"
      data-title="Untitled Project"
      data-url="eprow87y-untitled-project"
      data-domain="forms"
      data-full-page="false"
      data-min-height="500px"
      data-form-id="20926">
    </div>
  );
};

export default VismeEmbed;