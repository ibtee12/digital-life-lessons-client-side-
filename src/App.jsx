import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LessonsPage } from './pages/LessonsPage';
import { LessonDetailPage } from './pages/LessonDetailPage';
import { PricingPage } from './pages/PricingPage';
import { PaymentSuccessPage } from './pages/PaymentSuccessPage';
import { PaymentCancelPage } from './pages/PaymentCancelPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { CreatorPublicProfile } from './pages/CreatorPublicProfile';
import { NotFoundPage } from './pages/NotFoundPage';

// Dashboard Layout & User Pages
import { DashboardLayout } from './layouts/DashboardLayout';
import { DashboardHome } from './pages/dashboard/DashboardHome';
import { AddLessonPage } from './pages/dashboard/AddLessonPage';
import { MyLessonsPage } from './pages/dashboard/MyLessonsPage';
import { EditLessonPage } from './pages/dashboard/EditLessonPage';
import { MyFavoritesPage } from './pages/dashboard/MyFavoritesPage';
import { ProfilePage } from './pages/dashboard/ProfilePage';

// Admin Dashboard Pages
import { AdminDashboardHome } from './pages/admin/AdminDashboardHome';
import { AdminManageUsers } from './pages/admin/AdminManageUsers';
import { AdminManageLessons } from './pages/admin/AdminManageLessons';
import { AdminReportedLessons } from './pages/admin/AdminReportedLessons';
import { AdminProfilePage } from './pages/admin/AdminProfilePage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/lessons" element={<LessonsPage />} />
      <Route path="/lessons/:id" element={<LessonDetailPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/payment/success" element={<PaymentSuccessPage />} />
      <Route path="/payment/cancel" element={<PaymentCancelPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/author/:id" element={<CreatorPublicProfile />} />

      {/* Protected Dashboard Routes */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        {/* User Routes */}
        <Route index element={<DashboardHome />} />
        <Route path="add-lesson" element={<AddLessonPage />} />
        <Route path="my-lessons" element={<MyLessonsPage />} />
        <Route path="edit-lesson/:id" element={<EditLessonPage />} />
        <Route path="my-favorites" element={<MyFavoritesPage />} />
        <Route path="profile" element={<ProfilePage />} />

        {/* Admin Routes */}
        <Route path="admin" element={<AdminDashboardHome />} />
        <Route path="admin/manage-users" element={<AdminManageUsers />} />
        <Route path="admin/manage-lessons" element={<AdminManageLessons />} />
        <Route path="admin/reported-lessons" element={<AdminReportedLessons />} />
        <Route path="admin/profile" element={<AdminProfilePage />} />
      </Route>

      {/* 404 Custom Not Found Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
