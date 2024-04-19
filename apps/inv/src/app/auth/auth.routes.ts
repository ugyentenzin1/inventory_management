import { Route } from '@angular/router';

export const authRoutes: Route[] = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {
        path: 'login', 
        loadComponent:(): Promise<any> => import('@inventory-management/features').then(val => val.LoginComponent)
    },
    {
        path: 'create-user',
        loadComponent:():Promise<any> => import('@inventory-management/features').then(val => val.CreateUserComponent)
    },
    {
        path: 'forgot-password',
        loadComponent:(): Promise<any> => import('@inventory-management/features').then(val => val.ForgotPasswordComponent)
    }

]
