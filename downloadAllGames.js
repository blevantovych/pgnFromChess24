// delete window.allGames;
// delete window.downloadGames;

var allGames = "";

var getGame = () => {
	const event = $('h2.title').text();
	const round = $('h2.subTitle').text().replace('Round ', '');
	const result = $('div.score').slice(0, 2).text().split('').reverse().join('')
					.replace(/(.)(.)/g, (str, w, b) => { return w + '-' + b }).replace(/½/g, '1/2');

	let names = [];
	let elos  = [];
	let moves = [];

	$('h2.name').slice(0,2).each(function() {
    	names.push($(this).text());
	});

	$('span.elo').slice(0, 2).each(function() {
		elos.push($(this).text());
	});

	(() => {

		let pasteMove = true;
		let moveNum = 1;
		$('span.move').each(function() {
			if (pasteMove) {
				if (moveNum % 6 === 0){
					moves.push('\n' + moveNum.toString() + '.');
				}
				else {
					moves.push(moveNum.toString() + '.');
				}

				pasteMove = false;
				moveNum += 1;
			} else {
				pasteMove = true;
			}
    		moves.push($(this).text().trim());
		});
		moves = moves.join(' ');
	})();


	allGames += `[Event "${event}"]\n[Round "${round}"]\n[Result "${result}"]\n[White "${names[1]}"]\n[Black "${names[0]}"]\n[WhiteElo "${elos[1]}"]\n[BlackElo "${elos[0]}"]\n\n${moves} ${result}\n\n`;

};

var downloadGames = () => {
	let filename = 'games.pgn';
	let blob = new Blob([allGames], {type: 'text/plain'}),
    	e    = document.createEvent('MouseEvents'),
    	a    = document.createElement('a');

    a.download = filename;
    a.href = window.URL.createObjectURL(blob);
    a.dataset.downloadurl =  ['text/plain', a.download, a.href].join(':');
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(e);
};

// $('.cPagination, .simplified').find('li.goFirst > a')[1].click(); // go to the first page


// $('.cPagination, .simplified').find('li.goLast > a')[1].click(); // go to the last page

// $('div.prevGame > a')[0].click(); // go  to the previous game

// $('div.nextGame > a')[0].click(); // go  to the next game

// $('div.nextGame > a').hasClass('disabled') // can be cached

// let nextBtn = $('div.nextGame > a');

var gamesInPage = 7; // make it const
var pages = $('.cPagination, .simplified').find('a.active').last().attr('data-value')
var games = 0;
var pagesSoFar = 0;

function next() {

	if( games == gamesInPage) {
		pagesSoFar++;
		$('li.goNext a').last()[0].click(); // go to the next page
		$('table.items').find('tr.gameContainer:nth-child(1)').find('a')[1].click(); // go to the first game on page
		games = 0;

		console.log(pagesSoFar);
		if (pagesSoFar === pages) {
			downloadGames();
			clearInterval(int);
			return;
		}
	}
	getGame();
	$('div.nextGame > a')[0].click(); // go to the next game
	games++;
}

var int = setInterval(next, 1);