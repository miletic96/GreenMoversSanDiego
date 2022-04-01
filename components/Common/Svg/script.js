
const commonSvgs = document.querySelectorAll('.common-svg');

commonSvgs.forEach(cs => {
    const urlEl = cs.querySelector('.common-svg-url');
    const contentEl = cs.querySelector('.common-svg-content');
    const url = urlEl.getAttribute('data-url');
    fetch(url).then((r) => {
        r.text().then(d => {
            contentEl.innerHTML = d;
            cs.replaceWith(contentEl);
        });
    });
});