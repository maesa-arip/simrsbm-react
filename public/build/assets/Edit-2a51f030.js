import{W as f,r as x,j as o}from"./app-ab501295.js";import j from"./Form-4d17748a.js";import"./InputError-5bed4518.js";import"./InputLabel-b3b06ced.js";import"./PrimaryButton-e3007bc1.js";import"./SecondaryButton-375f8a79.js";import"./TextInput-6f65be1e.js";import"./TextInputCheckbox-30883270.js";import"./lodash-18416f7f.js";function F({setIsOpenEditDialog:s,model:t,permissions:p,setEnabled:w}){const{data:r,setData:a,put:i,reset:m,errors:n}=f({name:t.name,email:t.email,password:t.password}),u=e=>s(!1),c=e=>{e.preventDefault(),i(route("roles.update",t.id),{data:r,onSuccess:()=>{m(),s(!1)}})};return x.useEffect(()=>{a({...r,name:t.name,email:t.email,password:t.password})},[t]),o.jsx("form",{onSubmit:c,children:o.jsx(j,{errors:n,data:r,model:t,permissions:p,setData:a,submit:"Update",closeButton:u})})}export{F as default};