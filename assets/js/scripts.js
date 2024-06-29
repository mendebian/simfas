function getTeams() {
    let data = {
        home: {
            name: document.getElementById('home-team-name').value.trim(),
            level: document.getElementById('home-team-level').value.trim(),
            mode: document.getElementById('home-team-mode').value,
            line: document.getElementById('home-team-line').value.split('\n').map(item => item.trim())
        },
        away: {
            name: document.getElementById('away-team-name').value.trim(),
            level: document.getElementById('away-team-level').value.trim(),
            mode: document.getElementById('away-team-mode').value,
            line: document.getElementById('away-team-line').value.split('\n').map(item => item.trim())
        }
    };

    return(data);
}

function simulate() {
    let teams = getTeams();

    let setup = document.querySelector('.setup');
    let simu = document.querySelector('.simulate');
    let match = document.querySelector('.match');
    let home = document.querySelector('.match-home');
    let score = document.querySelector('.match-score');
    let away = document.querySelector('.match-away');
    let homeSummary = document.querySelector('.match-home-summary');
    let awaySummary = document.querySelector('.match-away-summary');
    let matchHistory = document.querySelector('.match-history');

    let historic = localStorage.getItem('historic') ? localStorage.getItem('historic') : '';

    setup.style.display = 'none';
    simu.style.display = 'none';
    match.style.display = 'block';
    matchHistory.style.display = 'block';

    home.textContent = teams.home.name;
    away.textContent = teams.away.name;
    matchHistory.textContent = historic;

    let roof = parseInt(teams.home.level) + parseInt(teams.away.level);
    let homeScore = 0;
    let awayScore = 0;
    let homeGoalProbability = 15;
    let awayGoalProbability = 15;

    if (teams.home.mode == "1") {
        homeGoalProbability -= 5;
        awayGoalProbability -= 10;
    } else if (teams.home.mode == "2") {
        homeGoalProbability -= 2;
        awayGoalProbability -= 7;
    } else if (teams.home.mode == "3") {
        homeGoalProbability += 3;
        awayGoalProbability -= 3;
    } else if (teams.home.mode == "4") {
        homeGoalProbability += 7;
        awayGoalProbability += 2;
    } else {
        homeGoalProbability += 10;
        awayGoalProbability += 5;
    }

    if (teams.away.mode == "1") {
        homeGoalProbability -= 10;
        awayGoalProbability -= 5;
    } else if (teams.away.mode == "2") {
        homeGoalProbability -= 7;
        awayGoalProbability -= 2;
    } else if (teams.away.mode == "3") {
        homeGoalProbability -= 3;
        awayGoalProbability += 3;
    } else if (teams.away.mode == "4") {
        homeGoalProbability += 2;
        awayGoalProbability += 7;
    } else {
        homeGoalProbability += 5;
        awayGoalProbability += 10;
    }

    function getAuthor() {
        return Math.floor(Math.random() * 10) + 1;
    }

    let timer = 0;
    for (let i = 0; i < 20; i++) {
        let action = Math.floor(Math.random() * (roof + 1));
        let attempt = Math.floor(Math.random() * 100) + 1;

        if (action < parseInt(teams.home.level)) {
            if (attempt <= homeGoalProbability) {
                homeScore++;
                homeSummary.textContent += `${teams.home.line[getAuthor()]} '${(timer * 5) + Math.floor(Math.random() * 6)}\n`
            }
        } else if (action > parseInt(teams.home.level)) {
            if (attempt <= awayGoalProbability) {
                awayScore++;
                awaySummary.textContent += `${teams.away.line[getAuthor()]} '${(timer * 5) + Math.floor(Math.random() * 6)}\n`
            }
        }
        timer++
    }
    score.textContent = homeScore + ":" + awayScore;

    historic = `${teams.home.name} ${homeScore}:${awayScore} ${teams.away.name}\n` + historic;
    localStorage.setItem('historic', historic);
}
