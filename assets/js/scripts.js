function getElementValue(id) {
    return document.getElementById(id).value.trim();
}

function getElementLines(id) {
    return document.getElementById(id).value.split('\n').map(item => item.trim());
}

function getTeams() {
    return {
        home: {
            name: getElementValue('home-team-name'),
            level: getElementValue('home-team-level'),
            mode: getElementValue('home-team-mode'),
            line: getElementLines('home-team-line')
        },
        away: {
            name: getElementValue('away-team-name'),
            level: getElementValue('away-team-level'),
            mode: getElementValue('away-team-mode'),
            line: getElementLines('away-team-line')
        }
    };
}

function simulate() {
    let teams = getTeams();

    let setup = document.querySelector('.setup');
    let simu = document.querySelector('.simulate');
    let match = document.querySelector('.match');
    let homeDisplay = document.querySelector('.match-home');
    let scoreDisplay = document.querySelector('.match-score');
    let awayDisplay = document.querySelector('.match-away');

    setup.style.display = 'none';
    simu.style.display = 'none';
    match.style.display = 'block';

    homeDisplay.textContent = teams.home.name;
    awayDisplay.textContent = teams.away.name;

    const baseProbability = 25;
    let homeGoalProbability = baseProbability;
    let awayGoalProbability = baseProbability;

    if (teams.home.mode == "1") {
        homeGoalProbability -= 5;
        awayGoalProbability -= 15;
    } else if (teams.home.mode == "2") {
        homeGoalProbability += 8;
        awayGoalProbability -= 8;
    } else {
        homeGoalProbability += 15;
        awayGoalProbability += 5;
    }

    if (teams.away.mode == "1") {
        homeGoalProbability -= 15;
        awayGoalProbability -= 5;
    } else if (teams.away.mode == "2") {
        homeGoalProbability -= 8;
        awayGoalProbability += 8;
    } else {
        homeGoalProbability += 5;
        awayGoalProbability += 15;
    }

    let homeScore = simulateScore(teams.home.level, homeGoalProbability);
    let awayScore = simulateScore(teams.away.level, awayGoalProbability);

    scoreDisplay.textContent = `${homeScore}:${awayScore}`;
}

function simulateScore(teamLevel, goalProbability) {
    let score = 0;
    const roof = parseInt(teamLevel);

    for (let i = 0; i < 20; i++) {
        let action = Math.floor(Math.random() * (roof + 1));
        let attempt = Math.floor(Math.random() * 100) + 1;

        if (action < roof) {
            if (attempt <= goalProbability) {
                score++;
            }
        } else {
            if (attempt <= goalProbability) {
                score++;
            }
        }
    }

    return score;
}
