import $ from 'jquery';
const token = sessionStorage.getItem('token')


export default{
    obtenerTablas(){
        return new Promise((resolve, reject) => {
            $.ajax({
                url:'http://localhost:3000/api/tables',
                method:'GET',
                headers:{
                    'Authorization': `Bearer ${token}` 
                },
                success:(response) => {
                    resolve(response);
                },
                error:(err) => {
                    reject(err);
                }
            });
        });
    },
    obtenerTabla(name){
        return new Promise((resolve, reject) => {
            $.ajax({
                url:'http://localhost:3000/api/tables/' + name,
                method:'GET',
                headers:{
                    'Authorization': `Bearer ${token}` 
                },
                success:(response) => {
                    resolve(response);
                },
                error:(err) => {
                    reject(err);               }
            })
        })
    },
    agregarRegister(name,data){
        return new Promise((resolve, reject) => {
            $.ajax({
                url:'http://localhost:3000/api/tables/' + name,
                method:'POST',
                headers:{
                    'Authorization': `Bearer ${token}`
                },
                contentType:'application/json',
                data:JSON.stringify(data),
                success:(response) => {
                    resolve(response);
                },
                error:(err) =>{
                    reject(err);
                }
            })
        })
    }


}