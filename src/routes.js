import React from 'react';
import $ from 'jquery';
import CalendarContainer from './App/containers/Calendar';
import AdminDashboard from './Demo/Dashboard/Admin';
import LawyerManagement from './App/containers/LawyerManagement';
import LawyerDetail from './App/containers/LawyerDetailPage';
import Logout from './App/components/Logout';
import FeaturesManage from './App/containers/ContentManagement/Features';
import PlansManage from './App/containers/ContentManagement/Plans';
import BlogsManage from './App/containers/ContentManagement/Blogs';
import AddEditBlogs from './App/components/ContentManagePartials/AddEditBlog';
import AddEditFeatures from './App/components/ContentManagePartials/AddEditFeature';
import AddEditPlans from './App/components/ContentManagePartials/AddEditPlan';
// import Profile from './App/containers/Profile';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const DashboardDefault = React.lazy(() => import('./Demo/Dashboard/Default'));

const UIBasicButton = React.lazy(() => import('./Demo/UIElements/Basic/Button'));
const UIBasicBadges = React.lazy(() => import('./Demo/UIElements/Basic/Badges'));
const UIBasicBreadcrumbPagination = React.lazy(() => import('./Demo/UIElements/Basic/BreadcrumbPagination'));

const UIBasicCollapse = React.lazy(() => import('./Demo/UIElements/Basic/Collapse'));
const UIBasicTabsPills = React.lazy(() => import('./Demo/UIElements/Basic/TabsPills'));
const UIBasicBasicTypography = React.lazy(() => import('./Demo/UIElements/Basic/Typography'));

const FormsElements = React.lazy(() => import('./Demo/Forms/FormsElements'));

const BootstrapTable = React.lazy(() => import('./Demo/Tables/BootstrapTable'));

const Nvd3Chart = React.lazy(() => import('./Demo/Charts/Nvd3Chart/index'));

const GoogleMap = React.lazy(() => import('./Demo/Maps/GoogleMap/index'));

const OtherSamplePage = React.lazy(() => import('./Demo/Other/SamplePage'));
const OtherDocs = React.lazy(() => import('./Demo/Other/Docs'));

const Profile = React.lazy(()=>import('./App/containers/Profile'));
const Login = React.lazy(() => import('./App/containers/Auth/Login'));
// const Calendar = React.lazy(()=> import('./Demo/Calendar/CalendarElements'));

const ContactsManage = React.lazy(()=> import('./App/containers/ContactManagement'))
const AddEditContact = React.lazy(()=>import('./App/components/AddEditContact'))

export const adminRoutes = [
    { path: '/admin/dashboard', exact: true, name: 'AdminDashboard', component: AdminDashboard },
    { path: '/lawyers', exact: true, name: 'Lawyer Management', component: LawyerManagement },
    { path: '/lawyer/details', exact: true, name: 'Lawyer Details', component: LawyerDetail },
    { path: '/profile', exact: true, name: 'Profile', component: Profile },
    { path: '/basic/button', exact: true, name: 'Basic Button', component: UIBasicButton },
    { path: '/logout', exact: true, name: 'Logout', component: Logout},
    { path: '/login/:lawyer', exact: true, name: 'Lawyer Login', component: Login},
    { path: '/manage/blogs', exact: true, name: 'Manage Blogs', component: BlogsManage},
    { path: '/manage/features', exact: true, name: 'Manage Features', component: FeaturesManage},
    { path: '/manage/plans', exact: true, name: 'Manage Plans', component: PlansManage},
    { path: '/manage/blogs/:manage', exact: true, name: 'Add Edit Blogs', component: AddEditBlogs},
    { path: '/manage/features/:manage', exact: true, name: 'Add Edit Features', component: AddEditFeatures},
    { path: '/manage/plans/:manage', exact: true, name: 'Add Edit Plans', component: AddEditPlans},
    { path: '/manage/contacts', exact: true, name: 'Contacts Management', component: ContactsManage},
    { path: '/manage/contacts/:manage', exact: true, name: 'Add Edit Contact', component: AddEditContact},


    // { path: '/basic/badges', exact: true, name: 'Basic Badges', component: UIBasicBadges },
    // { path: '/basic/breadcrumb-paging', exact: true, name: 'Basic Breadcrumb Pagination', component: UIBasicBreadcrumbPagination },
    // { path: '/basic/collapse', exact: true, name: 'Basic Collapse', component: UIBasicCollapse },
    // { path: '/basic/tabs-pills', exact: true, name: 'Basic Tabs & Pills', component: UIBasicTabsPills },
    // { path: '/basic/typography', exact: true, name: 'Basic Typography', component: UIBasicBasicTypography },
    // { path: '/forms/form-basic', exact: true, name: 'Forms Elements', component: FormsElements },
    // { path: '/tables/bootstrap', exact: true, name: 'Bootstrap Table', component: BootstrapTable },
    // { path: '/charts/nvd3', exact: true, name: 'Nvd3 Chart', component: Nvd3Chart },
    // { path: '/maps/google-map', exact: true, name: 'Google Map', component: GoogleMap },
    // { path: '/sample-page', exact: true, name: 'Sample Page', component: OtherSamplePage },
    // { path: '/docs', exact: true, name: 'Documentation', component: OtherDocs },
    // { path: '/calendar', exact: true, name: 'Calendar', component: CalendarContainer}


]
const routes = [
    { path: '/dashboard/default', exact: true, name: 'Default', component: DashboardDefault },
    { path: '/profile', exact: true, name: 'Profile', component: Profile },
    { path: '/basic/button', exact: true, name: 'Basic Button', component: UIBasicButton },
    { path: '/basic/badges', exact: true, name: 'Basic Badges', component: UIBasicBadges },
    { path: '/basic/breadcrumb-paging', exact: true, name: 'Basic Breadcrumb Pagination', component: UIBasicBreadcrumbPagination },
    { path: '/basic/collapse', exact: true, name: 'Basic Collapse', component: UIBasicCollapse },
    { path: '/basic/tabs-pills', exact: true, name: 'Basic Tabs & Pills', component: UIBasicTabsPills },
    { path: '/basic/typography', exact: true, name: 'Basic Typography', component: UIBasicBasicTypography },
    { path: '/forms/form-basic', exact: true, name: 'Forms Elements', component: FormsElements },
    { path: '/tables/bootstrap', exact: true, name: 'Bootstrap Table', component: BootstrapTable },
    { path: '/charts/nvd3', exact: true, name: 'Nvd3 Chart', component: Nvd3Chart },
    { path: '/maps/google-map', exact: true, name: 'Google Map', component: GoogleMap },
    { path: '/sample-page', exact: true, name: 'Sample Page', component: OtherSamplePage },
    { path: '/docs', exact: true, name: 'Documentation', component: OtherDocs },
    { path: '/calendar', exact: true, name: 'Calendar', component: CalendarContainer},
    { path: '/logout', exact: true, name: 'Logout', component: Logout},
];

export default routes;