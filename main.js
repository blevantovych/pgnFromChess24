(() => {
	const $ = document.querySelector;
	const $$ = document.querySelectorAll;
	const event = $('h2.title').textContent;
	const round = $('h2.subTitle').textContent.replace('Round ', '');
	const result = $$('div.score').reverse().map(scoreEl => scoreEl.textContent).join('-').replace(/½/g, '1/2');

	const names = [];
	const elos = [];
	const moves = [];

	$$('h2.name').slice(0, 2).each(function () {
		names.push($(this).text().replace(/ /g, ''));
	});

	$('span.elo').slice(0, 2).each(function () {
		elos.push($(this).text());
	});

	(() => {

		let pasteMove = true;
		let moveNum = 1;
		$('span.move').each(function () {
			if (pasteMove) {
				if (moveNum % 6 === 0) {
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


	const pgn = `[Event "${event}"]
[Round "${round}"]
[Result "${result}"]
[White "${names[1]}"]
[Black "${names[0]}"]
[WhiteElo "${elos[1]}"]
[BlackElo "${elos[0]}"]

${moves} ${result}`;

	(() => {
		const filename = `${names[1]}-${names[0]}.pgn`;
		const blob = new Blob([pgn], { type: 'text/plain' }),
			e = document.createEvent('MouseEvents'),
			a = document.createElement('a');

		a.download = filename;
		a.href = window.URL.createObjectURL(blob);
		a.dataset.downloadurl = ['text/plain', a.download, a.href].join(':');
		e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		a.dispatchEvent(e);
	})();

	// copy to clipboard
	(() => {
		const input = document.createElement('input');
		document.body.appendChild(input);
		input.value = pgn;
		input.select();
		document.execCommand('Copy');
		document.body.removeChild(input);
	})();

})();
