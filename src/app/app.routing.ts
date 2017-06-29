import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeatlayoutComponent } from './seatlayout/seatlayout.component';
import { CarouselComponent } from './carousel/carousel.component';

const appRoutes: Routes = [
    {
        path: 'buyticket',
        component: SeatlayoutComponent
    },
    {
        path: '',
        component: CarouselComponent
    }
];

export const Routing : ModuleWithProviders = RouterModule.forRoot(appRoutes);


