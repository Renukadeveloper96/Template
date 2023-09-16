import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

signupUsers:any[]=[];
singupObj:any={
  userName:'',
  lastName:'',
  email:'',
  password:''
};
loginUsers:any[]=[];
loginObj:any={
  userName:'',
  password:''
}
  ngOnInit(): void {
    const localData=localStorage.getItem('signUpUsers');
    if(localData!=null){
      this.signupUsers=JSON.parse(localData)
    }
  }
 constructor(){}
 onSignUp(){
this.signupUsers.push(this.singupObj);
localStorage.setItem('signUpUsers',JSON.stringify(this.signupUsers));
this.singupObj={
  userName:'',
  email:'',
  password:''
};
 }
onLogin(){
  // this.loginUsers.push(this.loginObj);
  // this.signupUsers.push(this.singupObj);
const isUserExist=this.signupUsers.find(m=>m.userName==this.loginObj.userName &&
  m.password==this.loginObj.password);
  if(isUserExist !=undefined){
    alert('User Login Successsfuuly')
  }else{
    alert('Wrong credentials');
  }
 }
}
