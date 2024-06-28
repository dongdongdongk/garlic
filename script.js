let garlicCount = 0;
let cursors = 0;
let farms = 0;
let factories = 0;
let labs = 0;
let colleges = 0;
let cursorCost = 15;
let farmCost = 100;
let factoryCost = 1000;
let labCost = 10000;
let collegeCost = 100000;

let totalGarlic = 0;
let totalClicks = 0;

const garlicCountElement = document.getElementById('garlic-count');
const cursorCountElement = document.getElementById('cursor-count');
const farmCountElement = document.getElementById('farm-count');
const factoryCountElement = document.getElementById('factory-count');
const garlicElement = document.getElementById('garlic');
const buyCursorButton = document.getElementById('buy-cursor');
const buyFarmButton = document.getElementById('buy-farm');
const buyFactoryButton = document.getElementById('buy-factory');
const farmUpgrade = document.getElementById('farm-upgrade');
const factoryUpgrade = document.getElementById('factory-upgrade');
const farmNameElement = document.getElementById('farm-name');
const factoryNameElement = document.getElementById('factory-name');
const labUpgrade = document.getElementById('lab-upgrade');
const collegeUpgrade = document.getElementById('college-upgrade');
const buyLabButton = document.getElementById('buy-lab');
const buyCollegeButton = document.getElementById('buy-college');
const labNameElement = document.getElementById('lab-name');
const collegeNameElement = document.getElementById('college-name');
const labCountElement = document.getElementById('lab-count');
const collegeCountElement = document.getElementById('college-count');

const totalGarlicElement = document.getElementById('total-garlic');
const garlicPerSecondElement = document.getElementById('garlic-per-second');
const totalClicksElement = document.getElementById('total-clicks');


// 게임 상태를 저장하는 함수
function saveGameState() {
    const gameState = {
        garlicCount,
        cursors,
        farms,
        factories,
        labs,
        colleges,
        cursorCost,
        farmCost,
        factoryCost,
        labCost,
        collegeCost,
        totalClicks
    };
    localStorage.setItem('garlicClickerState', JSON.stringify(gameState));
}

// 게임 상태를 불러오는 함수
function loadGameState() {
    const savedState = localStorage.getItem('garlicClickerState');
    if (savedState) {
        const gameState = JSON.parse(savedState);
        garlicCount = gameState.garlicCount;
        cursors = gameState.cursors;
        farms = gameState.farms;
        factories = gameState.factories;
        labs = gameState.labs;
        colleges = gameState.colleges;
        cursorCost = gameState.cursorCost;
        farmCost = gameState.farmCost;
        factoryCost = gameState.factoryCost;
        labCost = gameState.labCost;
        collegeCost = gameState.collegeCost;
        totalClicks = gameState.totalClicks;

        updateGarlicCount();
        updateCursorCount();
        updateFarmCount();
        updateFactoryCount();
        updateLabCount();
        updateCollegeCount();
        updateTotalClicks();
        updateGarlicPerSecond();
        checkUpgrades();
    }
}

// 주기적으로 게임 상태를 저장
function autoSave() {
    saveGameState();
}

// 10초마다 자동 저장
setInterval(autoSave, 10000);

// 페이지가 언로드될 때 저장
window.addEventListener('beforeunload', saveGameState);


garlicElement.addEventListener('click', () => {
    garlicCount++;
    updateGarlicCount();
    checkUpgrades();
});

buyCursorButton.addEventListener('click', () => {
    if (garlicCount >= cursorCost) {
        garlicCount -= cursorCost;
        cursors++;
        cursorCost = Math.floor(cursorCost * 1.15);
        buyCursorButton.textContent = `마늘초 구매`;
        document.getElementById('cursor-cost').textContent = cursorCost;
        updateGarlicCount();
        updateCursorCount();
    }
});

buyFarmButton.addEventListener('click', () => {
    if (garlicCount >= farmCost) {
        garlicCount -= farmCost;
        farms++;
        farmCost = Math.floor(farmCost * 1.15);
        buyFarmButton.textContent = `마늘 농장 구매`;
        document.getElementById('farm-cost').textContent = farmCost;
        updateGarlicCount();
        updateFarmCount();
    }
});

buyFactoryButton.addEventListener('click', () => {
    if (garlicCount >= factoryCost) {
        garlicCount -= factoryCost;
        factories++;
        factoryCost = Math.floor(factoryCost * 1.15);
        buyFactoryButton.textContent = `마늘 공장 구매`;
        document.getElementById('factory-cost').textContent = factoryCost;
        updateGarlicCount();
        updateFactoryCount();
    }
});

buyLabButton.addEventListener('click', () => {
    if (garlicCount >= labCost) {
        garlicCount -= labCost;
        labs++;
        labCost = Math.floor(labCost * 1.15);
        buyLabButton.textContent = `마늘 연구소 구매`;
        document.getElementById('lab-cost').textContent = labCost;
        updateGarlicCount();
        updateLabCount();
    }
});

// buyCollegeButton.addEventListener('click', () => {
//     if (garlicCount >= collegeCost) {
//         garlicCount -= collegeCost;
//         towers++;
//         collegeCost = Math.floor(collegeCost * 1.15);
//         buyTowerButton.textContent = `마늘 대학 구매`;
//         document.getElementById('college-cost').textContent = collegeCost;
//         updateGarlicCount();
//         updateCollegeCount();
//     }
// });

function updateGarlicCount() {
    garlicCountElement.textContent = garlicCount;
}

function updateCursorCount() {
    cursorCountElement.textContent = cursors;
}

function updateFarmCount() {
    farmCountElement.textContent = farms;
}

function updateFactoryCount() {
    factoryCountElement.textContent = factories;
}

function updateLabCount() {
    labCountElement.textContent = labs;
}

function updateCollegeCount() {
    collegeCountElement.textContent = colleges;
}



function updateTotalGarlic() {
    totalGarlicElement.textContent = totalGarlic;
}


function updateTotalClicks() {
    totalClicksElement.textContent = totalClicks;
}

function updateGarlicPerSecond() {
    const garlicPerSecond = cursors + farms * 5 + factories * 50 + labs * 500 + colleges * 5000;
    garlicPerSecondElement.textContent = garlicPerSecond;
}

function autoGarlicProduction() {
    const production = cursors + farms * 5 + factories * 50 + labs * 500 + colleges * 5000;
    garlicCount += production;
    updateGarlicCount();
    updateGarlicPerSecond();
    checkUpgrades();
}


// function autoGarlicProduction() {
//     garlicCount += cursors;
//     garlicCount += farms * 5;
//     garlicCount += factories * 50;
//     garlicCount += labs * 500;
//     garlicCount += towers * 5000;
//     updateGarlicCount();
//     checkUpgrades();
// }

function checkUpgrades() {
    if (garlicCount >= 100 && farmUpgrade.classList.contains('locked')) {
        farmUpgrade.classList.remove('locked');
        buyFarmButton.disabled = false;
        buyFarmButton.textContent = "마늘 농장 구매";
        farmNameElement.textContent = "마늘 농장";
        document.querySelector('#farm-upgrade .question-icon').style.display = 'none';
        document.querySelector('#farm-upgrade .real-icon').style.display = 'block';
        labUpgrade.style.display = 'block';  // 연구소 업그레이드 표시
    }
    if (garlicCount >= 1000 && factoryUpgrade.classList.contains('locked')) {
        factoryUpgrade.classList.remove('locked');
        buyFactoryButton.disabled = false;
        buyFactoryButton.textContent = "마늘 공장 구매";
        factoryNameElement.textContent = "마늘 공장";
        document.querySelector('#factory-upgrade .question-icon').style.display = 'none';
        document.querySelector('#factory-upgrade .real-icon').style.display = 'block';
    }
    if (garlicCount >= 10000 && labUpgrade.classList.contains('locked')) {
        labUpgrade.classList.remove('locked');
        buyLabButton.disabled = false;
        buyLabButton.textContent = "마늘 연구소 구매";
        labNameElement.textContent = "마늘 연구소";
        document.querySelector('#lab-upgrade .question-icon').style.display = 'none';
        document.querySelector('#lab-upgrade .real-icon').style.display = 'block';
    }
    if (garlicCount >= 100000 && collegeUpgrade.classList.contains('locked')) {
        collegeUpgrade.classList.remove('locked');
        buyCollegeButton.disabled = false;
        buyCollegeButton.textContent = "마늘 대학 구매";
        collegeNameElement.textContent = "마늘 대학";
        document.querySelector('#college-upgrade .question-icon').style.display = 'none';
        document.querySelector('#college-upgrade .real-icon').style.display = 'block';
    }
}

garlicElement.addEventListener('click', () => {
    garlicCount++;
    totalClicks++;
    updateGarlicCount();
    updateTotalClicks();
    checkUpgrades();
});

setInterval(autoGarlicProduction, 1000);

// 게임 초기화 시 저장된 상태 불러오기
loadGameState();

// 초기 업데이트
updateGarlicCount();
updateTotalGarlic();
updateTotalClicks();
updateGarlicPerSecond();
updateCursorCount();
updateFarmCount();
updateFactoryCount();
updateLabCount();
updateCollegeCount();
checkUpgrades()