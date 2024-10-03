import React from 'react';
import { FaTshirt, FaRegSmileWink, FaThList } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';

const Section: React.FC = () => {
  const { ref, inView } = useInView({
    // オプション
    rootMargin: '-100px', // ref要素が現れてから50px過ぎたら
    triggerOnce: true, // 最初の一度だけ実行
});

  return (
    <div
      key="1"
      ref={ref}
      className={`max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto transition-all duration-700 ease-out ${inView ? 'animate-slide-in-left' : 'opacity-0'}`}
    >
      <div className="relative p-6 md:p-16">
        <div className="relative z-10 lg:grid lg:grid-cols-12 lg:gap-16 lg:items-center">
          <div className="mb-10 lg:mb-0 lg:col-span-6 lg:col-start-8 lg:order-2">
            <h2 className="text-2xl font-bold text-gray-800 sm:text-3xl dark:text-neutral-200">
              クローゼットをデジタル化<br />あなたのスタイルを徹底管理！！
            </h2>
            <nav
              aria-label="Tabs"
              aria-orientation="vertical"
              className="grid gap-4 mt-5 md:mt-10"
              role="tablist"
            >
              {/* Tab 1 */}
              <button
                aria-controls="tabs-with-card-1"
                aria-selected="true"
                className="p-4 hs-tab-active:bg-white hs-tab-active:shadow-md hs-tab-active:hover:border-transparent text-start hover:bg-gray-200 focus:outline-none focus:bg-gray-200 md:p-5 rounded-xl dark:hs-tab-active:bg-neutral-700 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 active"
                data-hs-tab="#tabs-with-card-1"
                id="tabs-with-card-item-1"
                role="tab"
                type="button"
              >
                <span className="flex gap-x-6">
                  <div className="mt-2 text-gray-800 shrink-0 size-6 md:size-7 hs-tab-active:text-blue-600 dark:hs-tab-active:text-blue-500 dark:text-neutral-200">
                    <FaTshirt size={35} />
                  </div>
                  <span className="grow">
                    <span className="block text-lg font-semibold text-gray-800 hs-tab-active:text-blue-600 dark:hs-tab-active:text-blue-500 dark:text-neutral-200">
                      洋服を管理
                    </span>
                    <span className="block mt-1 text-gray-800 dark:hs-tab-active:text-gray-200 dark:text-neutral-200">
                      お気に入りのアイテムを登録して、毎日のスタイル選びをスムーズにサポートします。
                    </span>
                  </span>
                </span>
              </button>

              {/* Tab 2 */}
              <button
                aria-controls="tabs-with-card-2"
                aria-selected="false"
                className="p-4 hs-tab-active:bg-white hs-tab-active:shadow-md hs-tab-active:hover:border-transparent text-start hover:bg-gray-200 focus:outline-none focus:bg-gray-200 md:p-5 rounded-xl dark:hs-tab-active:bg-neutral-700 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                data-hs-tab="#tabs-with-card-2"
                id="tabs-with-card-item-2"
                role="tab"
                type="button"
              >
                <span className="flex gap-x-6">
                  <div className="mt-2 text-gray-800 shrink-0 size-6 md:size-7 hs-tab-active:text-blue-600 dark:hs-tab-active:text-blue-500 dark:text-neutral-200">
                    <FaRegSmileWink size={35} />
                  </div>
                  <span className="grow">
                    <span className="block text-lg font-semibold text-gray-800 hs-tab-active:text-blue-600 dark:hs-tab-active:text-blue-500 dark:text-neutral-200">
                      コーディネート
                    </span>
                    <span className="block mt-1 text-gray-800 dark:hs-tab-active:text-gray-200 dark:text-neutral-200">
                      洋服を組み合わせて、あなただけのコーディネートを作成し、保存できます。
                    </span>
                  </span>
                </span>
              </button>

              {/* Tab 3 */}
              <button
                aria-controls="tabs-with-card-3"
                aria-selected="false"
                className="p-4 hs-tab-active:bg-white hs-tab-active:shadow-md hs-tab-active:hover:border-transparent text-start hover:bg-gray-200 focus:outline-none focus:bg-gray-200 md:p-5 rounded-xl dark:hs-tab-active:bg-neutral-700 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                data-hs-tab="#tabs-with-card-3"
                id="tabs-with-card-item-3"
                role="tab"
                type="button"
              >
                <span className="flex gap-x-6">
                  <div className="mt-2 text-gray-800 shrink-0 size-6 md:size-7 hs-tab-active:text-blue-600 dark:hs-tab-active:text-blue-500 dark:text-neutral-200">
                    <FaThList size={30} />
                  </div>
                  <span className="grow">
                    <span className="block text-lg font-semibold text-gray-800 hs-tab-active:text-blue-600 dark:hs-tab-active:text-blue-500 dark:text-neutral-200">
                      さまざまな分類
                    </span>
                    <span className="block mt-1 text-gray-800 dark:hs-tab-active:text-gray-200 dark:text-neutral-200">
                      色、洋服の種類、季節に合わせて簡単に絞り込みができます。
                    </span>
                  </span>
                </span>
              </button>
            </nav>
          </div>
          <div className="lg:col-span-6">
            <div className="relative">
              <div aria-labelledby="tabs-with-card-item-1" className='animate-slide-in-fwd-center' id="tabs-with-card-1" role="tabpanel">
                <img
                  alt="Features Image"
                  className="h-auto max-w-full shadow-xl shadow-gray-200 rounded-xl dark:shadow-gray-900/20"
                  src="/img/Section_1.png"
                />
              </div>
              <div aria-labelledby="tabs-with-card-item-2" className="hidden animate-slide-in-fwd-center" id="tabs-with-card-2" role="tabpanel">
                <img
                  alt="Features Image"
                  className="h-auto max-w-full shadow-xl shadow-gray-200 rounded-xl dark:shadow-gray-900/20"
                  src="/img/Section_2.jpg"
                />
              </div>
              <div aria-labelledby="tabs-with-card-item-3" className="hidden animate-slide-in-fwd-center" id="tabs-with-card-3" role="tabpanel">
                <img
                  alt="Features Image"
                  className="h-auto max-w-full shadow-xl shadow-gray-200 rounded-xl dark:shadow-gray-900/20"
                  src="/img/Section_3.jpg"
                />
              </div>
            </div>
            <div className="absolute top-0 hidden translate-x-20 end-0 md:block lg:translate-x-20">
              <svg
                className="w-16 h-auto text-orange-500"
                fill="none"
                height="135"
                viewBox="0 0 121 135"
                width="121"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="10"
                />
               <path
                  d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="10"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 grid grid-cols-12 size-full">
        <div className="w-full bg-gray-100 col-span-full lg:col-span-7 lg:col-start-6 h-5/6 rounded-xl sm:h-3/4 lg:h-full dark:bg-neutral-800" />
      </div>
    </div>
  );
};

export default Section;
