import { useEffect, useState } from 'react';
import styles from './ProfileHeader.module.css';

interface ProfileHeaderProps {
  username: string;
  avatarCacheId: number;
  onUpdate: (username: string, avatar: File|null) => void;
}

export function ProfileHeader(props: ProfileHeaderProps) {
  const [username, setUsername] = useState(props.username);
  const [avatar, setAvatar] = useState<File|null>(null);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    props.onUpdate(username, avatar);
  }

  useEffect(() => {
    setUsername(props.username);
  }, [props.username])

  return (
    <div className={styles.container}>
      <div className={styles.author}>
        <img src={`/api/profile/avatar?${props.avatarCacheId}`} className={styles.avatar} alt="avatar" />
      </div>
      <div>
        <form onSubmit={onSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name: </label>
            <input type="text" name="name" value={username} onChange={e => setUsername(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="avatar">Avatar: </label>
            <input type="file" name="avatar" onChange={e => setAvatar(e.target.files ? e.target.files[0] : null)} />
          </div>
          <div>
            <input type="submit" value="Update profile" className="btn btnSmall btnPrimary" />
          </div>
        </form>
      </div>
    </div>
  )
}