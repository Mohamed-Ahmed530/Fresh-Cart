import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { authGuard } from './core/guards/auth.guard';
import { loggedGuard } from './core/guards/logged.guard';


export const routes: Routes = [
    {path:"", redirectTo:"home", pathMatch:"full"},
    { path: "", component: AuthLayoutComponent, canActivate:[loggedGuard] , children:[
        { path:"login", loadComponent:()=> import('./pages/login/login.component').then( (c)=>c.LoginComponent ), title:"Login"},
        { path:"register", loadComponent:()=> import('./pages/register/register.component').then( (c)=>c.RegisterComponent ), title:"Register"},
        { path:"forgotpassword", loadComponent:()=> import('./pages/forgotpassword/forgotpassword.component').then( (c)=>c.ForgotpasswordComponent ), title:"ForgotPassword"}
    ]},
    { path: "", component: MainLayoutComponent, canActivate:[authGuard] , children:[
        { path:"home", loadComponent:()=> import('./pages/home/home.component').then( (c)=>c.HomeComponent ), title:"Home"},
        { path:"cart", loadComponent:()=> import('./pages/cart/cart.component').then( (c)=>c.CartComponent ), title:"Cart"},
        { path:"wishlist", loadComponent:()=> import('./pages/wishlist/wishlist.component').then( (c)=>c.WishlistComponent ), title:"Wishlist"},
        { path:"products", loadComponent:()=> import('./pages/products/products.component').then( (c)=>c.ProductsComponent ), title:"Products"},
        { path:"categories", loadComponent:()=> import('./pages/categories/categories.component').then( (c)=>c.CategoriesComponent ) , title:"Categories"},
        { path:"brands", loadComponent:()=> import('./pages/brands//brands.component').then( (c)=>c.BrandsComponent ) , title:"Brands"},
        { path:"checkout/:id", loadComponent:()=> import('./pages/checkout/checkout.component').then( (c)=>c.CheckoutComponent ) , title:"CheckOut"},
        { path:"details/:id", loadComponent:()=> import('./pages/details/details.component').then( (c)=>c.DetailsComponent ) , title:"Details"},
        { path:"allorders", loadComponent:()=> import('./pages/allorders/allorders.component').then( (c)=>c.AllordersComponent ) , title:"AllOrders"},
        { path:"**", component: NotfoundComponent, title:"NotFound"}
    ]} 
];

