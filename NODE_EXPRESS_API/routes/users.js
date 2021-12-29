import express from 'express';

const router = express.Router();

let users=[ {
    id : 1,
    name : "John",
    username :"john",
    password : "john123",
    email : "john@test.com",
    mobile : "9755658721",
    city : "noida"
 }];


router.get('/',(req, res)=>{ 
    console.log(users);
    res.send(users);

   });


router.post('/',(req, res)=>{

    const user = req.body;

    users.push(user);
        res.send(`user with the name ${user.name} added to the database`);
            
    });



    router.get('/:id',(req, res)=>{
        const {id} = req.params;
        const foundUser = users.find((user)=> user.id==id);

        res.send(foundUser);

    });


router.delete('/:id',(req, res)=>{
      const{id} = req.params;
      users = users.filter((user)=> user.id !== id ); 

      res.send(`user with id ${id} deleted from the database`);
});


router.patch('/:id', (req, res)=>{
    const {id} =req.params;
    const{name, username, password, email, mobile, city} = req.body;

    const user = users.find((user)=> user.id == id);

    if(id){
        user.id = id;
    }

    if(name){
        user.name = name;
    }

    if(username){
        user.username = username;
    }

    if(password){
        user.password = password;
    }

    if(email){
        user.email = email;
    }

    if(mobile){
        user.mobile = mobile;
    }

    if(city){
        user.city = city;
    }

    res.send(`user with the id ${id} has been updated`);

});

export default router; 