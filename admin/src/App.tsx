import React from 'react'
import loadable from '@loadable/component'
import { Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import DashBoardLayout from './layout/Dashboard'

const Dashboard = loadable(() => import('./pages/dashboard'))
const UserLayout = loadable(() => import('./pages/user'))
const VideoLayout = loadable(() => import('./pages/videos'))
const CommentLayout = loadable(() => import('./pages/comments'))
const NotificationLayout = loadable(() => import('./pages/notifications'))

const Register = loadable(() => import('./pages/register'))
const Login = loadable(() => import('./pages/login'))
const NotFound = loadable(() => import('./pages/notfound'))

function App() {
  return (
    <div className="App">
      <BrowserRouter basename={''}>
        <Suspense>
          <Routes>
            <Route
              path="/dashboard"
              element={
                <DashBoardLayout>
                  <Dashboard />
                </DashBoardLayout>
              }
            />
            <Route
              path="/user"
              element={
                <DashBoardLayout>
                  <UserLayout />
                </DashBoardLayout>
              }
            />
            <Route
              path="/video"
              element={
                <DashBoardLayout>
                  <VideoLayout />
                </DashBoardLayout>
              }
            />
            <Route
              path="/comment"
              element={
                <DashBoardLayout>
                  <CommentLayout />
                </DashBoardLayout>
              }
            />
            <Route
              path="/notification"
              element={
                <DashBoardLayout>
                  <NotificationLayout />
                </DashBoardLayout>
              }
            />

            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/notfound" element={<NotFound />} />

            <Route path="/" element={<Navigate replace to="/dashboard" />} />
            <Route path="*" element={<Navigate replace to="/notfound" />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  )
}

export default App
