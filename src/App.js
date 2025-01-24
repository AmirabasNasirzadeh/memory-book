import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

const tempMemories = [
  {
    id: "1232025",
    title: "A really fun stroy about diggers!",
    date: "1/23/2025",
    content:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.",
  },
  {
    id: "1242025",
    title: "Ambatukam!",
    date: "1/24/2025",
    content:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.",
  },
];

export default function App() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [memories, setMemories] = useLocalStorage([], "Memories");
  const [sort, setSort] = useLocalStorage("DESC");

  function handleDeleteMemories() {
    setMemories([]);
  }

  function handleSort() {
    setMemories((memories) => reverse([...memories]));
    setSort((currSort) => (currSort === "ASC" ? "DESC" : "ASC"));
  }

  return (
    <div>
      <MainHeader />
      <ButtonsContainer />
      <div className="container">
        {memories.map((memory) => {
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
        })}
      </div>
    </div>
  );

  function reverse(array) {
    return array.map((item, index) => array[array.length - 1 - index]);
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
        <p className="button">New memory</p>
        <p className="button" onClick={handleSort}>
          Sort {sort}
        </p>
        <p className="button" onClick={handleDeleteMemories}>
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
            <p className="button">Delete</p>
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
