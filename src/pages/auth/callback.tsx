import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Callback = () => {
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') { // ブラウザ環境かどうかを確認
            const token = router.query.token as string | undefined;
            if (token) {
                localStorage.setItem('token', token);
                router.push('/'); // 認証後にリダイレクトする
            }
        }
    }, [router.query.token]); // token が変更されたときのみ実行される

    return <div>Loading...</div>;
};

export default Callback;