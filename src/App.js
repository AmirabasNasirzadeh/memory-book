import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

export default function App() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [memories, setMemories] = useLocalStorage([], "Memories");
  const [sort, setSort] = useLocalStorage("DESC");
  const [areTextInputsOpen, setAreTextInputsOpen] = useState(false);
  const [inputTitle, setInputTitle] = useState("");
  const [inputContent, setInputContent] = useState("");

  function handleAddNewMemory(e) {
    e.preventDefault();
    const date = new Date();
    const newMemory = {
      title: inputTitle,
      date: `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`,
      content: inputContent,
      id: `${date.toUTCString()}`,
    };

    setMemories((currMemories) =>
      sort === "DESC"
        ? [...currMemories, newMemory]
        : [newMemory, ...currMemories]
    );

    setInputTitle("");
    setInputContent("");

    setAreTextInputsOpen(false);
  }

  function handleDeleteAllMemories() {
    setMemories([]);
  }

  function handleDeleteMemory(id) {
    setMemories(memories.filter((memory) => memory.id !== id));
  }

  function handleSort() {
    setMemories((memories) => reverse([...memories]));
    setSort((currSort) => (currSort === "ASC" ? "DESC" : "ASC"));
  }

  return (
    <div>
      <MainHeader />
      <ButtonsContainer />
      <div className="container--memories">
        {areTextInputsOpen ? (
          <form className="container--inputs" onSubmit={handleAddNewMemory}>
            <input
              type="text"
              className="input--title"
              placeholder="Type your memory title..."
              value={inputTitle}
              onChange={(e) => setInputTitle(e.target.value)}
            />
            <textarea
              className="input--content"
              placeholder="Type your memory..."
              value={inputContent}
              onChange={(e) => setInputContent(e.target.value)}
            />
            <input type="submit" value="Submit" className="input--submit" />
          </form>
        ) : (
          memories.map((memory) => {
            return (
              <Memory
                title={memory.title}
                date={memory.date}
                content={memory.content}
                isExpanded={isExpanded}
                setIsExpanded={setIsExpanded}
                id={memory.id}
                key={memory.id}
              />
            );
          })
        )}
      </div>
    </div>
  );

  function reverse(array) {
    return array.map((_, index) => array[array.length - 1 - index]);
  }

  function MainHeader() {
    return (
      <h1 className="header--1">
        <span className="bold">M</span>emory <span className="bold">B</span>ook
        📔
      </h1>
    );
  }

  function ButtonsContainer() {
    return (
      <div className="buttons--container">
        <p
          className="button"
          onClick={() => setAreTextInputsOpen((isOpen) => !isOpen)}
        >
          {areTextInputsOpen ? "See Memories" : "New memory"}
        </p>
        <p className="button" onClick={handleSort}>
          Sort {sort}
        </p>
        <p className="button" onClick={handleDeleteAllMemories}>
          Delete all
        </p>
      </div>
    );
  }

  function Memory({ title, date, content, isExpanded, setIsExpanded, id }) {
    const [isThisItemExpanded1, setIsThisItemExpanded1] = useState(isExpanded);

    return (
      <div className="memory" data-id={id}>
        <h2 className="header--2">{title}</h2>
        <p className="memory--date">Date created: {date}</p>
        <span className="memory--content">
          <TextExpander
            setIsThisItemExpanded1={setIsThisItemExpanded1}
            collapsedNumWords={20}
            btnColor="aqua"
            showBtnText="Show More"
            hideBtnText="Show Less"
            isExpanded={isExpanded}
          >
            {content}
          </TextExpander>
        </span>
        {isThisItemExpanded1 && (
          <div className="memory--buttons__container">
            <p className="button" onClick={() => handleDeleteMemory(id)}>
              Delete
            </p>
            <p className="button">Edit</p>
          </div>
        )}
      </div>
    );
  }
}

function TextExpander({
  children,
  setIsThisItemExpanded1,
  collapsedNumWords = 10,
  className = "",
  btnColor = "#1f09cd",
  showBtnText = "Show more",
  hideBtnText = "Show less",
  isExpanded,
}) {
  const [isThisItemExpanded2, setIsThisItemExpanded2] = useState(isExpanded);

  const btnStyle = {
    background: "none",
    border: "none",
    font: "inherit",
    cursor: "pointer",
    marginLeft: "6px",
    color: btnColor,
  };

  const displayText = isThisItemExpanded2
    ? children
    : children.split(" ").slice(0, collapsedNumWords).join(" ") + "...";

  return (
    <div className={className}>
      {displayText}{" "}
      <button
        onClick={() => {
          setIsThisItemExpanded2((exp) => !exp);
          setIsThisItemExpanded1((exp) => !exp);
        }}
        style={btnStyle}
      >
        {isThisItemExpanded2 ? hideBtnText : showBtnText}
      </button>
    </div>
  );
}
