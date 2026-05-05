'use client';

import { useRouter } from 'next/navigation';

export default function LoginButton() {
    const router = useRouter();

    const handleClick = () => {
        router.push('/admin/login');
    };

    return (
        <button
        onClick={handleClick}
        className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D4A5D9] via-[#FFB6D9] to-[#87CEEB] text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 hover:from-[#FFB6D9] hover:via-[#FFB6D9] hover:to-[#87CEEB] active:scale-95 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-[#87CEEB]/50 focus:ring-offset-2 focus:ring-offset-white sm:px-8 sm:py-4 text-sm sm:text-base min-w-[140px] sm:min-w-[160px]"
        aria-label="Fazer login"
        type="button"
        >
        <span aria-hidden="true" className="text-xl sm:text-2xl">🔐</span>
        <span>Login</span>
        </button>
    );
}
