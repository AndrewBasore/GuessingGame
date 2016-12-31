function translate(phrase){
	var vowels = ['a','e','i','o','u'];

	//we split the phrase into an array of each word to translate
	var listWords = phrase.split(" ");

	for(var i = 0; i < listWords.length ; i++){
		//access the word to translate
		var word = listWords[i];
		var resultWord = "";

		//populate first three into variables
		var firstLetter = word[0];
		var secondLetter = word[1];
		var thirdLetter = word[2];

		//this condition executes if firstLetter is a vowel. 
		if(vowels.indexOf(firstLetter) != "-1"){
			resultWord = word + "ay";	//No syllable is moved. "ay" is concated
			listWords[i] = resultWord;  //word is replaced in the list
		}
		else if(vowels.indexOf(secondLetter) != "-1"){ //this condition exists if there is only 1  consonant at the start of the word
			resultWord = word.substring(1, word.length) + firstLetter + "ay";
			listWords[i] = resultWord;
		}
		else if(vowels.indexOf(thirdLetter) != "-1"){
			resultWord = word.substring(2, word.length) + firstLetter + secondLetter + "ay";
			listWords[i] = resultWord;
		}
		else {
			console.log("this is a three-consonant word");
			resultWord = word.substring(3, word.length) + firstLetter + secondLetter + thirdLetter + "ay";
			listWords[i] = resultWord;
		}








	}
	console.log(listWords);
	listWords = listWords.join();
	
	
	
	return listWords[0];
}