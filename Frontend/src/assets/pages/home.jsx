import { Link } from 'react-router-dom';

const Home = () => {
  return (
      <div
        className="relative min-h-dvh w-full overflow-hidden bg-gray-200 bg-cover bg-bottom bg-no-repeat flex flex-col justify-between"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1624724126923-e2c021df1311?q=80&w=1600&auto=format&fit=crop")',
        }}
      >
        <img
             src="https://cdn.simpleicons.org/uber/000000"
             alt="Uber"
             className="relative z-10 ml-4 mt-5 h-auto w-36 max-w-[70vw] object-contain drop-shadow-lg sm:ml-6 sm:mt-8 sm:w-48 md:w-56"
        />
        <div className="relative z-10 w-full  bg-white/95 px-5 py-5 pb-7 backdrop-blur-sm sm:px-8 sm:py-7 md:mx-auto md:mb-8 md:max-w-xl md:rounded-xl md:border-t-0 md:shadow-lg">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-500">Move freely</p>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Get started with Uber</h1>
          <Link
            to="/login"
            className="primary-action mt-5 flex w-full items-center justify-center rounded px-8 py-3 font-medium text-white"
          >
            Login
          </Link>
        </div>
      </div>
  );
};

export default Home;
