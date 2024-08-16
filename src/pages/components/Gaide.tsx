import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/router';

const Gaide: React.FC <{ onUserClick: () => void }> = ({ onUserClick }) => {
    const { ref, inView } = useInView({
        rootMargin: '-100px',
        triggerOnce: true,
    });

    const router = useRouter();

    const handleClick = () => {
      // `/about` ページに遷移する
      router.push('/SignIn');
    };

    return (
        <div
            key="1"
            ref={ref}
            className={`max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto ${inView ? 'animate-fade-in-background' : 'opacity-0'}`}
        >
            <div className="mx-auto max-w-2xl mb-8 lg:mb-14 text-center">
                <h2 className="text-3xl lg:text-4xl text-gray-800 font-bold dark:text-neutral-200">
                    一歩先のファッションへ
                </h2>
                <p className="mt-５ text-gray-800 dark:text-neutral-200">
                    今までのアナログな管理をやめて新しいファッションの形に変化
                </p>
            </div>

            <div className="flex justify-center mt-10 space-x-10">
                <button className="px-10 py-4 text-white bg-blue-500 rounded-md hover:bg-blue-600" onClick={() =>{onUserClick()}}>
                    Login
                </button>
                <button className="px-10 py-4 text-white bg-blue-500 rounded-md hover:bg-blue-600" onClick={handleClick}>
                    Signup
                </button>
            </div>

            <div className="mt-20 grid grid-cols-12 items-center gap-x-2 sm:gap-x-6 lg:gap-x-8">
                <div className="hidden md:block col-span-4 md:col-span-3">
                    <img
                        alt="Features Image"
                        className="rounded-xl"
                        src="https://images.unsplash.com/photo-1606868306217-dbf5046868d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=920&q=80"
                    />
                </div>
                <div className="col-span-4 md:col-span-3">
                    <img
                        alt="Features Image"
                        className="rounded-xl"
                        src="https://images.unsplash.com/photo-1587613991119-fbbe8e90531d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=920&q=80"
                    />
                </div>
                <div className="col-span-4 md:col-span-3">
                    <img
                        alt="Features Image"
                        className="rounded-xl"
                        src="https://images.unsplash.com/photo-1554295405-abb8fd54f153?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=920&q=80"
                    />
                </div>
                <div className="col-span-4 md:col-span-3">
                    <img
                        alt="Features Image"
                        className="rounded-xl"
                        src="https://images.unsplash.com/photo-1640622300473-977435c38c04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=920&q=80"
                    />
                </div>
            </div>
        </div>
    );
};

export default Gaide;