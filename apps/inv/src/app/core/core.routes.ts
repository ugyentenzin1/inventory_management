import { Route } from '@angular/router';

export const coreRouets: Route[] = [
    {path: '', redirectTo: 'auth', pathMatch: 'full'},
    {
        path: 'auth',
        loadChildren:(): Promise<any> => import('../auth/auth.routes').then(val => val.authRoutes)
    }
]
