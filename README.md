Harel Corentin

# Etape 2

# Requête de lecture
1. db.books.find().toArray();
2. db.books.find({ "_id": 2 }).toArray();
3. db.books.find({ "title": "Android in Action, Second Edition" }).toArray();
4. db.books.find({ "categories": "Java" }).toArray();
5. db.books.find({ "publishedDate": { $gt: new Date("2010-01-01") } }).toArray();
6. db.books.find().sort({ "publishedDate": -1 }).toArray();
7. db.books.find({ "pageCount": { $gt: 500 } }).toArray();
8. db.books.find({
  $or: [
    { "shortDescription": /Android/i },
    { "longDescription": /Android/i }
  ]
}).toArray();
9. db.books.countDocuments();
10. db.books.aggregate([
  { $group: { _id: "$title", count: { $sum: 1 }, docs: { $push: "$$ROOT" } } },
  { $match: { count: { $gt: 1 } } }
]);

# Requête d'écriture

## Ajout 

db.books.insertOne({
  title: "MongoDB : The Definitive Guide",
  pageCount: 432,
  publishedDate: new Date("2013-05-23"),
  author: "Kristina Chodorow",
  categories: "Databases"
});

## Modification

db.books.updateOne(
  { _id: 2 },
  { $set: { pageCount: 600 } }
);

pour vérifier taper db.books.find({ "_id": 2 }).toArray();

2. 
db.books.updateOne(
  { _id: 2 },
  { $addToSet: { categories: "Programming" } }
);

pour vérifier taper db.books.find({ "_id": 2 }).toArray();

## Suppression

db.books.deleteOne({ _id: 2 });
{ acknowledged: true, deletedCount: 1 }
library> db.books.find({ "_id": 2 }).toArray();
[]

# Etape 3

j'ai crée une application avec NodeJS Express JS simple permettant de se connecter à mongodb et à la db librairie avec deux trois fonctions permettant de faire des requêtes sur la db librairie