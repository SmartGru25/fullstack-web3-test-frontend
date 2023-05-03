import React, { useState } from "react";
import { INewStory } from "../../interfaces";

import styles from './NewStory.module.css';

interface NewStoryProps {
  onCreate: (story: INewStory) => void;
}

export function NewStory(props: NewStoryProps) {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Clear form
    setTitle('');
    setLink('');
    
    props.onCreate({ title, link });
  }

  return (
    <div>
      <h1>Add a story</h1>
      <form onSubmit={onSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Title:</label>
          <input type="text" name="title" value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="link">Link:</label>
          <input type="url" name="link" value={link} onChange={e => setLink(e.target.value)} required />
        </div>
        <div>
          <button type="submit" className="btn">Submit</button>
        </div>
      </form>
    </div>
  )
}