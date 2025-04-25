const fs = require('fs');

const categories = [
  'General',
  'Feedback',
  'Suggestion',
  'Question',
  'Idea',
  'Discussion',
];
const hashtagsList = [
  '#innovation',
  '#random',
  '#discussion',
  '#question',
  '#idea',
  '#feedback',
  '#growth',
  '#learning',
  '#suggestion',
  '#future',
];

function generateRandomDate() {
  const startDate = new Date(2020, 0, 1);
  const endDate = new Date();
  const randomTime =
    startDate.getTime() +
    Math.random() * (endDate.getTime() - startDate.getTime());
  return new Date(randomTime).toISOString().split('T')[0];
}

function generateHashtags() {
  return hashtagsList
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.floor(Math.random() * 3) + 1);
}

function generateCommentsJson() {
  const comments = [];

  for (let i = 1; i <= 1000; i++) {
    comments.push({
      id: i,
      text: `Random comment fdsfsdfds dsfafddsaf fdsfsdf  fdsfsdf  fdsfsdf  fdsfsdf  fdsfsdf  fdsfsdf  fdsfsdf  fdsfsdf  fdsfsdf  fdsfsdf  fdsfsdf  fdsfsdf  fdsfsdf #${i}`,
      hashtags: generateHashtags(),
      category: categories[Math.floor(Math.random() * categories.length)],
      date: generateRandomDate(),
    });
  }
  const jsonData = JSON.stringify({ comments }, null, 2);
  fs.writeFileSync('comments.json', jsonData);
  console.log("JSON file 'comments.json' has been successfully created!");
}

generateCommentsJson();
