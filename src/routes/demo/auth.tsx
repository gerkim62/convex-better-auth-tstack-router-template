import { authClient } from '@/lib/auth-client'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { LogOut, Mail, Lock, User } from 'lucide-react'

export const Route = createFileRoute('/demo/auth')({
  component: RouteComponent,
})

function RouteComponent() {
    const session = authClient.useSession()
    const [isLogin, setIsLogin] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setSuccess('')
        setLoading(true)

        try {
            if (isLogin) {
                await authClient.signIn.email({
                    email,
                    password,
                    callbackURL:"/demo/auth"
                })
                setSuccess('Login successful!')
                setEmail('')
                setPassword('')
            } else {
                await authClient.signUp.email({
                    email,
                    password,
                    name,
                })
                setSuccess('Account created! Please log in.')
                setIsLogin(true)
                setEmail('')
                setPassword('')
                setName('')
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred')
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        try {
            await authClient.signOut()
            setSuccess('Logged out successfully!')
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Logout failed')
        }
    }

    if(session.isPending){
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            </div>
        )
    }

    if (session.data) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                            <User className="w-6 h-6 text-green-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Welcome!</h1>
                        <p className="text-gray-600 mt-2">You're logged in</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2">
                        <p className="text-sm text-gray-600">
                            <strong>Email:</strong> {session.data.user.email}
                        </p>
                        {session.data.user.name && (
                            <p className="text-sm text-gray-600">
                                <strong>Name:</strong> {session.data.user.name}
                            </p>
                        )}
                        <p className="text-sm text-gray-600">
                            <strong>ID:</strong> {session.data.user.id.substring(0, 8)}...
                        </p>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2"
                    >
                        <LogOut className="w-4 h-4" />
                        Log Out
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">
                        {isLogin ? 'Sign In' : 'Create Account'}
                    </h1>
                    <p className="text-gray-600 mt-2">
                        {isLogin
                            ? "Don't have an account? "
                            : 'Already have an account? '}
                        <button
                            onClick={() => {
                                setIsLogin(!isLogin)
                                setError('')
                                setSuccess('')
                            }}
                            className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                            {isLogin ? 'Sign Up' : 'Sign In'}
                        </button>
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="John Doe"
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                    required={!isLogin}
                                />
                            </div>
                        </div>
                    )}

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                    >
                        {loading ? 'Loading...' : isLogin ? 'Sign In' : 'Create Account'}
                    </button>
                </form>
            </div>
        </div>
    )
}
