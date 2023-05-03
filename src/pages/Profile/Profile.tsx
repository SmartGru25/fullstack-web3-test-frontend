import React, { useEffect, useState } from "react";
import { ErrorBox, NewStory, Story } from "../../components";
import { ProfileHeader } from "../../components/ProfileHeader";
import { INewStory, IStory, IUser } from "../../interfaces";
import { createStory, deleteStory, fetchStories, updateProfile } from "../../requests";

import styles from "./Profile.module.css";

interface ProfileProps {
  currentUser: IUser;
  onProfileChange: (user: IUser) => void;
}

export function Profile(props: ProfileProps) {
  const [storiesLoaded, setStoriesLoaded] = useState(false);
  const [stories, setStories] = useState<IStory[]>([]);
  const [error, setError] = useState(false);
  const [avatarCacheId, setAvatarCacheId] = useState(Date.now());

  function refreshStories() {
    fetchStories(props.currentUser.id)
      .then(stories => {
        setStories(stories);
        setStoriesLoaded(true);
      })
      .catch(err => {
        console.log(err);
        setError(true);
      });
  }

  useEffect(() => {
    if (!storiesLoaded) {
      refreshStories();
    }
  })

  async function createStoryAndRefresh(story: INewStory) {
    try {
      await createStory(story);
      await refreshStories();
    } catch (error) {
      console.log(error);
      setError(true);
    }
  }


  async function deleteStoryAndRefresh(story: IStory) {
    try {
      await deleteStory(story.id);
      await refreshStories();
    } catch (error) {
      console.log(error);
      setError(true);
    }
  }

  async function updateProfileAndRedirect(name: string, avatar: File|null) {
    try {
      await updateProfile(name, avatar);
      setAvatarCacheId(Date.now());
      props.onProfileChange({
        ...props.currentUser,
        name,
      });
    } catch (error) {
      console.log(error);
      setError(true);
    }
  }

  return (
    <div className={styles.container}>
      {
        error && <ErrorBox />
      }
      <ProfileHeader onUpdate={updateProfileAndRedirect} username={props.currentUser.name} avatarCacheId={avatarCacheId} />
      <div>
        <h1>Your stories</h1>
        {stories.map(story => <Story hideImage story={story} key={story.id} onDelete={() => deleteStoryAndRefresh(story)} />)}
      </div>
      <NewStory onCreate={createStoryAndRefresh}/>
    </div>
  );
}