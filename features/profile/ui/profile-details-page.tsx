import { ProfileReadonlyInfo } from 'features/profile/ui/details/profile-readonly-info';
import { getProfileUser } from 'features/profile/server/get-profile-user';
import { AvatarUploaderCard } from 'features/profile/ui/details/avatar-uploader-card';
import { ProfileForm } from 'features/profile/ui/details/profile-form';

export async function ProfileDetailsPage() {
    const user = await getProfileUser();

    return (
        <section className="flex flex-col gap-6">
            <AvatarUploaderCard user={user} />
            <ProfileForm user={user} />
            <ProfileReadonlyInfo user={user} />
        </section>
    );
}
