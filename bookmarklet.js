javascript:(function()%7B(()%20%3D%3E%20%7B%0A%0A%0A%09const%20event%20%3D%20%24('h2.title').text()%3B%0A%09const%20round%20%3D%20%24('h2.subTitle').text().replace('Round%20'%2C%20'')%3B%0A%09const%20result%20%3D%20%24('div.score').slice(0%2C%202).text().split('').reverse().join('')%0A%09%09%09%09%09.replace(%2F(.)(.)%2Fg%2C%20(str%2C%20w%2C%20b)%20%3D%3E%20%7B%20return%20w%20%2B%20'-'%20%2B%20b%20%7D).replace(%2F%C2%BD%2Fg%2C%20'1%2F2')%3B%0A%0A%09let%20names%20%3D%20%5B%5D%3B%0A%09let%20elos%20%20%3D%20%5B%5D%3B%0A%09let%20moves%20%3D%20%5B%5D%3B%0A%0A%09%24('h2.name').slice(0%2C2).each(function()%20%7B%0A%20%20%20%20%09names.push(%24(this).text().replace(%2F%20%2Fg%2C%20''))%3B%0A%09%7D)%3B%0A%0A%09%24('span.elo').slice(0%2C%202).each(function()%20%7B%0A%09%09elos.push(%24(this).text())%3B%0A%09%7D)%3B%0A%0A%09(()%20%3D%3E%20%7B%0A%0A%09%09let%20pasteMove%20%3D%20true%3B%0A%09%09let%20moveNum%20%3D%201%3B%0A%09%09%24('span.move').each(function()%20%7B%0A%09%09%09if%20(pasteMove)%20%7B%0A%09%09%09%09if%20(moveNum%20%25%206%20%3D%3D%3D%200)%7B%0A%09%09%09%09%09moves.push('%5Cn'%20%2B%20moveNum.toString()%20%2B%20'.')%3B%0A%09%09%09%09%7D%0A%09%09%09%09else%20%7B%0A%09%09%09%09%09moves.push(moveNum.toString()%20%2B%20'.')%3B%0A%09%09%09%09%7D%0A%0A%09%09%09%09pasteMove%20%3D%20false%3B%0A%09%09%09%09moveNum%20%2B%3D%201%3B%0A%09%09%09%7D%20else%20%7B%0A%09%09%09%09pasteMove%20%3D%20true%3B%0A%09%09%09%7D%0A%20%20%20%20%09%09moves.push(%24(this).text().trim())%3B%0A%09%09%7D)%3B%0A%09%09moves%20%3D%20moves.join('%20')%3B%0A%09%7D)()%3B%0A%0A%0A%09let%20pgn%20%3D%20%60%5BEvent%20%22%24%7Bevent%7D%22%5D%5Cn%5BRound%20%22%24%7Bround%7D%22%5D%5Cn%5BResult%20%22%24%7Bresult%7D%22%5D%5Cn%5BWhite%20%22%24%7Bnames%5B1%5D%7D%22%5D%5Cn%5BBlack%20%22%24%7Bnames%5B0%5D%7D%22%5D%5Cn%5BWhiteElo%20%22%24%7Belos%5B1%5D%7D%22%5D%5Cn%5BBlackElo%20%22%24%7Belos%5B0%5D%7D%22%5D%5Cn%5Cn%24%7Bmoves%7D%20%24%7Bresult%7D%60%3B%0A%0A%09(()%20%3D%3E%20%7B%0A%09%09let%20filename%20%3D%20names%5B1%5D%20%2B%20'-'%20%2B%20names%5B0%5D%20%2B%20'.pgn'%3B%0A%09%09let%20blob%20%3D%20new%20Blob(%5Bpgn%5D%2C%20%7Btype%3A%20'text%2Fplain'%7D)%2C%0A%09%20%20%20%20%09e%20%20%20%20%3D%20document.createEvent('MouseEvents')%2C%0A%09%20%20%20%20%09a%20%20%20%20%3D%20document.createElement('a')%3B%0A%0A%09%20%20%20%20a.download%20%3D%20filename%3B%0A%09%20%20%20%20a.href%20%3D%20window.URL.createObjectURL(blob)%3B%0A%09%20%20%20%20a.dataset.downloadurl%20%3D%20%20%5B'text%2Fplain'%2C%20a.download%2C%20a.href%5D.join('%3A')%3B%0A%09%20%20%20%20e.initMouseEvent('click'%2C%20true%2C%20false%2C%20window%2C%200%2C%200%2C%200%2C%200%2C%200%2C%20false%2C%20false%2C%20false%2C%20false%2C%200%2C%20null)%3B%0A%09%20%20%20%20a.dispatchEvent(e)%3B%0A%09%7D)()%3B%0A%09%0A%09%2F%2F%20copy%20to%20clipboard%0A%09(()%20%3D%3E%20%7B%0A%09%09const%20input%20%3D%20document.createElement('input')%3B%0A%09%09document.body.appendChild(input)%3B%0A%09%09input.value%20%3D%20pgn%3B%0A%09%09input.select()%3B%0A%09%09document.execCommand('Copy')%3B%0A%09%09document.body.removeChild(input)%3B%0A%09%7D)()%3B%0A%0A%7D)()%3B%7D)()%3B