const input = document.getElementById('wordInput');
const container = document.getElementById('result-container');
const grid = document.getElementById('periodic-grid');
const modal = document.getElementById('tableModal');

const symbolMap = {};
for (let s in elements) { symbolMap[s.toLowerCase()] = s; }

function initGrid() {
    grid.innerHTML = '';
    for (let sym in elements) {
        const data = elements[sym];
        const tile = document.createElement('div');
        // data[4] is the class name from your JSON
        tile.className = `mini-tile ${data[4]}`;
        tile.style.gridRow = data[2];
        tile.style.gridColumn = data[3];
        tile.innerHTML = `<span style="font-size:0.5rem; opacity:0.8">${data[0]}</span><strong>${sym}</strong>`;
        
        tile.addEventListener('click', () => {
            input.value += sym;
            updateDisplay();
        });
        grid.appendChild(tile);
    }
}

// Modal Logic
const openModal = () => modal.classList.add('active');
const closeModal = () => modal.classList.remove('active');

document.getElementById('openModal').onclick = openModal;
document.getElementById('closeModal').onclick = closeModal;

// Close on Escape Key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('tableModal');
        if (modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    }
});

// Close on clicking outside the content (on the overlay)
document.getElementById('tableModal').addEventListener('click', (e) => {
    if (e.target.id === 'tableModal') {
        e.target.classList.remove('active');
    }
});

function updateDisplay() {
    const text = input.value.replace(/[^a-zA-Z ]/g, "");
    container.innerHTML = '';
    if (!text.trim()) return;

    const tiles = findElements(text.toLowerCase());
    if (tiles) {
        renderTiles(tiles);
    } else {
        container.innerHTML = `<p style="color:#ff5252; margin-top:20px;">Cannot construct word.</p>`;
    }
}

input.addEventListener('input', updateDisplay);

// Recursive Finder
function findElements(str) {
    if (str === "") return [];
    if (str.length >= 2) {
        const twoLetter = str.substring(0, 2);
        if (symbolMap[twoLetter]) {
            const rest = findElements(str.substring(2));
            if (rest !== null) return [symbolMap[twoLetter], ...rest];
        }
    }
    const oneLetter = str.substring(0, 1);
    if (symbolMap[oneLetter]) {
        const rest = findElements(str.substring(1));
        if (rest !== null) return [symbolMap[oneLetter], ...rest];
    }
    if (oneLetter === " ") {
        const rest = findElements(str.substring(1));
        if (rest !== null) return ["SPACE", ...rest];
    }
    return null;
}

function renderTiles(symbols) {
    symbols.forEach(sym => {
        if (sym === "SPACE") {
            const spacer = document.createElement('div');
            spacer.style.width = '30px';
            container.appendChild(spacer);
            return;
        }
        const data = elements[sym];
        const tile = document.createElement('div');
        tile.className = `element-tile ${data[4]}`;
        tile.innerHTML = `
            <span style="position:absolute; top:8px; left:10px; font-size:0.8rem">${data[0]}</span>
            <span style="font-size:2.2rem; font-weight:bold">${sym}</span>
            <span style="font-size:0.6rem; text-transform:uppercase; margin-top:5px">${data[1]}</span>
        `;
        container.appendChild(tile);
    });
}

initGrid();