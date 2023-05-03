import React, { useEffect, useState } from "react";
import { ErrorBox, Story } from "../../components";
import { IStory } from "../../interfaces";
import { fetchStories } from "../../requests";
import styles from './Feed.module.css';

export function Feed() {
  const [storiesLoaded, setStoriesLoaded] = useState(false);
  const [stories, setStories] = useState<IStory[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!storiesLoaded) {
      fetchStories()
        .then(stories => {
          setStories(stories);
          setStoriesLoaded(true);
        })
        .catch(err => {
          console.log(err);
          setError(true);
        });
    }
  })

  return (
    <div className={styles.container}>
      {
        error && <ErrorBox />
      }
      {stories.map(story => <Story story={story} key={story.id} />)}
    </div>
  )
}