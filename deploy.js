
import {publish} from 'gh-pages'

// delete all none folders in dest/
console.log("Deploying to github pages")
publish('dist',{dotfiles: true}, function(err) {

	if (err)
	{
		console.error("Failed to deploy", err)
	}else{
		console.log("Deployed!")	
	}

})