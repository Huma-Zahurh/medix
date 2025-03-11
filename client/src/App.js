import './App.css';
import ForgotPassword from './Auth/ForgotPassword';
import Login from './Auth/Login';
import Register from './Auth/Register';
import AdminRoute from './Components/Routes/AdminRoute';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import AdminProfileSetting from './Pages/Admin/AdminProfileSetting';
import CreateCategory from './Pages/Admin/CreateCategory';
import AddMcqs from './Pages/Admin/AddMcqs';
import Chapters from './Pages/Admin/Chapters';
import Subject from './Pages/Admin/Subject';
import PageNotFound from './Pages/PageNotFound';
import StudentDashboard from './Pages/Student/StudentDashboard';
import { Routes, Route } from "react-router-dom";
import Topics from './Pages/Admin/Topics';
import ManageMcqs from './Pages/Admin/ManageMcqs';
import StudyMaterial from './Pages/Admin/StudyMaterial';
import ManageStudents from './Pages/Admin/ManageStudents'
import { AuthState } from './Context/AuthContext';
import PrivateRoute from './Components/Routes/PrivateRoute';
import Subscription from './Pages/Admin/Subscription';
import ManageSubscriptions from './Pages/Admin/ManageSubscriptions';
import SubscriptionPlans from './Pages/Student/SubscriptionPlans';
import MySubscriptions from './Pages/Student/MySubscription';
import CategoryPage from './Pages/Student/CategoryPage';
import TopicMCQs from './Pages/Student/TopicMCQs';
import TopicStudyMaterial from './Pages/Student/TopicStudyMaterial';
import StudentProfileSettings from './Pages/Student/StudentProfileSettings';
import BannerUpload from './Pages/Admin/BannerUpload';
import BulkImport from './Pages/Admin/BulkImport';


function App() {

  return (
    <AuthState>

    <Routes>
      <Route path="/admin" element={<AdminRoute />}>
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="categories" element={<CreateCategory />} />
      <Route path="subject" element={<Subject />} />
      <Route path="chapters" element={<Chapters />} />
      <Route path="topics" element={<Topics />} />
      <Route path="add-mcqs" element={<AddMcqs />} />
      <Route path="manage-mcqs" element={<ManageMcqs />} />
      <Route path="study-material" element={<StudyMaterial />} />
      <Route path="subscription" element={<Subscription />} />
      <Route path="manage-subscription" element={<ManageSubscriptions />} />
      <Route path="profile-settings" element={<AdminProfileSetting />} />
      <Route path="manage-students" element={<ManageStudents />} />
      <Route path="banner-upload" element={<BannerUpload />} />
      <Route path="bulk-import" element={<BulkImport />} />
      </Route>

      <Route path="/student" element={<PrivateRoute />}>
      <Route path="dashboard" element={<StudentDashboard />} />
      <Route path="subscription-plans" element={<SubscriptionPlans />} />
      <Route path="my-subscriptions/:id" element={<MySubscriptions />} />
      <Route path="q-bank/:slug" element={<CategoryPage />} />
      <Route path="topic/mcqs/:slug" element={<TopicMCQs />} />
      <Route path="topic/study-material/:slug" element={<TopicStudyMaterial />} />
      <Route path="profile-settings" element={<StudentProfileSettings />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
    </AuthState>
  );
}

export default App;
