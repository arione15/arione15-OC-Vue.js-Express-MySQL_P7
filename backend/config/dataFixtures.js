const users = [
 {
  name: "Bulbizarre",
  firstname: "Bubu",
  email: "bubu@gmail.fr",
  password: "Abc123??!!",
  imageUrl: "url1"
 },
 {
  name: "Salamèche",
  firstname: "Susu",
  email: "susuu@gmail.fr",
  password: "Abc123!!??",
  imageUrl: "url2"
 }
];

const posts = [
 {
  title: "title1",
  description: "media1",
  mediaUrl: "url1",
  userId: 1,
  likes: 1,
  dislikes: 1,
  usersLiked: 1,
  usersDisliked: 1
 },
 {
  title: "title2",
  description: "media2",
  mediaUrl: "url2",
  userId: 2,
  likes: 2,
  dislikes: 2,
  usersLiked: 2,
  usersDisliked: 2
 },
 {
  title: "title3",
  description: "media3",
  mediaUrl: "url3",
  userId: 3,
  likes: 3,
  dislikes: 3,
  usersLiked: 3,
  usersDisliked: 3
 }
];

module.exports = { users, posts }; //ou bien  exports.users = users; exports.posts = posts;
