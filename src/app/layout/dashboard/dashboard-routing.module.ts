import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { FileUploadComponent } from './components/upload.file/upload.file.component';

const routes: Routes = [
    {
        path: '', component: DashboardComponent
        /* children: [{path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' }] */
    },
    {path: 'upload', component:  FileUploadComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {
}
