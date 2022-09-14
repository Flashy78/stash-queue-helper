// ==UserScript==
// @name        Stash Queue Helper
// @namespace   https://github.com/Flashy78/stash-queue-helper
// @description Adds extra functionality to the edit queue. Created to help power through batch updates that are easy to verify. Please continue to edit thoughtfully.
// @grant       none
// @version     0.1.0
// @author      Flashy
// @match       https://stashdb.org/users/*
// @require     https://cdn.jsdelivr.net/npm/@violentmonkey/dom@2
// ==/UserScript==

(function () {
    'use strict';

    const btnId = 'batch-save';
    const startLabel = 'Approve All';
    const btn = document.createElement("button");
    btn.setAttribute("id", btnId);
    btn.classList.add('btn', 'btn-primary', 'ml-3');
    btn.innerHTML = startLabel;
    btn.onclick = () => {
        approveAll();
    };


    function approveAll() {
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-danger');
        for (const radio of document.querySelectorAll('input[id$="-vote-yes"]')) {
            radio.click();
        }
        for (const saveDiv of document.querySelectorAll('div.VoteBar-save > button')) {
            saveDiv.click();
        }
    }

    const disconnect = VM.observe(document.body, () => {
        const paginationElements = document.querySelectorAll('.pagination');

        if (paginationElements.length === 2) {
            paginationElements[1].parentNode.insertBefore(btn, paginationElements[1]);

            return true;
        }
    });
})();
