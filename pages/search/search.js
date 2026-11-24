﻿/* ==========================================================
   Search Page - CET Paper Finder
   Keyword examples:
     "2025"           → all 2025 papers
     "CET-4 2025"     → CET-4 2025 papers
     "CET-6 2025-12"  → CET-6 December 2025
     "2024 set1"      → all first sets of 2024
     "cet4 2025 06 1" → CET-4 June 2025 Set 1 (exact)
     "第一套 2025"    → all Set 1 of 2025 (Chinese keyword)
========================================================== */

// ---- Paper Database (manually maintained, regenerate from PowerShell if needed) ----
var PAPERS = [
    // CET-4
    { type: 'CET-4', year: 2024, month: '06', set: 1, label: 'CET-4 2024 June Set 1', file: 'cet4_2024_06_1.pdf', url: '../CET-4/papers/cet4_2024_06_1.pdf' },
    { type: 'CET-4', year: 2024, month: '06', set: 2, label: 'CET-4 2024 June Set 2', file: 'cet4_2024_06_2.pdf', url: '../CET-4/papers/cet4_2024_06_2.pdf' },
    { type: 'CET-4', year: 2024, month: '06', set: 3, label: 'CET-4 2024 June Set 3', file: 'cet4_2024_06_3.pdf', url: '../CET-4/papers/cet4_2024_06_3.pdf' },
    { type: 'CET-4', year: 2025, month: '06', set: 1, label: 'CET-4 2025 June Set 1', file: 'cet4_2025_06_1.pdf', url: '../CET-4/papers/cet4_2025_06_1.pdf' },
    { type: 'CET-4', year: 2025, month: '06', set: 2, label: 'CET-4 2025 June Set 2', file: 'cet4_2025_06_2.pdf', url: '../CET-4/papers/cet4_2025_06_2.pdf' },
    { type: 'CET-4', year: 2025, month: '06', set: 3, label: 'CET-4 2025 June Set 3', file: 'cet4_2025_06_3.pdf', url: '../CET-4/papers/cet4_2025_06_3.pdf' },
    { type: 'CET-4', year: 2026, month: '06', set: 1, label: 'CET-4 2026 June Set 1', file: 'cet4_2026_06_1.pdf', url: '../CET-4/papers/cet4_2026_06_1.pdf' },
    { type: 'CET-4', year: 2026, month: '06', set: 2, label: 'CET-4 2026 June Set 2', file: 'cet4_2026_06_2.pdf', url: '../CET-4/papers/cet4_2026_06_2.pdf' },
    { type: 'CET-4', year: 2026, month: '06', set: 3, label: 'CET-4 2026 June Set 3', file: 'cet4_2026_06_3.pdf', url: '../CET-4/papers/cet4_2026_06_3.pdf' },
    // CET-6
    { type: 'CET-6', year: 2025, month: '06', set: 1, label: 'CET-6 2025 June Set 1', file: 'cet6_2025_06_1.pdf', url: '../CET-6/papers/cet6_2025_06_1.pdf' },
    { type: 'CET-6', year: 2025, month: '06', set: 2, label: 'CET-6 2025 June Set 2', file: 'cet6_2025_06_2.pdf', url: '../CET-6/papers/cet6_2025_06_2.pdf' },
    { type: 'CET-6', year: 2025, month: '06', set: 3, label: 'CET-6 2025 June Set 3', file: 'cet6_2025_06_3.pdf', url: '../CET-6/papers/cet6_2025_06_3.pdf' },
    { type: 'CET-6', year: 2025, month: '12', set: 1, label: 'CET-6 2025 Dec Set 1',  file: 'cet6_2025_12_1.pdf', url: '../CET-6/papers/cet6_2025_12_1.pdf' },
    { type: 'CET-6', year: 2025, month: '12', set: 2, label: 'CET-6 2025 Dec Set 2',  file: 'cet6_2025_12_2.pdf', url: '../CET-6/papers/cet6_2025_12_2.pdf' },
    { type: 'CET-6', year: 2025, month: '12', set: 3, label: 'CET-6 2025 Dec Set 3',  file: 'cet6_2025_12_3.pdf', url: '../CET-6/papers/cet6_2025_12_3.pdf' },
    { type: 'CET-6', year: 2026, month: '06', set: 1, label: 'CET-6 2026 June Set 1', file: 'cet6_2026_06_1.pdf', url: '../CET-6/papers/cet6_2026_06_1.pdf' },
    { type: 'CET-6', year: 2026, month: '06', set: 2, label: 'CET-6 2026 June Set 2', file: 'cet6_2026_06_2.pdf', url: '../CET-6/papers/cet6_2026_06_2.pdf' },
    { type: 'CET-6', year: 2026, month: '06', set: 3, label: 'CET-6 2026 June Set 3', file: 'cet6_2026_06_3.pdf', url: '../CET-6/papers/cet6_2026_06_3.pdf' },
];

// ---- Parse user query into filters ----
function parseQuery(query) {
    var q = query.toLowerCase().trim();
    var filter = { type: null, year: null, month: null, set: null };

    // Extract exam type
    if (/cet\s*-?\s*4/.test(q)) { filter.type = 'CET-4'; }
    if (/cet\s*-?\s*6/.test(q)) { filter.type = 'CET-6'; }
    if (/cet4/.test(q)) { filter.type = 'CET-4'; }
    if (/cet6/.test(q)) { filter.type = 'CET-6'; }

    // Chinese exam keywords
    if (/(英语)?四级|cet\s*4|cet-?4/.test(query)) { filter.type = 'CET-4'; }
    if (/(英语)?六级|cet\s*6|cet-?6/.test(query)) { filter.type = 'CET-6'; }

    // Extract set number (supports "set1", "set 1", "第1套", "第一套", "1套")
    var setMatch = q.match(/set\s*(\d)/) || q.match(/第\s*(\d+)\s*套/) || q.match(/(\d+)\s*套/);
    if (setMatch) { filter.set = parseInt(setMatch[1]); }

    // Extract numbers (years and months)
    var numbers = q.match(/\d+/g);
    if (numbers) {
        for (var i = 0; i < numbers.length; i++) {
            var n = parseInt(numbers[i]);
            if (n >= 2000 && n <= 2100) {
                filter.year = n;                           // 4-digit → year
            } else if (n >= 1 && n <= 12 && filter.year && !filter.month) {
                filter.month = n.toString().padStart(2, '0'); // 2-digit after year → month
            } else if (n >= 1 && n <= 3 && !filter.set) {
                filter.set = n;                            // 1-3 → set number
            }
        }
    }

    return filter;
}

// ---- Apply filters to database ----
function searchPapers(query) {
    var filter = parseQuery(query);
    var results = PAPERS.filter(function(p) {
        if (filter.type && p.type !== filter.type) return false;
        if (filter.year && p.year !== filter.year) return false;
        if (filter.month && p.month !== filter.month) return false;
        if (filter.set && p.set !== filter.set) return false;
        return true;
    });
    return results;
}

// ---- Render results to page ----
function showResults(results, query) {
    var container = document.getElementById('searchResults');

    if (results.length === 0) {
        container.innerHTML = '<p style="text-align:center;color:#999;padding:40px;">No papers match your search. Try: <a href="#" onclick="document.getElementById(\'searchInput\').value=\'2025\';doSearch();return false;">2025</a>, <a href="#" onclick="document.getElementById(\'searchInput\').value=\'CET-6 2025\';doSearch();return false;">CET-6 2025</a></p>';
        return;
    }

    // Group results by type + year
    var groups = {};
    results.forEach(function(p) {
        var key = p.type + ' ' + p.year + '-' + p.month;
        if (!groups[key]) groups[key] = [];
        groups[key].push(p);
    });

    // Build HTML
    var html = '<p style="margin-bottom:15px;color:#666;">Found <strong>' + results.length + '</strong> paper(s)' + (query ? ' for "<em>' + query + '</em>"' : '') + '</p>';

    Object.keys(groups).sort().forEach(function(key) {
        html += '<h3 style="margin:20px 0 10px;color:var(--theme);border-left:4px solid var(--theme);padding-left:10px;">' + key + '</h3>';
        html += '<div class="grid">';
        groups[key].forEach(function(p) {
            html += '<div class="card">';
            html += '  <div style="padding:15px;text-align:center;">';
            html += '    <div style="font-size:40px;"></div>';
            html += '    <div class="card-title">' + p.type + ' ' + p.year + ' ' + (p.month === '06' ? 'June' : 'Dec') + ' Set ' + p.set + '</div>';
            html += '    <div style="margin-top:8px;">';
            html += '      <a href="' + p.url + '" target="_blank" style="color:var(--theme);font-size:13px;margin-right:10px;"> Download</a>';
            html += '      <a href="' + p.url + '" target="_blank" style="color:var(--theme);font-size:13px;"> Preview</a>';
            html += '    </div>';
            html += '  </div>';
            html += '</div>';
        });
        html += '</div>';
    });

    container.innerHTML = html;
}

// ---- Main entry ----
function doSearch() {
    var q = document.getElementById('searchInput').value.trim();
    var results = searchPapers(q);
    showResults(results, q);
}

// ---- Quick filters (clickable tags) ----
function quickFilter(filter) {
    document.getElementById('searchInput').value = filter;
    doSearch();
}

// ---- Load all papers on page open ----
window.addEventListener('DOMContentLoaded', function() {
    showResults(PAPERS, '');
});
