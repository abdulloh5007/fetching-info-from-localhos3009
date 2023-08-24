import { useUserContext } from '@/components/Context/context';
import { useRouter } from 'next/router';
import '../styles/profile.module.scss'

const ProfilePage = () => {
    const router = useRouter();
    const { id } = router.query;

    const { userData } = useUserContext()

    console.log(userData);

    return (
        <div>
            <h1>Profile Page</h1>
            {
                userData ?
                    (
                        <div>
                            <b>ID: {userData.id}</b>
                            <b>BALANCE: {userData.balance}</b>
                            <b>STATUS: {userData.status[0].statusName}</b>
                        </div>
                    )
                    : (<b>User is not defined</b>)
            }
        </div>
    );
};

export default ProfilePage;
