# Common Data Structures

## Binary Grid

represents which squares are white and black in a grid

```js
[
    [1,1,1],
    [1,0,1],
    [1,1,1]
];
```

## Values

represents what letters are where in a grid. Note that black squares will just be empty strings

```js
[
    ['D','O','G'],
    ['A','','O'],
    ['B','A','D']
];
```

## Answer

represents an answer to a single clue. It will never contain punctuation

```js
['D','O','G']
```
## Clue

represents a clue. `clues` is an array of these objects.

```js
var clue = {
    length:5,
    number:9,
    position:[1,0], // starting co-ordinates
    isAcross:true
    punctuation:['','','-','',''] // can contain dashes or underscores for spaces
};
```


TODO:
1. suggestions for words when creating a crossword using word list
2. support for delete / left arrow in InputWord component
3. other punctuation (e.g. apostrophes)