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
        console.log('Navigating to SignIn page');
        router.push('/auth/SignIn');
    };

    return (
        <div
            key="1"
            ref={ref}
            className={`max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto ${inView ? 'animate-fade-in-background' : 'opacity-0'}`}
        >
            <div className="max-w-2xl mx-auto mb-8 text-center lg:mb-14">
                <h2 className="text-3xl font-bold text-gray-800 lg:text-4xl dark:text-neutral-200 mb-7">
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

            <div className="grid items-center grid-cols-12 mt-20 gap-x-2 sm:gap-x-6 lg:gap-x-8">
                <div className="hidden col-span-4 md:block md:col-span-3">
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