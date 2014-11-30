var request = require('request');
var cheerio = require('cheerio');
var underscore = require('underscore');
var exec = require('child_process').exec;

request.get('http://www.zhangzishi.net/page/4?s=%E4%B8%AD%E5%9B%BD%E5%A5%BD%E8%83%B8',function(err,res,body){
	

	$ = cheerio.load(body);

	$("article.excerpt header h2 a").each(function(i,elem){
		var link = $(this).attr('href');
		request(link,function(err, response, childbody){
			$ = cheerio.load(childbody);
			$('article.article-content').find('img').each(function(i, imgelem){
				imgdata = $(this).attr('src');
				exec('curl -O "'+imgdata+'"',
				  function (error, stdout, stderr) {
				    console.log('stdout: ' + stdout);
				    console.log('stderr: ' + stderr);
				    if (error !== null) {
				      console.log('exec error: ' + error);
				    }
				});
			})
		})

		
	})
})