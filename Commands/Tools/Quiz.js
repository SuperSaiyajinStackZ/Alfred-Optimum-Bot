/*
	Optimum Alfred's Quiz Handler implementation.

	Some Quiz fun stuff. Provide no arguments for a random question, or the ID for the answer.
*/

const Discord = require("discord.js");

/*
	Modify this array for new Quizes.

	question: The Question of the Quiz.
	answers: An array of 4 items containing the possible answers.
	correct: The index of the correct answer from the answers array, starting by 0 up to 3.
	id: The ID of the Quiz, it should be done as following: <Game Name> #<ID>.
*/
const Quizes = [
	{
		question: "The Mummy is also called...?",
		answers: [ "Horus Hipsomet the fourth", "Horus Kliptosap the eighteenth", "Horus Menhoset the ninth", "Horus Palimpsest the Plinth" ],
		correct: 2,
		id: "The Sims 2 Game Boy Advance #0000"
	}
];


/* Module: Quiz. */
module.exports = {
	Names: ["Quiz"],
	Description: "Some Quiz fun stuff. Provide no arguments for a random question, or the ID for the answer.",
	Usage: "[id]",
	Handler(Message) {
		const Arg = Message.Value.toLowerCase();

		/* No arguments => Random Quiz of the Quizes. */
		if (Arg.length < 1) {
			let Quiz = Quizes[Math.floor(Math.random() * Quizes.length)];
			Quiz.answers.sort(() => Math.random() - 0.5); // Shuffle answer order.
	
			const Embed = new Discord.MessageEmbed()
				.setTitle("Quiz: " + Quiz.id)
				.setColor("#343840")
				.setDescription("Question: " + Quiz.question)
				.addField("A)", Quiz.answers[0])
				.addField("B)", Quiz.answers[1])
				.addField("C)", Quiz.answers[2])
				.addField("D)", Quiz.answers[3]);
			Message.channel.send({ embeds: [ Embed ] });
		
		/* Else show answer by proper ID. */
		} else {
			let ID = parseInt(Arg);

			if (!isNaN(ID)) {
				if (ID < Quizes.length) {
					const Embed = new Discord.MessageEmbed()
						.setTitle("QuizResult - " + Quizes[ID].id)
						.setColor("#343840")
						.setDescription("The proper answer for \"" + Quizes[ID].question + "\" is: " + Quizes[ID].answers[Quizes[ID].correct] + ".");
					Message.channel.send({ embeds: [ Embed ] });
					
				/* Out of range. */
				} else {
					const Embed = new Discord.MessageEmbed()
						.setTitle("Quiz ID is out of range")
						.setColor("#343840")
						.setDescription("The provided ID is out of range for the Quizes. Valid IDs: 0 - " + (Quizes.length - 1).toString());
					Message.channel.send({ embeds: [ Embed ] });
				}
			}
		}
	}
};
