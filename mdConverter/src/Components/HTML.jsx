import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm';
import PropTypes from 'prop-types';
import React from 'react';

function HTML({md}) {

    const processedMarkdown = md.replace(/\r/g, '<br/>');
    return (
        <div id="html">
            <h2 className="title">Preview</h2>
            <div id="preview">
                <Markdown components={{br: React.Fragment}} remarkPlugins={[remarkGfm]}>{processedMarkdown}</Markdown>
            </div>
        </div>
    )
}

HTML.propTypes = {
    md: PropTypes.string,
};

export default HTML;
