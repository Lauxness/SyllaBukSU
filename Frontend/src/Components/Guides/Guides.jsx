import styles from "./style.module.css";

function Guides() {
  const level1 = [
    "Copying",
    "Defining",
    "Finding",
    "Locating",
    "Quoting",
    "Listening",
    "Googling",
    "Repeating",
    "Retrieving",
    "Outlining",
    "Highlighting",
    "Memorizing",
    "Networking",
    "Searching",
    "Identifying",
    "Selecting",
    "Tabulating",
    "Duplicating",
    "Matching",
    "Bookmarking",
    "Bullet-pointing",
  ];

  const level2 = [
    "Annotating",
    "Tweeting",
    "Associating",
    "Tagging",
    "Summarizing",
    "Relating",
    "Categorizing",
    "Paraphrasing",
    "Predicting",
    "Comparing",
    "Contrasting",
    "Commenting",
    "Journaling",
    "Interpreting",
    "Grouping",
    "Inferring",
    "Estimating",
    "Extending",
    "Gathering",
    "Exemplifying",
    "Expressing",
  ];

  const level3 = [
    "Acting out",
    "Articulate",
    "Reenact",
    "Loading",
    "Choosing",
    "Determining",
    "Displaying",
    "Judging",
    "Executing",
    "Examining",
    "Implementing",
    "Sketching",
    "Experimenting",
    "Hacking",
    "Interviewing",
    "Painting",
    "Preparing",
    "Playing",
    "Integrating",
    "Presenting",
    "Charting",
  ];

  const level4 = [
    "Calculating",
    "Categorizing",
    "Breaking Down",
    "Correlating",
    "Deconstructing",
    "Linking",
    "Mashing",
    "Mind-Mapping",
    "Organizing",
    "Appraising",
    "Advertising",
    "Dividing",
    "Deducing",
    "Distinguishing",
    "Illustrating",
    "Questioning",
    "Structuring",
    "Integrating",
    "Attributing",
    "Estimating",
    "Explaining",
  ];
  const level5 = [
    "Arguing",
    "Validating",
    "Testing",
    "Scoring",
    "Assessing",
    "Criticizing",
    "Commenting",
    "Debating",
    "Defending",
    "Detecting",
    "Experimenting",
    "Grading",
    "Hypothesizing",
    "Measuring",
    "Moderating",
    "Posting",
    "Predicting",
    "Rating",
    "Reflecting",
    "Reviewing",
    "Editorializing",
  ];
  const level6 = [
    "Blogging",
    "Building",
    "Animating",
    "Adapting",
    "Collaborating",
    "Composing",
    "Directing",
    "Devising",
    "Podcasting",
    "Wiki Building",
    "Writing",
    "Filming",
    "Programming",
    "Simulating",
    "Role Playing",
    "Solving",
    "Mixing",
    "Facilitating",
    "Managing",
    "Negotiating",
    "Leading",
  ];
  return (
    <>
      <div className={styles.container}>
        <div className={styles.bloomGuideContainer}>
          <div className={styles.heading}>
            <p>The 6 Levels of Bloom’s Taxonomy</p>
          </div>
          <div className={styles.guideContainer}>
            <div>
              <p>Level 1. Remembering</p>
              <div>
                {level1.map((text) => (
                  <p>{text}</p>
                ))}
              </div>
            </div>
            <div>
              <p>Level 2. Understanding</p>
              <div>
                {level2.map((text) => (
                  <p>{text}</p>
                ))}
              </div>
            </div>
            <div>
              <p>Level 3. Applying</p>
              <div>
                {level3.map((text) => (
                  <p>{text}</p>
                ))}
              </div>
            </div>
            <div>
              <p>Level 4. Analyzing</p>
              <div>
                {level4.map((text) => (
                  <p>{text}</p>
                ))}
              </div>
            </div>
            <div>
              <p>Level 5. Evaluating</p>
              <div>
                {level5.map((text) => (
                  <p>{text}</p>
                ))}
              </div>
            </div>
            <div>
              <p>Level 6. Creating</p>
              <div>
                {level6.map((text) => (
                  <p>{text}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Guides;
