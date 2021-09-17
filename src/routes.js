import React from 'react';
import $ from 'jquery';
import Parent from './MyApp/questions/Parent'; 

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

const QuestionType = React.lazy(() => import('./MyApp/questions/questionType'));
const AssessmentType = React.lazy(() => import('./MyApp/questions/assessmentType'));
const Program = React.lazy(() => import('./MyApp/questions/program'));
const Module = React.lazy(() => import('./MyApp/questions/module'));
const Level = React.lazy(() => import('./MyApp/questions/level'));
const Questions = React.lazy(() => import('./MyApp/questions/questions'));
const QuestionReport = React.lazy(() => import('./MyApp/questions/questionReport'));
const Users = React.lazy(() => import('./MyApp/questions/users'));

const Dashboard = React.lazy(() => import('./MyApp/users/dashboard'));
const CheckAndUncheck = React.lazy(() => import('./MyApp/questions/CheckAndUncheck'));
const ContactUsAdmin = React.lazy(() => import('./MyApp/questions/contactus'));
const LoginHistory = React.lazy(() => import('./MyApp/questions/loginHistory'));
const QuizReport = React.lazy(() => import('./MyApp/questions/quizReport'));
// users
const Messages = React.lazy(() => import('./MyApp/users/messages'));
const Quiz = React.lazy(() => import('./MyApp/users/quiz'));
const ContactUs = React.lazy(() => import('./MyApp/users/contactus'));
const Profile = React.lazy(() => import('./MyApp/users/profile'));
// Students
const Students = React.lazy(() => import('./MyApp/students/students'));
const ClassNames = React.lazy(() => import('./MyApp/students/classNames'));
const Sections = React.lazy(() => import('./MyApp/students/sections'));
const StudentHouse = React.lazy(() => import('./MyApp/students/studentHouse'));
const Category = React.lazy(() => import('./MyApp/students/category'));

const Hostels = React.lazy(() => import('./MyApp/students/hostel/hostel'));
const RoomeDetails = React.lazy(() => import('./MyApp/students/hostel/roomes'));
const Transport = React.lazy(() => import('./MyApp/students/transport/transport'));
const TransportRoutes = React.lazy(() => import('./MyApp/students/transport/routes'));
const Visitors = React.lazy(() => import('./MyApp/frontOffice/visitors'));
const PhoneCallLog = React.lazy(() => import('./MyApp/frontOffice/phoneCallLog'));
const PostalReceive = React.lazy(() => import('./MyApp/frontOffice/postalReceive'));
 const PostalSent = React.lazy(() => import('./MyApp/frontOffice/postalSent'));
 const AdmissionEnquiry = React.lazy(() => import('./MyApp/frontOffice/admissionEnquiry'));
 const Complain = React.lazy(() => import('./MyApp/frontOffice/complain'));
const routes = [
    // Admin
    { path: '/dashboard', exact: true, name: 'Default', component: DashboardDefault },
    { path: '/questionReport', exact: true, name: 'Basic Button', component: QuestionReport },
    { path: '/users', exact: true, name: 'Basic Button', component: Users },   
    { path: '/questiontype', exact: true, name: 'Basic Button', component: QuestionType },
    { path: '/assessmenttype', exact: true, name: 'Basic Button', component: AssessmentType },
    { path: '/program', exact: true, name: 'Basic Button', component: Program },
    { path: '/module', exact: true, name: 'Basic Button', component: Module },
    { path: '/level', exact: true, name: 'Basic Button', component: Level },
    { path: '/questions', exact: true, name: 'Basic Button', component: Questions },
    { path: '/quiz', exact: true, name: 'Basic Button', component: Quiz },
    { path: '/Parent', exact: true, name: 'Basic Button', component: Parent },
    { path: '/contactus', exact: true, name: 'Basic Button', component: ContactUsAdmin },
    { path: '/loginhistory', exact: true, name: 'Basic Button', component: LoginHistory },
    { path: '/quizreport', exact: true, name: 'Basic Button', component: QuizReport },
    // Students
    { path: '/students', exact: true, name: 'Basic Button', component: Students },
    { path: '/classnames', exact: true, name: 'Basic Button', component: ClassNames },
    { path: '/sections', exact: true, name: 'Basic Button', component: Sections },
    { path: '/studenthouse', exact: true, name: 'Basic Button', component: StudentHouse },
    { path: '/category', exact: true, name: 'Basic Button', component: Category },
    { path: '/hostel', exact: true, name: 'Basic Button', component: Hostels },
    { path: '/roomdetails', exact: true, name: 'Basic Button', component: RoomeDetails },
    { path: '/transport', exact: true, name: 'Basic Button', component: Transport },
    { path: '/admissionenquiry', exact: true, name: 'Basic Button', component: AdmissionEnquiry },
    //front office 
    { path: '/visitors', exact: true, name: 'Basic Button', component: Visitors },
    { path: '/phonecalllog', exact: true, name: 'Basic Button', component: PhoneCallLog },
    { path: '/postalreceive', exact: true, name: 'Basic Button', component: PostalReceive },
    { path: '/postalsent', exact: true, name: 'Basic Button', component: PostalSent },
    { path: '/complaint', exact: true, name: 'Basic Button', component: Complain },
    // User
    { path: '/user/userdashboard', exact: true, name: 'Basic Button', component: Dashboard },
    { path: '/user/profile', exact: true, name: 'Basic Button', component: Profile },   
    { path: '/user/contactus', exact: true, name: 'Basic Button', component: ContactUs },
    { path: '/user/messages', exact: true, name: 'Basic Button', component: Messages },
    // { path: '/login', exact: true, name: 'Basic Button', component: Login },
    // { path: '/register', exact: true, name: 'Basic Button', component: Register },
    // template
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
];

export default routes;