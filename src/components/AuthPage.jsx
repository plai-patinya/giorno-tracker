const AuthPage = ({

  email,
  setEmail,

  password,
  setPassword,

  login,
  register

}) => {

  return (

    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-900 text-white px-6">

      <div className="text-center mb-4">

        <h1 className="text-4xl font-black bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
          Giorno Tracker
        </h1>

        <p className="text-gray-400 mt-2">
          Track Your Dream Build
        </p>

      </div>

      <div className="w-full max-w-sm bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 space-y-4">

        <input
          type="email"
          placeholder="Email"

          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }

          className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 outline-none focus:ring-2 focus:ring-purple-500"
        />

        <input
          type="password"
          placeholder="Password"

          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }

          className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 outline-none focus:ring-2 focus:ring-purple-500"
        />

        <button
          onClick={login}
          className="w-full bg-green-500 hover:bg-green-600 transition-all py-3 rounded-xl font-bold"
        >
          Login
        </button>

        <button
          onClick={register}
          className="w-full bg-blue-500 hover:bg-blue-600 transition-all py-3 rounded-xl font-bold"
        >
          Register
        </button>

      </div>

    </div>

  );

};

export default AuthPage;