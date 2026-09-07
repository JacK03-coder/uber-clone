import { Link } from "react-router-dom";

const CaptainSignup = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <main className="page-shell min-h-screen px-4 py-8 sm:flex sm:items-center sm:justify-center">
      <section className="auth-card mx-auto w-full max-w-md rounded-2xl bg-white p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-gray-900">Become a captain</h1>
        <p className="mt-2 text-sm text-gray-600">
          Create an account and start earning with Uber.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="firstName"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                First name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="given-name"
                required
                className="w-full rounded border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Last name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                autoComplete="family-name"
                required
                className="w-full rounded border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              className="w-full rounded border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              placeholder="Create a password"
              className="w-full rounded border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
            />
          </div>

          <fieldset className="space-y-5 rounded-xl border border-gray-200 bg-gray-50 p-4 pt-3">
            <legend className="px-2 text-lg font-semibold text-gray-900">
              Vehicle details
            </legend>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="color"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Color
                </label>
                <input
                  id="color"
                  name="color"
                  type="text"
                  required
                  className="w-full rounded border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                />
              </div>
              <div>
                <label
                  htmlFor="plate"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Plate number
                </label>
                <input
                  id="plate"
                  name="plate"
                  type="text"
                  required
                  className="w-full rounded border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="capacity"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Capacity
                </label>
                <input
                  id="capacity"
                  name="capacity"
                  type="number"
                  min="1"
                  required
                  className="w-full rounded border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                />
              </div>
              <div>
                <label
                  htmlFor="vehicleType"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Vehicle type
                </label>
                <select
                  id="vehicleType"
                  name="vehicleType"
                  defaultValue="car"
                  required
                  className="w-full rounded border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                >
                  <option value="car">Car</option>
                  <option value="motorcycle">Motorcycle</option>
                  <option value="auto">Auto</option>
                </select>
              </div>
            </div>
          </fieldset>

          <button
            type="submit"
            className="primary-action w-full rounded px-4 py-3 font-medium text-white"
          >
            Create captain account
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-600">
          Already a captain?{" "}
          <Link
            to="/captain-login"
            className="accent-link font-medium underline underline-offset-2"
          >
            Log in
          </Link>
        </p>
        <Link
          to="/signup"
          className="accent-link mt-5 block text-center text-sm font-medium underline underline-offset-2"
        >
          Sign up as a user
        </Link>
      </section>
    </main>
  );
};

export default CaptainSignup;
