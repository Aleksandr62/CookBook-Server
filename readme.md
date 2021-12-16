## CookBook Server

### Запрос на создание рецепта (метод POST)
>http://localhost:5000/recipes/create

body (json):
```
{
"recipe":{
    "title": "Яичница",
    "description": "Очень вкусная яичница",
    "ingredients": ["fff", "sdsdsd"],
    "photos": ["fff", "sdsdsd"],
    "author": {"id": "fdf", "name":"Василий"},
    "typeOfMeal": "Завтрак", 
    "cost": 1000, 
    "steps": ["fff", "sdsdsd"],
    "time": 10,
    "cuisine": "string",   
    "portionsAmount": 4
}
}
```

### Запрос книги (метод GET)
>http://localhost:5000/cookbook/get/<id_книги>

### Запрос на создание книги (метод POST)
>http://localhost:5000/cookbook/create

body (json):
```
{
"cookbook": {
    "title": "Книга 1",
    "recipesId": ["11", "12", "13"],
    "description": "string",
    "photo": "c:ddd",
    "user": "61b8fcb710306a0cb5fc8bdf"
}
}
```
### Запрос на добавление рецепта в книгу (метод POST)
>http://localhost:5000/cookbook/<id_книги>/recipe-add/<id_рецепта>
### Запрос на удаление рецепта из книги (метод POST)
>http://localhost:5000/cookbook/<id_книги>/recipe-delete/<id_рецепта>
