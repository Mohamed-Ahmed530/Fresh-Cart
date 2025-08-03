export interface RegisterUser {
    name:string,
    email:string,
    password:string,
    rePassword:string,
    phone:string
}

export interface LoginUser {
    email:string,
    password:string,
}
