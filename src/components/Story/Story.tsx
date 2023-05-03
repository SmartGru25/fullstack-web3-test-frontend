import { IStory } from '../../interfaces';
import styles from './Story.module.css';

interface StoryProps {
  story: IStory;
  hideImage?: boolean;
  onDelete?: () => void;
}

export function Story(props: StoryProps) {
  return (
    <div className={`${styles.container} box`}>
      {
        !props.hideImage && (
          <div className={styles.author}>
            <img src={`api/profile/avatar?userId=${props.story.author.id}`} className={styles.avatar} alt="avatar" />
          </div>
        )
      }

      <div className={styles.mainContent}>
        <div className={styles.title}>
          {props.story.title}
        </div>
        <div>
          <a href={props.story.link}>{props.story.link}</a>
          <span className={styles.authorName}> - {props.story.author.name}</span>
        </div>
      </div>
      {
        props.onDelete && (
          <div className={styles.deletion}>
            <button onClick={props.onDelete} className="btn btnSmall">X</button>
          </div>
        )
      }
    </div>
  )
}