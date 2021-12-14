## CookBook Server

### Запрос книги (метод GET)
>http://localhost:5000/cookbook/get/<id_книги>

### Запрос на создание книги (метод POST)
>http://localhost:5000/cookbook/create

body (json):
```
{
"title": "Книга 1",
"recipesId": ["11", "12", "13"],
"description": "string",
"photo": "c:ddd",
"user": "61b8fcb710306a0cb5fc8bdf"
}
```
### Запрос на добавление рецепта в книгу (метод POST)
>http://localhost:5000/cookbook/<id_книги>/recipe-add/<id_рецепта>
### Запрос на удаление рецепта из книги (метод POST)
>http://localhost:5000/cookbook/<id_книги>/recipe-delete/<id_рецепта>
