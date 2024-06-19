function getTeams() {
    let homeName = document.getElementById('home-team-name').value.trim();
    let homeLevel = document.getElementById('home-team-level').value.trim();
    let homeMode = document.getElementById('home-team-mode').value;
    let homeLine = document.getElementById('home-team-line').value.split('\n').map(item => item.trim());

    let awayName = document.getElementById('away-team-name').value.trim();
    let awayLevel = document.getElementById('away-team-level').value.trim();
    let awayMode = document.getElementById('away-team-mode').value;
    let awayLine = document.getElementById('away-team-line').value.split('\n').map(item => item.trim());

    if (homeName === '' || homeLevel === '' || awayName === '' || awayLevel === '') {
        return alert('Por favor, preencha todos os campos obrigatórios (nomes e níveis).');
    }

    if (homeLine.length !== 6 || awayLine.length !== 6) {
        return alert('O campo "Titulares" deve conter exatamente 6 linhas.');
    }

    let homeTeam = {
        name: homeName,
        level: homeLevel,
        mode: homeMode,
        line: homeLine
    };

    let awayTeam = {
        name: awayName,
        level: awayLevel,
        mode: awayMode,
        line: awayLine
    };

    let data = {
        home: homeTeam,
        away: awayTeam
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

    setup.style.display = 'none';
    simu.style.display = 'none';
    match.style.display = 'block';

    home.textContent = teams.home.name;
    away.textContent = teams.away.name;

    let roof = parseInt(teams.home.level) + parseInt(teams.away.level);
    let homeScore = 0;
    let awayScore = 0;
    let homeGoalProbability = 25;
    let awayGoalProbability = 25;

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

    for (let i = 0; i < 20; i++) {
        let action = Math.floor(Math.random() * (roof + 1));
        let attempt = Math.floor(Math.random() * 100) + 1;

        if (action < parseInt(teams.home.level)) {
            if (attempt <= homeGoalProbability) {
                homeScore++
            }
        } else if (action > parseInt(teams.home.level)) {
            if (attempt <= awayGoalProbability) {
                awayScore++
            }
        }
    }
    score.textContent = homeScore + ":" + awayScore;
}