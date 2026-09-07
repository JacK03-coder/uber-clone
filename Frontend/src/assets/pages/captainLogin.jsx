import { Link } from 'react-router-dom';

const CaptainLogin = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <main className="page-shell min-h-screen px-4 py-8 sm:flex sm:items-center sm:justify-center">
      <section className="auth-card mx-auto w-full max-w-md rounded-2xl bg-white p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, captain</h1>
        <p className="mt-2 text-sm text-gray-600">Log in to start earning with Uber.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              className="auth-input w-full rounded px-4 py-3 text-gray-900 outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="Enter your password"
              className="auth-input w-full rounded px-4 py-3 text-gray-900 outline-none"
            />
          </div>

          <button
            type="submit"
            className="primary-action w-full rounded px-4 py-3 font-medium text-white"
          >
            Log in
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-600">
          New captain?{' '}
          <Link to="/captain-signup" className="accent-link font-medium underline underline-offset-2">
            Create a new account
          </Link>
        </p>

        <div className="my-7 flex items-center gap-3 text-xs uppercase tracking-wider text-gray-400">
          <span className="h-px flex-1 bg-gray-200" />
          or
          <span className="h-px flex-1 bg-gray-200" />
        </div>

        <Link
          to="/login"
          className="secondary-action block w-full rounded border px-4 py-3 text-center font-medium"
        >
          Sign in as a user
        </Link>
      </section>
    </main>
  );
};

export default CaptainLogin;