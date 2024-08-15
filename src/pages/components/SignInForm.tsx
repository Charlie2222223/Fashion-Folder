import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const SignInForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700 p-8 relative">
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          ✖
        </button>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-4">
          Sign in
        </h1>
        <p className="text-sm text-gray-600 dark:text-neutral-400 text-center mb-6">
          Don&apos;t have an account yet?{" "}
          <a className="text-blue-600 decoration-2 hover:underline dark:text-blue-500" href="#">
            Sign up here
          </a>
        </p>
        <button className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
        <FcGoogle className="mr-2 text-2xl" />
          Sign in with Google
        </button>
        <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-neutral-500 dark:before:border-neutral-600 dark:after:border-neutral-600">
          Or
        </div>
        <form>
          <div className="grid gap-y-4">
            <div>
              <label className="block text-sm mb-2 dark:text-white" htmlFor="email">
                Email address
              </label>
              <input
                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                id="email"
                name="email"
                required
                type="email"
              />
            </div>
            <div>
              <div className="flex justify-between items-center">
                <label className="block text-sm mb-2 dark:text-white" htmlFor="password">
                  Password
                </label>
                <a className="inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 hover:underline dark:text-blue-500" href="#">
                  Forgot password?
                </a>
              </div>
              <input
                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                id="password"
                name="password"
                required
                type="password"
              />
            </div>
            <div className="flex items-center">
              <input className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="remember-me" name="remember-me" type="checkbox" />
              <label className="ms-3 text-sm dark:text-white" htmlFor="remember-me">
                Remember me
              </label>
            </div>
            <button className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700">
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;