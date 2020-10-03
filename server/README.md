# USER

## Query
* idCheck(id: String!) : Boolean // 아이디가 사용가능한지
* > id.length < 6 or db.find(id : id) ? False : True 

<br>

* nameCheck(name: String!) : Boolean // 닉네임이 사용가능한지
* > name.length < 2 or db.find(name : name) ? False : True

<br>

* login(id: String!, pw: String!): code, token // 로그인

<br>

* leaderBoard: [name, class, rated] // 랭킹

## Mutation
* register(name: String!, id: String!, pw: String!): code ,token // 회원가입

``` js
// ex
Query{
    idCheck(id:"kkkk1")
}

Mutation{
    register(name:"pukuba", id:"erolf0123", pw:"test123"){
        code
        token
    }
}
```