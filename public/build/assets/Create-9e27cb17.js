import{W as l,j as s}from"./app-ab501295.js";import x from"./Form-2d969e14.js";import"./InputError-5bed4518.js";import"./InputLabel-b3b06ced.js";import"./PrimaryButton-e3007bc1.js";import"./SecondaryButton-375f8a79.js";import"./TextInput-6f65be1e.js";import"./TextInputCheckbox-30883270.js";import"./lodash-18416f7f.js";function D({setIsOpenAddDialog:t,roles:e,enabled:m,setEnabled:i}){const{data:o,setData:p,post:a,reset:n,errors:u}=l({name:"",email:"",password:""}),c=r=>t(!1),f=r=>{r.preventDefault(),a(route("permissions.store"),{data:o,onSuccess:()=>{n(),t(!1)}})};return s.jsx("form",{onSubmit:f,children:s.jsx(x,{errors:u,data:o,roles:e,enabled:m,setEnabled:i,setData:p,submit:"Simpan",closeButton:c})})}export{D as default};
