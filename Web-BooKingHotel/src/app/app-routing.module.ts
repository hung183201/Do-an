import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/common/not-found/not-found.component';
import { AboutPageComponent } from './components/pages/about-page/about-page.component';
import { BlogDetailsPageComponent } from './components/pages/blog-details-page/blog-details-page.component';
import { BlogPageComponent } from './components/pages/blog-page/blog-page.component';
import { BookNowPageComponent } from './components/pages/book-now-page/book-now-page.component';
import { CarsPageComponent } from './components/pages/cars-page/cars-page.component';
import { ContactPageComponent } from './components/pages/contact-page/contact-page.component';
import { CruisesPageComponent } from './components/pages/cruises-page/cruises-page.component';
import { FaqPageComponent } from './components/pages/faq-page/faq-page.component';
import { FlightDetailsPageComponent } from './components/pages/flight-details-page/flight-details-page.component';
import { FlightsListingPageComponent } from './components/pages/flights-listing-page/flights-listing-page.component';
import { HomeDemoThreeComponent } from './components/pages/home-demo-three/home-demo-three.component';
import { HotelDetailsPageComponent } from './components/pages/hotel-details-page/hotel-details-page.component';
import { HotelsListingPageComponent } from './components/pages/hotels-listing-page/hotels-listing-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { PrivacyPolicyPageComponent } from './components/pages/privacy-policy-page/privacy-policy-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { TermsConditionsPageComponent } from './components/pages/terms-conditions-page/terms-conditions-page.component';

const routes: Routes = [
    {path: '', component: HomeDemoThreeComponent},
    {path: 'hotels-listing', component: HotelsListingPageComponent},
    {path: 'hotel-details', component: HotelDetailsPageComponent},
    {path: 'about', component: AboutPageComponent},
    {path: 'book-now', component: BookNowPageComponent},
    {path: 'login', component: LoginPageComponent},
    {path: 'register', component: RegisterPageComponent},
    {path: 'contact', component: ContactPageComponent},

    {path: '**', component: NotFoundComponent} // This line will remain down from the whole pages component list
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }