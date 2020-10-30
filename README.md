# Merfoset

## Query & Mutation

``` js
`query{
    scoreBoard{
        name
        score
        date
    } 배열을반환함
}`


`query{
    searchUser(name:${name}){
        name
        score
        date
    } 배열을반환함
}`

`mutation{
    endGame(name:${name},score:${score}){
        code
    } code만 반환함
}
```