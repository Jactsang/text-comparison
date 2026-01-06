import * as Diff from 'diff';
import * as Diff2Html from 'diff2html';
import hljs from 'highlight.js';

document.addEventListener('DOMContentLoaded', () => {
    const leftTextArea = document.getElementById('left-text') as HTMLTextAreaElement;
    const rightTextArea = document.getElementById('right-text') as HTMLTextAreaElement;
    const compareButton = document.getElementById('compare-btn') as HTMLButtonElement;
    const outputDiv = document.getElementById('diff-output') as HTMLDivElement;

    compareButton.addEventListener('click', () => {
        const leftText = leftTextArea.value;
        const rightText = rightTextArea.value;

        // Generate unified diff using js-diff
        //const diffStr = Diff.createTwoFilesPatch('Left', 'Right', leftText, rightText);
        const diffStr = Diff.createTwoFilesPatch(
            'Comparison',
            'Comparison',
            leftText,
            rightText,
            '', // oldHeader (optional)
            '', // newHeader (optional)
            { context: Number.MAX_SAFE_INTEGER } // This includes full context
        );

        // Configure diff2html with highlight.js
        const diffHtml = Diff2Html.html(diffStr, {
            drawFileList: false,
            matching: 'lines',
            outputFormat: 'side-by-side',
            diffStyle: 'word',
        });

        // Render the HTML
        outputDiv.innerHTML = diffHtml;

        // Manually highlight code blocks if needed (diff2html integrates hljs, but ensure it's applied)
        outputDiv.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightElement(block as HTMLElement);
        });
    });
});