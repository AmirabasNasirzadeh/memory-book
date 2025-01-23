import { useState } from "react";

const tempMemories = [
  {
    title: "A really fun stroy about diggers!",
    date: "1/23/2025",
    content:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.",
  },
];

export default function App() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <MainHeader />
      <ButtonsContainer />
      <div className="container">
        <Memory
          title={tempMemories[0].title}
          date={tempMemories[0].date}
          content={tempMemories[0].content}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
        />
      </div>
    </div>
  );
}

function MainHeader() {
  return (
    <h1 className="header--1">
      <span className="bold">M</span>emory <span className="bold">B</span>ook 📔
    </h1>
  );
}

function ButtonsContainer() {
  return (
    <div className="buttons--container">
      <p className="button">New memory</p>
      <p className="button">Sort ASC</p>
      <p className="button">Delete all</p>
    </div>
  );
}

function Memory({ title, date, content, isExpanded, setIsExpanded }) {
  return (
    <div className="memory">
      <h2 className="header--2">{title}</h2>
      <p className="memory--date">Date created: {date}</p>
      <p className="memory--content">
        <TextExpander
          collapsedNumWords={20}
          btnColor="aqua"
          showBtnText="Show More"
          hideBtnText="Show Less"
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
        >
          {content}
        </TextExpander>
      </p>
      {isExpanded && (
        <div className="memory--buttons__container">
          <p className="button">Delete</p>
          <p className="button">Edit</p>
        </div>
      )}
    </div>
  );
}

function TextExpander({
  children,
  collapsedNumWords = 10,
  className = "",
  btnColor = "#1f09cd",
  showBtnText = "Show more",
  hideBtnText = "Show less",
  isExpanded,
  setIsExpanded,
}) {
  const btnStyle = {
    background: "none",
    border: "none",
    font: "inherit",
    cursor: "pointer",
    marginLeft: "6px",
    color: btnColor,
  };

  const displayText = isExpanded
    ? children
    : children.split(" ").slice(0, collapsedNumWords).join(" ") + "...";

  return (
    <div className={className}>
      {displayText}{" "}
      <button onClick={() => setIsExpanded((exp) => !exp)} style={btnStyle}>
        {isExpanded ? hideBtnText : showBtnText}
      </button>
    </div>
  );
}
