import React from 'react';

const Explanation: React.FC = () => {
  return (
    <div className="container p-6 px-6 mx-auto ">
  <div className="mb-16 text-center">
    <h2 className="text-base font-semibold tracking-wide text-indigo-400 uppercase">
      Features
    </h2>
    <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-white sm:text-4xl">
    簡単にクローゼットを整理
    </p>
  </div>
  <div className="flex flex-wrap my-12 dark:text-white">
    <div className="w-full p-8 border-b md:w-1/2 md:border-r lg:w-1/3">
      <div className="flex items-center mb-6">
        <svg
          className="w-6 h-6 text-indigo-300"
          fill="currentColor"
          height="20"
          viewBox="0 0 1792 1792"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
          </path>
        </svg>
        <div className="ml-4 text-xl">
        簡単管理
        </div>
      </div>
      <p className="leading-loose text-gray-500 dark:text-gray-200 text-md">
        お気に入りの洋服を一元管理し、毎日のスタイル選びがスムーズに。
      </p>
    </div>
    <div className="w-full p-8 border-b md:w-1/2 lg:w-1/3 lg:border-r">
      <div className="flex items-center mb-6">
        <svg
          className="w-6 h-6 text-indigo-300"
          fill="currentColor"
          height="20"
          viewBox="0 0 1792 1792"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
          </path>
        </svg>
        <div className="ml-4 text-xl">
          個別コーディネート
        </div>
      </div>
      <p className="leading-loose text-gray-500 dark:text-gray-200 text-md">
        自分だけのコーディネートを作成し、保存しておけば、いつでも完璧なスタイルでお出かけできます。
      </p>
    </div>
    <div className="w-full p-8 border-b md:w-1/2 md:border-r lg:w-1/3 lg:border-r-0">
      <div className="flex items-center mb-6">
        <svg
          className="w-6 h-6 text-indigo-300"
          fill="currentColor"
          height="20"
          viewBox="0 0 1792 1792"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
          </path>
        </svg>
        <div className="ml-4 text-xl">
            コーディネート提案
        </div>
      </div>
      <p className="leading-loose text-gray-500 dark:text-gray-200 text-md">
        登録された洋服をもとに、システムが自動でコーディネートを提案してくれるので、スタイルに自信が持てます。
      </p>
    </div>
    <div className="w-full p-8 border-b md:w-1/2 lg:w-1/3 lg:border-r lg:border-b-0">
      <div className="flex items-center mb-6">
        <svg
          className="w-6 h-6 text-indigo-300"
          fill="currentColor"
          height="20"
          viewBox="0 0 1792 1792"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
          </path>
        </svg>
        <div className="ml-4 text-xl">
        リマインダー機能
        </div>
      </div>
      <p className="leading-loose text-gray-500 dark:text-gray-200 text-md">
        特定の洋服をどれくらいの頻度で着たかを追跡し、長期間着ていないアイテムをリマインドしてくれます。
      </p>
    </div>
    <div className="w-full p-8 border-b md:w-1/2 md:border-r md:border-b-0 lg:w-1/3 lg:border-b-0">
      <div className="flex items-center mb-6">
        <svg
          className="w-6 h-6 text-indigo-300"
          fill="currentColor"
          height="20"
          viewBox="0 0 1792 1792"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
          </path>
        </svg>
        <div className="ml-4 text-xl">
            季節ごとの管理
        </div>
      </div>
      <p className="leading-loose text-gray-500 dark:text-gray-200 text-md">
        季節の変わり目に合わせて、適切な洋服を簡単に取り出しやすく整理できます。
      </p>
    </div>
    <div className="w-full p-8 md:w-1/2 lg:w-1/3">
      <div className="flex items-center mb-6">
        <svg
          className="w-6 h-6 text-indigo-300"
          fill="currentColor"
          height="20"
          viewBox="0 0 1792 1792"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
          </path>
        </svg>
        <div className="ml-4 text-xl">
            持ち物の可視化
        </div>
      </div>
      <p className="leading-loose text-gray-500 dark:text-gray-200 text-md">
        手持ちの洋服を一目で確認でき、同じようなアイテムを無駄に購入してしまうことを防ぎます。
      </p>
    </div>
  </div>    
</div>
  );
};

export default Explanation;