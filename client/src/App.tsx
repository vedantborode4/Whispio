import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SignUp, SignIn } from '@clerk/clerk-react';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route 
          path="/signup" 
          element={
              <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
                  <SignUp afterSignUpUrl="/sync" />
              </div>
          } />
      <Route 
          path="/signin" 
          element={
              <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
                  <SignIn afterSignUpUrl="/sync" />
              </div>
          } />
      <Route path="/" element={<div>Please sign in</div>} />
    </Routes>
  </BrowserRouter>
);

export default App;