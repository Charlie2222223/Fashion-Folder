import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Callback = () => {
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') { // ブラウザ環境かどうかを確認
            const { token } = router.query;
            if (token) {
                localStorage.setItem('token', token as string);
                router.push('/'); // 認証後にリダイレクトする
            }
        }
    }, [router.query]);

    return <div>Loading...</div>;
};

export default Callback;