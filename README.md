In this project you can create a map of your restaurant, place and moves tables.
You can also export and import maps

install dependencies

```
npm i
```

Launch in dev mode

```
npm run dev
```

```
/           : Display the current map, if no map provided yet ask you to upload or create one
/new-map    : Here you can create your first empty map
/upload     : Here you can browse file or drag and drop a json file to load a map
/management : Allow you to add and delete tables
/export     : Export the current map in a json file that you can download
```

```
In the upload page:
  - if nothing append when you input a file,
      that is because the file isn't valid
```

```
In the management page:
  - to add a table u can drag and drop littles cards,
      the first number is the x size and the second the y
  - to remove one you can click on it and after click on the trash
```

Exemple of json file to input

```
{
  "boardSize": { "x": 15, "y": 10 },
  "tables": [
    { "id": 1, "co": { "x": 1, "y": 1 }, "size": { "x": 1, "y": 1 } },
    { "id": 2, "co": { "x": 2, "y": 3 }, "size": { "x": 2, "y": 2 } },
    { "id": 3, "co": { "x": 4, "y": 2 }, "size": { "x": 2, "y": 4 } }
  ]
}
```

co is the position of the table top left part
size is the length of each side of the table
