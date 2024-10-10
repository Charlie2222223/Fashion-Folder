import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Callback = () => {
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') { // ブラウザ環境かどうかを確認
            const { token } = router.query;
            if (token) {
                localStorage.setItem('authToken', token as string);
                router.push('/'); // 認証後に /home にリダイレクトする
            }
        }
    }, [router]);

    return <div>Loading...</div>;
};

export default Callback;